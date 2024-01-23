// TODO: Include packages needed for this application
const fs = require('fs').promises;
const inquirer = require("inquirer");

let licenseName;

//This is my questions array that will be sorted through later and the response info distributed.
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
},
];

//This function just asks the questions using the inquirer node package.
const askQs = (questions) => {
    return inquirer.prompt(questions)
}

//This writes the data to the file I create.
const appendToFile = (dataOnScreen) => {
    fs.appendFile(
        "README.md",
        dataOnScreen)
        .catch(function (error) {
            console.log(error)
        })
}


//This creates the filename and makes it a global variable to be used later.
const createDoc = async () => {
    for (let i = 1; i < questions.length; i++) {
        await askQs(questions[i])
            .then(async (response) => {
                await appendToFile("\n## " + questions[i].name + "\n\n" + response[questions[i].name] + "\n");
            })
    }
    await askQs({
        message: 'What is your GitHub username for the link address?',
        name: 'Github',
    })
        .then(async (response) => {
            await appendToFile("\nhttps://github.com/" + response.Github + "\n\n## License\n\n" + licenseName.notice)
        })
}

//This function populates the table of contents. For loop did not work and could not uncover why.
const tableOfContents = () => {
    appendToFile(
        "- [" + questions[1].name + "](#" + questions[1].name + ")\n" +
        "- [" + questions[2].name + "](#" + questions[2].name + ")\n" +
        "- [" + questions[3].name + "](#" + questions[3].name + ")\n" +
        "- [" + questions[4].name + "](#" + questions[4].name + ")\n" +
        "- [" + questions[5].name + "](#" + questions[5].name + ")\n" +
        "- [" + questions[6].name + "](#" + questions[6].name + ")\n" +
        "- [License](#License)\n"
    )
}

//This function gathers the license information from the user and distributes it to fill in the licenseName variable.
const getLicense = async () => {

    await askQs({
        type: 'list',
        message: 'What license was used in the making of this application?',
        name: 'License',
        choices: ['MIT', 'Unlicense', 'Artistic-2.0', 'None']
    })
        .then(response => {
            switch (response.License) {
                case 'MIT': licenseName = {
                    badge: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
                    notice: 'This application uses the ' + response.License + ' license that you can learn all about by clicking the badge listed at the top of the README, next to the title.'
                }
                    break;
                case 'Unlicense': licenseName = {
                    badge: '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)',
                    notice: 'This application uses the ' + response.License + ' license that you can learn all about by clicking the badge listed at the top of the README, next to the title.'
                }
                    break;
                case 'Artistic-2.0': licenseName = {
                    badge: '[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)',
                    notice: 'This application uses the ' + response.License + ' license that you can learn all about by clicking the badge listed at the top of the README, next to the title.'
                }
                    break;
                default: licenseName = {
                    badge: 'None',
                    notice: 'None'
                }
            }
        })
}

//This initializes the whole process by filling in the title and license badge at the top of the screen before the rest of the process occurs.
const writeFile = async () => {
    await askQs(questions[0])
        .then(async (response) => {
            await appendToFile("# " + response.Title + "            " + licenseName.badge + "\n\n## Table Of Contents\n\n")
        })
}

async function init() {
    await getLicense();
    await writeFile();
    await tableOfContents();
    await createDoc();
}

init();