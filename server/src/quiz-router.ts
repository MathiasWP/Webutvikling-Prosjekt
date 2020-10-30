// @flow
import express from 'express';
import quizService from './quiz-service';

/**
 * Express router containing task methods.
 */
const router = express.Router();

router.get('/quiz', (request, response) => {
//   quizService
//     .getAll()
//     .then((rows) => response.send(rows))
//     .catch((error: Error) => response.status(500).send(error));
});

router.get('/quiz/:id', (request, response) => {
//   const id = Number(request.params.id);
//   quizService
//     .get(id)
//     .then((task) => (task ? response.send(task) : response.status(404).send('Task not found')))
//     .catch((error: Error) => response.status(500).send(error));
});

// Example request body: { title: "Ny oppgave" }
// Example response body: { id: 4 }
router.post('/quiz', (request, response) => {
//   const data = request.body;
//   if (data && typeof data.title == 'string' && data.title.length != 0)
//     quizService
//       .create(data)
//       .then((id) => response.send({ id: id }))
//       .catch((error: Error) => response.status(500).send(error));
//   else response.status(400).send('Missing task title');
});


router.delete('/quiz/:id', (request, response) => {
//   quizService
//     .delete(Number(request.params.id))
//     .then((result) => response.send())
//     .catch((error: Error) => response.status(500).send(error));
});

export default router;
