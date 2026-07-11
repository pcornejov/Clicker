export const queryKeys = {
  activeBattleId: ['settings', 'activeBattleId'] as const,
  battle: (battleId: string) => ['battles', battleId] as const,
  battleOptions: (battleId: string) => ['battles', battleId, 'options'] as const,
  battlesList: ['battles', 'list'] as const,
}
