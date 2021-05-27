<template>
<div>
    <v-row v-if="isSuperAdmin">

          <v-col cols="12"  md="8">
           <v-row>
              <v-col cols="12" sm="8" md="4" class="" v-for="(card,i) in cards" :key="i">
            <v-card :to="card.link" :class="card.color" class="pa-2">
            <v-list-item dark>
            <v-list-item-content>
            <div class="text-center">{{added_zero(card.count)}}</div>
            <div class="text-center" v-text="card.text"></div>
            </v-list-item-content>
            </v-list-item>
            </v-card>
          </v-col>
           </v-row>
          </v-col>

          <v-col cols="12" md="4">

          <v-card>

          <v-img :src="src" height="200px" />

          <div class="pa-5">
            <div class="mb-5">
              <span>Temperature  <div> <b>20</b> </div></span>
            </div>
            <div class="mb-5">
              <span>Temperature  <div> <b>20</b> </div></span>
            </div>
            <div class="mb-5">
              <span>Temperature  <div> <b>20</b> </div></span>
            </div>


          </div>

          </v-card>
          </v-col>
  </v-row>

  <v-row v-if="isProjectAdmin || isManager">
    <v-col md="12"><Project /></v-col>
  </v-row>




</div>


</template>

<script>
import Project from '@/components/Project';

export default {

  components : { Project },

  methods : {
    added_zero(v) { return v < 10 ? '0' + v : v },

  },
 data : () => ({
    //src : 'https://www.timeanddate.com/scripts/weather_og.php?h1=Weather&h2=Local%20Weather%20Forcast',
    src : '/weather_bg.png',
    loaded : false,
    arr : [],
    cards : [],
    value: [],
    weathercity : 'Dubai',
    data: {
        labels: [],

        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      },
      options : {
            showLines: false,
          }
 }),
 created () {
   this.$axios.get('https://api.openweathermap.org/data/2.5/weather?lon=55.3047&lat=25.2582&appid=c77442b715a725c1a34e37121bca1d5c')
    .then(res => {
      console.log(res);
    });
 },
   async mounted () {

    this.loaded = false
    try {

      await this.$axios.get('all')
      .then(res => {

        this.cards = [
                    {link : '/project',text:'Total Projects',count:res.data.ProjectCount,color:'primary',chartColor : 'rgb(45 87 163)'},
                    {link : '/project_admin',text:'Total Project Admins (Clients)',count:res.data.ProjectAdminCount,color:'green',chartColor : 'rgb(45 87 163)'},
                    {link : '/wewatchmanager',text:'Total Wewatch Managers',count:res.data.WewatchManagerCount,color:'purple',chartColor : 'rgb(244 67 54)'},
                    {link : '/user',text:'Total Users',count:res.data.UserCount,color:'info lighten-1',chartColor : 'rgb(75 194 181)'},
                    {link : '/security_guard',text:'Total Security Guard',count:res.data.SecurityGuardCount,color:'orange darken-4', chartColor : 'rgb(230 81 0)'},
                    // {link : '/covid',text:'Daily Man Hours',count:res.data.GetDailyManHoursCount,color:'orange lighten-1',chartColor : 'rgb(255 167 38)'},
                    // {link : '/covid',text:'Lost Work Hours',count:res.data.GetLostWorkHoursCount,color:'brown lighten-1',chartColor : 'rgb(141 110 99)'},

        ];

      });

      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  },
  computed : {
    isSuperAdmin () {
          return this.$auth.user && this.$auth.user.user_type == 'Super Admin'
    },

    isProjectAdmin () {

    },
    isManager () {
      return this.$auth.user && this.$auth.user.user_type == 'Wewatch Manager'
    }

  }
}
</script>
