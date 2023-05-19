import type { Executor } from '../';
import type { PeopleInput } from '../model/static';

export class SessionController {
    
    constructor(private executor: Executor) {}
    
    async login(options: SessionControllerOptions['login']): Promise<string> {
        let _uri = '/sessions/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as string
    }
    
    async logout(): Promise<void> {
        let _uri = '/sessions/';
        return (await this.executor({uri: _uri, method: 'DELETE'})) as void
    }
}

export type SessionControllerOptions = {
    'login': {readonly body: PeopleInput},
    'logout': {}
}