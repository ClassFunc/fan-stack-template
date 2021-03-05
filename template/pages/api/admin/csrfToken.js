import cookies from '../../../utils/setCookie';
import {v4} from 'uuid';

const handler = (req, res) => {
  const csrfToken = v4();
  res.setCookie('csrfToken', csrfToken);
  res.json({csrfToken});
};

export default cookies(handler);

