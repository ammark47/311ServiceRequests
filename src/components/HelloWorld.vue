<template>
  <div class="helloworld">
    <nav id="menu">

      <div class="logo"></div>
      <Search />
      <button class="button is-primary" slot="trigger">Click me!</button>
      <p class="content">
          <b>Optional Filters</b>
      </p>
      <section>
      <b-checkbox-button v-model="checkboxGroup"
        native-value="NYPD"
        type="is-danger">
        <span>New York Police Department</span>
      </b-checkbox-button>

      <b-checkbox-button v-model="checkboxGroup"
        native-value="DSNY"
        type="is-success">
        <span>Department of Transportation</span>
      </b-checkbox-button>

      <b-checkbox-button v-model="checkboxGroup"
        native-value="Default">
        Default
      </b-checkbox-button>


      <p class="content">
          <b>Selection:</b>
          {{ checkboxGroup }}
      </p>
      </section>





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
  data: function(){
            return {
checkboxGroup: []
            }
            },
  components: { Search },
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
    margin-bottom: 20px;
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
