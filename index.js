//Include packages needed for this application
const inquirer = require("inquirer");

//Include exports needed for this application
const { writeToFile, copyFile } = require("./utils/generate-file.js");
const generatePage = require("./src/page-template.js");
const { consoleAppStart, consoleIntroText,
    consoleAddTeamMemberText, consoleAddAnotherTeamMemberText } =
    require("./src/consoleLogText");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");


// Accept a default parameter employees and set it to empty array
const collectInputs = async (employees = []) => {

    // create array of prompt objects
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
                "Manager",
                "Engineer",
                "Intern"
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

    // Using destructuring to split off the moreMembers property and spread remaining properties into the answers object
    const { moreMembers, ...answers } = await inquirer.prompt(prompts);

    // Utilizing user-specified role and appropriate class to create role-specific newMember object, passing in user input
    if (answers.role === "Engineer") {
        newMember = new Engineer(
            answers.name, answers.id, answers.email, answers.role, answers.roleInfo);
    } else if (answers.role === "Intern") {
        newMember = new Intern(
            answers.name, answers.id, answers.email, answers.role, answers.roleInfo);
    } else {
        newMember = new Manager(
            answers.name, answers.id, answers.email, answers.role, answers.roleInfo);
    }

    // Creating new array by merging the inputs (employees) and newMember object
    const newEmployees = [...employees, newMember];

    // Check moreMembers to see if done, returning newEmployees or recursively calling collectInputs
    return moreMembers ? collectInputs(newEmployees) : newEmployees;
};

const main = async () => {
    // print user helper instructions
    console.log(`${consoleAppStart}`);
    console.log(`${consoleIntroText}`);
    console.log(`${consoleAddTeamMemberText}`);

    // call collectInputs function, assigning output to employees array
    employees = await collectInputs()
        .then(employees => {
            return generatePage(employees);  //pass employee array to page-template file, returning HTML
        })
        .then(pageHTML => {
            return writeToFile(pageHTML);  //use HTML and create index.html file
        })
        .then(writeFileResponse => {
            console.log(writeFileResponse);  //let user know file was created successfully
            return copyFile();  //copy file once writing file was a success
        })
        .then(copyFileResponse => {
            console.log(copyFileResponse);  //let user know stylesheet was created
        })
        .catch(err => {
            console.log(err);  //catch and log any errors in above process
        });
};

// run/initialize app
main();

// using user-selected role, get and return role-specific information
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
};

// check ID entered by user and confirm it falls in valid range
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
};