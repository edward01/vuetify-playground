<template>
  <div>
    <v-btn color="success" dark @click="toggleModal(true)">Add New Project</v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline" v-if="projectId == null">Add New Project</span>
          <span class="headline" v-else>Edit a Project</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="submit">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field ref="titleField"
                    label="Title*" v-model="title"
                    prepend-icon="folder"
                    :rules="titleRules"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    label="Content*"
                    v-model="content"
                    prepend-icon="edit"
                    :rules="titleRules"
                    required
                  ></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    full-width
                    max-width="290"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :value="due | customDateFormat"
                        clearable
                        label="Due*"
                        v-on="on"
                        prepend-icon="event"
                        :rules="dueDateRules"
                        required
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="due"
                      @change="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 v-if="projectId">
                  <v-select
                    prepend-icon="info"
                    label="Status*"
                    v-model="status"
                    :items="statusOptions"
                  >
                  </v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
          <small class="grey--text">* indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="toggleModal(false)">Close</v-btn>
          <v-btn color="blue darken-1" dark type="submit" @click="submit"
            :loading="loading"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from '@/fb'
import { timeout } from 'q';

export default {
  data() {
    return {
      projectId: null,
      loading: false,
      valid: true,
      title: '',
      titleRules: [
        v => !!v || 'This field is required',
        v => (v && v.length >= 3 ) || 'Minimum length is 3 characters'
      ],
      content: '',
      due: null,
      menu: false,
      dueDateRules: [
        v => !!v || 'This field is required',
      ],
      statusOptions: ['onqueue', 'ongoing', 'complete', 'overdue'],

      select: { state: 'Florida', abbr: 'FL' },
      items: [
        { state: 'Florida', abbr: 'FL' },
        { state: 'Georgia', abbr: 'GA' },
        { state: 'Nebraska', abbr: 'NE' },
        { state: 'California', abbr: 'CA' },
        { state: 'New York', abbr: 'NY' }
      ]
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        if (this.projectId == null) {
          const project = {
            title: this.title,
            content: this.content,
            due: this.due,
            person: 'The Net Ninja',
            status: 'ongoing'
          }
          db.collection("projects").add(project).then((docRef) => {
            console.log("Document written with ID: ", docRef.id)
            this.toggleModal(false)
            this.loading = false
            this.$emit('packageAdded')
          })
          .catch((error) => {
            console.error("Error adding document: ", error)
          })
        }
        else {
          // Update mode
          db.collection("projects").doc(this.projectId).update({
            title: this.title,
            content: this.content,
            due: this.due,
            status: this.status
          })
          .then(() => {
            console.log("Document successfully updated!");
            this.toggleModal(false)
            this.loading = false
            this.$emit('packageAdded')
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          })
        }
      }
    },
    toggleModal(value) {
      this.$store.commit('setSelectedProject', {})
      this.$store.commit('toggleModal', value)
    },
  },
  computed: {
    dialog() {
      return this.$store.getters.dialog
    },
    selectedProject() {
      return this.$store.getters.selectedProject
    },
  },
  watch: {
    selectedProject(newValue, oldValue) {
      if (newValue.hasOwnProperty('title')) {
        this.projectId = newValue.id
        this.title = newValue.title
        this.content = newValue.content
        this.due = newValue.due
        this.status = newValue.status
      }
      else {
        this.projectId = null
        this.due = null
        this.$refs.form.reset()
      }
      setTimeout(() => {
        this.$refs.titleField.focus()
      }, 300);
    }
  },
}
</script>