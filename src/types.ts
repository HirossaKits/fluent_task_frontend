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

/*navSlice*/

export interface PERSONAL_SETTINGS {
  dark_mode: boolean,
  view_only_owned: boolean,
  selected_project: string,
}

export interface PROFILE {
  avatar_img: string,
  description: string,
}

export interface NAV_STATE {
  settingsMenuOpen: boolean,
  profileMenuOpen: boolean,
  settings: PERSONAL_SETTINGS,
  profile: PROFILE,
}

/*taskSlice*/

export interface EDITED_TASK {
  id: string,
  projectId: string,
  assigned: string,
  author: string,
  title: string,
  category: string,
  description: string,
  status: string,
  estimate_manhour: number,
  actual_manhour: number,
  scheduled_start_date: Date | null,
  scheduled_end_date: Date | null,
  actual_start_date: Date | null,
  actual_end_date: Date | null,
}

export interface SELECTED_TASK {
  id: string,
  projectId: string,
  assigned: string,
  author: string,
  title: string,
  category: string,
  description: string,
  status: string,
  estimate_manhour: number,
  actual_manhour: number,
  scheduled_start_date: Date | null,
  scheduled_end_date: Date | null,
  actual_start_date: Date | null,
  actual_end_date: Date | null,
  created_at: string,
  update_at: string,
}

export interface TASK_STATE {
  editedTask: EDITED_TASK,
  selectedTask: SELECTED_TASK,
}

export interface TARGET {
  name: string,
  value: string | number | Date | boolean,
}
