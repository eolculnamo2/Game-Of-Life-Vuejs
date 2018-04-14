<template>
  <div id="app">
    <div id="title-container">
      <img src="./assets/logo.png">
      <h1>
        Game of Life
      </h1>
    </div>
    <Grid @upTheTree="passing($event)" :cellStatuses="cellStatuses"/>
  </div>
</template>

<script>
import Grid from './components/Grid'

export default {
  props: ['test','cellStatuses'],
  name: 'App',
  components: {
    Grid
  },
  methods: {
    passing: function(x){
      this.$emit('finalStep', x)
    }
  }
}
</script>

<style>
#title-container{
  display: flex;
}
h1{
  align-self: center;
}
</style>
