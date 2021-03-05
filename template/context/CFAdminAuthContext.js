import React, {createContext, useEffect, useState} from 'react';
import {useGlobal} from 'reactn';
import {useFetch} from 'use-http';
import {useRouter} from 'next/router';
import pathTo from '../utils/pathTo';

const CFAdminAuthContext = createContext({});

const CFAdminAuthProvider = ({children}) => {
  const {loading, user, error} = useUser(); //{loading, user: gUser}
  if (loading) return 'loading admin user...';
  if (error) return JSON.stringify(error, null, 2);
  return (
      <CFAdminAuthContext.Provider value={{loading, user}}>
        {children}
      </CFAdminAuthContext.Provider>
  );
};

const useUser = () => {
  const [gUser, setGUser] = useGlobal('user');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {post: tryLogin} = useFetch(pathTo('tryLogin', true));
  const [ready, setReady] = useState(false);

  const router = useRouter();
  useEffect(() => {
    tryLogin().then(async ({user}) => {
      if (!user) {
        await router.push(pathTo('login'));
        setReady(true);
        return;
      }
      await setGUser({...user}, () => setReady(true));
      router.push('/');
    }).catch(async e => {
      console.error(e.message);
      setError(e);
      setGUser(null, () => setReady(true));
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return {
    loading: loading || !ready,
    user: gUser,
    error,
  };
};

export {
  CFAdminAuthProvider,
  CFAdminAuthContext,
};
