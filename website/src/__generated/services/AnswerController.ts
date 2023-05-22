import type { Executor } from '../';
import type { AnswerDto } from '../model/dto';
import type { AnswerInput, AnswerMarkingInput } from '../model/static';

export class AnswerController {
    
    constructor(private executor: Executor) {}
    
    async findAnswer(options: AnswerControllerOptions['findAnswer']): Promise<
        AnswerDto['DEFAULT']
    > {
        let _uri = '/exams/';
        _uri += encodeURIComponent(options.examId);
        _uri += '/questions/';
        _uri += encodeURIComponent(options.questionsId);
        _uri += '/answers/';
        return (await this.executor({uri: _uri, method: 'GET'})) as AnswerDto['DEFAULT']
    }
    
    async makingAnswer(options: AnswerControllerOptions['makingAnswer']): Promise<void> {
        let _uri = '/answers/marking/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as void
    }
    
    async saveAnswer(options: AnswerControllerOptions['saveAnswer']): Promise<void> {
        let _uri = '/answers/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as void
    }
}

export type AnswerControllerOptions = {
    'findAnswer': {readonly examId: number, readonly questionsId: number},
    'makingAnswer': {readonly body: AnswerMarkingInput},
    'saveAnswer': {readonly body: AnswerInput}
}