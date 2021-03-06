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
    
console.log(" _______ _______ ______ _______ ______ _______      _______ _______ ______ _____   _______ ___ ___ _______ _______      ______ _______ _____   _______" );
console.log("|    ___|   |   |   __ \_     _|   __ \    ___|    |    ___|   |   |   __ \     |_|       |   |   |    ___|    ___|    |   __ \       |     |_|    ___|");
console.log("|    ___|       |    __/_|   |_|      <    ___|    |    ___|       |    __/       |   -   |\     /|    ___|    ___|    |      <   -   |       |    ___|");
console.log("|_______|__|_|__|___|  |_______|___|__|_______|    |_______|__|_|__|___|  |_______|_______| |___| |_______|_______|    |___|__|_______|_______|_______|");
                                                                                                                                                        
 
    
    
    
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Welcome, Enployee Roster please update with the most recent information at all times, If a new enployee is being added note that complete onboarding must be completed before roster is updated",
            choices: [
                "View All Employees",
                "View By Department",
                // "View All Employees By Manager",
                // "Add Employee",
                // "Add Department",
                "View All Roles",
                "Add New Teammember",
                "Update Employee"
            ]
        })

        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    viewEmployee();
                    break;

                case "View By Department":
                    viewDepartment();
                    break;


                case "View By Manager":
                    addManager();
                    break;

                case "View All Roles":
                    viewRole();
                    break;

                case "Add New Teammember":
                    addNewTeamMember();
                    break;
                case "Update Employee":
                    upDateEnployeeRole();
                    break;

                case "Complete Update":
                    completeUpdate();
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


// all of the functions that allow you to view Employee, Department, Role and Manager are housed from 116 to________ This is also where we are calling the data base
// 


function viewEmployee() {
    
    var query = "SELECT employee.First_Name, employee.Last_Name, Department.Department, employee.role_id, role.Title, role.Salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;";
    connection.query(query, function (err, empress) {
        if (err) throw err;
        console.table(empress);

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

// function addManager() {
//     var query = "SELECT * FROM role.manager ";
//     connection.query(query, function (err, res) {
//         if (err) throw err;
//         console.table(res);
//         runSearch();
//     });
// };





// we are using this to grabe and update the roles and enployees and update there titles

function upDateEnployeeRole() {

    var queryEmployees = "SELECT employee.id, employee.First_Name, employee.Last_Name, Department.Department, employee.role_id, role.Title, role.Salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;";
    // var queryRole = "SELECT * FROM role "
    connection.query(queryEmployees, async function (empErr, empres) {
        if (empErr) throw empErr;
        console.table(empres);


        // x.First_Name + " " + x.Last_Name + " " +

        const map1 = empres.map(x =>  x.id)
        var seclectedEmp = await inquirer.prompt({
            name: "action",
            type: "list",
            message: " What employee would you like to change ",
            choices: map1


        })
        console.log(seclectedEmp.action)
        

        connection.query(queryEmployees, async function (roleErr, roleres) {
            if (roleErr) throw roleErr;
            console.table(roleres);
            // const id = roleres.map(x => x.Role_id + " ")

            const map2 = roleres.map(x => x.role_id + " ")
            var seclectedRole = await inquirer.prompt({
                name: "action",
                type: "list",
                message: " What role would you like to change ",
                choices: map2


            })
            console.log(seclectedRole.action)
            completeUpdate(seclectedRole, seclectedEmp)
        });
    })
    
    
};
//Update the address field:

function completeUpdate(seclectedRole, seclectedEmp) {
    var sql = "UPDATE employee SET role_id = ? WHERE id = ?";
    connection.query(sql, [seclectedRole.action, seclectedEmp.action], 
        function (err, result) {
        
            if (err) throw err;
        console.log(result);
        runSearch();
    });
    
console.log(seclectedRole, seclectedEmp)
}







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
            name: "First_Name",
            type: "input",
            message: "What is the employees first name?"
        },
        {
            name: "Last_Name",
            type: "input",
            message: "What is the employees last name?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the employees role?"
        }


    ])

        .then(function (answer) {
            connection.query("INSERT INTO employee SET ?",
                {
                    First_Name: answer.First_Name,
                    Last_Name: answer.Last_Name,
                    role_id: answer.role_id,
                    // Manager: answer.Manager,
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
                message: "What is the name of your Department id?",
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


// function addDepartment() {
//     var queryDepo = "SELECT * FROM Department "
//     connection.query(queryDepo, async function (empErr, empres) {
//         if (empErr) throw empErr;
//         console.table(empres);
//         const map1 = empres.map(x => x.Department + " ")
//         var seclectedEmp = await inquirer.prompt
//             ([{
//                 name: "department",
//                 message: "Choose a Department",
//                 type: "list",
//                 choices: map1
//             }])
//         // console.log("employee", seclectedEmp)

//         .then(function (empres) {
//                 connection.query("INSERT INTO department SET ?",
//                     {
//                         department: answer.department
//                     },


//                     function (err) {
//                         if (err) throw err;
//                         console.log("department added")
//                         runSearch();


//                     })
//             })


//     })
// }

