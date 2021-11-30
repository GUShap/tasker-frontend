<template>
  <section>
    <h1>group</h1>
    <section v-for="(group, idx) in currBoard.groups" :key="idx">
      <group :group="group" />
    </section>
  </section>
</template>

<script>
import { board } from "../../database.js";
import group from "@/cmps/group.vue";

export default {
  components: {group},
  props: [],

  data() {
    return {
      currBoard: board,
    };
  },
  created() {},
  methods: {},
  computed: {},
  destroyed() {},
};
</script>