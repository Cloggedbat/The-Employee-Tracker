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
  database: "top_songsDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected and running ")
  });
  
  
  function allSongs(){
      con.query(
          "SELECT * FROM top5000",
          (err, res) => {
              if (err) throw err
              console.log(res);
            }
            
            )
            connection.end();
        }
  
  