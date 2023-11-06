const inquirer = require ('inquirer')
const connection = require ('./db/connection')
function init () {
    

inquirer
.prompt ([
    {
        type: 'list',
        message: 'What do you want to do?',
        name: 'choice',
        choices: ['View all departments', 'View all roles', 'View all employess', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }

])
.then((response) => {
    if (response.choice === 'View all departments') {
        console.log('Hello!');
    } else if (response.choice === 'View all roles') {

    } else if (response.choice === ' View all employess') {

    } else if (response.choice === 'Add a department') {

    } else if (response.choice === 'Add a role') {

    } else if (response.choice === 'Add an employee') {

    } else if (response.choice === ' Update an employee role') {

    } else {
        console.log('Invalid choice!');
    }
    init()
}
) 
}
init()
