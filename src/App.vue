<template>
  <div class="p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SeedTable :teams="seededTeams" />
      <PlayoffTree
        :rounds="playoffRounds"
        @update-rounds="updateRounds"
        @simulate="simulatePlayoffs"
      />
    </div>
    <BracketScreenshot />
  </div>
</template>

<script>
import SeedTable from "./components/SeedTable.vue";
import PlayoffTree from "./components/PlayoffTree.vue";
import BracketScreenshot from "./components/BracketScreenshot.vue";
import { generateSeeding, simulatePlayoffs } from "./utils/seeding";

import teams from "./teams.json";

export default {
  components: { SeedTable, PlayoffTree, BracketScreenshot },
  data() {
    return {
      teams,
      playoffRounds: [],
    };
  },
  computed: {
    seededTeams() {
      return generateSeeding(this.teams);
    },
  },
  methods: {
    updateRounds({ roundIndex, matchIndex, winner }) {
      this.playoffRounds[roundIndex + 1][matchIndex] = winner;
    },
    simulatePlayoffs() {
      this.playoffRounds = simulatePlayoffs(this.seededTeams);
    },
  },
};
</script>
