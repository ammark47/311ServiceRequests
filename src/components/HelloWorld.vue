<template>
  <div class="helloworld">
    <nav id="menu">

      <div class="logo"></div>
      <Search />
      <button class="button is-primary" slot="trigger">Click me!</button>


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
import CheckBox from './CheckBox'

export default {
  name: 'helloworld',
  components: { Search, CheckBox },
  props: {
    msg: String
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button.is-primary {
    background-color: #feee1f;
    border-radius: 0;
    color: black;
    margin-top: 5px;
    width: 200px;
    border: none;
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
.logo{
    background-image: url(../assets/311_logo.png);
    width: 200px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-bottom: 1px #363636 solid;
    padding-bottom: 100px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 20px;
}
</style>
