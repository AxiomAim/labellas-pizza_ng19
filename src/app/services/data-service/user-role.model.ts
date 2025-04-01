import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from './base-dto.model';

export class UserRoleModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        domain: string,
        name: string,
        code: string,
        description: string,
        active?: boolean,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
            ) {
            this.id = id;
            this.orgId = orgId;
            this.domain = domain;
            this.name = name;
            this.code = code;
            this.description = description;
            this.active = active;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.deleted_at = deleted_at;
    }
    public id: string;
    public orgId: string;
    public domain: string;
    public name: string;
    public code: string;
    public description: string;
    public active?: boolean;
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;

    public static toDto(dto: UserRole): UserRole {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            domain: dto.domain ? dto.domain : '',
            name: dto.name ? dto.name : '',
            code: dto.code ? dto.code : '',
            description: dto.description ? dto.description : '',
            active: dto.active ? dto.active : false,
            created_at: dto.created_at ? dto.created_at : date,
            updated_at: dto.updated_at ? dto.updated_at : date,
            deleted_at: dto.deleted_at ? dto.deleted_at : '',
        };
    }

    public static emptyDto(): UserRole {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            domain: '',
            name: '',
            code: '',
            description: '',
            active: false,
            created_at: date,
            updated_at: date,
            deleted_at: '',

        }
    }

}

export interface UserRole  extends BaseDto {
    id: string;
    orgId: string,
    domain: string;
    name: string;
    code: string;    
    description: string;
    active?: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

