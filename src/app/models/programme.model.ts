import {BaseEntity} from './base-entity.model';
import {Exercise} from './exercise.model';

export interface Programme extends BaseEntity{
    programmeName: string;
    date: Date;
    goal: string;
    exercises: Array<Exercise>;
}
