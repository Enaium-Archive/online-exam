import type { QuestionType } from '../enums';

export type QuestionDto = {
    'DEFAULT': {
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly id: number, 
        readonly title: string, 
        readonly type: QuestionType
    }
}