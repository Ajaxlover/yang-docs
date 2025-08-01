
## 2. Nginx 基础概念

### 2.1 什么是 Nginx

Nginx 是一个高性能的 Web 服务器和反向代理服务器，特别适合：

- **静态资源服务**：高效处理 HTML、CSS、JS、图片等静态文件
- **反向代理**：将前端请求转发到后端 API 服务器
- **负载均衡**：在多个后端服务器之间分配请求
- **缓存服务**：缓存静态资源和 API 响应

### 2.2 核心配置结构

```nginx
# nginx.conf 基础结构
http {
    # 全局配置
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    # 服务器配置
    server {
        listen       80;
        server_name  localhost;
        
        # 路由配置
        location / {
            root   /usr/share/nginx/html;
            index  index.html;
        }
    }
}
```

### 2.3 关键指令说明

```nginx
# 监听端口
listen 80;                    # HTTP 端口
listen 443 ssl;              # HTTPS 端口

# 域名配置
server_name example.com;      # 单个域名
server_name *.example.com;    # 通配符域名
server_name example.com www.example.com;  # 多个域名

# 文件路径
root /var/www/html;          # 根目录
index index.html index.htm;  # 默认文件

# 路由匹配
location / { }               # 精确匹配
location /api/ { }           # 前缀匹配
location ~ \.(js|css)$ { }   # 正则匹配
```

## 3. 前端项目部署配置

### 3.1 单页面应用 (SPA) 配置

```nginx
# React/Vue/Angular SPA 配置
server {
    listen 80;
    server_name myapp.com;
    root /var/www/myapp/dist;
    index index.html;
    
    # SPA 路由配置 - 所有路由都返回 index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API 代理
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 3.2 多页面应用配置

```nginx
# 传统多页面应用配置
server {
    listen 80;
    server_name website.com;
    root /var/www/website;
    index index.html;
    
    # 首页
    location = / {
        try_files /index.html =404;
    }
    
    # 页面路由
    location /about {
        try_files /about.html /about/index.html =404;
    }
    
    location /products {
        try_files /products.html /products/index.html =404;
    }
    
    # 静态资源
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public";
    }
}
```

### 3.3 微前端配置

```nginx
# 微前端架构配置
server {
    listen 80;
    server_name micro-frontend.com;
    
    # 主应用
    location / {
        root /var/www/main-app;
        try_files $uri $uri/ /index.html;
    }
    
    # 子应用 1
    location /app1/ {
        alias /var/www/app1/;
        try_files $uri $uri/ /app1/index.html;
    }
    
    # 子应用 2
    location /app2/ {
        alias /var/www/app2/;
        try_files $uri $uri/ /app2/index.html;
    }
    
    # 共享资源
    location /shared/ {
        alias /var/www/shared/;
        expires 1y;
    }
}
```

## 4. API 代理配置

### 4.1 开发环境代理

```nginx
# 本地开发代理配置
server {
    listen 8080;
    server_name localhost;
    
    # 前端开发服务器代理
    location / {
        proxy_pass http://localhost:3000;  # Webpack Dev Server
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # API 代理到后端
    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # 解决跨域
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';
        add_header Access-Control-Allow-Headers 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
        
        # 处理 OPTIONS 请求
        if ($request_method = 'OPTIONS') {
            return 204;
        }
    }
}
```

### 4.2 生产环境代理

```nginx
# 生产环境 API 代理
upstream backend_api {
    server api1.example.com:8080;
    server api2.example.com:8080;
    server api3.example.com:8080;
}

