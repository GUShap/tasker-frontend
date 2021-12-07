
<template>
  <div class="card-list-container">
    <Container
      drag-class="card-ghost"
      drop-class="card-ghost-drop"
      :get-child-payload="getChildPayload1"
      group-name="1"
      @drop="onDrop('listOne', $event)"
    >
      <Draggable v-for="(item, idx) in listOne" :key="idx">
        <div>{{ item }}</div>
      </Draggable>
    </Container>


    <Container
      drag-class="card-ghost"
      drop-class="card-ghost-drop"
      :drop-placeholder="dropPlaceholderOptions"
      :get-child-payload="getChildPayload2"
      group-name="1"
      @drop="onDrop('listTwo', $event)"
    >
      <Draggable v-for="(item, idx) in listTwo" :key="idx">
        <div>{{ item }}</div>
      </Draggable>
    </Container>
  </div>
</template>
<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag } from "./card-helper.js";
export default {
  name: "CardList",
  components: {
    Container,
    Draggable,
  },
  data() {
    return {
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: false,
      },
      listOne: [
        {
          id: 0,
          text: `List 1 Text 0`,
        },
        {
          id: 1,
          text: `List 1 Text 1`,
        },
        {
          id: 2,
          text: `List 1 Text 2`,
        },
        {
          id: 3,
          text: `List 1 Text 3`,
        },
      ],
      listTwo: [
        {
          id: 2123,
          text: `List 2 Text 0`,
        },
        {
          id: 1515,
          text: `List 2 Text 1`,
        },
        {
          id: 254323,
          text: `List 2 Text 2`,
        },
        {
          id: 3235,
          text: `List 2 Text 3`,
        },
      ],
    };
  },
  methods: {
    onDrop(collection, dropResult) {
      console.log('collection',collection ,dropResult);
      this[collection] = applyDrag(this[collection], dropResult);
    },
    getChildPayload1(index) {

      return this.listOne[index];
    },
    getChildPayload2(index) {

      return this.listTwo[index];
    },

  },
};
</script>
<style scoped>
.card-list-container {
  display: flex;
  justify-content: space-evenly;
}
.smooth-dnd-container {
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: 40%;
  flex: 0 0 40%;
  height: 100%;
  border: 1px solid #dcebf4;
  border-radius: 6px;
  padding: 1rem 1rem 0 1rem;
  margin-top: 5rem;
  margin-right: 2.5rem;
  margin-left: 1rem;
}
.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg);
}
.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}
</style>
view rawCardListFinal.vue hosted with ❤ by GitHub