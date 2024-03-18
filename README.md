# automation-main-bot

This project is an *automation bot* for a browser game.

It was built using *Puppeteer / JavaScript / Node.js*

Logic-Flow: main.js -> mainControl.js -> startBotActions.js -> logIn.js -> attack.js -> adventure.js -> donateGold.js

*The bot is started from Terminal / PowerShell and performs multiple tasks, such as:*
1. asks the user for username & password
2. asks for the number of adventures / enemy's name / headless mode(true/false)
3. asks to donate(true/false) -> if yes -> amount to donate
4. checks data to be correct entered, if not -> user has 2 more attempts to enter, if still wrong -> stops execution
5. closes the readLine interface
   
*Based on the data collected it does the following steps:*
1. opens chrome & new page
2. logs in the player
3. checks if the loggin was successful, if not -> it has 2 more attempts to re-log in, if still fails -> stops execution
4. clicks on Battle menu, checks if battle is on, if off -> checks if enemy's name is correct, if yes -> fights a player chosen by the user, if not -> displays an error and continues with next step
5. clicks on Adventure menu, collects data from 5 different adventures, compares them and chooses the most efficient one based on experience / time, if it fails -> displays an error and continues with next step
6. clicks on Guild menu, checks if the player has enough gold & if is a member of a guild, if yes -> donates the amount of gold chosen by the user, if not -> displays an error and continues with next step 
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

The bot catches 10 errors, from which:
   - handles 5 major errors
   - the rest of 5 medium errors are not disrupting the process of the bot and they can be fixed automatically or manually in the next process

 
   *Here's a Print Screen of the bot in action:*
 ![image](https://github.com/BenThink/automation-main-bot/assets/28758782/51799d84-3f5f-47f1-b73b-fe30f31a43e2)


