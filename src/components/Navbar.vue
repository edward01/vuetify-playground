<template>
  <nav>
    <v-snackbar
      v-model="snackbar"
      color="success"
      :timeout="6000"
      top
    >
      Project successfully added
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-navigation-drawer app v-model="drawer">
      <!-- <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title grey--text text-xs-center">
              iTodo Menus
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar> -->

      <v-divider></v-divider>
      <v-container grid-list-sm>
        <v-layout align-center column>
          <v-flex class="mt-3">
            <v-avatar size="100">
              <img src="/img/avatar-1.png">
            </v-avatar>
            <p class="subheading mt-1">The Net Ninja</p>
          </v-flex>
          <v-flex>
            <Popup v-on:packageAdded="packageAdded"></Popup>
          </v-flex>
        </v-layout>
      </v-container>
      <v-list>
        <v-list-tile v-for="item in links" :key="item.text" :to="{path: item.route}">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark color="brown">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <v-avatar size="40">
        <img class="text-lg-center" src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg">
      </v-avatar> -->
      <v-toolbar-title class="ml-0">
        <v-btn icon large @click="$router.push('/')">
          <v-avatar size="32px" tile>
            <img src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg" alt="Vuetify">
          </v-avatar>
        </v-btn>
        <span class="font-weight-light">ITodo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn flat dark v-on="on">
              Menu
              <v-icon dark>arrow_drop_down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile v-for="item in links" :key="item.text" :to="{path: item.route}">
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn flat>
          Sign Out
          <v-icon dark class="ml-1">exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
</template>

<script>
  import Popup from '@/components/Popup'

  export default {
    components: {
      Popup,
    },
    data() {
      return {
        drawer: null,
        snackbar: false,
        links: [
          { icon: 'dashboard', text: 'Dashboard', route: '/' },
          { icon: 'folder', text: 'My Projects', route: '/projects' },
          { icon: 'person', text: 'Team', route: '/team' },
        ]
      }
    },
    methods: {
      packageAdded() {
        this.snackbar = true
      }
    },
  }
</script>