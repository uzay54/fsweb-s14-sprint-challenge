// `Proje` modeli buraya

const db = require("../../data/dbConfig");

exports.getAll = async (project_id) => {
  const rows = await db("projects");

  const result = rows.map((row) => {
    return {
      ...row,
      project_completed: row.project_completed ? true : false,
    };
  });
  return result;
};

exports.create = async (payload) => {
  const [project_id] = await db("projects").insert(payload);
  const newProject = await db("projects")
    .where("project_id", project_id)
    .first();
  const result = {
    ...newProject,
    project_completed: newProject.project_completed ? true : false,
  };
  return result;
};
