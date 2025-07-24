# React 框架最佳实践详细指南

## 📚 目录

1. [React 18+ 核心特性](#react-18-核心特性)
2. [项目架构设计](#项目架构设计)
3. [组件设计最佳实践](#组件设计最佳实践)
4. [Hooks 最佳实践](#hooks-最佳实践)
5. [路由管理 (React Router v6)](#路由管理-react-router-v6)
6. [状态管理方案](#状态管理方案)
7. [性能优化策略](#性能优化策略)
8. [代码规范与工程化](#代码规范与工程化)
9. [测试策略](#测试策略)
10. [部署与监控](#部署与监控)

## 🚀 React 18+ 核心特性

### 1.1 并发特性 (Concurrent Features)

#### Automatic Batching (自动批处理)

```jsx
// React 18 之前，只有在事件处理器中才会批处理
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  // React 18+ 自动批处理所有更新
  function handleClick() {
    setCount(c => c + 1);
    setFlag(f => !f);
    // 只会触发一次重新渲染
  }

  // 在 Promise、setTimeout 中也会批处理
  function handleAsyncClick() {
    setTimeout(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      // React 18+ 中也只会触发一次重新渲染
    }, 1000);
  }

  return (
    <div>
      <button onClick={handleClick}>同步更新</button>
      <button onClick={handleAsyncClick}>异步更新</button>
    </div>
  );
}
```

#### Suspense 和 Streaming SSR

```jsx
import { Suspense, lazy } from 'react';

// 懒加载组件
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>加载中...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

// 数据获取的 Suspense
function UserProfile({ userId }) {
  // 使用支持 Suspense 的数据获取库
  const user = useSWR(`/api/users/${userId}`, fetcher, {
    suspense: true
  });

  return <div>用户: {user.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>加载用户信息...</div>}>
      <UserProfile userId={1} />
    </Suspense>
  );
}
```

#### Transitions (过渡)

```jsx
import { useState, useTransition, useDeferredValue } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // 将搜索标记为非紧急更新
    startTransition(() => {
      // 执行搜索逻辑
      performSearch(value);
    });
  };

  return (
    <div>
      <input 
        value={query}
        onChange={handleInputChange}
        placeholder="搜索..."
      />
      {isPending && <div>搜索中...</div>}
      <SearchList query={deferredQuery} />
    </div>
  );
}
```

### 1.2 新的 Root API

```jsx
// React 18+ 新的创建根节点方式
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// 支持并发特性的 StrictMode
function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}
```

## 🏗️ 项目架构设计

### 2.1 推荐的项目结构

```
src/
├── components/           # 通用组件
│   ├── ui/              # 基础 UI 组件
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Modal/
│   ├── layout/          # 布局组件
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   └── Footer/
│   └── common/          # 通用业务组件
├── pages/               # 页面组件
│   ├── Home/
│   ├── About/
│   └── Dashboard/
├── hooks/               # 自定义 Hooks
├── services/            # API 服务
├── store/               # 状态管理
├── utils/               # 工具函数
├── types/               # TypeScript 类型定义
├── constants/           # 常量定义
├── assets/              # 静态资源
└── styles/              # 样式文件
```

### 2.2 组件文件结构

```
components/Button/
├── index.ts             # 导出文件
├── Button.tsx           # 主组件
├── Button.test.tsx      # 测试文件
├── Button.stories.tsx   # Storybook 故事
├── Button.module.css    # 样式文件
└── types.ts             # 类型定义
```

## 🧩 组件设计最佳实践

### 3.1 函数组件与 TypeScript

```tsx
import React, { ReactNode } from 'react';

// 定义 Props 接口
interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// 使用 React.FC 或直接函数声明
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  ...rest
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick?.(event);
  };

  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled || loading}
      onClick={handleClick}
      {...rest}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
```

### 3.2 组件组合模式

```tsx
// Compound Component Pattern
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextType | null>(null);

// 主容器组件
const Tabs: React.FC<{ children: ReactNode; defaultTab?: string }> = ({
  children,
  defaultTab = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

// 标签列表组件
const TabList: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="tab-list" role="tablist">
    {children}
  </div>
);

// 单个标签组件
const Tab: React.FC<{ value: string; children: ReactNode }> = ({
  value,
  children
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      className={`tab ${isActive ? 'tab--active' : ''}`}
      onClick={() => setActiveTab(value)}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </button>
  );
};

// 内容面板组件
const TabPanels: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="tab-panels">{children}</div>
);

const TabPanel: React.FC<{ value: string; children: ReactNode }> = ({
  value,
  children
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  const { activeTab } = context;
  if (activeTab !== value) return null;

  return (
    <div className="tab-panel" role="tabpanel">
      {children}
    </div>
  );
};

// 组合导出
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// 使用示例
function App() {
  return (
    <Tabs defaultTab="tab1">
      <Tabs.List>
        <Tabs.Tab value="tab1">标签1</Tabs.Tab>
        <Tabs.Tab value="tab2">标签2</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="tab1">内容1</Tabs.Panel>
        <Tabs.Panel value="tab2">内容2</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}
```

### 3.3 高阶组件 (HOC) 与 Render Props

```tsx
// HOC 示例：权限控制
function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AuthComponent(props: P) {
    const { user, loading } = useAuth();

    if (loading) return <div>加载中...</div>;
    if (!user) return <div>请先登录</div>;

    return <WrappedComponent {...props} />;
  };
}

// Render Props 示例：数据获取
interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return <>{children(data, loading, error)}</>;
}

// 使用示例
function UserProfile({ userId }: { userId: string }) {
  return (
    <DataFetcher<User> url={`/api/users/${userId}`}>
      {(user, loading, error) => {
        if (loading) return <div>加载中...</div>;
        if (error) return <div>错误: {error.message}</div>;
        if (!user) return <div>用户不存在</div>;
        
        return <div>用户: {user.name}</div>;
      }}
    </DataFetcher>
  );
}
```

## 🎣 Hooks 最佳实践

### 4.1 自定义 Hooks

```tsx
// 数据获取 Hook
interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

function useApi<T>(url: string, options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { immediate = true, onSuccess, onError } = options;

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const error = err as Error;
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [url, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, loading, error, execute, refetch: execute };
}

// 本地存储 Hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

// 防抖 Hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// 使用示例
function SearchComponent() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { data, loading } = useApi(`/api/search?q=${debouncedQuery}`, {
    immediate: false
  });

  useEffect(() => {
    if (debouncedQuery) {
      // 执行搜索
    }
  }, [debouncedQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索..."
      />
      {loading && <div>搜索中...</div>}
      {data && <SearchResults results={data} />}
    </div>
  );
}
```

### 4.2 性能优化 Hooks

```tsx
// useMemo 和 useCallback 的正确使用
function ExpensiveComponent({ items, filter, onItemClick }) {
  // 缓存计算结果
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]);

  // 缓存事件处理器
  const handleItemClick = useCallback((item) => {
    onItemClick(item.id);
  }, [onItemClick]);

  return (
    <div>
      {filteredItems.map(item => (
        <ExpensiveItem
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
}

// React.memo 优化子组件
const ExpensiveItem = React.memo(({ item, onClick }) => {
  return (
    <div onClick={() => onClick(item)}>
      {item.name}
    </div>
  );
});
```

## 🛣️ 路由管理 (React Router v6)

### 5.1 基础路由配置

```tsx
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from 'react-router-dom';

// 路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'dashboard',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        children: [
          {
            index: true,
            element: <DashboardHome />
          },
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'settings',
            element: <Settings />
          }
        ]
      },
      {
        path: 'users/:userId',
        element: <UserDetail />,
        loader: async ({ params }) => {
          return fetch(`/api/users/${params.userId}`);
        }
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);

// 应用入口
function App() {
  return <RouterProvider router={router} />;
}

// 布局组件
function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

### 5.2 路由守卫与权限控制

```tsx
import { useAuth } from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

// 权限路由组件
function ProtectedRoute({ children, requiredRole }: {
  children: ReactNode;
  requiredRole?: string;
}) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>验证中...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

// 登录页面
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      navigate(from, { replace: true });
    } catch (error) {
      // 处理登录错误
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* 登录表单 */}
    </form>
  );
}
```

### 5.3 数据加载与错误处理

```tsx
import { useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router-dom';

// 数据加载器
export async function userLoader({ params }: { params: any }) {
  const user = await fetch(`/api/users/${params.userId}`);
  if (!user.ok) {
    throw new Response('用户不存在', { status: 404 });
  }
  return user.json();
}

// 使用加载的数据
function UserDetail() {
  const user = useLoaderData() as User;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// 错误边界
function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  }

  return (
    <div>
      <h1>出错了！</h1>
      <p>抱歉，发生了意外错误。</p>
    </div>
  );
}
```

## 🗃️ 状态管理方案

### 6.1 Zustand (推荐轻量级方案)

```tsx
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// 定义状态接口
interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// 创建用户状态 store
export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        loading: false,
        error: null,

        login: async (credentials) => {
          set({ loading: true, error: null });
          try {
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentials)
            });
            
            if (!response.ok) throw new Error('登录失败');
            
            const user = await response.json();
            set({ user, loading: false });
          } catch (error) {
            set({ error: error.message, loading: false });
          }
        },

        logout: () => {
          set({ user: null });
          // 清除本地存储的 token 等
        },

        updateProfile: async (data) => {
          const { user } = get();
          if (!user) return;

          set({ loading: true });
          try {
            const response = await fetch(`/api/users/${user.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('更新失败');

            const updatedUser = await response.json();
            set({ user: updatedUser, loading: false });
          } catch (error) {
            set({ error: error.message, loading: false });
          }
        }
      }),
      {
        name: 'user-storage',
        partialize: (state) => ({ user: state.user }) // 只持久化用户信息
      }
    ),
    { name: 'user-store' }
  )
);

// 在组件中使用
function UserProfile() {
  const { user, loading, updateProfile } = useUserStore();

  const handleUpdate = (data: Partial<User>) => {
    updateProfile(data);
  };

  if (loading) return <div>加载中...</div>;
  if (!user) return <div>请先登录</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => handleUpdate({ name: '新名称' })}>
        更新资料
      </button>
    </div>
  );
}
```

### 6.2 Redux Toolkit (复杂应用推荐)

```tsx
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

// 异步 thunk
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('获取用户失败');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 创建 slice
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [] as User[],
    loading: false,
    error: null as string | null
  },
  reducers: {
    addUser: (state, action) => {
      state.items.push(action.payload);
    },
    removeUser: (state, action) => {
      state.items = state.items.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const index = state.items.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { addUser, removeUser, updateUser } = usersSlice.actions;

// 配置 store
export const store = configureStore({
  reducer: {
    users: usersSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 类型化的 hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);

// 在组件中使用
function UsersList() {
  const dispatch = useAppDispatch();
  const { items: users, loading, error } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          {user.name}
          <button onClick={() => dispatch(removeUser(user.id))}>
            删除
          </button>
        </div>
      ))}
    </div>
  );
}
```

### 6.3 Context + useReducer (中等复杂度)

```tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// 定义状态和动作类型
interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

// Reducer 函数
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    default:
      return state;
  }
}

// 创建 Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider 组件
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    theme: 'light',
    notifications: []
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// 自定义 Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

// 具体的业务 Hooks
export function useAuth() {
  const { state, dispatch } = useApp();

  const login = async (credentials: LoginCredentials) => {
    try {
      const user = await authService.login(credentials);
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { id: Date.now().toString(), type: 'error', message: '登录失败' }
      });
    }
  };

  const logout = () => {
    dispatch({ type: 'SET_USER', payload: null });
  };

  return { user: state.user, login, logout };
}
```

## ⚡ 性能优化策略

### 7.1 代码分割与懒加载

```tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// 路由级别的代码分割
const Home = lazy(() => import('../pages/Home'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));

// 组件级别的代码分割
const HeavyChart = lazy(() => import('../components/HeavyChart'));

function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}

// 条件加载组件
function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <h1>仪表板</h1>
      <button onClick={() => setShowChart(true)}>
        显示图表
      </button>
      {showChart && (
        <Suspense fallback={<div>加载图表...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

### 7.2 虚拟化长列表

```tsx
import { FixedSizeList as List } from 'react-window';

interface VirtualListProps {
  items: any[];
  height: number;
  itemHeight: number;
}

function VirtualList({ items, height, itemHeight }: VirtualListProps) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <div className="list-item">
        {items[index].name}
      </div>
    </div>
  );

  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemHeight}
      width="100%"
    >
      {Row}
    </List>
  );
}

// 使用示例
function LargeDataList() {
  const [items] = useState(() => 
    Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Item ${i}` }))
  );

  return (
    <div>
      <h1>大数据列表</h1>
      <VirtualList items={items} height={400} itemHeight={50} />
    </div>
  );
}
```

### 7.3 图片优化与懒加载

```tsx
import { useState, useRef, useEffect } from 'react';

// 图片懒加载 Hook
function useImageLazyLoad() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return { isLoaded, isInView, setIsLoaded, imgRef };
}

// 懒加载图片组件
interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
}

function LazyImage({ src, alt, placeholder, className }: LazyImageProps) {
  const { isLoaded, isInView, setIsLoaded, imgRef } = useImageLazyLoad();

  return (
    <div className={`lazy-image-container ${className}`} ref={imgRef}>
      {isInView && (
        <>
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s'
            }}
          />
          {!isLoaded && placeholder && (
            <div className="image-placeholder">
              <img src={placeholder} alt="" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

// 响应式图片组件
function ResponsiveImage({ src, alt, sizes }: {
  src: string;
  alt: string;
  sizes?: string;
}) {
  return (
    <picture>
      <source
        media="(max-width: 768px)"
        srcSet={`${src}?w=400 400w, ${src}?w=800 800w`}
      />
      <source
        media="(min-width: 769px)"
        srcSet={`${src}?w=800 800w, ${src}?w=1200 1200w`}
      />
      <img
        src={`${src}?w=800`}
        alt={alt}
        sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
        loading="lazy"
      />
    </picture>
  );
}
```

## 📏 代码规范与工程化

### 8.1 ESLint 配置

```json
// .eslintrc.json
{
  "extends": [
    "react-app",
    "react-app/jest",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["react-hooks", "@typescript-eslint"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### 8.2 Prettier 配置

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### 8.3 Husky 和 lint-staged

```json
// package.json
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

## 🧪 测试策略

### 9.1 单元测试 (Jest + React Testing Library)

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('shows loading state', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});

// 测试自定义 Hook
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter Hook', () => {
  test('should increment counter', () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

### 9.2 集成测试

```tsx
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProfile } from './UserProfile';

// 测试工具函数
function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

describe('UserProfile Integration', () => {
  test('displays user information after loading', async () => {
    // Mock API 响应
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          id: 1,
          name: 'John Doe',
          email: 'john@example.com'
        })
      })
    ) as jest.Mock;

    renderWithProviders(<UserProfile userId="1" />);

    expect(screen.getByText('加载中...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });
});
```

### 9.3 E2E 测试 (Playwright)

```typescript
// tests/e2e/user-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Authentication Flow', () => {
  test('should login and navigate to dashboard', async ({ page }) => {
    await page.goto('/login');

    // 填写登录表单
    await page.fill('[data-testid="email-input"]', 'user@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');

    // 验证跳转到仪表板
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('仪表板');
  });

  test('should display error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[data-testid="email-input"]', 'invalid@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');

    await expect(page.locator('[data-testid="error-message"]'))
      .toContainText('登录失败');
  });
});
```

## 🚀 部署与监控

### 10.1 构建优化

```javascript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@mui/material', '@emotion/react']
        }
      }
    }
  }
});
```

### 10.2 错误监控

```tsx
import * as Sentry from '@sentry/react';

// 初始化 Sentry
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0
});

// 错误边界
const SentryErrorBoundary = Sentry.withErrorBoundary(App, {
  fallback: ({ error, resetError }) => (
    <div>
      <h1>出错了！</h1>
      <p>{error.message}</p>
      <button onClick={resetError}>重试</button>
    </div>
  )
});

// 性能监控
function usePerformanceMonitoring() {
  useEffect(() => {
    // 监控 Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }, []);
}
```

### 10.3 CI/CD 配置

```yaml
# .github/workflows/deploy.yml
name: Deploy React App

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run lint
      - run: npm run type-check

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📚 总结

### 最佳实践要点

1. **组件设计**：保持组件单一职责，使用 TypeScript 增强类型安全
2. **状态管理**：根据应用复杂度选择合适的状态管理方案
3. **性能优化**：合理使用 memo、useMemo、useCallback，实施代码分割
4. **路由管理**：使用 React Router v6 的新特性，实现权限控制
5. **测试策略**：编写单元测试、集成测试和 E2E 测试
6. **工程化**：配置 ESLint、Prettier、Husky 确保代码质量
7. **监控部署**：集成错误监控和性能监控，建立 CI/CD 流程

### 推荐的技术栈

- **框架**：React 18+
- **语言**：TypeScript
- **路由**：React Router v6
- **状态管理**：Zustand (轻量) / Redux Toolkit (复杂)
- **样式**：CSS Modules / Styled Components / Tailwind CSS
- **测试**：Jest + React Testing Library + Playwright
- **构建**：Vite
- **部署**：Vercel / Netlify
- **监控**：Sentry + Web Vitals

通过遵循这些最佳实践，您可以构建出高质量、可维护、高性能的 React 应用程序！