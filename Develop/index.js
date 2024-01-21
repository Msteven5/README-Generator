// TODO: Include packages needed for this application
const fs = require('fs')
const inquirer = require("inquirer");

let fileName;
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
    input: 'list',
    message: 'What license was used in the making of this application?',
    name: 'License',
    choices: [
        'MIT',
        'Unlicense',
        'Artistic-2.0'
    ]
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

const generateHeaders = (content) => {
    return `##${content}`
}

//This creates the filename and makes it a global variable to be used later.
const getFileName = async () => {
    await askQs(questions[0])
        .then(response => {
            fileName = response;
            appendToFile(fileName.Title, "README.md", `# ${fileName.Title}\n\n`)
        }
        )
}


const createDoc = async () => {
    for (let i = 1; i < questions.length; i++) {
        await askQs(questions[i])
        .then(async (response) => {
            await appendToFile(fileName.Title, "README.md", "## " + questions[i].name + "\n\n" + response[questions[i].name] + "\n\n");
        })
    }
}


async function init() {
    await getFileName();
    createDoc();
}

init();

// askQs(questions)
//     .then((responses) => {
//         appendToFile(responses.title, "md", "README\n")
//         appendToFile(responses.title, "md", generateHeaders(responses.title) + "\n")

//             appendToFile(responses.title, "md", generateHeaders(questions[i].name) + "\n")
//         }
//     })
//     .catch(console.error)
// // TODO: Create a function to write README file
// function writeToFile(fileName, data) { }

// // TODO: Create a function to initialize app
// function init() { }

// // Function call to initialize app
// init();
