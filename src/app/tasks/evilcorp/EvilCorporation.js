import './EvilCorporation.scss';
import Task, { DisappearButton } from "../../Task";
import React, { Component }  from 'react';


function EvilCorporation() {
    return (
        <Task background_style={"evil-corp-background"}
              title={'EvilCorporation'}
              category={"web"}
              text={'Вы - хакер из будущего, который пытается раскрыть тайны корпорации, скрывающейся за яркими неоновыми вывесками. ' +
              'Чтобы получить доступ к самой важной информации, вам нужно найти сообщение, которое скрыто где-то здесь.'}
        >
            <DisappearButton button_style={"evil-corp-button"} button_text={"PRESS ME"}/>
            <div dangerouslySetInnerHTML={{ __html: `<!-- SECRET MESSAGE: Tears in rain -->` }}/>
        </Task>
    );
}

export default EvilCorporation;
