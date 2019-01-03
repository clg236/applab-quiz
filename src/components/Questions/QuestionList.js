import React from 'react';
import QuestionListItem from './QuestionListItem';
import { Formik, Field } from 'formik';


function QuestionList(props) {
    
    return (
        <Formik>
            {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                    <ol>
                        {props.quiz.questions.map((question, i) => (
                            <QuestionListItem question={question} key={i} formik={formik} />
                        ))}
                    </ol>
                    { JSON.stringify(formik.values) }
                </form>
            )}
        </Formik>
    );
}

export default QuestionList;