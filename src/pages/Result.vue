<template>
<div>
  <div style="float: right; margin-right: 50px">
    <router-link to="/fim">
      <button class="btn btn-outline-danger">DESISTIR</button>
    </router-link>
  </div>
  <div class="container">
    <p style="font-size: 90px;">Fim da Semana {{weekCounter}}</p>
    <p style="font-size: 20px;">Seu resultado foi:</p>
  </div>

  <div id="boxResults">
    <div id="boxHealth">
      <img src="../assets/baseline-healing-24px.svg" class="material-icons">
      <span class="font-weight-bold">{{health}}</span>
      <p class="small">Saúde</p>
    </div>
    <div id="boxFamily">
      <img src="../assets/baseline-home-24px.svg" class="material-icons">
      <span class="font-weight-bold">{{family}}</span>
      <p class="small">Família</p>
    </div>
    <div id="boxWork">
      <img src="../assets/baseline-work-24px.svg" class="material-icons">
      <span class="font-weight-bold">{{work}}</span>
      <p class="small">Trabalho</p>
    </div>
    <div id="boxMoney">
      <img src="../assets/baseline-monetization_on-24px.svg" class="material-icons">
      <span class="font-weight-bold">{{money}}</span>
      <p class="small">Dinheiro</p>
    </div>
  </div>

  <div style= "margin-top: 600px;" v-if="!end">
    <router-link to="/agenda">
      <button class="btn-outline-primary btnLarger" v-on:click="addCont">Continuar</button>
    </router-link>
  </div>
  <div style= "margin-top: 550px;" v-if="end">
    <button class="btn-outline-primary btnLarger" @click="clearStorage">Fim</button>
  </div>
</div>
</template>

<script>
import { get as getResults } from '../services/results'
export default {
  name: 'Result',
  data() {
    return {
      health: null,
      family: null,
      work: null,
      money: null,
      end: false,
      weekCounter: sessionStorage.getItem('weekCounter') || 1,
      interviewId: sessionStorage.getItem('interview'),
      MAX_WEEKS: 4
    }
  },
  methods: {
    clearSession(){
      sessionStorage.clear()
    },  
    results: function() {
      getResults(this.interviewId)
      .then(results => {
        this.health = results.data.status_health_activity
        this.family = results.data.status_family_activity
        this.work = results.data.status_work_activity
        this.money = results.data.status_money_activity
      })
      .catch(error => {
        console.error('Erro ao calcular resultados.',  error)
        this.health = "*"
        this.family = "*"
        this.work = "*"
        this.money = "*"
      })
    },
    addCont: function () {
      this.weekCounter = sessionStorage.getItem('weekCounter') || 1
      this.weekCounter++
      sessionStorage.setItem('weekCounter', this.weekCounter)
    },
    clearStorage: function () {
      sessionStorage.clear()
      this.$router.push('/fim')
    }
  },
  mounted() {
    this.results()

    if (this.weekCounter >= this.MAX_WEEKS) {
      this.end = true
    }
  },
}
</script>

<style scoped>
#boxHealth {
  float: left;
  width: 350px;
  height: 170px;
  padding:20px;
  font-size: 40px;
  text-align: center;
  color: white;
  background-color: #ffbd4a;
  margin-bottom: 50px;
}
#boxFamily {
  float: right;
  width: 350px;
  height: 170px;
  padding: 20px;
  font-size: 40px;
  text-align: center;
  color: white;
  background-color: #007bff;
  margin-bottom: 50px;
}
#boxWork {
  float: left;
  width: 350px;
  height: 170px;
  padding: 20px;
  font-size: 40px;
  text-align: center;
  color: white;
  background-color: #ff5c5c;
}
#boxMoney {
  float: right;
  width: 350px;
  height: 170px;
  padding: 20px;
  font-size: 40px;
  text-align: center;
  color: white;
  background-color: #99e265;
}
#boxResults {
  position: relative;
  width: 55%;
  align-items: center;
  left: 21%;
  margin-top: 100px;
  margin-bottom: 100px;
}
.btnLarger {
  font-size: 30px;
  width: 200px;
  padding: .5rem 1rem;
  border-radius: .3rem;
}
.material-icons {
  height: 70px;
  width: 60px;
}
</style>
