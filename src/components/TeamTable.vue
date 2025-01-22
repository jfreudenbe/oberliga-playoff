<template>
  <div>
    <h2 class="font-bold text-3xl text-gray-800 mb-4">Tabellen</h2>
    <table
      class="table-auto w-full border-collapse border border-gray-300 mb-6 max-w-fit"
    >
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 px-4 py-2">Seed</th>
          <th class="border border-gray-300 px-4 py-2">Team Name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="team in teams.nord"
          :key="team.name"
          class="hover:bg-gray-100"
        >
          <td class="border border-gray-300 px-4 py-2 text-center text-xs">
            {{ team.seed }}
          </td>

          <td class="border border-gray-300 px-4 py-2 text-xs">
            {{ team.name }}
          </td>
        </tr>
      </tbody>
    </table>

    <table
      class="table-auto w-full border-collapse border border-gray-300 max-w-fit"
    >
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 px-4 py-2">Seed</th>
          <th class="border border-gray-300 px-4 py-2">Team Name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="team in teams.süd"
          :key="team.name"
          class="hover:bg-gray-100"
        >
          <td class="border border-gray-300 px-4 py-2 text-center text-xs">
            {{ team.seed }}
          </td>

          <td class="border border-gray-300 px-4 py-2 text-xs">
            {{ team.name }}
          </td>
        </tr>
      </tbody>
    </table>
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
};
</script>
