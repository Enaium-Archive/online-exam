import type { Dynamic, Executor } from '../';
import type { ExamDto, QuestionDto } from '../model/dto';
import type { Exam } from '../model/entities';
import type { ExamInput, Page } from '../model/static';

export class ExamController {
    
    constructor(private executor: Executor) {}
    
    async findComplexExams(options: ExamControllerOptions['findComplexExams']): Promise<
        Page<ExamDto['ExamController/COMPLETE_EXAM']>
    > {
        let _uri = '/exams/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.examInput?.id;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'id='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.examInput?.paperId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'paperId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.examInput?.peopleId;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'peopleId='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.examInput?.startTime;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'startTime='
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<ExamDto['ExamController/COMPLETE_EXAM']>
    }
    
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
    
    async marked(options: ExamControllerOptions['marked']): Promise<void> {
        let _uri = '/exams/';
        _uri += encodeURIComponent(options.examId);
        _uri += '/marked/';
        return (await this.executor({uri: _uri, method: 'PUT'})) as void
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
    'findComplexExams': {
        readonly page?: number, 
        readonly size?: number, 
        readonly examInput?: ExamInput
    },
    'findExams': {
        readonly page?: number, 
        readonly size?: number, 
        readonly peopleId: number
    },
    'findQuestions': {readonly examId: number},
    'marked': {readonly examId: number},
    'startExam': {readonly peopleId: number, readonly paperId: number},
    'submitted': {readonly examId: number}
}