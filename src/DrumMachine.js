import React, { useEffect, useState, useCallback } from "react";

const drumPads = [
  { key: "Q", sound: "Heater 1", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", sound: "Heater 2", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", sound: "Heater 3", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", sound: "Heater 4", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", sound: "Clap", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "D", sound: "Open-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "Z", sound: "Kick-n'-Hat", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", sound: "Kick", src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", sound: "Closed-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
];

const DrumMachine = () => {
  const [display, setDisplay] = useState("Press a key");

  const playSound = (key, sound) => {
    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setDisplay(sound);
    }
  };

  // Wrap handleKeyPress in useCallback to prevent unnecessary re-creation
  const handleKeyPress = useCallback((event) => {
    const pad = drumPads.find(pad => pad.key === event.key.toUpperCase());
    if (pad) playSound(pad.key, pad.sound);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]); // ✅ Now properly includes handleKeyPress

  return (
    <div id="drum-machine" className="container text-center mt-5 p-4 border rounded shadow bg-dark text-light">
      <h2>Drum Machine</h2>
      <div id="display" className="display-box my-3 p-3 border rounded">{display}</div>
      <div className="row">
        {drumPads.map((pad) => (
          <div key={pad.key} className="col-4 mb-3">
            <button 
              className="drum-pad btn btn-primary w-100 p-3" 
              id={pad.sound} 
              onClick={() => playSound(pad.key, pad.sound)}>
              {pad.key}
              <audio className="clip" id={pad.key} src={pad.src}></audio>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;
