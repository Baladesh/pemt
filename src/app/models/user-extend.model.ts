import {User} from './user.model';
import {Programme} from './programme.model';

export interface UserExtend extends User {
    assignedProgrammes: Array<Programme>;
}
