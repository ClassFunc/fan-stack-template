import {IS_ADMIN} from '../config/constants';

const pathTo = (path, api = false) => {
  if (IS_ADMIN) {
    if (api && path.startsWith('/api/admin')) return path;
    if (path.startsWith('/admin')) return path;
    return `${api ? '/api' : ''}/admin${!path.startsWith('/')
        ? `/${path}`
        : path}`;
  }
  return path;
};

export default pathTo;
