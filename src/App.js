import React, { useState, useRef } from "react";
//Dodavanje scss-a
import "./styles/app.scss";
//Dodavanje komponenti
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//Dodavanje podataka i informacija o pjesmi
import data from "./data";

function App() {
  //Ref dodaje se gore u react import kao referenca ka audio
  const audioRef = useRef(null);

  //Time Hendler
  const timeUpdateHandler = e => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //kalkulator procenata za slider
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercantage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercantage: animationPercantage
    });
  };

  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurretntSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercantage: 0
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id);
    await setCurretntSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setCurretntSong={setCurretntSong}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurretntSong={setCurretntSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
