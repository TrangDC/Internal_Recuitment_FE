import 'jwt-decode';

declare module 'jwt-decode' {
    export interface JwtPayload {
      name?: string;
      preferred_username?: string;
    }
  }