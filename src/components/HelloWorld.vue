<template>
  <div class="helloworld">
    <nav id="menu">

      <div class="logo"></div>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        
      </label>
      <br/>
      <button class="button is-primary" slot="trigger"  @click="addMarker">Click me!</button>


    </nav>

    <main id="panel">
      <header>
        <div><button class="toggle-button">☰</button>Panel</div>
        <div class="another-toggle"> <button>another</button></div>
        <div class="not-a-toggle"> <button>this one wont work</button></div>
        <img alt="Vue logo" src="../assets/logo.png">

      </header>
      <gmap-map
        :center="center"
        :zoom="12"
        style="width:100%;  height: 400px;"
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
  components: { CheckBox },
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
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
