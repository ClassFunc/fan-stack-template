import {message} from 'antd';
import React, {useState} from 'react';
import {auth} from '../firebase/clientApp';
import {useGlobal} from 'reactn';
import '../styles/firebaseui-styling.module.css';
import {useRouter} from 'next/router';
import MainLogin from '../components/Login/MainLogin';

const Login = () => {

  const [user, setUser] = useGlobal('user');
  const [loading, setLoading] = useState(false);
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
        return;
      }
    } catch (e) {
      setUser();
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (user) {
    router.push(`/`);
    return null;
  }

  return (
      <MainLogin onEmailPassLogin={onLogin}
                 onFinishFailed={onFinishFailed}
                 loading={loading}
      />
  );
};

export default Login;
