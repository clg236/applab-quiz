'use strict';

const admin = require('firebase-admin');
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// init app first
admin.initializeApp();

// set up emails
const config = functions.config();
const gmailEmail = config.gmail ? config.gmail.email : "";
const gmailPassword = config.gmail ? config.gmail.password : "";

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

const APP_NAME = 'App Lab 2.0';

exports.sendCommentNotificationEmail = functions.database.ref(`/comments/{id}`).onCreate((snapshot) => {
    const comment = snapshot.val();
    const uid = comment.user.uid;
    const submissionID = comment.submissionID;

    return new Promise((resolve, reject) => {
        if (!uid || !submissionID) {
            resolve();
            return;
        }

        getSubmission(submissionID).then(snapshot => {
            if (!snapshot || !snapshot.exists()) {
                console.log(`Couldn't find submission with id: ${submissionID}`);
                resolve();
                return;
            }

            const submission = snapshot.val();
            const submissionUID = submission.user.uid;

            getUser(submissionUID).then(snapshot => {
                if (!snapshot || !snapshot.exists()) {
                    console.log(`Couldn't find user with id: ${submissionUID}`);
                    resolve();
                    return;
                }

                if (uid === submissionUID) {
                    console.log("Submission user is the same as comment user.");
                    resolve();
                    return;
                }

                const submissionUser = snapshot.val();

                if (!submissionUser.email) {
                    console.log("Submission user doesn't have an email.");
                    resolve();
                    return;
                }

                sendCommentEmail(submissionUser, comment)
                    .then(_ => resolve())
                    .catch(err => reject(err));
            })
        });
    });
});

async function getSubmission(submissionID) {
    return await admin.database().ref(`/submissions/${submissionID}`).once("value");
}

async function getUser(uid) {
    return await admin.database().ref(`/users/${uid}`).once("value");
}

// Sends a email to the given user.
async function sendCommentEmail(recipient, comment) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: recipient.email,
    };

    const type = comment.subject && comment.subject.type ? comment.subject.type : 'quiz';

    // The user subscribed to the newsletter.
    mailOptions.subject = `${comment.user.displayName} has commented on your ${type}!`;
    mailOptions.html = `Hey ${recipient.displayName || ''}!<br /> Please log into <a href="http://applab-quiz-system.firebaseapp.com">App Lab 2.0</a> to see details.`;

    await mailTransport.sendMail(mailOptions);

    return null;
}
