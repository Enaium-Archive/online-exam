import type { Question } from './';

export interface Paper {
    
    readonly createdTime: string;
    
    readonly modifiedTime: string;
    
    readonly id: number;
    
    readonly title: string;
    
    readonly expired?: number;
    
    readonly questions: ReadonlyArray<Question>;
    
    readonly question: number;
}
