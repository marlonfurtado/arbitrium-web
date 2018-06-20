<template>
  <div class="container">
    <!-- TITLE -->
    <div class="row">
      <div class="col-md-1">
        <p>ID {{interviewId}}</p>
      </div>
      <div class="col-md-10">
        <h5>Semana {{week}}</h5>
        <h5>Insira suas atividades diárias</h5>
        <p v-if="alert" class="alert alert-warning">{{alert}}</p>
      </div>
      <div class="col-md-1">
        <router-link to="/fim">
            <button class="btn btn-outline-danger">DESISTIR</button>
        </router-link>
      </div>
    </div>

    <!-- SCHEDULE -->
    <div class="row align-items-center mt-5 mb-1">
      <carousel class="col pt-2 pb-2" @pageChange="pageChange" :per-page="1" :mouse-drag="true" :navigation-enabled="true">

        <slide class="carousel-wrapper" :key="day" v-for="day in days">
          <DaySchedule @dayActivities="createRelationship($event);" @totalDay="setCountHoursInDays($event,day)" :day="day"></DaySchedule>
        </slide>

      </carousel>
    </div>

    <div v-if="isSunday" class="col-md-2 ml-27">
      <div class="input-group input-group-lg">
        <button type="button" @click="createWeek" class="btn btn-primary btn-week" >Iniciar simulação</button>
      </div>
    </div>
  </div>
</template>

<script>
// Vue carousel for each day in the schedule
import { Carousel, Slide } from 'vue-carousel'
import { getAll as getActivities } from '../services/activity'
import { create } from '../services/week'
import DaySchedule from '../components/DaySchedule'
import _ from "underscore"

export default {
  name: 'Schedule',
  components: {
    DaySchedule,
    Carousel,
    Slide
  },
  data: () => {
    return {
      isSunday: false,
      days: ['Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-Feira','Sábado','Domingo'],
      activitiesByDay: new Array(7),
      interviewId: null,
      scheduleId: null,
      relationship: {
        dayActivities: [],
      },
      week: sessionStorage.getItem('weekCounter') || 1,
      countHoursInDay: {},
      canStart: false,
      alert: ""
    }
  },
  mounted() {
    this.getInterviewId()
    this.getScheduleId()
  },
  methods: {
    getInterviewId: function () {
      this.interviewId = sessionStorage.getItem('interview') || 0
    },
    getScheduleId: function () {
      this.scheduleId = sessionStorage.getItem('schedule') || 0
    },
    createRelationship: function (event) {
      let weekNumber = sessionStorage.getItem("weekCounter") || 1

      // days array to integration with API
      const helperDays = {
        'Domingo': 1,
        'Segunda-Feira': 2,
        'Terça-Feira': 3,
        'Quarta-Feira': 4,
        'Quinta-Feira': 5,
        'Sexta-Feira': 6,
        'Sábado': 7
      }

      if (event) {
        const dayName = Object.keys(event)[0]
        const dayPosition = helperDays[dayName]

        if (_.isUndefined(this.activitiesByDay[dayPosition-1])) {
          this.activitiesByDay[dayPosition-1] = {
            "day_number": null,
            "hours": new Array(24),
          }
        }

        // add day to object [0: domingo, 1: segunda...]
        this.activitiesByDay[dayPosition-1].day_number = dayPosition

        // API need 24h to hours array
        for (let hour = 0; hour < 24; hour++) {
          // Find position from end hour: _.find(array, conditions)
          // get position where hour is equal to activity end hour.
          let activityPosition = _.find(event[dayName], function(activity) { return hour <= activity.end }).position

          if (hour <= event[dayName][activityPosition].end) {
            this.activitiesByDay[dayPosition-1].hours[hour] = {
              "activity_id": event[dayName][activityPosition].activity.id,
              "hour_number": hour
            }
          }

        }
      }

      this.relationship = {
        "schedule_id": this.scheduleId,
        "week_number": weekNumber,
        "days": this.activitiesByDay
      }

      this.verifyHour();
    },
    createWeek: function () {
      this.alert = null
      create(this.relationship)
      .then(res => {
        if (res.status === 200) {
          this.$router.push('evento')
        } else {
          console.error("Erro ao criar agenda. ", res)
        }
      })
      .catch(err => {
        console.error("Erro ao criar agenda. ", err.response)
        this.alert = "Por favor,verifique se todos os dias tem 24 Horas e selecione novamente a ultima atividade de Domingo"
      })
    },
    pageChange: function (day) {
      if (day >= 6 ) {
        this.isSunday = true
        this.verifyHour()
      }
      else{ 
        this.isSunday = false;
      }  
    },
    setCountHoursInDays: function(total,day){
      this.countHoursInDay[day] = total
    },
    verifyHour: function(){
      const values = _.values(this.countHoursInDay)
      if(values.length === 7){
        for(let i = 0 ; i < values.length; i++){
          if(values[i] !== 24){ 
            return this.canStart = false
          }
        }
       this.canStart = true
      }
      else{
        this.canStart = false
      }
    }
  },
}
</script>

<style scoped>
.ml-27 {
  margin-left: 27.1rem;
}
.btn-week {
  font-size: 26px;
  padding: 10px;
}
.carousel-wrapper {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
