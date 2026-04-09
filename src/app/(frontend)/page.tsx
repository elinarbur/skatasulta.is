import Image from "next/image";
import { getPayload } from "payload";
import config from "@/payload.config";
import { cn } from "lib/utils";
import Link from "next/link";
import { Header } from "components/header";
import { Frettavakt } from "components/svgs";

export const dynamic = "force-dynamic";

export default async function Home() {
    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });

    const posts = await payload.find({
        collection: "posts",
        where: { published: { not_equals: null } },
    });

    const header = await payload.findGlobal({ slug: "header" });
    const homepage = await payload.findGlobal({ slug: "homepage" });

    // prettier-ignore
    const top = homepage?.featuredPost && typeof homepage.featuredPost !== "number" ? homepage.featuredPost : posts.docs[0];
    const rest = posts.docs;

    return (
        <>
            <Header
                logo={{
                    urlDark: typeof header.logoDark !== "number" ? header.logoDark?.url : null,
                    urlLight: typeof header.logoLight !== "number" ? header.logoLight?.url : null,
                }}
            />

            <main className="flex-grow">
                <section id="cover" className="relative min-h-[36rem]">
                    <Link href={`/${top?.slug}`}>
                        <div className="absolute top-0 left-0 z-20 flex h-full w-full items-end bg-gradient-to-b from-black/40 to-black/85">
                            <div className="w-full">
                                <div className="container py-16">
                                    <div className="max-w-2xl">
                                        <div>
                                            {top?.type === "watch" && (
                                                <Frettavakt
                                                    done={
                                                        typeof top.watchEnded === "string"
                                                            ? top.watchEnded
                                                            : undefined
                                                    }
                                                    className="mb-4"
                                                />
                                            )}
                                            <h1 className="text-3xl leading-10 font-extrabold text-white uppercase md:text-5xl md:leading-14">
                                                {top?.title}
                                            </h1>
                                            <p className="mt-4 font-medium text-blue-400">
                                                Ritstjórn Skátasultunnar
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    {typeof top?.coverImage !== "number" && top?.coverImage?.url && (
                        <Image
                            src={top.coverImage.url}
                            alt={top.coverImage.alt}
                            fill
                            className="z-10 object-cover"
                        />
                    )}
                </section>

                <section id="top-stories" className="container py-16">
                    <div className="pb-8">
                        <h2 className="text-3xl leading-10 font-extrabold uppercase">
                            {homepage.latestSectionTitle}
                        </h2>
                    </div>

                    <div className="flex flex-col gap-32">
                        {rest.length < 1 && (
                            <div className="flex h-[20rem] items-center justify-center">
                                <div className="text-center">
                                    <p className="text-5xl font-extrabold text-gray-300">\(^_^)/</p>
                                    <p className="mt-6 text-2xl font-semibold text-gray-800">
                                        Eins og er höfum við ekkert meira efni fyrir ykkur ^w^
                                    </p>
                                </div>
                            </div>
                        )}

                        {rest.map((post, i) => (
                            <Link
                                key={i}
                                href={`/${post.slug}`}
                                className={cn(
                                    "group flex flex-col gap-16",
                                    i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row",
                                )}
                            >
                                <div className="relative min-h-[14rem] overflow-hidden md:w-1/2">
                                    {typeof post.coverImage !== "number" &&
                                        post.coverImage?.url && (
                                            <Image
                                                src={post.coverImage.url}
                                                alt={post.coverImage.alt}
                                                fill
                                                className="z-10 scale-[101%] object-cover object-bottom transition duration-300 ease-in-out group-hover:scale-105 md:min-h-auto"
                                            />
                                        )}
                                </div>

                                <div className="md:w-1/2">
                                    <div className="pb-6">
                                        <div
                                            className={cn(
                                                "h-2 w-full max-w-[100px]",
                                                post.bannerColour === "red" && "bg-red-500",
                                                post.bannerColour === "blue" && "bg-blue-500",
                                                post.bannerColour === "green" && "bg-green-500",
                                                post.bannerColour === "yellow" && "bg-blue-400",
                                                post.bannerColour === "black" && "bg-black",
                                                !post.bannerColour && "bg-gray-500",
                                            )}
                                        />
                                    </div>

                                    <h1 className="text-3xl leading-10 font-extrabold uppercase transition duration-300 ease-in-out group-hover:text-blue-500 md:text-5xl md:leading-14">
                                        {post.title}
                                    </h1>

                                    <p className="mt-4 text-xl font-semibold text-gray-800">
                                        {post.excerpt}
                                    </p>

                                    <p className="mt-4 font-semibold text-blue-700">
                                        Ritstjórn Skátasultunnar
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
