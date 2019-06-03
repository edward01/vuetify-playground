<template>
  <v-app>
    <Navbar></Navbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: { Navbar, Footer },
  data () {
    return {
      //
    }
  }
}
</script>
