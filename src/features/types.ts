/*Common*/

export interface COLUMN_INFO {
  name: COLUMN_NAME;
  label: string;
  type: "string" | "number" | "Date";
  width: string;
  related?: any;
}

/*authSlice*/

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

export interface USER_PROFILE {
  user_id: string;
  first_name: string;
  last_name: string;
  avatar_img: null | string;
  comment: null | string;
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

export type MAIN_COMPONENT = "Org" | "Proj" | "List" | "Kanban" | "Calendar";

export interface NAV_STATE {
  mainComponent: MAIN_COMPONENT;
  settingsMenuOpen: boolean;
  profileMenuOpen: boolean;
  settings: PERSONAL_SETTINGS;
  profile: PROFILE;
}

/*Project*/
type USER = {
  user_id: string;
  user_name: string;
};


export interface PROJECT {
  project_id: string;
  project_name: string;
  resp_id: string[];
  member_id: string[];
  description: string;
  startdate: null | string;
  enddate: null | string;
  created_at?: null | string;
  update_at?: null | string;
}


/*Task*/

export type COLUMN_NAME =
  | "task_name"
  | "category_name"
  | "status"
  | "scheduled_startdate"
  | "scheduled_enddate"
  | "estimate_manhour"
  | "assigned_name"
  | "description";

/*taskSlice*/

export interface TASK {
  task_id: string;
  task_name: string;
  project_id: string;
  project_name: string;
  category_id: null | string;
  category_name: string;
  assigned_id: null | string;
  assigned_name: string;
  author_id: null | string;
  author_name: string;
  status: string;
  description: string;
  estimate_manhour: null | number;
  actual_manhour: null | number;
  scheduled_startdate: string;
  scheduled_enddate: string;
  actual_startdate: null | string;
  actual_enddate: null | string;
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
