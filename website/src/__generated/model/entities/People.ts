import type { Role } from './';

export interface People {
    
    readonly createdTime: string;
    
    readonly modifiedTime: string;
    
    readonly id: number;
    
    readonly username: string;
    
    readonly password: string;
    
    readonly roleId: number;
    
    readonly role: Role;
}
