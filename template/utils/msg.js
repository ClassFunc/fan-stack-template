import {message} from 'antd';

const defaultSetting = {
  type: 'info',
  position: 'bottomRight',
};
export default function msg(content, options) {
  options = {...defaultSetting, ...options} || defaultSetting;
  const t = message[options.type];
  // const mTop = window.innerHeight - 100;
  const {innerWidth: w, innerHeight: h} = window;
  let msgStyle = {};
  switch (options.position) {
    case 'bottom':
    case 'b':
      msgStyle = {
        marginTop: h - 100,
      };
      break;
    case 'bottomRight':
    case 'br':
      msgStyle = {
        marginTop: h - 100,
        marginLeft: w - 200,
      };
      break;
    case 'bottomLeft':
    case 'bl':
      msgStyle = {
        marginTop: h - 100,
        marginRight: w - 200,
      };
      break;
  }
  t({
    content,
    style: msgStyle,
  });
}
