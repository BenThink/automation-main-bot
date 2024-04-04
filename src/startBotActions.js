import puppeteer from "puppeteer";
import { logIn } from '../actions/logIn.js';
import { stats } from '../actions/adventure.js';
import { attackStats } from '../actions/attack.js';
import { donateStats } from '../actions/donateGold.js';
import { delayMillisec } from '../utilsJs/delayMillisec.js';


// starts the tasks of the Bot
export async function startBotActions(username, password, numberOfRuns, enemy, headlessMode, answer, amount) {
    try {
        // Convert the numberOfRuns from string to int before the loop
        const numberOfRunsInt = parseInt(numberOfRuns, 10);

        for (let i = 0; i < numberOfRunsInt; i++) {
            // Open chrome with config.
            const browser = await puppeteer.launch({
                headless: headlessMode === 'true',
                defaultViewport: false
            });

            // Open a new page
            const page = await browser.newPage();

            // Reset minTime, maxExp, maxEffic & advIndex for each iteration
            stats.minTime = Infinity;
            stats.maxExperience = -Infinity;
            stats.maxEfficiency = -Infinity;
            stats.selectedAdventureIndex = -1;

            // call the log in fct
            await logIn(page, username, password, enemy, answer, amount);

            // Display different data in console
            console.log(`Adventure: ${i + 1}`);
            console.log(`Time: ${stats.minTime} minutes`);
            console.log(`Experience: ${stats.maxExperience} exp.`);
            console.log(`Max. Efficiency: ${(stats.maxEfficiency).toFixed(2)} exp. / minute`);
            console.log(`Battle: ${attackStats.battleNumber}`);

            if (answer === 'true') {
                console.log(`Donated gold: ${donateStats.donatedGold} gold`);
            }
            console.log("----------------------------------------\n");

            // logging out
            const logOutButton = await page.waitForSelector('#hmenu > li:nth-child(5) > a', { timeout: 3000, visible: true });
            await logOutButton.click();

            // wait 1.5 sec after log out
            await delayMillisec(1500);

            // close chrome instance
            await browser.close();

            // stops delay at last itteration
            if (i < numberOfRunsInt - 1) {
                // Wait for the adventure to finish
                const delay = stats.minTime * 60 * 1000;
                await delayMillisec(delay);
            }
        }
    } catch (error) {
        console.error(`\nError during startBotActions phase: ${error}\n`);
    }
}

