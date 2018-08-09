<template>
  <div class="search">
    <vue-google-autocomplete
            ref="address"
            id="map"
            classname="form-control"
            placeholder="Please type your address"
            v-on:placechanged="getAddressData"
            country="us"
        >
        </vue-google-autocomplete>

  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  name: 'search',
  components: { VueGoogleAutocomplete },
  props: {
    msg: String
  },
  data: function () {
      return {
        address: ''
      }
  },

  mounted() {
      // To demonstrate functionality of exposed component functions
      // Here we make focus on the user input
      this.$refs.address.focus();
  },

  methods: {
      /**
      * When the location found
      * @param {Object} addressData Data of the found location
      * @param {Object} placeResultData PlaceResult object
      * @param {String} id Input container ID
      */
      getAddressData: function (addressData, placeResultData, id) {
          this.address = addressData
          console.log("hello")
          console.log( this.$refs.address.value)
      }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input#map {
    padding: 5px;
    width: 200px;
    height: 35px;
    border: 1px solid black;
}

</style>
