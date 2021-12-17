<template>
<div class="min-h-screen bg-base_gray mx-auto text-white">
  <canvasDrawing />
</div>
</template>

<script>
import canvasDrawing from "@/components/canvasDrawing.vue";
export default {
  name: "Home",
  components: {
    canvasDrawing
  },
  data() {
    return {};
  },
  methods: {}
};
</script>