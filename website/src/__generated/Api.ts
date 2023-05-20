import type { Executor } from './';

import { ExamController, PaperController, PeopleController, QuestionController, SessionController } from './services';

export class Api {
    
    readonly examController: ExamController;
    
    readonly paperController: PaperController;
    
    readonly peopleController: PeopleController;
    
    readonly questionController: QuestionController;
    
    readonly sessionController: SessionController;
    
    constructor(executor: Executor) {
        this.examController = new ExamController(executor);
        this.paperController = new PaperController(executor);
        this.peopleController = new PeopleController(executor);
        this.questionController = new QuestionController(executor);
        this.sessionController = new SessionController(executor);
    }
}