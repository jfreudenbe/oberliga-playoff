<template>
  <div class="overflow-x-auto">
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 px-4 py-2">Seed</th>
          <th class="border border-gray-300 px-4 py-2">Logo</th>
          <th class="border border-gray-300 px-4 py-2">Team Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in teams" :key="team.name" class="hover:bg-gray-100">
          <td class="border border-gray-300 px-4 py-2 text-center">
            {{ team.seed }}
          </td>
          <td class="border border-gray-300 px-4 py-2 text-center">
            <img :src="team.logo" :alt="team.name" class="h-10 mx-auto" />
          </td>
          <td class="border border-gray-300 px-4 py-2">{{ team.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    teams: {
      type: Array,
      required: true,
    },
  },
};
</script>
