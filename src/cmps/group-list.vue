<template>
  <section class="group flex column align-center">
    <div class="flex align-center justify-center">
      <font-awesome-icon icon="user-secret" />
      <div>{{ currGroup.title }}</div>
    </div>
    <section
      v-for="(task, idx) in currGroup.tasks"
      :key="currGroup.tasks[idx].id"
      class="flex row align-center"
    >
      <div>{{ task.title }}</div>
    </section>
  </section>
</template>

<script>
export default {
  components: {},
  props: ["group"],
  data() {
    return {
      currGroup: null,
    };
  },
  created() {
    this.currGroup = this.group;
    console.log(this.group);
  },
  methods: {},
  computed: {},
  destroyed() {},
};
</script>