import type { Executor } from '../';
import type { QuestionInput } from '../model/static';

export class QuestionController {
    
    constructor(private executor: Executor) {}
    
    async createQuestion(options: QuestionControllerOptions['createQuestion']): Promise<void> {
        let _uri = '/questions/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as void
    }
}

export type QuestionControllerOptions = {
    'createQuestion': {readonly body: QuestionInput}
}