import Vue from 'vue'
import Vuex from 'vuex'
import address from './address'
import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

export default  new Vuex.Store({
    modules: {
        address
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})