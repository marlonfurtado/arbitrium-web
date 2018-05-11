<template>
  <div class="input-group input-group-lg">
    <div class="input-group-prepend">
      <button class="btn btn-outline-secondary dropdown-toggle input-prepend-size" type="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{activitySelected}}</button>
      <div class="dropdown-menu dropdown-size scrollable-dropdown">
        <span :key="activity.id" v-for="activity in activities">
          <a class="dropdown-item" @click="setActivity(activity.description)">{{activity.description}}</a>
        </span>
      </div>
    </div>
    <input type="number" class="form-control" disabled="true" :value="start">
    <input type="number" class="form-control" :value="end">
  </div>
</template>

<script>
export default {
  name: 'ActivityInput',
  props: ['activities', 'start', 'end'],
  data: () => {
    return {
      activitySelected: 'Atividade',
     }
  },
  methods: {
    setActivity: function (activity) {
      this.activitySelected = activity
    }
  }
}
</script>

<style scoped>
.input-prepend-size {
  width: 800px;
}
.dropdown-size {
  width: 800px;
}
.scrollable-dropdown {
  height: auto;
  max-height: 200px;
  overflow-x: hidden;
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0; 
}
</style>
