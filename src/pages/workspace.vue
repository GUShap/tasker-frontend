<template>
  <section>
    <header class="board-header">
      <div class="board-details">
          <unicon name="car-wash" fill="limegreen"></unicon>
        <a>Share</a>
        <a>Proj Name</a>
        <a>show/hide</a>
        <a>star</a>
      </div>
      <div class="more-actions">
        <a>Last seen</a>
        <a>Invite</a>
        <a>Activities</a>
        <a>+</a>
        <a>...</a>
      </div>
    </header>
    <board-filter />
    <group-list />
  </section>
</template>

<script>
import boardFilter from "@/cmps/board-filter.vue";
import groupList from "@/cmps/group-list.vue";
export default {
  components: {
    boardFilter,
    groupList,
  },
  props: [],
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
  destroyed() {},
};
</script>