// Import getUser from wherever you created the config
// eslint-disable-next-line import/no-unresolved
import { getUser } from 'src/pages/api/auth/[...thirdweb]';

const handler = async (req, res) => {
  // Get the authenticated user from the request
  const user = await getUser(req);

  // If the user is not authenticated, user will be null
  if (!user) {
    return res.status(401).json({
      message: 'Not authorized.',
    });
  }

  // Otherwise, user.address will be set
  return res.status(200).json({
    address: user.address,
  });
};

export default handler;
