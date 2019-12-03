# To run locally on Docker, all we need is these two lines...
# FROM nginx
# COPY dist/tour-of-heroes /usr/share/nginx/html

# 1. Build image
#     docker build -t com.switchfully/tour-of-heroes-gui .
# 2. Run container
#     docker container run -d -p 8555:80 com.switchfully/tour-of-heroes-gui
# 3. Navigate to http://localhost:8555

# To run on heroku, we need more configuration in our Dockerfile...

FROM nginx
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/tour-of-heroes /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'


# >_ heroku container:push web -a tour-of-heroes-niels
# >_ heroku container:release web -a tour-of-heroes-niels
# Runs on: https://tour-of-heroes-niels.herokuapp.com/

# If you want to run using this configuration locally (not on Heroku), we have to manually set the $PORT Environment variable
# docker container run -d --env PORT=80 -p 8885:80 com.switchfully/tour-of-heroes-gui
