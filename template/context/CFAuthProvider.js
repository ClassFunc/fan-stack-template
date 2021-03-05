import React, {createContext, useEffect, useState} from 'react';
import {useGlobal} from 'reactn';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useDocument} from 'react-firebase-hooks/firestore';

const CFAuthContext = createContext(null);

const useUser = ({auth, firestore}) => {
  const [gUser, setGUser] = useGlobal('user');
  const [user, loading, error] = useAuthState(auth);
  const [doc, docLoading, docError] = useDocument(
      user?.uid ? firestore?.doc(`users/${user.uid}`) : undefined,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loading || docLoading) return;
    if (!user) {
      setGUser(undefined, () => {
        setReady(true);
      });
      return;
    }

    setGUser({
      ...user.toJSON(),
      docId: doc?.id,
      ...doc?.data(),
    }, () => {
      setReady(true);
    });

  }, [user, loading, doc, docLoading]);

  return {
    user: gUser || user?.toJSON(),
    loading: loading || docLoading || !ready,
    error: (error || docError) ? {error, docError} : null,
  };
};

const CFAuthProvider = ({auth, firestore, children}) => {
  const {user, loading, error} = useUser({auth, firestore});
  if (loading) return 'loading user...';
  if (error) {
    console.log(error);
    return JSON.stringify(error, null, 2);
  }
  return (
      <CFAuthContext.Provider value={{user, loading, error}}>
        {children}
      </CFAuthContext.Provider>
  );
};

export {
  CFAuthProvider,
  CFAuthContext,
};
