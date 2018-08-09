const state = {
    address: ''
}

const getters = {
    getAddress: (state) => {
        return state.address
    }
}

const mutations = {
    updateAddress (state, addressPayload) {
        state.address = addressPayload.address
    }
}

const actions = {
    updateAddress ({commit}) {
        commit('updateAddress')
    }
}