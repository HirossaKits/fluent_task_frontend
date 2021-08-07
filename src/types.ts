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
  settingsMenuOpen: boolean,
  profileMenuOpen: boolean,
}

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
  scheduled_startdate: Date | null,
  scheduled_enddate: Date | null,
  actual_startdate: Date | null,
  actual_enddate: Date | null,
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
  scheduled_startdate: Date | null,
  scheduled_enddate: Date | null,
  actual_startdate: Date | null,
  actual_enddate: Date | null,
  created_at: string,
  update_at: string,
}

export interface TASK_STATE {
  editedTask: EDITED_TASK,
  selectedTask: SELECTED_TASK,
}

export interface TARGET {
  name: string,
  value: string | number | Date,
}
