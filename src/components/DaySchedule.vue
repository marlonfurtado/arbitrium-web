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

    <div class="row mt-1" :key="position" v-for="position in positions">
      <div class="col-md-12">

        <ActivityInput class="mt-1"
        @activityInput="registerInput($event)"
        @changedEndHour="hoursManager(position, $event);"
        :activities="activities"
        :start="hours.start[position-1]"
        :end="hours.end[position-1]"
        :position="position"
        :isDisabled="position !== positions">
        </ActivityInput>

      </div>
    </div>

    <div class="row mt-4 mb-5">
      <div class="col-md-5">
        <div class="input-group input-group-lg">
          <button type="button" v-bind:disabled="hours.end[hours.end.length-1]==24" @click="addActivity()" class="btn btn-outline-primary mr-2">Adicionar atividade</button>
          <button type="button" class="btn btn-outline-dark">Repetir para os próximos dias</button>
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
      activitiesFromInputs: [],
      hours: { start: [0], end: [1]},
      positions: 1,
      alert: ""
    }
  },
  mounted() {
    this.getAllActivities()
  },
  methods: {
    getAllActivities: function () {
      getActivities()
      .then(res => {
        this.activities = res.data
      })
      .catch(err => {
        console.error('DaySchedule, getActivies() ', err)
        this.activities = [{ id: 1, description: "Dormir" },
                           { id: 2, description: "Comer" },
                           { id: 3, description: "Deslocamento do trabalho" },
                           { id: 4, description: "Trabalho" }]
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
    }
  }
}
</script>

<style scoped>
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
