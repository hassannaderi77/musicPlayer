import { useState } from "react";
import tracks from "./data/db";
import ControlPanel from "./components/ControlPanel";

function Music() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <div className="w-full mx-auto px-8 py-8 flex flex-col space-y-6 bg-stone-100">
      {tracks.map((track, index) => (
        <div
          key={track.id}
          className={`cursor-pointer flex items-center gap-6 text-stone-900 rounded-xl shadow-md p-6 min-h-[100px] transition duration-200 w-full
            ${
              currentIndex === index
                ? "bg-yellow-100 hover:bg-yellow-200"
                : "hover:bg-stone-200"
            }
          `}
          onClick={() => setCurrentIndex(index)}
        >
          <img
            className="rounded-full w-20 h-20 object-cover"
            src={track.cover}
            alt={track.nameTrack}
          />
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">{track.nameTrack}</h3>
            <p className="text-sm text-stone-600">{track.Artist}</p>
          </div>
        </div>
      ))}

      {/* کنترل پنل */}
      <ControlPanel
        track={tracks[currentIndex]}
        nextTrack={nextTrack}
        prevTrack={prevTrack}
      />
    </div>
  );
}

export default Music;
