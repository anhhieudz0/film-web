const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  // Add other PWA options here
};

export default pwaConfig;
