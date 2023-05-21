import type { Executor } from './';

import { AnswerController, ExamController, PaperController, PeopleController, QuestionController, SessionController } from './services';

export class Api {
    
    readonly answerController: AnswerController;
    
    readonly examController: ExamController;
    
    readonly paperController: PaperController;
    
    readonly peopleController: PeopleController;
    
    readonly questionController: QuestionController;
    
    readonly sessionController: SessionController;
    
    constructor(executor: Executor) {
        this.answerController = new AnswerController(executor);
        this.examController = new ExamController(executor);
        this.paperController = new PaperController(executor);
        this.peopleController = new PeopleController(executor);
        this.questionController = new QuestionController(executor);
        this.sessionController = new SessionController(executor);
    }
}