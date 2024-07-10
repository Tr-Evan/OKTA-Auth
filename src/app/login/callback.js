// pages/login/callback.js
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import oktaConfig from '../oktaConfig';

const LoginCallback = () => {
  const router = useRouter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const oktaAuth = new OktaAuth(oktaConfig);

  useEffect(() => {
    async function handleCallback() {
      const tokens = await oktaAuth.token.parseFromUrl();
      oktaAuth.tokenManager.setTokens(tokens);

      const originalUri = oktaAuth.getOriginalUri();
      router.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    }
    handleCallback();
  }, [router, oktaAuth]);

  return <div>Loading...</div>;
};

export default LoginCallback;