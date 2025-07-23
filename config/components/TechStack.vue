<template>
  <div class="tech-stack">
    <h3>{{ title }}</h3>
    <div class="tech-cards">
      <div v-for="(tech, index) in technologies" :key="index" class="tech-card">
        <div class="tech-icon" :style="{ backgroundColor: tech.color }">{{ tech.icon }}</div>
        <div class="tech-info">
          <h4>{{ tech.name }}</h4>
          <p>{{ tech.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '技术栈'
  },
  technologies: {
    type: Array,
    default: () => [
      {
        name: 'TypeScript',
        icon: 'TS',
        color: '#3178C6',
        description: 'JavaScript的超集，添加了类型系统'
      },
      {
        name: 'Vue.js',
        icon: 'Vue',
        color: '#41B883',
        description: '渐进式JavaScript框架'
      },
      {
        name: 'VitePress',
        icon: 'VP',
        color: '#646CFF',
        description: '基于Vite的静态网站生成器'
      }
    ]
  }
})
</script>

<style scoped>
.tech-stack {
  margin: 2rem 0;
}

.tech-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.tech-card {
  display: flex;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg-alt);
  transition: transform 0.2s, box-shadow 0.2s;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.tech-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  margin-right: 1rem;
}

.tech-info {
  flex: 1;
}

.tech-info h4 {
  margin: 0 0 0.5rem 0;
}

.tech-info p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .tech-cards {
    grid-template-columns: 1fr;
  }
}
</style>