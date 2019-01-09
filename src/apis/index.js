import Questions from './Questions';


class API {
    constructor(firebase) {
        this.questions = new Questions(firebase);
    }
}

export default API;