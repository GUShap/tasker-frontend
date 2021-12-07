<template>
  <section @click="editStatus" class="member-picker">
    <section v-if="!edit">
      <section v-if="!members">
        <avatar :size="25" username="i" />
      </section>
      <avatar
        v-else
        v-for="member in members"
        :size="25"
        :username="member"
        :key="member._id"
      />
    </section>
    <ul v-if="edit" @blur="editStatus" class="status-modal">
      <li
        v-for="(member, idx) in members"
        :key="idx"
        class="flex justify-center align-center"
      >
        <section>
          <avatar :size="25" :username="member" :key="member._id"></avatar>
          {{ member }}
        </section>
      </li>
      <li @click.prevent.stop="editStatus"><button>Edit</button></li>
    </ul>
  </section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  components: { Avatar },
  props: ["info"],
  data() {
    return {
      members: null,
      edit: false,
    };
  },
  created() {
    this.members = this.info.members
      ? this.info.members.map((member) => member.username)
      : null;
  },
  methods: {
    editStatus() {
      this.edit = !this.edit;
    },
  },
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