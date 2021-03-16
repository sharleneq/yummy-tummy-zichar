<template>
    <div>
        <ul>
            <li v-for= "(count, name, index) in datapacket" :key= "index">
                <p> {{name}} : {{count}}</p>
                <input v-bind:id= "index" placeholder=0 type="number" min="0">
            </li>
        </ul>
        <button type="button" v-on:click= "updateOrder()">Update Order</button>
        <p v-show= "this.works"> Works here : {{works}}</p>
    </div>
</template>


<script>
import database from '../firebase.js'

export default {
    name: 'Modify',
    data() {
        return {
            datapacket: {},
            works: ""
        }
    },
    methods: {
      fetchItems: function() {
            database.collection("orders").doc(this.$route.params.id).get().then(snapshot => {
                this.datapacket = snapshot.data()
            });
        },
        updateOrder: function() {
            let copy = JSON.parse(JSON.stringify(this.datapacket));
            const keys = Object.keys(copy)
            for (let i=0; i < keys.length; i++) {
                if (document.getElementById(i).value != "") {
                    copy[keys[i]] = parseInt(document.getElementById(i).value)
                } 
            }
            database.collection("orders").doc(this.$route.params.id).set(copy).then(() => {
                this.$router.push({path: '/orders'})
            })
        }
    },
    created(){
      this.fetchItems()    
    }
}
</script>