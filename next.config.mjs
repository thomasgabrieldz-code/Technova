/** Cloudflare Pages: exportação estática, sem servidor Node. */
const nextConfig = { output: "export", trailingSlash: true, images: { unoptimized: true } };
export default nextConfig;
