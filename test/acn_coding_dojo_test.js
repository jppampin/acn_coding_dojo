(function() {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  var GameOfLife, initialState;

  module('ACN Coding Dojo', {
    setup: function() {
      GameOfLife = window.GameOfLife;
      initialState =  [[2,5], [3,4], [3,5], [4,1], [3,6], [4,5],[4,6]];
      GameOfLife.initialize(initialState);
    }
  });

  test('It should exist a game of life module', function  () {
    ok(GameOfLife !== undefined, 'We should see a GameOfLife module.');
  });

  test('It should acept an initial state', function  () {
    ok(GameOfLife.initialize !== undefined, 'We should have an initialze operation.');
    ok(GameOfLife.state.compare(initialState), 'The game state should be the provided.');
  });

  test('It should die with fewer than 2 live neighbours', function  () {
    GameOfLife.checkFewerThanTwoNeighbours();
    ok(GameOfLife.state.compare([[2,5], [3,4], [3,5], [3,6], [4,5],[4,6]]), 'We should see one less element.');
  });

  test('It should die with more than 3 live neighbours', function  () {
    GameOfLife.checkOvercrowding();
    ok(GameOfLife.state.compare([[2,5], [3,4], [4,1], [4,6]]), 'We should se the following list.');
  } );

  test('It should mantain items with two or three neighbours', function  () {
    GameOfLife.checkFewerThanTwoNeighbours();
    GameOfLife.checkOvercrowding();

    ok(GameOfLife.state.compare([[2,5], [3,4],  [4,6]]), 'We should mantain the cells with two or three neighbours.');
  });


}());
