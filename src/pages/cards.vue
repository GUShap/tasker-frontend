<template>
  <div class="groups">
    <div class="group">
      <Container  :get-child-payload="getChildPayload1" @drop="onDrop('items1', $event)">
        <Draggable v-for="item in items1" :key="item.id">
          <div >
            {{item.data}}
          </div>
        </Draggable>
      </Container>
    </div>
    <div class="group">
      <Container  :get-child-payload="getChildPayload2" @drop="onDrop('items2', $event)">
        <Draggable v-for="item in items2" :key="item.id">
          <div >
            {{item.data}}
          </div>
        </Draggable>
        
      </Container>
    </div>
 
   
  </div>
</template>

<script>
import { Container, Draggable, smoothDnD } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from './card-helper'
export default {
  name: 'Groups',
  components: {Container, Draggable},
  data () {
    return {
      items1: generateItems(15, i => ({
        id: '1' + i,
        data: `ishay 1 - ${i}`
      })),
      items2: generateItems(15, i => ({
        id: '2' + i,
        data: `guy 2 - ${i}`
      })),
    }
  },
  methods: {
    onDrop (collection, dropResult) {
      this[collection] = applyDrag(this[collection], dropResult)
    },
    getChildPayload1 (index) {
      return this.items1[index]
    },
    getChildPayload2 (index) {
      return this.items2[index]
    },
  }
}
</script>

<style lang="css" scoped>
  .groups {
    display: flex;
    justify-content: stretch;
    margin-top: 50px;
    margin-left: 200px;
  }
  .group {
    margin-left: 50px;
    flex: 1;
  }
</style>