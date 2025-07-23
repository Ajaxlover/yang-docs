# Vue3 语法实践详细指南

## 📖 目录

- [Vue3与Vue2对比](#vue3与vue2对比)
- [基础语法](#基础语法)
- [组合式API](#组合式api)
- [响应式系统](#响应式系统)
- [组件通信](#组件通信)
- [生命周期](#生命周期)
- [指令系统](#指令系统)
- [插槽系统](#插槽系统)
- [状态管理](#状态管理)
- [路由系统](#路由系统)
- [性能优化](#性能优化)
- [TypeScript集成](#typescript集成)
- [最佳实践](#最佳实践)

## Vue3与Vue2对比

### 1. 核心架构差异

#### 响应式系统原理

**Vue2 - Object.defineProperty**
```javascript
// Vue2响应式原理
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      console.log(`访问了 ${key}`)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log(`${key} 从 ${val} 变为 ${newVal}`)
        val = newVal
        // 触发更新
      }
    }
  })
}

// Vue2的限制
const data = { name: '张三' }
defineReactive(data, 'name', '张三')

// 无法检测新增属性
data.age = 25 // 不会触发响应式更新
delete data.name // 不会触发响应式更新

// 数组变更检测限制
const arr = [1, 2, 3]
arr[0] = 4 // 不会触发更新
arr.length = 0 // 不会触发更新
```

**Vue3 - Proxy**
```javascript
// Vue3响应式原理
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      console.log(`访问了 ${key}`)
      // 依赖收集
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (value !== oldValue) {
        console.log(`${key} 从 ${oldValue} 变为 ${value}`)
        // 触发更新
        trigger(target, key)
      }
      return result
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (result && hadKey) {
        // 触发删除更新
        trigger(target, key)
      }
      return result
    }
  })
}

// Vue3的优势
const state = reactive({ name: '张三' })

// 可以检测新增属性
state.age = 25 // 会触发响应式更新
delete state.name // 会触发响应式更新

// 数组变更完全支持
const arr = reactive([1, 2, 3])
arr[0] = 4 // 会触发更新
arr.length = 0 // 会触发更新
```

### 2. API设计对比

#### 组件定义方式

**Vue2 - 选项式API**
```vue
<template>
  <div>
    <p>{{ message }}</p>
    <p>计数: {{ count }}</p>
    <p>双倍: {{ doubleCount }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  
  // 数据
  data() {
    return {
      count: 0,
      message: 'Hello Vue2'
    }
  },
  
  // 计算属性
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  
  // 方法
  methods: {
    increment() {
      this.count++
    },
    
    fetchData() {
      // API调用
    }
  },
  
  // 生命周期
  created() {
    console.log('组件创建')
  },
  
  mounted() {
    console.log('组件挂载')
    this.fetchData()
  },
  
  // 监听器
  watch: {
    count(newVal, oldVal) {
      console.log(`count从${oldVal}变为${newVal}`)
    }
  }
}
</script>
```

**Vue3 - 组合式API**
```vue
<template>
  <div>
    <p>{{ message }}</p>
    <p>计数: {{ count }}</p>
    <p>双倍: {{ doubleCount }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// 响应式数据
const count = ref(0)
const message = ref('Hello Vue3')

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
const increment = () => {
  count.value++
}

const fetchData = async () => {
  // API调用
}

// 生命周期
onMounted(() => {
  console.log('组件挂载')
  fetchData()
})

// 监听器
watch(count, (newVal, oldVal) => {
  console.log(`count从${oldVal}变为${newVal}`)
})
</script>
```

#### 逻辑复用对比

**Vue2 - Mixins**
```javascript
// counterMixin.js
export const counterMixin = {
  data() {
    return {
      count: 0
    }
  },
  
  methods: {
    increment() {
      this.count++
    }
  }
}

// 组件中使用
export default {
  mixins: [counterMixin],
  
  // 问题：
  // 1. 命名冲突
  // 2. 来源不明确
  // 3. 隐式依赖
}
```

**Vue3 - 组合式函数**
```javascript
// useCounter.js
import { ref } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => {
    count.value++
  }
  
  const decrement = () => {
    count.value--
  }
  
  return {
    count,
    increment,
    decrement
  }
}

// 组件中使用
import { useCounter } from './useCounter'

const { count, increment, decrement } = useCounter(10)

// 优势：
// 1. 明确的来源
// 2. 没有命名冲突
// 3. 更好的类型推导
// 4. 更灵活的组合
```

### 3. 性能对比

#### 包体积
```
Vue2: ~34KB (gzipped)
Vue3: ~16KB (gzipped) - 减少了约50%

原因：
- Tree-shaking支持更好
- 移除了不必要的API
- 更好的代码分割
```

#### 渲染性能
```javascript
// Vue2 - 全量diff
// 每次更新都会遍历整个虚拟DOM树

// Vue3 - 静态提升 + 补丁标记
// 编译时优化，只更新动态内容

// Vue2编译结果
function render() {
  return h('div', [
    h('p', this.message),
    h('p', this.count)
  ])
}

// Vue3编译结果（简化）
const _hoisted_1 = h('div', { class: 'static' }) // 静态提升

function render() {
  return h('div', [
    _hoisted_1, // 静态内容复用
    h('p', this.message, 1 /* TEXT */), // 补丁标记
    h('p', this.count, 1 /* TEXT */)
  ])
}
```

#### 内存使用
```javascript
// Vue2 - 每个组件实例都有完整的选项对象
const instance = {
  data: { ... },
  methods: { ... },
  computed: { ... },
  watch: { ... }
}

// Vue3 - 按需创建，更少的内存占用
const instance = {
  setupState: { ... }, // 只包含setup返回的内容
  ctx: { ... } // 精简的上下文
}
```

### 4. 语法特性对比

#### 多根节点

**Vue2 - 单根节点限制**
```vue
<template>
  <!-- 必须有一个根元素 -->
  <div>
    <header>头部</header>
    <main>内容</main>
    <footer>底部</footer>
  </div>
</template>
```

**Vue3 - 支持多根节点**
```vue
<template>
  <!-- 可以有多个根元素 -->
  <header>头部</header>
  <main>内容</main>
  <footer>底部</footer>
</template>
```

#### Teleport传送门

**Vue2 - 无原生支持**
```javascript
// 需要使用第三方库或手动操作DOM
```

**Vue3 - 内置Teleport**
```vue
<template>
  <div>
    <h3>组件内容</h3>
    
    <!-- 传送到body -->
    <Teleport to="body">
      <div class="modal">
        模态框内容
      </div>
    </Teleport>
  </div>
</template>
```

#### Suspense异步组件

**Vue2 - 手动处理加载状态**
```vue
<template>
  <div>
    <div v-if="loading">加载中...</div>
    <AsyncComponent v-else />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  
  async mounted() {
    await this.loadComponent()
    this.loading = false
  }
}
</script>
```

**Vue3 - 内置Suspense**
```vue
<template>
  <Suspense>
    <!-- 异步组件 -->
    <template #default>
      <AsyncComponent />
    </template>
    
    <!-- 加载状态 -->
    <template #fallback>
      <div>加载中...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
)
</script>
```

### 5. TypeScript支持对比

**Vue2 - 有限的TypeScript支持**
```typescript
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Counter extends Vue {
  count: number = 0
  
  increment(): void {
    this.count++
  }
  
  get doubleCount(): number {
    return this.count * 2
  }
}
```

**Vue3 - 原生TypeScript支持**
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
}

const count = ref<number>(0)
const user = ref<User | null>(null)

const doubleCount = computed((): number => count.value * 2)

const increment = (): void => {
  count.value++
}
</script>
```

### 6. 生命周期对比

**Vue2生命周期**
```javascript
export default {
  beforeCreate() {
    // 实例初始化之后，数据观测和事件配置之前
  },
  
  created() {
    // 实例创建完成，数据观测、属性和方法的运算、事件回调已配置
  },
  
  beforeMount() {
    // 挂载开始之前
  },
  
  mounted() {
    // 实例挂载完成
  },
  
  beforeUpdate() {
    // 数据更新时调用，发生在虚拟DOM重新渲染之前
  },
  
  updated() {
    // 数据更新导致的虚拟DOM重新渲染完成后调用
  },
  
  beforeDestroy() {
    // 实例销毁之前调用
  },
  
  destroyed() {
    // 实例销毁后调用
  }
}
```

**Vue3生命周期**
```javascript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

// setup函数相当于created
// beforeCreate和created被setup替代

onBeforeMount(() => {
  // 挂载开始之前
})

onMounted(() => {
  // 实例挂载完成
})

onBeforeUpdate(() => {
  // 数据更新时调用
})

onUpdated(() => {
  // 数据更新完成后调用
})

onBeforeUnmount(() => {
  // 实例卸载之前调用（原beforeDestroy）
})

onUnmounted(() => {
  // 实例卸载后调用（原destroyed）
})
```

### 7. 事件系统对比

**Vue2 - 全局事件总线**
```javascript
// Vue2中常用事件总线
Vue.prototype.$bus = new Vue()

// 发送事件
this.$bus.$emit('custom-event', data)

// 监听事件
this.$bus.$on('custom-event', handler)

// 移除监听
this.$bus.$off('custom-event', handler)
```

**Vue3 - 移除全局事件总线**
```javascript
// Vue3推荐使用第三方库或状态管理
import mitt from 'mitt'

const emitter = mitt()

// 发送事件
emitter.emit('custom-event', data)

// 监听事件
emitter.on('custom-event', handler)

// 移除监听
emitter.off('custom-event', handler)
```

### 8. 过滤器对比

**Vue2 - 内置过滤器**
```vue
<template>
  <div>
    <!-- 过滤器语法 -->
    <p>{{ message | capitalize }}</p>
    <p>{{ price | currency('$') }}</p>
  </div>
</template>

<script>
export default {
  filters: {
    capitalize(value) {
      if (!value) return ''
      return value.toString().charAt(0).toUpperCase() + value.slice(1)
    },
    
    currency(value, symbol = '¥') {
      return symbol + value.toFixed(2)
    }
  }
}
</script>
```

**Vue3 - 移除过滤器，推荐计算属性或方法**
```vue
<template>
  <div>
    <!-- 使用计算属性 -->
    <p>{{ capitalizedMessage }}</p>
    <!-- 使用方法 -->
    <p>{{ currency(price, '$') }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const message = ref('hello world')
const price = ref(99.99)

const capitalizedMessage = computed(() => {
  if (!message.value) return ''
  return message.value.charAt(0).toUpperCase() + message.value.slice(1)
})

const currency = (value, symbol = '¥') => {
  return symbol + value.toFixed(2)
}
</script>
```

### 9. 总结对比

| 特性 | Vue2 | Vue3 |
|------|------|------|
| **响应式原理** | Object.defineProperty | Proxy |
| **API风格** | 选项式API | 组合式API + 选项式API |
| **TypeScript支持** | 有限支持 | 原生支持 |
| **包体积** | ~34KB | ~16KB |
| **性能** | 较好 | 更优秀 |
| **多根节点** | 不支持 | 支持 |
| **Teleport** | 无 | 支持 |
| **Suspense** | 无 | 支持 |
| **Tree-shaking** | 有限 | 完全支持 |
| **逻辑复用** | Mixins | 组合式函数 |
| **生命周期** | 8个钩子 | 组合式钩子 |
| **过滤器** | 支持 | 移除 |
| **全局API** | Vue.xxx | app.xxx |

### 10. 迁移建议

#### 渐进式迁移
```javascript
// 1. Vue3兼容Vue2语法
export default {
  data() {
    return {
      count: 0
    }
  },
  
  methods: {
    increment() {
      this.count++
    }
  }
}

// 2. 逐步引入组合式API
export default {
  setup() {
    const newFeature = ref('new')
    return { newFeature }
  },
  
  data() {
    return {
      count: 0 // 保留原有逻辑
    }
  }
}

// 3. 完全迁移到组合式API
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const newFeature = ref('new')
    
    const increment = () => {
      count.value++
    }
    
    return {
      count,
      newFeature,
      increment
    }
  }
}
```

## 基础语法

### 1. 模板语法

#### 文本插值
```vue
<template>
  <div>
    <!-- 基础插值 -->
    <p>{{ message }}</p>
    
    <!-- 表达式 -->
    <p>{{ number + 1 }}</p>
    <p>{{ ok ? 'YES' : 'NO' }}</p>
    <p>{{ message.split('').reverse().join('') }}</p>
    
    <!-- 函数调用 -->
    <p>{{ formatMessage(message) }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue3!')
const number = ref(10)
const ok = ref(true)

const formatMessage = (msg) => {
  return msg.toUpperCase()
}
</script>
```

#### 原始HTML
```vue
<template>
  <div>
    <!-- 普通插值会转义HTML -->
    <p>{{ rawHtml }}</p>
    
    <!-- v-html指令输出原始HTML -->
    <p v-html="rawHtml"></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const rawHtml = ref('<span style="color: red">红色文本</span>')
</script>
```

### 2. 属性绑定

#### 基础属性绑定
```vue
<template>
  <div>
    <!-- 属性绑定 -->
    <div v-bind:id="dynamicId"></div>
    <div :id="dynamicId"></div>
    
    <!-- 布尔属性 -->
    <button :disabled="isButtonDisabled">按钮</button>
    
    <!-- 动态属性名 -->
    <a :[attributeName]="url">链接</a>
    
    <!-- 多个属性 -->
    <div v-bind="objectOfAttrs"></div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const dynamicId = ref('my-id')
const isButtonDisabled = ref(false)
const attributeName = ref('href')
const url = ref('https://vuejs.org')

const objectOfAttrs = reactive({
  id: 'container',
  class: 'wrapper'
})
</script>
```

#### 类与样式绑定
```vue
<template>
  <div>
    <!-- 对象语法 -->
    <div :class="{ active: isActive, 'text-danger': hasError }"></div>
    
    <!-- 数组语法 -->
    <div :class="[activeClass, errorClass]"></div>
    
    <!-- 混合语法 -->
    <div :class="[{ active: isActive }, errorClass]"></div>
    
    <!-- 内联样式对象语法 -->
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    
    <!-- 内联样式数组语法 -->
    <div :style="[baseStyles, overridingStyles]"></div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isActive = ref(true)
const hasError = ref(false)
const activeClass = ref('active')
const errorClass = ref('text-danger')
const activeColor = ref('red')
const fontSize = ref(30)

const baseStyles = reactive({
  color: 'blue',
  fontSize: '20px'
})

const overridingStyles = reactive({
  fontWeight: 'bold'
})
</script>
```

## 组合式API

### 1. setup函数基础

#### 基本用法
```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    const increment = () => {
      count.value++
    }
    
    return {
      count,
      increment
    }
  }
}
</script>
```

#### script setup语法糖
```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">增加</button>
    <ChildComponent :count="count" @update="handleUpdate" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const count = ref(0)

const increment = () => {
  count.value++
}

const handleUpdate = (newValue) => {
  count.value = newValue
}
</script>
```

### 2. 响应式API

#### ref和reactive
```vue
<script setup>
import { ref, reactive, computed, watch } from 'vue'

// ref - 基本类型响应式
const count = ref(0)
const message = ref('Hello')

// reactive - 对象响应式
const state = reactive({
  name: '张三',
  age: 25,
  hobbies: ['读书', '游泳']
})

// 嵌套对象
const user = reactive({
  profile: {
    name: '李四',
    settings: {
      theme: 'dark'
    }
  }
})

// 计算属性
const doubleCount = computed(() => count.value * 2)
const fullName = computed({
  get() {
    return `${state.name} (${state.age}岁)`
  },
  set(value) {
    const [name, age] = value.split(' ')
    state.name = name
    state.age = parseInt(age)
  }
})

// 监听器
watch(count, (newValue, oldValue) => {
  console.log(`count从${oldValue}变为${newValue}`)
})

watch(() => state.name, (newName) => {
  console.log(`姓名变为: ${newName}`)
})

// 深度监听
watch(state, (newState) => {
  console.log('state发生变化:', newState)
}, { deep: true })
</script>
```

#### toRef和toRefs
```vue
<script setup>
import { reactive, toRef, toRefs } from 'vue'

const state = reactive({
  name: '张三',
  age: 25
})

// toRef - 创建单个属性的ref
const name = toRef(state, 'name')

// toRefs - 创建所有属性的ref
const { age } = toRefs(state)

// 解构后保持响应式
const stateRefs = toRefs(state)
</script>
```

## 响应式系统

### 1. 响应式原理

#### Proxy代理
```javascript
// Vue3响应式原理简化版
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      // 触发更新
      trigger(target, key)
      return result
    }
  })
}
```

### 2. 响应式工具函数

```vue
<script setup>
import { 
  ref, 
  reactive, 
  readonly, 
  shallowRef, 
  shallowReactive,
  markRaw,
  toRaw,
  unref,
  isRef,
  isReactive,
  isReadonly,
  isProxy
} from 'vue'

// 基础响应式
const count = ref(0)
const state = reactive({ name: '张三' })

// 只读
const readonlyState = readonly(state)

// 浅层响应式
const shallowState = shallowReactive({
  deep: {
    nested: 'value'
  }
})

// 标记为非响应式
const nonReactiveObj = markRaw({
  data: 'some data'
})

// 获取原始对象
const raw = toRaw(state)

// 工具函数
console.log(isRef(count)) // true
console.log(isReactive(state)) // true
console.log(isReadonly(readonlyState)) // true
console.log(isProxy(state)) // true
</script>
```

## 组件通信

### 1. Props和Emits

#### 父组件
```vue
<template>
  <div>
    <ChildComponent 
      :title="title"
      :user="user"
      :items="items"
      @update-title="handleTitleUpdate"
      @custom-event="handleCustomEvent"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ChildComponent from './ChildComponent.vue'

const title = ref('父组件标题')
const user = reactive({
  name: '张三',
  age: 25
})
const items = ref(['item1', 'item2'])

const handleTitleUpdate = (newTitle) => {
  title.value = newTitle
}

const handleCustomEvent = (payload) => {
  console.log('收到自定义事件:', payload)
}
</script>
```

#### 子组件
```vue
<template>
  <div>
    <h2>{{ title }}</h2>
    <p>用户: {{ user.name }}, 年龄: {{ user.age }}</p>
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
    <button @click="updateTitle">更新标题</button>
    <button @click="emitCustomEvent">触发自定义事件</button>
  </div>
</template>

<script setup>
// 定义props
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: '默认标题'
  },
  user: {
    type: Object,
    required: true
  },
  items: {
    type: Array,
    default: () => []
  }
})

// 定义emits
const emit = defineEmits(['update-title', 'custom-event'])

const updateTitle = () => {
  emit('update-title', '新的标题')
}

const emitCustomEvent = () => {
  emit('custom-event', {
    message: '这是自定义事件',
    timestamp: Date.now()
  })
}
</script>
```

### 2. v-model双向绑定

#### 基础v-model
```vue
<!-- 父组件 -->
<template>
  <div>
    <CustomInput v-model="inputValue" />
    <p>当前值: {{ inputValue }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CustomInput from './CustomInput.vue'

const inputValue = ref('')
</script>
```

```vue
<!-- CustomInput.vue -->
<template>
  <input 
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
```

#### 多个v-model
```vue
<!-- 父组件 -->
<template>
  <UserForm 
    v-model:name="userName"
    v-model:email="userEmail"
  />
</template>

<script setup>
import { ref } from 'vue'
import UserForm from './UserForm.vue'

const userName = ref('')
const userEmail = ref('')
</script>
```

```vue
<!-- UserForm.vue -->
<template>
  <div>
    <input 
      :value="name"
      @input="$emit('update:name', $event.target.value)"
      placeholder="姓名"
    />
    <input 
      :value="email"
      @input="$emit('update:email', $event.target.value)"
      placeholder="邮箱"
    />
  </div>
</template>

<script setup>
defineProps(['name', 'email'])
defineEmits(['update:name', 'update:email'])
</script>
```

### 3. Provide/Inject

```vue
<!-- 祖先组件 -->
<template>
  <div>
    <ChildComponent />
  </div>
</template>

<script setup>
import { provide, ref, reactive } from 'vue'
import ChildComponent from './ChildComponent.vue'

const theme = ref('dark')
const user = reactive({
  name: '张三',
  role: 'admin'
})

// 提供数据
provide('theme', theme)
provide('user', user)

// 提供方法
provide('updateTheme', (newTheme) => {
  theme.value = newTheme
})
</script>
```

```vue
<!-- 后代组件 -->
<template>
  <div :class="theme">
    <p>当前主题: {{ theme }}</p>
    <p>用户: {{ user.name }}</p>
    <button @click="changeTheme">切换主题</button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// 注入数据
const theme = inject('theme', 'light') // 默认值
const user = inject('user')
const updateTheme = inject('updateTheme')

const changeTheme = () => {
  updateTheme(theme.value === 'dark' ? 'light' : 'dark')
}
</script>
```

## 生命周期

### 1. 组合式API生命周期

```vue
<script setup>
import { 
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onActivated,
  onDeactivated
} from 'vue'

// 挂载前
onBeforeMount(() => {
  console.log('组件即将挂载')
})

// 挂载后
onMounted(() => {
  console.log('组件已挂载')
  // DOM操作
  // 发起API请求
  // 设置定时器
})

// 更新前
onBeforeUpdate(() => {
  console.log('组件即将更新')
})

// 更新后
onUpdated(() => {
  console.log('组件已更新')
})

// 卸载前
onBeforeUnmount(() => {
  console.log('组件即将卸载')
  // 清理工作
})

// 卸载后
onUnmounted(() => {
  console.log('组件已卸载')
  // 清理定时器
  // 移除事件监听器
})

// 错误捕获
onErrorCaptured((error, instance, info) => {
  console.log('捕获到错误:', error)
  return false // 阻止错误继续传播
})

// keep-alive组件激活
onActivated(() => {
  console.log('组件被激活')
})

// keep-alive组件停用
onDeactivated(() => {
  console.log('组件被停用')
})
</script>
```

### 2. 生命周期实践示例

```vue
<template>
  <div>
    <h2>用户列表</h2>
    <div v-if="loading">加载中...</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const users = ref([])
const loading = ref(true)
let timer = null

// 获取用户数据
const fetchUsers = async () => {
  try {
    loading.value = true
    const response = await fetch('/api/users')
    users.value = await response.json()
  } catch (error) {
    console.error('获取用户失败:', error)
  } finally {
    loading.value = false
  }
}

// 组件挂载后获取数据
onMounted(() => {
  fetchUsers()
  
  // 设置定时刷新
  timer = setInterval(fetchUsers, 30000)
})

// 组件卸载前清理
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
```

## 指令系统

### 1. 内置指令

#### 条件渲染
```vue
<template>
  <div>
    <!-- v-if/v-else-if/v-else -->
    <div v-if="type === 'A'">A类型</div>
    <div v-else-if="type === 'B'">B类型</div>
    <div v-else>其他类型</div>
    
    <!-- v-show -->
    <div v-show="isVisible">显示/隐藏</div>
    
    <!-- template条件渲染 -->
    <template v-if="showGroup">
      <h3>标题</h3>
      <p>内容</p>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const type = ref('A')
const isVisible = ref(true)
const showGroup = ref(true)
</script>
```

#### 列表渲染
```vue
<template>
  <div>
    <!-- 数组渲染 -->
    <ul>
      <li v-for="(item, index) in items" :key="item.id">
        {{ index }} - {{ item.name }}
      </li>
    </ul>
    
    <!-- 对象渲染 -->
    <ul>
      <li v-for="(value, key, index) in object" :key="key">
        {{ index }}. {{ key }}: {{ value }}
      </li>
    </ul>
    
    <!-- 数字渲染 -->
    <span v-for="n in 10" :key="n">{{ n }}</span>
    
    <!-- template列表渲染 -->
    <template v-for="item in items" :key="item.id">
      <h4>{{ item.name }}</h4>
      <p>{{ item.description }}</p>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const items = ref([
  { id: 1, name: '项目1', description: '描述1' },
  { id: 2, name: '项目2', description: '描述2' }
])

const object = reactive({
  name: '张三',
  age: 25,
  city: '北京'
})
</script>
```

#### 事件处理
```vue
<template>
  <div>
    <!-- 基础事件 -->
    <button @click="handleClick">点击</button>
    
    <!-- 内联处理器 -->
    <button @click="count++">{{ count }}</button>
    
    <!-- 传递参数 -->
    <button @click="handleClickWithParam('参数')">传参点击</button>
    
    <!-- 访问事件对象 -->
    <button @click="handleClickWithEvent($event)">事件对象</button>
    
    <!-- 事件修饰符 -->
    <form @submit.prevent="handleSubmit">
      <input @keyup.enter="handleEnter" />
      <button type="submit">提交</button>
    </form>
    
    <!-- 鼠标修饰符 -->
    <button @click.left="handleLeftClick">左键</button>
    <button @click.right.prevent="handleRightClick">右键</button>
    
    <!-- 系统修饰符 -->
    <input @keyup.ctrl.enter="handleCtrlEnter" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const handleClick = () => {
  console.log('按钮被点击')
}

const handleClickWithParam = (param) => {
  console.log('参数:', param)
}

const handleClickWithEvent = (event) => {
  console.log('事件对象:', event)
}

const handleSubmit = () => {
  console.log('表单提交')
}

const handleEnter = () => {
  console.log('回车键按下')
}

const handleLeftClick = () => {
  console.log('左键点击')
}

const handleRightClick = () => {
  console.log('右键点击')
}

const handleCtrlEnter = () => {
  console.log('Ctrl+Enter组合键')
}
</script>
```

### 2. 自定义指令

#### 全局指令
```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 全局自定义指令
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.directive('color', {
  mounted(el, binding) {
    el.style.color = binding.value
  },
  updated(el, binding) {
    el.style.color = binding.value
  }
})

app.mount('#app')
```

#### 局部指令
```vue
<template>
  <div>
    <input v-focus />
    <p v-color="'red'">红色文本</p>
    <div v-loading="isLoading">内容</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(false)

// 局部自定义指令
const vFocus = {
  mounted(el) {
    el.focus()
  }
}

const vColor = {
  mounted(el, binding) {
    el.style.color = binding.value
  },
  updated(el, binding) {
    el.style.color = binding.value
  }
}

const vLoading = {
  mounted(el, binding) {
    if (binding.value) {
      el.classList.add('loading')
    }
  },
  updated(el, binding) {
    if (binding.value) {
      el.classList.add('loading')
    } else {
      el.classList.remove('loading')
    }
  }
}
</script>

<style>
.loading {
  position: relative;
  pointer-events: none;
}

.loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading::before {
  content: '加载中...';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>
```

## 插槽系统

### 1. 基础插槽

#### 默认插槽
```vue
<!-- 父组件 -->
<template>
  <div>
    <Card>
      <h3>卡片标题</h3>
      <p>卡片内容</p>
    </Card>
  </div>
</template>

<script setup>
import Card from './Card.vue'
</script>
```

```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <slot>默认内容</slot>
  </div>
</template>

<style>
.card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 4px;
}
</style>
```

### 2. 具名插槽

```vue
<!-- 父组件 -->
<template>
  <div>
    <Layout>
      <template #header>
        <h1>页面标题</h1>
      </template>
      
      <template #default>
        <p>主要内容</p>
      </template>
      
      <template #footer>
        <p>页脚信息</p>
      </template>
    </Layout>
  </div>
</template>

<script setup>
import Layout from './Layout.vue'
</script>
```

```vue
<!-- Layout.vue -->
<template>
  <div class="layout">
    <header>
      <slot name="header"></slot>
    </header>
    
    <main>
      <slot></slot>
    </main>
    
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header, footer {
  background: #f5f5f5;
  padding: 16px;
}

main {
  flex: 1;
  padding: 16px;
}
</style>
```

### 3. 作用域插槽

```vue
<!-- 父组件 -->
<template>
  <div>
    <UserList>
      <template #default="{ user, index }">
        <div class="user-card">
          <h3>{{ user.name }}</h3>
          <p>序号: {{ index + 1 }}</p>
          <p>年龄: {{ user.age }}</p>
        </div>
      </template>
    </UserList>
    
    <UserList>
      <template #default="{ user }">
        <li>{{ user.name }} - {{ user.age }}岁</li>
      </template>
    </UserList>
  </div>
</template>

<script setup>
import UserList from './UserList.vue'
</script>
```

```vue
<!-- UserList.vue -->
<template>
  <div>
    <div v-for="(user, index) in users" :key="user.id">
      <slot :user="user" :index="index"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const users = ref([
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
  { id: 3, name: '王五', age: 28 }
])
</script>
```

## 状态管理

### 1. 简单状态管理

```javascript
// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  user: null,
  
  increment() {
    this.count++
  },
  
  setUser(user) {
    this.user = user
  }
})
```

```vue
<!-- 组件中使用 -->
<template>
  <div>
    <p>计数: {{ store.count }}</p>
    <button @click="store.increment()">增加</button>
    
    <div v-if="store.user">
      欢迎, {{ store.user.name }}!
    </div>
  </div>
</template>

<script setup>
import { store } from './store.js'
</script>
```

### 2. Pinia状态管理

```javascript
// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // state
  const count = ref(0)
  const name = ref('Eduardo')
  
  // getters
  const doubleCount = computed(() => count.value * 2)
  
  // actions
  function increment() {
    count.value++
  }
  
  function reset() {
    count.value = 0
  }
  
  return { count, name, doubleCount, increment, reset }
})
```

```vue
<!-- 组件中使用Pinia -->
<template>
  <div>
    <p>计数: {{ counter.count }}</p>
    <p>双倍: {{ counter.doubleCount }}</p>
    <button @click="counter.increment()">增加</button>
    <button @click="counter.reset()">重置</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>
