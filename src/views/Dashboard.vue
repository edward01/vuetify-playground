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
          <div>{{ props.item.due }}</div>
        </td>
        <td>
          <v-chip small :color="props.item.status | statusColor" text-color="white">{{ props.item.status }}</v-chip>
        </td>
        <td class="text-xs-right">
          <v-btn flat small dark icon color="warning">
            <v-icon dark>edit</v-icon>
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

export default {
  components: { Delete },
  data() {
    return {
      // projects: [
      //   { title: 'Design a new website', person: 'The Net Ninja', due: '1st Jan 2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      //   { title: 'Code up the homepage', person: 'Chun Li', due: '10th Jan 2019', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      //   { title: 'Design video thumbnails', person: 'Ryu', due: '20th Dec 2018', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      //   { title: 'Create a community forum', person: 'Gouken', due: '20th Oct 2018', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      // ]
      projects: [],
      deleteDialog: false,
      rowId: ''
    }
  },
  methods: {
    showDeleteDialog(id) {
      this.rowId = id
      this.deleteDialog = true
    }
  },
  filters: {
    statusColor: function(value) {
      const chipColors = {
        'ongoing': 'warning',
        'complete': 'success',
        'overdue': 'red'
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
          console.log("New record: ", change.doc.data())
          this.projects.push({
            id: change.doc.id,
            ...change.doc.data()
          })
        }
        if (change.type === "modified") {
          console.log("Modified record: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed record: ", change.doc.data());
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
</style>


<!-- todo
- adjust table cell height
- add link to navigate to edit page
- add avatar to each rows
-->