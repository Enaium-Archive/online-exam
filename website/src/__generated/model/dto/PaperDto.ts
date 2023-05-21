export type PaperDto = {
    'DEFAULT': {
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly id: number, 
        readonly title: string, 
        readonly expired?: number, 
        readonly questions: ReadonlyArray<{readonly id: number}>
    }
}