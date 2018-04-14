<template>
  <div>
    
    <div class="button-box">
      <h3 @click="randomize()" >Height</h3>
      <button @click="decrease('x')">Decrease -</button>
      <button @click="increase('x')">Increase +</button>
      <h3>Width</h3>
      <button @click="decrease('y')">Decrease -</button>
      <button @click="increase('y')">Increase +</button>
      <button @click="generate()" class="start">Start</button>
    </div>
    <table>
        <tr :key="'tr'+i" v-for="(row,i) in cellsHigh">
          <th :key="y+'th'+i"  v-for="(cell,y) in cellsWide" >
            <Cell 
              :ID="i*cellsWide.length+y"
              :cellStatuses="cellStatuses"
              @lifeChanger="lifeChanger($event,i*cellsWide.length+y)"
                />
          </th>
        </tr>
    </table>
  </div>
</template>

<script>
import Cell from './Cell'
export default {
  props: ['cellStatuses'],
  name: 'Grid',
  components: { Cell },
  data () {
    return {
        powerSwitch: false,
        speed: 500,
        cellsHigh: Array(10).fill(false),
        cellsWide: Array(10).fill(false),
        living: false,
        ID: 0,
        totalCells: 0
    }
  },
  created: function(){
    this.totalCells=this.cellsHigh.length*this.cellsWide.length;
    this.randomize();
  },
  methods: {
    calculateTotalCells: function(){
      this.totalCells=this.cellsHigh.length*this.cellsWide.length;
    },
    randomize: function(){
      this.cellStatuses.forEach((x,i)=>{
        var test =  Math.floor(Math.random()*2);
        test == 1 ? this.cellStatuses[i] = false : this.cellStatuses[i] = true;
        
      })
    },
    increase: function(x){
      x == 'x' ? this.cellsHigh.push(false) : this.cellsWide.push(false);
      this.calculateTotalCells();
    },
    decrease: function(x){
      x == 'x' ? this.cellsHigh.pop() : this.cellsWide.pop();
      this.calculateTotalCells();
    },
    lifeChanger: function(x,i){
      this.cellStatuses[i]=x;
      this.$emit('upTheTree', this.cellStatuses)
    },
    neighborAffect: function(i){
      var w = this.cellsWide.length;
      var h = this.cellsHigh.length;
      var cStat = this.cellStatuses;
      var lifeCounter=0;
      var neighbors = {
        0: i-(w+1),
        1: i-w,
        2: i-(w-1),
        3: i-1,
        4: i+1,
        5: i+(w+1),
        6: i+w,
        7: i+(w-1)
      }
      for(var j=0; j < 8; j++){
        if(cStat[neighbors[j]] == true){
          lifeCounter++;
        }
      }
     var newStatus=false;
      if(lifeCounter<2){
        newStatus = false;
      }
      else if(lifeCounter > 3){
        newStatus = false;  
      }
      else if(lifeCounter == 3){
        newStatus = true;
      }

      this.$nextTick(()=>{
        //this.cellStatuses[i] = newStatus;
        //Below is necessary for vue to pick up on changes for an array... 
        this.cellStatuses.splice(i,1,newStatus)
        this.$emit('upTheTree', this.cellStatuses);
      })
    },
    generate: function(){
      this.randomize();
      if(this.powerSwitch){
        this.powerSwitch=false;
      }
      else if(!this.powerSwitch){
        this.powerSwitch=true;
        var cStat = this.cellStatuses;

        setInterval(()=>{
          cStat.forEach((x,i)=>{
            this.neighborAffect(i)
          })
        },this.speed)
      }
    }//End Generate
  }
}
</script>

<style scoped>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
  width: auto;
  margin: auto;
}
tr{
  width: 100%;
}
th{
  width: 20px;
  height: 20px;
}
th:hover{
  background-color: steelblue;
  cursor: pointer;
}
.button-box{
  display: flex;
  justify-content: center;
  align-content: center;
}
h3{
  text-align: center;
  background-color: steelblue;
  margin:0 0 0 15px;
  padding: 10px;
  color: white;
  font-size: 14px;
  height: 18px;
  align-self: center;
}
.button-box button{
  border: 2px solid green;
  background-color: lightgreen;
  color:#333;
  font-weight: 600;
  padding: 10px;
  margin: 5px;
  border: 0;
  outline: none;
  cursor: pointer;
  text-transform: uppercase;
}
.start{
  background-color: orange !important;
}
</style>
