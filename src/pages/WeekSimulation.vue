<template>
  <div class="container">
    <!-- TITLE -->
    <div class="row">
      <div class="col-md-11">
        <h1>SIMULANDO A SUA SEMANA...</h1>
      </div>
      <div class="col-md-1">
        <router-link to="/">
          <button class="btn btn-outline-danger">DESISTIR</button>
        </router-link>
      </div>
    </div>

    <div class="clock-display">      
      <h1>{{currentDay}}</h1>
      <h3>{{currentHour}} horas</h3>
    </div>
    <!-- EVENT -->
    <div class="row align-items-center mt-5 mb-1">

      <ShowEvent v-if="checkOccurrence()" :event="currentEvent" @componentClick="hideEvent()"></ShowEvent>
      
      <div class="centralized-div">
        <img style="margin: 0 auto" src="http://gifimage.net/wp-content/uploads/2017/09/blue-loading-gif-transparent-10.gif" alt="time">
      </div>

      <!-- CONTINUE BUTTON -->
      <div class="quit-div" v-if="closeWeek">
        <p>Semana concluída!</p>
        <router-link to="/resultado" :events="events" :eventNumber=0> 
          <button class="btm btn-outline-primary btn-lg" v-on:click="weeks">Encerrar semana</button>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>

import ShowEvent from '../components/ShowEvent';
import { getAll as getEvents } from '../services/event'
import _ from "underscore"