server {
    listen 80;
    server_name app.example.com;
    root /var/www/app;
    
    # 前端静态文件
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API 代理
    location /api/ {
        proxy_pass http://backend_api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 超时设置
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
    
    # WebSocket 代理
    location /ws/ {
        proxy_pass http://backend_api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

### 4.3 多环境配置

```nginx
# 多环境 API 代理
map $http_host $backend_pool {
    ~^dev\.     http://dev-api.internal:8080;
    ~^test\.    http://test-api.internal:8080;
    ~^staging\. http://staging-api.internal:8080;
    default     http://prod-api.internal:8080;
}

server {
    listen 80;
    server_name ~^(dev|test|staging|www)\.example\.com$;
    root /var/www/app;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass $backend_pool/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 5. 静态资源优化

### 5.1 缓存策略

```nginx
server {
    listen 80;
    server_name static.example.com;
    root /var/www/static;
    
    # HTML 文件 - 短缓存
    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public, no-cache";
    }
    
    # CSS/JS 文件 - 长缓存（带版本号）
    location ~* \.(css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        
        # 启用 ETag
        etag on;
    }
    
    # 图片文件 - 长缓存
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 字体文件 - 长缓存 + CORS
    location ~* \.(woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Access-Control-Allow-Origin *;
    }
    
    # 其他静态资源
    location ~* \.(pdf|doc|docx|zip)$ {
        expires 1d;
        add_header Cache-Control "public";
    }
}
```

### 5.2 Gzip 压缩

```nginx
http {
    # 启用 gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml
        application/x-font-ttf
        application/vnd.ms-fontobject
        font/opentype;
}

server {
    listen 80;
    server_name example.com;
    root /var/www/app;
    
    # 预压缩文件支持
    location ~* \.(js|css)$ {
        gzip_static on;  # 优先使用 .gz 文件
        expires 1y;
    }
}
```

### 5.3 Brotli 压缩

```nginx
# 需要安装 nginx-module-brotli
http {
    # 启用 Brotli 压缩
    brotli on;
    brotli_comp_level 6;
    brotli_types
        text/plain
        text/css
        application/json
        application/javascript
        text/xml
        application/xml
        application/xml+rss
        text/javascript
        image/svg+xml;
}

server {
    listen 80;
    server_name example.com;
    root /var/www/app;
    
    location ~* \.(js|css)$ {
        brotli_static on;  # 优先使用 .br 文件
        gzip_static on;    # 备用 .gz 文件
        expires 1y;
    }
}
```

## 6. HTTPS 配置

### 6.1 基础 SSL 配置

```nginx
# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS 配置
server {
    listen 443 ssl http2;
    server_name example.com www.example.com;
    
    # SSL 证书
    ssl_certificate /etc/ssl/certs/example.com.crt;
    ssl_certificate_key /etc/ssl/private/example.com.key;
    
    # SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    root /var/www/app;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 6.2 Let's Encrypt 免费证书

```nginx
# Let's Encrypt 证书配置
server {
    listen 80;
    server_name example.com www.example.com;
    
    # ACME 验证路径
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    # 其他请求重定向到 HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;
    
    # Let's Encrypt 证书
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    
    # SSL 配置
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
    root /var/www/app;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 6.3 证书自动续期

```bash
# 自动续期脚本
#!/bin/bash
# /etc/cron.d/certbot-renew

# 每天检查证书是否需要续期
0 12 * * * /usr/bin/certbot renew --quiet --nginx

# 或者使用 systemd timer
# systemctl enable certbot.timer
# systemctl start certbot.timer
```

## 7. 前端安全配置

### 7.1 安全头配置

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;
    
    # 基础安全头
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # CSP 内容安全策略
    add_header Content-Security-Policy "
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https:;
        connect-src 'self' https://api.example.com;
        frame-ancestors 'none';
        base-uri 'self';
        form-action 'self';
    " always;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    # 隐藏服务器信息
    server_tokens off;
    
    root /var/www/app;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 7.2 访问控制

```nginx
server {
    listen 80;
    server_name admin.example.com;
    
    # IP 白名单
    location / {
        allow 192.168.1.0/24;  # 内网
        allow 10.0.0.0/8;      # VPN
        deny all;
        
        root /var/www/admin;
        try_files $uri $uri/ /index.html;
    }
    
    # 基础认证
    location /secure/ {
        auth_basic "Restricted Area";
        auth_basic_user_file /etc/nginx/.htpasswd;
        
        root /var/www/secure;
        try_files $uri $uri/ /index.html;
    }
}
```

### 7.3 防止恶意请求

```nginx
# 限制请求频率
http {
    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
}

server {
    listen 80;
    server_name example.com;
    
    # 限制文件上传大小
    client_max_body_size 10M;
    
    # 禁止访问敏感文件
    location ~ /\. {
        deny all;
    }
    
    location ~ \.(env|config|log)$ {
        deny all;
    }
    
    # 登录接口限制
    location /login {
        limit_req zone=login burst=3 nodelay;
        proxy_pass http://backend;
    }
    
    # API 接口限制
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://backend;
    }
}
```

## 8. 开发调试技巧

### 8.1 本地开发环境

```nginx
# 本地开发配置
server {
    listen 80;
    server_name local.example.com;
    
    # 开发服务器代理
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # 禁用缓存
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }
    
    # 模拟 API 响应
    location /api/mock/ {
        alias /var/www/mock-data/;
        add_header Content-Type application/json;
        add_header Access-Control-Allow-Origin *;
    }
    
    # 静态资源（用于测试）
    location /static/ {
        alias /var/www/static/;
        expires -1;
    }
}
```

### 8.2 错误页面配置

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/app;
    
    # 自定义错误页面
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    
    location = /404.html {
        root /var/www/error-pages;
        internal;
    }
    
    location = /50x.html {
        root /var/www/error-pages;
        internal;
    }
    
    # SPA 路由处理
    location / {
        try_files $uri $uri/ @fallback;
    }
    
    location @fallback {
        rewrite ^.*$ /index.html last;
    }
}
```

### 8.3 调试日志配置

```nginx
# 开发环境日志配置
http {
    log_format debug '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent" '
                    'rt=$request_time uct="$upstream_connect_time" '
                    'uht="$upstream_header_time" urt="$upstream_response_time"';
}

server {
    listen 80;
    server_name dev.example.com;
    
    # 详细访问日志
    access_log /var/log/nginx/dev.access.log debug;
    error_log /var/log/nginx/dev.error.log debug;
    
    location / {
        # 添加调试头
        add_header X-Debug-Server $hostname;
        add_header X-Debug-Time $time_local;
        add_header X-Debug-URI $request_uri;
        
        proxy_pass http://localhost:3000;
    }
}
```

## 9. 性能监控

### 9.1 基础监控

```nginx
# 状态监控配置
server {
    listen 8080;
    server_name localhost;
    
    # Nginx 状态
    location /nginx_status {
        stub_status on;
        access_log off;
        allow 127.0.0.1;
        deny all;
    }
    
    # 健康检查
    location /health {
        access_log off;
        return 200 "OK";
        add_header Content-Type text/plain;
    }
}
```

### 9.2 性能日志格式

```nginx
http {
    # 性能监控日志格式
    log_format performance '$remote_addr - $remote_user [$time_local] '
                          '"$request" $status $bytes_sent '
                          '"$http_referer" "$http_user_agent" '
                          'rt=$request_time '
                          'uct="$upstream_connect_time" '
                          'uht="$upstream_header_time" '
                          'urt="$upstream_response_time" '
                          'cache="$upstream_cache_status"';
    
    # JSON 格式日志（便于分析）
    log_format json escape=json
        '{'
            '"timestamp":"$time_iso8601",'
            '"remote_addr":"$remote_addr",'
            '"method":"$request_method",'
            '"uri":"$request_uri",'
            '"status":$status,'
            '"bytes_sent":$bytes_sent,'
            '"request_time":$request_time,'
            '"upstream_response_time":"$upstream_response_time",'
            '"user_agent":"$http_user_agent",'
            '"referer":"$http_referer"'
        '}';
}

server {
    listen 80;
    server_name example.com;
    
    access_log /var/log/nginx/performance.log performance;
    access_log /var/log/nginx/json.log json;
    
    location / {
        root /var/www/app;
        try_files $uri $uri/ /index.html;
    }
}
```

### 9.3 实时监控脚本

```bash
#!/bin/bash
# 实时监控脚本

# 监控响应时间
tail -f /var/log/nginx/performance.log | awk '{
    if ($NF > 1) {
        print strftime("%Y-%m-%d %H:%M:%S"), "Slow request:", $7, "Time:", $NF
    }
}'

# 监控错误率
tail -f /var/log/nginx/access.log | awk '{
    total++
    if ($9 >= 400) errors++
    if (total % 100 == 0) {
        printf "Error rate: %.2f%% (%d/%d)\n", (errors/total)*100, errors, total
    }
}'
```

## 10. 常用命令

### 10.1 基础命令

```bash
# 检查配置文件语法
nginx -t

# 重新加载配置（不中断服务）
nginx -s reload

# 停止服务
nginx -s stop

# 优雅停止（处理完当前请求）
nginx -s quit

# 重新打开日志文件
nginx -s reopen

# 查看版本和编译信息
nginx -V

# 查看进程
ps aux | grep nginx

# 查看端口占用
netstat -tlnp | grep :80
```

### 10.2 日志分析

```bash
# 查看访问日志
tail -f /var/log/nginx/access.log

# 查看错误日志
tail -f /var/log/nginx/error.log

# 分析访问量
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10

# 分析状态码
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -nr

# 分析响应时间
awk '{print $NF}' /var/log/nginx/access.log | sort -n | tail -10

# 分析用户代理
awk -F'"' '{print $6}' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -10
```

### 10.3 配置测试

```bash
# 测试配置文件
nginx -t -c /etc/nginx/nginx.conf

# 测试特定站点配置
nginx -t -c /etc/nginx/sites-available/example.com

# 查看配置文件内容
nginx -T

# 检查配置文件语法并显示详细信息
nginx -t -q
```

## 11. 前端构建集成

### 11.1 CI/CD 集成

```yaml
# .github/workflows/deploy.yml
name: Deploy Frontend

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to server
      run: |
        rsync -avz --delete dist/ user@server:/var/www/app/
        ssh user@server 'nginx -s reload'
```

### 11.2 Docker 集成

```dockerfile
# Dockerfile
FROM node:16-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# nginx.conf for Docker
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    sendfile on;
    keepalive_timeout 65;
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 11.3 自动化部署脚本

```bash
#!/bin/bash
# deploy.sh

set -e

echo "Starting deployment..."

# 构建项目
npm run build

# 备份当前版本
sudo cp -r /var/www/app /var/www/app.backup.$(date +%Y%m%d_%H%M%S)

# 部署新版本
sudo rm -rf /var/www/app/*
sudo cp -r dist/* /var/www/app/

# 测试 Nginx 配置
sudo nginx -t

# 重新加载 Nginx
sudo nginx -s reload

echo "Deployment completed successfully!"

# 清理旧备份（保留最近5个）
sudo ls -t /var/www/app.backup.* | tail -n +6 | sudo xargs rm -rf

echo "Cleanup completed!"
```

## 12. 实战案例

### 12.1 React 应用完整配置

```nginx
# React 应用生产环境配置
server {
    listen 80;
    server_name react-app.com www.react-app.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name react-app.com www.react-app.com;
    
    # SSL 配置
    ssl_certificate /etc/letsencrypt/live/react-app.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/react-app.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
    # 安全头
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    root /var/www/react-app;
    index index.html;
    
    # Gzip 压缩
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_comp_level 6;
    
    # 主应用路由
    location / {
        try_files $uri $uri/ /index.html;
        
        # HTML 文件不缓存
        location ~* \.html$ {
            add_header Cache-Control "no-cache, no-store, must-revalidate";
            add_header Pragma "no-cache";
            add_header Expires "0";
        }
    }
    
    # 静态资源缓存
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API 代理
    location /api/ {
        proxy_pass https://api.react-app.com/;
        proxy_ssl_verify off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # 健康检查
    location /health {
        access_log off;
        return 200 "OK";
        add_header Content-Type text/plain;
    }
}
```

### 12.2 Vue.js 多环境配置

```nginx
# Vue.js 多环境配置
map $http_host $env {
    ~^dev\.     "development";
    ~^test\.    "testing";
    ~^staging\. "staging";
    default     "production";
}

map $env $api_backend {
    "development" "https://dev-api.vue-app.com";
    "testing"     "https://test-api.vue-app.com";
    "staging"     "https://staging-api.vue-app.com";
    "production"  "https://api.vue-app.com";
}

server {
    listen 443 ssl http2;
    server_name ~^(dev|test|staging|www)?\.?vue-app\.com$;
    
    ssl_certificate /etc/ssl/certs/vue-app.com.crt;
    ssl_certificate_key /etc/ssl/private/vue-app.com.key;
    
    root /var/www/vue-app;
    index index.html;
    
    # 环境标识
    add_header X-Environment $env always;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API 代理
    location /api/ {
        proxy_pass $api_backend/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 开发环境允许跨域
        if ($env = "development") {
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';
            add_header Access-Control-Allow-Headers 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
        }
    }
    
    # 静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        
        # 开发环境禁用缓存
        if ($env = "development") {
            expires -1;
            add_header Cache-Control "no-cache, no-store, must-revalidate";
        }
    }
}
```

### 12.3 Angular 应用配置

```nginx
# Angular 应用配置
server {
    listen 443 ssl http2;
    server_name angular-app.com;
    
    ssl_certificate /etc/ssl/certs/angular-app.com.crt;
    ssl_certificate_key /etc/ssl/private/angular-app.com.key;
    
    root /var/www/angular-app;
    index index.html;
    
    # CSP 配置（Angular 特定）
    add_header Content-Security-Policy "
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval';
        style-src 'self' 'unsafe-inline';
        font-src 'self' data:;
        img-src 'self' data: https:;
        connect-src 'self' https://api.angular-app.com;
    " always;
    
    # Angular 路由
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 预加载模块
    location ~* \.(js)$ {
        add_header Link "</style.css>; rel=preload; as=style" always;
        expires 1y;
    }
    
    # Service Worker
    location /ngsw.json {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
    
    location /ngsw-worker.js {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
    
    # API 代理
    location /api/ {
        proxy_pass https://api.angular-app.com/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
