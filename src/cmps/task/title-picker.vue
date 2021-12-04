<template>
  <div
    @mouseover="hover = true"
    @mouseleave="hover = false"
    class="title-picker flex grow-2"
    @click.prevent.stop="openDetails"
  >
    <span v-if="!edit">{{ title }}</span>
    <input
      v-on:keyup.enter="editTitle"
      @blur="{edit = false}"
      v-else
      v-model="title"
    />
    <button v-if="hover && !edit" @click.stop.prevent="editTitle" class="btn-edit">Edit</button>
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
      this.edit = !this.edit;
    },
  },
  computed: {},
  destroyed() {},
};
</script>