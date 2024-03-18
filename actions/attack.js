import { adventure } from './adventure.js';


// Define variables for battle number
export let attackStats = {
    battleNumber: 0
};

const DELAY = 1000; // delay after enemy's wrong name

// fct to perform the attacks
export async function attack(page, enemy, answer, amount) {
    // for check if enemy's name is wrong       
    let enemyWrong;

    try {
        // Wait for the menu items to be available
        await page.waitForSelector(".menu", { timeout: 3000, visible: true });

        // Click on the "Battle" menu
        await page.click(".menu > li:nth-child(8) > a");
        await page.click(".menu > li:nth-child(8) > a");

        // Check if '.battlecountdown' exists
        const battleCountDown = await page.$('.battlecountdown');

        // If '.battlecountdown' does not exist, start a fight
        if (!battleCountDown) {
            // Wait for battle input to be available
            await page.waitForSelector("input[type='text']", { timeout: 3000, visible: true });

            // Clear the existing value in the input field
            await page.$eval('input[type="text"]', input => input.value = '');

            // Fill in the enemy name
            await page.type("input[type='text']", enemy, { delay: 50 });

            // Click on the "Battle" button
            await page.click(".button.submit");

            // Check if enemy's name is wrong
            enemyWrong = await page.$('.popup.small');

            if (enemyWrong) {
                // close pop up message
                await page.click('.button.close');
                // wait 1 sec
                await new Promise(resolve => setTimeout(resolve, DELAY));
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
