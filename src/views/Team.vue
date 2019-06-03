<template>
  <div class="team">
    <h1 class="subheading grey--text">Team</h1>
    <v-layout row wrap class="ma-5">
      <v-flex xs4 v-for="item in team" :key="item.name">
        <v-card class="text-xs-center ma-3">
          <v-card-text>
            <v-avatar size="100" class="mb-3">
              <img :src="item.avatar" alt="avatar">
            </v-avatar>
            <div class="subheading">{{ item.name }}</div>
            <div class="grey--text">{{ item.role }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="grey">
              <v-icon small left>message</v-icon>
              Message
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        { name: 'The Net Ninja', role: 'Web developer', avatar: '/img/avatar-1.png' },
        { name: 'Ryu', role: 'Graphic designer', avatar: '/img/avatar-2.png' },
        { name: 'Chun Li', role: 'Web developer', avatar: '/img/avatar-3.png' },
        { name: 'Gouken', role: 'Social media maverick', avatar: '/img/avatar-4.png' },
        { name: 'Yoshi', role: 'Sales guru', avatar: '/img/avatar-5.png'}
      ]
    }
  },
}
</script>
