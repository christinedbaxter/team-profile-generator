const inquirer = require("inquirer");
const { writeToFile, copyFile } = require("./utils/generate-file.js");
const generatePage = require("./src/page-template.js");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const { consoleAppStart, consoleIntroText,
    consoleAddTeamMemberText, consoleAddAnotherTeamMemberText } =
    require("./src/consoleLogText");

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
            validate: (nameInput, answers) => {
                if (checkId(nameInput, answers.role)) {
                    return true;
                } else {
                    console.log("\nInvalid number, choose an id within valid range for role!")
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter team member's email address:",
            validate: nameInput => {
                if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(nameInput))) {
                    return true;
                } else {
                    console.log("\nPlease enter a valid email address!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "roleInfo",
            message: (answers) => `Enter team member's ${getRoleInfo(answers.role)}`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log(`\nPlease enter your ${getRoleInfo(answers.role)}!`);
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "moreMembers",
            message: `${consoleAddAnotherTeamMemberText}\nWould you like to add more team members? \n(press enter for Yes or enter 'n' when done)`,
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
    console.log(`${consoleAppStart}`);
    console.log(`${consoleIntroText}`);
    console.log(`${consoleAddTeamMemberText}`);
    employees = await collectInputs()
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
        roleInfo = "office number:";
        return roleInfo;
    }
};

// return true if team member id is in range, otherwise false
function inRange(x, min, max) {
    return ((x - min) * (x - max) <= 0);
}

function checkId(nameInput, role) {
    if (role === "Manager") {
        return inRange(nameInput, 100, 300);
    } else if (role === "Engineer") {
        return inRange(nameInput, 200, 400);
    } else if (role === "Intern") {
        return inRange(nameInput, 700, 900);
    } else {
        return false;
    }
}