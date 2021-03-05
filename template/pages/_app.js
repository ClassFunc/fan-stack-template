import 'antd/dist/antd.css';
import '../styles/globals.css';
import React from 'react';
import {auth, db} from '../firebase/clientApp';
import '../config/globalState';
import Head from 'next/head';
import Footer from '../components/Footer/Footer';
// import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
// import * as gtag from '../lib/gtag';
// import {useRouter} from 'next/router';
import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/lib/locale/vi_VN';
import {ConfigProvider} from 'antd';
import {IS_ADMIN} from '../config/constants';
import Appbar from '../components/AppHeader/Appbar';
import dynamic from 'next/dynamic';

moment.locale('vi');

function MyApp({Component, pageProps}) {

  // comment out below if you use gtag for analytics
  // const router = useRouter();
  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     gtag.pageview(url);
  //   };
  //   router.events.on('routeChangeComplete', handleRouteChange);
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);

  const AuthComp = React.useMemo(() => {
    if (IS_ADMIN)
      return dynamic(
          () => import('../context/CFAdminAuthContext').then(
              mod => mod.CFAdminAuthProvider));
    return dynamic(() => import('../context/CFAuthProvider').then(
        mod => mod.CFAuthProvider));
  }, []);

  return (
      <>
        <Head>
          <meta name="viewport"
                content="initial-scale=1.0, width=device-width"/>
          <meta property="og:title" content="CLASSFUNC SOFTWARES"/>
          <meta property="og:description"
                content="Phát triển bền vững cùng Javascript"/>
          <meta property="og:url" content="https://classfunc.com"/>
          <meta property="og:image"
                content="https://classfunc.com/img/common/classfunc-ogp.png"/>
          <meta property="og:image:type" content="image/png"/>
          <meta property="og:site_name" content="CLASSFUNC SOFTWARES"/>
          <meta property="og:type" content="website"/>
        </Head>
        {/*<GoogleReCaptchaProvider*/}
        {/*    reCaptchaKey={'6L...'}*/}
        {/*    useEnterprise={true}*/}
        {/*    language={'vi'}*/}
        {/*>*/}
        <AuthComp
            auth={auth}
            firestore={db}
        >
          <ConfigProvider locale={locale}>
            <Appbar title={'My FAN Stack'}/>
            <Component {...pageProps} />
            <Footer/>
          </ConfigProvider>
        </AuthComp>
        {/*</GoogleReCaptchaProvider>*/}
      </>
  );
}

export default MyApp;

export function reportWebVitals({id, name, label, value}) {
  // console.log({id, name, label, value});
  // Use `window.gtag` if you initialized Google Analytics as this example:
  // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js
  if (typeof window.gtag === 'undefined') return;
  window.gtag('event', name, {
    event_category:
        label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  });
}
