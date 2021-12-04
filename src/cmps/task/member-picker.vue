<template>
  <div class="member-picker">
    <section>
        <avatar v-for="member in members" :size="25" :username="member" :key="member._id"></avatar>
    </section>
  </div>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  components: { Avatar },
  props: ["info"],
  data() {
    return {
      members: null,
    };
  },
  created() {
    this.members = this.info.members
      ? this.info.members.map((member) => member.username)
      : null;
  },
  methods: {},
  computed: {
    membersInfo() {
      this.members = this.info.members
        ? this.info.members.map((member) => member.username)
        : null;
    },
  },
  destroyed() {},
};
</script>