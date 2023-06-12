import './RetroQuest.scss';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import React from "react";
import Asteroids from "./asteroids/Asteroids";
import Cryptoland from "./cryptoland/Cryptoland";
import EvilCorporation from "./evilcorp/EvilCorporation";
import Poster from "./poster/Poster";
import Final from "./final/Final";

function addSpace(str) {
    return str.split('').join(' ');
}

const VaporwaveText = ({ text, className }) => {
    const vaporwaveText = addSpace(text)
    return (
        <span className={className}>
            {vaporwaveText}
        </span>
    );
};

function RetroButton() {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/asteroids');
    }

    return (
        <button className="retro-button" onClick={handleClick}>START</button>
    );
}

function Main() {
    return (
        <div className="retro-background">
        <div className="App">
            <header className="App-header">
                <VaporwaveText text="RETRO" className = "vapor-header"/>
                <br/>
                <VaporwaveText text="QUEST" className = "vapor-subheader"/>
                <RetroButton/>
            </header>
            <div className="ncfu-pixel-img"/>
        </div>
        </div>
    );
}

function RetroQuest() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/asteroids" element={<Asteroids/>} />
            <Route path="/cryptoland" element={<Cryptoland/>} />
            <Route path="/evilcorp" element={<EvilCorporation/>} />
            <Route path="/poster" element={<Poster/>} />
            <Route path="/final" element={<Final/>} />
            <Route exact path="/" index element={ <Main /> }>
            </Route>
        </Routes>

      </BrowserRouter>
  );
}

export default RetroQuest;
