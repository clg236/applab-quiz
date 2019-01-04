class Question
{
    constructor(firebase) {
        this.firebase = firebase;
    }

    create = (question) => {
        return new Promise((resolve, reject) => {
            const key = this.firebase.db.ref('questions').push().key;

            const updates = {};
            updates[`questions/${key}`] = {
                "question": question
            };
            
            this.firebase.db.ref().update(updates, function (error) {
                console.log(error);

                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    get = (anchor) => {
        return new Promise((resolve, reject) => {
            const query = this.firebase.db.ref('questions').orderByKey().limitToLast(10);
            const questions = [];
    
            if (typeof anchor != 'undefined') {
                query.startAt(anchor);
            }
    
            query.once('value').then((snapshot) => {
                snapshot.forEach(child => {
                    const val = child.val();
                    questions.push({
                        id: child.key,
                        question: val.question
                    });
                });

                resolve(questions);
            });
        });
    }
}

export default Question;