```

## 路由系统

### 1. Vue Router基础

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import User from '@/views/User.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
})

export default router
```

### 2. 路由组件

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-link :to="{ name: 'User', params: { id: 123 } }">
        用户
      </router-link>
    </nav>
    
    <router-view />
  </div>
</template>
```

```vue
<!-- views/User.vue -->
<template>
  <div>
    <h2>用户详情</h2>
    <p>用户ID: {{ $route.params.id }}</p>
    <p>查询参数: {{ $route.query }}</p>
    
    <button @click="goBack">返回</button>
    <button @click="goToHome">回到首页</button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const goToHome = () => {
  router.push('/')
}
</script>
```

## 性能优化

### 1. 组件懒加载

```javascript
// 路由懒加载
const routes = [
  {
    path: '/heavy',
    component: () => import('@/views/HeavyComponent.vue')
  }
]

// 组件懒加载
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() =>
  import('./components/HeavyComponent.vue')
)
```

### 2. v-memo指令

```vue
<template>
  <div>
    <!-- 只有当item.id或selected改变时才重新渲染 -->
    <div 
      v-for="item in list" 
      :key="item.id"
      v-memo="[item.id, selected]"
    >
      <p>{{ item.name }}</p>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>
```

### 3. 虚拟滚动

```vue
<template>
  <div class="virtual-list" @scroll="handleScroll">
    <div :style="{ height: totalHeight + 'px' }">
      <div 
        v-for="item in visibleItems" 
        :key="item.id"
        :style="{ 
          position: 'absolute',
          top: item.top + 'px',
          height: itemHeight + 'px'
        }"
      >
        {{ item.data }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['items'])
