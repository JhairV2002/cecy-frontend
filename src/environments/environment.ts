// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.ts`.
// The list of file replacements can be found in `angular.json`.
const HOST = 'http://localhost:8000';
const HOST2 = 'http://localhost:3000';

export const environment = {
  production: false,
  HOST,
  STORAGE_URL: HOST + '/storage',
  API_URL_PRIVATE: HOST + '/api/v1/private',
  API_URL: HOST + '/api/v1/private',
  API_URL_PUBLIC: HOST + '/api/v1/public',
  api2: HOST2 + '/api/v1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.