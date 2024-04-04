import { askQuestionsLetter } from "../utilsJs/askQuestionsLetter.js";
import { askQuestionsLetterNr } from "../utilsJs/askQuestionsLetterNr.js";
import { askQuestionsNumber } from "../utilsJs/askQuestionsNumber.js";
import { startBotActions } from "./startBotActions.js";
import { rl } from '../utilsJs/readLine.js';
import { delayMillisec } from '../utilsJs/delayMillisec.js';

const MAX_RETRY = 3;// tries for entering data

// fct for user inputs and the core flow/logic of the Bot
export async function mainControl() {
    let username, password, numberOfRuns, enemy, headlessMode, answer;
    let amount = 0;

    for (let attempts = 1; attempts <= MAX_RETRY; attempts++) {
        let continueExecution = true; // flag to check if we should continue execution

        try {
            console.log('\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+');

            // Prompt user for inputs
            username = await askQuestionsLetter("Enter your username: ");
            password = await askQuestionsLetterNr("Enter your password: ");
            numberOfRuns = await askQuestionsNumber("\nEnter number of adventures: ");
            enemy = await askQuestionsLetter("Enter enemy's name: ");
            headlessMode = await askQuestionsLetter("Headless mode (true/false): ");
            answer = await askQuestionsLetter("\nDonate gold (true/false): ");

            // Check if answer is 'true' for Donating Gold
            if (answer === 'true') {
                amount = await askQuestionsNumber("Enter the amount: ");

            }
            console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n\n');

            rl.close(); // close interface

            break; // exiting loop if data entered correct
        } catch (error) {
            console.error(`\nError during mainControl phase: ${error}`);
            continueExecution = false; // set flag false on error - stop continue execution 

            if (attempts === MAX_RETRY) {
                console.error('All attempts to enter data failed! Exiting the bot...\n');
                process.exit(1); // exiting the bot with failure code    
            }

            // delay before trying again to enter data / millisec. to sec.(1.5)
            await delayMillisec(1500);
        } finally {
            if (continueExecution) {
                await startBotActions(username, password, numberOfRuns, enemy, headlessMode, answer, amount);
            }
        }
    }
}
