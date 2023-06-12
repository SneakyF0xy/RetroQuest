import Task, {DisappearButton} from "../Task";
import './Cryptoland.scss';

function Cryptoland() {
    return (
        <Task background_style={"crypto-background"}
              title={'CRYPTOLAND'}
              category={"crypto"}
              text={'В криптогороде ищут робота по кличке BASE. Говорят, что он украл 64 батарейки. Помоги расшифровать место, где он спрятался.\n' +
              'VG9reW8gQ2l0eQ=='}
        >
            <DisappearButton button_style={"crypto-button"} button_text={"PRESS ME"}/>
        </Task>
    );
}

export default Cryptoland;