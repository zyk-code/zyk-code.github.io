<template>
  <div class="card-container">
    <div v-for="(card, index) in cards" :key="index" class="card">
      <img :src="card.image" :alt="card.name" class="card-image"/>
      <div class="card-content">
        <h3>{{ card.name }}</h3>
        <p>{{ card.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const cards = ref([
  {
    name: '张三',
    description: '爱好：旅游',
    image: 'path/to/zhangsan.jpg'
  },
  {
    name: '李四',
    description: '爱好：阅读',
    image: 'path/to/lisi.jpg'
  },
  // ...其他卡片数据
]);
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px;
  width: 30%;
  box-shadow: 0px 0px 10px #aaa;
}

.card-image {
  width: 100%;
  height: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-content {
  padding: 10px;
  text-align: center;
}

.card-content h3 {
  margin: 0;
}

.card-content p {
  margin: 5px 0;
}
</style>
