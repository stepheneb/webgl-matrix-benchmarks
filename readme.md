Simple benchmarks for testing the speed of JavaScript matrix libraries adapted from Brandon Jones benchmarks
in his glmatrix library: https://glmatrix.googlecode.com/hg/

If you have a browswer with WebGL you can run the benchmarks [here](http://stepheneb.github.com/webgl-matrix-benchmarks/matrix_benchmark.html).

This work is based on Brandon's work as of as of this commit:

    e5ad8f6975eef038de668914a44ed36e2c611966
    Date:	October 10, 2010 12:49:00 PM EDT
    Upped version to 0.9.5

Comparing these matrix libraries:

* [glMatrix](http://code.google.com/p/glmatrix), [New BSD license](http://www.opensource.org/licenses/bsd-license.php)
* [mjs](http://code.google.com/p/webgl-mjs), [MIT license](http://www.opensource.org/licenses/mit-license.php)
* CanvasMatrix
* [EWGL_math](http://code.google.com/p/ewgl-matrices), [New BSD license](http://www.opensource.org/licenses/bsd-license.php)
* [tdl](http://code.google.com/p/threedlibrary/), [New BSD license](http://www.opensource.org/licenses/bsd-license.php)

Changes from Brandon's original benchmark code include:

* Only including the benchmark code from glmatrix.
* Updated to the latest mjs as of Dec 15: 16:8e5b0944ef1e and included it in several more tests.
* Added a graph display of the results using flotr, see: http://solutoire.com/flotr/
* Added tdl library (thanks to Gregg Tavares)

Brandon's original code was released under the [New BSD license](http://www.opensource.org/licenses/bsd-license.php).
My additions to the benchmarking code are released under the same license.
