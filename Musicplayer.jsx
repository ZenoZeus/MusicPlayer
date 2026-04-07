import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward,faForward,faPlay,faPause , faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import ElectricBorder from '../effects/ElectricBorder'




const Musicplayer = () => {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMute, setIsMute] = useState(false)

  // ✅ Load metadata (duration)
  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

  return (
    <>
  <div className="bg-black">
    <ElectricBorder
  color="#7df9ff"
  speed={1}
  chaos={0.3}
  thickness={4}
  style={{ borderRadius: 16 }}
>
  
    <p style={{  opacity: 1 }}>
  <div className=" m-auto  w-140 bg-gradient-to-r from-green-400 to-blue-300 flex flex-col justify-center items-center rounded-xl">
        <div className="bg-zinc-400 p-4 rounded-full flex flex-col items-center justify-center"> 
          <motion.div
          initial={false}
          animate={{ rotate: isPlaying && [0, 90, 180, 270, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="bg-zinc-500 flex justify-center items-center rounded-full w-64 h-64"
        >
          <div className="rounded-full w-54 h-54 bg-zinc-500">
          <div className="rounded-full w-54 h-54   bg-zinc-600">
             <motion.img src="/jump.png" alt="" className="w-64 h-54 rounded-full"  />
          </div>
          </div>
        </motion.div>
        </div>
        <div className="p-4 text-white bg-black w-fit rounded-xl ml-8 p-18 flex justify-center items-center flex-col">
          {/* Audio */}
          <audio src="/Jump.mp3" ref={audioRef}></audio>

          {/* Controls */}
          <div className="flex gap-10 mt-2 items-center justify-center">
            <button className="rounded-full bg-zinc-600 p-4 hover:bg-zinc-400"><FontAwesomeIcon icon={faBackward} /></button>

            <button
              onClick={() => {
                if (!audioRef.current) return;

                if (isPlaying) {
                  audioRef.current.pause();
                } else {
                  audioRef.current.play();
                }

                setIsPlaying(!isPlaying);
              }}
            className="rounded-full bg-zinc-600 p-4 hover:bg-zinc-400">
              {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
            </button>

            <button className="rounded-full bg-zinc-600 p-4 hover:bg-zinc-400"><FontAwesomeIcon icon={faForward} /></button>
          </div>

          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              if (!audioRef.current) return;
              audioRef.current.currentTime = e.target.value;
            }}
            className="w-64 mt-4 bg-zinc-700 rounded-lg  cursor-pointer 
        accent-yellow-500 hover:accent-green-400"
          />

          {/* Time */}
          <div className="text-sm mt-1">
            {Math.floor(currentTime/60)}:{Math.floor(currentTime%60)} / {Math.floor(duration/60)}:{Math.floor(duration%60)} sec
          </div>

          {/* Volume */}
          <div className="flex justify-center items-center gap-3 p-3">
            <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            onChange={(e) => {
              if (!audioRef.current) return;
              audioRef.current.volume = e.target.value;
            }}
            className="w-32 mt-2 accent-green-500"
          />
          <FontAwesomeIcon icon={faVolumeXmark} onClick={()=>{
            const vol = (isMute) ?0:0.2;
            audioRef.current.volume= vol
            setIsMute(!isMute);
          }} className={(isMute)?"rounded-full bg-zinc-600 p-4 hover:bg-zinc-400":"bg-red-500 p-4 rounded-full"}/>
          </div>
        </div>
      </div>
    </p>

</ElectricBorder>
      </div>
     
    </>
  );
};

export default Musicplayer;
