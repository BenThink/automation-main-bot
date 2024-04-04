import { adventure } from './adventure.js';
import { delayMillisec } from '../utilsJs/delayMillisec.js';


// Define variables for battle number
export let attackStats = {
    battleNumber: 0
};

// fct to perform the attacks
export async function attack(page, enemy, answer, amount) {
    // for check if enemy's name is wrong       
    let enemyWrong;

    try {
        // Wait for the menu items to be available
        await page.waitForSelector(".menu", { timeout: 3000 });

        // Wait for 'Battle' menu to be available
        await page.waitForSelector(".menu > li:nth-child(8) > a", { timeout: 3000 });

        // Clicks twice on 'Battle' menu
        await page.click(".menu > li:nth-child(8) > a");
        await page.click(".menu > li:nth-child(8) > a");

        // wait 1.5 seconds
        await delayMillisec(1500);

        // Check if '.battlecountdown' exists
        const battleCountDown = await page.$('.battlecountdown');

        // If '.battlecountdown' does not exist, start a fight
        if (!battleCountDown) {
            // Wait for battle input to be available
            await page.waitForSelector("input[type='text']", { timeout: 3000 });

            // Clear the existing value in the input field
            await page.$eval('input[type="text"]', input => input.value = '');

            // Fill in the enemy name
            await page.type("input[type='text']", enemy, { delay: 50 });

            // Click on the "Battle" button
            await page.click(".button.submit");

            // wait 1.5 seconds
            await delayMillisec(1500);

            // Check if enemy's name is wrong
            enemyWrong = await page.$('.popup.small');

            if (enemyWrong) {
                // close pop up message
                await page.click('.button.close');
                // delay after enemy's wrong name, 1 sec
                await delayMillisec(1000);
                // throw an error
                throw new Error(`Enemy's name is wrong!\n`)
            } else {
                // Increase battle number
                attackStats.battleNumber++;
            }
        }
    } catch (error) {
        console.error(`Error during attack phase: ${error}`);
    } finally {
        // call fct adventure to continue
        await adventure(page, answer, amount);
    }
}
