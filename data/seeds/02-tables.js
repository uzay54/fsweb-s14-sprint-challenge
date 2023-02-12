/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
    return knex("projects")
      .insert([
        {
          project_name: "sprint_14",
          project_description:
            "ders ve etüt videolarının izlenmesi , projelerin tamamlanması",
          project_completed: 0,
        },
      ])
      .then((res) => {
        return knex("resources").insert([
          {
            resource_name: "workintech platformu",
            resource_description: "http://app.workintech.com.tr",
          },
          {
            resource_name: "github",
            resource_description: null,
          },
        ]);
      })
      .then((res) => {
        return knex("tasks").insert([
          {
            task_description: "platformdan eğitimlere katıl",
            task_notes: "zoom linklerine tıklayarak girebilirsin",
            task_completed: 0,
            project_id: 1,
          },
          {
            task_description: "platformdan etütlere katıl",
            task_notes: null,
            task_completed: 1,
            project_id: 1,
          },
        ]);
      })
      .then((res) => {
        return knex("project_resources").insert([
          {
            project_id: 1,
            resource_id: 1,
          },
          {
            project_id: 1,
            resource_id: 2,
          },
        ]);
      });
  };