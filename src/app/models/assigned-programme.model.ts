import {BaseEntity} from './base-entity.model';

export interface AssignedProgramme extends BaseEntity {
    programmeId: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
}