export default {
  
  name: 'WeekSimulation',
  components: {
    ShowEvent,
  },

  props: ['events'],

  data: () => {
    return {
      days: ['Segunda-Feira', 'Terça-Feira','Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado', 'Domingo'],
      activeEvent: false,
      currentDay: 'Segunda-Feira',
      currentDayIndex: 0,
      currentHour: 0,
      eventNumber: 0,
      firstEvent: "",
      secondEvent: "",
      thirdEvent: "",
      currentEvent:"",
      closeWeek: false
    }
  },

  mounted() {
    if(!this.events){
      this.getAllEvents().then(this.eventSelection).then(this.eventTime)
    }
    this.timeFlow(0,0)
  },

  methods: {

    getAllEvents: function () {
      return getEvents()
      .then( function (res) {
        this.events = res.data
      }.bind(this))
      .catch( function (err){
        console.error('WeekSimulation, getEvents() ', err)
        this.events = [{id: 1, description: "Seu chefe o convida para um happy hour com os diretores no final do expediente.  Ao mesmo tempo, você recebe uma mensagem de seu cônjuge lembrando da apresentação no colégio do seu filho. O que você faz?", op_work: "Ir para o Happy Hour", op_family:"Ir à Apresentação"}, 
                       {id: 2, description: "Você tem muito trabalho a fazer, porém o tempo com sua família anda escasso. No final do expediente você escolheria jantar com sua família ou fazer hora extra?", op_work: "Fazer hora extra", op_family:"Jantar com a Família"},
                       {id: 3, description: "Você acorda de manhã e seu filho não está se sentindo bem. Ao verificar sua agenda, lembra que tem uma reunião com um novo cliente em uma hora. Você leva seu filho ao médico ou vai para a reunião?", op_work: "Leva o filho ao médico", op_family:"Ir para a reunião"}, 
                       {id: 4, description: "Ao checar o seu celular durante uma reunião com os diretores de sua organização, nota que recebeu cinco ligações de seu cônjuge. Você continua na reunião, ou pede para atender o telefone?", op_work: "Continuar a reunião", op_family:"Atender o telefone"},
                       {id: 5, description: "Final de ano, seu chefe chama você para negociar suas férias. Porém, ele apresenta uma proposta de trabalho extra. Você sabe que seria bom para seu futuro na organização. O que você faz?", op_work: "Aceita o trabalho extra", op_family:"Tira as férias"},
                       {id: 6, description: "Você está coordenando um novo projeto, porém seu cônjuge o convida para uma viagem de final de semana. Neste final de semana, você escolhe avançar o projeto ou viajar com família?", op_work: "Avançar o projeto", op_family:"Viajar com a família"},
                       {id: 7, description: "Você está jantando com sua família, quando de repente recebe uma ligação de seu chefe. Você atende imediatamente ou retorna depois do jantar?", op_work: "Retorna depois", op_family: "Atende"} 
                      ]
      }.bind(this))
    },

    eventSelection: function() {
      this.events = _.shuffle(this.events)
      this.firstEvent = this.events[0]
      this.removeEvent(0)
      this.secondEvent = this.events[0]
      this.removeEvent(0)
      this.thirdEvent = this.events[0]
      this.removeEvent(0)
    },

    removeEvent(n){
      this.events.splice(n, 1)
    },

    incrementEvents(){
      this.eventNumber += 1
    },
    
    eventTime(){
      var weekDaySelector= Math.floor(Math.random() * 7)
      var hourSelector = Math.floor(Math.random() * 24)
      this.firstEvent.day = this.days[weekDaySelector]
      this.firstEvent.hour = hourSelector
      while(true){
        hourSelector = Math.floor(Math.random() * 24)
        weekDaySelector= Math.floor(Math.random() * 7)
        if (hourSelector != this.firstEvent.hour || weekDaySelector!= this.firstEvent.day){
          this.secondEvent.day = this.days[weekDaySelector]
          this.secondEvent.hour = hourSelector
          break
        }
      }
      while(true){
        hourSelector = Math.floor(Math.random() * 24)
        weekDaySelector= Math.floor(Math.random() * 7)
        if ((hourSelector != this.firstEvent.hour || weekDaySelector!= this.firstEvent.day) && (hourSelector != this.secondEvent.hour || weekDaySelector!= this.secondEvent.day)){
          this.thirdEvent.day = this.days[weekDaySelector]
          this.thirdEvent.hour = hourSelector
          break
        }
      }
    },

    timeFlow(dayIndex, hourIndex){ 
      this.currentDay = this.days[dayIndex]
      this.currentHour = hourIndex
      this.timeControl = setTimeout(()=>{
        if(this.activeEvent){
          this.currentDayIndex = dayIndex
          return //end of recursion, an event was found which will restart this method from where it stoped
        }
        if(this.currentDay == "Domingo"){
          if (this.currentHour < 23){
            this.timeFlow(dayIndex, hourIndex+1)
          } else {
            this.currentDayIndex = dayIndex
            this.closeWeek = true //sunday, 23 hours, our last possible time for an event and end of the loop
          }
        }
        else{
          if (this.currentHour < 23){
            this.timeFlow(dayIndex, hourIndex+1)//calls method again, to the next hour
          } else {
            this.timeFlow(dayIndex+1, 0)//calls method again, to the next day
          }
        }
      }, 100)
    },

    checkOccurrence(){
      if(this.currentHour == this.firstEvent.hour && this.currentDay == this.firstEvent.day){
        this.activeEvent = true
        this.currentEvent = this.firstEvent
        return true
      }
      
      if(this.currentHour == this.secondEvent.hour && this.currentDay == this.secondEvent.day){
        this.activeEvent = true
        this.currentEvent = this.secondEvent
        return true
      }

      if(this.currentHour == this.thirdEvent.hour && this.currentDay == this.thirdEvent.day){
        this.currentEvent = this.thirdEvent
        this.activeEvent = true
        return true
      }
      return false
    },      

    hideEvent(){
      this.activeEvent = false
      if(this.currentHour < 23 || this.currentDay == "Domingo"){
        this.timeFlow(this.currentDayIndex, this.currentHour + 1)//restarts the time flow at the next possible hour
      } else {
        this.timeFlow(this.currentDayIndex + 1, this.currentHour)//restarts the time flow at the next possible day
      }
    },

  }
}
</script>

<style scoped>

.clock-display{
  margin-top:50px
}

.quit-div{
  margin: 0 auto;
  text-align: center;
  margin-top: 30px; 
  clear: both 

}

.centralized-div{
  margin: 0 auto;
  width: 100%
}
</style>
