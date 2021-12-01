<template>
  <section>
    <template v-for="group in currGroups" >
      <group-preview v-show="groupShow" :group="group" :key="group.id"/>
    </template>
  </section>
</template>

<script>
import groupPreview from "@/cmps/group-preview.vue";

export default {
  name: "group-list",
  components: {
    groupPreview,
  },
  props: ["groups"],
  data() {
    return {
      groupShow: true,
    };
  },
  created() {},
  methods: {
    showGroup() {
      this.groupShow = !this.groupShow;
    },
  },
  computed: {
    currGroups() {
      const currGroups = this.groups;
      if (currGroups) {
        return currGroups;
      } else {
        return null;
      }
    },
  },
  destroyed() {},
};
</script>