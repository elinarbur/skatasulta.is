// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from "@payloadcms/storage-s3";
import {
    FixedToolbarFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { Header } from "./globals/Header";
import { Footer } from "./globals/Footer";
import { Homepage } from "./globals/Homepage";
import { License } from "./globals/License";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        livePreview: {
            url: ({ data, req }) => `${req.protocol}//${req.host}/${data.slug}`,
            collections: ["pages"],
        },
    },
    collections: [Users, Media, Posts],
    globals: [Header, Footer, Homepage, License],
    editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
            ...defaultFeatures,
            InlineToolbarFeature(),
            FixedToolbarFeature(),
        ],
    }),
    secret: process.env.PAYLOAD_SECRET || "",
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } }),
    sharp,
    plugins: [
        s3Storage({
            collections: {
                media: true,
            },
            bucket: process.env.S3_BUCKET!,
            config: {
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
                },
                region: process.env.S3_REGION!,
            },
        }),
    ],
});
