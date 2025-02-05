<template>
  <div
    class="p-4 relative pt-64 mb-20 md:py-36 bg-gray-50 text-balance overflow-hidden"
  >
    <div class="w-full">
      <!-- Image -->

      <h1
        class="md:text-8xl text-5xl font-black text-gray-900 text-center uppercase font-bebas tracking-wide"
      >
        Oberliga Playoff Prediction
      </h1>
      <h2
        class="text-center md:text-2xl text-lg mt-4 md:mt-3 text-gray-700 tracking-tight font-roboto"
      >
        Click on a team’s logo to select a winner.
      </h2>
      <div
        class="flex justify-center mt-12 gap-3 md:gap-6 font-roboto tracking-wider"
      >
        <div
          class="fixed bottom-5 right-5 bg-black px-5 py-2 text-lg font-bold uppercase text-white transition hover:bg-gray-800 hover:cursor-pointer"
          @click="downloadBracket"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div
          class="fixed bottom-5 left-5 bg-red-700 px-5 py-2 text-lg font-bold uppercase text-white transition hover:bg-red-500 hover:cursor-pointer"
          @click="resetBracket"
        >
          Reset
        </div>
      </div>
    </div>
  </div>
  <div>
    <div
      ref="bracket"
      class="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-12 md:mt-12 max-w-screen-2xl p-4 mx-auto"
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
import html2canvas from "html2canvas";

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
    async downloadBracket() {
      const bracketElement = this.$refs.bracket;

      if (!bracketElement) {
        console.error("Bracket element not found!");
        return;
      }

      try {
        // Capture the bracket as a canvas
        const canvas = await html2canvas(bracketElement, {
          scale: 2,
          useCORS: true,
        });

        // Get the canvas dimensions
        const width = canvas.width;
        const height = canvas.height;

        // Create a new canvas to add text
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = width;
        finalCanvas.height = height + 100; // Add space for the text at the bottom
        const ctx = finalCanvas.getContext("2d");

        // Draw the captured canvas onto the new canvas
        ctx.drawImage(canvas, 0, 0);

        // Add the website link below the bracket
        ctx.fillStyle = "gray";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "Made with: https://jfreudenbe.github.io/oberliga-playoff/",
          width / 2,
          height + 50
        );

        // Convert the final canvas to a data URL
        const dataURL = finalCanvas.toDataURL("image/png");

        // Create a link to download the image
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "playoff_bracket.png";
        link.click();
      } catch (error) {
        console.error("Failed to generate bracket image:", error);
      }
    },
  },
};
</script>
