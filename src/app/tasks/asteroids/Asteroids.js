import Task from "../../Task";
import './Asteroids.css';

function GameMachineButton(props) {
    return (
        <button className="invisible-button" onClick={props.handleButtonClickRef.current.handleButtonClick} />
    );
}

function Asteroids() {
    return (
        <Task background_style={"asteroids-background"}
              title={'Задание с астероидами'}
              category={"osint"}
              text={'Откуда JAXA запустила исследователь астероидов в 2014?'}
        >
            <GameMachineButton/>
        </Task>
    );
}

export default Asteroids;
