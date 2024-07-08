// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Security, LoginCallback } from '@okta/okta-react';
import oktaConfig from '../oktaConfig';

function OktaAuth({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/callback') return;
    const oktaAuth = new OktaAuth(oktaConfig);
    if (oktaAuth.tokenManager.getTokens()) {
      router.push('/');
    }
  }, [router]);

  return (
    <Security {...oktaConfig}>
      <Component {...pageProps} />
    </Security>
  );
}

export default OktaAuth;
