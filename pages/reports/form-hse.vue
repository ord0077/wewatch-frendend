<template>
<v-form>
<v-container>
<v-card>
<v-col cols="12" md="12">  
<p class="font-weight-bold">Event/Project</p>

<v-autocomplete v-model="project" :items="projects" required item-text="project_name" item-value="id" single-line auto label="Project">
</v-autocomplete>

</v-col>

<v-col cols="12" md="12">
<p class="font-weight-bold">Current Date</p>
<v-text-field readonly v-model="today" required></v-text-field>
</v-col>
<v-col cols="12" md="12">

<p class="font-weight-bold">Daily Situation Summary</p>
<v-textarea v-model="summary" label="write your answer" required></v-textarea>
</v-col> 
</v-card>

<v-card class="mt-5">

<v-col>
<p class="font-weight-bold">Event / Project Details</p>
</v-col>

<v-col cols="12" md="12">
<v-simple-table>
<thead>


<tr>
<th style="border-right:2px solid white; background:#2d57a3; color:white; width:250px;">
Weather
</th>
<th style="border-right:2px solid white; background:#2d57a3; color:white;width:250px;">
Wind Strength
</th>
<th class="primary white--text text-left">
Remarks 
</th>

</tr>

</thead>
<tbody>
<tr

>
<td>
<v-text-field v-model="weather" required placeholder="Weather"></v-text-field>
</td>
<td>
<v-text-field v-model="wind_strength" label="Wind Strength" required></v-text-field>
</td>
<td>  
<v-text-field v-model="event_remarks1" label="Remarks" rows="3" required></v-text-field>
</td>
</tr>
</tbody>
</v-simple-table>
</v-col>


<v-col cols="12" md="12">

<v-simple-table>
<thead>


<tr>
<th style="border-right:2px solid white; background:#2d57a3; color:white; width:250px;">
Design and Build Timings
</th>
<th style="border-right:2px solid white; background:#2d57a3; color:white;width:250px;">

Daily Operations man-hour

</th>
<th class="primary white--text text-left">
Remarks 
</th>

</tr>

</thead>
<tbody>
<tr

>
<td>
<v-text-field v-model="design_and_Build_timings" required placeholder="Design and Build Timings"></v-text-field>
</td>
<td>
<v-text-field v-model="daily_operations_man_hour" label="Daily Operations man-hour" required></v-text-field>
</td>
<td>  
<v-text-field v-model="event_remarks2" label="Remarks" rows="3" required></v-text-field>
</td>
</tr>
</tbody>

</v-simple-table>
</v-col>




<v-col cols="12" md="12">

<v-simple-table>
<thead>

<tr>

<th style="border-right:2px solid white; background:#2d57a3; color:white; width:250px;">
Contractor Name 
</th>
<th style="border-right:2px solid white; background:#2d57a3; color:white;width:250px;">
Staff Numbers
</th>


<th class="primary white--text text-left">
Shift Pattern 
</th>

<th class="primary white--text text-left">
Daily man-hours
</th>

<th class="primary white--text text-left">
<v-btn small class="secondary" @click="add_loop1">
Add Row <v-icon >mdi-plus</v-icon>
</v-btn>
</th>
</tr>

</thead>
<tbody>
<tr v-for="(l1 , i ) in loop1" :key="i">
<td>
<v-text-field v-model="l1.contractor_name" required placeholder="Contractor Name"></v-text-field>
</td>
<td>
<v-text-field v-model="l1.staff_numbers" label="Staff Numbers" required></v-text-field>
</td>
<td>  
<v-text-field v-model="l1.shift_pattern" label="Shift Pattern" required></v-text-field>
</td>
<td>  
<v-text-field v-model="l1.daily_man_hours" label="Daily man-hours" required></v-text-field>
</td>
<td>
<v-icon v-if="i > 0" @click="deleteLoop1(i)" color="error">mdi-delete</v-icon>
</td>
</tr>
</tbody>

</v-simple-table>
</v-col>

<v-col cols="12" md="12">

<v-simple-table>
<thead>


<tr>
<th style="border-right:2px solid white; background:#2d57a3; color:white; width:250px;">
Type of Contractor / Sub-Contractor
</th>
<th style="border-right:2px solid white; background:#2d57a3; color:white;width:250px;">

Staff Numbers

</th>
<th class="primary white--text text-left">
Shift Pattern
</th>

</tr>


</thead>

<tbody>

