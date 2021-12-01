// Create the team
const generateTeam = team => {

    // create the manager html
    const generateManager = manager => {
        return `
    <div class="col">
        <div class="card employee-card">
            <div class="card-header">
                <h2 class="card-title">${manager.getName()}</h2>
                <h3 class="card-title">
                    <img src="./images/manager.svg"
                    alt="Team of stick figures with manager in front"
                    width="29"
                    height="29"/>
                    ${manager.getRole()}
                </h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"><i class="bi bi-person-badge"></i> ${manager.getId()}</li>
                    <li class="list-group-item"><i class="bi bi-envelope"></i> <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
                    <li class="list-group-item"><i class="bi bi-building"></i> ${manager.getOfficeNumber()}</li>
                </ul>
            </div>
        </div>
    </div>
        `;
    };

    // create the html for engineers
    const generateEngineer = engineer => {
        return `
    <div class="col">
        <div class="card employee-card">
            <div class="card-header">
                <h2 class="card-title">${engineer.getName()}</h2>
                <h3 class="card-title">
                    <img src="./images/engineer.jpg"
                    alt="Team of stick figures with manager in front"
                    width="28"
                    height="28"/> 
                    ${engineer.getRole()}
                </h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"><i class="bi bi-person-badge"></i> ${engineer.getId()}</li>
                    <li class="list-group-item"><i class="bi bi-envelope"></i> <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                    <li class="list-group-item"><i class="bi bi-github"></i> <a href="https://github.com/${engineer.getGithub()}">${engineer.getGithub()}</a></li>
                </ul>
            </div>
        </div>
    </div>
        `;
    };

    // create the html for interns
    const generateIntern = intern => {
        return `
    <div class="col">
        <div class="card employee-card">
            <div class="card-header">
                <h2 class="card-title">${intern.getName()}</h2>
                <h3 class="card-title">
                <img src="./images/intern.svg"
                    alt="Team of stick figures with manager in front"
                    width="34"
                    height="34"/> 
                    ${intern.getRole()}</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item"><i class="bi bi-person-badge"></i> ${intern.getId()}</li>
                    <li class="list-group-item"><i class="bi bi-envelope"></i> <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
                    <li class="list-group-item"><i class="bi bi-mortarboard"></i> ${intern.getSchool()}</li>
                </ul>
            </div>
        </div>
    </div>
        `;
    };

    const html = [];

    html.push(team
        .filter(employee => employee.role.includes("Manager"))
        .map(manager => generateManager(manager))
    );
    html.push(team
        .filter(employee => employee.role.includes("Engineer"))
        .map(engineer => generateEngineer(engineer))
        .join("")
    );
    html.push(team
        .filter(employee => employee.role.includes("Intern"))
        .map(intern => generateIntern(intern))
        .join("")
    );

    return html.join("");
};

// export function to generate entire page
module.exports = team => {
    return `
<!doctype html>
    <html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

        <!-- Bootstrap CSS Icons -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.1/font/bootstrap-icons.css">

        <!-- Application CSS -->
        <link rel="stylesheet" href="style.css" />
        
        <title>My Team</title>
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3 team-heading">
                    <h1>My Team</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="team-area col-12 d-flex justify-content-center">
                    ${generateTeam(team)}
                </div>         
            </div>
        </div>
    </body>
</html>
    `;
};