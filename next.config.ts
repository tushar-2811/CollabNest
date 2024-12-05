import type { NextConfig } from "next";

const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = {};

export default withNextIntl(nextConfig);