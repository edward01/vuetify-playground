<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 lg6>
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            full-width
            max-width="290"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="computedDateFormattedMomentjs"
                clearable
                label="Formatted with Moment.js"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @change="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-btn color="warning" @click="clearDateValue()">Clear Date</v-btn>
        <v-btn color="success" @click="setDateValue()">Set Date Now</v-btn>
        <v-btn color="info" @click="setCustomDateValue()">Set Custom Date</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu1: false
  }),
  computed: {
    computedDateFormattedMomentjs () {
      return this.date ? moment(this.date).format('Do MMMM YYYY') : ''
    }
  },
  methods: {
    clearDateValue() {
      this.date = ''
    },
    setDateValue() {
      this.date = new Date().toISOString().substr(0, 10)
    },
    setCustomDateValue() {
      this.date = '2016-01-20'
    },
  },
}
</script>