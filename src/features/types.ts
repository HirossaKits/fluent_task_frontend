export interface CRED {
  email: string;
  password: string;
}


export interface LOGIN_USER {
  id: number;
  email: string;
}

export interface JWT {
  refresh: string;
  access: string;
}