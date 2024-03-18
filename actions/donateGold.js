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

            // check if 'guild content' exists
            const guildMember = await page.$('.guildright');

            // checks if there's enough gold to be donated
            if (gold >= amount && guildMember) {

                // wait for 'guild content' to appear
                await page.waitForSelector('.guildright', { visible: true, timeout: 3000 });

                // Convert amount from int to string
                amount = amount.toString();

                // Insert the amount of gold to donate
                await page.type("#donate_currency", amount, { delay: 50 });

                // Click to donate
                await page.click("#inner > div > div.guildright > div:nth-child(3) > div > a");

                // Increase the overall donated gold
                donateStats.donatedGold += parseInt(amount, 10);
            }
        }
    } catch (error) {
        console.error(`\nError during donateGold phase: ${error}\n`);
    }
}