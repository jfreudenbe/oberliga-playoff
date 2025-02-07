<template class="w-screen">
  <div class="">
    <Hero />
    <div class="flex gap-x-12 flex-col">
      <TeamTable :teams="teams" />
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
import Hero from "./components/Hero.vue";

export default {
  name: "App",
  components: {
    Hero,
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
};
</script>
