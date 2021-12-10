<template>
  <section @click="editStatus" class="member-picker" v-if="info">
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
    <section v-show="isEditMode" @blur="editStatus" class="member-modal">
      <section class="selected-members">
        <div v-for="member in selectedMembers" :key="member._id">
          <avatar
            :size="22"
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
              v-if="member.imgUrl"
              :size="22"
              :username="member.fullname"
              :src="require(`@/pics/${member.imgUrl}`)"
              :key="member._id"
            ></avatar>
            <!-- <div
              v-else
              :size="22"
              :username="member.fullname"
              class="icon-user"
              :key="member._id"
            ></div> -->
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
  props: ["info"],
  data() {
    return {
      isEditMode: false,
      selectedMembers: null,
      activity: null,
    };
  },
  created() {
    this.selectedMembers = this.info.members || null;
  },
  methods: {
    editStatus() {
      this.isEditMode = !this.isEditMode;
    },
    addMember(member) {
      if (!this.selectedMembers) this.selectedMembers = [];
      // const idx = this.selectedMembers.length;
      this.selectedMembers.push(member);
      this.update();
    },
    removeMember(member) {
      const idx = this.selectedMembers.indexOf(member);
      this.selectedMembers.splice(idx, 1);
      this.update();
    },
    update() {
      const updateInfo = {
        members: this.selectedMembers,
        activity: this.activity,
      };
      this.$emit("updated", updateInfo);
    },
  },
  computed: {
    membersList() {
      if (!this.selectedMembers) {
        return this.info.boardMembers;
      } else {
        const selectedMembersId = this.selectedMembers.map((m) => m._id);
        const membersList = this.info.boardMembers.filter((member) => {
          return !selectedMembersId.includes(member._id);
        });
        return membersList;
      }
    },
  },
  watch: {
    selectedMembers: function (newVal, oldVal) {
      this.activity = { type: "members", newVal, oldVal };
    },
  },
};
</script>