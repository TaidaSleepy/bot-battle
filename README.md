# bot-battle
# Bot Battlr

This is a React app where you can browse bots, build your own little army, and permanently discharge bots from a simple local backend. 

What you can do
- Browse a collection of bots.
- Click a bot in the collection to enlist it into "Your Bot Army".
- Click a bot in your army to release it (remove it from the army only).
- Click the Discharge button on an army card to permanently delete that bot from the local backend (json-server).

Setup 
1. Clone the repo 
   git clone https://github.com/TaidaSleepy/bot-battle.git
   cd bot-battle

2. Install dependencies:
   npm install

3. Start the local backend (json-server):
   npx json-server --watch db.json --port 8001

4. Start the React app:
   npm start
   Then open http://localhost:3000 in your browser.

