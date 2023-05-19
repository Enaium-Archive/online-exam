import type { Executor } from '../';

export class ExamController {
    
    constructor(private executor: Executor) {}
    
    async findExams(options: ExamControllerOptions['findExams']): Promise<void> {
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
        return (await this.executor({uri: _uri, method: 'GET'})) as void
    }
}

export type ExamControllerOptions = {
    'findExams': {
        readonly page?: number, 
        readonly size?: number, 
        readonly peopleId: number
    }
}