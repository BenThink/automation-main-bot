import { rl } from './readLine.js';


// prompts user with a question 
export async function askQuestionsLetter(question) {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            // the promise is rejected if the input is blank or a number
            if (answer.trim() === '' || !isNaN(answer.trim())) { // remove front/back whitespaces
                reject(new Error('Input cannot be blank or a number\n'));
            } else {
                resolve(answer.trim()); // resolved promise returns the answer as value 
            }
        });
    });
}