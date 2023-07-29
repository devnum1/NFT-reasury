import { useEffect, useState } from 'react';
import LogRocket from 'logrocket';
import useFirebaseDocument from 'src/lib/useFirebaseUserDocument';

export default function LogrocketProvider({ children }) {
  const logrocketKey = process.env.NEXT_PUBLIC_LOGROCKET_KEY;
  const [isInitiated, setInitiated] = useState(false);
  const { document: user } = useFirebaseDocument();

  useEffect(() => {
    if (!isInitiated && logrocketKey) {
      LogRocket.init(logrocketKey);
      setInitiated(true)
    }
  }, [isInitiated]);

  useEffect(() => {
    if (isInitiated && user) {
      LogRocket.identify(user?.id, {
        name: user?.username,
        email: user?.email || '--'
      })
    }
  }, [isInitiated, user])

  return children;
}
