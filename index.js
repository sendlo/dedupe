/**

* Copyright (c) 2012 eBay Inc.

* Author: Mike Sendlakowski

*

* Released under the MIT License

* http://www.opensource.org/licenses/MIT

*

* Dedupe

*

* A simple NodeJS utility to identify duplicate files by name and size

*

*/

 

(function() {

 

var fs = require('fs'),

    path = require('path'),

    fileList = {};

 

 

function main() {

    indexFiles(path.resolve("."));

    printDupeReport();

}

 

function indexFiles(dir) {

    if(!fs.existsSync(dir)){return;}

    var contents = fs.readdirSync(dir),

        curPath,

        stats;

    contents.forEach(function(file, index) {

        curPath = path.join(dir, file);

        stats = fs.statSync(curPath);

        if (stats.isDirectory()) { // recurse

            indexFiles(curPath);

        } else {

            var name = file + "_" + stats.size;

            if(!fileList[name]) {

                fileList[name] = [];

            }

            fileList[name].push(curPath);

        }

    });

}

 

function printDupeReport() {

    var outStr = "",

        i,x,y,

        fileArr;

   

    for(i in fileList) {

        fileArr = fileList[i];

        if(fileArr.length > 1) {

            outStr += "\n\n" + i;

            for(x=0,y=fileArr.length;x<y;x++) {

                outStr += "\n" + fileArr[x];

            }

        }

    }

 

    fs.writeFileSync("duplicateFileReport.txt", outStr);

}

   

main();

 

})();