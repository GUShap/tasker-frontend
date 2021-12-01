<template>
  <section class="board-container">
    <template v-for="group in currGroups">
      <board-gruop :group="group" :key="group.id" />
    </template>
                <router-view></router-view>

  </section>
</template>

<script>
// import { board } from "../../database.js";
import boardGruop from "@/cmps/group/board-group.vue";

export default {
  name: "main-board",
  components: {
    boardGruop,
  },
  props: ["board"],

  data() {
    return {
      groups: null,
    };
  },
  created() {},
  methods: {},
  computed: {
    currGroups() {
     this.groups = this.board ? this.board.groups : null;
     return this.groups
    },
  },
  destroyed() {},
};
</script>