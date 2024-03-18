import { rl } from './readLine.js';


// prompts user with a question 
export async function askQuestionsLetterNr(question) {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            // the promise is rejected if the input is blank 
            if (answer.trim() === '') { // remove front/back whitespaces
                reject(new Error('Input cannot be blank\n'));
            } else {
                resolve(answer); // returns the answer as value 
            }
        });
    });
}