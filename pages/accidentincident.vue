<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{entity}}</v-toolbar-title>
      
        <v-text-field   
        label="Search"
        class="mx-4"
        hide-details v-model="search"></v-text-field>

       

        <v-dialog v-model="dialog" max-width="900px">
        
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }} {{entity}}</span>
              
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>


                  <v-col cols="6" sm="6" md="12">
                    <v-text-field v-model="editedItem.location" label="Location"></v-text-field>
                    <div style="color:red;" v-if="errors.location">{{errors.location[0]}}</div>
                  </v-col>

                   <v-col cols="6" sm="6" md="6">
                   

                          <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="editedItem.reported_date"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                          >
                          <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                          v-model="editedItem.reported_date"
                          label="Reported Date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          ></v-text-field>
                          </template>
                          <v-date-picker
                          v-model="editedItem.reported_date"
                          no-title
                          scrollable
                          >
                          <v-spacer></v-spacer>
                          <v-btn
                          text
                          color="primary"
                          @click="menu = false"
                          >
                          Cancel
                          </v-btn>
                          <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(editedItem.reported_date)"
                          >
                          OK
                          </v-btn>
                          </v-date-picker>
                          </v-menu>
                    <div style="color:red;" v-if="errors.reported_date">{{errors.reported_date[0]}}</div>
                  </v-col>



                   <v-col cols="6" sm="6" md="6">

                     <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          :return-value.sync="editedItem.reported_time"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                          >
                          <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                          v-model="editedItem.reported_time"
                          label="Reported Time"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          ></v-text-field>
                          </template>
                          <v-time-picker
                          v-model="editedItem.reported_time"
                          no-title
                          scrollable
                          >
                          <v-spacer></v-spacer>
                          <v-btn
                          text
                          color="primary"
                          @click="menu1 = false"
                          >
                          Cancel
                          </v-btn>
                          <v-btn
                          text
                          color="primary"
                          @click="$refs.menu1.save(editedItem.reported_time)"
                          >
                          OK
                          </v-btn>
                          </v-time-picker>
                          </v-menu>

                  

                    <div style="color:red;" v-if="errors.reported_time">{{errors.reported_time[0]}}</div>
                  </v-col>

                   <v-col cols="6" sm="6" md="6">
                

                        <v-autocomplete 
                        v-model="editedItem.category_incident" :items="['Nearmiss', 'Personal Injury', 'Property Damage', 'Environmental','Security']"           
                        label="Category of Incident"                        
                        >
                        </v-autocomplete>


                    <div style="color:red;" v-if="errors.category_incident">{{errors.category_incident[0]}}</div>
                  </v-col>

                  <v-col cols="6" sm="6" md="6">
                 

                    <v-autocomplete 
                        v-model="editedItem.type_injury" :items="['First Aid Case', 'Medical Treatment Case', 'Lost Time Injury', 'Environmental','Security','none']"           
                        label="Type of Injury"                        
                        >
                        </v-autocomplete>

                    <div style="color:red;" v-if="errors.type_injury">{{errors.type_injury[0]}}</div>
                  </v-col>

                  <v-col cols="6" sm="6" md="6">
                     <v-autocomplete 
                        v-model="editedItem.type_incident" :items="['Event Equipment', 'Scaffolding Collapse', 'Road Traffic Accident', 'Falls from Height','Other']"           
                        label="Type of Incident"                        
                        >
                        </v-autocomplete>
                        
                    <div style="color:red;" v-if="errors.type_incident">{{errors.type_incident[0]}}</div>
                  </v-col>

                  <v-col cols="6" sm="6" md="6">
                    <v-text-field v-model="editedItem.other" label="Other"></v-text-field>
                    <div style="color:red;" v-if="errors.other">{{errors.other[0]}}</div>
                  </v-col>

                  <v-col cols="6" sm="6" md="6">
                    <v-text-field v-model="editedItem.fatality" label="Fatality"></v-text-field>
                    <div style="color:red;" v-if="errors.fatality">{{errors.fatality[0]}}</div>
                  </v-col>

                  <v-col cols="6" sm="6" md="6">
                    <v-text-field v-model="editedItem.describe_incident" label="Describe the Incident"></v-text-field>
                    <div style="color:red;" v-if="errors.describe_incident">{{errors.describe_incident[0]}}</div>
                  </v-col>
                
                  <v-col cols="6" sm="6" md="6">
                    <v-text-field v-model="editedItem.immediate_action" label="Immediate Action"></v-text-field>
                    <div style="color:red;" v-if="errors.immediate_action">{{errors.immediate_action[0]}}</div>
                  </v-col>

                <v-col cols="6" sm="6" md="6">
                    <v-text-field v-model="editedItem.attachment" label="Attachment"></v-text-field>
                    <div style="color:red;" v-if="errors.attachment">{{errors.attachment[0]}}</div>
                  </v-col>
                  
                 
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small class="primary" text @click="close">Cancel</v-btn>
              <v-btn small class="secondary" text @click="save">Save</v-btn>
              
            </v-card-actions>

          

          </v-card>

        </v-dialog>
      
      </v-toolbar>
    </template>
    <template v-slot:item.attachment="{ item }">

        <v-img v-if="item && item.attachment" height="150px" width="150px"  :src="item.attachment">
        <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          >
          </v-progress-circular>
        </v-row>

         <v-dialog v-model="dialog1" max-width="800px">
            <template v-slot:activator="{ on }">
            <div class="pa-5">
                  <v-img v-on="on" height="100px" width="150px" :src="item.attachment"></v-img>
            </div>
            </template>

            <v-img height="100%" width="100%"  :src="item.attachment"></v-img>
            </v-dialog> 

       
      </template>
      </v-img>

         


    </template>

    

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
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

      entity : 'Accident Incident',  
       menu: false,
       menu1: false,
       
    
      dialog: false,
      dialog1 : false,
      isActive: true,
      search:'',
      headers: [
      {
          text: 'Attachment',
          sortable: true,
          value: 'attachment',

          
          },
       

         {
          text: 'Report Date',
          sortable: true,
          value: 'reported_date',
        },
         {
          text: 'Report Time',
          sortable: true,
          value: 'reported_time',
        },

         {
          text: 'Location',
          sortable: true,
          value: 'location',
        },

         {
          text: 'Incident Category',
          sortable: true,
          value: 'category_incident',
        },
        
         {
          text: 'Type Injury',
          sortable: true,
          value: 'type_injury',
        },
          {
          text: 'Type Incident',
          sortable: true,
          value: 'type_incident',
        },
         {
          text: 'Other',
          sortable: true,
          value: 'other',
        },
        
        
         {
          text: 'Fatality',
          sortable: true,
          value: 'fatality',
        },
        
         {
          text: 'Description Incident',
          sortable: true,
          value: 'describe_incident',
        },
        
       
         {
          text: 'Action',
          sortable: true,
          value: 'immediate_action',
        },


       
        { text: 'Delete', value: 'actions', sortable: false },

      ],
      data: [],
      editedIndex: -1,
      editedItem: {
        attachment : '', 
        location : '',  
        reported_date : '', 
        reported_time : null, 
        category_incident : '', 
        type_injury : '', 
        type_incident : '', 
        other : '', 
        fatality : '', 
        describe_incident : '', 
        immediate_action : '',
      },
    
      errors:[],
      Rules : [
          v => !!v || 'This field is required',
        ],

    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New' : 'Edit'
      },
     
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {

       this.$axios.get(`accidentincident`).then(res => this.data = res.data);

      
      },

      editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.isActive = item.isactive
        this.errors = []
        this.dialog = true
      },

      deleteItem (item) {
       
         confirm('Are you sure you want to delete this item?') && 
         this.$axios.delete('accidentincident/'+item.id)
            .then((res) => {
     
              const index = this.data.indexOf(item)
              this.data.splice(index, 1)
            
            });
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

    

      save () {

        console.log(this.editedItem.category_incident);

        //  let form_data = new FormData();

        //  form_data.append('user_id',this.editedItem.user_id);
        //  form_data.append('project_id',this.editedItem.project_id);
        //  form_data.append('location',this.editedItem.location);
        //  form_data.append('reported_date',this.editedItem.reported_date);
        //  form_data.append('reported_time',this.editedItem.reported_time);
        //  form_data.append('category_incident',this.editedItem.category_incident);
        //  form_data.append('type_injury',this.editedItem.type_injury);
        //  form_data.append('type_incident',this.editedItem.type_incident);
        //  form_data.append('other',this.editedItem.other);
        //  form_data.append('fatality',this.editedItem.fatality);
        //  form_data.append('describe_incident',this.editedItem.describe_incident);
        //  form_data.append('immediate_action',this.editedItem.immediate_action);
        //  form_data.append('attachment',this.editedItem.attachment);

          
        //       this.$axios.put('accidentincident/' + this.editedItem.id,form_data)
        //       .then((res) => {
                   
        //             if(res.data.success){
        //               console.log(res.data.data);
        //               this.data.unshift(res.data.data)
        //               this.close()
        //               this.errors = []
        //               }
        //               else{
        //                 this.errors = res.data.errors
        //                 }
        //     })
        //     .catch(err => console.log(this.errors = err.response.data.errors));
        }
     
    },
  }
</script>