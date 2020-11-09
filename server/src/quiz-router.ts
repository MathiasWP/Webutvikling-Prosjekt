import express, { request, response } from 'express';
import quizService from './quiz-service';

/**
 * Express router containing task methods.
 */
const router = express.Router();

router.put('/user/:id', (request, response) => {
    const { id } = request.params;

    quizService
        .getUserInfoById(id)
        .then(data => response.send(data))
        .catch(error => response.status(500).send(error))
})

router.post('/adduser', (request, response) => {
    const body = request.body;
    const userData = body.data.user.user;

    quizService
        .addUser(userData)
        .then(data => response.send(data))
        .catch(error => response.status(500).send(error))
})

router.post('/changeusername', (request, response) => {
    const body = request.body;
    const { userName, userToChange } = body.data;

    quizService
        .changeUserName(userName, userToChange)
        .then(data => response.send(data))
        .catch(error => response.status(500).send(error))

})

router.get('/categories', (request, response) => {
    console.log("GET CATEGORIESSSS!!!!!")
    quizService
        .getQuestionsCategories()
        .then(data => response.send(data))
        .catch(error => response.status(500).send(error))

})


router.post('/submitquiz', (request, response) => {

    const quizData = request.body;

    quizService
        .submitQuiz(quizData)
        .then(data => response.send(data))
        .catch(error => response.status(500).send(error))


})
export default router;
