<template>
  <div @click="lifeChanger()" :style="{'background-color': this.cellStatuses[this.ID] ? 'lightgreen' :'white'}" class="cell">

  </div>
</template>
<script>
import base from '../main.js'
export default {
  name: 'Cell',
  props: ['ID', 'cellStatuses'],
  methods: {
      lifeChanger: function(){
          this.alive == true ? this.alive=false : this.alive=true;
          this.$emit("lifeChanger", this.alive)
      }
  }
}
</script>
<style scoped>
    .cell{
        width: 100%;
        height: 100%;
    }
    .cell:hover{
        background-color: steelblue !important;
    }
</style>
