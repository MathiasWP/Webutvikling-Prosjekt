import quizService from "./quiz-service"
import 'jest';


test('test pass', () => {
    expect(1+1).toBe(2);
});

test('test fail', () => {
    expect(1+1).toBe(3);
});
