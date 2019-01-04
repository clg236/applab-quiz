import React, { useContext, useState, useEffect } from 'react';
import { ApiContext } from '../Api';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function QuestionsPage() {
    const api = useContext(ApiContext);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        api.question.get().then(result => {
            setQuestions(result);
            console.log("Questions: ", result);
        });
    }, []);
    
    return (
        <div>
            <h2>Questions</h2>
            {questions.length ? (
                    <ol>
                        {questions.map(question => (
                            <li key={question.id}>{question.question}</li>
                        ))}
                    </ol>
                ) : <p>No questions.</p>
            }
            <p><Link to={ROUTES.ADMIN_CREATE_QUESTION}>Create a question</Link></p>
        </div>
    );
}

export default QuestionsPage;