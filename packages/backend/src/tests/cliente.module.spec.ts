
// import { Cliente } from '@/modules/cliente';
// import { Provider } from '@/modules/cliente/provider';
// import { execute } from 'graphql';
// import gql from 'graphql-tag';

// describe('Modulo Cliente', () => {
//   it('FieldResolver of Query: userById', async () => {
//     const { schema, injector } = Cliente;

//     injector.provide({
//       provide: Provider,
//       overwrite: true,
//       useValue: {
//         show (id) {
//           return Promise.resolve({});
//         },
//         list (limit) {
//           return Promise.resolve([]);
//         },
//         store (pessoa) {
//           return Promise.resolve({});
//         },
//         update (pessoa) {
//           return Promise.resolve({});
//         },
//         delete (id) {
//           return Promise.resolve('oi');
//         }
//       }
//     });

//     const result = await execute({
//       schema,
//       document: gql`
//         query {
//           cliente(id: "ANOTHERID") {
//             id
//             username
//           }
//         }
//       `,
//       contextValue: {}
//     });
//     expect(result.errors).toBeFalsy();
//     expect(result.data.userById.id).toBe('ANOTHERID');
//     expect(result.data.userById.username).toBe('USERNAME');
//   });
// });
