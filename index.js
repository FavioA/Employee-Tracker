const inquirer = require("inquirer");
const db = require("./db/connection");
const mysql = require("mysql2");
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What do you want to do?",
        name: "choice",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((response) => {
      if (response.choice === "View all departments") {
        const sql = `SELECT * FROM department`;

        db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            return;
          } else {
            console.table(result);
            init();
          }
        });
      } else if (response.choice === "View all roles") {
        const sql = `SELECT * FROM role`;
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            return;
          } else {
            console.table(result);
            init();
          }
        });
      } else if (response.choice === "View all employees") {
        const sql = `SELECT 
            employee.id,
            employee.first_name,
            employee.last_name,
            role.title,
            department.name AS department,
            role.salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM 
            employee
            LEFT JOIN
            role on employee.role_id = role.id
            LEFT JOIN
            department on role.department_id = department.id
            LEFT JOIN 
            employee manager on manager.id = employee.manager_id`;
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            return;
          } else {
            console.table(result);
            init();
          }
        });
      } else if (response.choice === "Add a department") {
        inquirer
          .prompt([
            {
              message:
                "What is the name of the department that you'd like to add?",
              type: "input",
              name: "departmentName",
            },
          ])
          .then((data) => {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            const params = [data.departmentName];
            db.query(sql, params, (err, result) => {
              if (err) {
                console.log(err);
                return;
              } else {
                console.table(result);
                init();
              }
            });
          });
      } else if (response.choice === "Add a role") {
        inquirer
          .prompt([
            {
              message:
                "What is the name of the role that you would like to add?",
              type: "input",
              name: "title",
            },
            {
              message:
                "What is the salary of the role that you would like to add?",
              type: "input",
              name: "salary",
            },
            {
              message: "What department does this role belong to?",
              type: "list",
              choices: [1, 2],
              name: "departmentId",
            },
          ])
          .then((data) => {
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
            const params = [data.title, data.salary, data.departmentId];
            db.query(sql, params, (err, result) => {
              if (err) {
                console.log(err);
                return;
              } else {
                console.table(result);
                init();
              }
            });
          });
      } else if (response.choice === "Add an employee") {
        const sql = `SELECT * FROM role`;
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            return;
          } else {
            const mappedData = result.map(({ title, id }) => ({
              name: title,
              value: id,
            }));
            inquirer
              .prompt([
                {
                  message: "What is the new employee's first name?",
                  type: "input",
                  name: "firstName",
                },
                {
                  message: "What is the new employee's last name?",
                  type: "input",
                  name: "lastName",
                },
                {
                  message: "What is the new employee's role_id?",
                  type: "list",
                  choices: mappedData,
                  name: "roleId",
                },
                {
                  message: "Who is the manager of the employee?",
                  type: "list",
                  choices: [1],
                  name: "managerId",
                },
              ])
              .then((data) => {
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                const params = [
                  data.firstName,
                  data.lastName,
                  data.roleId,
                  data.managerId,
                ];
                db.query(sql, params, (err, result) => {
                  if (err) {
                    console.log(err);
                    return;
                  } else {
                    console.table(result);
                    init();
                  }
                });
              });
          }
        });
      } else if (response.choice === "Update an employee role") {
        inquirer
          .prompt([
            {
              message: "Which employee's role would you like to update?",
              type: "list",
              choices: [
                "Louis Armstrong",
                "Jimi Hendrix",
                "Charlie Parker",
                "Billie Holiday",
                "Hector Lavoe",
                "Celia Cruz",
                "Dinah Washington",
              ],
              name: "currentTitle",
            },
            {
              message: "Which role would you like to assign to this employee?",
              type: "list",
              choices: [
                "HR Rep",
                "Technologist",
                "Employee Relations Manager",
                "Recruiter",
                "Web Developer",
                "Application Analyst",
                "User Interface Designer",
              ],
              name: "newTitle",
            },
          ])
          .then((data) => {
            const sql = `UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?`;
            const params = [
              data.currentTitle,
              data.newTitle,
              data.salary,
              data.departmentId,
              data.id,
            ];
            db.query(sql, params, (err, result) => {
              if (err) {
                console.log(err);
                return;
              } else {
                console.table(result);
                init();
              }
            });
          });
      } else {
        console.log("Invalid choice!");
      }
    });
}
init();
