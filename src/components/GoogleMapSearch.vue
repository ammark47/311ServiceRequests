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
        <transition name="fade">
        <serviceRequest v-if="showSrBox" :infoContent="infoContent"  v-on:enlarge-text="sayHi"/>
        </transition>
        <gmap-map
          :center="center"
          :zoom="17"
          style="width:100%;  height: 100vh;"
          map-type-id= "roadmap"
          :options="mapOptions"
        >

        <gmap-info-window :options="infoOptions" :position="infoPosition" :opened="infoOpened" @closeclick="infoOpened=false">
        <div><p style="color:black">{{infoContent}}</p></div>
      </gmap-info-window>


          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :uniquekey="m.uniquekey"
            :status = "m.status"
            @click="testfunction(m,index)"
          ></gmap-marker>
        </gmap-map>


      <h1>{{ msg }}</h1>
        </main>
    </div>
  </template>

  <script>
  import axios from 'axios'
  import serviceRequest from '../components/serviceRequest.vue'


  export default {
    name: 'googlemapsearch',
    components: { serviceRequest },
    data() {
      return {
        // default to Montreal to keep it simple
        // change this to whatever makes sense
        center: { lat: 45.508, lng: -73.587 },
        mapOptions: {
          mapTypeControl:false,
        zoomControl: true},
        markers: [],
        places: [],
        currentPlace: null,
        checkboxGroup: [],
        infoPosition: null,
        infoContent: {
          status: null,
          latitude: null,
          longitude: null,
          uniquekey: null,
          agency_name: null,
          incident_address: null,
          created_date: null,
          closed_date: null,
          due_date: null,
          complaint_type: null,
          description: null,
          resolution: null
        },
        infoOpened: false,
        infoCurrentKey: null,
        showSrBox: false,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        }
      }
    },
    mounted() {
      this.geolocate();
    },
    methods: {
      sayHi: function () {
      this.showSrBox = false
    },
      // receives a place object via the autocomplete component
      setPlace(place) {
        this.currentPlace = place;
      },
      convertToDate(datestring) {
        var st = datestring
        return (st.substring(5,7) + "/" + st.substring(8,10) + "/" + st.substring(0,4))
      },
      testfunction(marker, index) {
        this.center = {
          lat: this.markers[index].position.lat,
          lng: this.markers[index].position.lng
        }
        this.infoPosition = {
          lat: this.markers[index].position.lat,
          lng: this.markers[index].position.lng
        }
        this.infoContent = {
          status: this.markers[index].position.status,
          uniquekey: this.markers[index].position.uniquekey,
          latitude: this.markers[index].position.lat,
          longitude: this.markers[index].position.lng,
          agency_name: this.markers[index].position.agency_name,
          incident_address: this.markers[index].position.incident_address,
          created_date: this.convertToDate(this.markers[index].position.created_date),
          closed_date: this.convertToDate(this.markers[index].position.closed_date),
          due_date: this.markers[index].position.due_date,
          complaint_type: this.markers[index].position.complaint_type,
          description: this.markers[index].position.descriptor,
          resolution: this.markers[index].position.resolution
        }
        console.log(this.infoContent.description)
        if (this.infoContent.description == undefined) {
          this.infoContent.description = "No description available."
        }
        if (this.infoContent.resolution == undefined) {
          this.infoContent.description = "No description available."
        }
        if (this.infoCurrentKey == index) {
          this.infoOpened = !this.infoOpened;
          this.showSrBox = !this.showSrBox;
        }
        else {
          this.infoOpened=true;
          this.showSrBox=true;
          this.infoCurrentKey=index;
        }

      },
      getPosition: function(marker,index) {
          return {
          lat: parseFloat(marker[index].lat),
          lng: parseFloat(marker[index].lng),
          status: parseFloat(marker[index].status),

        }
      },
      getLatLngCoors() {
        if (this.currentPlace) {
          const marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng()
          };
          //this.markers.push({ position: marker });
          //this.places.push(this.currentPlace);
          this.center = marker;
          this.markers = []
          this.getServiceRequest(this.center.lat, this.center.lng)
          this.currentPlace = null;
        }
      },
      getServiceRequest(lat,lng) {
        const apiEndpoint = 'https://data.cityofnewyork.us/resource/fhrw-4uyv.json?'
        const serviceRequests = apiEndpoint + '$where=within_circle(location,' + lat + ',' + lng + ',500)&$limit=5'

        axios
        .get(serviceRequests)
        .then((response) => (this.convertRequestsToMarkers(response.data)))
      },
      convertRequestsToMarkers(rqsts){
        var marker;
        console.log(rqsts);
        rqsts.forEach(serviceRequestObject => {
          marker = {
            uniquekey: parseFloat(serviceRequestObject.unique_key),
            lat: parseFloat(serviceRequestObject.latitude),
            lng: parseFloat(serviceRequestObject.longitude),
            status: serviceRequestObject.status,
            agency_name: serviceRequestObject.agency_name,
            incident_address: serviceRequestObject.incident_address,
            created_date: serviceRequestObject.created_date,
            closed_date: serviceRequestObject.closed_date,
            due_date: serviceRequestObject.due_date,
            complaint_type: serviceRequestObject.complaint_type,
            description: serviceRequestObject.descriptor,
            resolution: serviceRequestObject.resolution_description
          }
          this.markers.push({position:marker})
        })
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
    },
    events: {
      'child-msg': function (msg) {
        console.log(msg)
      }
    }
  }

  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  /*.gmnoprint {
      display: none !important;
  } */
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
