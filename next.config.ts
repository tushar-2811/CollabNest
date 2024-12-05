import type { NextConfig } from "next";
import { hostname } from "os";

const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = {
    images : {
        remotePatterns : [
            {
                protocol : "https",
                hostname : "github.com"
            }
        ]
    }
};

export default withNextIntl(nextConfig);