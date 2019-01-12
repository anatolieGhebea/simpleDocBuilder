<template>
  <div class="dashboard">

    <v-container>
      <h1 class="mb-3 subheading grey--text">Dashboard</h1>
      
      <v-layout row class="mb-3">
        
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
            <v-icon left small>folder</v-icon>
            <span class="caption text-lowercase">by project name</span>
          </v-btn>
          <span>Sort by project name</span>
        </v-tooltip>

        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
            <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">by person</span>
          </v-btn> 
          <span>Sort by person name</span>
        </v-tooltip>
      </v-layout>


      <v-card flat v-for="project in projects" :key="project.name" route :to="{name:'editor', params:{docID:project.docID } }" > 
        
        <!-- row definition -->
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <!-- v-flex as column -->
          <v-flex xs12 sm12 md6>
            <div class="capition grey--text">Project title</div>
            <div>{{ project.name }} </div>
          </v-flex>
          <v-flex xs4 sm4 md2>
            <div class="capition grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs4 sm4 md2>
            <div class="capition grey--text">Due date</div>
            <div> {{ project.due }} </div>
          </v-flex>
          <v-flex xs4 sm4 md2>
            <div class="right">
              <v-chip small :class="`${project.status} white--text caption my-2`">{{ project.status }}</v-chip>
            </div>
          </v-flex>

        </v-layout>

        <v-divider></v-divider>

      </v-card>


    </v-container>

  </div>
</template>

<script>

  export default {
    data(){
        return {
            projects: [
                { docID: 'test_tree', name:"File one", person:"Mario", due:"1st Mar 2019", status:"ongoing" },
                { docID: 'test_tree_b', name:"File two", person:"Pippo", due:"1st Jan 2019", status:"overdue" },
                { docID: '129', name:"File three", person:"Pluto", due:"1st Mar 2019", status:"done" }
            ]
        }
    },
    methods:{
      sortBy(prop){
        this.projects.sort((a,b)=> a[prop] > b[prop] ? -1:1);
      }
    }

  }
</script>

<style>

.project.done {
  border-left: 3px solid #3cd1c2;
}
.project.overdue {
  border-left: 3px solid tomato;
}
.project.ongoing {
  border-left: 3px solid orange;
}
.v-chip.done {
  background:#3cd1c2;
}
.v-chip.overdue {
  background:tomato;
}
.v-chip.ongoing {
  background:orange;
}

</style>

