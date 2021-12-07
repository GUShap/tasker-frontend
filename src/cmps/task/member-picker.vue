<template>
  <section @click="editStatus" class="member-picker">
    <section>
      <section v-if="!selectedMembers">-</section>
      <avatar
        v-else
        v-for="member in selectedMembers"
        :size="25"
        :username="member.fullname"
        :src="require(`@/pics/${member.imgUrl}`)"
        :key="member._id"
      />
    </section>
    <section v-if="isEditMode" @blur="editStatus" class="member-modal">
      <section class="selected-members">
        <div v-for="member in selectedMembers" :key="member._id">
          <avatar
            :size="25"
            :username="member.fullname"
            :src="require(`@/pics/${member.imgUrl}`)"
            :key="member._id"
          ></avatar>
          {{ member.fullname }}
          <button @click.prevent.stop="removeMember(member)">x</button>
        </div>
      </section>
      <br />
      <hr />
      <ul>
        <li
          v-for="(member, idx) in membersList"
          :key="idx"
          :value="member"
          @click.prevent.stop="addMember(member)"
          class="flex justify-center align-center"
        >
          <div>
            <avatar
              :size="25"
              :username="member.fullname"
              :src="require(`@/pics/${member.imgUrl}`)"
              :key="member._id"
            ></avatar>
          </div>
          <div>{{ member.fullname }}</div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import Avatar from "vue-avatar";

export default {
  components: { Avatar },
  props: ["info", "boardMembers"],
  data() {
    return {
      isEditMode: false,
      selectedMembers: null,
    };
  },
  created() {
    this.selectedMembers = this.info.members;
  },
  methods: {
    editStatus() {
      this.isEditMode = !this.isEditMode;
    },
    addMember(member) {
      console.log("label", member);
      this.selectedMembers.push(member);
    },
    removeMember(member) {
      console.log("label", member);
      const idx = this.selectedMembers.indexOf(member);
      this.selectedMembers.splice(idx, 1);
    },
  },
  computed: {
    membersList() {
      if (!this.selectedMembers) {
        return this.boardMembers;
      } else {
        const selectedUser = this.selectedMembers.map(m=>m.fullname);
        
        const membersList = this.boardMembers.filter((member) => {
          return !selectedUser.includes(member.fullname);
        });
        return membersList;
      }
    },
  },
  destroyed() {},
};
</script>