const util = require('util');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const { exec } = require('child_process');

const jobQueue = [];

app.use('/cordova/apks',express.static('apks'));

app.get('/cordova', (req, res) => {
    res.send('Use POST and send the javascript in the body');    
});

app.post('/cordova', bodyParser.text(), (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
    res.header('Access-Control-Allow-Headers', 'Content-Type');


    // extract the javascript code and push to the job queue.
    // Job will be processed in order by the processQueue 'thread'
    let jsFile = req.body;
    let fileName = `app-${Date.now()}.apk`;
    jobQueue.push({name: `/app/server/apks/${fileName}`, src: jsFile});
    
    let resJson = {
        applink: `apks/${fileName}`
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(resJson));
});


async function processQueue() {
    if (jobQueue.length > 0) {
        console.log('job found in queue: ',jobQueue.length);
        let jsFile = jobQueue.pop();
        await processFile(jsFile);
    }
  
    let delay = jobQueue.length > 0 ? 0 : 5000;
        
    setTimeout(processQueue, delay);
}

const writeFile = util.promisify(fs.writeFile);
const exec_p = util.promisify(exec);

async function processFile(jsFile) {
    console.log('processing file ',jsFile);
    let err = await writeFile("/app/test/www/index.js", jsFile.src);
    if (!err) {
        let {stdout, stderr} = await exec_p('cordova build android', {cwd: '/app/test/'});
        console.log(stdout);
        fs.createReadStream('/app/test/platforms/android/app/build/outputs/apk/debug/app-debug.apk')
          .pipe(fs.createWriteStream(jsFile.name));
    }    
}

// Process the queue on an independent 'thread'
processQueue();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
