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
      </div>
      <div class="col-md-1">
        <button class="btn btn-outline-danger">DESISTIR</button>
      </div>
    </div>

    <!-- SCHEDULE -->
    <div class="row align-items-center mt-5 mb-1">
      <carousel class="col pt-2 pb-2" @pageChange="pageChange" :per-page="1" :mouse-drag="true" :navigation-enabled="true">

        <slide class="carousel-wrapper" :key="day" v-for="day in days">
          <DaySchedule @dayActivities="createRelationship($event)" :day="day"></DaySchedule>
        </slide>

      </carousel>
    </div>

    <div v-if="isSunday" class="col-md-2 ml-27">
      <div class="input-group input-group-lg">
        <button type="button" @click="createWeek" class="btn btn-primary btn-week">Iniciar simulação</button>
      </div>
    </div>
  </div>
</template>

<script>
// Vue carousel for each day in the schedule
import { Carousel, Slide } from 'vue-carousel'
import { getAll as getActivities } from '../services/activity'
import { create as createWeek } from '../services/week'
import DaySchedule from '../components/DaySchedule'

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
      interviewId: null,
      relationship: {
        dayActivities: [],
      },
      week: sessionStorage.getItem('weekCounter') || 1
    }
  },
  mounted() {
    this.getInterviewId()
  },
  methods: {
    getInterviewId: function () {
      this.interviewId = sessionStorage.getItem('interview') || 0
     // sessionStorage.clear()
    },
    createRelationship: function (event) {
      // TODO: tratar objeto (this.relationship) para integrar com API
      console.log('event create RELATIONSHIP:  ')
      console.log(event)

      this.relationship = {
        "schedule_id": 0, // waiting merge (branch 012)
        "week_number": 1, // TODO, is 1? 
        "days": [ // array with 7 days
          {
          "week_id": 1,
          "day_number": null,
          "hours": [
            {  // array with 24 hours
            "activity_id": null,
            "hour_number": null
            }
          ]
        }]
      }
    },
    createWeek: function () {
      // TODO: integrar com API após objeto pronto
      createWeek(this.relationship)
      .then(res => {
        this.$router.push('evento')
      })
      .catch(err => {
        this.$router.push('evento')
      })
    },
    pageChange: function (day) {
      if (day === 6) this.isSunday = true
      else this.isSunday = false
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
