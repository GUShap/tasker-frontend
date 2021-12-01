<template>
  <section class="task-preview flex align-center space-between">
    <el-input @change="change" type="text" name="" v-model="task.title"/>
    <div v-for="(member, idx) in members" :key="idx">
      {{ member }}
    </div>
    <el-select v-model="labels">
      <el-option label=" " value="empty"></el-option>
      <el-option label="Working on it" value="working"></el-option>
      <el-option label="Done" value="done"></el-option>
      <el-option label="Stuck" value="stuck"></el-option>
    </el-select>
    <div>{{ task.labelIds }}</div>
  </section>
</template>

<script>
export default {
  name:'task-preview',
  components: {},
  props: ["task"],

  data() {
    return {
      labels : 'empty'
    };
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