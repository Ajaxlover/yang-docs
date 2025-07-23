// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import TechStack from '../../components/TechStack.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('TechStack', TechStack)
  }
}