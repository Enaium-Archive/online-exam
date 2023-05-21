export type AnswerDto = {
    'DEFAULT': {
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly id: number, 
        readonly questionId: number, 
        readonly question: {readonly id: number}, 
        readonly peopleId: number, 
        readonly people: {readonly id: number}, 
        readonly examId: number, 
        readonly exam: {readonly id: number}, 
        readonly paperId: number, 
        readonly paper: {readonly id: number}, 
        readonly answer: string, 
        readonly state?: boolean, 
        readonly reason?: string
    }
}