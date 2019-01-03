class Quiz
{
    get = () => {
        return new Promise((resolve, reject) => {
            resolve([
                {
                    id: 1,
                    title: "General Knowledge",
                    questions:[
                        {
                            question: 'Tell us about yourself',
                            name: 'introduction',
                            type: 'text'
                        },
                        {
                            question: 'In which U.S. state was the first nuclear bomb tested?',
                            type: 'single',
                            name: 'where_bomb_tested',
                            options: [
                                'New Mexico',
                                'Shanghai',
                                'Abu Dhabi',
                                'New York'
                            ]
                        },
                        {
                            question: "How are you today?",
                            type: 'multiple',
                            name: 'how_are_you',
                            options: [
                                'Fine',
                                'Happy',
                                'Excited'
                            ]
                        },
                        {
                            question: "How would you display an alert box in javascript?",
                            type: 'code',
                            name: 'alert_box',
                            placeholder: "// alert?"
                        }
                    ]
                }
            ]);
        });
    }
}

export default Quiz;