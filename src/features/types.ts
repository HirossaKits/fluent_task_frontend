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
  dark_mode: boolean;
  view_only_owned: boolean;
  selected_project: string;
}

export interface PROFILE {
  avatar_img: string;
  description: string;
}

export type MAIN_COMPONENT = "List" | "Card" | "Calendar";

export interface NAV_STATE {
  mainComponent: MAIN_COMPONENT;
  settingsMenuOpen: boolean;
  profileMenuOpen: boolean;
  settings: PERSONAL_SETTINGS;
  profile: PROFILE;
}

/*taskSlice*/

export interface TASK {
  task_id: string,
  task_name: string,
  project_id: string,
  project_name: string,
  category: string,
  status: string,
  estimate_manhour: string,
  actual_manhour: string,
  scheduled_startdate: string,
  scheduled_enddate: string,
  actual_startdate: string,
  actual_enddate: string,
  assigned: string,
  author: string,
  description: string,
  created_at: string,
  update_at: string,
}

export interface EDITED_TASK {
  id: string;
  projectId: string;
  assigned: string;
  author: string;
  title: string;
  category: string;
  description: string;
  status: string;
  estimate_manhour: number;
  actual_manhour: number;
  scheduled_startdate: Date | null;
  scheduled_enddate: Date | null;
  actual_startdate: Date | null;
  actual_enddate: Date | null;
}

export interface SELECTED_TASK {
  id: string;
  projectId: string;
  assigned: string;
  author: string;
  title: string;
  category: string;
  description: string;
  status: string;
  estimate_manhour: number;
  actual_manhour: number;
  scheduled_startdate: Date | null;
  scheduled_enddate: Date | null;
  actual_startdate: Date | null;
  actual_enddate: Date | null;
  created_at: string;
  update_at: string;
}

export interface FILTER_TASK {
  column: string;
  operator: string;
  value: string;
  startDate: Date | null;
  endDate: Date | null;
}

export interface TASK_STATE {
  tasks: TASK[];
  editTaskOpen: boolean;
  filterTaskOpen: boolean;
  filterTask: FILTER_TASK[];
  editedTask: EDITED_TASK;
  selectedTask: SELECTED_TASK;
}

export interface TARGET {
  name: string;
  value: string | number | Date | boolean;
  index?: number;
}
