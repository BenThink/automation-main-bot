import { delayMillisec } from '../utilsJs/delayMillisec.js';


// Define variable for gold donated
export let donateStats = {
    donatedGold: 0
};

// fct for donating gold in quild
export async function donateGold(page, answer, amount) {
    try {
        if (answer === 'true') {
            // Wait for currency value to appear
            await page.waitForSelector("#currency", { timeout: 3000, visible: true });

            // Select gold element
            const goldElement = await page.$("#currency > span.value");

            // Extract gold text
            const goldText = await goldElement.evaluate((element) => element.textContent);

            // Convert gold & amount strings to numbers
            const gold = parseInt(goldText, 10);
            amount = parseInt(amount, 10);

            // Click on 'Guild' tab
            await page.click("#menu > li:nth-child(3) > a");
            await page.click("#menu > li:nth-child(3) > a");

            // wait 1.5 sec
            await delayMillisec(1500);

            // check if 'guild content' exists
            const guildMember = await page.$('.guildright');

            // checks if there's enough gold to be donated
            if (gold >= amount && guildMember) {

                // wait for 'guild content' to appear
                await page.waitForSelector('.guildright', { visible: true, timeout: 3000 });

                // Convert amount from int to string
                amount = amount.toString();

                // wait for donate input to appear
                await page.waitForSelector('#donate_currency', { visible: true, timeout: 3000 });

                // Insert the amount of gold to donate
                await page.type("#donate_currency", amount, { delay: 50 });

                // Click to donate
                await page.click("#inner > div > div.guildright > div:nth-child(3) > div > a");

                // Increase the overall donated gold
                donateStats.donatedGold += parseInt(amount, 10);

                // wait 1 sec after donating
                await delayMillisec(1000);
            } else if (!guildMember) {
                throw new Error('Check if you belong to a guild!\n');
            }
        }
    } catch (error) {
        console.error(`Error during donateGold phase: ${error}`);
    }
}
