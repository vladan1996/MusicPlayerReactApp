import React from "react";

const LibrarySong = ({
  song,
  setCurretntSong,
  audioRef,
  isPlaying,
  id,
  setSongs,
  songs
}) => {
  //Song Handler izabiramo pjesmu
  const songSelectHandler = async () => {
    await setCurretntSong(song);

    //Add  active state, active:false or true u nizu
    const newSongs = songs.map(song => {
      if (song.id === id) {
        return {
          ...song,
          active: true
        };
      } else {
        return {
          ...song,
          active: false
        };
      }
    });
    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
    //Provjera ako je play aktivno
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};
export default LibrarySong;
