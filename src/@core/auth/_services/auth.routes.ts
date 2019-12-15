import {environment} from "@environments/environment";

const ApiBaseUrl = environment.ApiBaseUrl;
export const API_USERS_URL = ApiBaseUrl + '/users';
export const API_PERMISSION_URL = ApiBaseUrl + '/permissions';
export const API_ROLES_URL = ApiBaseUrl + '/roles';
