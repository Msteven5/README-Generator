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
            appendToFile("README", "md", "# " + response.Title + "\n\n" + "## Table Of Contents\n\n")
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

const getLicense = () => {
    switch(license) {

    }
}






async function init() {
    await writeFile();
    tableOfContents();
    createDoc();
}

init();