const itemHeight = 50
const containerHeight = 400
const scrollTop = ref(0)

const totalHeight = computed(() => props.items.length * itemHeight)

const visibleItems = computed(() => {
  const start = Math.floor(scrollTop.value / itemHeight)
  const end = Math.min(
    start + Math.ceil(containerHeight / itemHeight) + 1,
    props.items.length
  )
  
  return props.items.slice(start, end).map((item, index) => ({
    id: start + index,
    data: item,
    top: (start + index) * itemHeight
  }))
})

const handleScroll = (e) => {
  scrollTop.value = e.target.scrollTop
}
</script>
```

## TypeScript集成

### 1. 基础类型定义

```vue
<template>
  <div>
    <h2>{{ user.name }}</h2>
    <p>年龄: {{ user.age }}</p>
    <button @click="updateUser">更新用户</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// 接口定义
interface User {
  id: number
  name: string
  age: number
  email?: string
}

// 类型定义
type Status = 'loading' | 'success' | 'error'

// 响应式数据类型
const user = reactive<User>({
  id: 1,
  name: '张三',
  age: 25
})

const status = ref<Status>('loading')
const users = ref<User[]>([])

// 函数类型
const updateUser = (): void => {
  user.age++
}

const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}
</script>
```

### 2. Props和Emits类型

```vue
<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ user.name }}</p>
    <button @click="handleClick">点击</button>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number
  name: string
  age: number
}

