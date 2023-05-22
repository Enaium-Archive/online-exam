import type { QuestionType } from '../enums';

export type QuestionDto = {
    'QuestionController/QUESTION_FETCHER': {
        readonly id: number, 
        readonly title: string, 
        readonly type: QuestionType
    }, 
    'DEFAULT': {
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly id: number, 
        readonly title: string, 
        readonly type: QuestionType
    }
}