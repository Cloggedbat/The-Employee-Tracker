var mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

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
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Add Department",
                "Add Role"
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

                case "View All Employees By Manager":

                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add role":
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
    inquirer.prompt({
        name: "department",
        type: "list",
        message: "What department would you like to see? ",
        choices: [
            "sales",
            "researcher",
            "enginier"

        ]
    })
        .then(function (answer) {
            var query = "SELECT * employee INNER JOIN department ON employee.id = department.id INNER JOIN role ON department.id = role.id";
            connection.query(query, { department: answer.department }, function (err, res) {
                if (err) throw err
                for (var i = 0; i < res.length; i++) {
                    console.table("id: " + answer[i].id + " || first_name: " + answer[i].first_name + " || last_name: " + answer[i].last_name + " || role_id: " + answer[i].role_id + " || department: " + answer[i].department);
                }


                runSearch();
            });
        });
}


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
        ,
        {
            name: "salary",
            type: "input",
            message: "What is the employees salary?"
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
                    console.log("Department added")
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
                message: "What is the name of your new role?"
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO role SET ?",
                {
                    title: answer.department_id
                },


                function (err) {
                    if (err) throw err;
                    console.log("role added")
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




