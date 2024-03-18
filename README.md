# automation-main-bot

This project is an *automation bot* for a browser game.

It was built using *Puppeteer / JavaScript / Node.js*

*The bot is started from Terminal / PowerShell and performs multiple tasks, such as:*
1. asks the user for username & password
2. asks for the number of adventures / enemy's name / headless mode(true/false)
3. asks to donate(true/false) -> if yes -> amount to donate
4. closes the readLine interface
   
*Based on the data collected it does the following steps:*
1. opens chrome & new page
2. logs in the player
3. checks if the loggin was successful, if not -> it has 2 more attempts to re log in
4. clicks on Battle menu, checks if battle is on, if off -> fights a player chosen by the user
5. clicks on Adventure menu, collects data from 5 different adventures, compares them and chooses the most efficient one based on experience / time
6. clicks on Guild menu, checks if the player has enough gold & if he's a member of a guild, if yes -> donates the amount of gold chosen by the user
7. logs out the player
8. closes the browser instance
9. waits for adventure's time to finish (doesn't wait for the last adventure)
10. repeats the whole cycle again based on the number of adventures chosen by the user
11. displays in Terminal the following data:
   - no. of adventure
   - adventure's time
   - adventure's experience
   - max. efficiency of the adventure(exp / gold)
   - no. of battle
   - overall donated gold

The bot catches 8 errors related to the written code, from which:
   - handles 5 major ones
   - the rest of 3 are not disrupting the process of the bot and they can/may be fixed automatically in the next process
 
   *Here's a Print Screen of the bot in action:*
 ![image](https://github.com/BenThink/automation-main-bot/assets/28758782/6b5a2781-a429-45fd-b15b-8dc2a7f1afb8)
