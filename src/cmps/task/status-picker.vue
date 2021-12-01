<template>
  <div class="tag corner" :class="status">
    {{ status }}
  </div>
</template>

<script>
export default {
  components: {},
  props: ["info"],
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    status(){
      return this.info.labelId ? this.info.labelId[0] : '' ;
    }
  },
  destroyed() {},
};
</script>