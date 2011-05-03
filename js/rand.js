(function(){
  /**
   * A random seed for the pseudoRandom function.
   * @private
   * @type {number}
   */
  var randomSeed = 0;

  /**
   * A constant for the pseudoRandom function
   * @private
   * @type {number}
   */
  var RANDOM_RANGE = Math.pow(2, 32);
  var RANDOM_RANGE_PLUS_1 = RANDOM_RANGE + 1;

  /**
   * Returns a deterministic pseudorandom number between 0 and 1
   * @return {number} a random number between 0 and 1
   */
  pseudoRandom = function() {
    return (randomSeed =
            (134775813 * randomSeed + 1) %
            RANDOM_RANGE) / RANDOM_RANGE_PLUS_1;
  };

  /**
   * Resets the pseudoRandom function sequence.
   */
  resetPseudoRandom = function() {
    randomSeed = 0;
  };
}());



