const connection = require('./db/connection');
const inquirer = require('inquirer');
require('console.table');

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
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Exit'],
        }
    ]).then(answers => {
        const { menu } = answers;
        switch (menu) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                console.log('here1');
                viewAllEmployees();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
};

// -- Functions --
// View All Departments
function viewAllDepartments() {
    connection.promise().query('SELECT * FROM department').then(([ departments ]) => {
        console.table(departments);
        promptQuestions();
        });
};
// View All Roles
function viewAllRoles() {
    connection.promise().query('SELECT * FROM roles').then(([ roles ]) => {
        console.table(roles);
        promptQuestions();
        });
};
//View All Employees
function viewAllEmployees() {
    connection.promise().query('SELECT * FROM employee').then(([ employees ]) => {
    console.table(employees);
    promptQuestions();
    });
};
//Add Department
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department you would like to add?'
        }
    ]).then(answers => {
        const { department } = answers;
        connection.promise().query(`INSERT INTO department (department_name) VALUES ('${department}')`).then(() => {
            console.log(`${department} has been added to the database!`);
        });
        promptQuestions();
    });
};
//Add Role
function addRole() {
    //Get all departments
    connection.promise().query('SELECT * FROM department').then(( [departments] ) => {
        const departmentArray = departments.map(department => {
            return {
                name: department.department_name,
                value: department.id
            }
        });

    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role you would like to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role you would like to add?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'What is the department of the role you would like to add?',
            choices: departmentArray
        }
    ]).then(answers => {
        const { title, salary, department } = answers;
        connection.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES ('${title}', '${salary}', '${department}')`).then(() => {
            console.log(`${title} has been added to the database!`);
        });
        promptQuestions();
    });
    });
};
//Add Employee
function addEmployee() {
    //Get all roles
    connection.promise().query('SELECT * FROM roles').then(( [roles] ) => {
        const roleArray = roles.map(role => {
            return {
                name: role.title,
                value: role.id
            }
        });
        //Get all employees
        connection.promise().query('SELECT * FROM employee').then(( [managers] ) => {
            const managerArray = managers.map(manager => {
                return {
                    name: manager.first_name + ' ' + manager.last_name,
                    value: manager.id
                }
            });
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee you would like to add?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee you would like to add?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the role of the employee you would like to add?',
                choices: roleArray
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is the manager of the employee you would like to add?',
                choices: managerArray
            }
        ]).then(answers => {
            const { first_name, last_name, role, manager } = answers;
            connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', '${role}', '${manager}')`).then(() => {
                console.log(`${first_name} ${last_name} has been added to the database!`);
                promptQuestions();
            });
    });
    });
    });
};

promptQuestions();