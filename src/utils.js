export function generateBracket(teams) {
  const bracket = {
    prePlayoffs: [],
    achtelfinale: [],
    viertelfinale: [],
    halbfinale: [],
    finale: [],
  };

  // Step 1: Pre-Playoffs (7 vs 10, 8 vs 9 for Nord and Süd)
  const prePlayoffsNord = [
    [teams.nord[6], teams.nord[9]], // 7th vs 10th
    [teams.nord[7], teams.nord[8]], // 8th vs 9th
  ];
  const prePlayoffsSüd = [
    [teams.süd[6], teams.süd[9]], // 7th vs 10th
    [teams.süd[7], teams.süd[8]], // 8th vs 9th
  ];
  bracket.prePlayoffs = [...prePlayoffsNord, ...prePlayoffsSüd];

  // Step 2: Combine known teams and placeholders for Achtelfinale
  const nordQualified = [
    ...teams.nord.slice(0, 6),
    { name: "TBD" },
    { name: "TBD" },
  ];
  const südQualified = [
    ...teams.süd.slice(0, 6),
    { name: "TBD" },
    { name: "TBD" },
  ];

  // Alternate seeding between Nord and Süd
  const achtelfinalePool = [];
  for (let i = 0; i < 8; i++) {
    achtelfinalePool.push(nordQualified[i]);
    achtelfinalePool.push(südQualified[i]);
  }

  // Step 3: Achtelfinale Matchups (pre-fill where teams are known)
  const achtelfinaleMatchups = [];
  for (let i = 0; i < 8; i++) {
    const higherSeed = achtelfinalePool[i];
    const lowerSeed = achtelfinalePool[achtelfinalePool.length - 1 - i];
    achtelfinaleMatchups.push([higherSeed, lowerSeed]);
  }
  bracket.achtelfinale = achtelfinaleMatchups;

  // Step 4: Empty Placeholder for Later Rounds
  bracket.viertelfinale = new Array(4).fill(null).map(() => [null, null]);
  bracket.halbfinale = new Array(2).fill(null).map(() => [null, null]);
  bracket.finale = [[null, null]];

  return bracket;
}
