<template>
  <div>
    <div class="flex md:justify-between justify-center items-center mb-4">
      <div>
        <h2
          class="font-bold text-center md:text-left text-2xl md:text-4xl text-gray-800"
        >
          Playoff Bracket Simulation
        </h2>
        <p
          class="text-sm md:text-lg text-center md:text-left leading-tight text-gray-700 mt-1 md:mt-4"
        >
          Pick your winner by clicking on the teams logo.
        </p>
      </div>
      <button
        @click="resetBracket"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 fixed bottom-4 right-4 md:static md:bottom-0 md:right-0"
      >
        Reset
      </button>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-5 gap-12 md:mt-12 max-w-screen-2xl"
    >
      <!-- Pre-Playoffs -->
      <div class="md:max-w-72">
        <h3 class="font-semibold text-xl text-center text-gray-700 mb-2">
          Pre-Playoffs
        </h3>
        <div
          v-for="(match, index) in bracket.prePlayoffs"
          :key="'pre-' + index"
          class="mb-4"
        >
          <div
            class="flex justify-around items-center p-2 py-3 border border-gray-200 rounded-md shadow-md"
          >
            <!-- Team 1 -->
            <div class="flex flex-col items-center">
              <img
                :src="match[0]?.logo || ''"
                :alt="match[0]?.name || 'TBD'"
                class="h-12 w-12 p-0.5 object-contain cursor-pointer hover:scale-125 transition duration-200 ease-in-out"
                :class="{
                  'saturate-150 pointer-events-none scale-125':
                    decidedMatches[`prePlayoffs-${index}`] === match[0].name,
                  'opacity-50 saturate-50 pointer-events-none':
                    !!decidedMatches[`prePlayoffs-${index}`] &&
                    decidedMatches[`prePlayoffs-${index}`] !== match[0].name,
                  '': !decidedMatches[`prePlayoffs-${index}`],
                }"
                @click="advanceTeam(match[0], 'prePlayoffs', index)"
              />
            </div>

            <!-- VS -->
            <div class="text-gray-600">vs</div>

            <!-- Team 2 -->
            <div class="flex flex-col items-center">
              <img
                :src="match[1]?.logo || ''"
                :alt="match[1]?.name || 'TBD'"
                class="h-12 w-12 p-0.5 object-contain cursor-pointer hover:scale-125 transition duration-200 ease-in-out"
                :class="{
                  'saturate-150 pointer-events-none scale-125':
                    decidedMatches[`prePlayoffs-${index}`] === match[1].name,
                  'opacity-50 saturate-50 pointer-events-none':
                    !!decidedMatches[`prePlayoffs-${index}`] &&
                    decidedMatches[`prePlayoffs-${index}`] !== match[1].name,
                  '': !decidedMatches[`prePlayoffs-${index}`],
                }"
                @click="advanceTeam(match[1], 'prePlayoffs', index)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Achtelfinale -->
      <div class="md:max-w-72">
        <h3 class="font-semibold text-xl text-center text-gray-700 mb-2">
          Achtelfinale
        </h3>
        <div
          v-for="(match, index) in bracket.achtelfinale"
          :key="'achtelfinale-' + index"
          class="mb-4"
        >
          <div
            class="flex justify-around items-center p-2 py-3 border border-gray-200 rounded-md shadow-md"
          >
            <!-- Team 1 -->
            <div class="flex flex-col items-center">
              <img
                v-if="match[0]"
                :src="match[0]?.logo || ''"
                :alt="match[0]?.name || 'TBD'"
                class="h-12 w-12 object-contain cursor-pointer hover:scale-125 transition duration-200 ease-in-out"
                :class="{
                  'saturate-150 pointer-events-none scale-125':
                    decidedMatches[`achtelfinale-${index}`] === match[0].name,
                  'opacity-50 saturate-50 pointer-events-none':
                    !!decidedMatches[`achtelfinale-${index}`] &&
                    decidedMatches[`achtelfinale-${index}`] !== match[0].name,
                  '': !decidedMatches[`achtelfinale-${index}`],
                }"
                @click="advanceTeam(match[0], 'achtelfinale', index)"
              />
              <div
                v-else
                class="h-12 w-12 flex items-center justify-center text-gray-600"
              >
                TBD
              </div>
            </div>

            <!-- VS -->
            <div class="text-gray-600">vs</div>

            <!-- Team 2 -->
            <div class="flex flex-col items-center">
              <img
                v-if="match[1].logo"
                :src="match[1]?.logo || ''"
                :alt="match[1]?.name || 'TBD'"
                class="h-12 w-12 object-contain cursor-pointer hover:scale-125 transition duration-200 ease-in-out"
                :class="{
                  'saturate-150 pointer-events-none scale-125':
                    decidedMatches[`achtelfinale-${index}`] === match[1].name,
                  'opacity-50 saturate-50 pointer-events-none':
                    !!decidedMatches[`achtelfinale-${index}`] &&
                    decidedMatches[`achtelfinale-${index}`] !== match[1].name,
                  '': !decidedMatches[`achtelfinale-${index}`],
                }"
                @click="advanceTeam(match[1], 'achtelfinale', index)"
              />
              <div
                v-else
                class="h-12 w-12 flex items-center justify-center text-gray-600"
              >
                TBD
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Viertelfinale -->
      <div class="md:max-w-72">
        <h3 class="font-semibold text-xl text-center text-gray-700 mb-2">
          Viertelfinale
        </h3>
        <div
          v-for="(match, index) in bracket.viertelfinale"
          :key="'viertelfinale-' + index"
          class="mb-4"
        >
          <div
            class="flex justify-around items-center p-2 py-3 border border-gray-200 rounded-md shadow-md"
          >
            <!-- Team 1 -->
            <div class="flex flex-col items-center">
              <img
                v-if="match[0]"
                :src="match[0]?.logo || ''"
                :alt="match[0]?.name || 'TBD'"
                class="h-12 w-12 object-contain cursor-pointer hover:scale-125 transition duration-200 ease-in-out"
                :class="{
                  'saturate-150 pointer-events-none scale-125':
                    decidedMatches[`viertelfinale-${index}`] === match[0]?.name,
                  'opacity-50 saturate-50 pointer-events-none':
                    !!decidedMatches[`viertelfinale-${index}`] &&
                    decidedMatches[`viertelfinale-${index}`] !== match[0]?.name,
                  '': !decidedMatches[`viertelfinale-${index}`],
                }"
                @click="advanceTeam(match[0], 'viertelfinale', index)"
              />
              <div
                v-else
                class="h-12 w-12 flex items-center justify-center text-gray-600"
              >
                TBD
              </div>
            </div>

            <!-- VS -->
            <div class="text-gray-600">vs</div>

            <!-- Team 2 -->
            <div class="flex flex-col items-center">
              <img
                v-if="match[1]"
                :src="match[1]?.logo || ''"
                :alt="match[1]?.name || 'TBD'"
                class="h-12 w-12 object-contain cursor-pointer hover:scale-125 transition duration-200 ease-in-out"
                :class="{
                  'saturate-150 pointer-events-none scale-125':
                    decidedMatches[`viertelfinale-${index}`] === match[1]?.name,
                  'opacity-50 saturate-50 pointer-events-none':
                    !!decidedMatches[`viertelfinale-${index}`] &&
                    decidedMatches[`viertelfinale-${index}`] !== match[1]?.name,
                  '': !decidedMatches[`viertelfinale-${index}`],
                }"
                @click="advanceTeam(match[1], 'viertelfinale', index)"
              />

              <div
                v-else
                class="h-12 w-12 flex items-center justify-center text-gray-600"
              >
                TBD
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Halbfinale -->
      <div class="md:max-w-72">
        <h3 class="font-semibold text-xl text-center text-gray-700 mb-2">
          Halbfinale
        </h3>
        <div
          v-for="(match, index) in bracket.halbfinale"
          :key="'halbfinale-' + index"
          class="mb-4"
        >
          <div
            class="flex justify-around items-center p-2 py-3 border border-gray-200 rounded-md shadow-md"
          >
            <!-- Team 1 -->
            <div class="flex flex-col items-center">
              <img
                v-if="match[0]"
                :src="match[0]?.logo || ''"
                :alt="match[0]?.name || 'TBD'"
                class="h-12 w-12 object-contain cursor-pointer hover:scale-125 transition duration-200 ease-in-out"
                :class="{
                  'saturate-150 pointer-events-none scale-125':
                    decidedMatches[`halbfinale-${index}`] === match[0]?.name,
                  'opacity-50 saturate-50 pointer-events-none':
                    !!decidedMatches[`halbfinale-${index}`] &&
                    decidedMatches[`halbfinale-${index}`] !== match[0]?.name,
                  '': !decidedMatches[`halbfinale-${index}`],
                }"
                @click="advanceTeam(match[0], 'halbfinale', index)"
              />
              <div
                v-else
                class="h-12 w-12 flex items-center justify-center text-gray-600"
              >
                TBD
              </div>
            </div>

            <!-- VS -->
            <div class="text-gray-600">vs</div>

            <!-- Team 2 -->
            <div class="flex flex-col items-center">
              <img
                v-if="match[1]"
                :src="match[1]?.logo || ''"
                :alt="match[1]?.name || 'TBD'"
                class="h-12 w-12 object-contain cursor-pointer hover:scale-125 transition duration-200 ease-in-out"
                :class="{
                  'saturate-150 pointer-events-none scale-125':
                    decidedMatches[`halbfinale-${index}`] === match[1]?.name,
                  'opacity-50 saturate-50 pointer-events-none':
                    !!decidedMatches[`halbfinale-${index}`] &&
                    decidedMatches[`halbfinale-${index}`] !== match[1]?.name,
                  '': !decidedMatches[`halbfinale-${index}`],
                }"
                @click="advanceTeam(match[1], 'halbfinale', index)"
              />
              <div
                v-else
                class="h-12 w-12 flex items-center justify-center text-gray-600"
              >
                TBD
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Finale -->
      <div class="md:max-w-72">
        <h3 class="font-semibold text-xl text-center text-gray-700 mb-2">
          Finale
        </h3>
        <div v-if="bracket.finale.length && bracket.finale[0]">
          <div
            class="flex justify-around items-center p-2 py-3 border border-gray-200 rounded-md shadow-md"
          >
            <!-- Team 1 -->
            <div class="flex flex-col items-center">
              <img
                v-if="bracket.finale[0][0]"
                :src="bracket.finale[0][0]?.logo || ''"
                :alt="bracket.finale[0][0]?.name || 'TBD'"
                class="h-12 w-12 object-contain cursor-pointer hover:scale-125 transition duration-200 ease-in-out"
                :class="{
                  'saturate-150 pointer-events-none scale-125':
                    decidedMatches['finale-0'] === bracket.finale[0][0]?.name,
                  'opacity-50 saturate-50 pointer-events-none':
                    !!decidedMatches['finale-0'] &&
                    decidedMatches['finale-0'] !== bracket.finale[0][0]?.name,
                  '': !decidedMatches['finale-0'],
                }"
                @click="advanceTeam(bracket.finale[0][0], 'finale', 0)"
              />
              <div
                v-else
                class="h-12 w-12 flex items-center justify-center text-gray-600"
              >
                TBD
              </div>
            </div>

            <!-- VS -->
            <div class="text-gray-600">vs</div>

            <!-- Team 2 -->
            <div class="flex flex-col items-center">
              <img
                v-if="bracket.finale[0][1]"
                :src="bracket.finale[0][1]?.logo || ''"
                :alt="bracket.finale[0][1]?.name || 'TBD'"
                class="h-12 w-12 object-contain cursor-pointer hover:scale-125 transition duration-200 ease-in-out"
                :class="{
                  'saturate-150 pointer-events-none scale-125':
                    decidedMatches['finale-0'] === bracket.finale[0][1]?.name,
                  'opacity-50 saturate-50 pointer-events-none':
                    !!decidedMatches['finale-0'] &&
                    decidedMatches['finale-0'] !== bracket.finale[0][1]?.name,
                  '': !decidedMatches['finale-0'],
                }"
                @click="advanceTeam(bracket.finale[0][1], 'finale', 0)"
              />
              <div
                v-else
                class="h-12 w-12 flex items-center justify-center text-gray-600"
              >
                TBD
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teams: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      bracket: {
        prePlayoffs: [],
        achtelfinale: [],
        viertelfinale: new Array(4).fill(null).map(() => [null, null]),
        halbfinale: new Array(2).fill(null).map(() => [null, null]),
        finale: [[null, null]],
      },
      decidedMatches: {}, // Tracks which matches have been decided
      prePlayoffWinners: [], // Stores winners of pre-playoff matches
      viertelfinaleCandidates: [], // Stores winners of Achtelfinale
      halbfinaleCandidates: [], // Stores winners of Viertelfinale
      finaleCandidates: [], // Stores winners of Halbfinale
    };
  },
  created() {
    this.initializeBracket();
  },
  methods: {
    initializeBracket() {
      // Pre-Playoffs
      const prePlayoffs = [
        [this.teams.süd[6], this.teams.süd[9]], // Süd 7 vs Süd 10
        [this.teams.süd[7], this.teams.süd[8]], // Süd 8 vs Süd 9
        [this.teams.nord[6], this.teams.nord[9]], // Nord 7 vs Nord 10
        [this.teams.nord[7], this.teams.nord[8]], // Nord 8 vs Nord 9
      ];
      this.bracket.prePlayoffs = prePlayoffs;

      // Achtelfinale
      const nordTop6 = this.teams.nord.slice(0, 6);
      const südTop6 = this.teams.süd.slice(0, 6);
      const nordPlaceholders = [{ name: "TBD" }, { name: "TBD" }];
      const südPlaceholders = [{ name: "TBD" }, { name: "TBD" }];

      const nordQualified = [...nordTop6, ...nordPlaceholders];
      const südQualified = [...südTop6, ...südPlaceholders];

      const achtelfinale = [
        [nordQualified[0], südQualified[südQualified.length - 1]], // Nord 1 vs Last Süd
        [südQualified[0], nordQualified[nordQualified.length - 1]], // Süd 1 vs Last Nord
        [nordQualified[1], südQualified[südQualified.length - 2]], // Nord 2 vs Second Last Süd
        [südQualified[1], nordQualified[nordQualified.length - 2]], // Süd 2 vs Second Last Nord
        [nordQualified[2], südQualified[5]], // Nord 3 vs Süd 6
        [südQualified[2], nordQualified[5]], // Süd 3 vs Nord 6
        [nordQualified[3], südQualified[4]], // Nord 4 vs Süd 5
        [südQualified[3], nordQualified[4]], // Süd 4 vs Nord 5
      ];
      this.bracket.achtelfinale = achtelfinale;
    },
    advanceTeam(team, round, matchIndex) {
      const matchKey = `${round}-${matchIndex}`;

      if (this.decidedMatches[matchKey]) return;

      this.decidedMatches = {
        ...this.decidedMatches,
        [matchKey]: team.name,
      };

      if (round === "prePlayoffs") {
        if (!this.prePlayoffWinners.includes(team)) {
          this.prePlayoffWinners.push(team);
        }

        if (this.prePlayoffWinners.length === 4) {
          this.assignPrePlayoffWinners();
        }
      } else if (round === "achtelfinale") {
        if (!this.viertelfinaleCandidates.includes(team)) {
          this.viertelfinaleCandidates.push(team);
        }

        if (this.viertelfinaleCandidates.length === 8) {
          this.assignViertelfinale();
        }
      } else if (round === "viertelfinale") {
        if (!this.halbfinaleCandidates) this.halbfinaleCandidates = [];
        if (!this.halbfinaleCandidates.includes(team)) {
          this.halbfinaleCandidates.push(team);
        }

        if (this.halbfinaleCandidates.length === 4) {
          this.assignHalbfinale();
        }
      } else if (round === "halbfinale") {
        if (!this.finaleCandidates) this.finaleCandidates = [];
        if (!this.finaleCandidates.includes(team)) {
          this.finaleCandidates.push(team);
        }

        if (this.finaleCandidates.length === 2) {
          this.assignFinale();
        }
      }
    },
    assignPrePlayoffWinners() {
      // Separate Nord and Süd teams from prePlayoffWinners
      const nordTeams = this.prePlayoffWinners.filter((team) =>
        this.teams.nord.some((nordTeam) => nordTeam.name === team.name)
      );
      const südTeams = this.prePlayoffWinners.filter((team) =>
        this.teams.süd.some((südTeam) => südTeam.name === team.name)
      );

      // Sort both groups by their seed (lower is better)
      nordTeams.sort((a, b) => b.seed - a.seed);
      südTeams.sort((a, b) => b.seed - a.seed);

      // Create an alternating order: odd (Nord), even (Süd)
      const alternatingOrder = [];
      for (let i = 0; i < Math.max(nordTeams.length, südTeams.length); i++) {
        if (südTeams[i]) alternatingOrder.push(südTeams[i]); // Even positions: Süd
        if (nordTeams[i]) alternatingOrder.push(nordTeams[i]); // Odd positions: Nord
      }

      // Update prePlayoffWinners with the new order
      this.prePlayoffWinners = alternatingOrder;

      // Debugging logs
      console.log("Nord Teams:", nordTeams);
      console.log("Süd Teams:", südTeams);
      console.log("Final Alternating Order:", this.prePlayoffWinners);

      const sortedWinners = this.prePlayoffWinners;

      this.bracket.achtelfinale[0][1] = sortedWinners[0]; // Worst seed plays Nord #1 (Tilburg)
      this.bracket.achtelfinale[1][1] = sortedWinners[1]; // Second worst seed plays Süd #1 (Bietigheim)
      this.bracket.achtelfinale[2][1] = sortedWinners[2]; // Second best seed plays Nord #2 (Hannover Scorpions)
      this.bracket.achtelfinale[3][1] = sortedWinners[3]; // Best seed plays Süd #2 (Heilbronn)

      this.prePlayoffWinners = [];
    },
    assignViertelfinale() {
      this.viertelfinaleCandidates.sort((a, b) => {
        return a.seed - b.seed;
      });

      const sortedCandidates = this.viertelfinaleCandidates;
      this.bracket.viertelfinale[0] = [
        sortedCandidates[0],
        sortedCandidates[7],
      ];
      this.bracket.viertelfinale[1] = [
        sortedCandidates[1],
        sortedCandidates[6],
      ];
      this.bracket.viertelfinale[2] = [
        sortedCandidates[2],
        sortedCandidates[5],
      ];
      this.bracket.viertelfinale[3] = [
        sortedCandidates[3],
        sortedCandidates[4],
      ];

      this.viertelfinaleCandidates = [];
    },

    assignHalbfinale() {
      this.halbfinaleCandidates.sort((a, b) => {
        return a.seed - b.seed;
      });

      const sortedCandidates = this.halbfinaleCandidates;
      this.bracket.halbfinale[0] = [sortedCandidates[0], sortedCandidates[3]]; // Best vs Worst
      this.bracket.halbfinale[1] = [sortedCandidates[1], sortedCandidates[2]]; // Second best vs Third best

      this.halbfinaleCandidates = [];
    },

    assignFinale() {
      this.finaleCandidates.sort((a, b) => {
        return a.seed - b.seed;
      });

      const sortedCandidates = this.finaleCandidates;
      this.bracket.finale[0] = [sortedCandidates[0], sortedCandidates[1]]; // Best vs Second best

      this.finaleCandidates = [];
    },
    resetBracket() {
      this.decidedMatches = {}; // Clear all decided matches
      this.prePlayoffWinners = []; // Clear pre-playoff winners
      this.viertelfinaleCandidates = []; // Clear Viertelfinale candidates
      this.halbfinaleCandidates = []; // Clear Halbfinale candidates
      this.finaleCandidates = []; // Clear Finale candidates

      // Reinitialize the bracket
      this.bracket = {
        prePlayoffs: [
          [this.teams.süd[6], this.teams.süd[9]], // Süd 7 vs Süd 10
          [this.teams.süd[7], this.teams.süd[8]], // Süd 8 vs Süd 9
          [this.teams.nord[6], this.teams.nord[9]], // Nord 7 vs Nord 10
          [this.teams.nord[7], this.teams.nord[8]], // Nord 8 vs Nord 9
        ],
        achtelfinale: [
          [this.teams.nord[0], { name: "TBD" }], // Nord 1 vs TBD
          [this.teams.süd[0], { name: "TBD" }], // Süd 1 vs TBD
          [this.teams.nord[1], { name: "TBD" }], // Nord 2 vs TBD
          [this.teams.süd[1], { name: "TBD" }], // Süd 2 vs TBD
          [this.teams.nord[2], this.teams.süd[5]], // Nord 3 vs Süd 6
          [this.teams.süd[2], this.teams.nord[5]], // Süd 3 vs Nord 6
          [this.teams.nord[3], this.teams.süd[4]], // Nord 4 vs Süd 5
          [this.teams.süd[3], this.teams.nord[4]], // Süd 4 vs Nord 5
        ],
        viertelfinale: new Array(4).fill(null).map(() => [null, null]),
        halbfinale: new Array(2).fill(null).map(() => [null, null]),
        finale: [[null, null]],
      };

      // Debugging log
      console.log("Bracket has been reset.");
    },
  },
};
</script>
