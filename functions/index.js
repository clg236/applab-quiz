'use strict';


const dbCommentsOnCreate = require("./db/comments/onCreate");
exports["dbCommentsOnCreate_sendCommentNotificationEmail"] = dbCommentsOnCreate.sendCommentNotificationEmail
