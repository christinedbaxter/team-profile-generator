const inquirer = require("inquirer");
const { writeFile, copyFile } = require("./utils/generate-site.js");
const generatePage = require("./src/page-template.js");

const collectInputs = async (employees = []) => {

    const prompts = [
        {
            type: "input",
            name: "teamMemberName",
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
            name: "teamMemberRole",
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
            name: "teamMemberId",
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
            name: "teamMemberEmail",
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
            name: "roleInfoData",
            message: (answers) => `Enter team member's ${getRoleInfo(answers.teamMemberRole)}`
        },
        {
            type: "confirm",
            name: "moreMembers",
            message: "Would you like to add more team members?",
            default: true
        }
    ];

    const { moreMembers, ...answers } = await inquirer.prompt(prompts);
    const newEmployees = [...employees, answers];
    return moreMembers ? collectInputs(newEmployees) : newEmployees;
};

const main = async () => {
    const employees = await collectInputs()
        // console.log(employees);
        .then(employees => {
            return generatePage(employees);
        })
        .then(pageHTML => {
            return writeFile(pageHTML);
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