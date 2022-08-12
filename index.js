
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

async function startPeogram() {


    let employees;
    let role;

    // main menue with question prompts
    const mainMenu = [
        {
            type: "list",
            message: "would you like too...?",
            choices: ["View All Employees", "View All Roles", "View All Departments", "Add Employee", "Add Role", "Add Department", "Update Employee Role", "Exit"],
            name: "mainMenueQuestions"
        }
    ]

    // keeps ststus of loop
    let running = true;

    while (running) {

        // this will use the selected answer from main menue
        const menue = await inquirer.createPromptModule(mainMenu);
        switch (menue.mainMenueQuestions) {

            // end the loop 
            case "exit":
                running = false;
                console.log("exiting program");
                db.end();
                break;

            // displays employee in database 
            case "View All Employees":
                db.query("SELECT e1.id, e1.first_name, roles.title AS role, departments.dep_name AS department, roles.salary, Concat(e2.first_name, '', e2.last_name) AS manager FROM employees e1 LEFT JOIN roles ON e1.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees e2 ON e2.id = e1.manager_id", function (err, resilts) {
                    console.table(result);
                    console.log("press arow keys to continue");
                });
                break;

            case "Add Employee":

                // creates array of all roles
                let roleData = await db.promise().query("SELECT * FROM roles")

                let roleArray = roleData[0].map(role => role.title)

                roles;
                roles = roleArray;

                // creates array of all managers
                let managerData = await db.promise().query("SELECT * FROM employees WHERE manager_id IS NULL")

                let managerArray = managerData[0].map(manager => manager.first_name + " " + manager.last_name)

                manager;
                manager = managerArray;
                manager.unshift("none");

                // questions for adding an employee.
                const addEmployee = [
                    {
                        type: "input",
                        message: "what is your employee's first name?",
                        name: "employeesFirstName"
                    },

                    {
                        type: "input",
                        message: "what is your employee's last name?",
                        name: "employeesLastName"
                    },

                    {
                        type: "list",
                        message: "what is your employee's role?",
                        name: "employeesRole"
                    },

                    {
                        type: "list",
                        message: "who is your employee's manager?",
                        name: "employeesManager"
                    }
                ]

                // used to get user input
                const employeeInfo = await inquirer.createPromptModule(addEmployee);

                const { employeesFirstName, employeesLastName, employeesRole, employeesManager } = employeeInfo;

                // finds role id 
                const roleIdData = await db.promise().query(`SELECT * FROM roles WHERE title ='${employeesRole}'`);

                const roleID = roleIdData[0][0].id;

                if (employeesManager === "none") {
                    const noManagerName = "NULL";

                    // creates new employee and adds it to table
                    await db.promise().querry(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${employeesFirstName}', '${employeesLastName}', ${roleID}, ${noManagerName})`);

                } else {
                    // finds manager ID
                    const manNameArray = employeesManager.split(" ");
                    const manFirstName = manNameArray[0];
                    const manLastName = manNameArray[1];

                    // creates employee
                    const managerIdData = await db.promise().query(`SELECT * FROM employees WHERE first_name = '${manFirstName}' AND last_name = '${manLastName}'`);
                }
                console.log(`Successfully added ${newEmployeeFirstName} ${newEmployeeLastName}`)

                break;

            case "Add Role":
                let depData = await db.promise().query("SELECT * FROM departments")

                let depArray = depData[0].map(role => role.dep_name)

                departments;
                departments = depArray;

                const addRoleQ = [
                    {
                        type: "input",
                        message: "What is the name of this new role?",
                        name: "newRoleName"
                    },

                    {
                        type: "input",
                        message: "What is the salary of this new role?",
                        name: "newRoleSalary"
                    },

                    {
                        type: "list",
                        message: "What department does this role belong to?",
                        choices: departments,
                        name: "newRoleDepartment"
                    }
                ]

                const roleInfo = await inquirer.prompt(addRoleQ);
                const { newRoleName, newRoleSalary, newRoleDepartment } = roleInfo;

                // find role id 
                const newDepIdData = await db.promise().query(`SELECT * FROM departments WHERE dep_name = '${newRoleDepartment}'`);

                const newDepId = newDepIdData[0][0].id;

                // adds role into table
                db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${newRoleName}", ${newRoleSalary}, ${newDepId})`)

                console.log(`Successfully created ${newRoleName}`);

                break;

                case "Add Department":
                    const departmentInfo = await inquirer.prompt(addDepartment);

                    db.querry(`INSERT INTO departments (dep_name) VALUES ("${departmentInfo.newRoleDepartment}");`, function (err, results){
                        console.log(`\n${departmentInfo.newDepartmentName}`);

                    });
                    break;


        }
    }
}





// const updateEmployee = [
//     {
//         type: "input",
//         message: "witch employee's name would you like to update?",
//         choices: employees,
//         name: "updateEmployeeName"
//     },

//     {
//         type: "input",
//         Message: "witch role do you want to assign?",
//         choices: role,
//         name: "updateEmployeeRole"
//     }
// ]

 startPeogram();
