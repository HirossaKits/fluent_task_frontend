/*Common*/

export interface TARGET {
  name: string;
  value: null | string | string[] | number | Date | boolean;
  index?: number;
}

export interface COLUMN_INFO {
  name: string;
  label: string;
  type: 'string' | 'number' | 'Date' | 'select';
  width: string;
  selection?: { value: string; label: string }[];
  isJsxElement?: boolean;
}

export type DIALOG_MODE = 'register' | 'edit' | 'detail' | 'display';

/*authSlice*/

export interface SIGNIN_INFO {
  email: string;
  password: string;
}

export interface SIGNUP_INFO extends SIGNIN_INFO {
  first_name: string;
  last_name: string;
}

export interface JWT {
  access: string;
}

export interface AUTH {
  lang: string;
  darkmode: boolean;
  loginUserInfo: LOGIN_USER_INFO;
  editedProf: EDITED_PROF;
  personalSettings: PERSONAL_SETTINGS;
  profiles: USER_INFO[];
}

export interface LOGIN_USER_INFO extends USER_INFO {
  own_org: string[];
  joined_org: [
    {
      org_id: string;
      org_name: string;
      is_private: boolean;
    }
  ];
}

export interface USER_INFO {
  user_id: string;
  is_premium: boolean;
  first_name: string;
  last_name: string;
  avatar_img: string;
  comment: string;
}

export interface EDITED_PROF {
  first_name: string;
  last_name: string;
  comment: string;
}

export interface PERSONAL_SETTINGS {
  tooltip: boolean;
  private_mode: boolean;
  selected_org_id: string;
}

export interface INVITE {
  invite_id: string;
  org_id: string;
  org_name: string;
}

/*orgSlise*/

export interface ORG {
  org_info: ORG_INFO;
  editedOrgName: string;
  editedInviteMail: string;
  orgDialogOpen: boolean;
  orgDialogMode: 'edit' | 'register';
  inviteDialogOpen: boolean;
  invite: INVITE[];
}

export interface ORG_INFO {
  org_id: string;
  org_name: string;
  is_private: boolean;
  org_owner_id: string;
  org_admin_id: string[];
  org_user: USER_INFO[];
}

/*mainSlice*/

export type MAIN_COMPONENT_NAME =
  | 'Org'
  | 'Proj'
  | 'List'
  | 'Kanban'
  | 'Calendar'
  | 'GanttChart';

export interface MAIN_STATE {
  mainComponentName: MAIN_COMPONENT_NAME;
  settingsMenuOpen: boolean;
  profileMenuOpen: boolean;
  profileDialogOpen: boolean;
  notificationDialogOpen: boolean;
  notificationCount: number;
  messageOpen: boolean;
  message: string;
}

export interface PROFILE {
  avatar_img: string;
  description: string;
}

/*Project*/

export interface PROJECT_SATATE {
  projects: PROJECT[];
  selectedProjectId: string;
  editedProject: EDITED_PROJECT;
  projectDialogOpen: false;
  projectDialogMode: Extract<DIALOG_MODE, 'register' | 'edit'>;
}

export interface PROJECT {
  project_id: string;
  project_name: string;
  org_id: string;
  resp_id: string[];
  member_id: string[];
  resp: USER_INFO[];
  member: USER_INFO[];
  description: string;
  startdate: string;
  enddate: string;
  created_at?: string;
  update_at?: string;
}

export interface EDITED_PROJECT {
  project_id: string;
  project_name: string;
  resp_id: string[];
  member_id: string[];
  description: string;
  startdate: string;
  enddate: string;
  created_at?: string;
  update_at?: string;
}

/*taskSlice*/

export interface TASK_STATE {
  tasks: TASK[];
  taskDialogOpen: boolean;
  taskDialogMode: Extract<DIALOG_MODE, 'register' | 'edit' | 'detail'>;
  filterTaskOpen: boolean;
  filterTask: FILTER_TASK[];
  editedTask: TASK;
  taskCategory: TASK_CATEGORY[];
}

export interface TASK {
  task_id: string;
  task_name: string;
  project_id: string;
  task_category_id: null | string;
  task_category_name?: string;
  assigned_id: null | string;
  assigned_name?: string;
  author_id: null | string;
  author_name?: string;
  status: TASK_STATUS;
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

export interface EDITED_TASK {
  task_id?: string;
  task_name: string;
  project_id: string;
  task_category_id: null | string;
  assigned_id: null | string;
  author_id?: null | string;
  status: TASK_STATUS;
  description: string;
  estimate_manhour: null | number;
  actual_manhour: null | number;
  scheduled_startdate: string;
  scheduled_enddate: string;
  actual_startdate: null | string;
  actual_enddate: null | string;
}

export interface TASK_CATEGORY {
  task_category_id: string;
  task_category_name: string;
}

export const Status = {
  Suspended: '保留　',
  'Not started': '開始前',
  'On going': '進行中',
  Done: '完了　',
};

export type TASK_STATUS = keyof typeof Status;

export interface FILTER_TASK {
  // columnName: COLUMN_NAME;
  columnName: string;
  type: 'string' | 'number' | 'Date' | 'select';
  operator: string;
  value: string;
}

/*calendarSlice*/

export interface CALENDAR_STATE {
  yearMonth: CALENDAR_YEAR_MONTH;
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

export interface CALENDAR_BAR extends TASK {
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

/*ganttChart*/

export interface GANTTCHART_BAR extends TASK {
  top: number;
  left: number;
  width: number;
  startEdge: boolean;
  endEdge: boolean;
}

export interface GANTTCHART_BAR_SET {
  scheduled: GANTTCHART_BAR[];
  actual: GANTTCHART_BAR[];
}

export interface GANTTCHART_TABLE_STYLE {
  headerColumnWidth: number;
  cellWidth: number;
  cellHeight: number;
}

export interface GANTTCHART_BAR_STYLE {
  topPosition: number;
  height: number;
  span: number;
  roundEdge: number;
}
