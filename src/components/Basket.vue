<template>
  <div id="menu">
    <h2>Menu</h2>
    <ul>
      <li v-for= "item in itemsSelected" :key= "item[0]">
      <p>{{ item[0] }} x {{ item[1] }} </p>
      </li>
    </ul>
    <button type="button" v-on:click= "findTotal(); sendOrder();"> Add Order </button>
    <p v-show= "this.subTotal > 0"> Subtotal : ${{ subTotal }}</p>
    <p v-show= "this.grandTotal > 0"> Grand Total: ${{ grandTotal }}</p>
  </div>
</template>

<script>
import database from '../firebase.js'

export default {
  name: 'Basket',
  data () {
    return {
      subTotal: 0,
    }
  },
  methods: {
    sendOrder : function() {
      let order = {}
      for (let i = 0; i < this.itemsSelected.length; i++) {
        const curr_item = this.itemsSelected[i];
        order[curr_item[0]] = curr_item[1];
      }
      for (let j = 0; j < this.itemsList.length; j++) {
        const item = this.itemsList[j]
        var exist = false;
        for (let k = 0; k < this.itemsSelected.length; k++) {
          const curr_item = this.itemsSelected[k];
          if (curr_item[0]== item.name) {
            exist = true;
          }
        }
        if (exist == false) {
          order[item.name] = 0;
        }
      }
      database.collection('orders').add(order).then(() => {location.reload()});
    },
    findTotal : function() {
      this.subTotal = 0;
      for (let i = 0; i < this.itemsSelected.length; i++) {
        this.subTotal += this.itemsSelected[i][1] * this.itemsSelected[i][2];
      }
    }
  },
  computed: {
    grandTotal: function() {
      return (this.subTotal * 1.07).toFixed(2);
    }
  },
  props: {
    itemsSelected:{
      type: Array
    },
    itemsList:{
      type: Array
    }
  }
}
</script>

<style scoped>
  #menu {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      color: #2c3e50;
  }
</style>
