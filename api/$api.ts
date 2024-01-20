import type { AspidaClient } from 'aspida';
import type { Methods as Methods_um4um8 } from './v1/auth/login';
import type { Methods as Methods_moyhzr } from './v1/drivers';
import type { Methods as Methods_vub5f7 } from './v1/drivers/_driverId@number';
import type { Methods as Methods_zl1x3d } from './v1/employees';
import type { Methods as Methods_180tyfv } from './v1/employees/_employeeId@number';
import type { Methods as Methods_1im4lra } from './v1/qualifications';
import type { Methods as Methods_1jp0ihd } from './v1/qualifications/_qualificationId@number';
import type { Methods as Methods_1b6sftz } from './v1/restrictions';
import type { Methods as Methods_j6i6ex } from './v1/restrictions/_restrictionId@number';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/v1/auth/login';
  const PATH1 = '/v1/drivers';
  const PATH2 = '/v1/employees';
  const PATH3 = '/v1/qualifications';
  const PATH4 = '/v1/restrictions';
  const GET = 'GET';
  const POST = 'POST';
  const DELETE = 'DELETE';

  return {
    v1: {
      auth: {
        login: {
          post: (option: { body: Methods_um4um8['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_um4um8['post']['resBody']>(prefix, PATH0, POST, option).json(),
          $post: (option: { body: Methods_um4um8['post']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_um4um8['post']['resBody']>(prefix, PATH0, POST, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH0}`,
        },
      },
      drivers: {
        _driverId: (val2: number) => {
          const prefix2 = `${PATH1}/${val2}`;

          return {
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_vub5f7['delete']['resBody']>(prefix, prefix2, DELETE, option).json(),
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_vub5f7['delete']['resBody']>(prefix, prefix2, DELETE, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_moyhzr['get']['resBody']>(prefix, PATH1, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_moyhzr['get']['resBody']>(prefix, PATH1, GET, option).json().then(r => r.body),
        post: (option: { body: Methods_moyhzr['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_moyhzr['post']['resBody']>(prefix, PATH1, POST, option).json(),
        $post: (option: { body: Methods_moyhzr['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_moyhzr['post']['resBody']>(prefix, PATH1, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
      employees: {
        _employeeId: (val2: number) => {
          const prefix2 = `${PATH2}/${val2}`;

          return {
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_180tyfv['delete']['resBody']>(prefix, prefix2, DELETE, option).json(),
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_180tyfv['delete']['resBody']>(prefix, prefix2, DELETE, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_zl1x3d['get']['resBody']>(prefix, PATH2, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_zl1x3d['get']['resBody']>(prefix, PATH2, GET, option).json().then(r => r.body),
        post: (option: { body: Methods_zl1x3d['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_zl1x3d['post']['resBody']>(prefix, PATH2, POST, option).json(),
        $post: (option: { body: Methods_zl1x3d['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_zl1x3d['post']['resBody']>(prefix, PATH2, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH2}`,
      },
      qualifications: {
        _qualificationId: (val2: number) => {
          const prefix2 = `${PATH3}/${val2}`;

          return {
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1jp0ihd['delete']['resBody']>(prefix, prefix2, DELETE, option).json(),
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1jp0ihd['delete']['resBody']>(prefix, prefix2, DELETE, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1im4lra['get']['resBody']>(prefix, PATH3, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1im4lra['get']['resBody']>(prefix, PATH3, GET, option).json().then(r => r.body),
        post: (option: { body: Methods_1im4lra['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1im4lra['post']['resBody']>(prefix, PATH3, POST, option).json(),
        $post: (option: { body: Methods_1im4lra['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1im4lra['post']['resBody']>(prefix, PATH3, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH3}`,
      },
      restrictions: {
        _restrictionId: (val2: number) => {
          const prefix2 = `${PATH4}/${val2}`;

          return {
            delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_j6i6ex['delete']['resBody']>(prefix, prefix2, DELETE, option).json(),
            $delete: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_j6i6ex['delete']['resBody']>(prefix, prefix2, DELETE, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1b6sftz['get']['resBody']>(prefix, PATH4, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_1b6sftz['get']['resBody']>(prefix, PATH4, GET, option).json().then(r => r.body),
        post: (option: { body: Methods_1b6sftz['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1b6sftz['post']['resBody']>(prefix, PATH4, POST, option).json(),
        $post: (option: { body: Methods_1b6sftz['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1b6sftz['post']['resBody']>(prefix, PATH4, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH4}`,
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
