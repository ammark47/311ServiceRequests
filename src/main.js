import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import * as VueGoogleMaps from "vue2-google-maps";
import 'buefy/lib/buefy.css'

Vue.use(Buefy)


Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCvX_Ii3_7Lg11PF3dOi95f1t3HywAdsLw",
    libraries: "places" // necessary for places input
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
