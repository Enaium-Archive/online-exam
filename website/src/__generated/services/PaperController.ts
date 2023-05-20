import type { Executor } from '../';
import type { PaperDto } from '../model/dto';
import type { Page, PaperInput } from '../model/static';

export class PaperController {
    
    constructor(private executor: Executor) {}
    
    async addQuestions(options: PaperControllerOptions['addQuestions']): Promise<void> {
        let _uri = '/papers/';
        _uri += encodeURIComponent(options.paperId);
        _uri += '/questions/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.questionIds.join(',');
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'questionIds='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'PUT'})) as void
    }
    
    async findPapers(options: PaperControllerOptions['findPapers']): Promise<
        Page<PaperDto['DEFAULT']>
    > {
        let _uri = '/papers/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.paperInput?.expired;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'expired='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.paperInput?.id;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'id='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.paperInput?.title;
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<PaperDto['DEFAULT']>
    }
    
    async savePaper(options: PaperControllerOptions['savePaper']): Promise<void> {
        let _uri = '/papers/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as void
    }
}

export type PaperControllerOptions = {
    'addQuestions': {readonly paperId: string, readonly questionIds: ReadonlyArray<number>},
    'findPapers': {
        readonly page?: number, 
        readonly size?: number, 
        readonly paperInput?: PaperInput
    },
    'savePaper': {readonly body: PaperInput}
}