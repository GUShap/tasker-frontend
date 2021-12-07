<template>
  <section @click="editStatus" class="member-picker">
    <section v-if="!isEditMode">
      <section v-if="!info.members">-</section>
      <avatar
        v-else
        v-for="member in selectedMembers"
        :size="25"
        :username="member.fullname"
        :src="require(`@/pics/${member.imgUrl}`)"
        :key="member._id"
      />
    </section>
    <el-select value v-if="isEditMode" @blur="editStatus" class="status-modal">
      <el-option
        v-for="(member, idx) in membersList"
        :key="idx"
        class="flex justify-center align-center"
      >
        <section class="flex">
          <avatar
            :size="25"
            :username="member.fullname"
            :src="require(`@/pics/${member.imgUrl}`)"
            :key="member._id"
          ></avatar>
          <div>{{ member.fullname }}</div>
        </section>
      </el-option>
      <li @click.prevent.stop="editStatus"><button>Edit</button></li>
    </el-select>
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
    };
  },
  created() {},
  methods: {
    editStatus() {
      this.isEditMode = !this.isEditMode;
    },
  },
  computed: {
    selectedMembers() {
      if (this.info.members) {
        return this.info.members;
      } else {
        return null;
      }
    },
    membersList() {
      if (!this.info.members) {
        return this.boardMembers;
      } else {
        console.log("this.selectedMembers", this.selectedMembers);
        console.log("this.selectedMembers", this.boardMembers);
        return this.boardMembers.filter((member) => {
          console.log("label", !this.selectedMembers.includes(member));
          console.log("member", member);
          return !this.selectedMembers.includes(member);
        });
      }
    },
  },
  destroyed() {},
};
</script>