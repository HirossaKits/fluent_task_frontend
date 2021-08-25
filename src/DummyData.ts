import { TASK } from './features/types';

export const demoData = [

  createData(
    "task_dnafsdhnfailsudhfasuid",
    "A昨日製造",
    "project_sdfnasidfuahs",
    "プロジェクトA",
    "製造",
    "開始前",
    "1",
    "1",
    "2021-07-10",
    "2021-07-10",
    "2021-07-10",
    "2021-07-10",
    "user_assigned",
    "user_author",
    "テストデータA使用",
    "2021-07-10 12:00",
    "2021-07-10 12:00",
  ),
];

function createData(
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
): TASK {
  return {
    task_id: task_id,
    task_name: task_name,
    project_id: project_id,
    project_name: project_name,
    category: category,
    status: status,
    estimate_manhour: estimate_manhour,
    actual_manhour: actual_manhour,
    scheduled_startdate: scheduled_startdate,
    scheduled_enddate: scheduled_enddate,
    actual_startdate: actual_startdate,
    actual_enddate: actual_enddate,
    assigned: assigned,
    author: author,
    description: description,
    created_at: created_at,
    update_at: update_at,
  };
}