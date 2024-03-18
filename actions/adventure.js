import { donateGold } from './donateGold.js';


export let stats = {
    // Define variables for minTime & maxExp.
    minTime: Infinity,
    maxExperience: -Infinity,

    // Define variables to store the max. efficiency & index
    maxEfficiency: -Infinity,
    selectedAdventureIndex: -1
};

// fct to perform adventures
export async function adventure(page, answer, amount) {
    try {
        // Click twice on the "Adventure" menu
        await page.click(".menu > li:nth-child(7) > a");
        await page.click(".menu > li:nth-child(7) > a");

        // Wait for adventure options to be available
        await page.waitForSelector(".adventuremenu.adventures", { timeout: 3000, visible: true });

        // Get all adventure options
        const adventureOptions = await page.$$("ul li a[rel]");

        // Loop through adventure options to find the one with the maximum efficiency
        for (let i = 0; i < adventureOptions.length; i++) {
            // Click on the adventure option to reveal time and experience values
            await adventureOptions[i].click();

            // Wait for the time and experience elements to appear
            await page.waitForSelector(".adv_time", { timeout: 3000, visible: true });
            await page.waitForSelector(".adv_reward", { timeout: 3000, visible: true });

            // Select time and experience elements
            const timeElement = await page.$(".adv_time");
            const experienceElement = await page.$(".adv_reward");

            // Extract time's text & experience's text
            const timeText = await timeElement.evaluate((element) => element.textContent);
            const experienceText = await experienceElement.evaluate((element) => element.textContent);

            // Extract only the numerical values using regular expressions
            const timeMatch = timeText.match(/\d+/); // Extract only numerical values
            const experienceMatch = experienceText.match(/\d+/);

            // Convert the matched strings to numbers
            const time = parseInt(timeMatch, 10);
            const experience = parseInt(experienceMatch, 10);

            // Calculate efficiency: experience gained per minute
            const efficiency = experience / time;

            // Update maxEfficiency, minTime, maxExperience and 
            // selectedAdventureIndex if the current adventure is more efficient
            if (efficiency > stats.maxEfficiency) {
                stats.maxEfficiency = efficiency;
                stats.minTime = time;
                stats.maxExperience = experience;
                stats.selectedAdventureIndex = i;
            }
        }
        // Click on the adventure with the maximum efficiency
        if (stats.selectedAdventureIndex !== -1) {
            await adventureOptions[stats.selectedAdventureIndex].click();
            await page.click(".submit");
        }
    } catch (error) {
        console.error(`\nError during adventure phase: ${error}\n`);
    } finally {
        // call fct
        await donateGold(page, answer, amount);
    }
}