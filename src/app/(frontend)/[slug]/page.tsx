import { headers as getHeaders } from "next/headers.js";
import Image from "next/image";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Header } from "components/header";
import { Frettavakt } from "components/svgs";
import { notFound, redirect } from "next/navigation";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";
import { format } from "date-fns";
import { is } from "date-fns/locale/is";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const { slug } = await params;

    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });
    const posts = await payload.find({
        collection: "posts",
        where: { slug: { equals: slug }, published: { not_equals: null } },
        limit: 1,
    });

    const post = posts.docs[0];

    if (!post) {
        return notFound();
    }

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    // prettier-ignore
    const coverImage = (typeof post.coverImage !== "number" && post.coverImage?.url) ? post.coverImage.url : null;

    return {
        title: `${post.title} | Skátasulta`,
        description: post.excerpt ?? undefined,
        openGraph: {
            images: coverImage ? [coverImage, ...previousImages] : previousImages,
            siteName: "Skátasulta | Stórasti vettvangur íslenskra skáta!",
        },
    };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const headers = await getHeaders();
    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });
    //const { user } = await payload.auth({ headers });

    const { slug } = await params;
    if (!slug) {
        return notFound();
    }

    const header = await payload.findGlobal({ slug: "header" });
    const adverts = await payload.findGlobal({ slug: "adverts" });
    const posts = await payload.find({
        collection: "posts",
        where: {
            or: [{ slug: { equals: slug } }, { humanSlug: { equals: slug } }],
            published: { not_equals: null },
        },
        limit: 1,
    });

    const post = posts.docs[0];

    if (!post) {
        return notFound();
    }

    if (post.slug !== slug) {
        return redirect(`/${post.slug}`);
    }

    return (
        <>
            <Header
                logo={{
                    urlDark: typeof header.logoDark !== "number" ? header.logoDark?.url : null,
                    urlLight: typeof header.logoLight !== "number" ? header.logoLight?.url : null,
                }}
                startsScrolled
            />

            <main className="flex-grow pt-[6.25rem]">
                <div className="mx-auto max-w-screen-md px-8 py-16">
                    <div>
                        <Frettavakt
                            done={typeof post.watchEnded === "string" ? post.watchEnded : undefined}
                            className="mb-4"
                        />
                        <h1 className="text-3xl leading-10 font-extrabold uppercase md:text-5xl md:leading-14">
                            {post.title}
                        </h1>
                        <p className="mt-4 text-lg font-semibold text-gray-800 md:text-xl">
                            {post.excerpt}
                        </p>
                    </div>
                </div>

                {typeof post.coverImage !== "number" &&
                    post.coverImage?.url &&
                    post.coverImage.height &&
                    post.coverImage.width && (
                        <div className="container">
                            <Image
                                src={post.coverImage.url}
                                alt={post.coverImage.alt}
                                height={post.coverImage.height}
                                width={post.coverImage.width}
                            />
                            <div className="pt-4">
                                <p className="text-sm font-medium text-gray-800 italic">
                                    {post.coverImage.alt.endsWith(".")
                                        ? post.coverImage.alt
                                        : `${post.coverImage.alt}.`}
                                </p>
                            </div>
                        </div>
                    )}

                {adverts.articleBannerTop &&
                    typeof adverts.articleBannerTop !== "number" &&
                    typeof adverts.articleBannerTop.url === "string" && (
                        <div className="mx-auto max-w-screen-md px-8 pt-16">
                            <div className="flex justify-center">
                                <div>
                                    <a
                                        href="https://docs.google.com/forms/d/e/1FAIpQLSfdZJ26jNIvD-wAv1l1TIy1hMHVWPVJQuqY5uN5rVl_wLCCKQ/viewform"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            src={adverts.articleBannerTop.url}
                                            alt="Article banner top"
                                            height={
                                                typeof adverts.articleBannerTop.height === "number"
                                                    ? adverts.articleBannerTop.height > 480
                                                        ? 480
                                                        : adverts.articleBannerTop.height
                                                    : 0
                                            }
                                            width={adverts.articleBannerTop.width ?? 0}
                                        />
                                    </a>

                                    <p className="mt-1 text-sm font-medium text-gray-500 italic">
                                        Auglýsing
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                {post.type === "article" && post.content && (
                    <div className="mx-auto max-w-screen-md px-8 py-16">
                        <div
                            className="prose prose-article w-full max-w-full"
                            dangerouslySetInnerHTML={{
                                __html: convertLexicalToHTML({
                                    data: post.content,
                                }),
                            }}
                        />
                    </div>
                )}

                {post.type === "watch" && post.watchEntries && (
                    <div className="mx-auto max-w-screen-md px-8 py-8">
                        <div className="divide-y divide-gray-200">
                            {post.watchEntries
                                .sort((a, b) => +new Date(b.published) - +new Date(a.published))
                                .map((entry, i) => (
                                    <div key={i} className="py-8">
                                        <div className="flex items-center gap-2 pb-2">
                                            <div className="h-[2px] w-[15px] bg-red-700" />
                                            <p className="font-medium text-red-700">
                                                {format(
                                                    entry.published,
                                                    "d'.' MMMM yyyy 'kl.' h:mm",
                                                    {
                                                        locale: is,
                                                    },
                                                )}
                                            </p>
                                        </div>

                                        <h1 className="text-3xl leading-10 font-extrabold">
                                            {entry.title}
                                        </h1>

                                        <div
                                            className="prose prose-article w-full max-w-full"
                                            dangerouslySetInnerHTML={{
                                                __html: convertLexicalToHTML({
                                                    data: entry.content,
                                                }),
                                            }}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
