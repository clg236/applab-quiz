'use strict';

const admin = require('firebase-admin');

// init app first
admin.initializeApp();

const dbCommentsOnCreate = require("./db/comments/onCreate");
exports["dbCommentsOnCreate_sendCommentNotificationEmail"] = dbCommentsOnCreate.sendCommentNotificationEmail

// const dbQuizzesOnUpdate = require("./db/quizzes/onUpdate");
// exports["dbQuizzesOnUpdate_migrateQuestions"] = dbQuizzesOnUpdate.migrateQuestions
