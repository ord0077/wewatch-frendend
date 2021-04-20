<template>
             <v-container>  


            <v-toolbar flat class="primary" dark>
            <h3>Email List</h3>
            <v-spacer></v-spacer>
             <v-btn
                  to="/recipients/add_recipients"
                  color="secondary"
                  small
                  dark
                  class="mb-2 right"
                  >
                  New Item
                  </v-btn>
                  
            </v-toolbar>
             <v-data-table
        :headers="headers"
        :items="recipientList"
        class="elevation-1"
        >
            <template  v-slot:top>
            <v-autocomplete
            class="pa-3"
            v-model="project_id" 
            :items="projects" 
            @change="getRecipientList"
            required 
            item-text="project_name" 
            item-value="id" 
            single-line 
            auto 
            label="Select Project">
            </v-autocomplete>
            </template>
        <template v-slot:item.actions="{ item }">
       
        <v-icon
        small
        @click="deleteItem(item)"
        >
        mdi-delete
        </v-icon>
        </template>
        <template v-slot:no-data>
        <v-btn
        color="primary"
        @click="initialize"
        >
        Reset
        </v-btn>
        </template>
        </v-data-table>
              
              
           </v-container>
</template>

<script>
  export default {
    data: () => ({
      project_id : '',
      dialog: false,
      dialogDelete: false,
      headers: [
          { text: 'Email', value: 'email' },
          { text: 'Actions', value: 'actions', sortable: false },

      ],
      recipientList: [],
      projects : [],
      editedIndex: -1,
      editedItem: {
       email : ''
      },
      defaultItem: {
        email : ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {

        this.$axios.get('project').then(res => this.projects = res.data);
        
      },

      getRecipientList () {
      this.$axios.get(`recipient/${this.project_id}`)
       .then(res => this.recipientList = res.data);   
      },

      editItem (item) {
        this.editedIndex = this.recipientList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
       
         confirm('Are you sure you want to delete this item?') && 
         this.$axios.delete('recipient/'+item.id)
            .then((res) => {
     
              const index = this.recipientList.indexOf(item)
              this.recipientList.splice(index, 1)
            
            });
      },
    
    },
  }
</script>