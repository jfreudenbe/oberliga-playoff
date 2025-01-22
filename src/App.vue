<template>
  <div class="p-4">
    <div class="flex gap-x-12 md:flex-row flex-col">
      <TeamTable :teams="teams" class="md:w-1/4 w-full mt-12 md:mt-0" />
      <div class="w-full md:w-3/4 order-first md:order-last">
        <PlayoffTree :teams="teams" />
      </div>
    </div>
  </div>
</template>

<script>
import TeamTable from "./components/TeamTable.vue";
import PlayoffTree from "./components/PlayoffTree.vue";
import { generateBracket } from "./utils.js";
import teamsData from "./teams.json";

export default {
  name: "App",
  components: {
    PlayoffTree, // Register the PlayoffTree component here
    TeamTable, // Register the TeamTable component here
  },
  data() {
    return {
      teams: teamsData,
      bracket: {
        prePlayoffs: [], // Placeholder for pre-playoff matches
        achtelfinale: [], // Placeholder for Achtelfinale matches
        viertelfinale: new Array(4).fill([null, null]),
        halbfinale: new Array(2).fill([null, null]),
        finale: [[null, null]], // Placeholder for final match
      },
    };
  },

  methods: {
    simulatePrePlayoffs() {
      this.bracket = generateBracket(this.teams);
    },
  },
};
</script>
