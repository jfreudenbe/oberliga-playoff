<template>
  <h2
    class="font-bold text-2xl text-gray-800 mb-4 mt-24 md:text-left text-center px-4"
  >
    Tabellen
  </h2>
  <div
    class="px-4 pb-2 flex text-xs md:text-sm justify-center md:justify-start"
  >
    <h3 class="bg-green-100 text-green-700 rounded-md px-2 py-0.5 mr-2">
      Direkte Playoff Qualifikation
    </h3>
    <h3 class="bg-blue-100 text-blue-700 rounded-md px-2 py-0.5">
      Pre Playoffs
    </h3>
  </div>

  <div
    class="grid grid-cols-1 md:grid-cols-2 gap-x-2 mx-auto md:mx-0 md:max-w-xl px-4 pb-4"
  >
    <table
      class="table-auto w-full border-collapse border border-gray-300 mb-6 md:max-w-72"
    >
      <thead class="bg-gray-200 border-b border-gray-300">
        <tr>
          <th class="px-4 py-2 text-gray-700">Seed</th>
          <th class="px-4 py-2 text-gray-700">Team Name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="team in teams.nord"
          :key="team.name"
          class="hover:bg-gray-200 odd:bg-gray-100"
        >
          <td
            class="px-4 py-2 text-center text-xs text-gray-600"
            :class="{
              'bg-green-200 text-green-900': team.seed <= 12,
              'bg-blue-200 text-blue-900': team.seed > 12 && team.seed <= 20,
            }"
          >
            {{ team.seed }}
          </td>

          <td
            class="px-4 py-2 text-xs text-gray-600 flex justify-between items-center relative group"
          >
            <p>{{ team.name }}</p>
            <div v-if="team.locked" class="text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              <!-- Tooltip -->
              <div
                class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                {{ team.name }} will stay at seed {{ team.seed }}.
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <table class="table-auto w-full border border-gray-300 md:max-w-64">
      <thead class="bg-gray-200 border-b border-gray-300">
        <tr>
          <th class="px-4 py-2 text-gray-700">Seed</th>
          <th class="px-4 py-2 text-gray-700">Team Name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="team in teams.süd"
          :key="team.name"
          class="hover:bg-gray-200 odd:bg-gray-100"
        >
          <td
            class="px-4 py-2 text-center text-xs text-gray-600"
            :class="{
              'bg-green-200 text-green-900': team.seed <= 12,
              'bg-blue-200 text-blue-900': team.seed > 12 && team.seed <= 20,
            }"
          >
            {{ team.seed }}
          </td>

          <td
            class="border-gray-300 px-4 py-2 text-xs text-gray-600 flex justify-between relative group"
          >
            <p>{{ team.name }}</p>
            <div v-if="team.locked" class="text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              <!-- Tooltip -->
              <div
                class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                {{ team.name }} will stay at seed {{ team.seed }}.
              </div>
            </div>
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
