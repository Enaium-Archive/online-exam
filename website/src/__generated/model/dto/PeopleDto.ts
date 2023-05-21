export type PeopleDto = {
    'PeopleController/DEFAULT_PEOPLE': {
        readonly id: number, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly username: string, 
        readonly roleId: number, 
        readonly role: {
            readonly id: number, 
            readonly name: string
        }
    }
}