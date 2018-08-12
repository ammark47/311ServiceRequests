  <template>
    <div class="GoogleMapSearch">
      <nav id="menu">
        <div class="logo"></div>
      <div class="searchBar">
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
      </label>
      </div>
  <button class="button is-primary" slot="trigger"  @click="getLatLngCoors">Click me!</button>
        <p class="content">
            <b>Optional Filters</b>
        </p>
        <section>
          
            <CustomFilter :filterGroup='filterGroup' @updateGroup='filterServiceRequests'/>
          
        </section>
      </nav>
      <main id="panel">
        <header>
          <div><button class="toggle-button">☰</button></div>
        </header>
        <gmap-map
          :center="center"
          :zoom="17"
          style="width:100%;  height: 100vh;"
        >
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>

      <h1>{{ msg }}</h1>
        </main>
    </div>
  </template>

  <script>
  import axios from 'axios'
  import CustomFilter from './CustomFilter'
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'googlemapsearch',
    components: { CustomFilter },
    data() {
      return {
        // default to Montreal to keep it simple
        // change this to whatever makes sense
        center: { lat: 40.7675, lng: 73.8331 },
        markers: [],
        places: [],
        filterGroup: {},
        currentPlace: null
      }
    },
    computed: {
      ...mapGetters([
        'getAddress'
      ])
    },
    mounted() {
      this.geolocate()
    },
    methods: {
      // receives a place object via the autocomplete component
      setPlace(place) {
        this.currentPlace = place;
      },
      getLatLngCoors() {
        if (this.currentPlace) {
          const marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng()
          }
          // this.places.push(this.currentPlace);
          this.center = marker
          this.markers = []
          this.$store.dispatch('updateAddressValue', marker)
          // console.log(this.$store.getters.getAddress.lat, this.$store.getters.getAddress.lng)
          this.getServiceRequest(this.$store.getters.getAddress)
          this.currentPlace = null;
        }
      },
      getServiceRequest(address) {
        const apiEndpoint = 'https://data.cityofnewyork.us/resource/fhrw-4uyv.json?'
        const serviceRequests = apiEndpoint + '$where=within_circle(location,' + address.lat + ',' + address.lng + ',500)&$limit=1000'

        axios
        .get(serviceRequests)
        .then((response) => (this.convertRequestsToMarkers(response.data)))
      },
      filterServiceRequests(newfilterGroup) {
        const apiEndpoint = 'https://data.cityofnewyork.us/resource/fhrw-4uyv.json?'
        const address = this.$store.getters.getAddress
        var initServiceRequests = apiEndpoint + '$where=within_circle(location,' + address.lat + ',' + address.lng + ',500)'

        this.markers = []

        //loop through filters and add new term to search api
        for (const key in newfilterGroup) {
          // initServiceRequests += '&'
          switch (key) {
            case 'agencyName':
              newfilterGroup[key].forEach((agency, index) =>{
                if (index == 0) {
                  initServiceRequests += '&agency=' + agency
                } else {
                  initServiceRequests += '%20or%20agency=' + agency
                }
              })
              break
            case 'date':
              // convert date to iso 8601 so api can use it
              var startDate = newfilterGroup[key]['start'].toISOString()
              startDate = startDate.substring(0, startDate.indexOf('.'))
              var endDate = newfilterGroup[key]['end'].toISOString()
              endDate = endDate.substring(0, endDate.indexOf('.'))

              initServiceRequests += ' and created_date between %27' + startDate + '%27 and %27' + endDate + '%27'
              break
            case 'statusType':
              newfilterGroup[key].forEach((status, index) =>{
                if (index == 0) {
                  initServiceRequests += '&status=' + status
                } else {
                  initServiceRequests += '%20or%20status=' + status 
                }
              })
              break
          }

        }

        // limit responses
        initServiceRequests += '&$limit=10000'

        console.log(initServiceRequests)

        axios
        .get(initServiceRequests)
        .then((response) => (this.convertRequestsToMarkers(response.data)))
      
      },
      convertRequestsToMarkers(rqsts){
        console.log(rqsts)
        var marker
        rqsts.forEach(serviceRequestObject => {
          marker = {
            lat: parseFloat(serviceRequestObject.latitude),
            lng: parseFloat(serviceRequestObject.longitude)
          }
          this.markers.push({position:marker})
        })
      },
      geolocate: function() {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }

          this.$store.dispatch('updateAddressValue', this.center)
          this.getServiceRequest(this.$store.getters.getAddress)
        })
      },
      ...mapMutations([
        'updateAddress'
      ]),
      ...mapActions([
        'updateAddressValue'
      ])
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
