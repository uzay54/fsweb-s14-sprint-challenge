/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* 
    project tablosu
    project_id (pk)
    project_name 
    project_description
    project_completed
    resource tablosu
    resource_id(pk)
    resource_name
    resource_description
    task tablosu
    task_id (pk)
    task_description 
    task_notes
    task_completed
    project_id (fk)
    project_resources tablosu
    project_resources_id(pk)
    project_id(fk)
    resource_id(fk)
*/
exports.up = function (knex) {
    return knex.schema
      .createTable("projects", (prj) => {
        prj.increments("project_id");
        prj.string("project_name", 128).notNullable();
        prj.string("project_description", 256);
        prj.integer("project_completed").defaultTo(0);
      })
      .createTable("resources", (rs) => {
        rs.increments("resource_id");
        rs.string("resource_name", 128).notNullable().unique();
        rs.string("resource_description", 256);
      })
      .createTable("tasks", (ta) => {
        ta.increments("task_id");
        ta.string("task_description", 256).notNullable();
        ta.string("task_notes", 256);
        ta.integer("task_completed").defaultTo(0);
        ta.integer("project_id")
          .unsigned()
          .notNullable()
          .references("project_id")
          .inTable("projects")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
      .createTable("project_resources", (pr) => {
        pr.increments("project_resources_id");
        pr.integer("project_id")
          .unsigned()
          .notNullable()
          .references("project_id")
          .inTable("projects")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        pr.integer("resource_id")
          .unsigned()
          .notNullable()
          .references("resource_id")
          .inTable("resources")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists("project_resources")
      .dropTableIfExists("tasks")
      .dropTableIfExists("resources")
      .dropTableIfExists("projects");
  };