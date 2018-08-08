<template>
  <div class="hello">
    <nav id="menu">
      <div>Menu</div>
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
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
