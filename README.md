![License](https://img.shields.io/badge/license-MIT-success)

# 10 OOP: Team Profile Generator

## Description

This is a Node.js command-line interface (CLI) application that takes in information about employees on a software engineering team and generates an HTML webpage that displays summaries for each person. User input is collected through the [Inquirer package](https://www.npmjs.com/package/inquirer) and [Jest](https://www.npmjs.com/package/jest) was used for running unit tests.

[back to top](#table-of-contents)

## Table of Contents

[Description](#description) | [Installation](#installation) | [Review](#review) | [Usage](#usage) | [License](#license) | [Contributing](#contributing) | [Tests](#tests) | [Questions](#questions)

## Installation

To install necessary dependencies into the node_modules folder, run the following command:

```
npm i
```

[back to top](#table-of-contents)

##Review

_Walk-through Videos_

- [Generate README with License set to MIT](docs/README_License.gif)
- [Generate README with License set to NONE](docs/README_NoLicense.gif)

_File Generated Using this Application_

- [Sample README.md](docs/Sample-README.md)

_GitHub Repository_

- [GitHub Repository URL](https://github.com/baxters4karma/c9-readme-generator)

_GitHub Project_

- [Link to project](https://github.com/baxters4karma/readme-generator/projects)

_GitHub Issues_

- [Link to issues](https://github.com/baxters4karma/readme-generator/issues)

[back to top](#table-of-contents)

## Usage

The application is invoked by using the following command:

```
node index
```

To download this project: first clone the repo, then download the application's dependencies into the node_modules folder as listed in the [Installation](#installation) section above.

Project folder structure:

```
.
├─__tests__/   //jest tests
│ ├── Employee.test.js
│ ├── Engineer.test.js
│ ├── Intern.test.js
│ └── Manager.test.js
├── dist/      // rendered output (HTML) and CSS style sheet
├── lib/       // classes
├── src/       // template helper code
├── .gitignore // indicates folders/files Git should ignore
├── index.js   // runs the application
└── package.json
```

[back to top](#table-of-contents)

## License

This project is licensed under the MIT license.

[back to top](#table-of-contents)

## Contributing

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](../code_of_conduct.md#top)

To help make community values explicit, and signal commitment to creating a welcoming and safe environment for everyone, the [Contributor Covenant](../code_of_conduct.md) has been adopted.

[back to top](#table-of-contents)

## Tests

To run tests, run the following command:

```
npm test
```

[back to top](#table-of-contents)

## Questions

If you have any questions about the repo, open an issue or contact me directly at christine.d.baxter@live.com. You can find more of my work at [baxters4karma](https://github.com/baxters4karma/).

[back to top](#table-of-contents)
