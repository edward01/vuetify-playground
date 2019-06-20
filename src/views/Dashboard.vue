<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-data-table
      :items="projects"
      class="elevation-1 mt-3"
      hide-actions
      hide-headers
    >
      <template v-slot:items="props">
        <td class="project-row" :class="props.item.status">
          <div class="caption grey--text">Project Title</div>
          <div>{{ props.item.title }}</div>
        </td>
        <td>
          <div class="caption grey--text">Person</div>
          <div>{{ props.item.person }}</div>
        </td>
        <td>
          <div class="caption grey--text">Due by</div>
          <div>{{ props.item.due | customDateFormat }}</div>
        </td>
        <td>
          <v-chip small :color="props.item.status | statusColor" text-color="white">
            {{ props.item.status }}
          </v-chip>
          <!-- <v-btn
            :color="props.item.status | statusColor"
            dark
            round
            small
            class="text-lowercase"
          >
            {{ props.item.status }}
          </v-btn> -->
        </td>
        <td class="text-xs-right">
          <v-btn flat small dark icon color="warning">
            <v-icon dark @click="editRecord(props.item.id)">edit</v-icon>
          </v-btn>
          <v-btn flat small dark icon color="error" @click.stop="showDeleteDialog(props.item.id)">
            <v-icon dark>delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>

    <Delete :deleteDialog.sync="deleteDialog" :rowId="rowId"></Delete>
  </div>
</template>

<script>
import db from '@/fb'
import Delete from '@/components/Delete'
// import TestDatepicker from '@/components/TestDatepicker'

export default {
  components: { Delete },
  data() {
    return {
      projects: [],
      deleteDialog: false,
      rowId: '',
    }
  },
  methods: {
    showDeleteDialog(id) {
      this.rowId = id
      this.deleteDialog = true
    },
    editRecord(id) {
      const idx = this.projects.findIndex(item => item.id == id)
      console.log('this.projects[idx]:', this.projects[idx]);
      this.$store.commit('setSelectedProject', this.projects[idx])
      this.$store.commit('toggleModal', true)
    },
  },
  filters: {
    statusColor: function(value) {
      const chipColors = {
        'ongoing': 'warning',
        'complete': 'success',
        'overdue': 'red',
        'onqueue': 'blue',
      }
      if (chipColors.hasOwnProperty(value))
        return chipColors[value]
      else
        return 'secondary'
    }
  },
  created () {
    db.collection("projects")
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // console.log("New record: ", change.doc.data())
          this.projects.push({
            id: change.doc.id,
            ...change.doc.data()
          })
        }
        if (change.type === "modified") {
          // console.log("Modified record: ", change.doc.data());
          const idx = this.projects.findIndex(item => item.id == change.doc.id)
          this.$set(this.projects, idx, change.doc.data())
          this.projects[idx].id = change.doc.id
        }
        if (change.type === "removed") {
          // console.log("Removed record: ", change.doc.data());
          const idx = this.projects.findIndex(item => item.id == change.doc.id)
          this.projects.splice(idx, 1)
        }
      });
    });
  },
}
</script>

<style scoped>
  .project-row { height: 60px; }
  .project-row.ongoing { border-left: 4px solid #ffaa2c; }
  .project-row.complete { border-left: 4px solid #3cd1c2; }
  .project-row.overdue { border-left: 4px solid #f83e70; }
  .project-row.onqueue { border-left: 4px solid #2096F3; }
</style>
