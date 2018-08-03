// JavaScript File
var readline = require('readline');
    
var toy = {x:0, y:0, face:""};
var directs = ["NORTH", "EAST", "SOUTH", "WEST"]; //clock-wise

var rd = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rd.setPrompt("Please type in command line by line, or 'exit' to exit > ");
rd.prompt(true);

rd.on('line', function(line) {
    if (!line) return;
    
    var input = line.toUpperCase().trim();
    var leng = input.indexOf(' ', 0);
    var command = leng === -1 ? input : input.substr(0, leng);
    
    if (input === 'EXIT') { 
        rd.close();
    }
    
    if (command === "PLACE"){
        place(input.substring(leng, input.length).trim())
        //console.log(JSON.stringify(toy));
    }
    
    if (command === "LEFT"){
        left();
        //console.log(JSON.stringify(toy));
    }
    
    if (command === "RIGHT"){
        right();
        //console.log(JSON.stringify(toy));
    }
    
     if (command === "MOVE"){
        move();
        //console.log(JSON.stringify(toy));
    }
    
     if (command === "REPORT"){
        if (!toy.face) return;
        console.log("Output: " + toy.x + ',' + toy.y + ',' + toy.face);
    }
})
.on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});

var place = function(state){
    if (!state) return;
    
    var args = state.split(',');
    if (args.length < 3 || !args[0]|| !args[1]|| !args[2]) return;
    
    var x = parseInt(args[0], 10);
    if (x < 0 || x > 5) return;
    
    var y = parseInt(args[1], 10);
    if (y < 0 || y > 5) return;
    
    if (directs.indexOf(args[2], 0) < 0) return;
    
    toy.x = x;
    toy.y = y;
    toy.face = args[2];
};

var move = function(){
    if (!toy.face) return;
    
    if (toy.face === "NORTH"){
        var next = toy.y + 1;
        if (next <= 5) toy.y = next;
    }
    
    if (toy.face === "SOUTH"){
        var next = toy.y - 1;
        if (next >= 0) toy.y = next;
    }
    
     if (toy.face === "EAST"){
        var next = toy.x + 1;
        if (next <= 5) toy.x = next;
    }
    
    if (toy.face === "WEST"){
        var next = toy.x - 1;
        if (next >= 0) toy.x = next;
    }
};

var left = function(){
    if (!toy.face) return;
    
    var i = directs.indexOf(toy.face, 0) - 1;
    if (i == -1) i = 3;
    toy.face = directs[i];
};

var right = function(){
    if (!toy.face) return;
    
    var i = directs.indexOf(toy.face, 0) + 1;
    if (i == 4) i = 0;
    toy.face = directs[i];
};

//console.log("Please type in command line by line, or 'exit' to exit:")