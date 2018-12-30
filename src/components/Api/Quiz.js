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
                            title: 'Tell us about yourself',
                            name: 'introduction',
                            type: 'text'
                        },
                        {
                            title: 'In which U.S. state was the first nuclear bomb tested?',
                            type: 'single',
                            name: 'tested',
                            options: [
                                'New Mexico',
                                'Shanghai',
                                'Abu Dhabi',
                                'New York'
                            ]
                        }
                    ]
                }
            ]);
        });
    }
}

export default Quiz;