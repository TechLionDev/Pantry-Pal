/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
	reactStrictMode: true,
	images: {
		unoptimized: true
	},
  distDir: 'out'
};

module.exports = nextConfig;
