<template>
  <h2
    class="font-bold text-2xl text-gray-800 mb-4 mt-24 md:text-left text-center"
  >
    Tabellen
  </h2>

  <div
    class="grid grid-cols-1 md:grid-cols-2 gap-x-12 mx-auto md:mx-0 md:max-w-lg"
  >
    <table
      class="table-auto w-full border-collapse border border-gray-300 mb-6 md:max-w-64"
    >
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-gray-700">Seed</th>
          <th class="border border-gray-300 px-4 py-2 text-gray-700">
            Team Name
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="team in teams.nord"
          :key="team.name"
          class="hover:bg-gray-100"
        >
          <td
            class="border border-gray-300 px-4 py-2 text-center text-xs text-gray-600"
          >
            {{ team.seed }}
          </td>

          <td class="border border-gray-300 px-4 py-2 text-xs text-gray-600">
            {{ team.name }}
          </td>
        </tr>
      </tbody>
    </table>

    <table
      class="table-auto w-full border-collapse border border-gray-300 md:max-w-64"
    >
      <thead class="bg-gray-200">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-gray-700">Seed</th>
          <th class="border border-gray-300 px-4 py-2 text-gray-700">
            Team Name
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="team in teams.süd"
          :key="team.name"
          class="hover:bg-gray-100"
        >
          <td
            class="border border-gray-300 px-4 py-2 text-center text-xs text-gray-600"
          >
            {{ team.seed }}
          </td>

          <td class="border border-gray-300 px-4 py-2 text-xs text-gray-600">
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
