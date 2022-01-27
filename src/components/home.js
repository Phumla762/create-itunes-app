import React from 'react';
import './App.css';


function Home() {
  return(
    <div className="home-container">
    <h3> GET</h3>
    <div className="home-wrap">
    <h2>Music</h2>
    <img
        src="./music.jpg"
        alt="music"
        width="50%"
        height="280"
        className="img"
        />
    </div>
    <br />
    <div className="home-wrap">
    <h2>Videos</h2>
    <img
        src="./video.jpg"
        alt="video"
        width="50%"
        height="310"
        className="img"
        />
        </div>
        <br/>
        <div className="home-wrap">
    <h2>Movies</h2>
    <img
        src="./movie.jpg"
        alt="movie"
        width="50%"
        height="310"
        className="img"
        />
        </div>
        <br />
        <div className="home-wrap">
        <h2>audiobooks</h2>
        <img
        src="./audio-book.jpg"
        alt="audio"
        width="50%"
        height="310"
        className="img"
        />
        </div>
    </div>
  ) 
}

export default Home;
