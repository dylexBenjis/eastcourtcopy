/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {protocol: 'https', 
        hostname: "ejhtl7z1mmsysnco.public.blob.vercel-storage.com",
        port: '',
        pathname: '/**'},
        {protocol: 'https', 
          hostname: "lh3.googleusercontent.com",
          port: '',
          pathname: '/a/**'},
  ]},
}

export default nextConfig
