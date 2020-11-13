import express, { request, response } from 'express';
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
    const { user: { user }, token } = body.data;

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

router.get('/activerooms', (request, response) => {
    quizService.getActiveRooms()
        .then(data => response.send(data))
})


router.post("/getroom", async (request, response) => {
    const body = request.body;
    const { id } = body.data;
    try {
        const data = await quizService.getRoom(id);
        return response.send(data)
    } catch (error) {
        return response.status(500).send(error)
    }
})

router.post("/categories", async (request, response) => {
    try {
        const data = await quizService.getCategories();
        return response.send(data)
    } catch (error) {
        return response.status(500).send(error)
    }
})

router.post('/getquizes', async (request, response) => {
    const body = request.body;
    const { category, token } = body.data;

    try {
        const data = await quizService.findQuizesByCategory(category, token);
        return response.send(data);
    } catch (error) {
        return response.status(500).send(error)
    }
})

router.get('/question-categories', (request, response) => {
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

router.post('/createroom', async (request, response) => {
    const body = request.body;
    try {
        const res = await quizService.createQuizRoom(body)
        return response.send(res.id)
    } catch (error) {
        console.log(error)
    }
})

router.post('/getquiz', async (request, response) => {
    const body = request.body
    const res = await quizService.getQuizById(body.id)
    return response.send(res)
})

router.post("/addusertoquiz", async (request, response) => {
    const body = request.body;
    const { token, data, roomId } = body.data;
    try {
        const _data = await quizService.addUserToQuizRoom(token, data, roomId);
        return response.send(_data)
    } catch (error) {
        return response.status(500).send(error)
    }
})
router.post("/removeuserfromquiz", async (request, response) => {
    const body = request.body;
    const { token, data, roomId } = body.data;
    try {
        const _data = await quizService.removeUserFromQuizRoom(token, data, roomId);
        return response.send(_data)
    } catch (error) {
        return response.status(500).send(error)
    }
})

router.post("/beginquizroom", async (request, response) => {
    const body = request.body;
    const { token, roomId } = body.data;
    try {
        const data = await quizService.beginQuizRoom(token, roomId);
        return response.send(data)
    } catch (error) {
        return response.status(500).send(error)
    }
})


router.post("/changequizroomround", async (request, response) => {
    const body = request.body;
    const { token, roomId } = body.data;
    try {
        const data = await quizService.changeQuizRoomRound(token, roomId);
        //console.log(data)
        return response.send(data)
    } catch (error) {
        return response.status(500).send(error)
    }
})




export default router;
