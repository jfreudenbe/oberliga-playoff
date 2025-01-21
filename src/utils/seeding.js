export function generateSeeding(teams) {
  const nord = teams.nord.sort((a, b) => a.standing - b.standing);
  const süd = teams.süd.sort((a, b) => a.standing - b.standing);

  const seeds = [];
  for (let i = 0; i < Math.max(nord.length, süd.length); i++) {
    if (nord[i]) seeds.push({ ...nord[i], seed: i * 2 + 1 });
    if (süd[i]) seeds.push({ ...süd[i], seed: i * 2 + 2 });
  }
  return seeds;
}

export function simulatePlayoffs(seeds) {
  let rounds = [seeds];

  while (rounds[rounds.length - 1].length > 1) {
    const currentRound = rounds[rounds.length - 1];
    const nextRound = [];

    for (let i = 0; i < currentRound.length; i += 2) {
      const match = [currentRound[i], currentRound[i + 1]];

      // Ensure both teams exist before determining the winner
      const winner =
        match[0] && match[1]
          ? match[0].seed < match[1].seed
            ? match[0]
            : match[1]
          : match[0] || match[1];

      if (winner) {
        nextRound.push(winner);
      }
    }

    rounds.push(nextRound);
  }

  return rounds;
}
