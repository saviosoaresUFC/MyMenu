export interface User {
  id: number,
  username: string,
  name: string,
  email: string,
  jwt: string,
  blocked: boolean,
  role: {
    name: string
  }
}

export interface AuthResponse {
    jwt: string;
    user: User;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}

export interface LoginCredentials {
    identifier: string;
    password: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}
