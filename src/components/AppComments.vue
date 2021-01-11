<template>
  <div class="card">
    <h2>Комментарии</h2>
    <ul class="list">
      <li class="list-item" v-for="comment in comments" :key="comment.id">
        <div>
          <p><strong>{{ comment.email }}</strong></p>
          <small>{{ comment.body }}</small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppComments',
  props: {
    comments: Array
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
li {
  border-bottom: 1px solid #999999;
}

</style>
