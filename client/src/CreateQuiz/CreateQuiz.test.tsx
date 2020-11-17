import * as React from 'react';
import CreateQuiz from './CreateQuiz'

jest.mock('../service/quiz-service')(() => {
    class QuizService {
        getQuestionsCategories() {
            return Promise.resolve({
                1: "history",
                2: "religion",
                3: "nature",
                4: "politics",
                5: "math",
                6: "physics",
                7: "other",
                8: "any"
            })
        }
    }
    return new QuizService()
})

describe("Create Quiz Component Test", () => {
    test("CreateQuiz draws correctly", (done) => {
        const wrapper = shallow(<CreateQuiz />)

        setTimeout(() => {
            expect(
                wrapper.containsAllMatchingElements([
                    <h2>Make your own quiz</h2>
                ])
            ).toEqual(true);
            done();
        });

    })

})