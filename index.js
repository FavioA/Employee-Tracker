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
        const sql = `SELECT * FROM employee`;
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
        .prompt ([
            {
            message: "What is the name of the department that you'd like to add?",
            type: "input",
            name: 'departmentName'
            }
        ]) .then (data=> {
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
        .prompt ([
            {
            message: "What is the name of the role that you would like to add?",
            type: "input",
            name: 'departmentName'
            },
            {
            message: "What is the salary of the role that you would like to add?",
            type: "input",
            name: 'departmentName'
            },
            {
            message: "What department does this role belong to?",
            type: "input",
            name: 'departmentName'
            }
        ]) .then (data=> {
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [data.roleTitle, data.salary, data.departmentId];
        db.query(sql, params, (err, result) => {
            if (err) {
              console.log(err);
              return;
            } else {
              console.table(result);
              init();
            }
          });
        })
      } else if (response.choice === "Add an employee") {
        inquirer.prompt ([
            {
            message: "What is the first name of the employee that you would like to add?",
            type: "input",
            name: 'departmentName'
            },
            {
            message: "What is the last name of the department that you'd like to add?",
            type: "input",
            name: 'departmentName'
            }
        ]) .then (data=> {
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [data.roleTitle, data.salary, data.departmentId];
        db.query(sql, params, (err, result) => {
            if (err) {
              console.log(err);
              return;
            } else {
              console.table(result);
              init();
            }
          });
        })
      } else if (response.choice === "Update an employee role") {
        inquirer
        .prompt ([
            {
                message: "What employee's role would you like to update?",
                type: "list",
                choices: ['John Doe', 'Jane Doe'],
                name: 'newRole',
            },
            {
                message: "Which role would you like to assign to this employee?",
                type: "list",
                choices: [ 
                    'Employee Relations Manager',  
                    'Recruiter',  
                    'Web Developer', 
                    'Application Analyst', 
                    'User Interface Designer'
                ],
                name: 'roleChoices',
            },
        
        ])  .then (data=> {
            const sql = `UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?`;
        const params = [data.roleChoices, data.salary, data.departmentId, data.id];
        db.query(sql, params, (err, result) => {
            if (err) {
              console.log(err);
              return;
            } else {
              console.table(result);
              init()
            }
          });
        });
      } else {
        console.log("Invalid choice!");
      }
    });


  // db.query(sql, params, (err, result) => {
  //     if(err) {
  //         res.status(400).json({ error: err.message });
  //         return;
  //     }
  // })
}
init();