interface Props {
  title: string
  user: User
  count?: number
}

interface Emits {
  (e: 'update', value: string): void
  (e: 'delete', id: number): void
}

// 定义props类型
const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// 定义emits类型
const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('update', 'new value')
  emit('delete', props.user.id)
}
</script>
```

### 3. 组合式函数类型

```typescript
// composables/useCounter.ts
import { ref, computed, Ref } from 'vue'

interface UseCounterReturn {
  count: Ref<number>
  doubleCount: Ref<number>
  increment: () => void
  decrement: () => void
  reset: () => void
}

export function useCounter(initialValue: number = 0): UseCounterReturn {
  const count = ref(initialValue)
  
  const doubleCount = computed(() => count.value * 2)
  
  const increment = (): void => {
    count.value++
  }
  
  const decrement = (): void => {
    count.value--
  }
  
  const reset = (): void => {
    count.value = initialValue
  }
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}
```

## 最佳实践

### 1. 组件设计原则

```vue
<!-- 好的组件设计 -->
<template>
  <div class="user-card" :class="{ 'user-card--compact': compact }">
    <div class="user-card__avatar">
      <img :src="user.avatar" :alt="user.name" />
    </div>
    
    <div class="user-card__content">
      <h3 class="user-card__name">{{ user.name }}</h3>
      <p class="user-card__title">{{ user.title }}</p>
      
      <div class="user-card__actions">
        <slot name="actions" :user="user">
          <button @click="$emit('contact', user)">联系</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
