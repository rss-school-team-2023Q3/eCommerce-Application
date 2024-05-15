// import {
//   ClientBuilder,
//   type AuthMiddlewareOptions,
//   // type HttpMiddlewareOptions,
// } from '@commercetools/sdk-client-v2';
// import fetch from 'node-fetch';
// import {
//   projectKey,
//   authHost,
//   clientId,
//   clientSecret,
//   scope,
// } from 'shared/constants/envConstants';

// const authMiddlewareOptions: AuthMiddlewareOptions = {
//   host: authHost,
//   projectKey,
//   credentials: {
//     clientId,
//     clientSecret,
//   },
//   scopes: [scope],
//   fetch,
// };

// // const httpMiddlewareOptions: HttpMiddlewareOptions = {
// //   host: apiHost,
// //   fetch,
// // };

// const commerceToolsClient = new ClientBuilder()
//   .withProjectKey(projectKey)
//   .withClientCredentialsFlow(authMiddlewareOptions)
//   // .withHttpMiddleware(httpMiddlewareOptions)
//   .build();

// export default commerceToolsClient;
