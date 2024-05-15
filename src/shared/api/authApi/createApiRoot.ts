// /* eslint-disable no-console */
// import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

// import commerceToolsClient from './commerceToolsClient.ts';

// async function apiRootAnonim() {
//   try {
//     const apiRoot = await createApiBuilderFromCtpClient(
//       commerceToolsClient,
//     ).withProjectKey({ projectKey: 'e-commerce-project-gg' });
//     const getProject = async () => apiRoot.get().execute();

//     console.log(await getProject());
//   } catch (error) {
//     console.log(error);
//   }
// }

// export default apiRootAnonim;

// // const baseQuery: BaseQueryFn<FetchArgs, unknown, unknown> = async (args) => {
// //   try {
// //     const result: ClientResponse<any> = await apiRoot.execute(args);

// //     return { data: result.body };
// //   } catch (error) {
// //     return { error: error.message };
// //   }
// // };

// // export const authApi = createApi({
// //   reducerPath: 'authApi',
// //   baseQuery,
// //   endpoints: (builder) => ({
// //     register: builder.mutation<AuthenticatorResponse, Partial<User>>({
// //       query: (user) => ({
// //         url: `/${client.projectKey}/customers`,
// //         method: 'POST',
// //         body: {
// //           email: user.email,
// //           password: user.password,
// //           firstName: user.firstName,
// //           lastName: user.lastName,
// //         },
// //       }),
// //     }),
// //     login: builder.mutation<AuthResponse, { email: string; password: string }>({
// //       query: (credentials) => ({
// //         url: `/${client.projectKey}/login`,
// //         method: 'POST',
// //         body: {
// //           email: credentials.email,
// //           password: credentials.password,
// //         },
// //       }),
// //     }),
// //   }),
// // });

// // export const { useRegisterMutation, useLoginMutation } = authApi;
