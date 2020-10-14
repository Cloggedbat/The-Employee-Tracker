var mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");
const { query } = require("express");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Toskiornottoski500!",
    database: "Employee_HW_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected and running ")
    runSearch()
});

//   initial prompt function for the questions 

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do? (if adding a new enployee go in order so you dont get lost)",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                // "Add Employee",
                // "Add Department",
                "View All Roles",
                "Add New Teammember",
                "Update"
            ]
        })

        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    viewEnployee();
                    break;

                case "View All Employees By Department":
                    viewDepartment();
                    break;


                // case "Add Employee":
                //     addEmployee();
                //     break;

                case "View All Roles":
                    viewRole();
                    break;

                case "Add New Teammember":
                    addNewTeamMember();
                    break;
                case "Update":
                    upDateEnployeeRole();
                    break;
            }
        });

}



function addNewTeamMember() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [

                "Add Employee",
                "Add Department",
                "Add Role"
            ]
        })

        .then(function (answer) {
            switch (answer.action) {


                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;
            }
        });

}




function viewEnployee() {
    // inquirer.prompt({
    //     name: "employee",
    //     type: "input",
    //     // message: "What is the employees first name? ",
    // })
    // (function (answer) {
    var query = "SELECT * FROM employee INNER JOIN department ON employee.id = department.id INNER JOIN role ON department.id = role.id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);

        runSearch();
    });
};

function viewDepartment() {
    var query = "SELECT * FROM department ";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
};

function viewRole() {
    var query = "SELECT * FROM role ";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
};
// we are using this to grabe and update the roles and enployees and update there titles
function upDateEnployeeRole() {

    var queryEmployees = "SELECT * FROM employee"
    var queryRole = "SELECT * FROM role "
    connection.query(queryEmployees, async function (empErr, empres) {
        if (empErr) throw empErr;
        console.log(empres);

        const map1 = empres.map(x => x.first_name + " " + x.last_name)
        var seclectedEmp = await inquirer.prompt({
            name: "action",
            type: "list",
            message: " what employee would you like to change ",
            choices: map1


        })
        console.log("employee", seclectedEmp)


        connection.query(queryRole, function (roleErr, rolres) {
            if (roleErr) throw roleErr;
            console.table(rolres);

        });
    })


    // runSearch();
};



// inquirer.prompt({
//     name: "department",
//     type: "list",
//     message: "What department would you like to see? ",
//     choices: [
//         "sales",
//         "researcher",
//         "enginier"

//     ]
// })
// .then(function (answer) {
//     var query = "SELECT * employee INNER JOIN department ON employee.id = department.id INNER JOIN role ON department.id = role.id";
//     connection.query(query, { department: answer.department }, function (err, res) {
//         if (err) throw err
//         for (var i = 0; i < res.length; i++) {
//             console.table("id: " + answer[i].id + " || first_name: " + answer[i].first_name + " || last_name: " + answer[i].last_name + " || role_id: " + answer[i].role_id + " || department: " + answer[i].department);
//         }


//         runSearch();
//     });
// });
// }













function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employees first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employees last name?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the employees role id #?"
        }


    ])

        .then(function (answer) {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    // salary: answer.salary,
                },
                // connection.query ("INSERT INTO role SET ?", 
                // {
                //     salary: answer.salary,
                // },
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee added")
                    runSearch();
                });

        });
};



function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the name of your title?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary? please use #'s only",
            },
            {
                name: "department_id",
                type: "input",
                message: "What is the name of your department id?",
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },


                function (err) {
                    if (err) throw err;
                    console.log("department added")
                    runSearch();
                })
        })


}






function addDepartment() {
    inquirer
        .prompt(
            {
                name: "department_id",
                type: "input",
                message: "What is the name of your department?",
            })
        .then(function (answer) {
            connection.query("INSERT INTO department SET ?",
                {
                    department: answer.department_id
                },


                function (err) {
                    if (err) throw err;
                    console.log("department added")
                    runSearch();
                })
        })


}




