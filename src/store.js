import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dialog: false,
        selectedProject: {}
    },
    getters: {
        dialog: state => state.dialog,
        selectedProject: state => state.selectedProject,
    },
    mutations: {
        toggleModal(state, dialog) {
            state.dialog = dialog
        },
        setSelectedProject(state, value) {
            state.selectedProject = value
        }
    },
    // actions: {
    //     getMovies (context) {
    //         axios.get('/api/movies')
    //             .then((movies) => {
    //                 context.commit('setMovies', movies)
    //             })
    //     },
    // },
})


/*
<script>
export default {
    mounted () {
        this.$store.dispatch('getMovies')
    },
    computed: {
        movies () {
            this.$store.getters.movies
        }
    }
}
</script>
*/