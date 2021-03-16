import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurretntSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library " : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(song => (
          <LibrarySong
            song={song}
            setCurretntSong={setCurretntSong}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            id={song.id}
            setSongs={setSongs}
            songs={songs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
