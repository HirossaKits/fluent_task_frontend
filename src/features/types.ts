export interface CRED {
  email: string;
  password: string;
}

export interface REG_INFO extends CRED {
  first_name: string;
  last_name: string;
}

export interface JWT {
  refresh: string;
  access: string;
}

export interface USER_INFO {
  id: number;
  email: string;
}


export interface LOGIN_USER {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface NAV_STATE {
  settingsOpen: boolean,
  settingsAnchorEl: Element | ((element: Element) => Element) | null | undefined,
  profileOpen: boolean,
  profileAnchorEl: Element | ((element: Element) => Element) | null | undefined,
}

