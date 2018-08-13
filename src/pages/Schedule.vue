<template>
  <div class="container">
    <!-- TITLE -->
    <div class="row">
      <div class="col-md-1">
        <p>Serial: {{interviewId}}</p>
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
      <carousel class="col pt-2 pb-2" :per-page="1" :mouse-drag="true" :navigation-enabled="true">

        <slide class="carousel-wrapper" :key="day" v-for="day in days.length">
          <DaySchedule 
          :activities="activities[day-1]"
          :day="days[day-1]"
          :dayIndex="day-1"
          :hasPreviousWeek="hasPreviousWeek"
          @activityAdded="addActivity($event)"
          @activityRemoved="removeActivity($event)"
          @copyPreviousDay="copyPreviousDay($event)"
          @validDay="validDay($event)"
          @invalidDay="invalidDay($event)"></DaySchedule>
        </slide>
      </carousel>
    </div>

    <!--
    <button @click="atividades()">ver atividades</button>
    -->

    <div v-if="validWeek" class="col-md-2 ml-27">
      <div class="input-group input-group-lg">
        <button type="button" @click="adaptAndCreateWeek()" class="btn btn-primary btn-week" >Iniciar simulação</button>
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
      validDays: [false, false, false, false, false, false, false],
      validWeek: false,
      activitiesByDay: new Array(7),
      interviewId: null,
      scheduleId: null,
      weekActivities:{
        dayActivities:[]
      },
      relationship: {
        dayActivities: [],
      },
      week: sessionStorage.getItem('weekCounter') || 1,
      countHoursInDay: {},
      canStart: false,
      alert: "",
      activities:[[{
                activity: "Atividade",
                id: 0,
                start: 0,
                end: 1,
                valid: true
            }],[{
                activity: "Atividade",
                id: 0,
                start: 0,
                end: 1,
                valid: true
            }],[{
                activity: "Atividade",
                id: 0,
                start: 0,
                end: 1,
                valid: true
            }],
            [{
                activity: "Atividade",
                id: 0,
                start: 0,
                end: 1,
                valid: true
            }],
            [{
                activity: "Atividade",
                id: 0,
                start: 0,
                end: 1,
                valid: true
            }],
            [{
                activity: "Atividade",
                id: 0,
                start: 0,
                end: 1,
                valid: true
            }],
            [{
                activity: "Atividade",
                id: 0,
                start: 0,
                end: 1,
                valid: true
            }]
            ],

      hasPreviousWeek: false,
    }
  },
  mounted() {
    this.getInterviewId()
    this.getScheduleId()
    let lastWeekSchedule = JSON.parse(sessionStorage.getItem('previousWeek')) || ""
    if(lastWeekSchedule){
      this.activities = lastWeekSchedule
      this.validDays = [true, true, true, true, true, true, true]
      this.validWeek = true
      this.hasPreviousWeek = true
      }
  },
  methods: {
    getInterviewId: function () {
      this.interviewId = sessionStorage.getItem('interview') || 0
    },
    getScheduleId: function () {
      this.scheduleId = sessionStorage.getItem('schedule') || 0
    },

    addActivity(data){
      let index = data.index
      if(!data.activity){
        data.activity = "Atividade"
        data.newActivityId = 0
      }          
        
      this.activities[index].push({
        activity:data.activity,
        start: data.newActivityStart,
        end: data.newActivityEnd,
        id: data.newActivityId,
        valid: true
      })
    },

    removeActivity(data){
      let dayIndex = data.day
      let positionIndex = data.position
      //console.log(data)
      this.activities[dayIndex].splice(positionIndex, 1)
    },

    // createRelationship: function (event) {
    //   let weekNumber = sessionStorage.getItem("weekCounter") || 1

    //   // days array to integration with API
    //   const helperDays = {
    //     'Domingo': 1,
    //     'Segunda-Feira': 2,
    //     'Terça-Feira': 3,
    //     'Quarta-Feira': 4,
    //     'Quinta-Feira': 5,
    //     'Sexta-Feira': 6,
    //     'Sábado': 7
    //   }

    //   if (event) {
    //     const dayName = Object.keys(event)[0]
    //     const dayPosition = helperDays[dayName]

    //     if (_.isUndefined(this.activitiesByDay[dayPosition-1])) {
    //       this.activitiesByDay[dayPosition-1] = {
    //         "day_number": null,
    //         "hours": new Array(24),
    //       }
    //     }

    //     // add day to object [0: domingo, 1: segunda...]
    //     this.activitiesByDay[dayPosition-1].day_number = dayPosition

    //     // API need 24h to hours array
    //     for (let hour = 0; hour < 24; hour++) {
    //       // Find position from end hour: _.find(array, conditions)
    //       // get position where hour is equal to activity end hour.
    //       let activityPosition = _.find(event[dayName], function(activity) { return hour <= activity.end }).position

    //       if (hour <= event[dayName][activityPosition].end) {
    //         this.activitiesByDay[dayPosition-1].hours[hour] = {
    //           "activity_id": event[dayName][activityPosition].activity.id,
    //           "hour_number": hour
    //         }
    //       }

    //     }
    //   }

    //   this.relationship = {
    //     "schedule_id": this.scheduleId,
    //     "week_number": weekNumber,
    //     "days": this.activitiesByDay
    //   }

    //   this.verifyHour();
    // },

    adaptAndCreateWeek(){
      //adapts the activities Array to a 24/7 Array, then creates week in DB
      for (let i = 0; i < 7; i++){
        this.activitiesByDay[i]={
          day_number: i+1,
          hours: new Array(24)
        }
        //console.log(this.activitiesByDay)
        this.setDayActivities(i)
        console.log(this.activitiesByDay)
        debugger
      }
      console.log("FIm")
      //console.log(this.activitiesByDay)
      this.relationship = {
        "schedule_id": this.scheduleId,
        "week_number": this.week,
        "days": this.activitiesByDay
      }
      sessionStorage.setItem('previousWeek',JSON.stringify(this.activities))
      //console.log(this.relationship)
      this.createWeek()
    },

    setDayActivities(dayIndex){
      //make 24h array
      console.log(this.activitiesByDay)
      for(let i = 0; i < 24; i++){
        console.log(this.activitiesByDay)
        let newActivity = this.returnActivityByHour(i, dayIndex)
        console.log(newActivity)
        this.activitiesByDay[dayIndex].hours[i] = newActivity
      }
      console.log(this.activitiesByDay)
    },

    returnActivityByHour(activityHour, dayIndex){
      let currentDayActivities = this.activities[dayIndex]
      let dayLength = currentDayActivities.length
      for(let i = 0; i < dayLength; i++){
        let activity = currentDayActivities[i]          
        if(activity.start <= activityHour && activity.end > activityHour){
          console.log(activity)
          console.log("i = " + i)
          console.log("avitidade retornada para dia " + dayIndex + ", hora " + activityHour + ": " + activity.activity  )
          console.log("Id da atividade: " + activity.id)
          return {
            activity_id: activity.id,              
            hour_number: activityHour
          }
        }
      }
      return {
        activity_id: "null",
        hour_number: "null"
      }
    },

    createWeek: function () {
      this.alert = null
      console.log(this.relationship)
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
    // setCountHoursInDays: function(total,day){
    //   this.countHoursInDay[day] = total
    // },
    // verifyHour: function(){
    //   const values = _.values(this.countHoursInDay)
    //   if(values.length === 7){
    //     for(let i = 0 ; i < values.length; i++){
    //       if(values[i] !== 24){ 
    //         return this.canStart = false
    //       }
    //     }
    //    this.canStart = true
    //   }
    //   else{
    //     this.canStart = false
    //   }
    // },

    copyPreviousDay(dayIndex){
      console.log(dayIndex)
      if(this.activities[dayIndex-1]){
        if(confirm("Tem certeza que deseja copiar a agenda de " + this.days[dayIndex-1])){
          this.copyAllActivities(dayIndex, dayIndex - 1)          
        }
      }
    },

    copyAllActivities(currentDayIndex, previousDayIndex){
            let activitiesLength = this.activities[currentDayIndex].length
            this.activities[currentDayIndex].splice(0,activitiesLength)  
            for(let i = 0; i < this.activities[previousDayIndex].length; i++){
                let activityToAdd = {
                    activity: this.activities[previousDayIndex][i].activity,
                    newActivityStart: this.activities[previousDayIndex][i].start,
                    newActivityEnd: this.activities[previousDayIndex][i].end,
                    newActivityId: this.activities[previousDayIndex][i].id,
                    index: currentDayIndex
                }    
                this.addActivity(activityToAdd)
            }
     },

    validDay(index){
      this.validDays[index] = true
      this.verfyWeek()
      console.log(this.validDays)
    },

    invalidDay(index){
      this.validDays[index] = false
      this.validWeek = false
    },

    verfyWeek(){
      for(let i = 0; i < 7; i++){
        if(!this.validDays[i]){
          this.validWeek = false
          return
        }
    }
    this.validWeek = true

    },

    atividades(){
      console.log(this.activities)
    }
  }
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
