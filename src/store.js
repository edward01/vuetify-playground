import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dialog: false,
        selectedProject: {}
    },
    mutations: {
        toggleModal(state, dialog) {
            state.dialog = dialog
        },
        setSelectedProject(state, value) {
            state.selectedProject = value
        }
    },
    getters: {
        dialog: state => state.dialog,
        selectedProject: state => state.selectedProject,
    }
})
