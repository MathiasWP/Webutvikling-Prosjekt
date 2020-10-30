class QuizService {
  get(id: number) {
    return new Promise((resolve, reject) => {
        /**
         * CLOUD-FUNCTION FIRED FROM HERE
         */
      });
    };
  

  getAll() {
    return new Promise((resolve, reject) => {
        /**
         * CLOUD-FUNCTION FIRED FROM HERE
         */
    });
  }

  create(data: object) {
    return new Promise((resolve, reject) => {
        /**
         * CLOUD-FUNCTION FIRED FROM HERE
         */
    });
  }

  update(data: object) {
    return new Promise((resolve, reject) => {        
        /**
        * CLOUD-FUNCTION FIRED FROM HERE
        */
    })
  }

  /**
   * Delete task with given id.
   */
  delete(id: number) {
    return new Promise<void>((resolve, reject) => {        
        /**
        * CLOUD-FUNCTION FIRED FROM HERE
        */
    });
  }
}

const quizService = new QuizService();
export default quizService;
