import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    newNextLinkBehavior: true,
  },
  reactStrictMode: false,
  transpilePackages: [
    'rc-util',
    '@ant-design',
    'kitchen-flow-editor',
    '@ant-design/pro-editor',
    'zustand', 'leva', 'antd',
    'rc-pagination',
    'rc-picker'
  ],
};

export default nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})(nextConfig);
