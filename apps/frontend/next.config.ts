import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    /* config options here */
    images: {

        remotePatterns: [
            {
                hostname: "via.placeholder.com",
            },
            {
                hostname: "placehold.co",
            },
            {
                hostname: "down-vn.img.susercontent.com",
            },
            {
                hostname: "qr.sepay.vn"
            }
        ],

    }
};

export default nextConfig;