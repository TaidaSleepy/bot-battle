import React from "react";
import BotCard from "./BotCard";
import "./BotCollection.css";

function BotCollection({ bots = [], onEnlist }) {
  return (
    <section>
      <h2>Bot Collection</h2>
      <div className="bot-collection">
        {bots.length === 0 ? (
          <div className="empty">No bots available.</div>
        ) : (
          bots.map((bot) => (
            <BotCard
              key={bot.id}
              bot={bot}
              onCardClick={onEnlist}       // clicking a card in collection enlists it
              showDischarge={false}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default BotCollection;