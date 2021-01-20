import {BaseEntity} from './base-entity.model';

export interface Attach extends BaseEntity {
    filename: string;
    date: Date;
    path: string;
}