// 清晰的接口定义
defineProps({
  user: {
    type: Object,
    required: true,
    validator: (user) => {
      return user && user.name && user.avatar
    }
  },
  compact: {
    type: Boolean,
    default: false
  }
})

defineEmits(['contact'])
</script>

<style scoped>
.user-card {
  display: flex;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.user-card--compact {
  padding: 8px;
}

.user-card__avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.user-card__content {
  margin-left: 12px;
  flex: 1;
}

.user-card__name {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
}

.user-card__title {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 14px;
}
</style>
```

### 2. 组合式函数

```javascript
// composables/useApi.js
import { ref } from 'vue'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)
  
  const request = async (url, options = {}) => {
    try {
      loading.value = true
      error.value = null
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  return {
    loading,
    error,
    request
  }
}
```

```javascript
// composables/useLocalStorage.js
import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key)
  const value = ref(storedValue ? JSON.parse(storedValue) : defaultValue)
  
  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })
  
  return value
}
```

### 3. 错误处理

```vue
<template>
  <div>
    <div v-if="error" class="error">
      {{ error }}
      <button @click="retry">重试</button>
    </div>
    
    <div v-else-if="loading">加载中...</div>
    
    <div v-else>
      <!-- 正常内容 -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onErrorCaptured } from 'vue'

