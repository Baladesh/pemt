import {BaseEntity} from './base-entity.model';

export interface Progression extends BaseEntity {
    reps: number;
    timePerWeek: number;
    timePeriod: number;
}
