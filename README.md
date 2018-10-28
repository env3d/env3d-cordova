# Cordova server for env3d

An experiment where we run cordova as a service.  A simple webserver 
is provided to accept POST request with some javascript code.  

Once the javascript code is recieved, it writes a js file to the 
cordova's www directory.  From there we run 'cordova build android' 
to create an apk file which can then be downloaded.

This is written as a container for easy deployment.  Currently
deployed on amazon ecs.

build.sh file cleans up and build the container

run.sh file runs the container with some directories redirected back to
the host, for easy development.
