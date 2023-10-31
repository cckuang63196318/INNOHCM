FROM nginx:stable-alpine3.17-slim

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./dist /usr/share/nginx/html/Order

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

