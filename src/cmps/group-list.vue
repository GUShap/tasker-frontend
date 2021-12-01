<template>
  <section>
    <div v-for="group in groups" :key="group.id">
      <group-preview v-show="groupShow" :group="group"/>
    </div>
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
  computed: {},
  destroyed() {},
};
</script>