docker run \
       -v "$(PWD)"/output:/app/test/platforms/android/app/build/outputs/apk/debug/ \
       -v "$(PWD)"/www:/app/test/www/ \
       -v "$(PWD)"/server:/app/server/ \
       -p 3000:3000 \
       -it --rm env3d/cordova bash
