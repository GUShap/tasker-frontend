<template>
  <div>
    <router-link :to="'/board/'+info.id">
      {{ info.title }}
    </router-link>
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
  computed: {},
  destroyed() {},
};
</script>