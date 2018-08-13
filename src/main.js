import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import Vuex from 'vuex'
import * as VueGoogleMaps from "vue2-google-maps";
import {store} from './store/index.js'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)
Vue.use(Vuex)

Vue.http.headers.common['Access-Control-Allow-Origin'] = true



Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCvX_Ii3_7Lg11PF3dOi95f1t3HywAdsLw",
    libraries: "places" // necessary for places input
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