<tr>
<td>Office Management  </td>
<td>    
<v-text-field v-model="office_management_number" required placeholder="Office Management"></v-text-field> 
</td>
<td>Day Shift Only</td>
</tr>
<tr>
<td>Security </td>
<td>    
<v-text-field v-model="dayshift_security" required placeholder="Security (Day Shift)"></v-text-field> 
</td>
<td>Day Shift</td>
</tr>
<tr>
<td>Security </td>
<td>    
<v-text-field v-model="nightshift_security" required placeholder="Security (Night Shift)"></v-text-field> 
</td>
<td>Night Shift </td>
</tr>
<tr>
<td>Construction and Production Workers  </td>
<v-text-field v-model="dayshift_workers" required placeholder="Construction and Production Workers (Day Shift)"></v-text-field> 
<td>Day Shift</td>
</tr>
<tr>
<td>Construction and Production Workers</td>
<td>    
<v-text-field v-model="nightshift_workers" required placeholder="Construction and Production Workers (Night Shift)"></v-text-field> 
</td>
<td>Night Shift </td>
</tr>
<tr>
<td></td>
<td>TOTAL man-days</td>
<td>    
<v-text-field v-model="total_mandays" required placeholder="TOTAL man-days"></v-text-field> 
</td>
</tr>
<tr>
<td></td>
<td>Total man-hours</td>
<td>    
<v-text-field v-model="total_manhours" required placeholder="Total man-hours"></v-text-field> 
</td>
</tr>
<tr>
<td></td>
<td>Total lost work hours</td>
<td>    
<v-text-field v-model="total_lost_work_hours" required placeholder="Total lost work hours"></v-text-field> 
</td>
</tr>
</tbody>



</v-simple-table>
</v-col>
</v-card>


<v-card class="mt-5">



<v-col cols="12" md="12">

<p class="font-weight-bold">Event / Project Key Meetings and Action Points</p>
<v-textarea

v-model="action_points"
label="write your answer"
required
></v-textarea>

<!-- <p class="error--text">Confidential</p>

<p>Prepared by WeWatch FZ LLC</p> -->
</v-col> 

</v-card>


<v-card class="mt-5">




<v-col cols="12" md="12">
<p class="font-weight-bold">Design/Build Activities in Progress</p>

<v-simple-table>

<thead>


<tr>
<th style="border-right:2px solid white; background:#2d57a3; color:white; width:250px;">
Occurrence
</th>
<th style="border-right:2px solid white; background:#2d57a3; color:white;width:250px;">
Yes or No
</th>
<th class="primary white--text text-left">
Remarks 
</th>

</tr>

</thead>
<tbody>
<tr

>
<td>
<v-text-field v-model="occurrence" required placeholder="Occurrence"></v-text-field>
</td>
<td>
<v-text-field v-model="occurrence_yes_no" label="Yes or No" required></v-text-field>
</td>
<td>  
<v-text-field v-model="occurence_remarks" label="Remarks" rows="3" required></v-text-field>
</td>
</tr>
</tbody>
</v-simple-table>
</v-col>
</v-card>



<v-card class="mt-5">
<v-col cols="12" md="12">
<p class="font-weight-bold">Toolbox Talk / HSE / Security Inductions</p>
<v-textarea

v-model="inductions"
label="write your answer"
required
></v-textarea>
</v-col> 

</v-card>

<v-card class="mt-5">
<v-col cols="12" md="12">
<p class="font-weight-bold">Event/Project Health, Safety and Environmental Compliance</p>

<v-simple-table>

<thead>


<tr>
<th style="border-right:2px solid white; background:#2d57a3; color:white; width:250px;">
Occurrence
</th>
<th style="border-right:2px solid white; background:#2d57a3; color:white;width:250px;">
Yes or No
</th>
<th class="primary white--text text-left">
Remarks 
</th>

</tr>

</thead>
<tbody>
<tr

>
<td>
<v-text-field v-model="compliance_occurrence" required placeholder="Occurrence"></v-text-field>
</td>
<td>
<v-text-field v-model="compliance_occurrence_yes_no" label="Yes or No" required></v-text-field>
</td>
<td>  
<v-text-field v-model="compliance_occurrence_remarks" label="Remarks" rows="3" required></v-text-field>
</td>
</tr>
</tbody>
</v-simple-table>
</v-col>
</v-card>


<v-card class="mt-5">
<v-col cols="12" md="12">
<p class="font-weight-bold">New Hazard Identified</p>

<v-simple-table>

<thead>


<tr>
<th style="border-right:2px solid white; background:#2d57a3; color:white; width:250px;">
Add to Event / Project Risk Assessment
</th>
<th style="border-right:2px solid white; background:#2d57a3; color:white;width:250px;">
Yes or No
</th>
<th class="primary white--text text-left">
Corrective Actions 
</th>

</tr>

