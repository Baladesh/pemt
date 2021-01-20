import {BaseEntity} from './base-entity.model';
import {Initial} from './initial.model';
import {Progression} from './progression.model';
import {Attach} from './attach.model';

export interface Exercise extends BaseEntity {
    exerciseName: string;
    reviewDate: Date;
    description: string;
    initial: Initial;
    progressions: Array<Progression>;
    attachments: Array<Attach>;
}
