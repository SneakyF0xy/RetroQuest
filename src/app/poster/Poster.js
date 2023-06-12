import Task, {DisappearButton} from "../Task";
import './Poster.scss';

function Poster() {
    const hyperLink = (
        <a className={"poster-hyperlink"} href="./poster.html">POSTER</a>
    );
    return (
        <Task background_style={"poster-background"}
              title={'Poster'}
              category={"stego"}
              text={'В закаулках города N вы нашли плакат, который, как вы подозреваете, содержит скрытую информацию. ' +
              'Ваш друг сказал, что нужно его оцифровать и прочитать, как книгу. ' +
              'Другой друг посоветовал воспользоваться помощью робота Aperi по кличке Solve.'
              }
              hyperLink={hyperLink}
        >
            <DisappearButton button_style={"poster-button"} button_text={"PRESS ME"}/>
        </Task>
    );
}

export default Poster;