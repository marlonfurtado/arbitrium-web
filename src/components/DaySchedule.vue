<template>
  <div class="container">
    <p class="font-weight-bold mb-4 pr-6">{{day}}</p>
    <div class="row mt-1" :key="position" v-for="position in positions">
      <div class="col-md-11">
        <ActivityInput @activityInput="createDay($event)" :activities="activities" :start="position" :end="position+1" class="mt-1"></ActivityInput>
      </div>
      <div class="col-md-1">
        <button type="button" @click="removeActivity()" class="close mr-5 mt-3" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>

    <div class="row mt-3 mb-2">
      <div class="col-md-5">
        <div class="input-group input-group-lg">
          <button type="button" @click="addActivity()" class="btn btn-outline-primary mr-2">Adicionar atividade</button>
          <button type="button" class="btn btn-outline-dark">Repetir para os próximos dias</button>
        </div>
      </div>
      <button type="button" @click="removeActivity()" style="vertical-align:middle;margin-left: 334px;" class="btn btn-outline-danger">Remover última atividade</button>
    </div>

  </div>
</template>

<script>
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
      positions: 1,
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
                           { id: 3, description: "Deslocamento de trabalho" }, 
                           { id: 4, description: "Trabalho" }]
      })
    },
    addActivity: function () {
      this.positions++
    },
    removeActivity: function () {
        if(this.positions > 1)
          this.positions--;
    },
    createDay: function (event) {
      this.activitiesFromInputs.push(event)
      this.dayActivities[this.day] = this.activitiesFromInputs

      this.$emit("dayActivities", this.dayActivities);
    }
  }
}
</script>

<style scoped>
.pr-6 {
  padding-right: 6rem;
}
</style>
