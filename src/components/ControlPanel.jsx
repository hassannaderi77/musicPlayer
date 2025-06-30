import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";


function ControlPanel({ track, nextTrack, prevTrack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef();

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [track]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration || 0);
    setProgress(
      (audioRef.current.currentTime / (audioRef.current.duration || 1)) * 100
    );
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  }

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-full bg-stone-800 text-white p-6 shadow-lg opacity-90 flex flex-row-reverse justify-center gap-x-12 items-center">
      <div>
        <img
          className={`w-40 rounded-full ${isPlaying && "charkhesh"}`}
          src={track.cover}
          alt={track.nameTrack}
        />
      </div>

      <div className="flex flex-col items-center gap-4 w-full max-w-md relative">
        <h3 className="text-lg font-bold">{track.nameTrack}</h3>
        <p className="text-sm text-stone-300">{track.Artist}</p>

        <audio
          ref={audioRef}
          src={track.srcMusic}
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={nextTrack}
        />

        <div className="flex items-center gap-6 text-xl mt-2">
          <button
            onClick={prevTrack}
            className="hover:text-yellow-400"
            title="Previous"
          >
            <FaBackward />
          </button>

          <button
            onClick={togglePlay}
            className="bg-yellow-400 text-black px-4 py-2 rounded-full shadow hover:bg-yellow-300 transition"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button
            onClick={nextTrack}
            className="hover:text-yellow-400"
            title="Next"
          >
            <FaForward />
          </button>
        </div>

        <div className="w-full">
          <div
            className="w-full bg-stone-600 h-2 rounded mt-4 overflow-hidden cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <div
              className="bg-yellow-400 h-full absolute top-0 left-0 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-stone-300 mt-1 px-1 select-none">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 w-48 rotate-270 md:rotate-0 lg:absolute left-20">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full accent-yellow-400"
        />
      </div>
    </div>
  );
}

export default ControlPanel;
