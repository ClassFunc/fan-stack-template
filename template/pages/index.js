import React from 'react';
import {useGlobal} from 'reactn';
import {useRouter} from 'next/router';
import pathTo from '../utils/pathTo';

export default function Home() {
  const [user] = useGlobal('user');
  const router = useRouter();

  if (!user) {
    router.push(pathTo('login'));
    return `redirecting login page...`;
  }
  return (
      <div>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
  );
}
