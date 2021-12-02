<template>
  <div
    @mouseover="hover = true"
    @mouseleave="hover = false"
    class="title-picker"
    @click="openDetails"
  >
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
    <button v-if="hover && !edit" @click.stop.prevent="editTitle">Edit</button>
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
      if(this.edit) return
      this.$router.push(`/board/task/${this.info.id}`);
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