<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{entity}}</v-toolbar-title>

        <v-text-field
         class="mx-4"
        label="Search"
        hide-details v-model="search"></v-text-field>

      </v-toolbar>
    </template>
    <template v-slot:item.attachments="{ item }">


        <v-img height="150px" width="150px"  :src="item.attachments" />

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
      <v-btn small color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({

      entity : 'Observation',
      search:'',
      headers: [
         {
          text: 'Attachments',
          sortable: true,
          value: 'attachments',
        },
        {
          text: 'Project',
          sortable: true,
          value: 'project.project_name',
        },
         {
          text: 'Action',
          sortable: true,
          value: 'action',
        },
        {
          text: 'Location',
          sortable: true,
          value: 'location',
        },
        {
          text: 'Description',
          sortable: true,
          value: 'observation_description',
        },


        { text: 'Delete', value: 'actions', sortable: false },

      ],
      data: [],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New' : 'Edit'
      },

    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {

          this.$axios.get(`observation/project/${this.$route.params.id}`)
            .then(res => {
            this.data = res.data;
            });



      },

      deleteItem (item) {

         confirm('Are you sure you want to delete this item?') &&
         this.$axios.delete('observation/'+item.id)
            .then((res) => {

              const index = this.data.indexOf(item)
              this.data.splice(index, 1)

            });
      },
    },
  }
</script>
