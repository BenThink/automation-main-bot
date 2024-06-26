import { attack } from './attack.js';
import { delayMillisec } from '../utilsJs/delayMillisec.js';


const MAX_LOGIN_ATTEMPTS = 3; // Max number of attempts to try logging in
const URL = "https://www.arislegends.com/index.php";

// logs in the user
export async function logIn(page, username, password, enemy, answer, amount) {
    // Flag to indicate login success
    let loggedIn = false;

    for (let attempt = 1; attempt <= MAX_LOGIN_ATTEMPTS; attempt++) {
        try {
            // waits for both actions to complete
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle0' }), // waits for navig. triggered by 'goto' to finish
                page.goto(URL)// Navigate to the desired URL
            ]);

            // Wait for the login form to be available
            await page.waitForSelector(".login-form", { timeout: 3000, visible: true });

            // Fill in the login credentials
            await page.type("#l_user", username, { delay: 25 });
            await page.type("#l_pass", password, { delay: 25 });

            // waits for both actions to complete
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle0' }), // waits for navig. triggered by click to finish
                page.click(".submit") // clicks on log in button
            ]);

            // checks for a specific class after log in
            const logInOk = await page.waitForSelector('#currency', { visible: true, timeout: 3000 });

            // checks if log in was successful
            if (logInOk) {
                loggedIn = true; // Set flag to true if log in is successful
                break; // Exit the loop if log in was successful
            }
        } catch (error) {
            console.error(`\nLogin attempt ${attempt} failed: ${error}`);

            if (attempt === MAX_LOGIN_ATTEMPTS) {
                console.error('\nAll login attempts failed! Exiting the bot...\n');
                process.exit(1); // exiting the bot with failure code
            }
            // Wait 2 sec before trying again
            await delayMillisec(2000);
        } finally {
            // if user logged in, calls the attack fct
            if (loggedIn) {
                await attack(page, enemy, answer, amount);
            }
        }
    }
}
