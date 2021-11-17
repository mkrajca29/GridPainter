<template>
  <div id="app">
    <button @click="grid01 = !grid01">01</button>
    <button @click="grid02 = !grid02">02</button>
    <button @click="grid03 = !grid03">03</button>
    <button @click="grid04 = !grid04">04</button>
    <button @click="grid05 = !grid05">05</button>
    <button @click="grid06 = !grid06">06</button>
    <button @click="grid07 = !grid07">07</button>
    <br />
    <div class="container">
      <button @click="addToEnd">ADD</button>
    </div>
    <GridPainter
      v-for="(item, index) in pole"
      :key="item"
      :GridIndex="pole[index]"
      Speed="10"
      GridColor="green"
      Gap="0"
    />
    <GridPainter
      v-if="grid01"
      class="on-load"
      GridIndex="5"
      Speed="10"
      GridColor="green"
      Gap="0"
    />
    <GridPainter
      v-if="grid02"
      class="on-load"
      GridIndex="5"
      Speed="1"
      GridColor="yellow"
      Gap="2"
    />
    <GridPainter
      v-if="grid03"
      class="on-load"
      GridIndex="5"
      Speed="5"
      GridColor="#424950"
      Gap="1"
    />
    <GridPainter
      v-if="grid04"
      class="on-load"
      GridIndex="5"
      Speed="10"
      GridColor="#ffffff00"
      Gap="3"
    />
    <GridPainter
      v-if="grid05"
      class="on-load"
      GridIndex="6"
      Speed="10"
      GridColor="#ffffff00"
      Gap="0"
    />
    <GridPainter v-if="grid06" class="on-load" GridIndex="5" />
    <GridPainter v-if="grid07" ref="blabla" class="on-load" GridIndex="0" />
  </div>
</template>

<script>
/* import GridPainter from "./components/GridPainter.vue"; */
import ScrollOut from "scroll-out";

export default {
  name: "App",
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    GridPainter: () => import("./components/GridPainter.vue")
  },
  data() {
    return {
      grid01: false,
      grid02: false,
      grid03: false,
      grid04: false,
      grid05: false,
      grid06: false,
      grid07: false,

      scrolled: false,

      pole: ["5"]
    };
  },
  mounted() {
    ScrollOut({
      targets: ".on-load",
      once: true
    });
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },
    addToEnd() {
      let random = Math.floor(Math.random() * 4);
      this.pole.push(String(random));
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  background: #424950;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  padding: 50px;
}

[data-scroll] {
  transition: opacity 1s;
}
[data-scroll="in"] {
  opacity: 1;
}
[data-scroll="out"] {
  opacity: 0;
}
</style>
