import React, { useEffect, useState } from "react";
import BotCollection from "./components/BotCollection";
import YourBotArmy from "./components/YourBotArmy";
import "./App.css";

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [dischargingId, setDischargingId] = useState(null);

  // Load bots on mount
  useEffect(() => {
    const url = "http://localhost:8001/bots";
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`GET ${url} returned ${r.status}`);
        return r.json();
      })
      .then((data) => setBots(data))
      .catch((err) => {
        console.error("Failed to fetch bots:", err);
        alert("Failed to load bots. Check json-server and port.");
      });
  }, []);

  // Enlist a bot into the army
  function handleEnlist(bot) {
    if (!army.find((b) => b.id === bot.id)) {
      setArmy((prev) => [...prev, bot]);
    }
  }

  // Clicking the card in the army releases/removes it from the army (frontend only)
  function handleRelease(bot) {
    setArmy((prev) => prev.filter((b) => b.id !== bot.id));
  }

  // Discharge: DELETE from backend AND remove from both lists 
  async function handleDischarge(bot) {
    if (!bot || !bot.id) return;
    const ok = window.confirm(`Discharge ${bot.name} permanently? This will remove it from the backend.`);
    if (!ok) return;

    const url = `http://localhost:8001/bots/${bot.id}`;
    setDischargingId(bot.id);

    try {
      const res = await fetch(url, { method: "DELETE" });
      console.log("DELETE", url, "->", res.status);
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Server rejected DELETE: ${res.status} ${res.statusText}. Body: ${text}`);
      }

      // Remove from both bots and army lists
      setBots((prev) => prev.filter((b) => b.id !== bot.id));
      setArmy((prev) => prev.filter((b) => b.id !== bot.id));
    } catch (err) {
      console.error("Failed to discharge bot:", err);
      alert(`Could not discharge bot. See console for details.`);
    } finally {
      setDischargingId(null);
    }
  }

  return (
    <div className="App container">
      <header className="header">
        <div className="title">
          <h1>Bot Battlr</h1>
          <p>Click a bot in the collection to enlist. Click a bot in your army to release it. Use Discharge to remove a bot from the backend.</p>
        </div>
      </header>

      <main>
        <YourBotArmy
          army={army}
          onRelease={handleRelease}        // card click in army -release from army
          onDischarge={handleDischarge}    // discharge -delete from backend & remove from lists
          dischargingId={dischargingId}
        />

        <BotCollection
          bots={bots}
          onEnlist={handleEnlist}          // card click in collection enlist to army
        />
      </main>
    </div>
  );
}

export default App;