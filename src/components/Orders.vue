<template>
    <div>
        <ul>
          <li v-for= "order in ordersList" :key= "order[0]">
            <p v-for= "(key,val) in order[1]" :key= "key">  {{ val }} x {{ key }}</p>
            <button type="button" v-bind:id= "order[0]" v-on:click= "deleteItem($event)">Delete</button>
            <button type="button" v-bind:id= "order[0]" v-on:click= "route($event)">Modify</button>
          </li>
        </ul>
    </div>
</template>

<script>
import database from '../firebase.js'

  export default {
    name: 'Orders',
    data() {
      return {
        ordersList: []
      }
    },
    methods: {
      fetchOrders: function() {
        database.collection('orders').get().then((querySnapShot)=>{
          let order={}
          querySnapShot.forEach(doc=>{
            order=[doc.id, doc.data()]
            this.ordersList.push(order)
          })      })    
        },
      deleteItem: function(event) {
        let doc_id = event.target.getAttribute("id");
        database.collection("orders").doc(doc_id).delete().then(() => {location.reload()})
      },
      route: function(event) {
        let doc_id = event.target.getAttribute("id");
        this.$router.push({ name: 'Modify', params: { id: doc_id } })

      }
    },
    created(){
      this.fetchOrders()    
    }
  }
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>