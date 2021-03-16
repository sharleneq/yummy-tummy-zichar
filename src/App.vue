<template>
  <div>
    <header>
    <h1> Yummy Tummy ZiChar !!</h1>
    </header>
    <div class="navbar">
      <ul id="navbarlist">
        <li id="bar"><router-link to="/" exact>Home</router-link></li>
        <li id="bar"><router-link to="/orders" exact>Orders</router-link></li>
        <li id="bar"><router-link to="/dashboard" exact>Dashboard</router-link></li>
      </ul>
    </div>
  <router-view></router-view>
  </div>
</template>

<script>

export default {

}
</script>

<style>
h1 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 30px;
  padding: 30px;
  background-color:slategray;
  }

#navbar {
  max-width: 100%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
#navbarlist {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
#bar {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
  
</style>
