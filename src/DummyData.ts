import { TASK } from './features/task';

export const rows = [

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
], ;

function createData(
  task_id: string,
  task_name: string,
  project_id: string,
  project_name: string,
  category: string,
  status: string,
  estimate_manhour: string,
  actual_manhour: string,
  scheduled_start_date: string,
  scheduled_end_date: string,
  actual_start_date: string,
  actual_end_date: string,
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
    scheduled_start_date: scheduled_start_date,
    scheduled_end_date: scheduled_end_date,
    actual_start_date: actual_start_date,
    actual_end_date: actual_end_date,
    assigned: assigned,
    author: author,
    description: description,
    created_at: created_at,
    update_at: update_at,
  };
}