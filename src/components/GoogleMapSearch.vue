  <template>
    <div class="GoogleMapSearch">
      <nav id="menu">
        <div class="logo"></div>
        <div class="searchBar">
          <b-field label="Please enter an address:"></b-field>
            <label>
              <gmap-autocomplete
                @place_changed="setPlace">
              </gmap-autocomplete>
            </label>
          </div>
          <button class="button is-primary searchButton" slot="trigger"  @click="getLatLngCoors">SEARCH</button>

        <!-- <p class="content">
            <b>Optional Filters</b>
        </p> -->
        <section>
          <CustomFilter :filterGroup='filterGroup' @updateGroup='filterServiceRequests'/>
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


      </main>
    </div>
  </template>

  <script>
  import axios from 'axios'
  import CustomFilter from './CustomFilter'
  import soda from 'soda-js'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import serviceRequest from '../components/serviceRequest.vue'

  export default {
    name: 'googlemapsearch',
    components: { CustomFilter, serviceRequest },
    data() {
      return {
        center: { lat: 45.508, lng: -73.587 },
        mapOptions: {
          mapTypeControl:false,
        zoomControl: true},
        markers: [],
        places: [],
        filterGroup: {},
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
    computed: {
      ...mapGetters([
        'getAddress'
      ])
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
          closed_date: this.markers[index].position.closed_date,
          due_date: this.markers[index].position.due_date,
          complaint_type: this.markers[index].position.complaint_type,
          description: this.markers[index].position.descriptor,
          resolution: this.markers[index].position.resolution
        }
        if ( typeof this.infoContent.closed_date!=="undefined") {
          console.log('converted' + this.infoContent.closed_date)
          this.infoContent.closed_date = this.convertToDate(this.infoContent.closed_date)
        }
        console.log(typeof this.infoContent.closed_date)
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
          this.$store.dispatch('updateAddressValue', marker)
          // console.log(this.$store.getters.getAddress.lat, this.$store.getters.getAddress.lng)
          this.getServiceRequest(this.$store.getters.getAddress)
          this.currentPlace = null;
        }
      },
      getServiceRequest(address) {
        var today = new Date()
        var oldDate = new Date()
        var daysPrior = 0
        oldDate.setDate(today.getDate() - daysPrior)
        today = today.toISOString().substring(0, today.toISOString().indexOf('.'))
        oldDate = oldDate.toISOString().substring(0, oldDate.toISOString().indexOf('.'))
        console.log(today,oldDate)

        const apiEndpoint = 'https://data.cityofnewyork.us/resource/fhrw-4uyv.json?'
        const serviceRequests = apiEndpoint + '$where=within_circle(location,' + address.lat + ',' + address.lng + ',100)'
        // + encodeURI(' AND status!=') + '%27Closed%27' + encodeURI(' OR closed_date between') + '%27' + encodeURI(oldDate) + '%27' + encodeURI(' and ') + '%27' + encodeURI(today) + '%27'


        axios
        .get(serviceRequests)
        .then((response) => (this.convertRequestsToMarkers(response.data)))
      },
      filterServiceRequests(newfilterGroup) {
        const apiEndpoint = 'https://data.cityofnewyork.us/resource/fhrw-4uyv.json?'
        const address = this.$store.getters.getAddress
        var initServiceRequests = apiEndpoint + '$where=within_circle(location,' + address.lat + ',' + address.lng + ',500)'

        this.markers = []

        var consumer = new soda.Consumer('data.cityofnewyork.us')

        // consumer.query()
        //   .withDataset('fhrw-4uyv')
        //   .limit(5)
        //   .where({ agency: 'NYPD' })
        //   .getRows()
        //   .on('success', (response) => (console.log(response)))
        //   .on('error', function(error) { console.error(error) })

        //loop through filters and add new term to search api
        for (const key in newfilterGroup) {
          // initServiceRequests += '&'
          switch (key) {
            // case 'agencyName':
            //   newfilterGroup[key].forEach((agency, index) =>{
            //     if (index == 0) {
            //       initServiceRequests += encodeURI('&agency=') + '%27' + encodeURI(agency) + '%27'
            //     } else {
            //       initServiceRequests += '%20or%20agency=%27' + agency + '%27'
            //     }
            //   })
            //   break
            case 'date':
              // convert date to iso 8601 so api can use it
              var startDate = newfilterGroup[key]['start'].toISOString()
              startDate = startDate.substring(0, startDate.indexOf('.'))
              var endDate = newfilterGroup[key]['end'].toISOString()
              endDate = endDate.substring(0, endDate.indexOf('.'))

              initServiceRequests += encodeURI(' and created_date between') + '%27' + encodeURI(startDate) + '%27' + encodeURI(' and ')
                                  + '%27' + encodeURI(endDate) + '%27'
              break
            // case 'statusType':
            //   newfilterGroup[key].forEach((status, index) =>{
            //     if (index == 0) {
            //       initServiceRequests += encodeURI('&status=' + status)
            //     } else {
            //       initServiceRequests += '%20' + encodeURI('or') + '%20' + encodeURI('status' + status)
            //     }
            //   })
            //   break
          }

        }

        // limit responses
        initServiceRequests += '&$limit=100'

        console.log(initServiceRequests)

        axios
        .get(initServiceRequests)
        .then((response) => (this.convertRequestsToMarkers(response.data)))

      },
      convertRequestsToMarkers(rqsts){
        // console.log(rqsts)
        var marker
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
  .label {
    color: #feee1f !important;
  }

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
      height:35px;
      font-weight:bold;
      font-size:12px;
  }
  .button.is-primary:hover {
    background-color: #1d1f20;
    border:1px solid #feee1f;
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
