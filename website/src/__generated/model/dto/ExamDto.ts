export type ExamDto = {
    'ExamController/DEFAULT_EXAM': {
        readonly id: number, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly peopleId: number, 
        readonly paperId: number, 
        readonly submitted: boolean, 
        readonly startTime: string, 
        readonly paper: {
            readonly id: number, 
            readonly createdTime: string, 
            readonly modifiedTime: string, 
            readonly title: string, 
            readonly expired?: number
        }, 
        readonly expired: boolean
    }
}