const loading = ref(false)
const error = ref(null)
const data = ref(null)

const fetchData = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await fetch('/api/data')
    if (!response.ok) {
      throw new Error('获取数据失败')
    }
    
    data.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const retry = () => {
  fetchData()
}

onMounted(() => {
  fetchData()
})

// 捕获子组件错误
onErrorCaptured((err, instance, info) => {
  console.error('组件错误:', err)
  error.value = '组件渲染出错'
  return false
})
</script>
```

### 4. 性能监控

```javascript
// utils/performance.js
export function measurePerformance(name, fn) {
  return async (...args) => {
    const start = performance.now()
    
    try {
      const result = await fn(...args)
      const end = performance.now()
      
      console.log(`${name} 执行时间: ${end - start}ms`)
      
      return result
    } catch (error) {
      const end = performance.now()
      console.error(`${name} 执行失败 (${end - start}ms):`, error)
      throw error
    }
  }
}

// 使用示例
const optimizedFetch = measurePerformance('API请求', fetch)
```

## 总结

Vue3提供了强大而灵活的开发体验，主要特点包括：

1. **组合式API** - 更好的逻辑复用和类型推导
2. **响应式系统** - 基于Proxy的高性能响应式
3. **更好的TypeScript支持** - 原生TypeScript支持
4. **性能提升** - 更小的包体积和更快的渲染
5. **向后兼容** - 支持Vue2的选项式API

通过掌握这些核心概念和最佳实践，你可以构建出高质量、可维护的Vue3应用程序。