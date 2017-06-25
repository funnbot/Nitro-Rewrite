const child_process = require('child_process');
const fs = require('fs');

fs.readdir('./modules', (err, modules) => {
    if (err) throw new Error("Module Folder Is Screwed");

    modules.forEach(module => {

        child_process.fork(`./modules/${module}`)

    })
});