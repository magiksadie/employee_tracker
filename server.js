const connection = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

//Connect to DB
connection.connect(err => {
    if (err) throw err;
    console.log(`
    Welcome to your Employee Tracker!`)
});

//Begin the program
function promptQuestions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Add Department', 'Add Role', 'Update Employee Role', 'Update Employee Manager', 'Remove Employee', 'Remove Department', 'Remove Role', 'Exit'],
        }
    ]).then(answers => {
        const { menu } = answers;
        switch (menu) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View All Employees By Department':
                viewAllEmployeesByDepartment();
                break;
            case 'View All Employees By Manager':
                viewAllEmployeesByManager();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Update Employee Manager':
                updateEmployeeManager();
                break;
            case 'Remove Employee':
                removeEmployee();
                break;
            case 'Remove Department':
                removeDepartment();
                break;
            case 'Remove Role':
                removeRole();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
}