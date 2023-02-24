/** @type {import('next').NextConfig} */

const nextConfig = {
	poweredByHeader: false,
	optimizeFonts: false,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL
	},

	images: {
		domains: [
			'hackaton-platform-bucket.s3.us-east-1.amazonaws.com',
			'otlichnik-kz.s3.amazonaws.com',
			'hackaton-platform-bucket.s3.amazonaws.com'
		]
	},

	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:8000/api/:path*'
			}
		]
	}
}

module.exports = nextConfig
