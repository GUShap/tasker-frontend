<template>
  <section>
    <h1>group List</h1>
    <section v-for="(group, idx) in currBoard.groups" :key="idx">
      <group-list :group="group" />
    </section>
  </section>
</template>

<script>
import { board } from "../../database.js";
import groupList from "@/cmps/group-list.vue";

export default {
  components: {groupList},
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