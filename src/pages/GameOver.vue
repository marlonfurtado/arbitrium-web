<template>
    <div>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
    
        <div>
            <h1>Arbitrium</h1>
            </br>
            <a class="goodbye-text">Obrigado por participar!</a>
            </br>
            <a class="goodbye-text">Sua participação foi muito importante para nós!</a>
        </div>
    

        <div style= "margin-top: 200px;">
            <router-link to="/">
            <button class="btn-outline-primary btnLarger" @click="clearStorage">Encerrar</button> 
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameOver',
    methods: {
        clearStorage(){
            sessionStorage.clear()
        }
    }
}
</script>

<style scoped>
.btnLarger {
    font-size: 30px;
    margin-right: 50px;
    padding: .5rem 1rem;
    border-radius: .3rem;
}

.goodbye-text{
  font-size: 24px;
  color: #666666;
}

h1{
    font-size: 110px;
}

img{
    margin-left: auto;
    margin-right: auto;
    width: 50%
}

div{
    text-align: center;
}

</style>