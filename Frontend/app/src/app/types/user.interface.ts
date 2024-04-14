export interface User {
    email: string;
    password: string;
    _id: string;
    __v: number;
  }
  
 export interface LoginResponse {
    email: string;
    user: User;
    accessToken: string;
  }