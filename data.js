var grid = {};
grid.rows = [];


grid.rows[0] = {"cards":[{},{},{},{},{},{},{}]};
grid.rows[1] = {"cards":[{},{},{},{},{},{},{}]};
grid.rows[2] = {"cards":[{},{},{},{},{},{},{}]};
grid.rows[3] = {"cards":[{},{},{},{},{},{},{}]};
grid.rows[4] = {"cards":[{},{},{},{},{},{},{}]};


// init row
var newrow = {"cards":[{},{},{},{},{},{},{}]};

// with data
var row = {
    "timeframe":"1995",
    "cards":[
        {"content":"Hogwart's, Present Day","color":"CCCCCC","moveable":false},
        {"content":"is this the one?","color":"0094FF"},
        {"content":"oh not you two?","color":"0094FF"},
        {},
        {},
        {},
        {}
    ]
};

grid.rows.push(row);

//initial grid
// 

//new row
// object, with array of (n*col) blank cards in it

//new col
// increase col count by one
// if not on the end of the grid, move cards over one in their rows