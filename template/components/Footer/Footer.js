import React from 'react';
import {Col, Row} from 'antd';
import styles from './Footer.module.css';
import {
  FacebookOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

function Footer(props) {
  return (
      <div className={styles.container}>
        <Row className={styles.mainRow} id={'footer'}>
          <Col sm={24} md={12}>
            <div className={styles.centerText}>
              <div className={styles.img}>
                <img
                    src={'/img/logo-classfunc6.png'}
                    width={'256'}
                    height={'59'}
                    alt={'logo'}
                />
              </div>

              <p className={styles.name}>CÔNG TY CỔ PHẦN PHẦN MỀM CLASSFUNC</p>
            </div>
          </Col>
          <Col sm={24} md={12}>
            <div className={styles.info}>
              <p>
                <span>
                  <HomeOutlined/>{' '}
                </span>
                <a
                    href={'https://www.google.com/maps/place/CEN+X+SPACE+-+DOLPHIN+PLAZA/@21.0295491,105.7755357,18.32z/data=!4m12!1m6!3m5!1s0x313454b3d7461d09:0xbd5fcd0a95b91ea6!2zVmlldCBNRVAgLSBUaGnhur90IEvhur8gxJBp4buHbiBuxrDhu5tjIG5ow6AgZMOibg!8m2!3d21.0302289!4d105.7765728!3m4!1s0x31345595b4c3cbbb:0x96d4b2078ed49436!8m2!3d21.0299601!4d105.7764731?hl=vi-VN'}>P08
                  CENXSPACE, DOLPHIN PLAZA,<br/>
                  MỸ ĐÌNH 2, NAM TỪ LIÊM, HN
                </a>
              </p>
              <p>
                <span><PhoneOutlined/> </span><a
                  href="tel:0966510002">0966510002</a>
              </p>
              <p>
                <span><MailOutlined/> </span><a
                  href="mailto:hello@classfunc.com">hello@classfunc.com</a>
              </p>
              <p>
                <span><FacebookOutlined/> </span><a
                  href="https://www.facebook.com/classfunc">fb.me/classfunc</a>
              </p>
              <p>
                <Link href="/privacy-policy.html"><a>Privacy Policy</a></Link>
              </p>
            </div>
          </Col>
        </Row>
      </div>
  );
}

export default Footer;
