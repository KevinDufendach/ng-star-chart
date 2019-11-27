export interface RewardStrategy {
  id: string;
  calculate(params): number;
}
