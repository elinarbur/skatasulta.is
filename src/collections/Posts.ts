import type { CollectionConfig } from "payload";
import { format } from "date-fns";

export const Posts: CollectionConfig = {
    slug: "posts",
    access: {
        read: () => {
            return true;
        },
    },
    hooks: {
        beforeChange: [
            ({ data, operation }) => {
                if (operation === "create") {
                    const slug_date = format(new Date(data.published), "yyyy-MM-dd");
                    const title_slug = data.title.toLowerCase();

                    let slug_title = "";
                    for (let i = 0; i < title_slug.length; i++) {
                        const char = title_slug[i];
                        if (!char) {
                            continue;
                        }

                        switch (char) {
                            case " ": {
                                slug_title += "-";
                                break;
                            }

                            case "á": {
                                slug_title += "a";
                                break;
                            }

                            case "ð": {
                                slug_title += "eth";
                                break;
                            }

                            case "é": {
                                slug_title += "e";
                                break;
                            }

                            case "í": {
                                slug_title += "i";
                                break;
                            }

                            case "ó": {
                                slug_title += "o";
                                break;
                            }

                            case "ú": {
                                slug_title += "u";
                                break;
                            }

                            case "ý": {
                                slug_title += "y";
                                break;
                            }

                            case "þ": {
                                slug_title += "th";
                                break;
                            }

                            case "æ": {
                                slug_title += "ae";
                                break;
                            }

                            case "ö": {
                                slug_title += "o";
                                break;
                            }

                            case "a":
                            case "b":
                            case "c":
                            case "d":
                            case "e":
                            case "f":
                            case "g":
                            case "h":
                            case "i":
                            case "j":
                            case "k":
                            case "l":
                            case "m":
                            case "n":
                            case "o":
                            case "p":
                            case "r":
                            case "s":
                            case "t":
                            case "u":
                            case "v":
                            case "x":
                            case "y":
                            case "0":
                            case "1":
                            case "2":
                            case "3":
                            case "4":
                            case "5":
                            case "6":
                            case "7":
                            case "8":
                            case "9": {
                                slug_title += char;
                            }
                        }
                    }

                    return {
                        ...data,
                        slug: `${slug_date}-${slug_title}`,
                    };
                }

                return data;
            },
        ],
    },
    fields: [
        {
            name: "slug",
            type: "text",
            admin: {
                condition: () => false,
            },
        },
        {
            label: "Birt dags",
            name: "published",
            type: "date",
            admin: {
                description:
                    "Dagsetning sem greinin er birt. Ef ekkert er fyllt inn sést greinin ekki.",
                date: { pickerAppearance: "dayAndTime" },
            },
            defaultValue: () => new Date().toISOString(),
        },
        {
            label: "Styttri vefslóð",
            name: "humanSlug",
            type: "text",
            unique: true,
            admin: {
                description:
                    'Valkvætt: búa til styttri vefslóð inn á greinina. T.d. ef slegið er inn "skatathing2025" þá yrði slóðin á greinina skatasulta.is/skatathing2025',
            },
        },
        {
            label: "Gerð greinar",
            name: "type",
            type: "select",
            required: true,
            options: [
                {
                    label: "Grein",
                    value: "article",
                },
                {
                    label: "Fréttavakt",
                    value: "watch",
                },
            ],
            hasMany: false,
            defaultValue: "article",
        },
        {
            label: "Fréttavakt lauk dags",
            name: "watchEnded",
            type: "date",
            admin: {
                description:
                    "Ef fréttavakt hefur lokið, dagsetningin sem henni lauk á stimplast hér inn.",
                condition: (data) => data.type === "watch",
                date: { pickerAppearance: "dayAndTime" },
            },
        },
        {
            label: "Titill/fyrirsögn",
            name: "title",
            type: "text",
            required: true,
            admin: {
                description: "Titillinn/fyrirsögn greinarinnar.",
            },
        },
        {
            label: "Forsíðumynd",
            name: "coverImage",
            type: "upload",
            relationTo: "media",
            admin: {
                description: "Mynd sem sýnist efst og á forsíðu.",
            },
        },
        {
            label: "Úrdráttur",
            name: "excerpt",
            type: "textarea",
            required: true,
            admin: {
                description: "Úrdrátturinn sem birtist á heimasíðu, 30-50 orð mest.",
            },
        },
        {
            label: "Litur borða",
            name: "bannerColour",
            type: "select",
            options: [
                {
                    label: "Rauður",
                    value: "red",
                },
                {
                    label: "Blár",
                    value: "blue",
                },
                {
                    label: "Grænn",
                    value: "green",
                },
                {
                    label: "Gulur",
                    value: "yellow",
                },
                {
                    label: "Svartur",
                    value: "black",
                },
            ],
        },
        {
            label: "Meginmál",
            name: "content",
            type: "richText",
            admin: {
                description: "Meginmál greinarinnar.",
                condition: (data) => data.type === "article",
            },
        },
        {
            label: "Fréttabrot",
            name: "watchEntries",
            type: "array",
            fields: [
                {
                    label: "Birt dags",
                    name: "published",
                    type: "date",
                    required: true,
                    admin: {
                        description:
                            "Dagsetning sem brotið er birt. Ef ekkert er fyllt inn sést greinin ekki.",
                        date: { pickerAppearance: "dayAndTime" },
                    },
                    defaultValue: () => new Date().toISOString(),
                },
                {
                    label: "Titill/fyrirsögn",
                    name: "title",
                    type: "text",
                    required: true,
                    admin: {
                        description: "Titillinn/fyrirsögn brotsins.",
                    },
                },
                {
                    label: "Meginmál",
                    name: "content",
                    type: "richText",
                    required: true,
                    admin: {
                        description: "Meginmál brotsins.",
                    },
                },
            ],
            admin: {
                description: "Titillinn/fyrirsögn greinarinnar.",
                condition: (data) => data.type === "watch",
            },
        },
    ],
};