</thead>
<tbody>
<tr

>
<td>
<v-text-field v-model="compliance_occurrence" required placeholder="Occurrence"></v-text-field>
</td>
<td>
<v-text-field v-model="compliance_occurrence_yes_no" label="Yes or No" required></v-text-field>
</td>
<td>  
<v-text-field v-model="compliance_occurrence_remarks" label="Remarks" rows="3" required></v-text-field>
</td>
</tr>
</tbody>
</v-simple-table>
</v-col>
</v-card>


<v-card class="mt-5">


<v-col cols="12" md="12">
<p class="font-weight-bold">Incident / Accident or Near Miss Reporting</p>

<v-simple-table>

<thead>


<tr>
<th style="border-right:2px solid white; background:#2d57a3; color:white; width:250px;">
Occurrence
</th>
<th style="border-right:2px solid white; background:#2d57a3; color:white;width:250px;">
Yes or No
</th>
<th class="primary white--text text-left">
Remarks 
</th>

</tr>

</thead>
<tbody>
<tr

>
<td>
<v-text-field v-model="compliance_occurrence" required placeholder="Occurrence"></v-text-field>
</td>
<td>
<v-text-field v-model="compliance_occurrence_yes_no" label="Yes or No" required></v-text-field>
</td>
<td>  
<v-text-field v-model="compliance_occurrence_remarks" label="Remarks" rows="3" required></v-text-field>
</td>
</tr>
</tbody>
</v-simple-table>
</v-col>
</v-card>


<v-card class="mt-5">

<v-col cols="12" md="12">
<p class="font-weight-bold">COVID-19 Mitigation Compliance</p>

<v-simple-table>

<thead>


<tr>
<th style="border-right:2px solid white; background:#2d57a3; color:white; width:250px;">
Occurrence
</th>
<th style="border-right:2px solid white; background:#2d57a3; color:white;width:250px;">
Yes or No
</th>
<th class="primary white--text text-left">
Remarks 
</th>

</tr>

</thead>
<tbody>
<tr

>
<td>
<v-text-field v-model="compliance_occurrence" required placeholder="Occurrence"></v-text-field>
</td>
<td>
<v-text-field v-model="compliance_occurrence_yes_no" label="Yes or No" required></v-text-field>
</td>
<td>  
<v-text-field v-model="compliance_occurrence_remarks" label="Remarks" rows="3" required></v-text-field>
</td>
</tr>
</tbody>
</v-simple-table>
</v-col>
</v-card>

<v-card class="mt-5">

<v-col cols="12" md="12">

<p class="font-weight-bold">Procurement Request</p>
<v-textarea

v-model="procurement_request"
label="write your answer"
required
></v-textarea>
</v-col> 

</v-card>

<v-card class="mt-5">


<v-col cols="12" md="12">
<p class="font-weight-bold">Red Flag</p>
<v-textarea

v-model="red_flag"
label="write your answer"
required
></v-textarea>
</v-col> 
</v-card>

<v-card class="mt-5">
  <v-col>
  <v-btn class="primary ma-2">Submit</v-btn>
</v-col>

</v-card>


</v-container>
</v-form>
</template>
<script>
export default {
data: () => ({
office_management_number : '',
dayshift_security : '',
nightshift_security : '',
dayshift_workers : '',
nightshift_workers : '',
total_mandays : '',
total_manhours : '',
total_lost_work_hours : '',
occurrence : '',
occurrence_yes_no : '',
occurence_remarks : '',
compliance_occurrence : '',
compliance_occurrence_yes_no : '',
compliance_occurrence_remarks : '',
compliance_occurrence  :'',  
loop1 : [{contractor_name : '', staff_numbers : '', shift_pattern : '', daily_man_hours : '', }],
project: '',
procurement_request : '',
red_flag : '',
today : '',
summary : '',
event : '',  
event_remarks : '',
action_points : '',
inductions : '',
weather : '',
wind_strength : '',
design_and_Build_timings : '',
daily_operations_man_hour : '',
event_remarks1 : '',
event_remarks2 : '',
projects : [],
Rules: [
v => !!v || 'This field is required',
],

}),

methods : {
add_loop1 () {

this.loop1.push({contractor_name : '', staff_numbers : '', shift_pattern : '', daily_man_hours : '', })
},

deleteLoop1 (i) { this.loop1.splice(i, 1) }

},

created () {
this.$axios.get('project').then(res => this.projects = res.data);


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

this.today = dd + '/' + mm + '/' + yyyy;
// document.write(today);
}
}
</script>


<style scoped>
th
{
background: #f1f1f1;
border: 1px solid #717171;
}

</style>