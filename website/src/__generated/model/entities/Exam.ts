import type { Paper, People } from './';

export interface Exam {
    
    readonly createdTime: string;
    
    readonly modifiedTime: string;
    
    readonly id: number;
    
    readonly peopleId: number;
    
    readonly people: People;
    
    readonly paperId: number;
    
    readonly paper: Paper;
    
    readonly submitted: boolean;
    
    readonly marked: boolean;
    
    readonly startTime: string;
    
    readonly expired: boolean;
}
