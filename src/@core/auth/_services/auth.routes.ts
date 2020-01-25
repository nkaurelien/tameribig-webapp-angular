import {environment} from "@environments/environment";

const ApiBaseUrl = environment.ApiBaseUrl;
export const API_USERS_URL = ApiBaseUrl + '/users';
export const API_REGISTER_URL = ApiBaseUrl + '/auth/register';
export const API_REGISTER_FIREBASE_URL = ApiBaseUrl + '/auth/register/firebase';
export const API_LOGIN_URL = ApiBaseUrl + '/auth/login';
export const API_LOGIN_FIREBASE_URL = ApiBaseUrl + '/auth/login/firebase';
export const API_PERMISSION_URL = ApiBaseUrl + '/permissions';
export const API_ROLES_URL = ApiBaseUrl + '/roles';