import {RewardStrategy} from './reward-strategy';
import {RewardValueSnapshot} from './reward-value-snapshot';
import {RewardEvent} from './reward-event';

export interface Reward {
  id: string;
  name: string;
  units?: string;
  events?: RewardEvent[];
  valueSnapshot: RewardValueSnapshot;
  strategy: RewardStrategy;
  strategyParameters: any;
}
