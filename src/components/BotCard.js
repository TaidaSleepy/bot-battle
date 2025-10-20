import React from "react";
import "./BotCard.css";

/*
 Props:
  - bot id
  - onCardClick(bot) is called when the card is clicked
  - onDischarge(bot) is called when Discharge button is clicked
*/
function BotCard({ bot, onCardClick, onDischarge, showDischarge = false, discharging = false }) {
  return (
    <div
      className="bot-card"
      role="button"
      tabIndex={0}
      onClick={() => onCardClick && onCardClick(bot)}
      onKeyDown={(e) => { if (e.key === "Enter" && onCardClick) onCardClick(bot); }}
      data-testid={`bot-card-${bot.id}`}
    >
      <img className="bot-avatar" src={bot.avatar_url} alt={bot.name} />

      <div className="bot-meta">
        <h3 className="bot-name">{bot.name}</h3>
        <p className="catchphrase">{bot.catchphrase}</p>

        <div className="stats" aria-hidden="true">
          <span className="stat">❤️ {bot.health}</span>
          <span className="stat">⚔️ {bot.damage}</span>
          <span className="stat">🛡️ {bot.armor}</span>
        </div>

        <div className="bot-class">{bot.bot_class}</div>
      </div>

      {/* Discharge button */}
      {showDischarge && (
        <button
          type="button"
          className="discharge-btn"
          data-testid={`discharge-btn-${bot.id}`}
          title={`Discharge ${bot.name}`}
          aria-label={`Discharge ${bot.name}`}
          onClick={(e) => {
            e.stopPropagation(); // prevent card click from firing
            if (onDischarge) onDischarge(bot);
          }}
          disabled={discharging}
        >
          {discharging ? "…" : "Discharge"}
        </button>
      )}
    </div>
  );
}

export default BotCard;