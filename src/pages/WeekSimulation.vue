<template>
  <div class="container">
    <!-- TITLE -->
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <h1>O tempo está passando</h1>
      </div>
      <div class="col-md-1">
        <router-link to="/">
          <button class="btn btn-outline-danger" @click="clearSession">DESISTIR</button>
        </router-link>
      </div>
    </div>

    <div class="clock-display">      
      <h1>{{currentDay}}</h1>
      <h3>{{timeText}}</h3>
    </div>
    <!-- EVENT -->
    <div class="row align-items-center mt-5 mb-1">

      <ShowEvent v-if="activeEvent" :event="currentEvent" @componentClick="hideEvent()"></ShowEvent>
      
      <div class="centralized-div">
        <img src="../assets/loading-gif.gif" alt="time">
      </div>

      <!-- CONTINUE BUTTON -->
      <div class="quit-div" v-if="closeWeek">
        <p>Semana concluída!</p>
        <router-link to="/resultado" :events="events" :eventNumber=0> 
          <button class="btm btn-outline-primary btn-lg">Encerrar semana</button>
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

  data: () => {
    return {
      days: ['Segunda-Feira', 'Terça-Feira','Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo'],
      events: "",
      activeEvent: false,
      currentDay: 'Segunda-Feira',
      currentDayIndex: 0,
      currentHour: 0,
      timeText:"00:00",
      eventNumber: 0,
      firstEvent: "",
      secondEvent: "",
      thirdEvent: "",
      currentEvent:"",
      closeWeek: false
    }
  },

  mounted() {
    this.events = JSON.parse(sessionStorage.getItem('events')) || ""
    if(!this.events){//get events from DB
      this.getAllEvents().then(this.eventSelection).then(this.eventTime).then(this.checkOccurrence).then(this.startTime)
    } else {//get current session events without those which were answered
      this.eventSelection()
      this.eventTime()
      this.startTime()
    }
  },

  methods: {

    clearSession(){
      sessionStorage.clear()
    },

    startTime(){
      this.timeFlow(0,0)
    },

    getAllEvents: function () {
      return getEvents()
      .then( function (res) {
        this.events = res.data
      }.bind(this))
      .catch( function (err){
        console.error('WeekSimulation, getEvents() ', err)
        this.events = [{id: 1, description: "Seu chefe o convida para um happy hour com os diretores no final do expediente.  Ao mesmo tempo, você recebe uma mensagem de seu cônjuge lembrando da apresentação no colégio do seu filho. O que você faz?", op_work: "Ir para o Happy Hour", op_family:"Ir à Apresentação", min_hour: 9, max_hour: 18}, 
                       {id: 2, description: "Você tem muito trabalho a fazer, porém o tempo com sua família anda escasso. No final do expediente você escolheria jantar com sua família ou fazer hora extra?", op_work: "Fazer hora extra", op_family:"Jantar com a Família"},
                       {id: 3, description: "Você acorda de manhã e seu filho não está se sentindo bem. Ao verificar sua agenda, lembra que tem uma reunião com um novo cliente em uma hora. Você leva seu filho ao médico ou vai para a reunião?", op_work: "Leva o filho ao médico", op_family:"Ir para a reunião", min_hour: 9, max_hour: 18}, 
                       {id: 4, description: "Ao checar o seu celular durante uma reunião com os diretores de sua organização, nota que recebeu cinco ligações de seu cônjuge. Você continua na reunião, ou pede para atender o telefone?", op_work: "Continuar a reunião", op_family:"Atender o telefone", min_hour: 7, max_hour: 10},
                       {id: 5, description: "Final de ano, seu chefe chama você para negociar suas férias. Porém, ele apresenta uma proposta de trabalho extra. Você sabe que seria bom para seu futuro na organização. O que você faz?", op_work: "Aceita o trabalho extra", op_family:"Tira as férias", min_hour: 9, max_hour: 18},
                       {id: 6, description: "Você está coordenando um novo projeto, porém seu cônjuge o convida para uma viagem de final de semana. Neste final de semana, você escolhe avançar o projeto ou viajar com família?", op_work: "Avançar o projeto", op_family:"Viajar com a família", min_hour: 9, max_hour: 18},
                       {id: 7, description: "Você está jantando com sua família, quando de repente recebe uma ligação de seu chefe. Você atende imediatamente ou retorna depois do jantar?", op_work: "Retorna depois", op_family: "Atende", min_hour: 20, max_hour: 23}, 
                       {id: 8, description: "Seu chefe lhe oferece uma proposta de transferência sua e de sua família para outra cidade com um significativo aumento de salário.  Quando discutido com a família seu companheiro o lembra que seu filho finalmente se adaptou à escola. O que você escolhe?", op_work: "Aceitar a proposta", op_family: "Recusar a proposta", min_hour: 18, max_hour: 24},
                       {id: 9, description: "Na próxima segunda-feira é seu aniversário de casamento, porém você tem agendada uma viagem de negócios. O que você faz?",op_work: "Viagem de negócio", op_family: "Comemorar aniversário de casamento", min_hour: 0, max_hour: 23},
                       {id: 10, description: "Os pais de seu cônjuge estão na cidade por uma noite, mas você tem que terminar um relatório com urgência. Você sai para jantar com a família do seu cônjuge ou faz hora extra?",op_work: "Terminar relatório", op_family: "Jantar com a família", min_hour: 14, max_hour: 18},
                       {id: 11, description: "Depois de uma reorganização dos horários da empresa, você poderá trocar de turno. Caso queira este novo horário, não poderá buscar seus filhos na escola. Você aceita?",op_work: "Trocar de turno", op_family: "Não trocar de turno", min_hour: 7, max_hour: 24},
                       {id: 12, description: "Você está preparando uma apresentação de um projeto, porém seu filho menor pede para brincar com você. O que faz?",op_work: "Preparar apresentação do projeto", op_family: "Brincar com o filho", min_hour: 18, max_hour: 23},                    
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
      sessionStorage.setItem('events',JSON.stringify(this.events))//since we can't set an object in session storage, we have to convert them to a JSON
    },

    removeEvent(n){
      this.events.splice(n, 1)
    },

    incrementEvents(){
      this.eventNumber += 1
    },
    
    eventTime(){
      var selectedDay= Math.floor(Math.random() * 7)
      var selectedHour = this.randomizeInterval(this.firstEvent)//new method to only randomiz within a specific time interval
      this.firstEvent.day = this.days[selectedDay]
      this.firstEvent.hour = selectedHour
      while(true){
        selectedDay= Math.floor(Math.random() * 7)
        selectedHour = this.randomizeInterval(this.secondEvent)
        if (selectedHour != this.firstEvent.hour || this.days[selectedDay]!= this.firstEvent.day){
          this.secondEvent.day = this.days[selectedDay]
          this.secondEvent.hour = selectedHour
          break
        }
      }
      while(true){
        selectedDay= Math.floor(Math.random() * 7)
        selectedHour = this.randomizeInterval(this.thirdEvent)
        if ((selectedHour != this.firstEvent.hour || this.days[selectedDay]!= this.firstEvent.day) && (selectedHour != this.secondEvent.hour || this.days[selectedDay]!= this.secondEvent.day)){
          this.thirdEvent.day = this.days[selectedDay]
          this.thirdEvent.hour = selectedHour
          break
        }
      }
      console.log(this.firstEvent.day + " - " + this.firstEvent.hour + " ; " + this.secondEvent.day + " - " + this.secondEvent.hour + " ; " + this.thirdEvent.day + " - " + this.thirdEvent.hour)
    },

    randomizeInterval(event){//gets two new parameters from an event (min_hour and max_hour) and returns a value between them
      if(!event.max_hour || !event.min_hour){
        return Math.floor(Math.random() * 24)
      }
      var interval = event.max_hour - event.min_hour
      var hour = Math.floor(Math.random() * interval) + event.min_hour
      return hour
    },

    timeFlow(dayIndex, hourIndex){ 
      this.currentDay = this.days[dayIndex]
      this.currentHour = hourIndex
      this.checkOccurrence()
      this.timeText = this.timeToString(hourIndex)
      this.timeControl = setTimeout(()=>{
        if(this.activeEvent){
          this.currentDayIndex = dayIndex
          return //end of recursion, an event was found which will restart this method from where it stoped
        }
        if(this.currentDay == "Domingo"){
          if (hourIndex < 23){
            this.timeFlow(dayIndex, hourIndex+1)
          } else {
            this.currentDayIndex = dayIndex
            this.closeWeek = true //sunday, 23 hours, our last possible time for an event and max_hour of the loop
          }
        }
        else{
          if (hourIndex < 23){
            this.timeFlow(dayIndex, hourIndex+1)//calls method again, to the next hour
          } else {
            this.timeFlow(dayIndex+1, 0)//calls method again, to the next day
          }
        }
      }, 100)
    },

    timeToString(hour){
      if(hour < 10){
        return `0${hour}:00`
      }
      return `${hour}:00`
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
  margin-top:10px
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
