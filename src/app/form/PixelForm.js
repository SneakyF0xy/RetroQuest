import './PixelForm.scss'
import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const PixelExpandedContainer = ({ isAnswerCorrect, redirect }) => {
    const navigate = useNavigate();
    function handleNextLevelClick() {

        navigate(`/${redirect}`);
    }

    return (
        isAnswerCorrect !== null && (
            isAnswerCorrect ? (
                <button onClick={handleNextLevelClick}
                        className="pixel-button-next-level">NEXT LEVEL <span className="exclamation-mark">!</span></button>
            ) : (
                <p className={"pixel-text-wrong"}>НЕВЕРНО</p>
            )
        )
    );
}

const PixelContainer = ({ text, hyperLink, instant, redirect }) => {
    const [answer, setAnswer] = useState('');
    const [isAnswerCorrect, setAnswerCorrect] = useState(null);
    const location = useLocation();

    function handleAnswerChange(event) {
        setAnswer(event.target.value);
    }

    function handleFormSubmit() {
        // Отправка ответа на сервер для проверки
        const task = location.pathname.replace('/', '')
        fetch('/api/check-answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task, answer })
        })
            .then(response => response.json())
            .then(data => {
                setAnswerCorrect(data.isCorrect);
            });
    }

    return (
        <div className={"pixel-container"}>
            <p id={"pixel-text"} className="pixel-text">{text}</p>
            {hyperLink}
            <input className="pixel-input"
                   type="text"
                   value={answer}
                   onChange={handleAnswerChange}
            />
            <button className="pixel-check-button" onClick={handleFormSubmit}>ПРОВЕРИТЬ</button>
            <PixelExpandedContainer isAnswerCorrect={instant ? instant : isAnswerCorrect} redirect={redirect}/>
        </div>
    );
}

const PixelForm = ({ title, category, text, handleButtonClickRef, hyperLink, instant, redirect }) => {
    const [isFormVisible, setFormVisible] = useState(false);

    function handleButtonClick() {
        setFormVisible(true);
    }

    useEffect(() => {
        handleButtonClickRef.current.handleButtonClick = handleButtonClick;
    }, [handleButtonClick]);

    return (
        <>
            {(isFormVisible || instant) && (
                <div className={`pixel-form-box`}>
                    <p className="pixel-title">{title}</p>
                    <p className="pixel-category">{category}</p>
                    <PixelContainer text={text} hyperLink={hyperLink} instant={instant} redirect={redirect}/>
                </div>
            )}
        </>
    );
}

PixelForm.defaultProps = {
    handleButtonClickRef: {current: {}}
}

export default PixelForm;
