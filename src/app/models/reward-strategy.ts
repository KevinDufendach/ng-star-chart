export interface RewardStrategy {
  id: string;
  calculate(): number;
}
