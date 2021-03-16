<template>
  <div>
    <div id="itemsList">
      <ul id="items">
        <li id="item" v-for= "item in itemsList" :key= "item.id">
          <p id="itemName">{{ item.name }}</p><br>
          <img v-bind:src= "item.imageURL"><br>
          <p id="price">${{ item.price }}</p>
          <qtyCounter v-bind:item = "item" v-on:counter= "onCounter"></qtyCounter>
        </li>
      </ul>
    </div>

    <div id="shoppingBasket">
      <Basket v-bind:itemsSelected=" itemsSelected" v-bind:itemsList = "itemsList"></Basket>
    </div>

  </div>
</template>


<script>
import database from '../firebase.js'

import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'

  export default {
    name: 'PageContent',
    data() {
      return {
        itemsList: [],
        itemsSelected: []
      }
    },
    methods: {
      fetchItems: function() {
      database.collection('menu').get().then((querySnapShot)=>{
        let item={}
        querySnapShot.forEach(doc=>{
            item=doc.data()
            item.id=doc.id
            this.itemsList.push(item) 
            })      })    
        },
      onCounter: function (item, count) {
        if (this.itemsSelected.length === 0 && count > 0) {
          //If there is nothing in items selected, push the ORDER in
          this.itemsSelected.push([item.name, count, item.price])
        } else {
          var exists = false;

          // Loop through everything to check what is not in the basket
          for (let i = 0; i < this.itemsSelected.length; i++) {
            const curr_item = this.itemsSelected[i]
            const item_name = curr_item[0];

            // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
            if (item_name == item.name && count > 0) {
              this.itemsSelected.splice(i, 1, [item.name, count, item.price])
              exists = true;
            }

            // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
            else if (item_name == item.name && count == 0) {
              this.itemsSelected.splice(i, 1);
              exists = true
            }
          }
          // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
          if (exists == false) {
            this.itemsSelected.push([item.name, count, item.price])
          }
        }
      }
    },
    created(){
      this.fetchItems()    
    },
    components: {
      qtyCounter: QuantityCounter,
      Basket
    }
  }
</script>

<style>

#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
#items {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
#item {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

#itemName {
  font-size: 30px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>
