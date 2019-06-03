<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      color="success"
      :timeout="6000"
      top
    >
      Project successfully deleted
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>

    <v-dialog
      v-model="deleteDialog"
      max-width="290"
      persistent
    >
      <v-card>
        <v-card-title class="headline">Delete this record?</v-card-title>

        <v-card-text>
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey darken-1"
            flat="flat"
            @click="close"
          >
            No
          </v-btn>

          <v-btn
            color="green darken-1"
            @click="deleteRow"
            dark
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from '@/fb'

export default {
  props: {
    deleteDialog: {
      type: Boolean,
      default: false
    },
    rowId: {
      type: String
    },
  },
  data() {
    return {
      snackbar: false,
    }
  },
  methods: {
    close() {
      this.$emit('update:deleteDialog', false)
    },
    deleteRow() {
      db.collection("projects").doc(this.rowId).delete().then(() => {
        console.log("Document successfully deleted!");
        this.snackbar = true;
        this.close();
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
    }
  },
}
</script>