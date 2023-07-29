

This is a Kei Finance Landing Page with [Next.js](https://nextjs.org/)  bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development

First, setup environment variable by creating file `.env.local`, or rename the `env.sample` file into `.env.local`. or use environment variable if you deploy into a server.

### Enviroment Variables

- Setup Firebase Database as instructed in [setup-thirdweb-firebase](https://portal.thirdweb.com/auth/integrations/firebase)
- Get Firebase Admin private key as instructed in [Generate Firebase Private Key](https://firebase.google.com/docs/admin/setup#:~:text=To%20generate%20a%20private%20key,JSON%20file%20containing%20the%20key.)


```bash
#ENVIRONMENT VARIABLES
NEXT_PUBLIC_API_KEY=AIzaSyBCnpZUWXn6sTbmfXIMgYJqbpeuJqniJ8I

NEXT_PUBLIC_AUTH_DOMAIN=<firebase_auth_domain>
NEXT_PUBLIC_PROJECT_ID=<firebase_project_id>
NEXT_PUBLIC_STORAGE_BUCKET=<firebase_storage_bucket>
NEXT_PUBLIC_MESSAGING_SENDER_ID=<firebase_mess_sender_id>
NEXT_PUBLIC_APP_ID=<firebase_app_id>
NEXT_PUBLIC_MEASUREMENT_ID=<firebase_mess_id>

FIREBASE_PROJECT_ID=<firebase_project_id>
FIREBASE_TYPE=service_account
FIREBASE_PRIVATE_KEY_ID=<firebase_private_key_id>
FIREBASE_PRIVATE_KEY=<firebase_private_key>
FIREBASE_CLIENT_EMAIL=<firebase_client_email>
FIREBASE_CLIENT_ID=<firebase_client_id>
FIREBASE_AUTH_URI=<firebase_auth_uri>
FIREBASE_TOKEN_URI=<firebase_token_uri>
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=<firebase_auth_provider_x509>
FIREBASE_AUTH_CLIENT_X509_CERT_URL=<firebase_auth_client>

ADMIN_PRIVATE_KEY=<admin_private_key>
NEXT_PUBLIC_NFTR_DOMAIN=localhost:4040

NEXT_PUBLIC_CONTRACT_ADDRESS=<custom_smart_contract>
NEXT_PUBLIC_MARKETPLACE_ADDRESS=<marketplace_contract>
NEXT_PUBLIC_CHAINS=[80001]
NEXT_PUBLIC_DESIRED_CHAIN_ID=80001
NEXT_PUBLIC_NETWORK_NAME=mumbai
NEXT_PUBLIC_MARKUP_TIMES_VALUE=1.1

NEXT_PUBLIC_ALCHEMY_NETWORK=polygon-mumbai
NEXT_PUBLIC_ALCHEMY_API_KEY=<alchemy_api_key>
```
Next step, install dependencies and run the development server:

```bash
# install dependencies
yarn

# running in local
yarn dev
```

Open [http://localhost:4040](http://localhost:4040) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.js`. The page auto-updates as you edit the file.

To edit section in homepage, you can edit `src/sections/home/` files. Already put naming as in the design.

## MUI

To support Light/Dark Mode out of the box, we use MUI (Material UI), take a look at the followin resources:
- [MUI Documentation](https://mui.com/getting-started/usage) - official documentation of MUI.
- [MUI Components](https://mui.com/components) - How to use and to custom components from MUI.

### Theme

All codes related to theme are in the `src/theme` folder.
- `src/theme/palette.js` is use to config the color for the light mode or the dark mode.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
