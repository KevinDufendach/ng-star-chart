import {Reward} from '../models/reward';

export interface Member {
  uid: string;
  displayName: string;
  rewards: Reward[];
}
