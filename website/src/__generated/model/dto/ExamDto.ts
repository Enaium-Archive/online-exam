export type ExamDto = {
    'ExamController/DEFAULT_EXAM': {
        readonly id: number, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly peopleId: number, 
        readonly paperId: number, 
        readonly submitted: boolean, 
        readonly marked: boolean, 
        readonly startTime: string, 
        readonly paper: {
            readonly id: number, 
            readonly createdTime: string, 
            readonly modifiedTime: string, 
            readonly title: string, 
            readonly expired?: number
        }, 
        readonly expired: boolean
    }, 
    'ExamController/COMPLETE_EXAM': {
        readonly id: number, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly peopleId: number, 
        readonly paperId: number, 
        readonly submitted: boolean, 
        readonly marked: boolean, 
        readonly startTime: string, 
        readonly paper: {
            readonly id: number, 
            readonly createdTime: string, 
            readonly modifiedTime: string, 
            readonly title: string, 
            readonly expired?: number
        }, 
        readonly people: {
            readonly id: number, 
            readonly createdTime: string, 
            readonly modifiedTime: string, 
            readonly username: string, 
            readonly roleId: number
        }, 
        readonly expired: boolean
    }
}