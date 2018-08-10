<template>
  <div class="container">
    <h5>{{day}} <img v-if="allChecked" src="../assets/green-check.png" alt="ok" height="20px" /></h5>

    <div class="container">
      <div class="row mt-4 p-2 bg-secondary text-white border border-secondary rounded shadow-sm">
        <div class="header text">Atividade</div>
        <div class="header number">Inicio</div>
        <div class="header number">Fim</div>
        <div class="header button">Remover</div>
      </div>
    </div>

    <div class="min-height">

    <div class="row mt-1" :key="position" v-for="position in activities.length">
      <div class="col-md-12">

        <!--SE HOUVER REPETIÇÃO, DEVO ENVIAR, TAMBÉM, TODAS AS ESCOLHAS DO DIA ANTERIOR. -->
        <ActivityInput class="mt-1 red"
        @activityInput="registerInput($event)"
        @changedEndHour="hoursManager(position, $event);"
        @activityRemoved="removeActivity(position-1)"
        @verifyInputs="verifyInputs(position-1)"
        :inputValues="activities[position-1]"
        :previousActivity="activities[position-2]"
        :nextActivity="activities[position]"
        :activityList="activityList">
        </ActivityInput>

      </div>
    </div>

    </div>

    <div class="row mt-4 mb-5">
      <div class="col-md-5">
        <div class="input-group input-group-lg">
          <button type="button" @click="addActivity()" class="btn btn-outline-primary mr-2">Adicionar atividade</button>
        </div>
      </div>
      <button class="btn btn-outline-primary" @click="copyPreviousDay()">Repetir dia anterior</button>
      <!--
      <button type="button" @click="removeActivity()" id="removeButton" class="btn btn-outline-danger">Remover última atividade</button>
      -->
    </div>
  </div>
</template>

<script>
import _ from "underscore"
import ActivityInput from '../components/ActivityInput'
import { getAll as getActivities } from '../services/activity'

export default {
  name: 'DaySchedule',
  props:{
    day:{
      required: true,
      type: String
    },
    activities:{
      required: true,
      type: Array
    },
    dayIndex:{
      required: true,
      type: Number
    }
    //['day'],//Make activities a list passed as prop
    
  }, 
  
  components: {
    ActivityInput,
  },
  data: () => {
    return {
      activityList: [],
      allChecked: false
    }
  },
  mounted() {
    this.getAllActivities()
    // this.checkRepeatedDay()
  },
  methods: {
    getAllActivities: function () {
      console.log("Carregando atividades")
      getActivities()
      .then(res => {
        this.activityList = res.data
      })
      .catch(err => {
        console.error('DaySchedule, getActivies() ', err)
      })
    },
    // hoursManager: function (position, endHour) {
    //   if (!position && !endHour) {
    //     const lastHour = _.last(this.hours.end)
    //     this.hours.start.push(lastHour)

    //     if(lastHour < 24) {
    //       this.hours.end.push(lastHour + 1)
    //     } else {
    //       this.hours.end.push(24)
    //     }

    //     this.verifyHour()
    //     return
    //   }

    //   this.hours.end[position-1] = endHour

    //   for (let i = position + 1; i < this.hours.start.length; i++) {
    //     if(this.hours.start[i]) {
    //       this.hours.start[i] = this.hours.end[i-1]
    //     }
    //   }

    //   let lastActivity = _.last(this.dayActivities[this.day])      
    //   if (lastActivity && lastActivity.end && lastActivity.position === this.positions-1) {
    //     lastActivity.end = _.last(this.hours.end)
    //   }

    //   this.$forceUpdate()
    //   this.verifyHour()
    // },
    
    addActivity(){
      let lastActivityIndex = this.activities.length - 1
          if(this.activities[lastActivityIndex].end >= 24){
              alert("Não é possível adicionar atividades após as 24h, vá para o próximo dia")
              return
          }
          let lastActivity=this.activities[lastActivityIndex]
          let data = {
            index: this.dayIndex,
            newActivityStart: lastActivity.end,
            newActivityEnd: Number(lastActivity.end) + 1,
          }
          console.log(lastActivity)
          this.$emit("activityAdded", data)
    },

    removeActivity(index){
      if(this.activities.length == 1){
        alert("Os dias precisam ter pelo menos uma atividade!")
        return        
      }
      let data = {
        day: this.dayIndex,
        position: index
      }
      console.log(data)
      this.$emit("activityRemoved", data)
      this.verifyInputs(index - 1)
      // this.validateActivities()
    },

    copyPreviousDay(){
      this.$emit("copyPreviousDay", this.dayIndex)
      this.checkDayCompletition()
    },

    verifyInputs(index){
      let currentActivity = this.activities[index]
      let nextActivity = this.activities[index + 1]
      let previousActivity = this.activities[index - 1]
      //verify with previous
      if(previousActivity){
        if(currentActivity.start != previousActivity.end){
          previousActivity.valid = false
        } else {
          previousActivity.valid = true
        }
      }
      //verify with next
      if(nextActivity){
        if (currentActivity.end != nextActivity.start){
          nextActivity.valid = false
        } else {
          nextActivity.valid = true
        }
      }
      console.log(nextActivity)
      this.checkDayCompletition()

    },

    checkDayCompletition(){
      let lastActivityIndex = this.activities.length - 1
      if (this.activities[0].start == 0 && this.activities[lastActivityIndex].end == 24){
        for (let i = 0; i < lastActivityIndex; i++){
          if (!this.activities[i].valid){
            this.allChecked = false
            this.$emit("invalidDay", this.dayIndex)
            return
          }
        }
        this.allChecked = true;
        this.$emit("validDay", this.dayIndex)
      } else {
        this.allChecked = false;
        this.$emit("invalidDay", this.dayIndex)
      }

    }
    
    // addActivity: function () {
    //   this.alert = null
    //   // double negation to return a boolean
    //   const hasActivityOnLastPosition = !!(this.dayActivities[this.day] && this.dayActivities[this.day][this.positions-1])
    //   const hasHourOnLastPosition = !!this.hours.end[this.positions-1]

    //   if (this.positions < 23 && hasHourOnLastPosition && hasActivityOnLastPosition) {
    //     this.positions++
    //     this.hoursManager()
    //   } else {
    //     this.alert = "Por favor, preencha a última atividade."
    //   }

    //   this.verifyHour()
    // },
    // removeActivity: function () {
    //   if(this.positions > 1) {
    //     this.hours.start.pop()
    //     this.hours.end.pop()
    //     this.positions--
    //   }
    // },
    // registerInput: function (event) {
    //   event.position = this.positions - 1
    //   this.activitiesFromInputs.push(event)
    //   this.dayActivities[this.day] = this.activitiesFromInputs

    //   this.verifyHour()
    // },
    // verifyHour: function () {
    //   if(_.last(this.hours.end) === 24) {
    //     this.$emit("totalDay", _.last(this.hours.end))

    //     if (this.dayActivities[this.day] && this.dayActivities[this.day][this.positions-1]) {
    //       this.$emit("dayActivities", this.dayActivities)
    //     }
    //   }
    // },
  }
}
</script>

<style scoped>

.header{
  font-size: 20px;
  text-align: center;
}

.text{
  width:750px;
}

.number{
  margin-left: 10px;
  width: 100px;
}

.button{
  width: 80px;
  text-align: right;

}

.min-height{
  height: 300px;
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
#remove-button{
  vertical-align:middle;
  margin-left: 425px;
}
</style>
