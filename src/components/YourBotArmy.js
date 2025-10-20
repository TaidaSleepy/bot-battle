import React from "react";
import BotCard from "./BotCard";
import "./YourBotArmy.css";

function YourBotArmy({ army = [], onRelease, onDischarge, dischargingId = null }) {
  return (
    <section>
      <h2>Your Bot Army</h2>
      <div className="your-bot-army">
        {army.length === 0 ? (
          <p className="empty">No bots in your army. Click a bot from the collection to enlist!</p>
        ) : (
          army.map((bot) => (
            <div className="army-item" key={bot.id}>
              <BotCard
                bot={bot}
                onCardClick={onRelease}            // clicking the card in army releases it from army
                onDischarge={onDischarge}          // clicking Discharge will DELETE backend & remove from lists
                showDischarge={true}
                discharging={dischargingId === bot.id}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default YourBotArmy;