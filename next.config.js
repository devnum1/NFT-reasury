/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * Whitelist images source's domains
   * to enable compression
   */
  images: {
    domains: [
      'gateway.ipfscdn.io',
      'ipfs.io',
      'cloudflare-ipfs.com',
      'i.pravatar.cc',
      's2.coinmarketcap.com',
      'loremflickr.com',
      'img.youtube.com',
      'images.pexels.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    ADMIN_PRIVATE_KEY: process.env.ADMIN_PRIVATE_KEY,
    NEXT_PUBLIC_NFTR_DOMAIN: process.env.NEXT_PUBLIC_NFTR_DOMAIN,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_STORAGE_BUCKET: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    NEXT_PUBLIC_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID,
    NEXT_PUBLIC_MEASUREMENT_ID: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    NEXT_PUBLIC_MARKETPLACE_ADDRESS: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    NEXT_PUBLIC_CHAINS: process.env.NEXT_PUBLIC_CHAINS,
    NEXT_PUBLIC_DESIRED_CHAIN_ID: process.env.NEXT_PUBLIC_DESIRED_CHAIN_ID,
    NEXT_PUBLIC_ALCHEMY_NETWORK: process.env.NEXT_PUBLIC_ALCHEMY_NETWORK,
    NEXT_PUBLIC_NETWORK_NAME: process.env.NEXT_PUBLIC_NETWORK_NAME,
    NEXT_PUBLIC_MARKUP_TIMES_VALUE: process.env.NEXT_PUBLIC_MARKUP_TIMES_VALUE,
    NEXT_PUBLIC_CURRENCY: process.env.NEXT_PUBLIC_CURRENCY,
    FIREBASE_TYPE: process.env.FIREBASE_TYPE,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
    FIREBASE_AUTH_URI: process.env.FIREBASE_AUTH_URI,
    FIREBASE_TOKEN_URI: process.env.FIREBASE_TOKEN_URI,
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    FIREBASE_AUTH_CLIENT_X509_CERT_URL: process.env.FIREBASE_AUTH_CLIENT_X509_CERT_URL,
  },
};

module.exports = nextConfig;
