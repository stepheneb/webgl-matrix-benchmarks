TestHelper = function() {

var isInIFrame = (window.location != window.parent.location) ? true : false;

function log(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
}

function debuggerLog(obj) {
  if (window.console && window.console.log) {
    window.console.log(obj);
  }
}

function resetPseudoRandom() {
  if (window.resetPseudoRandom) {
    window.resetPseudoRandom();
  }
}

function test(label, f) {
  // Repeats each benchmark multiple times to smooth out anomalies
  // Also tracks min and max times

  if(!f) {
    return { avg: null, min: null, max: null };
  }

  var runCount = 10;
  var internalRunCount = 100;
  var totalIterations = 0;
  var minIterations = 0;
  var maxIterations = 0;
  var totalTime = 0;
  var minTime = 0;
  var maxTime = 0;
  var timePerRun = 30;
  resetPseudoRandom();

  for(var i = 0; i < runCount; ++i) {
    var data = f(internalRunCount, -1, timePerRun);
    var iterations = internalRunCount * data.loopCount;
    var time = data.time;
    if(i == 0) {
      minIterations = iterations;
      maxIterations = iterations;
      minTime = time;
      maxTime = time;
    } else {
      if(minIterations > iterations) {
        minIterations = iterations;
        minTime = time;
      }
      if(maxIterations < iterations) {
        maxIterations = iterations;
        maxTime = time;
      }
    }
    totalIterations += iterations;
    totalTime += time;
  }

  var iterationsPerSecond = Math.floor(totalIterations / (totalTime * 0.001));
  var minIterationsPerSecond = Math.floor(minIterations / (minTime * 0.001));
  var maxIterationsPerSecond = Math.floor(maxIterations / (maxTime * 0.001));

  return { avg: iterationsPerSecond, min: minIterationsPerSecond, max: maxIterationsPerSecond, result: data.result };
}

function runTests(tests) {
  // Gather the test names
  var testNames = []
  for (var testName in tests) {
    testNames.push(testName);
  }

  // Run each test
  function runNextTest() {
    if (testNames.length) {
      var testName = testNames.shift();
      var testInfo = tests[testName];
      var data = test(testName, testInfo.test);
      if (data.avg === null) {
        log('<i>' + testName + ' Unsupported</i>');
      } else {
        log('<i>' + label + '</i> - Avg: <b>' + data.avg + ' iterations per second</b>, Min: ' + data.min + ' iterations per second, Max: ' + data.max + ' iterations per second');
      }
      if (testNames.length) {
        setTimeout(runNextTest, 100);
      }
    }
  }
  runNextTest();
}

function main() {
  var href = window.location.href;
  var slash = href.lastIndexOf('/');
  var name = href.substr(slash + 1).replace('.html', '');
  log('Test for: ' + name);
  log('');

  if (!isInIFrame) {
    runTests(tests);
  } else {
    if (console && console.log) {
      debuggerLog("loaded: " + name);
      parent.childLoaded();
    }
  }
}

return {
    main: main,
    test: test,
    resetPseudoRandom: resetPseudoRandom
  };

}();




