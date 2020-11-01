import express from 'express';
import quizService from './quiz-service';

/**
 * Express router containing task methods.
 */
const router = express.Router();

router.get('/test', (request, response) => {
    quizService
    .test()
    .then(data => response.send(data))
    .catch(error => response.status(500).send(error))
})

router.get('/user', (request, response) => {
    return quizService
    .checkCurrentUser()
})

router.post('/createUser', (request, response) => {
    const body = request.body;
    const email = body.email;
    const password = body.password;
    
    quizService
        .createUser(email, password)
        .then((data) => response.send(data))
        .catch((error: Error) => response.status(500).send(error));
});

router.post('/login', (request, response) => {
    const body = request.body;
    const email = body.email;
    const password = body.password;
    
    quizService
        .logInUser(email, password)
        .then((data) => response.send(data))
        .catch((error: Error) => response.status(500).send(error));
});

router.post('/logout', (request, response) => {
    quizService
        .logOutUser()
        .then((data) => response.send(data))
        .catch((error: Error) => response.status(500).send(error));
});


export default router;
