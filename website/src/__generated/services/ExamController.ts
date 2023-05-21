import type { Dynamic, Executor } from '../';
import type { ExamDto, QuestionDto } from '../model/dto';
import type { Exam } from '../model/entities';
import type { Page } from '../model/static';

export class ExamController {
    
    constructor(private executor: Executor) {}
    
    async findExams(options: ExamControllerOptions['findExams']): Promise<
        Page<ExamDto['ExamController/DEFAULT_EXAM']>
    > {
        let _uri = '/people/';
        _uri += encodeURIComponent(options.peopleId);
        _uri += '/exams/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<ExamDto['ExamController/DEFAULT_EXAM']>
    }
    
    async findQuestions(options: ExamControllerOptions['findQuestions']): Promise<
        ReadonlyArray<QuestionDto['DEFAULT']>
    > {
        let _uri = '/exams/';
        _uri += encodeURIComponent(options.examId);
        _uri += '/questions/';
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<QuestionDto['DEFAULT']>
    }
    
    async startExam(options: ExamControllerOptions['startExam']): Promise<
        Dynamic<Exam>
    > {
        let _uri = '/people/';
        _uri += encodeURIComponent(options.peopleId);
        _uri += '/exams/';
        _uri += encodeURIComponent(options.paperId);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'PUT'})) as Dynamic<Exam>
    }
    
    async submitted(options: ExamControllerOptions['submitted']): Promise<void> {
        let _uri = '/exams/';
        _uri += encodeURIComponent(options.examId);
        _uri += '/submitted/';
        return (await this.executor({uri: _uri, method: 'PUT'})) as void
    }
}

export type ExamControllerOptions = {
    'findExams': {
        readonly page?: number, 
        readonly size?: number, 
        readonly peopleId: number
    },
    'findQuestions': {readonly examId: number},
    'startExam': {readonly peopleId: number, readonly paperId: number},
    'submitted': {readonly examId: number}
}