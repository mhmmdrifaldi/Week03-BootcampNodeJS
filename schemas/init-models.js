var DataTypes = require("sequelize").DataTypes;
var _countries = require("./countries");
var _departments = require("./departments");
var _dependents = require("./dependents");
var _employees = require("./employees");
var _jobs = require("./jobs");
var _locations = require("./locations");
var _project_assignment = require("./project_assignment");
var _projects = require("./projects");
var _regions = require("./regions");

function initModels(sequelize) {
  var countries = _countries(sequelize, DataTypes);
  var departments = _departments(sequelize, DataTypes);
  var dependents = _dependents(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var jobs = _jobs(sequelize, DataTypes);
  var locations = _locations(sequelize, DataTypes);
  var project_assignment = _project_assignment(sequelize, DataTypes);
  var projects = _projects(sequelize, DataTypes);
  var regions = _regions(sequelize, DataTypes);

  employees.belongsToMany(projects, { as: 'pras_proj_id_projects', through: project_assignment, foreignKey: "pras_employee_id", otherKey: "pras_proj_id" });
  projects.belongsToMany(employees, { as: 'pras_employee_id_employees', through: project_assignment, foreignKey: "pras_proj_id", otherKey: "pras_employee_id" });
  locations.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(locations, { as: "locations", foreignKey: "country_id"});
  employees.belongsTo(departments, { as: "department", foreignKey: "department_id"});
  departments.hasMany(employees, { as: "employees", foreignKey: "department_id"});
  dependents.belongsTo(employees, { as: "employee", foreignKey: "employee_id"});
  employees.hasMany(dependents, { as: "dependents", foreignKey: "employee_id"});
  employees.belongsTo(employees, { as: "manager", foreignKey: "manager_id"});
  employees.hasMany(employees, { as: "employees", foreignKey: "manager_id"});
  project_assignment.belongsTo(employees, { as: "pras_employee", foreignKey: "pras_employee_id"});
  employees.hasMany(project_assignment, { as: "project_assignments", foreignKey: "pras_employee_id"});
  projects.belongsTo(employees, { as: "employee", foreignKey: "employee_id"});
  employees.hasMany(projects, { as: "projects", foreignKey: "employee_id"});
  employees.belongsTo(jobs, { as: "job", foreignKey: "job_id"});
  jobs.hasMany(employees, { as: "employees", foreignKey: "job_id"});
  departments.belongsTo(locations, { as: "location", foreignKey: "location_id"});
  locations.hasMany(departments, { as: "departments", foreignKey: "location_id"});
  project_assignment.belongsTo(projects, { as: "pras_proj", foreignKey: "pras_proj_id"});
  projects.hasMany(project_assignment, { as: "project_assignments", foreignKey: "pras_proj_id"});
  countries.belongsTo(regions, { as: "region", foreignKey: "region_id"});
  regions.hasMany(countries, { as: "countries", foreignKey: "region_id"});

  return {
    countries,
    departments,
    dependents,
    employees,
    jobs,
    locations,
    project_assignment,
    projects,
    regions,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
