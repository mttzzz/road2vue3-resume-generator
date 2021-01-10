<template>
  <div>
    <div class="container column">
      <app-resume-form @submit="updateResume"></app-resume-form>
      <app-resume
        v-if="true"
        :title="title"
        :avatar="avatar"
        :comboBlocks="comboBlocks"
        @remove="removeCombo"
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
    loadingResume: true,
    title: null,
    avatar: null,
    comboBlocks: [],
    subtitle: null,
    text: null,
    comments: [],
    dbUrl: 'https://vue-3-resume-generator-default-rtdb.europe-west1.firebasedatabase.app/'
  }),
  computed: {},
  methods: {
    async updateResume({type, value}) {
      if (type !== 'combo') {
        this[type] = value
        await axios.put(this.dbUrl + `resume/${type}.json`, {value})
      } else {
        const {data} = await axios.post(this.dbUrl + 'resume/comboBlocks.json', value)
        value.id = data.name
        this.comboBlocks.push(value)
      }
    },
    async loadComments() {
      this.loadingComments = true
      try {
        const url = 'https://jsonplaceholder.typicode.com/comments'
        const {data} = await axios.get(url, {params: {_limit: 42}})
        this.comments = data
        this.loadingComments = false
      } catch (e) {
        alert(e.message)
        this.loadingComments = false
      }
    },
    async removeCombo(id) {
      try {
        await axios.delete(this.dbUrl + `resume/comboBlocks/${id}.json`)
        this.comboBlocks = this.comboBlocks.filter(cb => cb.id !== id)
      } catch (e) {
      }
    },
    async loadResume() {
      try {
        const {data} = await axios.get(this.dbUrl + 'resume.json')
        if (data) {
          Object.keys(data).forEach(key => {
            if (key === 'comboBlocks') {
              this.comboBlocks = Object.keys(data[key]).map(idx => ({
                id: idx,
                ...data[key][idx]
              }))
            } else {
              this[key] = data[key].value
            }
          })
        }
        this.loadingResume = false
      } catch (e) {
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
