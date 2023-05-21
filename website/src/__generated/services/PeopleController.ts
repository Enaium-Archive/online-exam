import type { Executor } from '../';
import type { PeopleDto } from '../model/dto';

export class PeopleController {
    
    constructor(private executor: Executor) {}
    
    async findPeople(options: PeopleControllerOptions['findPeople']): Promise<
        PeopleDto['PeopleController/DEFAULT_PEOPLE']
    > {
        let _uri = '/people/';
        _uri += encodeURIComponent(options.id);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'GET'})) as PeopleDto['PeopleController/DEFAULT_PEOPLE']
    }
}

export type PeopleControllerOptions = {
    'findPeople': {readonly id: number}
}