import { rl } from './readLine.js';


// prompts user with a question 
export async function askQuestionsNumber(question) {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            // the promise is rejected if the input is blank or not a number
            if (answer.trim() === '' || isNaN(answer.trim())) { // remove front/back whitespaces
                reject(new Error('Input cannot be blank or a letter!\n'));
            } else {
                resolve(answer); // returns the answer as value 
            }
        });
    });
}