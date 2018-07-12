<template>
  <div class="container">
    <h5>{{day}}</h5>

    <div class="container">
      <div class="row mt-4 p-2 bg-secondary text-white border border-secondary rounded shadow-sm">
        <div class="font-weight-bold col-md-8 pl-10">Atividade</div>
        <div class="font-weight-bold col-md-1 pl-10">Inicio</div>
        <div class="font-weight-bold col-md-1 pl-6">Fim</div>
      </div>
    </div>

    <div class="min-height">

    <div class="row mt-1" :key="position" v-for="position in positions">
      <div class="col-md-12">

        <!--SE HOUVER REPETIÇÃO, DEVO ENVIAR, TAMBÉM, TODAS AS ESCOLHAS DO DIA ANTERIOR. -->
        <ActivityInput class="mt-1" v-if="repeat"
        @activityInput="registerInput($event)"
        @changedEndHour="hoursManager(position, $event);"
        :activities="activities"
        :previousActivity="prevActivity[position-1]"
        :start="hours.start[position-1]"
        :end="hours.end[position-1]"
        :position="position"
        :isDisabled="position !== positions">
        </ActivityInput>

      </div>
    </div>

    </div>

    <div class="row mt-4 mb-5">
      <div class="col-md-5">
        <div class="input-group input-group-lg">
          <button type="button" v-bind:disabled="hours.end[hours.end.length-1]==24" @click="addActivity()" class="btn btn-outline-primary mr-2">Adicionar atividade</button>
          <button @click="generateRepeated()">Gerar dia repetido</button>
        </div>
      </div>
      <button type="button" @click="removeActivity()" id="removeButton" class="btn btn-outline-danger">Remover última atividade</button>
    </div>

    <p v-if="alert" class="alert alert-warning">{{alert}}</p>
  </div>
</template>

<script>
import _ from "underscore"
import ActivityInput from '../components/ActivityInput'
import { getAll as getActivities } from '../services/activity'

export default {
  name: 'DaySchedule',
  props: ['day'],
  components: {
    ActivityInput,
  },
  data: () => {
    return {
      activities: [],
      dayActivities: {},
      prevActivity: [],
      activitiesFromInputs: [],
      hours: { start: [0], end: [1]},
      positions: 1,
      alert: "",
      repeat: false,
      previousDay:""
    }
  },
  mounted() {
    this.getAllActivities()//Checks if the button repeat day was pressed.
    //this.checkRepeatedDay()
  },
  methods: {
    getAllActivities: function () {
      getActivities()
      .then(res => {
        this.activities = res.data
      })
      .catch(err => {
        console.error('DaySchedule, getActivies() ', err)
      })
    },
    hoursManager: function (position, endHour) {
      if (!position && !endHour) {
        const lastHour = _.last(this.hours.end)
        this.hours.start.push(lastHour)

        if(lastHour < 24) {
          this.hours.end.push(lastHour + 1)
        } else {
          this.hours.end.push(24)
        }

        this.verifyHour()
        return
      }

      this.hours.end[position-1] = endHour

      for (let i = position + 1; i < this.hours.start.length; i++) {
        if(this.hours.start[i]) {
          this.hours.start[i] = this.hours.end[i-1]
        }
      }

      let lastActivity = _.last(this.dayActivities[this.day])      
      if (lastActivity && lastActivity.end && lastActivity.position === this.positions-1) {
        lastActivity.end = _.last(this.hours.end)
      }

      this.$forceUpdate()
      this.verifyHour()
    },
    addActivity: function () {
      this.alert = null
      // double negation to return a boolean
      const hasActivityOnLastPosition = !!(this.dayActivities[this.day] && this.dayActivities[this.day][this.positions-1])
      const hasHourOnLastPosition = !!this.hours.end[this.positions-1]

      if (this.positions < 23 && hasHourOnLastPosition && hasActivityOnLastPosition) {
        this.positions++
        this.hoursManager()
      } else {
        this.alert = "Por favor, preencha a última atividade."
      }

      this.verifyHour()
    },
    removeActivity: function () {
      if(this.positions > 1) {
        this.hours.start.pop()
        this.hours.end.pop()
        this.positions--
      }
    },
    registerInput: function (event) {
      event.position = this.positions - 1
      this.activitiesFromInputs.push(event)
      this.dayActivities[this.day] = this.activitiesFromInputs

      this.verifyHour()
    },
    verifyHour: function () {
      if(_.last(this.hours.end) === 24) {
        this.$emit("totalDay", _.last(this.hours.end))

        if (this.dayActivities[this.day] && this.dayActivities[this.day][this.positions-1]) {
          this.$emit("dayActivities", this.dayActivities)
        }
      }
    },
    checkRepeatedDay(){
      if (this.previousDay){
        var len = this.previousDay.length
        this.positions = len
        console.log(len)
        this.hours.start.pop(0)
        this.hours.end.pop(0)
        for (var i = 0; i < len; i++){
          this.prevActivity.push(this.previousDay[i].activity)
          this.hours.start.push(this.previousDay[i].start)
          this.hours.end.push(this.previousDay[i].end)
          console.log(i)
        }
        console.log(this.prevActivity)
        console.log(this.hours)
        this.repeat = true; 
        this.previousDay = "";
      }
      if(this.repeat){
        console.log("repeate active")
      }
    },
    generateRepeated(){
      this.previousDay = [{activity: "Dormir", start: 0, end: 12},
                          {activity: "Trabalhar", start: 12, end: 18},
                          {activity: "Comer", start: 18, end: 20},
                          {activity: "Dormir", start: 20, end: 24}]
      console.log(this.previousDay)
      this.checkRepeatedDay()
    }
  }
}
</script>

<style scoped>

.min-height{
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
.pr-6 {
  padding-right: 6rem;
}
.pr-7 {
  padding-right: 6.8rem;
}
.pl-10 {
  padding-left: 10rem;
}
.pl-6 {
  padding-left: 6.5rem;
}
#removeButton{
  vertical-align:middle;
  margin-left: 425px;
}
</style>
