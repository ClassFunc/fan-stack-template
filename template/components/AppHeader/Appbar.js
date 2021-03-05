import React from 'react';
import {useGlobal} from 'reactn';
import {useRouter} from 'next/router';
import styles from './Appbar.module.css';
import {Avatar, Menu, message, Popover} from 'antd';
import {auth} from '../../firebase/clientApp';
import {LoginOutlined} from '@ant-design/icons';
import {IS_ADMIN} from '../../config/constants';
import {useFetch} from 'use-http';
import pathTo from '../../utils/pathTo';
import Link from 'next/link';

function AppBar({title = 'classfunc'}) {
  const [user, setUser] = useGlobal('user');
  const router = useRouter();
  const {post: sessionLogout} = useFetch(pathTo('sessionLogout', true));

  const onLogOut = async () => {
    if (IS_ADMIN) {
      await sessionLogout();
      await setUser(null);
      router.replace(pathTo('login'));
    } else {
      auth.signOut().then(function() {
        router.replace(pathTo('login'));
      }).catch(function(error) {
        message.error(error.message);
      });
    }
  };

  return (
      <div className={styles.AppBar}>
        <Link href={'/'}>
          <a>
            <img
                className={styles.image}
                src={'/img/logo-classfunc6.png'}
                alt={'classfunc-logo'}
            />
          </a>
        </Link>

        <p className={styles.title}>{title}</p>
        {
          user &&
          <Popover placement="bottomRight"
                   title={
                     <>
                       Hi <span>{user?.displayName}</span>
                     </>
                   }
                   content={
                     <Menu>
                       <Menu.Item onClick={onLogOut}
                                  key="logout_btn"
                                  icon={<LoginOutlined/>}>
                         Đăng xuất
                       </Menu.Item>
                     </Menu>
                   }
                   trigger="click">
            <a>
              <Avatar size={64}
                      icon={<img src={user?.photoURL} alt={'avatar'}/>}/>
            </a>
          </Popover>
        }
      </div>
  );
}

export default AppBar;
