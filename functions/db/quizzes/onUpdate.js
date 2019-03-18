'use strict';

const admin = require('firebase-admin');
const functions = require('firebase-functions');

exports.migrateQuestions = functions.database.ref(`/quizzes/{id}`).onUpdate((change) => {
    return new Promise((resolve, reject) => {
        const snapshot = change.after;
        const quiz = snapshot.val();
        const questions = quiz.questions;

        if (!questions || !questions.hasOwnProperty("length")) {
            resolve();
            return;
        }

        let updates = questions.map(question => {
            const newQuestion = Object.assign({}, question);
            delete newQuestion.id;

            return admin.database().ref(`/questions/${question.id}`).set(newQuestion);
        });

        let questionIDs = {};
        questions.forEach(question => {
            questionIDs[question.id] = true;
        });

        updates.push(snapshot.ref.child("questions").set(questionIDs));

        Promise.all(updates).then(values => {
            resolve();
        }).catch(_ => reject());
    });
});

