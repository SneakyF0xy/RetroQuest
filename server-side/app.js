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

      res.cookie(task, Buffer.from(answer).toString('base64'), cookie_options)
    }
    res.json({ isCorrect });
});

const checkTaskPass = (task, req) => {
    let pass = false
    if (req.cookies[task]) {
        const answer = answers[task];
        const basedAnswer = Buffer.from(answer).toString('base64')
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

app.get('/final', function(req, res) {
    const answers_keys = Object.keys(answers)
    const tasksPassed = answers_keys.every(key => checkTaskPass(key, req));

    if (!tasksPassed) {
        res.status(400).send({
            message: 'Ты не собрал все флаги, грязный хакер!'
        });
    }
    res.sendFile('index.html', {root: path.join(__dirname, '../build')});
});

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '../build')});
});

//app.listen(80);

module.exports = app;
