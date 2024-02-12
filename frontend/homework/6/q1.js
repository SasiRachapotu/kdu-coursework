const os = require('os');

//(i)
function OSMethod(){

    let jsonObject ={};
    let hostName = os.hostname();
    jsonObject.HostName=hostName;
    console.log(hostName);
    let operatingSystem = os.platform();

    console.log(operatingSystem)

    let architecture = os.arch();
    console.log(architecture);

    let osRelease = os.release();
    console.log(osRelease);

    let upTime = os.uptime();
    console.log(upTime);

    let cpuCores = os.cpus().length;
    console.log(cpuCores);

    let totalMemory = os.totalmem();
    console.log(totalMemory);

    let freeMemory = os.freemem();
    console.log(freeMemory);

    let pwd = os.homedir();
    console.log(pwd);

    jsonObject = {
        hostName,
        operatingSystem,
        architecture,
        osRelease,
        upTime,
        cpuCores,
        totalMemory,
        freeMemory,
        "Current working directory":pwd
    }
    console.log(jsonObject);

    return jsonObject;
}

module.exports = OSMethod;