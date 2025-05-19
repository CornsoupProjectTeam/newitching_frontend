# 1단계: 빌드 단계
FROM node:18-alpine AS build

# 빌드 타임 ARG 정의 (4개)
ARG REACT_APP_AES_KEY
ARG REACT_APP_AES_IV
ARG REACT_APP_WS_URL
ARG REACT_APP_BACKEND_URL

# ENV 설정 (선택적, 디버깅용)
ENV REACT_APP_AES_KEY=$REACT_APP_AES_KEY
ENV REACT_APP_AES_IV=$REACT_APP_AES_IV
ENV REACT_APP_WS_URL=$REACT_APP_WS_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV NODE_ENV=production

# 작업 디렉토리
WORKDIR /app

# 소스 복사
COPY . .

# .env 파일로 4개 환경변수 주입
RUN echo "REACT_APP_AES_KEY=$REACT_APP_AES_KEY" >> .env && \
    echo "REACT_APP_AES_IV=$REACT_APP_AES_IV" >> .env && \
    echo "REACT_APP_WS_URL=$REACT_APP_WS_URL" >> .env && \
    echo "REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL" >> .env

# 빌드
RUN npm install --legacy-peer-deps && npm run build

# 2단계: 경량 serve 이미지로 결과물 배포
FROM node:18-alpine AS runtime

# serve 설치 (정적 파일 서빙용)
RUN npm install -g serve

# 작업 디렉토리
WORKDIR /app

# 빌드된 정적 파일 복사
COPY --from=build /app/build ./build

# 포트 노출
EXPOSE 3000

# 컨테이너가 뜰 때 serve 실행
CMD ["serve", "-s", "build", "-l", "3000"]
