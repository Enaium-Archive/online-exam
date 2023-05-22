import type { QuestionType } from '../enums';
import type { Answer, Paper } from './';

export interface Question {
    
    readonly createdTime: string;
    
    readonly modifiedTime: string;
    
    readonly id: number;
    
    readonly title: string;
    
    readonly type: QuestionType;
    
    readonly papers: ReadonlyArray<Paper>;
    
    readonly answers: ReadonlyArray<Answer>;
}
