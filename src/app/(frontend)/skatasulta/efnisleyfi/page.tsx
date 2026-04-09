import { getPayload } from "payload";
import config from "@/payload.config";
import { Header } from "components/header";
import { notFound } from "next/navigation";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";

export default async function License() {
    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });

    const header = await payload.findGlobal({ slug: "header" });
    const license = await payload.findGlobal({ slug: "license" });

    if (!license) {
        return <div>Eitthvað er ekki að virka sem skyldi :/</div>;
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
                <div className="mx-auto max-w-screen-md px-8 pt-16">
                    <div>
                        <h1 className="text-3xl leading-10 font-extrabold uppercase md:text-5xl md:leading-14">
                            {license.title}
                        </h1>
                    </div>
                </div>

                {license.content && (
                    <div className="mx-auto max-w-screen-md px-8 pt-8 pb-16">
                        <div
                            className="prose prose-article w-full max-w-full"
                            dangerouslySetInnerHTML={{
                                __html: convertLexicalToHTML({
                                    data: license.content,
                                }),
                            }}
                        />
                    </div>
                )}
            </main>
        </>
    );
}
