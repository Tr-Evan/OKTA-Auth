// pages/_app.js
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { OktaAuthProvider } from '@okta/okta-react';
import oktaConfig from '../oktaConfig';

const oktaAuth = new OktaAuth(oktaConfig);

const MyApp = ({ Component, pageProps }) => {
  return (
    <OktaAuthProvider oktaAuth={oktaAuth}>
      <Component {...pageProps} />
    </OktaAuthProvider>
  );
};

export default MyApp;