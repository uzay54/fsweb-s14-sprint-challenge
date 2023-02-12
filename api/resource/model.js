// `Resource` modeli buraya
const db = require("../../data/dbConfig");

exports.getAll = (resource_id) => {
  return db("resources");
};

exports.create = async (payload) => {
  const [resource_id] = await db("resources").insert(payload);
  const newResource = await db("resources")
    .where("resource_id", resource_id)
    .first();
  return newResource;
};
