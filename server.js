console.log(`+----------------------------------------------------------+`);
console.log(`|                                                          |`);
console.log(`|     _____                 _                              |`);
console.log(`|    |  ___|_ __ ___  _ __ | | ___  _   _  ____  ____      |`);
console.log("|    |  _| | '_ ' _ \| '_ \| |/ _ \| | | |/  _ \/  _ \     |");
console.log(`|    |  |__| | | | | | |_) | | (_| | |_| |   __/   __/     |`);
console.log(`|    |_____|_| |_| |_| .__/|_|\___/\___, |\____|\____|     |`);
console.log(`|                    |_|            |___/                  |`);
console.log(`|     __  __                                               |`);
console.log(`|    |  \/  | ___ _ _ __   ___ _  ___ _  ____   _ __       |`);
console.log(`|    | |\/| |/ _ ' | '_ \ / _ ' |/ _ ' |/  _ \ | '__|      |`);
console.log(`|    | |  | | (_|  | | | | (_|  | (_|  |  ___/ |  |        |`);
console.log(`|    |_|  |_|\___,_|_| |_|\___,_|\___, |\____| |__|        |`);
console.log(`|                                |____/                    |`);
console.log(`|                                                          |`);
console.log(`+----------------------------------------------------------+`);

const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { updateEmploy, updateEmployQ, employeeAdd, employeesQ, roleAdd, roleQ, departmentAdd, departmentQ } = require('./helper/prompts');
const { department, roles, employees } = require('./helper/sql');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log('Connected to the Employee Database')
);

function info() {
        inquirer
            .prompt(
                [
                    {
                        type: 'list',
                        message: 'What you would like to do? ',
                        name: 'answer',
                        choices: ['View All Departments',
                            'View All Roles',
                            'View All Employees',
                            'Add a Department',
                            'Add a Role',
                            'Add an Employee',
                            'Update an Employee Role',
                            'Quit']
                    }]
            )
            .then((response) => {
                const answer = response.answer
                if (answer == 'View All Departments') {
                    db.query(department, function (err, result) {
                        console.log('');
                        console.table(result);
                        info();
                    })
                } else if (answer == 'View All Roles') {
                    db.query(roles, function (err, result) {
                        console.log('');
                        console.table(result);
                        info();
                    })
                } else if (answer == 'View All Employees') {
                    db.query(employees, function (err, result) {
                        console.log('');
                        console.table(result);
                        info();
                    })
                } else if (answer == 'Add a Department') {
                    inquirer
                        .prompt(departmentQ)
                        .then(db.query(departmentAdd, function (err, result) {
                            console.log('');
                            console.log(result);
                        }))
                    info();
                } else if (answer == 'Add Role') {
                    inquirer
                        .prompt(roleQ)
                        .then(db.query(roleAdd, function (err, result) {
                            console.log('');
                            console.log(result);
                        }))
                    info();
                }
                else if (answer == 'Add an Employee') {
                    inquirer
                        .prompt(updateEmployQ)
                        .then(db.query(employeeAdd, function (err, result) {
                            console.log('');
                            console.log(result);
                        }))
                    info();
                } else if (answer == 'Update an Employee Role') {
                    inquirer
                        .prompt(employeesQ)
                        .then(db.query(updateEmploy, function (err, result) {
                            console.log('');
                            console.log(result);
                        }))
                    info();
                }


            });
    }


info()
