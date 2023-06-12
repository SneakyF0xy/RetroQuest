import './Task.scss';
import PixelForm from "./form/PixelForm";
import React, {useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";

const Task = (props) => {
    const handleButtonClickRef = React.useRef({})
    const location = useLocation();
    const [_, forceUpdate] = React.useState(false);
    const [taskPassed, setTaskPassed] = React.useState(false);
    const [redirect, setRedirect] = React.useState({});
    const task = location.pathname.replace('/', '')

    React.useEffect(() => {
        forceUpdate(true);
        fetch('/api/check-task-pass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        })
            .then(response => response.json())
            .then(data => {
                setTaskPassed(data.pass);
                setRedirect(data.redirect);
            });
    }, [handleButtonClickRef.current.handleButtonClick]);

    const renderChildren = () => {
        return React.Children.map(props.children, (child) => {
            return React.cloneElement(child, {
                handleButtonClickRef: handleButtonClickRef,
                taskPassed: taskPassed
            });
        });
    };

    return (
        <div className={props.background_style}>
            <div className="task">
                <header className="task-header">
                    <PixelForm title={props.title}
                               category={props.category}
                               text={props.text}
                               handleButtonClickRef={handleButtonClickRef}
                               hyperLink={props.hyperLink}
                               instant={taskPassed}
                               redirect={redirect}
                    />
                    { renderChildren() }
                </header>
            </div>
        </div>
    );
}

export const DisappearButton = (props) => {
    const buttonRef = useRef();

    useEffect(() => {
    }, []);

    function handleDisappearButtonClick() {
        props.handleButtonClickRef.current.handleButtonClick();
        buttonRef.current.classList.add('disappear');
    }

    return (
        !props.taskPassed &&
        <button ref={buttonRef} className={props.button_style} onClick={handleDisappearButtonClick}>
            {props.button_text}
        </button>
    );
}

export default Task;