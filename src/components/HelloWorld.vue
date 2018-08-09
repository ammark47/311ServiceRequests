<template>
  <div class="helloworld">
    <nav id="menu">

      <div class="logo"></div>

    <div class="searchBar">
    <label>
      <gmap-autocomplete
        @place_changed="setPlace">
      </gmap-autocomplete>

    </label>
    </div>
<button class="button is-primary" slot="trigger"  @click="addMarker">Click me!</button>

      <p class="content">
          <b>Optional Filters</b>
      </p>
      <section>
      <b-checkbox-button v-model="checkboxGroup"
        native-value="PIGS"
        type="is-danger">
        <span>New York Police Department</span>
      </b-checkbox-button>

      <b-checkbox-button v-model="checkboxGroup"
        native-value="DSNY"
        type="is-success">
        <span>Department of Transportation</span>
      </b-checkbox-button>

      <b-checkbox-button v-model="checkboxGroup"
        native-value="Ghettos">
        <span>"Ethnic Neighborhoods"</span>
      </b-checkbox-button>


      <p class="content">
          <b>Selection:</b>
          {{ checkboxGroup }}
      </p>
      </section>




    </nav>

    <main id="panel">
      <header>
        <div><button class="toggle-button">☰</button></div>

      </header>
      <gmap-map
        :center="center"
        :zoom="12"
        style="width:100%;  height: 100vh;"
      >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center=m.position"
        ></gmap-marker>
      </gmap-map>


    <h1>{{ msg }}</h1>
      </main>
  </div>
</template>

<script>

import CheckBox from './CheckBox'

export default {
  name: 'helloworld',
  components: { },
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      checkboxGroup: []
    }
  },
  mounted() {
    this.geolocate()
  },
  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  },
  props: {
    msg: String
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gmnoprint {
    display: none !important;
}
button.toggle-button {
    background: #feee1f;
    border: none;
    float: left;
    font-size: 24px;
    color: black;
    margin-left: 10px;
    margin-top: 15px;
    z-index: 9999;
    position: absolute;
    left: 5px;
}
button.toggle-button:focus {
    outline: 0;
}
.searchBar input[type="text"] {
    height: 35px;
    width: 200px;
}
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
