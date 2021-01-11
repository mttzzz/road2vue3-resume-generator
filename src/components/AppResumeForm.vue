<template>
  <form class="card card-w30" @submit.prevent="submit">
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select id="type" v-model="type">
        <option value="title">Заголовок</option>
        <option value="avatar">Аватар</option>
        <option value="combo">Раздел</option>
      </select>
    </div>

    <div class="form-control" v-if="type === 'combo'">
      <label for="subtitle">Заголовок</label>
      <input id="subtitle" v-model="subtitle">
    </div>

    <div class="form-control">
      <label for="value">Значение</label>
      <textarea id="value" rows="3" v-model="value"></textarea>
    </div>

    <button class="btn primary" :disabled="!isValid">Добавить</button>
  </form>
</template>

<script>
export default {
  name: 'AppResumeForm',
  emits: {
    submit: (data) => {
      if (typeof data === 'object') {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  data: () => ({
    type: 'title',
    subtitle: '',
    value: ''
  }),
  computed: {
    isValid() {
      return this.type !== 'combo' ? this.value.length > 3 : this.value.length > 3 && this.subtitle.length > 3
    }
  },
  methods: {
    submit() {
      let data
      if (this.type !== 'combo') {
        data = {type: this.type, value: this.value}
      } else {
        data = {
          type: this.type,
          value: {
            subtitle: this.subtitle,
            text: this.value
          }
        }
        this.subtitle = ''
      }
      this.$emit('submit', data)

      this.type = 'title'
      this.value = ''
    }
  }
}
</script>

<style scoped>

</style>
