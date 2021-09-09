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

/*Task*/

export type COLUMN_NAME =
  | "task_name"
  | "category"
  | "status"
  | "scheduled_startdate"
  | "scheduled_enddate"
  | "estimate_manhour"
  | "assigned"
  | "description";

/*taskSlice*/

export interface TASK {
  task_id: string;
  task_name: string;
  project_id: string;
  project_name: string;
  category: string;
  status: string;
  estimate_manhour: string;
  actual_manhour: string;
  scheduled_startdate: null | string;
  scheduled_enddate: null | string;
  actual_startdate: null | string;
  actual_enddate: null | string;
  assigned: string;
  description: string;
  author: string;
  created_at?: null | string;
  update_at?: null | string;
}

export interface TASK_CATEGORY {
  value: string;
  title: string;
}

export interface FILTER_TASK {
  columnName: COLUMN_NAME;
  type: "string" | "number" | "Date";
  operator: string;
  value: string;
}

export interface TASK_STATE {
  tasks: TASK[];
  editTaskOpen: boolean;
  filterTaskOpen: boolean;
  filterTask: FILTER_TASK[];
  editedTask: TASK;
  selectedTask: TASK;
}

export interface TARGET {
  name: string;
  value: string | number | Date | boolean;
  index?: number;
}

/*calendarSlice*/

export interface CALENDAR {
  year: number;
  month: number;
  year_month: string;
}
