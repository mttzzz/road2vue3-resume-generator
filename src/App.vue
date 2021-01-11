<template>
  <div>
    <div class="container column">
      <app-resume-form @submit="updateResume"></app-resume-form>
      <app-resume
        :title="title"
        :avatar="avatar"
        :comboBlocks="comboBlocks"
        @remove="removeCombo"
        @up="changePosition('up', $event)"
        @down="changePosition('down', $event)"
        @update="update"
      ></app-resume>
    </div>
    <div class="container">
      <p>
        <button class="btn primary" @click="loadComments" v-if="!comments.length">Загрузить комментарии</button>
      </p>
      <app-loader v-if="loadingComments"></app-loader>
      <app-comments :comments="comments" v-if="comments.length"></app-comments>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AppResumeForm from '@/components/AppResumeForm'
import AppComments from '@/components/AppComments'
import AppResume from '@/components/AppResume'
import AppLoader from '@/components/AppLoader'

export default {
  name: 'App',
  components: {AppResumeForm, AppResume, AppComments, AppLoader},
  data: () => ({
    loadingComments: false,
    showModal: false,
    loadingResume: true,
    title: null,
    avatar: null,
    comboBlocks: [],
    comments: []
  }),
  computed: {},
  methods: {
    async update(type, value) {
      this[type] = value
      await axios.put(process.env.VUE_APP_DB_URL + `resume/${type}.json`, {value})
      this.notify('#42b983', 'Обновили!')
    },
    notify(color, text) {
      this.$toast(text, {
        styles: {
          'background-color': color
        }
      })
    },
    async changePosition(direction, fromIdx) {
      const toIdx = direction === 'up' ? fromIdx - 1 : fromIdx + 1
      try {
        const element = this.comboBlocks[fromIdx]
        this.comboBlocks.splice(fromIdx, 1)
        this.comboBlocks.splice(toIdx, 0, element)
        await axios.put(process.env.VUE_APP_DB_URL + 'resume/comboBlocks.json', this.comboBlocks)
        this.notify('#42b983', 'Поменяли местами!')
      } catch (e) {
      }
    },
    async updateResume({type, value}) {
      try {
        if (type !== 'combo') {
          this[type] = value
          await axios.put(this.dbUrl + `resume/${type}.json`, {value})
          this.title = value
        } else {
          value.id = Date.now()
          this.comboBlocks.push(value)
          await axios.put(process.env.VUE_APP_DB_URL + 'resume/comboBlocks.json', this.comboBlocks)
        }
        this.notify('#42b983', 'Обновили!!!')
      } catch (e) {
        this.notify('#EF4444', `Ошибка при добавлении/обновлении блока. ${e.message}`)
      }
    },
    async loadComments() {
      this.loadingComments = true
      try {
        const url = 'https://jsonplaceholder.typicode.com/comments'
        const {data} = await axios.get(url, {params: {_limit: 42}})
        if (data) {
          this.comments = data
          this.loadingComments = false
          this.notify('#42b983', `Загружено комментариев: ${data.length}!`)
        } else {
          this.notify('#FBBF24', 'Мы пытались, но комментариев нет :(')
        }
      } catch (e) {
        this.notify('#EF4444', `Ошибка при загрузке комментариев. ${e.message}`)
        this.loadingComments = false
      }
    },
    async removeCombo(idx) {
      try {
        this.comboBlocks.splice(idx, 1)
        await axios.put(process.env.VUE_APP_DB_URL + 'resume/comboBlocks.json', this.comboBlocks)
        this.notify('#42b983', 'Раздел успешно удален!')
      } catch (e) {
        this.notify('#EF4444', `Ошибка при удалении раздела. ${e.message}`)
      }
    },
    async loadResume() {
      try {
        const {data} = await axios.get(process.env.VUE_APP_DB_URL + 'resume.json')
        if (data) {
          Object.keys(data).forEach(key => {
            this[key] = key === 'comboBlocks' ? data[key] : data[key].value
          })
          this.notify('#42b983', 'Данные успешно загружены с сервера')
        } else {
          this.notify('#FBBF24', 'Вы пока ничего не создали, поэтому мы ничего и не загрузили! Л - Логика!')
        }
        this.loadingResume = false
      } catch (e) {
        this.notify('#EF4444', `Ошибка при загрузке блоков резюме с сервера. ${e.message}`)
        this.loadingResume = false
      }
    }
  },
  async mounted() {
    await this.loadResume()
  }
}
</script>

<style>
.avatar {
  display: flex;
  justify-content: center;
}

.avatar img {
  width: 150px;
  height: auto;
  border-radius: 50%;
}
</style>
