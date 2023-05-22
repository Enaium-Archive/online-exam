import type { Executor } from '../';
import type { AnswerDto, QuestionDto } from '../model/dto';
import type { Page, QAResponse, QuestionInput } from '../model/static';

export class QuestionController {
    
    constructor(private executor: Executor) {}
    
    async findAnswers(options: QuestionControllerOptions['findAnswers']): Promise<
        Page<QAResponse<QuestionDto['QuestionController/QUESTION_FETCHER'], AnswerDto['QuestionController/ANSWER_FETCHER']>>
    > {
        let _uri = '/exams/';
        _uri += encodeURIComponent(options.examId);
        _uri += '/questions/answers/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.page;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'page='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.size;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'size='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<QAResponse<QuestionDto['QuestionController/QUESTION_FETCHER'], AnswerDto['QuestionController/ANSWER_FETCHER']>>
    }
    
    async findQuestions(options: QuestionControllerOptions['findQuestions']): Promise<
        Page<QuestionDto['DEFAULT']>
    > {
        let _uri = '/questions/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.questionInput?.id;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'id='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.questionInput?.title;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'title='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.page;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'page='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.size;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'size='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<QuestionDto['DEFAULT']>
    }
    
    async saveQuestion(options: QuestionControllerOptions['saveQuestion']): Promise<void> {
        let _uri = '/questions/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as void
    }
}

export type QuestionControllerOptions = {
    'findAnswers': {
        readonly page?: number, 
        readonly size?: number, 
        readonly examId: number
    },
    'findQuestions': {
        readonly page?: number, 
        readonly size?: number, 
        readonly questionInput?: QuestionInput
    },
    'saveQuestion': {readonly body: QuestionInput}
}