import Vue from 'vue'
import moment from 'moment'

// date operations
Vue.filter('customDateFormat', value => value ? moment(value).format('Do MMMM YYYY') : '')

// string operations
// Vue.filter('titleCase', value => value ? moment(value).format('Do MMMM YYYY') : '')
