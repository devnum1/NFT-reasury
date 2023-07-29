import { isFunction } from 'lodash';
import { useEffect } from 'react';
import sleep from 'sleep-promise';

export default function AutoLogin({ signIn }) {
  const handleSignIn = async () => {
    await sleep(1 * 1000)
    signIn();
  }
  useEffect(() => {
    if (isFunction(signIn)) {
      handleSignIn()
    }
  }, [signIn]);
  return null;
}
