<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="success" dark v-on="on">Add New Project</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add a New Project</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="submit">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
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
              <v-flex xs-12>
                <v-menu
                  v-model="menu"
                  full-width
                  max-width="290"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="formattedDatefns"
                      clearable
                      label="Due Date*"
                      prepend-icon="event"
                      readonly
                      :rules="dueDateRules"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="due"
                    @change="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <small class="grey--text">* indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" dark type="submit" @click="submit"
          :loading="loading"
        >Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import db from '@/fb'

export default {
  data() {
    return {
      dialog: false,
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
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const project = {
          title: this.title,
          content: this.content,
          due: this.formattedDatefns,
          person: 'The Net Ninja',
          status: 'ongoing'
        }
        db.collection("projects").add(project).then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.$refs.form.reset()
          this.dialog = false
          this.loading = false
          this.$emit('packageAdded')
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        })
      }
    }
  },
  computed: {
    formattedDatefns() {
      return this.due ? format(this.due, 'Do MMM YYYY') : ''
    }
  }
}
</script>