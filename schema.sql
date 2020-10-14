DROP DATABASE IF EXISTS Employee_HW_db;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE Employee_HW_db;

USE Employee_HW_db;

-- Create the table tasks.
CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT ,
first_name  VARCHAR(30) NOT NULL,
last_name  VARCHAR(30) NOT NULL,
role_id  VARCHAR (10) NOT NULL,
manager_id  INT (10)NULL,
PRIMARY KEY (id)
);


CREATE TABLE department (
 id int NOT NULL AUTO_INCREMENT,
department VARCHAR (50) NOT NULL,
  PRIMARY KEY (id)

);


CREATE TABLE role (
id int NOT NULL AUTO_INCREMENT,

 title VARCHAR (50)NOT NULL,
  salary DECIMAL (10,2) NULL,
  department_id INT NOT NULL,
    PRIMARY KEY (id)

);




INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("aj", "clemens", 007, 117), ("vala", "rojas", 123,1234), ("Billy", "Crooker", 040, 456), ("John", "Jankins", 303, 4568);

INSERT INTO department (department)
VALUES ("sales"), ("researcher"), ("contractor"), ("sales");

INSERT INTO role (title, salary, department_id)
VALUES ("sales manager", 1000000.23, 0), ("research manager", 50000.23, 5), ("Problem solver", 50000.23, 5), ("problem maker", 50000.23, 5);


USE Employee_HW_db;
SELECT * FROM employee
INNER JOIN department ON employee.id = department.id
INNER JOIN role ON department.id = role.id;

USE Employee_HW_db;
SELECT * FROM department;

USE Employee_HW_db;
SELECT * FROM role;

USE Employee_HW_db;
SELECT * FROM employee;
-- USE Employee_HW_db;
-- SELECT * FROM department 
-- INNER JOIN department ON employee.id = department.id
-- INNER JOIN role ON department.id = role.id;