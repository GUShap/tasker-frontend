<template>
  <section
    @mouseover="hover = true"
    @mouseleave="hover = false"
    class="title-picker flex grow-2"
    @click.prevent.stop="openDetails"
  >
    <span v-if="!isEditMode">{{ title }}</span>
    <input
      v-on:keyup.enter="editMode"
      @blur="{isEditMode = false}"
      v-else
      v-model="title" 
      @change="update"
    />
    <button v-if="hover && !isEditMode"  @click.stop.prevent="editMode" class="btn-edit">Edit</button>
  </section>
</template>

<script>
export default {
  components: {},
  props: ["info" ],
  data() {
    return {
      hover: false,
      isEditMode: false,
      title: this.info.title,
    };
  },
  created() {
  },
  methods: {
    openDetails() {
      if(this.isEditMode) return
      this.$router.push(`/board/task/${this.info.id}`);
    },
    editMode(val) {
      this.isEditMode = !this.isEditMode;
    },
    update(){
      this.info.title = this.title
      this.$emit('update', this.info)
    }
  },
 
};
</script>