/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

module.exports = {
    experimental: {
        // reactRefresh: true,
        appDir: false,
    },
    images: {
        domains: [
            "0.gravatar.com",
            "localhost",
            "tailwindui.com",
            "2.gravatar.com",
            "1.gravatar.com",
            "lh3.googleusercontent.com",
        ],
    },
};
