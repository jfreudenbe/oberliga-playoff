<template class="overflow-x-hidden">
  <div class="flex justify-center gap-3 md:gap-6 font-roboto tracking-wider">
    <div
      class="fixed bottom-5 right-5 bg-gray-900 px-5 py-2 text-lg font-bold uppercase text-white transition hover:bg-gray-800 hover:cursor-pointer z-50"
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
      class="fixed bottom-5 left-5 bg-red-700 px-5 py-2 text-lg font-bold uppercase text-white transition hover:bg-red-500 hover:cursor-pointer z-50"
      @click="resetBracket"
    >
      Reset
    </div>
  </div>
  <div
    ref="bracket"
    class="bg-gray-50 py-12 overflow-x-hidden motion-preset-fade"
  >
    <div
      class="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-12 md:mt-12 max-w-screen-2xl p-4 mx-auto"
    >
      <!-- Pre-Playoffs -->
      <div class="md:max-w-72 motion-preset-slide-up">
        <h3 class="font-semibold text-xl text-center text-gray-700 mb-2">
          Pre-Playoffs (BO3)
        </h3>
        <div
          v-for="(match, index) in bracket.prePlayoffs"
          :key="'pre-' + index"
          class="mb-4"
        >
          <div
            class="flex justify-around items-center p-2 py-3 rounded-md shadow-md bg-white border border-gray-300"
          >
            <!-- Team 1 -->
            <div class="flex flex-col items-center">
              <img
                :src="match[0]?.logo || ''"
                :alt="match[0]?.name || 'TBD'"
                class="h-12 w-12 p-0.5 object-contain cursor-pointer hover:scale-125 transition duration-200 ease-in-out"
                :class="{
                  'saturate-150 pointer-events-none scale-125  ':
                    prePlayoffWinners.get(index) == match[0],
                  'opacity-50 saturate-50':
                    prePlayoffWinners.has(index) &&
                    prePlayoffWinners.get(index) !== match[0],
                }"
                @click="handleLogoClick(match[0], 'PrePlayoffs', index)"
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
                    prePlayoffWinners.get(index) == match[1],
                  'opacity-50 saturate-50':
                    prePlayoffWinners.has(index) &&
                    prePlayoffWinners.get(index) !== match[1],
                }"
                @click="handleLogoClick(match[1], 'PrePlayoffs', index)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Achtelfinale -->
      <div class="md:max-w-72 motion-preset-slide-up">
        <h3 class="font-semibold text-xl text-center text-gray-700 mb-2">
          Achtelfinale (BO5)
        </h3>
        <div
          v-for="(match, index) in bracket.achtelfinale"
          :key="'achtelfinale-' + index"
          class="mb-4"
        >
          <div
            class="flex justify-around items-center p-2 py-3 border border-gray-300 rounded-md shadow-md bg-white"
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
                    viertelfinaleCandidates.get(index) == match[0],
                  'opacity-50 saturate-50':
                    viertelfinaleCandidates.has(index) &&
                    viertelfinaleCandidates.get(index) !== match[0],
                }"
                @click="handleLogoClick(match[0], 'achtelfinale', index)"
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
                    viertelfinaleCandidates.get(index) == match[1],
                  'opacity-50 saturate-50':
                    viertelfinaleCandidates.has(index) &&
                    viertelfinaleCandidates.get(index) !== match[1],
                }"
                @click="handleLogoClick(match[1], 'achtelfinale', index)"
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
      <div class="md:max-w-72 motion-preset-slide-up">
        <h3 class="font-semibold text-xl text-center text-gray-700 mb-2">
          Viertelfinale (BO7)
        </h3>
        <div
          v-for="(match, index) in bracket.viertelfinale"
          :key="'viertelfinale-' + index"
          class="mb-4"
        >
          <div
            class="flex justify-around items-center p-2 py-3 border border-gray-300 rounded-md shadow-md bg-white"
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
                    halbfinaleCandidates.get(index) == match[0],
                  'opacity-50 saturate-50':
                    halbfinaleCandidates.has(index) &&
                    halbfinaleCandidates.get(index) !== match[0],
                }"
                @click="handleLogoClick(match[0], 'viertelfinale', index)"
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
                    halbfinaleCandidates.get(index) == match[1],
                  'opacity-50 saturate-50':
                    halbfinaleCandidates.has(index) &&
                    halbfinaleCandidates.get(index) !== match[1],
                }"
                @click="handleLogoClick(match[1], 'viertelfinale', index)"
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
      <div class="md:max-w-72 motion-preset-slide-up">
        <h3 class="font-semibold text-xl text-center text-gray-700 mb-2">
          Halbfinale (BO7)
        </h3>
        <div
          v-for="(match, index) in bracket.halbfinale"
          :key="'halbfinale-' + index"
          class="mb-4"
        >
          <div
            class="flex justify-around items-center p-2 py-3 border border-gray-300 rounded-md shadow-md bg-white"
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
                    finaleCandidates.get(index) == match[0],
                  'opacity-50 saturate-50':
                    finaleCandidates.has(index) &&
                    finaleCandidates.get(index) !== match[0],
                }"
                @click="handleLogoClick(match[0], 'halbfinale', index)"
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
                    finaleCandidates.get(index) == match[1],
                  'opacity-50 saturate-50':
                    finaleCandidates.has(index) &&
                    finaleCandidates.get(index) !== match[1],
                }"
                @click="handleLogoClick(match[1], 'halbfinale', index)"
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
      <div class="md:max-w-72 motion-preset-slide-up">
        <h3 class="font-semibold text-xl text-center text-gray-700 mb-2">
          Finale (BO7)
        </h3>
        <div v-for="(match, index) in bracket.finale" :key="'finale-' + index">
          <div
            class="flex justify-around items-center p-2 py-3 border border-gray-300 rounded-md shadow-md bg-white"
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
                    winner.get(index) == match[0],
                  'opacity-50 saturate-50':
                    winner.has(index) && winner.get(index) !== match[0],
                }"
                @click="handleLogoClick(match[0], 'finale', index)"
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
                    winner.get(index) == match[1],
                  'opacity-50 saturate-50':
                    winner.has(index) && winner.get(index) !== match[1],
                }"
                @click="handleLogoClick(match[1], 'finale', index)"
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
      prePlayoffWinners: new Map(), // Stores winners of pre-playoff matches
      viertelfinaleCandidates: new Map(), // Stores winners of Achtelfinale
      halbfinaleCandidates: new Map(), // Stores winners of Viertelfinale
      finaleCandidates: new Map(), // Stores winners of Halbfinale
      winner: new Map(),
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
    handleLogoClick(team, round, index) {
      let prePlayoffsComplete = false;
      let viertelfinaleComplete = false;
      let halbfinaleComplete = false;

      if (round === "PrePlayoffs") {
        if (team.name !== 0) {
          if (!this.prePlayoffWinners.has(index)) {
            this.prePlayoffWinners.set(index, team);
          } else {
            this.prePlayoffWinners.delete(index);
            this.prePlayoffWinners.set(index, team);

            if (this.prePlayoffWinners.size === 4) {
              this.assignPrePlayoffWinners();
              this.initializeAchtelfinale();
              this.viertelfinaleCandidates.clear();
              this.initializeViertelfinale();
              this.halbfinaleCandidates.clear();
              this.initializeHalbfinale();
              this.finaleCandidates.clear();
              this.winner.clear();
              this.initializeFinale();
            }
          }
        }

        if (this.prePlayoffWinners.size === 4) {
          prePlayoffsComplete = true;
          this.assignPrePlayoffWinners();
        }
      }

      if (prePlayoffsComplete) {
        this.assignPrePlayoffWinners();
      }

      if (round == "achtelfinale") {
        if (team.name !== "TBD") {
          if (!this.viertelfinaleCandidates.has(index)) {
            this.viertelfinaleCandidates.set(index, team);
          } else {
            this.viertelfinaleCandidates.delete(index);
            this.viertelfinaleCandidates.set(index, team);

            if (this.viertelfinaleCandidates.size === 8) {
              this.assignViertelfinale();
              this.initializeViertelfinale();
              this.halbfinaleCandidates.clear();
              this.initializeHalbfinale();
              this.finaleCandidates.clear();
              this.initializeFinale();
              this.winner.clear();
            }
          }
        }

        if (this.viertelfinaleCandidates.size === 8) {
          this.assignViertelfinale();
        }
      }

      if (round == "viertelfinale") {
        if (team.name !== "TBD") {
          if (!this.halbfinaleCandidates.has(index)) {
            this.halbfinaleCandidates.set(index, team);
          } else {
            this.halbfinaleCandidates.delete(index);
            this.halbfinaleCandidates.set(index, team);

            if (this.viertelfinaleCandidates.size === 8) {
              this.assignHalbfinale();
              this.initializeHalbfinale();
              this.finaleCandidates.clear();
              this.initializeFinale();
              this.winner.clear();
            }
          }
          if (this.halbfinaleCandidates.size === 4) {
            viertelfinaleComplete = true;
            this.assignHalbfinale();
          }
        }
      }

      if (round == "halbfinale") {
        if (team.name !== "TBD") {
          if (!this.finaleCandidates.has(index)) {
            this.finaleCandidates.set(index, team);
          } else {
            this.finaleCandidates.delete(index);

            this.finaleCandidates.set(index, team);

            if (halbfinaleComplete) {
              this.assignFinale();
              this.initializeFinale();
              this.winner.clear();
            }
          }
          if (this.finaleCandidates.size === 2) {
            halbfinaleComplete = true;
            this.assignFinale();
          }
        }
      }

      if (round == "finale") {
        if (team.name !== "TBD") {
          if (!this.winner.has(index)) {
            this.winner.set(index, team);
          } else {
            this.winner.delete(index);
            this.winner.set(index, team);
          }
        }
      }
    },
    assignPrePlayoffWinners() {
      const nordTeams = [];
      const südTeams = [];

      //add index 0 and 1 to südTeams
      südTeams.push(this.prePlayoffWinners.get(0));
      südTeams.push(this.prePlayoffWinners.get(1));

      //add index 2 and 3 to nordTeams
      nordTeams.push(this.prePlayoffWinners.get(2));
      nordTeams.push(this.prePlayoffWinners.get(3));

      if (südTeams[0].seed > südTeams[1].seed) {
        südTeams.reverse();
      }

      if (nordTeams[0].seed > nordTeams[1].seed) {
        nordTeams.reverse();
      }

      this.bracket.achtelfinale[0][1] = südTeams[1]; // Worst seed plays Nord #1 (Tilburg)
      this.bracket.achtelfinale[1][1] = nordTeams[1]; // Second worst seed plays Süd #1 (Bietigheim)
      this.bracket.achtelfinale[2][1] = südTeams[0]; // Second best seed plays Nord #2 (Hannover Scorpions)
      this.bracket.achtelfinale[3][1] = nordTeams[0]; // Best seed plays Süd #2 (Heilbronn)
    },
    assignViertelfinale() {
      const viertelfinaleTeams = Array.from(
        this.viertelfinaleCandidates.values()
      );

      //sort array by seed
      viertelfinaleTeams.sort((a, b) => {
        return a.seed - b.seed;
      });

      this.bracket.viertelfinale[0] = [
        viertelfinaleTeams[0],
        viertelfinaleTeams[7],
      ];
      this.bracket.viertelfinale[1] = [
        viertelfinaleTeams[1],
        viertelfinaleTeams[6],
      ];
      this.bracket.viertelfinale[2] = [
        viertelfinaleTeams[2],
        viertelfinaleTeams[5],
      ];
      this.bracket.viertelfinale[3] = [
        viertelfinaleTeams[3],
        viertelfinaleTeams[4],
      ];
    },

    assignHalbfinale() {
      const halbfinaleTeams = Array.from(this.halbfinaleCandidates.values());

      halbfinaleTeams.sort((a, b) => {
        return a.seed - b.seed;
      });
      this.bracket.halbfinale[0] = [halbfinaleTeams[0], halbfinaleTeams[3]]; // Best vs Worst
      this.bracket.halbfinale[1] = [halbfinaleTeams[1], halbfinaleTeams[2]]; // Second best vs Third best
    },

    assignFinale() {
      const finaleTeams = Array.from(this.finaleCandidates.values());

      finaleTeams.sort((a, b) => {
        return a.seed - b.seed;
      });

      this.bracket.finale[0] = [finaleTeams[0], finaleTeams[1]]; // Best vs Second best
    },

    initializeAchtelfinale() {
      this.bracket.achtelfinale = [
        [this.teams.nord[0], { name: "TBD" }], // Nord 1 vs TBD
        [this.teams.süd[0], { name: "TBD" }], // Süd 1 vs TBD
        [this.teams.nord[1], { name: "TBD" }], // Nord 2 vs TBD
        [this.teams.süd[1], { name: "TBD" }], // Süd 2 vs TBD
        [this.teams.nord[2], this.teams.süd[5]], // Nord 3 vs Süd 6
        [this.teams.süd[2], this.teams.nord[5]], // Süd 3 vs Nord 6
        [this.teams.nord[3], this.teams.süd[4]], // Nord 4 vs Süd 5
        [this.teams.süd[3], this.teams.nord[4]], // Süd 4 vs Nord 5
      ];
    },

    initializeViertelfinale() {
      this.bracket.viertelfinale = new Array(4)
        .fill(null)
        .map(() => [null, null]);
    },

    initializeHalbfinale() {
      this.bracket.halbfinale = new Array(2).fill(null).map(() => [null, null]);
    },

    initializeFinale() {
      this.bracket.finale = [[null, null]];
    },

    resetBracket() {
      this.prePlayoffWinners.clear();
      this.viertelfinaleCandidates.clear();
      this.halbfinaleCandidates.clear();
      this.finaleCandidates.clear();

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
    },
    async downloadBracket() {
      const bracketElement = this.$refs.bracket;
      if (!bracketElement) {
        console.error("Bracket element not found!");
        return;
      }

      // Collect all elements that might have a class containing "motion-"
      // (Include the bracket element itself plus all descendants)
      const elementsWithMotion = [
        bracketElement,
        ...bracketElement.querySelectorAll('[class*="motion-"]'),
      ];

      // Prepare a list to store removed classes so we can reassign them later.
      const removedMotionClasses = [];

      // Remove all classes containing "motion-" and store them
      elementsWithMotion.forEach((el) => {
        // Find classes that include the substring "motion-"
        const classesToRemove = Array.from(el.classList).filter((cls) =>
          cls.includes("motion-")
        );
        if (classesToRemove.length > 0) {
          removedMotionClasses.push({ element: el, classes: classesToRemove });
          classesToRemove.forEach((cls) => el.classList.remove(cls));
        }
      });

      // Optional: Wait a tick to allow the browser to apply the removal of classes
      await new Promise((resolve) => setTimeout(resolve, 50));

      try {
        // Capture the bracket as a canvas
        const canvas = await html2canvas(bracketElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: null, // keep transparency if desired
        });

        const width = canvas.width;
        const height = canvas.height;

        // Create a new canvas to add extra text below the bracket
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = width;
        finalCanvas.height = height + 100; // extra space for the text at the bottom
        const ctx = finalCanvas.getContext("2d");

        // Draw the captured canvas onto the new canvas
        ctx.drawImage(canvas, 0, 0);

        // Add your website link below the bracket
        ctx.fillStyle = "gray";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "Made with: https://jfreudenbe.github.io/oberliga-playoff/",
          width / 2,
          height + 50
        );

        // Convert the final canvas to a data URL and trigger download
        const dataURL = finalCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "playoff_bracket.png";
        link.click();
      } catch (error) {
        console.error("Failed to generate bracket image:", error);
      } finally {
        // Restore the previously removed "motion-" classes
        removedMotionClasses.forEach(({ element, classes }) => {
          classes.forEach((cls) => element.classList.add(cls));
        });
      }
    },
  },
};
</script>
