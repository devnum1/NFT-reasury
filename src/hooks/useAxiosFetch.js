import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useAxiosFetch = (url) => {
  const [res, setRes] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  let source = axios.CancelToken.source();
  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      axios
        .get(url, {
          cancelToken: source.token,
        })
        .catch(function (thrown) {
          if (axios.isCancel(thrown)) {
            console.log(`%c🛑 Request cancelled: %c${thrown.message}`, 'color: #9322D0', 'color: #F328A5');
          } else {
            console.group('%c🛑 Something wrong with the request...', 'color: #FF4842');
            console.error(thrown);
            console.groupEnd();
          }
        })
        .then((a) => {
          setRes(a);
          setLoading(false);
        });
    } catch (e) {
      setRes(null);
      setIsError(e);
    }

    // if (source) {
    //   console.log('source defined');
    // } else {
    //   console.log('source NOT defined');
    // }
  }, []);

  useEffect(() => {
    fetch();

    return function () {
      // console.log('cleanup of useAxiosFetch called');
      // if (source) {
      //   console.log('source in cleanup exists');
      // } else {
      //   source.log('source in cleanup DOES NOT exist');
      // }
      source.cancel('Cleanup...');
    };
  }, []);

  return { res, isLoading, isError, fetch };
};

export default useAxiosFetch;
