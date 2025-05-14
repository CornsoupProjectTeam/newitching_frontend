# Step 1: Build Stage
FROM node:18-alpine AS build

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 패키지 설치
RUN npm install

# 환경 변수 복사
COPY .env.production .env

# 소스 코드 복사
COPY . .

# React 애플리케이션 빌드
ENV NODE_ENV=production
RUN npm run build

# Step 2: Production Stage
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 정적 파일 서빙을 위한 serve 패키지 설치
RUN npm install -g serve

# 빌드 결과 복사
COPY --from=build /app/build /app/build

# 포트 노출
EXPOSE 3000

# serve를 사용하여 정적 파일 서빙
CMD ["serve", "-s", "build", "-l", "3000"]
