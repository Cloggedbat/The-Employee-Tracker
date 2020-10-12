var mysql = require("mysql");
const inquirer = require("inquirer")


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
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    viewEnployee();
                    break;

                case "View All Employees By Department":

                    break;

                case "View All Employees By Manager":

                    break;

                case "Add Employee":

                    break;
            }
        });

    function viewEnployee() {
        inquirer.prompt({
            name: "employee",
            type: "input",
            message: "What is the employees first name? ",
        })
            .then(function (answer) {
                var query = "SELECT first_name FROM enployee WHERE ?"
                connection.query(query, { first_name: answer.employee }, function (err, res) {
                    for (var i = 0; i < res.length; i++) {
                        console.log("id" + res[i].id + " || first_name: " + res[i].name +" || last_name: " + res[i].name);
                    }

                });
            });
    }
}
