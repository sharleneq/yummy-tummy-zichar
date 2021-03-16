<template>
  <div id="qtyCounter">
    <button type="button" v-on:click= "decrement()"> - </button>
    <span> {{ qty }} </span>
    <button type="button" v-on:click= "increment()"> + </button>
  </div>
</template>

<script>
  export default {
    name: 'QuantityCounter',
    data () {
      return {
        qty: 0
      }
    },
    methods: {
      increment: function() {
        if (this.qty >= 10) {
          alert("You cannot buy more than 10 items.")
        } else {
          this.qty = this.qty + 1;
        }
        this.$emit('counter', this.item, this.qty);
      },
      decrement: function() {
        if (this.qty >= 1) {
          this.qty = this.qty - 1;
        }
        this.$emit('counter', this.item, this.qty);
      }
    },
    props: {
      item : {
        type: Array
      }
    }
  }
</script>

<style scoped>
  #qtyCounter {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      text-align: center;
      color: #2c3e50;
  }
</style>