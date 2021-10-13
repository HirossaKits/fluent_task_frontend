import { TASK, USER_PROFILE } from "./features/types";

export const dummyUsers: USER_PROFILE[] = [
  {
    user_id: "test1",
    first_name: "Hirohisa",
    last_name: "Kitsuka",
    avatar_img: "https://picsum.photos/200",
    comment: "Almost human",
  },
  {
    user_id: "test2",
    first_name: "Hirohisa",
    last_name: "Kitsuka",
    avatar_img: "https://picsum.photos/200",
    comment: "Almost human",
  },
  {
    user_id: "test2",
    first_name: "Hirohisa",
    last_name: "Kitsuka",
    avatar_img: "https://picsum.photos/200",
    comment: "Almost human",
  },
  {
    user_id: "test2",
    first_name: "Hirohisa",
    last_name: "Kitsuka",
    avatar_img: "https://picsum.photos/200",
    comment: "Almost human",
  },
  {
    user_id: "test2",
    first_name: "Hirohisa",
    last_name: "Kitsuka",
    avatar_img: "https://picsum.photos/200",
    comment: "Almost human",
  },
  {
    user_id: "test2",
    first_name: "Hirohisa",
    last_name: "Kitsuka",
    avatar_img: "https://picsum.photos/200",
    comment: "Almost human",
  },
  {
    user_id: "test2",
    first_name: "Hirohisa",
    last_name: "Kitsuka",
    avatar_img: "https://picsum.photos/200",
    comment: "Almost human",
  },
  {
    user_id: "test2",
    first_name: "Hirohisa",
    last_name: "Kitsuka",
    avatar_img: "https://picsum.photos/200",
    comment: "Almost human",
  },
];

export const demoData = [
  createData(
    "task_dnafsdhnfailsudhfasuid",
    "A機能製造",
    "project_sdfnasidfuahs",
    "テストプロジェクトA",
    "category_jdpoasirg1",
    "製造",
    "user_assigned",
    "木塚 寛久",
    "user_author",
    "木塚 寛久",
    "開始前",
    "機能Aを製造します。",
    1,
    1,
    "2021-09-12",
    "2021-09-15",
    "2021-07-10",
    "2021-07-10",
    "2021-07-10 12:00",
    "2021-07-10 12:00"
  ),
  createData(
    "task_dnafsdhnfailsudhfad",
    "B機能製造",
    "project_sdfnasidfuahssss",
    "テストプロジェクトB",
    "category_jdpoasirg1",
    "製造",
    "user_assigned",
    "木塚 寛久",
    "user_author",
    "木塚 寛久",
    "開始前",
    "機能Bを製造します。",
    2,
    2,
    "2021-09-11",
    "2021-09-13",
    "2021-07-10",
    "2021-07-10",
    "2021-07-10 12:00",
    "2021-07-10 12:00"
  ),
  createData(
    "task_dnafsdhnfailsfasuid",
    "A機能テスト",
    "project_sdfnasidfuahsfff",
    "テストプロジェクトC",
    "category_jdpoasirg2",
    "テスト",
    "user_assigned",
    "木塚 寛久",
    "user_author",
    "木塚 寛久",
    "開始前",
    "機能Aをテストします。",
    null,
    null,
    "2021-09-10",
    "2021-09-29",
    "2021-07-10",
    "2021-07-10",
    "2021-07-10 12:00",
    "2021-07-10 12:00"
  ),
];

function createData(
  task_id: string,
  task_name: string,
  project_id: string,
  project_name: string,
  category_id: string,
  category_name: string,
  assigned_id: string,
  assigned_name: string,
  author_id: string,
  author_name: string,
  status: string,
  description: string,
  estimate_manhour: null | number,
  actual_manhour: null | number,
  scheduled_startdate: string,
  scheduled_enddate: string,
  actual_startdate: string,
  actual_enddate: string,
  created_at: string,
  update_at: string
): TASK {
  return {
    task_id: task_id,
    task_name: task_name,
    project_id: project_id,
    project_name: project_name,
    category_id: category_id,
    category_name: category_name,
    assigned_id: assigned_id,
    assigned_name: assigned_name,
    author_id: author_id,
    author_name: author_name,
    description: description,
    status: status,
    estimate_manhour: estimate_manhour,
    actual_manhour: actual_manhour,
    scheduled_startdate: scheduled_startdate,
    scheduled_enddate: scheduled_enddate,
    actual_startdate: actual_startdate,
    actual_enddate: actual_enddate,
    created_at: created_at,
    update_at: update_at,
  };
}
