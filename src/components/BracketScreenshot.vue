<template>
  <button
    class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
    @click="downloadBracket"
  >
    Download Bracket
  </button>
</template>

<script>
import { toJpeg } from "html-to-image";

export default {
  methods: {
    downloadBracket() {
      const bracket = document.getElementById("bracket");
      toJpeg(bracket).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "playoff-bracket.jpg";
        link.href = dataUrl;
        link.click();
      });
    },
  },
};
</script>
