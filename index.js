const inquirer = require("inquirer");
const { writeToFile, copyFile } = require("./utils/generate-file.js");
const generatePage = require("./src/page-template.js");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const collectInputs = async (employees = []) => {

    const prompts = [
        {
            type: "input",
            name: "name",
            message: "Enter team member's name:",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter team member's name!");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "role",
            message: "Select team member's role:",
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ],
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please select role!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "Enter team member's id:",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter team member's id!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter team member's email address:",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a valid email address!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "roleInfo",
            message: (answers) => `Enter team member's ${getRoleInfo(answers.role)}`
        },
        {
            type: "confirm",
            name: "moreMembers",
            message: "Would you like to add more team members?",
            default: true
        }
    ];


    const { moreMembers, ...answers } = await inquirer.prompt(prompts);
    if (answers.role === "Engineer") {
        newMember = new Engineer(answers.name, answers.id, answers.email, answers.role, answers.roleInfo);
    } else if (answers.role === "Intern") {
        newMember = new Intern(answers.name, answers.id, answers.email, answers.role, answers.roleInfo);
    } else {
        newMember = new Manager(answers.name, answers.id, answers.email, answers.role, answers.roleInfo);
    }

    const newEmployees = [...employees, newMember];
    return moreMembers ? collectInputs(newEmployees) : newEmployees;
};

const main = async () => {
    const employees = await collectInputs()
        // console.log(employees);
        .then(employees => {
            return generatePage(employees);
        })
        .then(pageHTML => {
            return writeToFile(pageHTML);
        })
        .then(writeFileResponse => {
            console.log(writeFileResponse);
            return copyFile();
        })
        .then(copyFileResponse => {
            console.log(copyFileResponse);
        })
        .catch(err => {
            console.log(err);
        });
};

main();

function getRoleInfo(role) {
    let roleInfo = "";
    if (role === "Engineer") {
        roleInfo = "GitHub username:";
        return roleInfo;
    } else if (role === "Intern") {
        roleInfo = "school name:";
        return roleInfo;
    } else {
        roleInfo = "office phone number:";
        return roleInfo;
    }
};