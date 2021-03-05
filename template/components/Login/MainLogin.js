import {Button, Divider, Form, Input, Typography} from 'antd';
import styles from '../../styles/login.module.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {auth} from '../../firebase/clientApp';
import firebase from 'firebase/app';
import {IS_ADMIN} from '../../config/constants';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function MainLogin({
  onEmailPassLogin,
  onFinishFailed,
  loading,
  createSession,
}) {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: async ({user}) => {
        // console.log({user});
        createSession?.(user);
        return true;
      },
    },
  };

  return (
      // <Layout>
      <div>
        <Typography className={styles.title}>
          ĐĂNG NHẬP {IS_ADMIN ? 'admin' : ''}
        </Typography>
        <Divider/>
        <div className={styles.container}>
          <div>
            <StyledFirebaseAuth uiConfig={uiConfig}
                                firebaseAuth={auth}/>
          </div>
          <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onEmailPassLogin}
              onFinishFailed={onFinishFailed}
          >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
            >
              <Input.Password/>
            </Form.Item>


            <Form.Item {...tailLayout}>
              <Button type="primary"
                      htmlType="submit"
                      loading={loading}>
                Đăng Nhập
              </Button>
            </Form.Item>
          </Form>
        </div>

      </div>
      // </Layout>
  );

}
