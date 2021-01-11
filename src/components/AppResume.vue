<template>
  <div class="card card-w70">
    <component :is="'app-resume-title'" v-if="title">{{ title }}</component>
    <component :is="'app-resume-avatar'" v-if="avatar" :avatar="avatar"></component>
    <div v-for="(comboBlock, idx) in comboBlocks" :key="idx">
      <component :is="'app-resume-subtitle'"
                 @remove="$emit('remove', idx)"
                 @up="$emit('up', idx)"
                 @down="$emit('down', idx)"
                 :subtitle="comboBlock.subtitle"
                 :idx="idx"
                 :combo-blocks-length="comboBlocks.length"
                 >
      </component>
      <component :is="'app-resume-text'">{{ comboBlock.text }}</component>
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
  emits: ['remove', 'up', 'down'],
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
