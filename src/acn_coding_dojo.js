/*
 * acn_coding_dojo
 * https://github.com/juan/acn_coding_dojo
 *
 * Copyright (c) 2013 jpp
 * Licensed under the MIT license.
 */


(function(){
// attach the .compare method to Array's prototype to call it on any array
Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array){
      return false;
    }

    // compare lengths - can save a lot of time
    if (this.length !== array.length){
      return false;
    }
 
    for (var i = 0; i < this.length; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i])){
              return false;
            }
        }
        else if (this[i] !== array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};
})();

(function() {
  var GameOfLife = window.GameOfLife = { state: [] };

  GameOfLife.initialize = function  (initialState) {
    GameOfLife.state = initialState;

    return initialState;
  };

  GameOfLife.checkFewerThanTwoNeighbours = function  () {
    killElements(function(x, y) { return countNeighbours(x, y) < 2 ;});
  };

  GameOfLife.checkOvercrowding = function() {
    killElements(function(x, y) { return countNeighbours(x, y) > 3 ;});
  };

  function killElements(condition){
    var indexToRemove = [];
    for(var i=GameOfLife.state.length -1; i >= 0; i--){
      var x = GameOfLife.state[i][0];
      var y = GameOfLife.state[i][1];

      if(condition(x, y) ){ indexToRemove.push(i); }
    }

    for(i=0; i< indexToRemove.length; i++){
      GameOfLife.state.splice(indexToRemove[i], 1);
    }
  }

  function countNeighbours(x, y){
     var neighboursCount = 0;

     for(var i=0; i < GameOfLife.state.length ;i++){
      var currentX = GameOfLife.state[i][0];
      var currentY = GameOfLife.state[i][1];

      if( currentX === ( x - 1) && currentY === ( y - 1 ) ){ neighboursCount++; }
      if( currentX === ( x - 1) && currentY === ( y  ) ){ neighboursCount++; }
      if( currentX === ( x - 1) && currentY === ( y + 1 ) ){ neighboursCount++; }
      if( currentX === ( x ) && currentY === ( y - 1 ) ){ neighboursCount++; }
      if( currentX === ( x ) && currentY === ( y + 1 ) ){ neighboursCount++; }
      if( currentX === ( x + 1) && currentY === ( y - 1 ) ){ neighboursCount++; }
      if( currentX === ( x + 1) && currentY === ( y  ) ){ neighboursCount++; }
      if( currentX === ( x + 1) && currentY === ( y + 1 ) ){ neighboursCount++; }
    }  

    return neighboursCount;
  }
})();
