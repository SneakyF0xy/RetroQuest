const express = require('express');
const path = require("path");
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());

const answers = {
    'asteroids': 'Танэгасима',
    'cryptoland': 'Tokyo City',
    'evilcorp': 'Tears in rain',
    'poster': 'R()b()Ts /|re /|L1v3'
}

app.post('/api/check-answer', (req, res) => {
    const task = req.body.task;
    const answer = req.body.answer;
    const isCorrect = answers[task] === answer;
    if (isCorrect) {
      let cookie_options = {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        httpOnly: true
      }

      res.cookie(task, btoa(unescape(encodeURIComponent(answer))), cookie_options)
    }
    res.json({ isCorrect });
});

const checkTaskPass = (task, req) => {
    let pass = false
    if (req.cookies[task]) {
        const answer = answers[task];
        const basedAnswer = btoa(unescape(encodeURIComponent(answer)))
        pass = basedAnswer === req.cookies[task]
    }
    return pass
}

const getRedirect = (task) => {
    const answers_keys = Object.keys(answers)
    const next_task_index = answers_keys.indexOf(task) + 1;
    return next_task_index < answers_keys.length ? answers_keys[next_task_index] : 'final'
}

app.post('/api/check-task-pass', (req, res) => {
    const task = req.body.task;
    const pass = checkTaskPass(task, req);
    const redirect = getRedirect(task)
    res.json({ pass, redirect });
});

app.get('/api/final', function(req, res) {
    const answers_keys = Object.keys(answers)
    let tasksPassed = false
    answers_keys.forEach(key => {
        tasksPassed = checkTaskPass(key, req);
    })

    if (!tasksPassed) {
        res.status(400).send({
            message: 'Ты не собрал все флаги, грязный хакер!'
        });
    }
    res.sendFile('index.html', {root: path.join(__dirname, '../../build/')});
});

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', function(req, res) {
    if (process.env.NODE_ENV === 'production') {
        res.sendFile('index.html', {root: path.join(__dirname, '../../build/')});
    } else {
        //res.sendFile('index.html', {root: path.join(__dirname, '../public/')});
    }
});

//app.listen(80);

module.exports = app;
