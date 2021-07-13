export interface AuthorizeUrlResponse {
  authUrl: string;
}

export interface ApplicationApiErrorResponse {
  error: {
    code: string;
    message: string;
  };
}

export interface User {
  uid?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}
