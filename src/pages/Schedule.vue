<template>
  <div class="container">
    <!-- TITLE -->
    <div class="row">
      <div class="col-md-1">
        <h4>ID {{interviewId}}</h4>
      </div>
      <div class="col-md-10">
        <h2>Semana </h2>
        <h5>Insira suas atividades diárias</h5>
      </div>
      <div class="col-md-1">
        <button class="btn btn-outline-danger">DESISTIR</button>
      </div>
    </div>

    <!-- SCHEDULE -->
    <div class="row align-items-center mt-5 mb-1">
      <carousel class="col pt-2 pb-2" :per-page="1" :mouse-drag="true" :navigation-enabled="true">

        <slide :key="day" v-for="day in days">
          <DaySchedule :day="day"></DaySchedule>
        </slide>

      </carousel>
    </div>

  </div>
</template>

<script>
// Vue carousel for each day in the schedule
import { Carousel, Slide } from 'vue-carousel'
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
      days: ['Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-Feira','Sábado','Domingo'],
      interviewId: null,
      relationship: {
        day: null,
        activity: null,
        startAt: null,
        endAt: null
      }
    }
  },
  mounted() {
    this.getInterviewId()
  },
  methods: {
    getInterviewId: function () {
      this.interviewId = sessionStorage.getItem('interview') || 0
      sessionStorage.clear()
    }
  }
}
</script>

<style scoped>

</style>
