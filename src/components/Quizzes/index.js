import React, { useState, useContext, useEffect } from 'react';
import Api, { ApiContext } from '../Api';
import Grid from '@material-ui/core/Grid';
import QuizListItem from './QuizListItem';
import { QuestionList, QuestionListItem } from '../Questions';


function QuizzesPage() {
    const api = useContext(ApiContext);
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    function handleQuizClicked(quiz) {
        setSelectedQuiz(quiz);
    }

    useEffect(() => {
        api.quiz.get()
            .then(result => {
                setQuizzes(result);
            })
            .catch(() => {
                setQuizzes([]);
            });
    }, [quizzes]);

    return (
        <div>
            <h2>Quizzes</h2>

            <Grid container spacing={24}>
                <Grid item xs>
                    <ul>
                        {quizzes.map(quiz => (
                            <QuizListItem key={quiz.id} quiz={quiz} handleQuizListItemClicked={handleQuizClicked} />
                        ))}
                    </ul>
                </Grid>
                <Grid item xs={8}>
                    {selectedQuiz && (
                        <QuestionList quiz={selectedQuiz} />
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default QuizzesPage;