import './Final.scss';
import React from "react";

function FinalForm() {
    return (
        <div className="final-form-box">
            <p>
                Поздравляем с прохождением квеста!🐈
                <br/>
                Забери свой бесплатный сертификат у этого человека:
                <a href="https://vk.com/linum1337" target="_blank">
                    Влад
                </a>
            </p>
        </div>
    );
}

function Final() {
    return (
        <div className="final-background">
            <div className="final">
                <header className="final-header">
                    <FinalForm/>
                </header>
            </div>
        </div>
    );
}

export default Final;