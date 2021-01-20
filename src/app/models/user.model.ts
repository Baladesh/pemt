import {BaseEntity} from './base-entity.model';

export interface User extends BaseEntity{
    name: string;
    surname: string;
    mhsNumber: number;
    diagnosis: string;
}
