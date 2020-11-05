import express from 'express';
import quizService from './quiz-service';

/**
 * Express router containing task methods.
 */
const router = express.Router();

router.post('/getuserinfo', async (request, response) => {
    const body = request.body;
    const { token } = body.data;
    try {
        const data = await quizService.getUserInfoById(token);
        return response.send(data);
    } catch (error) {
        return response.status(500).send(error)
    }
})

router.post('/adduser', async (request, response) => {
    const body = request.body;
    const { user: {user}, token} = body.data;

    try {
        const data = await quizService.addUser(user, token);
        return response.send(data);
    } catch (error) {
        return response.status(500).send(error)
    }
})

router.post('/changeusername', async (request, response) => {
    const body = request.body;
    const { userName, token } = body.data;

    try {
        const data = await quizService.changeUserName(userName, token)
        return response.send(data);
    } catch (error) {
        return response.status(500).send(error)
    }
})

export default router;
