/*Common*/

import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export interface COLUMN_INFO {
  name: COLUMN_NAME;
  label: string;
  type: "string" | "number" | "Date";
  width: string;
  isJsxElement?: boolean;
}

/*authSlice*/

export interface AUTH {
  loginUserCred: LOGIN_USER_CRED;
  loginUserProf: PROF;
  editedProf: EDITED_PROF;
  personalSettings: PERSONAL_SETTINGS;
  profiles: PROF[];
}

export interface LOGIN_USER_CRED {
  id: string;
  email: string;
  org: string;
  is_activate: boolean;
  is_premium: boolean;
  is_administrator: boolean;
}

export interface PROF {
  user_id: string;
  first_name: string;
  last_name: string;
  avatar_img: string;
  comment: string;
}

export interface EDITED_PROF {
  user_id: string;
  first_name: string;
  last_name: string;
  avatar_img: string;
  upload_file: null | File;
  comment: string;
}

export interface PERSONAL_SETTINGS {
  dark_mode: boolean;
  show_own: boolean;
  project: null | string;
}

// export interface USER_PROFILE {
//   user_id: string;
//   first_name: string;
//   last_name: string;
//   avatar_img: string;
//   comment: string;
//   is_premium: boolean;
//   is_admin: boolean;
// }

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

/*orgSlise*/

export interface ORG_USER {
  user_id: string
  first_name: string,
  last_name: string,
  avatar_img: string,
  comment: string,
  is_org_rep: boolean,
  is_org_admin: boolean
}

export interface ORG_STATE {
  org_id: string
  org_name: string
  org_user: ORG_USER[]
}

/*mainSlice*/

export type MAIN_COMPONENT_NAME = "Org" | "Proj" | "List" | "Kanban" | "Calendar";

export interface MAIN_STATE {
  mainComponentName: MAIN_COMPONENT_NAME;
  settingsMenuOpen: boolean;
  profileMenuOpen: boolean;
  profileDialogOpen: boolean;
  messageOpen: boolean;
  message: string;
}

export interface PROFILE {
  avatar_img: string;
  description: string;
}


/*Project*/

type USER = {
  user_id: string;
  user_name: string;
};

export interface PROJECT {
  project_id: string;
  project_name: string;
  org_id: string;
  resp_id: string[];
  member_id: string[];
  task_category: TASK_CATEGORY[];
  description: string;
  startdate: string;
  enddate: string;
  created_at?: string;
  update_at?: string;
}

export interface PROJECT_SATATE {
  projects: PROJECT[]
  selectedProjectId: string;
  editedProject: PROJECT
  projectDialogOpen: false
}


/*taskSlice*/

export type COLUMN_NAME =
  | "task_name"
  | "category_name"
  | "status"
  | "scheduled_startdate"
  | "scheduled_enddate"
  | "estimate_manhour"
  | "assigned_name"
  | "description";

export const Status = {
  'Suspended': '保留　',
  'Not started': '開始前',
  'On going': '進行中',
  'Done': '完了　'
}

export type TASK_STATUS = keyof typeof Status

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
  status: TASK_STATUS;
  description: string;
  estimate_manhour: null | number;
  actual_manhour: null | number;
  scheduled_startdate: string;
  scheduled_enddate: string;
  actual_startdate: null | string;
  actual_enddate: null | string;
  created_at: null | string;
  update_at: null | string;
}

type TASK_CATEGORY = {
  task_category_id: string;
  task_category_name: string;
}

export interface FILTER_TASK {
  columnName: COLUMN_NAME;
  type: "string" | "number" | "Date";
  operator: string;
  value: string;
}

export type DIALOG_MODE = 'register' | 'edit' | 'display';

export interface TASK_STATE {
  tasks: TASK[];
  taskDialogOpen: boolean,
  taskDialogMode: DIALOG_MODE,
  filterTaskOpen: boolean;
  filterTask: FILTER_TASK[];
  editedTask: TASK;
}

export interface TARGET {
  name: string;
  value: string | string[] | number | Date | boolean;
  index?: number;
}

/*calendarSlice*/

export interface CALENDAR_STATE {
  yearMonth: CALENDAR_YEAR_MONTH
}

export interface CALENDAR_YEAR_MONTH {
  year: number;
  month: number;
  year_month: string;
}

export interface CALENDAR_DATE {
  index: number;
  dateStr: string;
  year: number;
  month: number;
  date: number;
  isToday: boolean;
  layer: number[];
}

export interface CALENDAR_BAR {
  task_name: string;
  startDate: Date;
  endDate: Date;
  dateSpan: number;
  top: string;
  left: string;
  width: string;
  layer: number;
  visible: boolean;
  divided: boolean;
  startEdge: boolean;
  endEdge: boolean;
  other: boolean;
}

export interface CALENDAR_BAR_STYLE {
  topPosition: number;
  height: number;
  span: number;
}