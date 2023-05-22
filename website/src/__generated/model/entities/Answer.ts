import type { Exam, Paper, People, Question } from './';

export interface Answer {
    
    readonly createdTime: string;
    
    readonly modifiedTime: string;
    
    readonly id: number;
    
    readonly questionId: number;
    
    readonly question: Question;
    
    readonly peopleId: number;
    
    readonly people: People;
    
    readonly examId: number;
    
    readonly exam: Exam;
    
    readonly paperId: number;
    
    readonly paper: Paper;
    
    readonly answer: string;
    
    readonly state?: boolean;
    
    readonly reason?: string;
}
