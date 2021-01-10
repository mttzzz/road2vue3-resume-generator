<template>
  <div class="card card-w70">
    <component :is="'app-resume-title'" v-if="title">{{ title }}</component>
    <component :is="'app-resume-avatar'" v-if="avatar" :avatar="avatar"></component>
    <div v-for="comboBlock in comboBlocks" :key="comboBlock.id">
      <component :is="'app-resume-subtitle'"
                 v-if="comboBlock.subtitle"
                 @remove="$emit('remove', comboBlock.id)"
                 >{{ comboBlock.subtitle }}
      </component>
      <component :is="'app-resume-text'" v-if="comboBlock.text">{{ comboBlock.text }}</component>
    </div>
    <h3 v-if="isEmptyResume">Добавьте первый блок, чтобы увидеть результат</h3>
  </div>
</template>

<script>
import AppResumeTitle from '@/components/AppResumeTitle'
import AppResumeAvatar from '@/components/AppResumeAvatar'
import AppResumeSubtitle from '@/components/AppResumeSubtitle'
import AppResumeText from '@/components/AppResumeText'

export default {
  name: 'AppResumeContent',
  props: {
    title: String,
    avatar: String,
    comboBlocks: Array
  },
  computed: {
    isEmptyResume() {
      return !this.title && !this.avatar && this.comboBlocks.length === 0
    }
  },
  components: {AppResumeTitle, AppResumeAvatar, AppResumeSubtitle, AppResumeText}
}
</script>

<style scoped>

</style>
