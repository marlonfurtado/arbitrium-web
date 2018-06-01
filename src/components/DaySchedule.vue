<template>
  <div class="container">
    <h5>{{day}}</h5>

    <!-- TODO: HEADER -->
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
        :end="hours.end[position-1]">
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
      message: "",
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
        if(lastHour < 24)
          this.hours.end.push(lastHour + 1)
        else 
          this.hours.end.push(24)

        return
      }

      this.hours.start[position] = endHour 
      this.hours.end[position-1] = endHour

      for (let i = position + 1; i < this.hours.start.length; i++) {
        if(this.hours.start[i]) {
          this.hours.start[i] = this.hours.end[i-1]
        }
      }

      this.$forceUpdate();
      this.counterHours();
    },
    addActivity: function () {
      // TODO: Validations to add new activity
      if (this.positions < 23){
        this.positions++
      }
      this.hoursManager()
    },
    removeActivity: function () {
      if(this.positions > 1) {
        this.hours.start.pop()
        this.hours.end.pop()
        this.positions--
      }
    },
    registerInput: function (event) {
      // TODO
      this.activitiesFromInputs.push(event)
      this.dayActivities[this.day] = this.activitiesFromInputs

      this.$emit("dayActivities", this.dayActivities)
    },
    counterHours: function () {
      let totalDay = 0
      for (let i = 0; i < this.hours.end.length; i++) {
        const diff = this.hours.end[i] - this.hours.start[i]
        totalDay += diff
      }
      try{
        if(totalDay === 24) {
          this.$emit("totalDay", totalDay)
        }
        else if(totalDay > 24) {
          throw "Possui mais de 24 horas!";
        }  
        else{ 
          throw "Possui menos de 24 horas!";
        }   
      }
      catch(err){
        this.message = "ATENÇÃO!! O dia " + err;
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
