<template>
  <div class="helloworld">
    <nav id="menu">

      <div class="logo">Menu</div>
      <div>Menu</div>
      <Search />

    </nav>

    <main id="panel">
      <header>
        <div><button class="toggle-button">☰</button>Panel</div>
        <div class="another-toggle"> <button>another</button></div>
        <div class="not-a-toggle"> <button>this one wont work</button></div>
        <img alt="Vue logo" src="../assets/logo.png">
      </header>


    <h1>{{ msg }}</h1>
      </main>
  </div>
</template>

<script>
import Search from './Search'

export default {
  name: 'helloworld',
  components: { Search },
  props: {
    msg: String
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  background-img: url("../assets/311_logo.png");
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
