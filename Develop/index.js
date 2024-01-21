// TODO: Include packages needed for this application
const fs = require('fs')
const inquirer = require("inquirer");

// TODO: Create an array of questions for user input
const questions = [{
    message: 'What is the title of your project?',
    name: 'Title'
},
{
    message: 'Give a short description of the application:',
    name: 'Description'
},
{
    message: 'What are the installation instructions needed for this application?',
    name: 'Installation'
},
{
    message: 'How is this application supposed to be used?',
    name: 'Usage'
},
{
    message: 'Who contributed to the code included in this project?',
    name: 'Contributing'
},
{
    message: 'Give an example of a way to test out this application:',
    name: 'Tests'
},
{
    message: 'What is your email address with instructions to reach out?',
    name: 'Questions'
}
];

//This function just asks the questions using the inquirer node package.
const askQs = (questions) => {
    return inquirer.prompt(questions)
}

//This writes the data to the file I create.
const appendToFile = (filename, filetype, dataOnScreen) => {
    fs.appendFile(
        `${filename}.${filetype}`,
        dataOnScreen,
        (err) => {
            if (err) {
                console.log(err)
            }
        }
    )
}

//This creates the filename and makes it a global variable to be used later.
const writeFile = async () => {
    await askQs(questions[0])
        .then(response => {
            appendToFile("README", "md", "# " + response.Title + "\n\n")
        }
        )
}


const createDoc = async () => {
    for (let i = 1; i < questions.length; i++) {
        await askQs(questions[i])
            .then(async (response) => {
                await appendToFile("README", "md", "\n## " + questions[i].name + "\n\n" + response[questions[i].name] + "\n");
            })
    }
}

const tableOfContents = async () => {
    for (let i = 1; i < questions.length; i++) {
        await appendToFile("README", "md", "- [" + questions[i].name + "](#" + questions[i].name + ")\n")
    }
}

const getLicense = async () => {
    appendToFile("README", "md", "## License\n\n")

    await askQs({
        type: 'list',
        message: 'What license was used in the making of this application?',
        name: 'License',
        choices: ['MIT', 'Unlicense', 'Artistic-2.0']
    },)
    .then(response => {
    switch (response.License) {
        case 'MIT': appendToFile("README", "md",'[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n\n' + "## Table Of Contents\n\n")
            break;
        case 'Unlicense': appendToFile("README", "md",'[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)\n\n'+ "## Table Of Contents\n\n")
            break;
        case 'Artistic-2.0': appendToFile("README", "md",'[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)\n\n'+ "## Table Of Contents\n\n")
            break;
        default: ''
    }
    })
}

async function init() {
    await writeFile();
    await getLicense();
    await tableOfContents();
    await createDoc();
}

init();