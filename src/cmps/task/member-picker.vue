<template>
  <div  @click="editStatus('edit')" class="member-picker">
    <section v-if="!edit">
      <avatar
        v-for="member in members"
        :size="25"
        :username="member"
        :key="member._id"
      ></avatar>
    </section>
    <ul v-if="edit" @blur="editStatus('edit')" class="status-modal">
      <li v-for="member in members" :key="member._id" class="flex justify-center align-center">
        <div >
      <avatar
        :size="25"
        :username="member"
        :key="member._id"
      ></avatar>
      </div>
      {{member}}
      </li>
      <li @click.prevent.stop="editStatus"><button>Edit</button></li>
    </ul>
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
      console.log('label');
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