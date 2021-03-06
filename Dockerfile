# Stage 1 - the build process
FROM node:16 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./

ARG REACT_APP_API_URL="https://victor-borshak-be-hackathon-boilerplate-staging.sandbox.solutions.drdev.io"
ARG REACT_APP_DATAROBOT_OAUTH_CLIENT_ID="MHDAtbiyhqOB9FVyeNxr1Snj6Y484wmY"
ARG REACT_APP_DATAROBOT_OAUTH_AUTHORIZE_URL="https://staging.datarobot.com/oauth/authenticate"

RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.21
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
RUN sed -i 's/80/5000/' /etc/nginx/conf.d/default.conf && \
  sed -i s/404.html/index.html/ /etc/nginx/conf.d/default.conf && \
  sed -i s/#error_page/error_page/ /etc/nginx/conf.d/default.conf && \
  sed -i s/404/404\ =200/ /etc/nginx/conf.d/default.conf

EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]
