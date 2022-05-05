//paths_favored
//paths_total
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const lineReader = readline.createInterface({
  input: fs.createReadStream('fuzzer_stats_logs.txt')
});
const infos = {};
const lables = [];
lineReader.on('line', function (line) {
  const lable = line.substring(0, line.search(/[a-zA-z]\s+/) + 1);
  const number = line.substring(line.search(/[0-9]+/));
  if(typeof infos[`${lable}`] === "undefined") {
      infos[`${lable}`] = [];
      lables.push(lable);
  }else {
    infos[`${lable}`].push(number);
    //console.log("lable",lable);
  }
  //process.stdout.write(line.search(/[a-zA-Z_]+/) + "\n");
});
lineReader.on('close', function () {
  const fn = `${path.dirname(__filename).split("\\").pop()}.csv`;
  let output = "";
  lables.forEach( (d) => {
    output += `${d},${infos[`${d}`].toString()}\n`
  })
  //console.log(output)
  fs.open(fn, 'w',(err, fd) => {
    if(err) throw err;
    fs.write(fd, output, (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    })
  })
})
