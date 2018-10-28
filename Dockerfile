FROM beevelop/cordova:latest
RUN mkdir /app && mkdir /app/server
WORKDIR /app

RUN cordova telemetry off && \
cordova create test && \
cd test && \
cordova platform add android && \
cordova build android

COPY server /app/server
COPY www /app/test/www

EXPOSE 3000

#WORKDIR /app/test
#CMD ["cordova","build","android"]
WORKDIR /app/server
CMD ["node","app.js"]
