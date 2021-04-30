<template>

<v-row>
  <v-col cols="12">
    <v-form  ref="form">
<v-container>

<v-card class="mt-5">
<v-toolbar flat class="primary" dark>
   <h3>Allocate email against the project</h3>
   <v-spacer></v-spacer>
   <v-btn to="/recipients" color="secondary" small>Email Allocation List</v-btn>
</v-toolbar>

  
  <v-col cols="12" md="12">  
   
 <!-- <p class="font-weight-bold">Project</p> -->
      <v-autocomplete
      :rules="Rules" 
      v-model="project_id" 
      :items="projects" 
      required 
      item-text="project_name" 
      item-value="id" 
      single-line 
      auto 
      label="Select Project">
      </v-autocomplete>
  </v-col>

 


<v-col cols="12" md="12">
<!-- <p class="font-weight-bold">Recipient</p> -->

<v-simple-table>
  <thead>


<tr>
<th>
  Email list of Recipients 
</th>
<th>
    <v-btn align="right" small class="secondary" @click="add_loop8">Add Row <v-icon >mdi-plus</v-icon></v-btn>
</th>

</tr>

</thead>

<tbody>

<tr v-for="(l1 , i ) in loop8" :key="i">
<td>
<v-text-field type="email" v-model="l1.email" :rules="Rules" required label="Enter Email Address"></v-text-field>
</td>
<td>
<v-icon v-if="i > 0" @click="deleteLoop8(i)" color="error">mdi-delete</v-icon>
</td>
</tr>

</tbody>

</v-simple-table>
</v-col>

<v-col>
    <div :class="`${classColor}--text`">{{msg}}</div>
  <v-btn class="primary" @click="save">Submit</v-btn>
</v-col>


</v-card>



</v-container>
</v-form>
  </v-col>
  <v-col cols="6"></v-col>
</v-row>

</template>
<script>
export default {
data: () => ({

        project_id :"",
        loop8 : [{email : ''}],
        projects : [],
        exists : [],
        msg : '',
        classColor : '',
  
        Rules: [
          v => !!v || 'This field is required',
        ],

}),

methods : {
 
  add_loop8 () {
      this.loop8.push({email : ''})
    },

      

  deleteLoop8 (i) { this.loop8.splice(i, 1) },

  
  save () {

      if(this.$refs.form.validate()){

            var payload = {    

              project_id :  this.project_id,
              emails:this.loop8

        };
                
        this.$axios.post('recipient',payload).then(res => {
          if(res.data.success){
              this.msg = 'record has been added';
              this.classColor = 'success';
          }
          else if(res.data.exists){
            this.msg = 'record/records exists already';
            this.classColor = 'error';
            this.exists = res.data.exists;
          }
        });


        setTimeout(() => this.msg = '', 3000);
      }

},
},

created () {
this.$axios.get('project').then(res => this.projects = res.data);
this.$axios.get('recipient').then(res => console.log(res));


// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
// var yyyy = today.getFullYear();

// this.today = dd + '/' + mm + '/' + yyyy;
// document.write(today);
}
}
</script>


<style scoped>
th
{
border-right:2px solid white; 
background:#2d57a3; 
color: white !important;
width:250px ;
}

</style>