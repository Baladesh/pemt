import {BaseEntity} from './base-entity.model';

export interface Initial extends BaseEntity {
    reps: number;
    timePerWeek: number;
    timePeriod: number;
}
