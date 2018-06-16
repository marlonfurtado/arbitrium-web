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
    <input type="text" class="form-control" v-model.number="startValue" @change="changeValue()" disabled="true">
    <input type="number" min="0" max="24"
           name="endHour"
           class="form-control"
           :class="{'is-invalid': errors.first('endHour')}"
           v-validate="`required|min_value:${startValue}|max_value:24`"
           v-model.number="endValue"
           @blur="changeValue()">
  </div>
</template>

<script>
export default {
  name: 'ActivityInput',
  props: ['activities', 'start', 'end'],
  data: function () {
    return {
      activitySelected: 'Atividade',
      activityInput: {},
      startValue: this.start,
      endValue: this.end
     }
  },
  watch: {
    start: function () {
      this.startValue = this.start
      this.changeValue()
    },
    end: function () {
      this.endValue = this.end
      this.changeValue()
    },
  },
  methods: {
    setActivity: function (activity) {
      this.activitySelected = activity
      this.activityInput = { activity: activity, start: this.startValue, end: this.endValue }
      this.$emit("activityInput", this.activityInput);
    },
    changeValue: function () {
      if (this.endValue <= this.startValue) this.endValue = this.startValue + 1
      if (this.startValue < 0) this.startValue = 0
      if (this.startValue > 23) this.startValue = 23
      if (this.endValue < 1) this.endValue = 1
      if (this.endValue > 24) this.endValue = 24

      this.$emit('changedEndHour', this.endValue)
    },
  }
}
</script>

<style scoped>
.input-prepend-size {
  width: 850px;
}
.dropdown-size {
  width: 850px;
}
.scrollable-dropdown {
  height: auto;
  max-height: 200px;
  overflow-x: hidden;
}
</style>
