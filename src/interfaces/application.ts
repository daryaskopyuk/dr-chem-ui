/* eslint-disable camelcase */
export interface AuthorizeUrlResponse {
  auth_url: string;
}

export interface ApplicationApiErrorResponse {
  error: {
    code: string;
    message: string;
  };
}
