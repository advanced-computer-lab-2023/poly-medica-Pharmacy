export const ADMIN_ENUM = 'admin';

export const PATIENT_ENUM = 'patient';

export const PHARMACIST_ENUM = 'pharmacist';

export const USER_ARR_ENUM = [ADMIN_ENUM, PHARMACIST_ENUM, PATIENT_ENUM];

export const DUPLICATE_KEY_ERROR_CODE = 11000;

export const ONE_DAY_MAX_AGE_IN_MIINUTS = 24 * 60 * 60;

export const ONE_DAY_MAX_AGE_IN_MILLEMIINUTS = 1000 * 24 * 60 * 60;

export const BAD_REQUEST_CODE_400 = 400;

export const OK_REQUEST_CODE_200 = 200;

export const SERVER_ERR_REQUEST_CODE_500 = 500;

export const PATIENT_SIGNUP_URL = 'http://localhost:8002/signup';

export const ADMIN_SIGNUP_URL = 'http://localhost:8003/admins';

export const PHARMACIST_SIGNUP_URL = 'http://localhost:8003/add-pharmacist-req';

export const PHARMACIST_BASE_URL = 'http://localhost:8003/';

export const DUB_EMAIL_ERROR_MESSAGE = `that email is already registered`;

export const DUB_USERNAME_ERROR_MESSAGE = `that username is already registered`;

export const PORT = 8005;
