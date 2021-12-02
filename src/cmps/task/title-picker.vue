<template>
  <div
    @mouseover="hover = true"
    @mouseleave="hover = false"
    class="title-container flex grow-1"
  >
    <!-- @click="openDetails" -->
    <span v-if="!edit">{{ title }}</span>
    <input
      v-on:keyup.enter="editTitle"
      @blur="
        {
          edit = false;
        }
      "
      v-else
      v-model="title"
    />
    <button class="hover-edit-btn" v-if="hover && !edit" @click="editTitle">edit</button>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["info"],
  data() {
    return {
      hover: false,
      edit: false,
      title: this.info.title,
    };
  },
  created() {},
  methods: {
    openDetails() {
      this.$router.push(`'/board/task/' + ${info.id}`);
    },
    editTitle() {
      console.log(this.edit);
      this.edit = !this.edit;
    },
  },
  computed: {},
  destroyed() {},
};
</script>