<template>
  <div class="">
    <div class="flex gap-x-12 flex-col">
      <TeamTable :teams="teams" class="mt-12 md:mt-0 w-screen" />
      <div class="w-screen order-first">
        <PlayoffTree :teams="teams" />
      </div>
    </div>
  </div>
</template>

<script>
import TeamTable from "./components/TeamTable.vue";
import PlayoffTree from "./components/PlayoffTree.vue";
import teamsData from "./teams.json";

export default {
  name: "App",
  components: {
    PlayoffTree,
    TeamTable,
  },
  data() {
    return {
      teams: teamsData,
      bracket: {
        prePlayoffs: [],
        achtelfinale: [],
        viertelfinale: new Array(4).fill([null, null]),
        halbfinale: new Array(2).fill([null, null]),
        finale: [[null, null]],
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
