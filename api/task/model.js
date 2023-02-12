// bu`Task` modeli buraya
const db = require("../../data/dbConfig");

exports.getAll = async () => {
  const records = await db("tasks as t")
    .leftJoin("projects as pr", "t.project_id", "pr.project_id")
    .select(
      "t.task_id",
      "t.task_description",
      "t.task_notes",
      "t.task_completed",
      "pr.project_name",
      "pr.project_description"
    );

  const result = records.map((record) => ({
    ...record,
    task_completed: record.task_completed ? true : false,
  }));

  return result;
};

exports.create = async (payload) => {
  const [task_id] = await db("tasks").insert(payload);

  const newTask = await db("tasks").where("task_id", task_id).first();

  const result = {
    ...newTask,
    task_completed: newTask.task_completed ? true : false,
  };
  return result;
};
