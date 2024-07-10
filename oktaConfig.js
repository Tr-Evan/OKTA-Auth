// oktaConfig.js
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  clientId: 'tmc6mLjB2S2P8SAxBhb24n3YZFdgFXwx',
  issuer: 'https://dev-fw0hwnkbbpt8a7d4.eu.auth0.com/oauth2/default',
  redirectUri: typeof window !== 'undefined' && window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
};