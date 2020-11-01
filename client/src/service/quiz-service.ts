import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';


class QuizService {
  test() {
    return axios.get('/test').then((response) => response.data);
  }

  getCurrentUser() {
      return axios.get('/user')
      .then((response: {data: any}) => response.data)
      .catch(error => console.error(error))
  }

  createUser(body: { email: string, password: string }) {
    return axios
    .post('/createUser', { email: body.email, password: body.password })
    .then((response: {data: any}) => response.data)
    .catch(error => console.error(error))
  }

  login(body: { email: string, password: string }) {
    return axios
    .post('/login', { email: body.email, password: body.password })
    .then((response: {data: any}) => response.data)
    .catch(error => console.error(error))
  }

  logout() {
    return axios
    .post('/logout')
    .then((response: {data: any}) => response.data)
    .catch(error => console.error(error))
  }

}

const quizService = new QuizService();
export default quizService;
