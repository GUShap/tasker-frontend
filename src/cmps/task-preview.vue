<template>
  <section class="task-preview flex align-center space-between">
    <input @change="change" type="text" name="" v-model="task.title">
    <div v-for="(member, idx) in members" :key="idx">
      {{ member }}
    </div>
    <div>{{ task.labelIds }}</div>
  </section>
</template>

<script>
export default {
  name:'task-preview',
  components: {},
  props: ["task"],

  data() {
    return {};
  },
  created() {},
  methods: {
    change(){
      console.log('task',this.task.title);
    }
  },
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