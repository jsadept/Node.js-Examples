const fs = require('fs');


function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (error) => {
        if(error){
            console.log(error);
        }
    })
}

function getData(req){
    return new Promise((res, rej) => {
        try {
            let content = '';
            req.on('data', (chunk) => {
               content += chunk.toString();
            });

            req.on('end', ()=>{
                res(content);
            })
        }
        catch (e) {
            rej(e);
        }
    })
}

module.exports = { writeDataToFile, getData }
