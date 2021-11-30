<template>
  <section class="task-preview flex align-center space-between">
    <div>{{ task.title }}</div>
    <div v-for="(member, idx) in members" :key="idx">
      {{ member }}
    </div>
    <div>{{ task.labelIds }}</div>
  </section>
</template>

<script>
export default {
  components: {},
  props: ["task"],

  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    members() {
      const members = this.task.members;
      if (members) {
        return members.map((member) => {
          return member.fullname;
        });
      }
    },
  },
  destroyed() {},
};
</script>