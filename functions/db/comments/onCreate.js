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

const instructors = ['lx5@nyu.edu', 'clg236@nyu.edu', 'lke229@nyu.edu', 'yh1437@nyu.edu'];

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

                /** allow emails to be sent to instructors
                if (uid === submissionUID) {
                    console.log("Submission user is the same as comment user.");
                    resolve();
                    return;
                }
                 */

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
async function sendCommentEmail(submissionUser, comment) {
    const recipient = submissionUser.email == comment.user.email ? instructors : submissionUser.email;
    const cc = submissionUser.email == comment.user.email ? submissionUser.email : instructors;
    const displayName = submissionUser.email == comment.user.email ? "Instructors" : submissionUser.displayName;

    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: recipient,
        cc: cc
    };

    const type = comment.subject && comment.subject.type ? comment.subject.type : 'quiz';

    let url = "http://applab-quiz-system.firebaseapp.com/";
    if (type == 'quiz') {
        url += "quizzes";
    } else {
        url += "assignments";
    }

    url += `/${comment.subject.id}/submissions/${comment.submissionID}`;

    // The user subscribed to the newsletter.
    mailOptions.subject = `${comment.user.displayName} has commented on your ${type}!`;
    mailOptions.html = `
        Hey ${displayName || ''}!<br /> 
        Please log into <a href="${url}">App Lab 2.0</a> to see details.
    `;

    await mailTransport.sendMail(mailOptions);

    console.log(`Comment notification sent to ${recipient.email}.`);


    return null;
}
