import {message} from 'antd';
import React, {useState} from 'react';
import {auth} from '../../firebase/clientApp';
import {useRouter} from 'next/router';
import {useGlobal} from 'reactn';
import {useFetch} from 'use-http';
import '../../styles/firebaseui-styling.module.css';
import pathTo from '../../utils/pathTo';
import {IS_ADMIN, IS_ADMIN_CHECK} from '../../config/constants';
import MainLogin from '../../components/Login/MainLogin';

const Login = () => {

  const [user, setUser] = useGlobal('user');
  const [loading, setLoading] = useState(false);
  const {get: getCsrfToken} = useFetch(pathTo('csrfToken', true));
  const {post: postIdTokenToSessionLogin} = useFetch(
      pathTo('sessionLogin', true));
  const router = useRouter();

  const onLogin = async (values) => {
    setLoading(true);
    try {
      const {email, password} = values;
      const {user} = await auth.signInWithEmailAndPassword(
          email, password,
      );
      if (!user) {
        message.error('no user found');
        await auth.signOut();
        return;
      }
      createSession(user);
    } catch (e) {
      setUser();
      await auth.signOut();
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error(errorInfo);
  };

  async function createSession(user) {
    if (!IS_ADMIN) return;
    const {token, claims} = await user.getIdTokenResult();
    if (IS_ADMIN_CHECK && !claims?.admin) {
      message.error(<p>
            bạn ko có quyền admin <br/>
            đang chuyển hướng tới trang login...
          </p>,
      );
      await auth.signOut();
      setTimeout(() => router.reload(), 2000);
      return;
    }
    const {csrfToken} = await getCsrfToken();
    const {status} = await postIdTokenToSessionLogin(
        {idToken: token, csrfToken});
    if (status === 'success') {
      await auth.signOut();
      await router.replace('/');
      await router.reload();
    }
  }

  if (user) {
    router.replace('/');
    return null;
  }

  return (
      <MainLogin onEmailPassLogin={onLogin}
                 onFinishFailed={onFinishFailed}
                 createSession={createSession}
                 loading={loading}
      />
  );
};

export default Login;
