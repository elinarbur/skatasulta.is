import { GlobalConfig } from "payload";

export const Adverts: GlobalConfig = {
    slug: "adverts",
    label: "Auglýsingar",
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "articleBannerTop",
            label: "Auglýsing á fréttasíðu, efst",
            type: "upload",
            relationTo: "media",
        },
    ],
};
