/*jslint browser: true, maxerr: 50, maxlen: 79, nomen: true, sloppy: true,
  unparam: true */

/*global TestHelper, Sylvester, Vector, Matrix, Line, Plane, $V, $M, $L, $P,
  pseudoRandom */

window.onload = TestHelper.main;

var tests = (function () {
    // Matrix that 1. rotates by a random angle about a random axis and 2.
    // translates by a random vector.
    function randomMatrix() {
        var randomAxis = $V([pseudoRandom(), pseudoRandom(), pseudoRandom()]).
            toUnitVector(),
            randomAngle = pseudoRandom(),
            rotation3 = Matrix.Rotation(randomAngle, randomAxis),
            rotation = (rotation3.transpose().augment($V([0, 0, 0])).
                        transpose().augment($V([0, 0, 0, 1]))),
            translation = $M([[1, 0, 0, pseudoRandom()],
                              [0, 1, 0, pseudoRandom()],
                              [0, 0, 1, pseudoRandom()],
                              [0, 0, 0, 1]]);
        return rotation.multiply(translation);
    }

    function webglMatrix(m) {
        var rowI, colI, flattenedMatrix = [];
        for (colI = 0; colI < 4; colI += 1) {
            for (rowI = 0; rowI < 4; rowI += 1) {
                flattenedMatrix.push(m.elements[rowI][colI]);
            }
        }
        return flattenedMatrix;
    }

    // Based on Closure r1315's `makePerspective()`.
    function perspectiveMatrix(fovy, aspect, near, far) {
        var angle = fovy / 2,
            dz = far - near,
            sinAngle = Math.sin(angle),
            cot;

        if (dz === 0 || sinAngle === 0 || aspect === 0) {
            return false;
        }

        cot = Math.cos(angle) / sinAngle;
        return $M([[cot / aspect, 0, 0, 0],
                   [0, cot, 0, 0],
                   [0, 0, -(far + near) / dz, -1],
                   [0, 0, -(2 * near * far) / dz, 0]]).transpose();
    }

    return {
        'Multiplication': {
            test: function (count, maxCount, milliSeconds) {
                var m1 = randomMatrix(),
                    m2 = randomMatrix(),
                    start = Date.now(),
                    loopCount = 0,
                    i;
                while (Date.now() - start < milliSeconds &&
                           loopCount !== maxCount) {
                    loopCount += 1;
                    for (i = 0; i < count; i += 1) {
                        m1 = m1.multiply(m2);
                    }
                }
                return {
                    time: Date.now() - start,
                    loopCount: loopCount,
                    result: webglMatrix(m1)
                };
            }
        },

        'Translation': {
            test: null // Sylvester has no dedicated translation function.
        },

        'Scaling': {
            test: null // Sylvester has no dedicated scaling function.
        },

        'Rotation (Arbitrary axis)': {
            test: null // Sylvester has no dedicated rotation function.
        },

        'Rotation (X axis)': {
            test: null // Sylvester has no dedicated rotation function.
        },

        'Transpose': {
            test: function (count, maxCount, milliSeconds) {
                var m1 = randomMatrix(),
                    start = Date.now(),
                    loopCount = 0,
                    i;
                while (Date.now() - start < milliSeconds &&
                           loopCount !== maxCount) {
                    loopCount += 1;
                    for (i = 0; i < count; i += 1) {
                        m1 = m1.transpose();
                    }
                }
                return {
                    time: Date.now() - start,
                    loopCount: loopCount,
                    result: webglMatrix(m1)
                };
            }
        },

        'Inverse': {
            test: function (count, maxCount, milliSeconds) {
                var m1 = perspectiveMatrix(Math.PI / 2, 0.5, 1, 1000),
                    start = Date.now(),
                    loopCount = 0,
                    i;
                while (Date.now() - start < milliSeconds &&
                           loopCount !== maxCount) {
                    loopCount += 1;
                    for (i = 0; i < count; i += 1) {
                        m1 = m1.inverse();
                    }
                }
                return {
                    time: Date.now() - start,
                    loopCount: loopCount,
                    result: webglMatrix(m1)
                };
            }
        },

        'Inverse 3x3': {
            test: function (count, maxCount, milliSeconds) {
                var m1 = randomMatrix(),
                    start = Date.now(),
                    loopCount = 0,
                    i,
                    mg = webglMatrix(m1);
                m1 = $M([[mg[0], mg[1], mg[2]],
                         [mg[4], mg[5], mg[7]],
                         [mg[8], mg[9], mg[10]]]).transpose();
                while (Date.now() - start < milliSeconds &&
                           loopCount !== maxCount) {
                    loopCount += 1;
                    for (i = 0; i < count; i += 1) {
                        m1 = m1.inverse();
                    }
                }
                m1 = m1.transpose().augment($V([0, 0, 0])).
                    transpose().augment($V([0, 0, 0, 1]));
                return {
                    time: Date.now() - start,
                    loopCount: loopCount,
                    result: webglMatrix(m1)
                };
            }
        },

        'Vector Transformation': {
            test: null // Sylvester has no dedicated function for transforming
                       // 3 dimensional vectors with 4x4 matrices
        }
    };
}());
