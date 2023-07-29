import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import initializeFirebaseServer from 'src/lib/initFirebaseAdmin';

export default async function login(req, res) {
  let address;

  try {
    const loginPayload = req.body.payload;
    const domain = process.env.NEXT_PUBLIC_NFTR_DOMAIN;

    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.ADMIN_PRIVATE_KEY,
      process.env.NEXT_PUBLIC_NETWORK_NAME // configure this to your network
    );
    address = sdk.auth.verify(domain, loginPayload);

    const { auth } = initializeFirebaseServer();

    const token = await auth.createCustomToken(address);

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
