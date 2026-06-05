/** @type {import('next').NextConfig} */
const nextConfig = {
      reactStrictMode: true,
	poweredByHeader: false,
	output: 'standalone',
	trailingSlash: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			}
		],
		dangerouslyAllowSVG: false
	},
	typedRoutes: false,
	experimental: {
		optimizePackageImports: ['tailwindcss'],
		serverActions: {
			bodySizeLimit: '2mb'
		},
	},
	compress: true
};

export default nextConfig;
