import type { QuestionType } from '../enums';

export interface QuestionInput {
    
    readonly id?: number;
    
    readonly title: string;
    
    readonly type: QuestionType;
}
