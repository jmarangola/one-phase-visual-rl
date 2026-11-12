// ../../../../../tmp/one-phase-cpu-render/three/package/build/three.core.js
var REVISION = "187";
var PCFShadowMap = 1;
var VSMShadowMap = 3;
var NeverDepth = 0;
var AlwaysDepth = 1;
var LessDepth = 2;
var LessEqualDepth = 3;
var EqualDepth = 4;
var GreaterEqualDepth = 5;
var GreaterDepth = 6;
var NotEqualDepth = 7;
var MultiplyOperation = 0;
var MixOperation = 1;
var AddOperation = 2;
var LinearToneMapping = 1;
var ReinhardToneMapping = 2;
var CineonToneMapping = 3;
var ACESFilmicToneMapping = 4;
var CustomToneMapping = 5;
var AgXToneMapping = 6;
var NeutralToneMapping = 7;
var UVMapping = 300;
var CubeRefractionMapping = 302;
var RepeatWrapping = 1e3;
var ClampToEdgeWrapping = 1001;
var MirroredRepeatWrapping = 1002;
var NearestFilter = 1003;
var NearestMipmapNearestFilter = 1004;
var NearestMipmapLinearFilter = 1005;
var LinearFilter = 1006;
var LinearMipmapNearestFilter = 1007;
var LinearMipmapLinearFilter = 1008;
var UnsignedByteType = 1009;
var FloatType = 1015;
var HalfFloatType = 1016;
var RGBAFormat = 1023;
var InterpolateDiscrete = 2300;
var InterpolateLinear = 2301;
var InterpolateSmooth = 2302;
var InterpolateBezier = 2303;
var ZeroCurvatureEnding = 2400;
var ZeroSlopeEnding = 2401;
var WrapAroundEnding = 2402;
var NoColorSpace = "";
var SRGBColorSpace = "srgb";
var LinearSRGBColorSpace = "srgb-linear";
var LinearTransfer = "linear";
var SRGBTransfer = "srgb";
var WebGLCoordinateSystem = 2e3;
var WebGPUCoordinateSystem = 2001;
function isTypedArray(array2) {
  return ArrayBuffer.isView(array2) && !(array2 instanceof DataView);
}
function createElementNS(name) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", name);
}
var _cache = {};
var _setConsoleFunction = null;
function enhanceLogMessage(params) {
  const message = params[0];
  if (typeof message === "string" && message.startsWith("TSL:")) {
    const stackTrace = params[1];
    if (stackTrace && stackTrace.isStackTrace) {
      params[0] += " " + stackTrace.getLocation();
    } else {
      params[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
    }
  }
  return params;
}
function warn(...params) {
  params = enhanceLogMessage(params);
  const message = "THREE." + params.shift();
  if (_setConsoleFunction) {
    _setConsoleFunction("warn", message, ...params);
  } else {
    const stackTrace = params[0];
    if (stackTrace && stackTrace.isStackTrace) {
      console.warn(stackTrace.getError(message));
    } else {
      console.warn(message, ...params);
    }
  }
}
function error(...params) {
  params = enhanceLogMessage(params);
  const message = "THREE." + params.shift();
  if (_setConsoleFunction) {
    _setConsoleFunction("error", message, ...params);
  } else {
    const stackTrace = params[0];
    if (stackTrace && stackTrace.isStackTrace) {
      console.error(stackTrace.getError(message));
    } else {
      console.error(message, ...params);
    }
  }
}
function warnOnce(...params) {
  const message = params.join(" ");
  if (message in _cache) return;
  _cache[message] = true;
  warn(...params);
}
var ReversedDepthFuncs = {
  [NeverDepth]: NeverDepth,
  [LessDepth]: GreaterDepth,
  [EqualDepth]: EqualDepth,
  [LessEqualDepth]: GreaterEqualDepth,
  [AlwaysDepth]: AlwaysDepth,
  [GreaterDepth]: LessDepth,
  [NotEqualDepth]: NotEqualDepth,
  [GreaterEqualDepth]: LessEqualDepth
};
var EventDispatcher = class {
  /**
   * Adds the given event listener to the given event type.
   *
   * @param {string} type - The type of event to listen to.
   * @param {Function} listener - The function that gets called when the event is fired.
   */
  addEventListener(type, listener) {
    if (this._listeners === void 0) this._listeners = {};
    const listeners = this._listeners;
    if (listeners[type] === void 0) {
      listeners[type] = [];
    }
    if (listeners[type].indexOf(listener) === -1) {
      listeners[type].push(listener);
    }
  }
  /**
   * Returns `true` if the given event listener has been added to the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to check.
   * @return {boolean} Whether the given event listener has been added to the given event type.
   */
  hasEventListener(type, listener) {
    const listeners = this._listeners;
    if (listeners === void 0) return false;
    return listeners[type] !== void 0 && listeners[type].indexOf(listener) !== -1;
  }
  /**
   * Removes the given event listener from the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to remove.
   */
  removeEventListener(type, listener) {
    const listeners = this._listeners;
    if (listeners === void 0) return;
    const listenerArray = listeners[type];
    if (listenerArray !== void 0) {
      const index = listenerArray.indexOf(listener);
      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  }
  /**
   * Dispatches an event object.
   *
   * @param {Object} event - The event that gets fired.
   */
  dispatchEvent(event) {
    const listeners = this._listeners;
    if (listeners === void 0) return;
    const listenerArray = listeners[event.type];
    if (listenerArray !== void 0) {
      event.target = this;
      const array2 = listenerArray.slice(0);
      for (let i = 0, l = array2.length; i < l; i++) {
        array2[i].call(this, event);
      }
      event.target = null;
    }
  }
};
var _lut = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
var DEG2RAD = Math.PI / 180;
var RAD2DEG = 180 / Math.PI;
function generateUUID() {
  const d0 = Math.random() * 4294967295 | 0;
  const d1 = Math.random() * 4294967295 | 0;
  const d2 = Math.random() * 4294967295 | 0;
  const d3 = Math.random() * 4294967295 | 0;
  const uuid = _lut[d0 & 255] + _lut[d0 >> 8 & 255] + _lut[d0 >> 16 & 255] + _lut[d0 >> 24 & 255] + "-" + _lut[d1 & 255] + _lut[d1 >> 8 & 255] + "-" + _lut[d1 >> 16 & 15 | 64] + _lut[d1 >> 24 & 255] + "-" + _lut[d2 & 63 | 128] + _lut[d2 >> 8 & 255] + "-" + _lut[d2 >> 16 & 255] + _lut[d2 >> 24 & 255] + _lut[d3 & 255] + _lut[d3 >> 8 & 255] + _lut[d3 >> 16 & 255] + _lut[d3 >> 24 & 255];
  return uuid.toLowerCase();
}
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function euclideanModulo(n, m) {
  return (n % m + m) % m;
}
function lerp(x, y, t) {
  return (1 - t) * x + t * y;
}
var Vector2 = class {
  static {
    this.prototype.isVector2 = true;
  }
  /**
   * Constructs a new 2D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  /**
   * Alias for {@link Vector2#x}.
   *
   * @type {number}
   */
  get width() {
    return this.x;
  }
  set width(value) {
    this.x = value;
  }
  /**
   * Alias for {@link Vector2#y}.
   *
   * @type {number}
   */
  get height() {
    return this.y;
  }
  set height(value) {
    this.y = value;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @return {Vector2} A reference to this vector.
   */
  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector2} A reference to this vector.
   */
  setScalar(scalar) {
    this.x = scalar;
    this.y = scalar;
    return this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setX(x) {
    this.x = x;
    return this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setY(y) {
    this.y = y;
    return this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @param {number} value - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setComponent(index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + index);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @return {number} A vector component value.
   */
  getComponent(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + index);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector2} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector2} v - The vector to copy.
   * @return {Vector2} A reference to this vector.
   */
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector2} v - The vector to add.
   * @return {Vector2} A reference to this vector.
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector2} A reference to this vector.
   */
  addScalar(s) {
    this.x += s;
    this.y += s;
    return this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  addVectors(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector2} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector2} A reference to this vector.
   */
  addScaledVector(v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    return this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector2} v - The vector to subtract.
   * @return {Vector2} A reference to this vector.
   */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector2} A reference to this vector.
   */
  subScalar(s) {
    this.x -= s;
    this.y -= s;
    return this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  subVectors(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector2} v - The vector to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiply(v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector2} v - The vector to divide.
   * @return {Vector2} A reference to this vector.
   */
  divide(v) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector2} A reference to this vector.
   */
  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }
  /**
   * Multiplies this vector (with an implicit 1 as the 3rd component) by
   * the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {Vector2} A reference to this vector.
   */
  applyMatrix3(m) {
    const x = this.x, y = this.y;
    const e = m.elements;
    this.x = e[0] * x + e[3] * y + e[6];
    this.y = e[1] * x + e[4] * y + e[7];
    return this;
  }
  /**
   * If this vector's x or y value is greater than the given vector's x or y
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  min(v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    return this;
  }
  /**
   * If this vector's x or y value is less than the given vector's x or y
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  max(v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    return this;
  }
  /**
   * If this vector's x or y value is greater than the max vector's x or y
   * value, it is replaced by the corresponding value.
   * If this vector's x or y value is less than the min vector's x or y value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector2} min - The minimum x and y values.
   * @param {Vector2} max - The maximum x and y values in the desired range.
   * @return {Vector2} A reference to this vector.
   */
  clamp(min, max) {
    this.x = clamp(this.x, min.x, max.x);
    this.y = clamp(this.y, min.y, max.y);
    return this;
  }
  /**
   * If this vector's x or y values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x or y values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampScalar(minVal, maxVal) {
    this.x = clamp(this.x, minVal, maxVal);
    this.y = clamp(this.y, minVal, maxVal);
    return this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampLength(min, max) {
    const length2 = this.length();
    return this.divideScalar(length2 || 1).multiplyScalar(clamp(length2, min, max));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector2} A reference to this vector.
   */
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  roundToZero() {
    this.x = Math.trunc(this.x);
    this.y = Math.trunc(this.y);
    return this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x and y = -y.
   *
   * @return {Vector2} A reference to this vector.
   */
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the cross product with.
   * @return {number} The result of the cross product.
   */
  cross(v) {
    return this.x * v.y - this.y * v.x;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0) to (x, y). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0) to (x, y).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Computes the angle in radians of this vector with respect to the positive x-axis.
   *
   * @return {number} The angle in radians.
   */
  angle() {
    const angle = Math.atan2(-this.y, -this.x) + Math.PI;
    return angle;
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector2} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(v) {
    const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
    if (denominator === 0) return Math.PI / 2;
    const theta = this.dot(v) / denominator;
    return Math.acos(clamp(theta, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector2} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(v) {
    const dx = this.x - v.x, dy = this.y - v.y;
    return dx * dx + dy * dy;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector2} A reference to this vector.
   */
  setLength(length2) {
    return this.normalize().multiplyScalar(length2);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector2} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    return this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector2} v1 - The first vector.
   * @param {Vector2} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerpVectors(v1, v2, alpha) {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;
    return this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector2} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(v) {
    return v.x === this.x && v.y === this.y;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]` and y
   * value to be `array[ offset + 1 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector2} A reference to this vector.
   */
  fromArray(array2, offset = 0) {
    this.x = array2[offset];
    this.y = array2[offset + 1];
    return this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(array2 = [], offset = 0) {
    array2[offset] = this.x;
    array2[offset + 1] = this.y;
    return array2;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector2} A reference to this vector.
   */
  fromBufferAttribute(attribute, index) {
    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    return this;
  }
  /**
   * Rotates this vector around the given center by the given angle.
   *
   * @param {Vector2} center - The point around which to rotate.
   * @param {number} angle - The angle to rotate, in radians.
   * @return {Vector2} A reference to this vector.
   */
  rotateAround(center, angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    const x = this.x - center.x;
    const y = this.y - center.y;
    this.x = x * c - y * s + center.x;
    this.y = x * s + y * c + center.y;
    return this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  random() {
    this.x = Math.random();
    this.y = Math.random();
    return this;
  }
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }
};
var Quaternion = class {
  /**
   * Constructs a new quaternion.
   *
   * @param {number} [x=0] - The x value of this quaternion.
   * @param {number} [y=0] - The y value of this quaternion.
   * @param {number} [z=0] - The z value of this quaternion.
   * @param {number} [w=1] - The w value of this quaternion.
   */
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.isQuaternion = true;
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }
  /**
   * Interpolates between two quaternions via SLERP. This implementation assumes the
   * quaternion data are managed in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @see {@link Quaternion#slerp}
   */
  static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
    let x0 = src0[srcOffset0 + 0], y0 = src0[srcOffset0 + 1], z0 = src0[srcOffset0 + 2], w0 = src0[srcOffset0 + 3];
    let x1 = src1[srcOffset1 + 0], y1 = src1[srcOffset1 + 1], z1 = src1[srcOffset1 + 2], w1 = src1[srcOffset1 + 3];
    if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
      let dot3 = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1;
      if (dot3 < 0) {
        x1 = -x1;
        y1 = -y1;
        z1 = -z1;
        w1 = -w1;
        dot3 = -dot3;
      }
      let s = 1 - t;
      if (dot3 < 0.9995) {
        const theta = Math.acos(dot3);
        const sin = Math.sin(theta);
        s = Math.sin(s * theta) / sin;
        t = Math.sin(t * theta) / sin;
        x0 = x0 * s + x1 * t;
        y0 = y0 * s + y1 * t;
        z0 = z0 * s + z1 * t;
        w0 = w0 * s + w1 * t;
      } else {
        x0 = x0 * s + x1 * t;
        y0 = y0 * s + y1 * t;
        z0 = z0 * s + z1 * t;
        w0 = w0 * s + w1 * t;
        const f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
        x0 *= f;
        y0 *= f;
        z0 *= f;
        w0 *= f;
      }
    }
    dst[dstOffset] = x0;
    dst[dstOffset + 1] = y0;
    dst[dstOffset + 2] = z0;
    dst[dstOffset + 3] = w0;
  }
  /**
   * Multiplies two quaternions. This implementation assumes the quaternion data are managed
   * in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @return {Array<number>} The destination array.
   * @see {@link Quaternion#multiplyQuaternions}.
   */
  static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
    const x0 = src0[srcOffset0];
    const y0 = src0[srcOffset0 + 1];
    const z0 = src0[srcOffset0 + 2];
    const w0 = src0[srcOffset0 + 3];
    const x1 = src1[srcOffset1];
    const y1 = src1[srcOffset1 + 1];
    const z1 = src1[srcOffset1 + 2];
    const w1 = src1[srcOffset1 + 3];
    dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
    dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
    dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
    dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;
    return dst;
  }
  /**
   * The x value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
    this._onChangeCallback();
  }
  /**
   * The y value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
    this._onChangeCallback();
  }
  /**
   * The z value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(value) {
    this._z = value;
    this._onChangeCallback();
  }
  /**
   * The w value of this quaternion.
   *
   * @type {number}
   * @default 1
   */
  get w() {
    return this._w;
  }
  set w(value) {
    this._w = value;
    this._onChangeCallback();
  }
  /**
   * Sets the quaternion components.
   *
   * @param {number} x - The x value of this quaternion.
   * @param {number} y - The y value of this quaternion.
   * @param {number} z - The z value of this quaternion.
   * @param {number} w - The w value of this quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  set(x, y, z, w) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
    this._onChangeCallback();
    return this;
  }
  /**
   * Returns a new quaternion with copied values from this instance.
   *
   * @return {Quaternion} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  /**
   * Copies the values of the given quaternion to this instance.
   *
   * @param {Quaternion} quaternion - The quaternion to copy.
   * @return {Quaternion} A reference to this quaternion.
   */
  copy(quaternion) {
    this._x = quaternion.x;
    this._y = quaternion.y;
    this._z = quaternion.z;
    this._w = quaternion.w;
    this._onChangeCallback();
    return this;
  }
  /**
   * Sets this quaternion from the rotation specified by the given
   * Euler angles.
   *
   * @param {Euler} euler - The Euler angles.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromEuler(euler, update = true) {
    const x = euler._x, y = euler._y, z = euler._z, order = euler._order;
    const cos = Math.cos;
    const sin = Math.sin;
    const c1 = cos(x / 2);
    const c2 = cos(y / 2);
    const c3 = cos(z / 2);
    const s1 = sin(x / 2);
    const s2 = sin(y / 2);
    const s3 = sin(z / 2);
    switch (order) {
      case "XYZ":
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case "YXZ":
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;
      case "ZXY":
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case "ZYX":
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;
      case "YZX":
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 + s1 * c2 * s3;
        this._z = c1 * c2 * s3 - s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case "XZY":
        this._x = s1 * c2 * c3 - c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;
      default:
        warn("Quaternion: .setFromEuler() encountered an unknown order: " + order);
    }
    if (update === true) this._onChangeCallback();
    return this;
  }
  /**
   * Sets this quaternion from the given axis and angle.
   *
   * @param {Vector3} axis - The normalized axis.
   * @param {number} angle - The angle in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromAxisAngle(axis, angle) {
    const halfAngle = angle / 2, s = Math.sin(halfAngle);
    this._x = axis.x * s;
    this._y = axis.y * s;
    this._z = axis.z * s;
    this._w = Math.cos(halfAngle);
    this._onChangeCallback();
    return this;
  }
  /**
   * Sets this quaternion from the given rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromRotationMatrix(m) {
    const te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;
    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1);
      this._w = 0.25 / s;
      this._x = (m32 - m23) * s;
      this._y = (m13 - m31) * s;
      this._z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
      const s = 2 * Math.sqrt(1 + m11 - m22 - m33);
      this._w = (m32 - m23) / s;
      this._x = 0.25 * s;
      this._y = (m12 + m21) / s;
      this._z = (m13 + m31) / s;
    } else if (m22 > m33) {
      const s = 2 * Math.sqrt(1 + m22 - m11 - m33);
      this._w = (m13 - m31) / s;
      this._x = (m12 + m21) / s;
      this._y = 0.25 * s;
      this._z = (m23 + m32) / s;
    } else {
      const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
      this._w = (m21 - m12) / s;
      this._x = (m13 + m31) / s;
      this._y = (m23 + m32) / s;
      this._z = 0.25 * s;
    }
    this._onChangeCallback();
    return this;
  }
  /**
   * Sets this quaternion to the rotation required to rotate the direction vector
   * `vFrom` to the direction vector `vTo`.
   *
   * @param {Vector3} vFrom - The first (normalized) direction vector.
   * @param {Vector3} vTo - The second (normalized) direction vector.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromUnitVectors(vFrom, vTo) {
    let r = vFrom.dot(vTo) + 1;
    if (r < 1e-8) {
      r = 0;
      if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
        this._x = -vFrom.y;
        this._y = vFrom.x;
        this._z = 0;
        this._w = r;
      } else {
        this._x = 0;
        this._y = -vFrom.z;
        this._z = vFrom.y;
        this._w = r;
      }
    } else {
      this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
      this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
      this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
      this._w = r;
    }
    return this.normalize();
  }
  /**
   * Returns the angle between this quaternion and the given one in radians.
   *
   * @param {Quaternion} q - The quaternion to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(q) {
    return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));
  }
  /**
   * Rotates this quaternion by a given angular step to the given quaternion.
   * The method ensures that the final quaternion will not overshoot `q`.
   *
   * @param {Quaternion} q - The target quaternion.
   * @param {number} step - The angular step in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  rotateTowards(q, step) {
    const angle = this.angleTo(q);
    if (angle === 0) return this;
    const t = Math.min(1, step / angle);
    this.slerp(q, t);
    return this;
  }
  /**
   * Sets this quaternion to the identity quaternion; that is, to the
   * quaternion that represents "no rotation".
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  identity() {
    return this.set(0, 0, 0, 1);
  }
  /**
   * Inverts this quaternion via {@link Quaternion#conjugate}. The
   * quaternion is assumed to have unit length.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  invert() {
    return this.conjugate();
  }
  /**
   * Returns the rotational conjugate of this quaternion. The conjugate of a
   * quaternion represents the same rotation in the opposite direction about
   * the rotational axis.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  conjugate() {
    this._x *= -1;
    this._y *= -1;
    this._z *= -1;
    this._onChangeCallback();
    return this;
  }
  /**
   * Calculates the dot product of this quaternion and the given one.
   *
   * @param {Quaternion} v - The quaternion to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(v) {
    return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
  }
  /**
   * Computes the squared Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector. This can be useful if you are comparing the
   * lengths of two quaternions, as this is a slightly more efficient calculation than
   * {@link Quaternion#length}.
   *
   * @return {number} The squared Euclidean length.
   */
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  /**
   * Computes the Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector.
   *
   * @return {number} The Euclidean length.
   */
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  /**
   * Normalizes this quaternion - that is, calculated the quaternion that performs
   * the same rotation as this one, but has a length equal to `1`.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  normalize() {
    let l = this.length();
    if (l === 0) {
      this._x = 0;
      this._y = 0;
      this._z = 0;
      this._w = 1;
    } else {
      l = 1 / l;
      this._x = this._x * l;
      this._y = this._y * l;
      this._z = this._z * l;
      this._w = this._w * l;
    }
    this._onChangeCallback();
    return this;
  }
  /**
   * Multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiply(q) {
    return this.multiplyQuaternions(this, q);
  }
  /**
   * Pre-multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  premultiply(q) {
    return this.multiplyQuaternions(q, this);
  }
  /**
   * Multiplies the given quaternions and stores the result in this instance.
   *
   * @param {Quaternion} a - The first quaternion.
   * @param {Quaternion} b - The second quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiplyQuaternions(a, b) {
    const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
    const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
    this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
    this._onChangeCallback();
    return this;
  }
  /**
   * Performs a spherical linear interpolation between this quaternion and the target quaternion.
   *
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerp(qb, t) {
    let x = qb._x, y = qb._y, z = qb._z, w = qb._w;
    let dot3 = this.dot(qb);
    if (dot3 < 0) {
      x = -x;
      y = -y;
      z = -z;
      w = -w;
      dot3 = -dot3;
    }
    let s = 1 - t;
    if (dot3 < 0.9995) {
      const theta = Math.acos(dot3);
      const sin = Math.sin(theta);
      s = Math.sin(s * theta) / sin;
      t = Math.sin(t * theta) / sin;
      this._x = this._x * s + x * t;
      this._y = this._y * s + y * t;
      this._z = this._z * s + z * t;
      this._w = this._w * s + w * t;
      this._onChangeCallback();
    } else {
      this._x = this._x * s + x * t;
      this._y = this._y * s + y * t;
      this._z = this._z * s + z * t;
      this._w = this._w * s + w * t;
      this.normalize();
    }
    return this;
  }
  /**
   * Performs a spherical linear interpolation between the given quaternions
   * and stores the result in this quaternion.
   *
   * @param {Quaternion} qa - The source quaternion.
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerpQuaternions(qa, qb, t) {
    return this.copy(qa).slerp(qb, t);
  }
  /**
   * Sets this quaternion to a uniformly random, normalized quaternion.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  random() {
    const theta1 = 2 * Math.PI * Math.random();
    const theta2 = 2 * Math.PI * Math.random();
    const x0 = Math.random();
    const r1 = Math.sqrt(1 - x0);
    const r2 = Math.sqrt(x0);
    return this.set(
      r1 * Math.sin(theta1),
      r1 * Math.cos(theta1),
      r2 * Math.sin(theta2),
      r2 * Math.cos(theta2)
    );
  }
  /**
   * Returns `true` if this quaternion is equal with the given one.
   *
   * @param {Quaternion} quaternion - The quaternion to test for equality.
   * @return {boolean} Whether this quaternion is equal with the given one.
   */
  equals(quaternion) {
    return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
  }
  /**
   * Sets this quaternion's components from the given array.
   *
   * @param {Array<number>} array - An array holding the quaternion component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromArray(array2, offset = 0) {
    this._x = array2[offset];
    this._y = array2[offset + 1];
    this._z = array2[offset + 2];
    this._w = array2[offset + 3];
    this._onChangeCallback();
    return this;
  }
  /**
   * Writes the components of this quaternion to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the quaternion components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The quaternion components.
   */
  toArray(array2 = [], offset = 0) {
    array2[offset] = this._x;
    array2[offset + 1] = this._y;
    array2[offset + 2] = this._z;
    array2[offset + 3] = this._w;
    return array2;
  }
  /**
   * Sets the components of this quaternion from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.
   * @param {number} index - The index into the attribute.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromBufferAttribute(attribute, index) {
    this._x = attribute.getX(index);
    this._y = attribute.getY(index);
    this._z = attribute.getZ(index);
    this._w = attribute.getW(index);
    this._onChangeCallback();
    return this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the
   * numerical elements of this quaternion in an array of format `[x, y, z, w]`.
   *
   * @return {Array<number>} The serialized quaternion.
   */
  toJSON() {
    return this.toArray();
  }
  _onChange(callback) {
    this._onChangeCallback = callback;
    return this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x;
    yield this._y;
    yield this._z;
    yield this._w;
  }
};
var Vector3 = class {
  static {
    this.prototype.isVector3 = true;
  }
  /**
   * Constructs a new 3D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   */
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @return {Vector3} A reference to this vector.
   */
  set(x, y, z) {
    if (z === void 0) z = this.z;
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector3} A reference to this vector.
   */
  setScalar(scalar) {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    return this;
  }
  /**
   * Sets the vector's x component to the given value.
   *
   * @param {number} x - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setX(x) {
    this.x = x;
    return this;
  }
  /**
   * Sets the vector's y component to the given value.
   *
   * @param {number} y - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setY(y) {
    this.y = y;
    return this;
  }
  /**
   * Sets the vector's z component to the given value.
   *
   * @param {number} z - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setZ(z) {
    this.z = z;
    return this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @param {number} value - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setComponent(index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      case 2:
        this.z = value;
        break;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + index);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @return {number} A vector component value.
   */
  getComponent(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + index);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector3} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3} v - The vector to copy.
   * @return {Vector3} A reference to this vector.
   */
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector3} v - The vector to add.
   * @return {Vector3} A reference to this vector.
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector3} A reference to this vector.
   */
  addScalar(s) {
    this.x += s;
    this.y += s;
    this.z += s;
    return this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  addVectors(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector3|Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector3} A reference to this vector.
   */
  addScaledVector(v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    return this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector3} v - The vector to subtract.
   * @return {Vector3} A reference to this vector.
   */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector3} A reference to this vector.
   */
  subScalar(s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    return this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  subVectors(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector3} v - The vector to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiply(v) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    return this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }
  /**
   * Multiplies the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  multiplyVectors(a, b) {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;
    return this;
  }
  /**
   * Applies the given Euler rotation to this vector.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Vector3} A reference to this vector.
   */
  applyEuler(euler) {
    return this.applyQuaternion(_quaternion$5.setFromEuler(euler));
  }
  /**
   * Applies a rotation specified by an axis and an angle to this vector.
   *
   * @param {Vector3} axis - A normalized vector representing the rotation axis.
   * @param {number} angle - The angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  applyAxisAngle(axis, angle) {
    return this.applyQuaternion(_quaternion$5.setFromAxisAngle(axis, angle));
  }
  /**
   * Multiplies this vector with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix3(m) {
    const x = this.x, y = this.y, z = this.z;
    const e = m.elements;
    this.x = e[0] * x + e[3] * y + e[6] * z;
    this.y = e[1] * x + e[4] * y + e[7] * z;
    this.z = e[2] * x + e[5] * y + e[8] * z;
    return this;
  }
  /**
   * Multiplies this vector by the given normal matrix and normalizes
   * the result.
   *
   * @param {Matrix3} m - The normal matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyNormalMatrix(m) {
    return this.applyMatrix3(m).normalize();
  }
  /**
   * Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
   * divides by perspective.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix4(m) {
    const x = this.x, y = this.y, z = this.z;
    const e = m.elements;
    const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
    return this;
  }
  /**
   * Applies the given Quaternion to this vector.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Vector3} A reference to this vector.
   */
  applyQuaternion(q) {
    const vx = this.x, vy = this.y, vz = this.z;
    const qx = q.x, qy = q.y, qz = q.z, qw = q.w;
    const tx = 2 * (qy * vz - qz * vy);
    const ty = 2 * (qz * vx - qx * vz);
    const tz = 2 * (qx * vy - qy * vx);
    this.x = vx + qw * tx + qy * tz - qz * ty;
    this.y = vy + qw * ty + qz * tx - qx * tz;
    this.z = vz + qw * tz + qx * ty - qy * tx;
    return this;
  }
  /**
   * Projects this vector from world space into the camera's normalized
   * device coordinate (NDC) space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  project(camera) {
    return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
  }
  /**
   * Unprojects this vector from the camera's normalized device coordinate (NDC)
   * space into world space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  unproject(camera) {
    return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
  }
  /**
   * Transforms this vector by the upper left 3x3 sub-matrix of the given 4x4 matrix,
   * and normalizes the result.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Vector3} A reference to this vector.
   */
  transformDirection(m) {
    const x = this.x, y = this.y, z = this.z;
    const e = m.elements;
    this.x = e[0] * x + e[4] * y + e[8] * z;
    this.y = e[1] * x + e[5] * y + e[9] * z;
    this.z = e[2] * x + e[6] * y + e[10] * z;
    return this.normalize();
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector3} v - The vector to divide.
   * @return {Vector3} A reference to this vector.
   */
  divide(v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    return this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector3} A reference to this vector.
   */
  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }
  /**
   * If this vector's x, y or z value is greater than the given vector's x, y or z
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  min(v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);
    return this;
  }
  /**
   * If this vector's x, y or z value is less than the given vector's x, y or z
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  max(v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);
    return this;
  }
  /**
   * If this vector's x, y or z value is greater than the max vector's x, y or z
   * value, it is replaced by the corresponding value.
   * If this vector's x, y or z value is less than the min vector's x, y or z value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector3} min - The minimum x, y and z values.
   * @param {Vector3} max - The maximum x, y and z values in the desired range.
   * @return {Vector3} A reference to this vector.
   */
  clamp(min, max) {
    this.x = clamp(this.x, min.x, max.x);
    this.y = clamp(this.y, min.y, max.y);
    this.z = clamp(this.z, min.z, max.z);
    return this;
  }
  /**
   * If this vector's x, y or z values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y or z values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampScalar(minVal, maxVal) {
    this.x = clamp(this.x, minVal, maxVal);
    this.y = clamp(this.y, minVal, maxVal);
    this.z = clamp(this.z, minVal, maxVal);
    return this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampLength(min, max) {
    const length2 = this.length();
    return this.divideScalar(length2 || 1).multiplyScalar(clamp(length2, min, max));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    return this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector3} A reference to this vector.
   */
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    return this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  roundToZero() {
    this.x = Math.trunc(this.x);
    this.y = Math.trunc(this.y);
    this.z = Math.trunc(this.z);
    return this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
   *
   * @return {Vector3} A reference to this vector.
   */
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector3} A reference to this vector.
   */
  setLength(length2) {
    return this.normalize().multiplyScalar(length2);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector3} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    return this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector3} v1 - The first vector.
   * @param {Vector3} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerpVectors(v1, v2, alpha) {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;
    this.z = v1.z + (v2.z - v1.z) * alpha;
    return this;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the cross product with.
   * @return {Vector3} The result of the cross product.
   */
  cross(v) {
    return this.crossVectors(this, v);
  }
  /**
   * Calculates the cross product of the given vectors and stores the result
   * in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  crossVectors(a, b) {
    const ax = a.x, ay = a.y, az = a.z;
    const bx = b.x, by = b.y, bz = b.z;
    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
    return this;
  }
  /**
   * Projects this vector onto the given one.
   *
   * @param {Vector3} v - The vector to project to.
   * @return {Vector3} A reference to this vector.
   */
  projectOnVector(v) {
    const denominator = v.lengthSq();
    if (denominator === 0) return this.set(0, 0, 0);
    const scalar = v.dot(this) / denominator;
    return this.copy(v).multiplyScalar(scalar);
  }
  /**
   * Projects this vector onto a plane by subtracting this
   * vector projected onto the plane's normal from this vector.
   *
   * @param {Vector3} planeNormal - The plane normal.
   * @return {Vector3} A reference to this vector.
   */
  projectOnPlane(planeNormal) {
    _vector$c.copy(this).projectOnVector(planeNormal);
    return this.sub(_vector$c);
  }
  /**
   * Reflects this vector off a plane orthogonal to the given normal vector.
   *
   * @param {Vector3} normal - The (normalized) normal vector.
   * @return {Vector3} A reference to this vector.
   */
  reflect(normal) {
    return this.sub(_vector$c.copy(normal).multiplyScalar(2 * this.dot(normal)));
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector3} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(v) {
    const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
    if (denominator === 0) return Math.PI / 2;
    const theta = this.dot(v) / denominator;
    return Math.acos(clamp(theta, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector3} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(v) {
    const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {Spherical} s - The spherical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromSpherical(s) {
    return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} phi - The phi angle in radians.
   * @param {number} theta - The theta angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  setFromSphericalCoords(radius, phi, theta) {
    const sinPhiRadius = Math.sin(phi) * radius;
    this.x = sinPhiRadius * Math.sin(theta);
    this.y = Math.cos(phi) * radius;
    this.z = sinPhiRadius * Math.cos(theta);
    return this;
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {Cylindrical} c - The cylindrical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindrical(c) {
    return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} theta - The theta angle in radians.
   * @param {number} y - The y value.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindricalCoords(radius, theta, y) {
    this.x = radius * Math.sin(theta);
    this.y = y;
    this.z = radius * Math.cos(theta);
    return this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixPosition(m) {
    const e = m.elements;
    this.x = e[12];
    this.y = e[13];
    this.z = e[14];
    return this;
  }
  /**
   * Sets the vector components to the scale elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixScale(m) {
    const sx = this.setFromMatrixColumn(m, 0).length();
    const sy = this.setFromMatrixColumn(m, 1).length();
    const sz = this.setFromMatrixColumn(m, 2).length();
    this.x = sx;
    this.y = sy;
    this.z = sz;
    return this;
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixColumn(m, index) {
    return this.fromArray(m.elements, index * 4);
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrix3Column(m, index) {
    return this.fromArray(m.elements, index * 3);
  }
  /**
   * Sets the vector components from the given Euler angles.
   *
   * @param {Euler} e - The Euler angles to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromEuler(e) {
    this.x = e._x;
    this.y = e._y;
    this.z = e._z;
    return this;
  }
  /**
   * Sets the vector components from the RGB components of the
   * given color.
   *
   * @param {Color} c - The color to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromColor(c) {
    this.x = c.r;
    this.y = c.g;
    this.z = c.b;
    return this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector3} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`
   * and z value to be `array[ offset + 2 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector3} A reference to this vector.
   */
  fromArray(array2, offset = 0) {
    this.x = array2[offset];
    this.y = array2[offset + 1];
    this.z = array2[offset + 2];
    return this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(array2 = [], offset = 0) {
    array2[offset] = this.x;
    array2[offset + 1] = this.y;
    array2[offset + 2] = this.z;
    return array2;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector3} A reference to this vector.
   */
  fromBufferAttribute(attribute, index) {
    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    this.z = attribute.getZ(index);
    return this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  random() {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    return this;
  }
  /**
   * Sets this vector to a uniformly random point on a unit sphere.
   *
   * @return {Vector3} A reference to this vector.
   */
  randomDirection() {
    const theta = Math.random() * Math.PI * 2;
    const u = Math.random() * 2 - 1;
    const c = Math.sqrt(1 - u * u);
    this.x = c * Math.cos(theta);
    this.y = u;
    this.z = c * Math.sin(theta);
    return this;
  }
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
  }
};
var _vector$c = /* @__PURE__ */ new Vector3();
var _quaternion$5 = /* @__PURE__ */ new Quaternion();
var Matrix3 = class {
  static {
    this.prototype.isMatrix3 = true;
  }
  /**
   * Constructs a new 3x3 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   */
  constructor(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ];
    if (n11 !== void 0) {
      this.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);
    }
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @return {Matrix3} A reference to this matrix.
   */
  set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    const te = this.elements;
    te[0] = n11;
    te[1] = n21;
    te[2] = n31;
    te[3] = n12;
    te[4] = n22;
    te[5] = n32;
    te[6] = n13;
    te[7] = n23;
    te[8] = n33;
    return this;
  }
  /**
   * Sets this matrix to the 3x3 identity matrix.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  identity() {
    this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix3} m - The matrix to copy.
   * @return {Matrix3} A reference to this matrix.
   */
  copy(m) {
    const te = this.elements;
    const me = m.elements;
    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];
    return this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix3} A reference to this matrix.
   */
  extractBasis(xAxis, yAxis, zAxis) {
    xAxis.setFromMatrix3Column(this, 0);
    yAxis.setFromMatrix3Column(this, 1);
    zAxis.setFromMatrix3Column(this, 2);
    return this;
  }
  /**
   * Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  setFromMatrix4(m) {
    const me = m.elements;
    this.set(
      me[0],
      me[4],
      me[8],
      me[1],
      me[5],
      me[9],
      me[2],
      me[6],
      me[10]
    );
    return this;
  }
  /**
   * Post-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  multiply(m) {
    return this.multiplyMatrices(this, m);
  }
  /**
   * Pre-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  premultiply(m) {
    return this.multiplyMatrices(m, this);
  }
  /**
   * Multiples the given 3x3 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix3} a - The first matrix.
   * @param {Matrix3} b - The second matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyMatrices(a, b) {
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;
    const a11 = ae[0], a12 = ae[3], a13 = ae[6];
    const a21 = ae[1], a22 = ae[4], a23 = ae[7];
    const a31 = ae[2], a32 = ae[5], a33 = ae[8];
    const b11 = be[0], b12 = be[3], b13 = be[6];
    const b21 = be[1], b22 = be[4], b23 = be[7];
    const b31 = be[2], b32 = be[5], b33 = be[8];
    te[0] = a11 * b11 + a12 * b21 + a13 * b31;
    te[3] = a11 * b12 + a12 * b22 + a13 * b32;
    te[6] = a11 * b13 + a12 * b23 + a13 * b33;
    te[1] = a21 * b11 + a22 * b21 + a23 * b31;
    te[4] = a21 * b12 + a22 * b22 + a23 * b32;
    te[7] = a21 * b13 + a22 * b23 + a23 * b33;
    te[2] = a31 * b11 + a32 * b21 + a33 * b31;
    te[5] = a31 * b12 + a32 * b22 + a33 * b32;
    te[8] = a31 * b13 + a32 * b23 + a33 * b33;
    return this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyScalar(s) {
    const te = this.elements;
    te[0] *= s;
    te[3] *= s;
    te[6] *= s;
    te[1] *= s;
    te[4] *= s;
    te[7] *= s;
    te[2] *= s;
    te[5] *= s;
    te[8] *= s;
    return this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * @return {number} The determinant.
   */
  determinant() {
    const te = this.elements;
    const a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i = te[8];
    return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  invert() {
    const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n12 = te[3], n22 = te[4], n32 = te[5], n13 = te[6], n23 = te[7], n33 = te[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;
    if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const detInv = 1 / det;
    te[0] = t11 * detInv;
    te[1] = (n31 * n23 - n33 * n21) * detInv;
    te[2] = (n32 * n21 - n31 * n22) * detInv;
    te[3] = t12 * detInv;
    te[4] = (n33 * n11 - n31 * n13) * detInv;
    te[5] = (n31 * n12 - n32 * n11) * detInv;
    te[6] = t13 * detInv;
    te[7] = (n21 * n13 - n23 * n11) * detInv;
    te[8] = (n22 * n11 - n21 * n12) * detInv;
    return this;
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  transpose() {
    let tmp;
    const m = this.elements;
    tmp = m[1];
    m[1] = m[3];
    m[3] = tmp;
    tmp = m[2];
    m[2] = m[6];
    m[6] = tmp;
    tmp = m[5];
    m[5] = m[7];
    m[7] = tmp;
    return this;
  }
  /**
   * Computes the normal matrix which is the inverse transpose of the upper
   * left 3x3 portion of the given 4x4 matrix.
   *
   * @param {Matrix4} matrix4 - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  getNormalMatrix(matrix4) {
    return this.setFromMatrix4(matrix4).invert().transpose();
  }
  /**
   * Transposes this matrix into the supplied array, and returns itself unchanged.
   *
   * @param {Array<number>} r - An array to store the transposed matrix elements.
   * @return {Matrix3} A reference to this matrix.
   */
  transposeIntoArray(r) {
    const m = this.elements;
    r[0] = m[0];
    r[1] = m[3];
    r[2] = m[6];
    r[3] = m[1];
    r[4] = m[4];
    r[5] = m[7];
    r[6] = m[2];
    r[7] = m[5];
    r[8] = m[8];
    return this;
  }
  /**
   * Sets the UV transform matrix from offset, repeat, rotation, and center.
   *
   * @param {number} tx - Offset x.
   * @param {number} ty - Offset y.
   * @param {number} sx - Repeat x.
   * @param {number} sy - Repeat y.
   * @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise.
   * @param {number} cx - Center x of rotation.
   * @param {number} cy - Center y of rotation
   * @return {Matrix3} A reference to this matrix.
   */
  setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
    const c = Math.cos(rotation);
    const s = Math.sin(rotation);
    this.set(
      sx * c,
      sx * s,
      -sx * (c * cx + s * cy) + cx + tx,
      -sy * s,
      sy * c,
      -sy * (-s * cx + c * cy) + cy + ty,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Scales this matrix with the given scalar values.
   *
   * @deprecated
   * @param {number} sx - The amount to scale in the X axis.
   * @param {number} sy - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  scale(sx, sy) {
    warnOnce("Matrix3: .scale() is deprecated. Use .makeScale() instead.");
    this.premultiply(_m3.makeScale(sx, sy));
    return this;
  }
  /**
   * Rotates this matrix by the given angle.
   *
   * @deprecated
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  rotate(theta) {
    warnOnce("Matrix3: .rotate() is deprecated. Use .makeRotation() instead.");
    this.premultiply(_m3.makeRotation(-theta));
    return this;
  }
  /**
   * Translates this matrix by the given scalar values.
   *
   * @deprecated
   * @param {number} tx - The amount to translate in the X axis.
   * @param {number} ty - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  translate(tx, ty) {
    warnOnce("Matrix3: .translate() is deprecated. Use .makeTranslation() instead.");
    this.premultiply(_m3.makeTranslation(tx, ty));
    return this;
  }
  // for 2D Transforms
  /**
   * Sets this matrix as a 2D translation transform.
   *
   * @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeTranslation(x, y) {
    if (x.isVector2) {
      this.set(
        1,
        0,
        x.x,
        0,
        1,
        x.y,
        0,
        0,
        1
      );
    } else {
      this.set(
        1,
        0,
        x,
        0,
        1,
        y,
        0,
        0,
        1
      );
    }
    return this;
  }
  /**
   * Sets this matrix as a 2D rotational transformation.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  makeRotation(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    this.set(
      c,
      -s,
      0,
      s,
      c,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets this matrix as a 2D scale transform.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeScale(x, y) {
    this.set(
      x,
      0,
      0,
      0,
      y,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix3} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(matrix) {
    const te = this.elements;
    const me = matrix.elements;
    for (let i = 0; i < 9; i++) {
      if (te[i] !== me[i]) return false;
    }
    return true;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix3} A reference to this matrix.
   */
  fromArray(array2, offset = 0) {
    for (let i = 0; i < 9; i++) {
      this.elements[i] = array2[i + offset];
    }
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(array2 = [], offset = 0) {
    const te = this.elements;
    array2[offset] = te[0];
    array2[offset + 1] = te[1];
    array2[offset + 2] = te[2];
    array2[offset + 3] = te[3];
    array2[offset + 4] = te[4];
    array2[offset + 5] = te[5];
    array2[offset + 6] = te[6];
    array2[offset + 7] = te[7];
    array2[offset + 8] = te[8];
    return array2;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix3} A clone of this instance.
   */
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
};
var _m3 = /* @__PURE__ */ new Matrix3();
var LINEAR_REC709_TO_XYZ = /* @__PURE__ */ new Matrix3().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
);
var XYZ_TO_LINEAR_REC709 = /* @__PURE__ */ new Matrix3().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
function createColorManagement() {
  const ColorManagement2 = {
    enabled: true,
    workingColorSpace: LinearSRGBColorSpace,
    /**
     * Implementations of supported color spaces.
     *
     * Required:
     *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
     *	- whitePoint: reference white [ x y ]
     *	- transfer: transfer function (pre-defined)
     *	- toXYZ: Matrix3 RGB to XYZ transform
     *	- fromXYZ: Matrix3 XYZ to RGB transform
     *	- luminanceCoefficients: RGB luminance coefficients
     *
     * Optional:
     *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace, toneMappingMode: 'extended' | 'standard' }
     *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
     *
     * Reference:
     * - https://www.russellcottrell.com/photo/matrixCalculator.htm
     */
    spaces: {},
    convert: function(color, sourceColorSpace, targetColorSpace) {
      if (this.enabled === false || sourceColorSpace === targetColorSpace || !sourceColorSpace || !targetColorSpace) {
        return color;
      }
      if (this.spaces[sourceColorSpace].transfer === SRGBTransfer) {
        color.r = SRGBToLinear(color.r);
        color.g = SRGBToLinear(color.g);
        color.b = SRGBToLinear(color.b);
      }
      if (this.spaces[sourceColorSpace].primaries !== this.spaces[targetColorSpace].primaries) {
        color.applyMatrix3(this.spaces[sourceColorSpace].toXYZ);
        color.applyMatrix3(this.spaces[targetColorSpace].fromXYZ);
      }
      if (this.spaces[targetColorSpace].transfer === SRGBTransfer) {
        color.r = LinearToSRGB(color.r);
        color.g = LinearToSRGB(color.g);
        color.b = LinearToSRGB(color.b);
      }
      return color;
    },
    workingToColorSpace: function(color, targetColorSpace) {
      return this.convert(color, this.workingColorSpace, targetColorSpace);
    },
    colorSpaceToWorking: function(color, sourceColorSpace) {
      return this.convert(color, sourceColorSpace, this.workingColorSpace);
    },
    getPrimaries: function(colorSpace) {
      return this.spaces[colorSpace].primaries;
    },
    getTransfer: function(colorSpace) {
      if (colorSpace === NoColorSpace) return LinearTransfer;
      return this.spaces[colorSpace].transfer;
    },
    getToneMappingMode: function(colorSpace) {
      return this.spaces[colorSpace].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(target, colorSpace = this.workingColorSpace) {
      return target.fromArray(this.spaces[colorSpace].luminanceCoefficients);
    },
    define: function(colorSpaces) {
      Object.assign(this.spaces, colorSpaces);
    },
    // Internal APIs
    _getMatrix: function(targetMatrix, sourceColorSpace, targetColorSpace) {
      return targetMatrix.copy(this.spaces[targetColorSpace].fromXYZ).multiply(this.spaces[sourceColorSpace].toXYZ);
    },
    _getDrawingBufferColorSpace: function(colorSpace) {
      return this.spaces[colorSpace].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(colorSpace = this.workingColorSpace) {
      return this.spaces[colorSpace].workingColorSpaceConfig.unpackColorSpace;
    }
  };
  const REC709_PRIMARIES = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06];
  const REC709_LUMINANCE_COEFFICIENTS = [0.2126, 0.7152, 0.0722];
  const D65 = [0.3127, 0.329];
  ColorManagement2.define({
    [LinearSRGBColorSpace]: {
      primaries: REC709_PRIMARIES,
      whitePoint: D65,
      transfer: LinearTransfer,
      toXYZ: LINEAR_REC709_TO_XYZ,
      fromXYZ: XYZ_TO_LINEAR_REC709,
      luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
      workingColorSpaceConfig: { unpackColorSpace: SRGBColorSpace },
      outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }
    },
    [SRGBColorSpace]: {
      primaries: REC709_PRIMARIES,
      whitePoint: D65,
      transfer: SRGBTransfer,
      toXYZ: LINEAR_REC709_TO_XYZ,
      fromXYZ: XYZ_TO_LINEAR_REC709,
      luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,
      outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }
    }
  });
  return ColorManagement2;
}
var ColorManagement = /* @__PURE__ */ createColorManagement();
function SRGBToLinear(c) {
  return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
}
function LinearToSRGB(c) {
  return c < 31308e-7 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
}
var _canvas;
var ImageUtils = class {
  /**
   * Returns a data URI containing a representation of the given image.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement)} image - The image object.
   * @param {string} [type='image/png'] - Indicates the image format.
   * @return {string} The data URI.
   */
  static getDataURL(image, type = "image/png") {
    if (/^data:/i.test(image.src)) {
      return image.src;
    }
    if (typeof HTMLCanvasElement === "undefined") {
      return image.src;
    }
    let canvas;
    if (image instanceof HTMLCanvasElement) {
      canvas = image;
    } else {
      if (_canvas === void 0) _canvas = createElementNS("canvas");
      _canvas.width = image.width;
      _canvas.height = image.height;
      const context = _canvas.getContext("2d");
      if (image instanceof ImageData) {
        context.putImageData(image, 0, 0);
      } else {
        context.drawImage(image, 0, 0, image.width, image.height);
      }
      canvas = _canvas;
    }
    return canvas.toDataURL(type);
  }
  /**
   * Converts the given sRGB image data to linear color space.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement|ImageBitmap|Object)} image - The image object.
   * @return {HTMLCanvasElement|Object} The converted image.
   */
  static sRGBToLinear(image) {
    if (typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== "undefined" && image instanceof HTMLCanvasElement || typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) {
      const canvas = createElementNS("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);
      const imageData = context.getImageData(0, 0, image.width, image.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i++) {
        data[i] = SRGBToLinear(data[i] / 255) * 255;
      }
      context.putImageData(imageData, 0, 0);
      return canvas;
    } else if (image.data) {
      const data = image.data.slice(0);
      for (let i = 0; i < data.length; i++) {
        if (data instanceof Uint8Array || data instanceof Uint8ClampedArray) {
          data[i] = Math.floor(SRGBToLinear(data[i] / 255) * 255);
        } else {
          data[i] = SRGBToLinear(data[i]);
        }
      }
      return {
        data,
        width: image.width,
        height: image.height
      };
    } else {
      warn("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.");
      return image;
    }
  }
};
var _sourceId = 0;
var TextureSource = class {
  /**
   * Constructs a new texture source.
   *
   * @param {any} [data=null] - The data definition of a texture.
   */
  constructor(data = null) {
    this.isTextureSource = true;
    Object.defineProperty(this, "id", { value: _sourceId++ });
    this.uuid = generateUUID();
    this.data = data;
    this.dataReady = true;
    this.version = 0;
  }
  /**
   * Returns the dimensions of the source into the given target vector.
   *
   * @param {(Vector2|Vector3)} target - The target object the result is written into.
   * @return {(Vector2|Vector3)} The dimensions of the source.
   */
  getSize(target) {
    const data = this.data;
    if (typeof HTMLVideoElement !== "undefined" && data instanceof HTMLVideoElement) {
      target.set(data.videoWidth, data.videoHeight, 0);
    } else if (typeof VideoFrame !== "undefined" && data instanceof VideoFrame) {
      target.set(data.displayWidth, data.displayHeight, 0);
    } else if (data !== null) {
      target.set(data.width || 0, data.height || 0, data.depth || 0);
    } else {
      target.set(0, 0, 0);
    }
    return target;
  }
  /**
   * When the property is set to `true`, the engine allocates the memory
   * for the texture (if necessary) and triggers the actual texture upload
   * to the GPU next time the source is used.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(value) {
    if (value === true) this.version++;
  }
  /**
   * Serializes the source into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized source.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(meta) {
    const isRootObject = meta === void 0 || typeof meta === "string";
    if (!isRootObject && meta.images[this.uuid] !== void 0) {
      return meta.images[this.uuid];
    }
    const output = {
      uuid: this.uuid,
      url: ""
    };
    const data = this.data;
    if (data !== null) {
      let url;
      if (Array.isArray(data)) {
        url = [];
        for (let i = 0, l = data.length; i < l; i++) {
          if (data[i].isDataTexture) {
            url.push(serializeImage(data[i].image));
          } else {
            url.push(serializeImage(data[i]));
          }
        }
      } else {
        url = serializeImage(data);
      }
      output.url = url;
    }
    if (!isRootObject) {
      meta.images[this.uuid] = output;
    }
    return output;
  }
};
function serializeImage(image) {
  if (typeof HTMLImageElement !== "undefined" && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== "undefined" && image instanceof HTMLCanvasElement || typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) {
    return ImageUtils.getDataURL(image);
  } else {
    if (image.data) {
      return {
        data: Array.from(image.data),
        width: image.width,
        height: image.height,
        type: image.data.constructor.name
      };
    } else {
      warn("Texture: Unable to serialize Texture.");
      return {};
    }
  }
}
var _textureId = 0;
var _tempVec3 = /* @__PURE__ */ new Vector3();
var Texture = class _Texture extends EventDispatcher {
  /**
   * Constructs a new texture.
   *
   * @param {?Object} [image=Texture.DEFAULT_IMAGE] - The image holding the texture data.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(image = _Texture.DEFAULT_IMAGE, mapping = _Texture.DEFAULT_MAPPING, wrapS = ClampToEdgeWrapping, wrapT = ClampToEdgeWrapping, magFilter = LinearFilter, minFilter = LinearMipmapLinearFilter, format = RGBAFormat, type = UnsignedByteType, anisotropy = _Texture.DEFAULT_ANISOTROPY, colorSpace = NoColorSpace) {
    super();
    this.isTexture = true;
    Object.defineProperty(this, "id", { value: _textureId++ });
    this.uuid = generateUUID();
    this.name = "";
    this.source = new TextureSource(image);
    this.mipmaps = [];
    this.mapping = mapping;
    this.channel = 0;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.magFilter = magFilter;
    this.minFilter = minFilter;
    this.anisotropy = anisotropy;
    this.format = format;
    this.internalFormat = null;
    this.type = type;
    this.offset = new Vector2(0, 0);
    this.repeat = new Vector2(1, 1);
    this.center = new Vector2(0, 0);
    this.rotation = 0;
    this.matrixAutoUpdate = true;
    this.matrix = new Matrix3();
    this.generateMipmaps = true;
    this.mipmapsAutoUpdate = true;
    this.premultiplyAlpha = false;
    this.flipY = true;
    this.unpackAlignment = 4;
    this.colorSpace = colorSpace;
    this.userData = {};
    this.updateRanges = [];
    this.version = 0;
    this.onUpdate = null;
    this.renderTarget = null;
    this.isRenderTargetTexture = false;
    this.isArrayTexture = image && image.depth && image.depth > 1 ? true : false;
    this.pmremVersion = 0;
    this.isPMREMTexture = false;
    this.normalized = false;
  }
  /**
   * The width of the texture in pixels.
   */
  get width() {
    return this.source.getSize(_tempVec3).x;
  }
  /**
   * The height of the texture in pixels.
   */
  get height() {
    return this.source.getSize(_tempVec3).y;
  }
  /**
   * The depth of the texture in pixels.
   */
  get depth() {
    return this.source.getSize(_tempVec3).z;
  }
  /**
   * The image object holding the texture data.
   *
   * @type {?Object}
   */
  get image() {
    return this.source.data;
  }
  set image(value) {
    this.source.data = value;
  }
  /**
   * Updates the texture transformation matrix from the properties {@link Texture#offset},
   * {@link Texture#repeat}, {@link Texture#rotation}, and {@link Texture#center}.
   */
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  /**
   * Adds a range of data in the data texture to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(start, count) {
    this.updateRanges.push({ start, count });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Returns a new texture with copied values from this instance.
   *
   * @return {Texture} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given texture to this instance.
   *
   * @param {Texture} source - The texture to copy.
   * @return {Texture} A reference to this instance.
   */
  copy(source) {
    this.name = source.name;
    this.source = source.source;
    this.mipmaps = source.mipmaps.slice(0);
    this.mapping = source.mapping;
    this.channel = source.channel;
    this.wrapS = source.wrapS;
    this.wrapT = source.wrapT;
    this.magFilter = source.magFilter;
    this.minFilter = source.minFilter;
    this.anisotropy = source.anisotropy;
    this.format = source.format;
    this.internalFormat = source.internalFormat;
    this.type = source.type;
    this.normalized = source.normalized;
    this.offset.copy(source.offset);
    this.repeat.copy(source.repeat);
    this.center.copy(source.center);
    this.rotation = source.rotation;
    this.matrixAutoUpdate = source.matrixAutoUpdate;
    this.matrix.copy(source.matrix);
    this.generateMipmaps = source.generateMipmaps;
    this.mipmapsAutoUpdate = source.mipmapsAutoUpdate;
    this.premultiplyAlpha = source.premultiplyAlpha;
    this.flipY = source.flipY;
    this.unpackAlignment = source.unpackAlignment;
    this.colorSpace = source.colorSpace;
    this.renderTarget = source.renderTarget;
    this.isRenderTargetTexture = source.isRenderTargetTexture;
    this.isPMREMTexture = source.isPMREMTexture;
    this.isArrayTexture = source.isArrayTexture;
    this.userData = JSON.parse(JSON.stringify(source.userData));
    this.needsUpdate = true;
    return this;
  }
  /**
   * Sets this texture's properties based on `values`.
   * @param {Object} values - A container with texture parameters.
   */
  setValues(values) {
    for (const key in values) {
      const newValue = values[key];
      if (newValue === void 0) {
        warn(`Texture.setValues(): parameter '${key}' has value of undefined.`);
        continue;
      }
      const currentValue = this[key];
      if (currentValue === void 0) {
        warn(`Texture.setValues(): property '${key}' does not exist.`);
        continue;
      }
      if (currentValue && newValue && (currentValue.isVector2 && newValue.isVector2)) {
        currentValue.copy(newValue);
      } else if (currentValue && newValue && (currentValue.isVector3 && newValue.isVector3)) {
        currentValue.copy(newValue);
      } else if (currentValue && newValue && (currentValue.isMatrix3 && newValue.isMatrix3)) {
        currentValue.copy(newValue);
      } else {
        this[key] = newValue;
      }
    }
  }
  /**
   * Serializes the texture into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized texture.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(meta) {
    const isRootObject = meta === void 0 || typeof meta === "string";
    if (!isRootObject && meta.textures[this.uuid] !== void 0) {
      return meta.textures[this.uuid];
    }
    const output = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(meta).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      normalized: this.normalized,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      mipmapsAutoUpdate: this.mipmapsAutoUpdate,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    if (Object.keys(this.userData).length > 0) output.userData = this.userData;
    if (!isRootObject) {
      meta.textures[this.uuid] = output;
    }
    return output;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * Textures that belong to a render target are managed by the render target.
   * Calling this method on such a texture only dispatches the dispose event but
   * does not free any GPU resources. Use {@link RenderTarget#dispose} instead.
   *
   * @fires Texture#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Transforms the given uv vector with the textures uv transformation matrix.
   *
   * @param {Vector2} uv - The uv vector.
   * @return {Vector2} The transformed uv vector.
   */
  transformUv(uv) {
    if (this.mapping !== UVMapping) return uv;
    uv.applyMatrix3(this.matrix);
    if (uv.x < 0 || uv.x > 1) {
      switch (this.wrapS) {
        case RepeatWrapping:
          uv.x = uv.x - Math.floor(uv.x);
          break;
        case ClampToEdgeWrapping:
          uv.x = uv.x < 0 ? 0 : 1;
          break;
        case MirroredRepeatWrapping:
          if (Math.abs(Math.floor(uv.x) % 2) === 1) {
            uv.x = Math.ceil(uv.x) - uv.x;
          } else {
            uv.x = uv.x - Math.floor(uv.x);
          }
          break;
      }
    }
    if (uv.y < 0 || uv.y > 1) {
      switch (this.wrapT) {
        case RepeatWrapping:
          uv.y = uv.y - Math.floor(uv.y);
          break;
        case ClampToEdgeWrapping:
          uv.y = uv.y < 0 ? 0 : 1;
          break;
        case MirroredRepeatWrapping:
          if (Math.abs(Math.floor(uv.y) % 2) === 1) {
            uv.y = Math.ceil(uv.y) - uv.y;
          } else {
            uv.y = uv.y - Math.floor(uv.y);
          }
          break;
      }
    }
    if (this.flipY) {
      uv.y = 1 - uv.y;
    }
    return uv;
  }
  /**
   * Setting this property to `true` indicates the engine the texture
   * must be updated in the next render. This triggers a texture upload
   * to the GPU and ensures correct texture parameter configuration.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(value) {
    if (value === true) {
      this.version++;
      this.source.needsUpdate = true;
    }
  }
  /**
   * Setting this property to `true` indicates the engine the PMREM
   * must be regenerated.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsPMREMUpdate(value) {
    if (value === true) {
      this.pmremVersion++;
    }
  }
};
Texture.DEFAULT_IMAGE = null;
Texture.DEFAULT_MAPPING = UVMapping;
Texture.DEFAULT_ANISOTROPY = 1;
var Vector4 = class {
  static {
    this.prototype.isVector4 = true;
  }
  /**
   * Constructs a new 4D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   * @param {number} [w=1] - The w value of this vector.
   */
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  /**
   * Alias for {@link Vector4#z}.
   *
   * @type {number}
   */
  get width() {
    return this.z;
  }
  set width(value) {
    this.z = value;
  }
  /**
   * Alias for {@link Vector4#w}.
   *
   * @type {number}
   */
  get height() {
    return this.w;
  }
  set height(value) {
    this.w = value;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @param {number} w - The value of the w component.
   * @return {Vector4} A reference to this vector.
   */
  set(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector4} A reference to this vector.
   */
  setScalar(scalar) {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    this.w = scalar;
    return this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setX(x) {
    this.x = x;
    return this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setY(y) {
    this.y = y;
    return this;
  }
  /**
   * Sets the vector's z component to the given value
   *
   * @param {number} z - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setZ(z) {
    this.z = z;
    return this;
  }
  /**
   * Sets the vector's w component to the given value
   *
   * @param {number} w - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setW(w) {
    this.w = w;
    return this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @param {number} value - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setComponent(index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      case 2:
        this.z = value;
        break;
      case 3:
        this.w = value;
        break;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + index);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @return {number} A vector component value.
   */
  getComponent(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + index);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector4} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3|Vector4} v - The vector to copy.
   * @return {Vector4} A reference to this vector.
   */
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    this.w = v.w !== void 0 ? v.w : 1;
    return this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector4} v - The vector to add.
   * @return {Vector4} A reference to this vector.
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
    return this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector4} A reference to this vector.
   */
  addScalar(s) {
    this.x += s;
    this.y += s;
    this.z += s;
    this.w += s;
    return this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  addVectors(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    this.w = a.w + b.w;
    return this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector4} A reference to this vector.
   */
  addScaledVector(v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    this.w += v.w * s;
    return this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector4} v - The vector to subtract.
   * @return {Vector4} A reference to this vector.
   */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;
    return this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector4} A reference to this vector.
   */
  subScalar(s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    this.w -= s;
    return this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  subVectors(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    this.w = a.w - b.w;
    return this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector4} v - The vector to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiply(v) {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    this.w *= v.w;
    return this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    this.w *= scalar;
    return this;
  }
  /**
   * Multiplies this vector with the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  applyMatrix4(m) {
    const x = this.x, y = this.y, z = this.z, w = this.w;
    const e = m.elements;
    this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
    this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
    this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
    this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
    return this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector4} v - The vector to divide.
   * @return {Vector4} A reference to this vector.
   */
  divide(v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    this.w /= v.w;
    return this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector4} A reference to this vector.
   */
  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }
  /**
   * Sets the x, y and z components of this
   * vector to the quaternion's axis and w to the angle.
   *
   * @param {Quaternion} q - The Quaternion to set.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromQuaternion(q) {
    this.w = 2 * Math.acos(q.w);
    const s = Math.sqrt(1 - q.w * q.w);
    if (s < 1e-4) {
      this.x = 1;
      this.y = 0;
      this.z = 0;
    } else {
      this.x = q.x / s;
      this.y = q.y / s;
      this.z = q.z / s;
    }
    return this;
  }
  /**
   * Sets the x, y and z components of this
   * vector to the axis of rotation and w to the angle.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper left 3x3 matrix is a pure rotation matrix.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromRotationMatrix(m) {
    let angle, x, y, z;
    const epsilon = 0.01, epsilon2 = 0.1, te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10];
    if (Math.abs(m12 - m21) < epsilon && Math.abs(m13 - m31) < epsilon && Math.abs(m23 - m32) < epsilon) {
      if (Math.abs(m12 + m21) < epsilon2 && Math.abs(m13 + m31) < epsilon2 && Math.abs(m23 + m32) < epsilon2 && Math.abs(m11 + m22 + m33 - 3) < epsilon2) {
        this.set(1, 0, 0, 0);
        return this;
      }
      angle = Math.PI;
      const xx = (m11 + 1) / 2;
      const yy = (m22 + 1) / 2;
      const zz = (m33 + 1) / 2;
      const xy = (m12 + m21) / 4;
      const xz = (m13 + m31) / 4;
      const yz = (m23 + m32) / 4;
      if (xx > yy && xx > zz) {
        if (xx < epsilon) {
          x = 0;
          y = 0.707106781;
          z = 0.707106781;
        } else {
          x = Math.sqrt(xx);
          y = xy / x;
          z = xz / x;
        }
      } else if (yy > zz) {
        if (yy < epsilon) {
          x = 0.707106781;
          y = 0;
          z = 0.707106781;
        } else {
          y = Math.sqrt(yy);
          x = xy / y;
          z = yz / y;
        }
      } else {
        if (zz < epsilon) {
          x = 0.707106781;
          y = 0.707106781;
          z = 0;
        } else {
          z = Math.sqrt(zz);
          x = xz / z;
          y = yz / z;
        }
      }
      this.set(x, y, z, angle);
      return this;
    }
    let s = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12));
    if (Math.abs(s) < 1e-3) s = 1;
    this.x = (m32 - m23) / s;
    this.y = (m13 - m31) / s;
    this.z = (m21 - m12) / s;
    this.w = Math.acos((m11 + m22 + m33 - 1) / 2);
    return this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  setFromMatrixPosition(m) {
    const e = m.elements;
    this.x = e[12];
    this.y = e[13];
    this.z = e[14];
    this.w = e[15];
    return this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the given vector's x, y, z or w
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  min(v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);
    this.w = Math.min(this.w, v.w);
    return this;
  }
  /**
   * If this vector's x, y, z or w value is less than the given vector's x, y, z or w
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  max(v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);
    this.w = Math.max(this.w, v.w);
    return this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the max vector's x, y, z or w
   * value, it is replaced by the corresponding value.
   * If this vector's x, y, z or w value is less than the min vector's x, y, z or w value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector4} min - The minimum x, y and z values.
   * @param {Vector4} max - The maximum x, y and z values in the desired range.
   * @return {Vector4} A reference to this vector.
   */
  clamp(min, max) {
    this.x = clamp(this.x, min.x, max.x);
    this.y = clamp(this.y, min.y, max.y);
    this.z = clamp(this.z, min.z, max.z);
    this.w = clamp(this.w, min.w, max.w);
    return this;
  }
  /**
   * If this vector's x, y, z or w values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y, z or w values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampScalar(minVal, maxVal) {
    this.x = clamp(this.x, minVal, maxVal);
    this.y = clamp(this.y, minVal, maxVal);
    this.z = clamp(this.z, minVal, maxVal);
    this.w = clamp(this.w, minVal, maxVal);
    return this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampLength(min, max) {
    const length2 = this.length();
    return this.divideScalar(length2 || 1).multiplyScalar(clamp(length2, min, max));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    this.w = Math.floor(this.w);
    return this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    this.w = Math.ceil(this.w);
    return this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector4} A reference to this vector.
   */
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    this.w = Math.round(this.w);
    return this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  roundToZero() {
    this.x = Math.trunc(this.x);
    this.y = Math.trunc(this.y);
    this.z = Math.trunc(this.z);
    this.w = Math.trunc(this.w);
    return this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w.
   *
   * @return {Vector4} A reference to this vector.
   */
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector4} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector4} A reference to this vector.
   */
  setLength(length2) {
    return this.normalize().multiplyScalar(length2);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector4} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    this.w += (v.w - this.w) * alpha;
    return this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector4} v1 - The first vector.
   * @param {Vector4} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerpVectors(v1, v2, alpha) {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;
    this.z = v1.z + (v2.z - v1.z) * alpha;
    this.w = v1.w + (v2.w - v1.w) * alpha;
    return this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector4} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`,
   * z value to be `array[ offset + 2 ]`, w value to be `array[ offset + 3 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector4} A reference to this vector.
   */
  fromArray(array2, offset = 0) {
    this.x = array2[offset];
    this.y = array2[offset + 1];
    this.z = array2[offset + 2];
    this.w = array2[offset + 3];
    return this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(array2 = [], offset = 0) {
    array2[offset] = this.x;
    array2[offset + 1] = this.y;
    array2[offset + 2] = this.z;
    array2[offset + 3] = this.w;
    return array2;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector4} A reference to this vector.
   */
  fromBufferAttribute(attribute, index) {
    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    this.z = attribute.getZ(index);
    this.w = attribute.getW(index);
    return this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  random() {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    this.w = Math.random();
    return this;
  }
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
    yield this.w;
  }
};
var Matrix4 = class _Matrix4 {
  static {
    this.prototype.isMatrix4 = true;
  }
  /**
   * Constructs a new 4x4 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   */
  constructor(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ];
    if (n11 !== void 0) {
      this.set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
    }
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   * @return {Matrix4} A reference to this matrix.
   */
  set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    const te = this.elements;
    te[0] = n11;
    te[4] = n12;
    te[8] = n13;
    te[12] = n14;
    te[1] = n21;
    te[5] = n22;
    te[9] = n23;
    te[13] = n24;
    te[2] = n31;
    te[6] = n32;
    te[10] = n33;
    te[14] = n34;
    te[3] = n41;
    te[7] = n42;
    te[11] = n43;
    te[15] = n44;
    return this;
  }
  /**
   * Sets this matrix to the 4x4 identity matrix.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  identity() {
    this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix4} A clone of this instance.
   */
  clone() {
    return new _Matrix4().fromArray(this.elements);
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix4} m - The matrix to copy.
   * @return {Matrix4} A reference to this matrix.
   */
  copy(m) {
    const te = this.elements;
    const me = m.elements;
    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];
    te[9] = me[9];
    te[10] = me[10];
    te[11] = me[11];
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    te[15] = me[15];
    return this;
  }
  /**
   * Copies the translation component of the given matrix
   * into this matrix's translation component.
   *
   * @param {Matrix4} m - The matrix to copy the translation component.
   * @return {Matrix4} A reference to this matrix.
   */
  copyPosition(m) {
    const te = this.elements, me = m.elements;
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    return this;
  }
  /**
   * Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  setFromMatrix3(m) {
    const me = m.elements;
    this.set(
      me[0],
      me[3],
      me[6],
      0,
      me[1],
      me[4],
      me[7],
      0,
      me[2],
      me[5],
      me[8],
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Extracts the basis vectors of this matrix into the three vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  extractBasis(xAxis, yAxis, zAxis) {
    if (this.determinantAffine() === 0) {
      xAxis.set(1, 0, 0);
      yAxis.set(0, 1, 0);
      zAxis.set(0, 0, 1);
      return this;
    }
    xAxis.setFromMatrixColumn(this, 0);
    yAxis.setFromMatrixColumn(this, 1);
    zAxis.setFromMatrixColumn(this, 2);
    return this;
  }
  /**
   * Sets the given basis vectors to this matrix.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeBasis(xAxis, yAxis, zAxis) {
    this.set(
      xAxis.x,
      yAxis.x,
      zAxis.x,
      0,
      xAxis.y,
      yAxis.y,
      zAxis.y,
      0,
      xAxis.z,
      yAxis.z,
      zAxis.z,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Extracts the rotation component of the given matrix
   * into this matrix's rotation component.
   *
   * Note: This method does not support reflection matrices.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  extractRotation(m) {
    if (m.determinantAffine() === 0) {
      return this.identity();
    }
    const te = this.elements;
    const me = m.elements;
    const scaleX = 1 / _v1$7.setFromMatrixColumn(m, 0).length();
    const scaleY = 1 / _v1$7.setFromMatrixColumn(m, 1).length();
    const scaleZ = 1 / _v1$7.setFromMatrixColumn(m, 2).length();
    te[0] = me[0] * scaleX;
    te[1] = me[1] * scaleX;
    te[2] = me[2] * scaleX;
    te[3] = 0;
    te[4] = me[4] * scaleY;
    te[5] = me[5] * scaleY;
    te[6] = me[6] * scaleY;
    te[7] = 0;
    te[8] = me[8] * scaleZ;
    te[9] = me[9] * scaleZ;
    te[10] = me[10] * scaleZ;
    te[11] = 0;
    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;
    return this;
  }
  /**
   * Sets the rotation component (the upper left 3x3 matrix) of this matrix to
   * the rotation specified by the given Euler angles. The rest of
   * the matrix is set to the identity. Depending on the {@link Euler#order},
   * there are six possible outcomes. See [this page](https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix)
   * for a complete list.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromEuler(euler) {
    const te = this.elements;
    const x = euler.x, y = euler.y, z = euler.z;
    const a = Math.cos(x), b = Math.sin(x);
    const c = Math.cos(y), d = Math.sin(y);
    const e = Math.cos(z), f = Math.sin(z);
    if (euler.order === "XYZ") {
      const ae = a * e, af = a * f, be = b * e, bf = b * f;
      te[0] = c * e;
      te[4] = -c * f;
      te[8] = d;
      te[1] = af + be * d;
      te[5] = ae - bf * d;
      te[9] = -b * c;
      te[2] = bf - ae * d;
      te[6] = be + af * d;
      te[10] = a * c;
    } else if (euler.order === "YXZ") {
      const ce = c * e, cf = c * f, de = d * e, df = d * f;
      te[0] = ce + df * b;
      te[4] = de * b - cf;
      te[8] = a * d;
      te[1] = a * f;
      te[5] = a * e;
      te[9] = -b;
      te[2] = cf * b - de;
      te[6] = df + ce * b;
      te[10] = a * c;
    } else if (euler.order === "ZXY") {
      const ce = c * e, cf = c * f, de = d * e, df = d * f;
      te[0] = ce - df * b;
      te[4] = -a * f;
      te[8] = de + cf * b;
      te[1] = cf + de * b;
      te[5] = a * e;
      te[9] = df - ce * b;
      te[2] = -a * d;
      te[6] = b;
      te[10] = a * c;
    } else if (euler.order === "ZYX") {
      const ae = a * e, af = a * f, be = b * e, bf = b * f;
      te[0] = c * e;
      te[4] = be * d - af;
      te[8] = ae * d + bf;
      te[1] = c * f;
      te[5] = bf * d + ae;
      te[9] = af * d - be;
      te[2] = -d;
      te[6] = b * c;
      te[10] = a * c;
    } else if (euler.order === "YZX") {
      const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
      te[0] = c * e;
      te[4] = bd - ac * f;
      te[8] = bc * f + ad;
      te[1] = f;
      te[5] = a * e;
      te[9] = -b * e;
      te[2] = -d * e;
      te[6] = ad * f + bc;
      te[10] = ac - bd * f;
    } else if (euler.order === "XZY") {
      const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
      te[0] = c * e;
      te[4] = -f;
      te[8] = d * e;
      te[1] = ac * f + bd;
      te[5] = a * e;
      te[9] = ad * f - bc;
      te[2] = bc * f - ad;
      te[6] = b * e;
      te[10] = bd * f + ac;
    }
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;
    return this;
  }
  /**
   * Sets the rotation component of this matrix to the rotation specified by
   * the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion)
   * The rest of the matrix is set to the identity.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromQuaternion(q) {
    return this.compose(_zero, q, _one);
  }
  /**
   * Sets the rotation component of the transformation matrix, looking from `eye` towards
   * `target`, and oriented by the up-direction.
   *
   * @param {Vector3} eye - The eye vector.
   * @param {Vector3} target - The target vector.
   * @param {Vector3} up - The up vector.
   * @return {Matrix4} A reference to this matrix.
   */
  lookAt(eye, target, up) {
    const te = this.elements;
    _z.subVectors(eye, target);
    if (_z.lengthSq() === 0) {
      _z.z = 1;
    }
    _z.normalize();
    _x.crossVectors(up, _z);
    if (_x.lengthSq() === 0) {
      if (Math.abs(up.z) === 1) {
        _z.x += 1e-4;
      } else {
        _z.z += 1e-4;
      }
      _z.normalize();
      _x.crossVectors(up, _z);
    }
    _x.normalize();
    _y.crossVectors(_z, _x);
    te[0] = _x.x;
    te[4] = _y.x;
    te[8] = _z.x;
    te[1] = _x.y;
    te[5] = _y.y;
    te[9] = _z.y;
    te[2] = _x.z;
    te[6] = _y.z;
    te[10] = _z.z;
    return this;
  }
  /**
   * Post-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  multiply(m) {
    return this.multiplyMatrices(this, m);
  }
  /**
   * Pre-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  premultiply(m) {
    return this.multiplyMatrices(m, this);
  }
  /**
   * Multiples the given 4x4 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix4} a - The first matrix.
   * @param {Matrix4} b - The second matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyMatrices(a, b) {
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;
    const a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
    const a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
    const a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
    const a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];
    const b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
    const b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
    const b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
    const b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];
    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
    return this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyScalar(s) {
    const te = this.elements;
    te[0] *= s;
    te[4] *= s;
    te[8] *= s;
    te[12] *= s;
    te[1] *= s;
    te[5] *= s;
    te[9] *= s;
    te[13] *= s;
    te[2] *= s;
    te[6] *= s;
    te[10] *= s;
    te[14] *= s;
    te[3] *= s;
    te[7] *= s;
    te[11] *= s;
    te[15] *= s;
    return this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * @return {number} The determinant.
   */
  determinant() {
    const te = this.elements;
    const n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
    const n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
    const n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
    const n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
    const t11 = n23 * n34 - n24 * n33;
    const t12 = n22 * n34 - n24 * n32;
    const t13 = n22 * n33 - n23 * n32;
    const t21 = n21 * n34 - n24 * n31;
    const t22 = n21 * n33 - n23 * n31;
    const t23 = n21 * n32 - n22 * n31;
    return n11 * (n42 * t11 - n43 * t12 + n44 * t13) - n12 * (n41 * t11 - n43 * t21 + n44 * t22) + n13 * (n41 * t12 - n42 * t21 + n44 * t23) - n14 * (n41 * t13 - n42 * t22 + n43 * t23);
  }
  /**
   * Computes and returns the determinant of the 4x4 matrix, but assumes the
   * matrix is affine, saving some computations.
   *
   * For affine matrices (like an object's world matrix), this value equals the
   * full 4x4 {@link Matrix4#determinant} but is cheaper to compute.
   *
   * Assumes the bottom row is [0, 0, 0, 1].
   *
   * @return {number} The determinant of the matrix.
   */
  determinantAffine() {
    const te = this.elements;
    const n11 = te[0], n12 = te[4], n13 = te[8];
    const n21 = te[1], n22 = te[5], n23 = te[9];
    const n31 = te[2], n32 = te[6], n33 = te[10];
    return n11 * (n22 * n33 - n23 * n32) - n12 * (n21 * n33 - n23 * n31) + n13 * (n21 * n32 - n22 * n31);
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  transpose() {
    const te = this.elements;
    let tmp;
    tmp = te[1];
    te[1] = te[4];
    te[4] = tmp;
    tmp = te[2];
    te[2] = te[8];
    te[8] = tmp;
    tmp = te[6];
    te[6] = te[9];
    te[9] = tmp;
    tmp = te[3];
    te[3] = te[12];
    te[12] = tmp;
    tmp = te[7];
    te[7] = te[13];
    te[13] = tmp;
    tmp = te[11];
    te[11] = te[14];
    te[14] = tmp;
    return this;
  }
  /**
   * Sets the position component for this matrix from the given vector,
   * without affecting the rest of the matrix.
   *
   * @param {number|Vector3} x - The x component of the vector or alternatively the vector object.
   * @param {number} y - The y component of the vector.
   * @param {number} z - The z component of the vector.
   * @return {Matrix4} A reference to this matrix.
   */
  setPosition(x, y, z) {
    const te = this.elements;
    if (x.isVector3) {
      te[12] = x.x;
      te[13] = x.y;
      te[14] = x.z;
    } else {
      te[12] = x;
      te[13] = y;
      te[14] = z;
    }
    return this;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  invert() {
    const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3], n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7], n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11], n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15], t1 = n11 * n22 - n21 * n12, t2 = n11 * n32 - n31 * n12, t3 = n11 * n42 - n41 * n12, t4 = n21 * n32 - n31 * n22, t5 = n21 * n42 - n41 * n22, t6 = n31 * n42 - n41 * n32, t7 = n13 * n24 - n23 * n14, t8 = n13 * n34 - n33 * n14, t9 = n13 * n44 - n43 * n14, t10 = n23 * n34 - n33 * n24, t11 = n23 * n44 - n43 * n24, t12 = n33 * n44 - n43 * n34;
    const det = t1 * t12 - t2 * t11 + t3 * t10 + t4 * t9 - t5 * t8 + t6 * t7;
    if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const detInv = 1 / det;
    te[0] = (n22 * t12 - n32 * t11 + n42 * t10) * detInv;
    te[1] = (n31 * t11 - n21 * t12 - n41 * t10) * detInv;
    te[2] = (n24 * t6 - n34 * t5 + n44 * t4) * detInv;
    te[3] = (n33 * t5 - n23 * t6 - n43 * t4) * detInv;
    te[4] = (n32 * t9 - n12 * t12 - n42 * t8) * detInv;
    te[5] = (n11 * t12 - n31 * t9 + n41 * t8) * detInv;
    te[6] = (n34 * t3 - n14 * t6 - n44 * t2) * detInv;
    te[7] = (n13 * t6 - n33 * t3 + n43 * t2) * detInv;
    te[8] = (n12 * t11 - n22 * t9 + n42 * t7) * detInv;
    te[9] = (n21 * t9 - n11 * t11 - n41 * t7) * detInv;
    te[10] = (n14 * t5 - n24 * t3 + n44 * t1) * detInv;
    te[11] = (n23 * t3 - n13 * t5 - n43 * t1) * detInv;
    te[12] = (n22 * t8 - n12 * t10 - n32 * t7) * detInv;
    te[13] = (n11 * t10 - n21 * t8 + n31 * t7) * detInv;
    te[14] = (n24 * t2 - n14 * t4 - n34 * t1) * detInv;
    te[15] = (n13 * t4 - n23 * t2 + n33 * t1) * detInv;
    return this;
  }
  /**
   * Scales each of the first three columns of this matrix by the corresponding component of the given vector.
   *
   * @param {Vector3} v - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  scale(v) {
    const te = this.elements;
    const x = v.x, y = v.y, z = v.z;
    te[0] *= x;
    te[4] *= y;
    te[8] *= z;
    te[1] *= x;
    te[5] *= y;
    te[9] *= z;
    te[2] *= x;
    te[6] *= y;
    te[10] *= z;
    te[3] *= x;
    te[7] *= y;
    te[11] *= z;
    return this;
  }
  /**
   * Gets the maximum scale value of the three axes.
   *
   * @return {number} The maximum scale.
   */
  getMaxScaleOnAxis() {
    const te = this.elements;
    const scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
    const scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
    const scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
    return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
  }
  /**
   * Sets this matrix as a translation transform from the given vector.
   *
   * @param {number|Vector3} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @param {number} z - The amount to translate in the z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeTranslation(x, y, z) {
    if (x.isVector3) {
      this.set(
        1,
        0,
        0,
        x.x,
        0,
        1,
        0,
        x.y,
        0,
        0,
        1,
        x.z,
        0,
        0,
        0,
        1
      );
    } else {
      this.set(
        1,
        0,
        0,
        x,
        0,
        1,
        0,
        y,
        0,
        0,
        1,
        z,
        0,
        0,
        0,
        1
      );
    }
    return this;
  }
  /**
   * Sets this matrix as a rotational transformation around the X axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationX(theta) {
    const c = Math.cos(theta), s = Math.sin(theta);
    this.set(
      1,
      0,
      0,
      0,
      0,
      c,
      -s,
      0,
      0,
      s,
      c,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Y axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationY(theta) {
    const c = Math.cos(theta), s = Math.sin(theta);
    this.set(
      c,
      0,
      s,
      0,
      0,
      1,
      0,
      0,
      -s,
      0,
      c,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Z axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationZ(theta) {
    const c = Math.cos(theta), s = Math.sin(theta);
    this.set(
      c,
      -s,
      0,
      0,
      s,
      c,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets this matrix as a rotational transformation around the given axis by
   * the given angle.
   *
   * @param {Vector3} axis - The normalized rotation axis.
   * @param {number} angle - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationAxis(axis, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const t = 1 - c;
    const x = axis.x, y = axis.y, z = axis.z;
    const tx = t * x, ty = t * y;
    this.set(
      tx * x + c,
      tx * y - s * z,
      tx * z + s * y,
      0,
      tx * y + s * z,
      ty * y + c,
      ty * z - s * x,
      0,
      tx * z - s * y,
      ty * z + s * x,
      t * z * z + c,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets this matrix as a scale transformation.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @param {number} z - The amount to scale in the Z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeScale(x, y, z) {
    this.set(
      x,
      0,
      0,
      0,
      0,
      y,
      0,
      0,
      0,
      0,
      z,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets this matrix as a shear transformation.
   *
   * @param {number} xy - The amount to shear X by Y.
   * @param {number} xz - The amount to shear X by Z.
   * @param {number} yx - The amount to shear Y by X.
   * @param {number} yz - The amount to shear Y by Z.
   * @param {number} zx - The amount to shear Z by X.
   * @param {number} zy - The amount to shear Z by Y.
   * @return {Matrix4} A reference to this matrix.
   */
  makeShear(xy, xz, yx, yz, zx, zy) {
    this.set(
      1,
      yx,
      zx,
      0,
      xy,
      1,
      zy,
      0,
      xz,
      yz,
      1,
      0,
      0,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets this matrix to the transformation composed of the given position,
   * rotation (Quaternion) and scale.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  compose(position, quaternion, scale2) {
    const te = this.elements;
    const x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
    const x2 = x + x, y2 = y + y, z2 = z + z;
    const xx = x * x2, xy = x * y2, xz = x * z2;
    const yy = y * y2, yz = y * z2, zz = z * z2;
    const wx = w * x2, wy = w * y2, wz = w * z2;
    const sx = scale2.x, sy = scale2.y, sz = scale2.z;
    te[0] = (1 - (yy + zz)) * sx;
    te[1] = (xy + wz) * sx;
    te[2] = (xz - wy) * sx;
    te[3] = 0;
    te[4] = (xy - wz) * sy;
    te[5] = (1 - (xx + zz)) * sy;
    te[6] = (yz + wx) * sy;
    te[7] = 0;
    te[8] = (xz + wy) * sz;
    te[9] = (yz - wx) * sz;
    te[10] = (1 - (xx + yy)) * sz;
    te[11] = 0;
    te[12] = position.x;
    te[13] = position.y;
    te[14] = position.z;
    te[15] = 1;
    return this;
  }
  /**
   * Decomposes this matrix into its position, rotation and scale components
   * and provides the result in the given objects.
   *
   * Note: Not all matrices are decomposable in this way. For example, if an
   * object has a non-uniformly scaled parent, then the object's world matrix
   * may not be decomposable, and this method may not be appropriate.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  decompose(position, quaternion, scale2) {
    const te = this.elements;
    position.x = te[12];
    position.y = te[13];
    position.z = te[14];
    const det = this.determinantAffine();
    if (det === 0) {
      scale2.set(1, 1, 1);
      quaternion.identity();
      return this;
    }
    let sx = _v1$7.set(te[0], te[1], te[2]).length();
    const sy = _v1$7.set(te[4], te[5], te[6]).length();
    const sz = _v1$7.set(te[8], te[9], te[10]).length();
    if (det < 0) sx = -sx;
    _m1$2.copy(this);
    const invSX = 1 / sx;
    const invSY = 1 / sy;
    const invSZ = 1 / sz;
    _m1$2.elements[0] *= invSX;
    _m1$2.elements[1] *= invSX;
    _m1$2.elements[2] *= invSX;
    _m1$2.elements[4] *= invSY;
    _m1$2.elements[5] *= invSY;
    _m1$2.elements[6] *= invSY;
    _m1$2.elements[8] *= invSZ;
    _m1$2.elements[9] *= invSZ;
    _m1$2.elements[10] *= invSZ;
    quaternion.setFromRotationMatrix(_m1$2);
    scale2.x = sx;
    scale2.y = sy;
    scale2.z = sz;
    return this;
  }
  /**
  	 * Creates a perspective projection matrix. This is used internally by
  	 * {@link PerspectiveCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makePerspective(left, right, top, bottom, near, far, coordinateSystem = WebGLCoordinateSystem, reversedDepth = false) {
    const te = this.elements;
    const x = 2 * near / (right - left);
    const y = 2 * near / (top - bottom);
    const a = (right + left) / (right - left);
    const b = (top + bottom) / (top - bottom);
    let c, d;
    if (reversedDepth) {
      c = near / (far - near);
      d = far * near / (far - near);
    } else {
      if (coordinateSystem === WebGLCoordinateSystem) {
        c = -(far + near) / (far - near);
        d = -2 * far * near / (far - near);
      } else if (coordinateSystem === WebGPUCoordinateSystem) {
        c = -far / (far - near);
        d = -far * near / (far - near);
      } else {
        throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + coordinateSystem);
      }
    }
    te[0] = x;
    te[4] = 0;
    te[8] = a;
    te[12] = 0;
    te[1] = 0;
    te[5] = y;
    te[9] = b;
    te[13] = 0;
    te[2] = 0;
    te[6] = 0;
    te[10] = c;
    te[14] = d;
    te[3] = 0;
    te[7] = 0;
    te[11] = -1;
    te[15] = 0;
    return this;
  }
  /**
  	 * Creates a orthographic projection matrix. This is used internally by
  	 * {@link OrthographicCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makeOrthographic(left, right, top, bottom, near, far, coordinateSystem = WebGLCoordinateSystem, reversedDepth = false) {
    const te = this.elements;
    const x = 2 / (right - left);
    const y = 2 / (top - bottom);
    const a = -(right + left) / (right - left);
    const b = -(top + bottom) / (top - bottom);
    let c, d;
    if (reversedDepth) {
      c = 1 / (far - near);
      d = far / (far - near);
    } else {
      if (coordinateSystem === WebGLCoordinateSystem) {
        c = -2 / (far - near);
        d = -(far + near) / (far - near);
      } else if (coordinateSystem === WebGPUCoordinateSystem) {
        c = -1 / (far - near);
        d = -near / (far - near);
      } else {
        throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + coordinateSystem);
      }
    }
    te[0] = x;
    te[4] = 0;
    te[8] = 0;
    te[12] = a;
    te[1] = 0;
    te[5] = y;
    te[9] = 0;
    te[13] = b;
    te[2] = 0;
    te[6] = 0;
    te[10] = c;
    te[14] = d;
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[15] = 1;
    return this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix4} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(matrix) {
    const te = this.elements;
    const me = matrix.elements;
    for (let i = 0; i < 16; i++) {
      if (te[i] !== me[i]) return false;
    }
    return true;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix4} A reference to this matrix.
   */
  fromArray(array2, offset = 0) {
    for (let i = 0; i < 16; i++) {
      this.elements[i] = array2[i + offset];
    }
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(array2 = [], offset = 0) {
    const te = this.elements;
    array2[offset] = te[0];
    array2[offset + 1] = te[1];
    array2[offset + 2] = te[2];
    array2[offset + 3] = te[3];
    array2[offset + 4] = te[4];
    array2[offset + 5] = te[5];
    array2[offset + 6] = te[6];
    array2[offset + 7] = te[7];
    array2[offset + 8] = te[8];
    array2[offset + 9] = te[9];
    array2[offset + 10] = te[10];
    array2[offset + 11] = te[11];
    array2[offset + 12] = te[12];
    array2[offset + 13] = te[13];
    array2[offset + 14] = te[14];
    array2[offset + 15] = te[15];
    return array2;
  }
};
var _v1$7 = /* @__PURE__ */ new Vector3();
var _m1$2 = /* @__PURE__ */ new Matrix4();
var _zero = /* @__PURE__ */ new Vector3(0, 0, 0);
var _one = /* @__PURE__ */ new Vector3(1, 1, 1);
var _x = /* @__PURE__ */ new Vector3();
var _y = /* @__PURE__ */ new Vector3();
var _z = /* @__PURE__ */ new Vector3();
var _matrix$2 = /* @__PURE__ */ new Matrix4();
var _quaternion$4 = /* @__PURE__ */ new Quaternion();
var Euler = class _Euler {
  /**
   * Constructs a new euler instance.
   *
   * @param {number} [x=0] - The angle of the x axis in radians.
   * @param {number} [y=0] - The angle of the y axis in radians.
   * @param {number} [z=0] - The angle of the z axis in radians.
   * @param {string} [order=Euler.DEFAULT_ORDER] - A string representing the order that the rotations are applied.
   */
  constructor(x = 0, y = 0, z = 0, order = _Euler.DEFAULT_ORDER) {
    this.isEuler = true;
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order;
  }
  /**
   * The angle of the x axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
    this._onChangeCallback();
  }
  /**
   * The angle of the y axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
    this._onChangeCallback();
  }
  /**
   * The angle of the z axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(value) {
    this._z = value;
    this._onChangeCallback();
  }
  /**
   * A string representing the order that the rotations are applied.
   *
   * @type {string}
   * @default 'XYZ'
   */
  get order() {
    return this._order;
  }
  set order(value) {
    this._order = value;
    this._onChangeCallback();
  }
  /**
   * Sets the Euler components.
   *
   * @param {number} x - The angle of the x axis in radians.
   * @param {number} y - The angle of the y axis in radians.
   * @param {number} z - The angle of the z axis in radians.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  set(x, y, z, order = this._order) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order;
    this._onChangeCallback();
    return this;
  }
  /**
   * Returns a new Euler instance with copied values from this instance.
   *
   * @return {Euler} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  /**
   * Copies the values of the given Euler instance to this instance.
   *
   * @param {Euler} euler - The Euler instance to copy.
   * @return {Euler} A reference to this Euler instance.
   */
  copy(euler) {
    this._x = euler._x;
    this._y = euler._y;
    this._z = euler._z;
    this._order = euler._order;
    this._onChangeCallback();
    return this;
  }
  /**
   * Sets the angles of this Euler instance from a pure rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromRotationMatrix(m, order = this._order, update = true) {
    const te = m.elements;
    const m11 = te[0], m12 = te[4], m13 = te[8];
    const m21 = te[1], m22 = te[5], m23 = te[9];
    const m31 = te[2], m32 = te[6], m33 = te[10];
    switch (order) {
      case "XYZ":
        this._y = Math.asin(clamp(m13, -1, 1));
        if (Math.abs(m13) < 0.9999999) {
          this._x = Math.atan2(-m23, m33);
          this._z = Math.atan2(-m12, m11);
        } else {
          this._x = Math.atan2(m32, m22);
          this._z = 0;
        }
        break;
      case "YXZ":
        this._x = Math.asin(-clamp(m23, -1, 1));
        if (Math.abs(m23) < 0.9999999) {
          this._y = Math.atan2(m13, m33);
          this._z = Math.atan2(m21, m22);
        } else {
          this._y = Math.atan2(-m31, m11);
          this._z = 0;
        }
        break;
      case "ZXY":
        this._x = Math.asin(clamp(m32, -1, 1));
        if (Math.abs(m32) < 0.9999999) {
          this._y = Math.atan2(-m31, m33);
          this._z = Math.atan2(-m12, m22);
        } else {
          this._y = 0;
          this._z = Math.atan2(m21, m11);
        }
        break;
      case "ZYX":
        this._y = Math.asin(-clamp(m31, -1, 1));
        if (Math.abs(m31) < 0.9999999) {
          this._x = Math.atan2(m32, m33);
          this._z = Math.atan2(m21, m11);
        } else {
          this._x = 0;
          this._z = Math.atan2(-m12, m22);
        }
        break;
      case "YZX":
        this._z = Math.asin(clamp(m21, -1, 1));
        if (Math.abs(m21) < 0.9999999) {
          this._x = Math.atan2(-m23, m22);
          this._y = Math.atan2(-m31, m11);
        } else {
          this._x = 0;
          this._y = Math.atan2(m13, m33);
        }
        break;
      case "XZY":
        this._z = Math.asin(-clamp(m12, -1, 1));
        if (Math.abs(m12) < 0.9999999) {
          this._x = Math.atan2(m32, m22);
          this._y = Math.atan2(m13, m11);
        } else {
          this._x = Math.atan2(-m23, m33);
          this._y = 0;
        }
        break;
      default:
        warn("Euler: .setFromRotationMatrix() encountered an unknown order: " + order);
    }
    this._order = order;
    if (update === true) this._onChangeCallback();
    return this;
  }
  /**
   * Sets the angles of this Euler instance from a normalized quaternion.
   *
   * @param {Quaternion} q - A normalized Quaternion.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromQuaternion(q, order, update) {
    _matrix$2.makeRotationFromQuaternion(q);
    return this.setFromRotationMatrix(_matrix$2, order, update);
  }
  /**
   * Sets the angles of this Euler instance from the given vector.
   *
   * @param {Vector3} v - The vector.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromVector3(v, order = this._order) {
    return this.set(v.x, v.y, v.z, order);
  }
  /**
   * Resets the euler angle with a new order by creating a quaternion from this
   * euler angle and then setting this euler angle with the quaternion and the
   * new order.
   *
   * Warning: This discards revolution information.
   *
   * @param {string} [newOrder] - A string representing the new order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  reorder(newOrder) {
    _quaternion$4.setFromEuler(this);
    return this.setFromQuaternion(_quaternion$4, newOrder);
  }
  /**
   * Returns `true` if this Euler instance is equal with the given one.
   *
   * @param {Euler} euler - The Euler instance to test for equality.
   * @return {boolean} Whether this Euler instance is equal with the given one.
   */
  equals(euler) {
    return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
  }
  /**
   * Sets this Euler instance's components to values from the given array. The first three
   * entries of the array are assign to the x,y and z components. An optional fourth entry
   * defines the Euler order.
   *
   * @param {Array<number,number,number,?string>} array - An array holding the Euler component values.
   * @return {Euler} A reference to this Euler instance.
   */
  fromArray(array2) {
    this._x = array2[0];
    this._y = array2[1];
    this._z = array2[2];
    if (array2[3] !== void 0) this._order = array2[3];
    this._onChangeCallback();
    return this;
  }
  /**
   * Writes the components of this Euler instance to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number,number,number,string>} [array=[]] - The target array holding the Euler components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number,number,number,string>} The Euler components.
   */
  toArray(array2 = [], offset = 0) {
    array2[offset] = this._x;
    array2[offset + 1] = this._y;
    array2[offset + 2] = this._z;
    array2[offset + 3] = this._order;
    return array2;
  }
  _onChange(callback) {
    this._onChangeCallback = callback;
    return this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x;
    yield this._y;
    yield this._z;
    yield this._order;
  }
};
Euler.DEFAULT_ORDER = "XYZ";
var Layers = class {
  /**
   * Constructs a new layers instance, with membership
   * initially set to layer `0`.
   */
  constructor() {
    this.mask = 1 | 0;
  }
  /**
   * Sets membership to the given layer, and remove membership all other layers.
   *
   * @param {number} layer - The layer to set.
   */
  set(layer) {
    this.mask = (1 << layer | 0) >>> 0;
  }
  /**
   * Adds membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  enable(layer) {
    this.mask |= 1 << layer | 0;
  }
  /**
   * Adds membership to all layers.
   */
  enableAll() {
    this.mask = 4294967295 | 0;
  }
  /**
   * Toggles the membership of the given layer.
   *
   * @param {number} layer - The layer to toggle.
   */
  toggle(layer) {
    this.mask ^= 1 << layer | 0;
  }
  /**
   * Removes membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  disable(layer) {
    this.mask &= ~(1 << layer | 0);
  }
  /**
   * Removes the membership from all layers.
   */
  disableAll() {
    this.mask = 0;
  }
  /**
   * Returns `true` if this and the given layers object have at least one
   * layer in common.
   *
   * @param {Layers} layers - The layers to test.
   * @return {boolean } Whether this and the given layers object have at least one layer in common or not.
   */
  test(layers) {
    return (this.mask & layers.mask) !== 0;
  }
  /**
   * Returns `true` if the given layer is enabled.
   *
   * @param {number} layer - The layer to test.
   * @return {boolean } Whether the given layer is enabled or not.
   */
  isEnabled(layer) {
    return (this.mask & (1 << layer | 0)) !== 0;
  }
};
var _object3DId = 0;
var _v1$6 = /* @__PURE__ */ new Vector3();
var _q1 = /* @__PURE__ */ new Quaternion();
var _m1$1 = /* @__PURE__ */ new Matrix4();
var _target = /* @__PURE__ */ new Vector3();
var _position$4 = /* @__PURE__ */ new Vector3();
var _scale$3 = /* @__PURE__ */ new Vector3();
var _quaternion$3 = /* @__PURE__ */ new Quaternion();
var _xAxis = /* @__PURE__ */ new Vector3(1, 0, 0);
var _yAxis = /* @__PURE__ */ new Vector3(0, 1, 0);
var _zAxis = /* @__PURE__ */ new Vector3(0, 0, 1);
var _addedEvent = { type: "added" };
var _removedEvent = { type: "removed" };
var _childaddedEvent = { type: "childadded", child: null };
var _childremovedEvent = { type: "childremoved", child: null };
var Object3D = class _Object3D extends EventDispatcher {
  /**
   * Constructs a new 3D object.
   */
  constructor() {
    super();
    this.isObject3D = true;
    Object.defineProperty(this, "id", { value: _object3DId++ });
    this.uuid = generateUUID();
    this.name = "";
    this.type = "Object3D";
    this.parent = null;
    this.children = [];
    this.up = _Object3D.DEFAULT_UP.clone();
    const position = new Vector3();
    const rotation = new Euler();
    const quaternion = new Quaternion();
    const scale2 = new Vector3(1, 1, 1);
    function onRotationChange() {
      quaternion.setFromEuler(rotation, false);
    }
    function onQuaternionChange() {
      rotation.setFromQuaternion(quaternion, void 0, false);
    }
    rotation._onChange(onRotationChange);
    quaternion._onChange(onQuaternionChange);
    Object.defineProperties(this, {
      /**
       * Represents the object's local position.
       *
       * @name Object3D#position
       * @type {Vector3}
       * @default (0,0,0)
       */
      position: {
        configurable: true,
        enumerable: true,
        value: position
      },
      /**
       * Represents the object's local rotation as Euler angles, in radians.
       *
       * @name Object3D#rotation
       * @type {Euler}
       * @default (0,0,0)
       */
      rotation: {
        configurable: true,
        enumerable: true,
        value: rotation
      },
      /**
       * Represents the object's local rotation as Quaternions.
       *
       * @name Object3D#quaternion
       * @type {Quaternion}
       */
      quaternion: {
        configurable: true,
        enumerable: true,
        value: quaternion
      },
      /**
       * Represents the object's local scale.
       *
       * @name Object3D#scale
       * @type {Vector3}
       * @default (1,1,1)
       */
      scale: {
        configurable: true,
        enumerable: true,
        value: scale2
      },
      /**
       * Represents the object's model-view matrix.
       *
       * @name Object3D#modelViewMatrix
       * @type {Matrix4}
       */
      modelViewMatrix: {
        value: new Matrix4()
      },
      /**
       * Represents the object's normal matrix.
       *
       * @name Object3D#normalMatrix
       * @type {Matrix3}
       */
      normalMatrix: {
        value: new Matrix3()
      }
    });
    this.matrix = new Matrix4();
    this.matrixWorld = new Matrix4();
    this.matrixAutoUpdate = _Object3D.DEFAULT_MATRIX_AUTO_UPDATE;
    this.matrixWorldAutoUpdate = _Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE;
    this.matrixWorldNeedsUpdate = false;
    this.layers = new Layers();
    this.visible = true;
    this.castShadow = false;
    this.receiveShadow = false;
    this.frustumCulled = true;
    this.renderOrder = 0;
    this.animations = [];
    this.customDepthMaterial = void 0;
    this.customDistanceMaterial = void 0;
    this.static = false;
    this.userData = {};
    this.pivot = null;
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeShadow() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onAfterShadow() {
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} scene - The scene.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} scene - The scene.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onAfterRender() {
  }
  /**
   * Applies the given transformation matrix to the object and updates the object's position,
   * rotation and scale.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   */
  applyMatrix4(matrix) {
    if (this.matrixAutoUpdate) this.updateMatrix();
    this.matrix.premultiply(matrix);
    this.matrix.decompose(this.position, this.quaternion, this.scale);
    if (this.pivot !== null) {
      this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot);
    }
  }
  /**
   * Applies a rotation represented by given the quaternion to the 3D object.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Object3D} A reference to this instance.
   */
  applyQuaternion(q) {
    this.quaternion.premultiply(q);
    return this;
  }
  /**
   * Sets the given rotation represented as an axis/angle couple to the 3D object.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   */
  setRotationFromAxisAngle(axis, angle) {
    this.quaternion.setFromAxisAngle(axis, angle);
  }
  /**
   * Sets the given rotation represented as Euler angles to the 3D object.
   *
   * @param {Euler} euler - The Euler angles.
   */
  setRotationFromEuler(euler) {
    this.quaternion.setFromEuler(euler, true);
  }
  /**
   * Sets the given rotation represented as rotation matrix to the 3D object.
   *
   * @param {Matrix4} m - Although a 4x4 matrix is expected, the upper 3x3 portion must be
   * a pure rotation matrix (i.e, unscaled).
   */
  setRotationFromMatrix(m) {
    this.quaternion.setFromRotationMatrix(m);
  }
  /**
   * Sets the given rotation represented as a Quaternion to the 3D object.
   *
   * @param {Quaternion} q - The Quaternion
   */
  setRotationFromQuaternion(q) {
    this.quaternion.copy(q);
  }
  /**
   * Rotates the 3D object along an axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnAxis(axis, angle) {
    _q1.setFromAxisAngle(axis, angle);
    this.quaternion.multiply(_q1);
    return this;
  }
  /**
   * Rotates the 3D object along an axis in world space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnWorldAxis(axis, angle) {
    _q1.setFromAxisAngle(axis, angle);
    this.quaternion.premultiply(_q1);
    return this;
  }
  /**
   * Rotates the 3D object around its X axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateX(angle) {
    return this.rotateOnAxis(_xAxis, angle);
  }
  /**
   * Rotates the 3D object around its Y axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateY(angle) {
    return this.rotateOnAxis(_yAxis, angle);
  }
  /**
   * Rotates the 3D object around its Z axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateZ(angle) {
    return this.rotateOnAxis(_zAxis, angle);
  }
  /**
   * Translate the 3D object by a distance along the given axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateOnAxis(axis, distance) {
    _v1$6.copy(axis).applyQuaternion(this.quaternion);
    this.position.add(_v1$6.multiplyScalar(distance));
    return this;
  }
  /**
   * Translate the 3D object by a distance along its X-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateX(distance) {
    return this.translateOnAxis(_xAxis, distance);
  }
  /**
   * Translate the 3D object by a distance along its Y-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateY(distance) {
    return this.translateOnAxis(_yAxis, distance);
  }
  /**
   * Translate the 3D object by a distance along its Z-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateZ(distance) {
    return this.translateOnAxis(_zAxis, distance);
  }
  /**
   * Converts the given vector from this 3D object's local space to world space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  localToWorld(vector) {
    this.updateWorldMatrix(true, false);
    return vector.applyMatrix4(this.matrixWorld);
  }
  /**
   * Converts the given vector from this 3D object's world space to local space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  worldToLocal(vector) {
    this.updateWorldMatrix(true, false);
    return vector.applyMatrix4(_m1$1.copy(this.matrixWorld).invert());
  }
  /**
   * Rotates the object to face a point in world space.
   *
   * This method does not support objects having non-uniformly-scaled parent(s).
   *
   * @param {number|Vector3} x - The x coordinate in world space. Alternatively, a vector representing a position in world space
   * @param {number} [y] - The y coordinate in world space.
   * @param {number} [z] - The z coordinate in world space.
   */
  lookAt(x, y, z) {
    if (x.isVector3) {
      _target.copy(x);
    } else {
      _target.set(x, y, z);
    }
    const parent = this.parent;
    this.updateWorldMatrix(true, false);
    _position$4.setFromMatrixPosition(this.matrixWorld);
    if (this.isCamera || this.isLight) {
      _m1$1.lookAt(_position$4, _target, this.up);
    } else {
      _m1$1.lookAt(_target, _position$4, this.up);
    }
    this.quaternion.setFromRotationMatrix(_m1$1);
    if (parent) {
      _m1$1.extractRotation(parent.matrixWorld);
      _q1.setFromRotationMatrix(_m1$1);
      this.quaternion.premultiply(_q1.invert());
    }
  }
  /**
   * Adds the given 3D object as a child to this 3D object. An arbitrary number of
   * objects may be added. Any current parent on an object passed in here will be
   * removed, since an object can have at most one parent.
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to add.
   * @return {Object3D} A reference to this instance.
   */
  add(object) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) {
        this.add(arguments[i]);
      }
      return this;
    }
    if (object === this) {
      error("Object3D.add: object can't be added as a child of itself.", object);
      return this;
    }
    if (object && object.isObject3D) {
      object.removeFromParent();
      object.parent = this;
      this.children.push(object);
      object.dispatchEvent(_addedEvent);
      _childaddedEvent.child = object;
      this.dispatchEvent(_childaddedEvent);
      _childaddedEvent.child = null;
    } else {
      error("Object3D.add: object not an instance of THREE.Object3D.", object);
    }
    return this;
  }
  /**
   * Removes the given 3D object as child from this 3D object.
   * An arbitrary number of objects may be removed.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @param {Object3D} object - The 3D object to remove.
   * @return {Object3D} A reference to this instance.
   */
  remove(object) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) {
        this.remove(arguments[i]);
      }
      return this;
    }
    const index = this.children.indexOf(object);
    if (index !== -1) {
      object.parent = null;
      this.children.splice(index, 1);
      object.dispatchEvent(_removedEvent);
      _childremovedEvent.child = object;
      this.dispatchEvent(_childremovedEvent);
      _childremovedEvent.child = null;
    }
    return this;
  }
  /**
   * Removes this 3D object from its current parent.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  removeFromParent() {
    const parent = this.parent;
    if (parent !== null) {
      parent.remove(this);
    }
    return this;
  }
  /**
   * Removes all child objects.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  clear() {
    return this.remove(...this.children);
  }
  /**
   * Adds the given 3D object as a child of this 3D object, while maintaining the object's world
   * transform. This method does not support scene graphs having non-uniformly-scaled nodes(s).
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to attach.
   * @return {Object3D} A reference to this instance.
   */
  attach(object) {
    this.updateWorldMatrix(true, false);
    _m1$1.copy(this.matrixWorld).invert();
    if (object.parent !== null) {
      object.parent.updateWorldMatrix(true, false);
      _m1$1.multiply(object.parent.matrixWorld);
    }
    object.applyMatrix4(_m1$1);
    object.removeFromParent();
    object.parent = this;
    this.children.push(object);
    object.updateWorldMatrix(false, true);
    object.dispatchEvent(_addedEvent);
    _childaddedEvent.child = object;
    this.dispatchEvent(_childaddedEvent);
    _childaddedEvent.child = null;
    return this;
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching ID.
   *
   * @param {number} id - The id.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectById(id) {
    return this.getObjectByProperty("id", id);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching name.
   *
   * @param {string} name - The name.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByName(name) {
    return this.getObjectByProperty("name", name);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByProperty(name, value) {
    if (this[name] === value) return this;
    for (let i = 0, l = this.children.length; i < l; i++) {
      const child = this.children[i];
      const object = child.getObjectByProperty(name, value);
      if (object !== void 0) {
        return object;
      }
    }
    return void 0;
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns all 3D objects with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @param {Array<Object3D>} result - The method stores the result in this array.
   * @return {Array<Object3D>} The found 3D objects.
   */
  getObjectsByProperty(name, value, result = []) {
    if (this[name] === value) result.push(this);
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      children[i].getObjectsByProperty(name, value, result);
    }
    return result;
  }
  /**
   * Returns a vector representing the position of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's position in world space.
   */
  getWorldPosition(target) {
    this.updateWorldMatrix(true, false);
    return target.setFromMatrixPosition(this.matrixWorld);
  }
  /**
   * Returns a Quaternion representing the position of the 3D object in world space.
   *
   * @param {Quaternion} target - The target Quaternion the result is stored to.
   * @return {Quaternion} The 3D object's rotation in world space.
   */
  getWorldQuaternion(target) {
    this.updateWorldMatrix(true, false);
    this.matrixWorld.decompose(_position$4, target, _scale$3);
    return target;
  }
  /**
   * Returns a vector representing the scale of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's scale in world space.
   */
  getWorldScale(target) {
    this.updateWorldMatrix(true, false);
    this.matrixWorld.decompose(_position$4, _quaternion$3, target);
    return target;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(target) {
    this.updateWorldMatrix(true, false);
    const e = this.matrixWorld.elements;
    return target.set(e[8], e[9], e[10]).normalize();
  }
  /**
   * Abstract method to get intersections between a casted ray and this
   * 3D object. Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points}
   * implement this method in order to use raycasting.
   *
   * @abstract
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - An array holding the result of the method.
   */
  raycast() {
  }
  /**
   * Returns `true` if this 3D object intersects the given frustum. Renderable 3D objects
   * such as {@link Mesh}, {@link Line} or {@link Points} override this method in order
   * to use frustum culling. The default implementation always returns `true`.
   *
   * @param {Frustum|FrustumArray} frustum - The frustum to test.
   * @return {boolean} Whether this 3D object intersects the given frustum or not.
   */
  intersectsFrustum() {
    return true;
  }
  /**
   * Executes the callback on this 3D object and all descendants.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverse(callback) {
    callback(this);
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      children[i].traverse(callback);
    }
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for visible 3D objects.
   * Descendants of invisible 3D objects are not traversed.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseVisible(callback) {
    if (this.visible === false) return;
    callback(this);
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      children[i].traverseVisible(callback);
    }
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for all ancestors.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseAncestors(callback) {
    const parent = this.parent;
    if (parent !== null) {
      callback(parent);
      parent.traverseAncestors(callback);
    }
  }
  /**
   * Updates the transformation matrix in local space by computing it from the current
   * position, rotation and scale values.
   */
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const pivot = this.pivot;
    if (pivot !== null) {
      const px = pivot.x, py = pivot.y, pz = pivot.z;
      const te = this.matrix.elements;
      te[12] += px - te[0] * px - te[4] * py - te[8] * pz;
      te[13] += py - te[1] * px - te[5] * py - te[9] * pz;
      te[14] += pz - te[2] * px - te[6] * py - te[10] * pz;
    }
    this.matrixWorldNeedsUpdate = true;
  }
  /**
   * Updates the transformation matrix in world space of this 3D objects and its descendants.
   *
   * To ensure correct results, this method also recomputes the 3D object's transformation matrix in
   * local space. The computation of the local and world matrix can be controlled with the
   * {@link Object3D#matrixAutoUpdate} and {@link Object3D#matrixWorldAutoUpdate} flags which are both
   * `true` by default.  Set these flags to `false` if you need more control over the update matrix process.
   *
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
   */
  updateMatrixWorld(force) {
    if (this.matrixAutoUpdate) this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || force) {
      if (this.matrixWorldAutoUpdate === true) {
        if (this.parent === null) {
          this.matrixWorld.copy(this.matrix);
        } else {
          this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
        }
      }
      this.matrixWorldNeedsUpdate = false;
      force = true;
    }
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      const child = children[i];
      child.updateMatrixWorld(force);
    }
  }
  /**
   * An alternative version of {@link Object3D#updateMatrixWorld} with more control over the
   * update of ancestor and descendant nodes.
   *
   * @param {boolean} [updateParents=false] Whether ancestor nodes should be updated or not.
   * @param {boolean} [updateChildren=false] Whether descendant nodes should be updated or not.
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
   */
  updateWorldMatrix(updateParents, updateChildren, force = false) {
    const parent = this.parent;
    if (updateParents === true && parent !== null) {
      parent.updateWorldMatrix(true, false);
    }
    if (this.matrixAutoUpdate) this.updateMatrix();
    if (this.matrixWorldNeedsUpdate || force) {
      if (this.matrixWorldAutoUpdate === true) {
        if (this.parent === null) {
          this.matrixWorld.copy(this.matrix);
        } else {
          this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
        }
      }
      this.matrixWorldNeedsUpdate = false;
      force = true;
    }
    if (updateChildren === true) {
      const children = this.children;
      for (let i = 0, l = children.length; i < l; i++) {
        const child = children[i];
        child.updateWorldMatrix(false, true, force);
      }
    }
  }
  /**
   * Serializes the 3D object into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized 3D object.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(meta) {
    const isRootObject = meta === void 0 || typeof meta === "string";
    const output = {};
    if (isRootObject) {
      meta = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {},
        skeletons: {},
        animations: {},
        nodes: {}
      };
      output.metadata = {
        version: 4.7,
        type: "Object",
        generator: "Object3D.toJSON"
      };
    }
    const object = {};
    object.uuid = this.uuid;
    object.type = this.type;
    object.name = this.name;
    object.castShadow = this.castShadow;
    object.receiveShadow = this.receiveShadow;
    object.visible = this.visible;
    object.frustumCulled = this.frustumCulled;
    object.renderOrder = this.renderOrder;
    object.static = this.static;
    object.matrixAutoUpdate = this.matrixAutoUpdate;
    if (Object.keys(this.userData).length > 0) object.userData = this.userData;
    object.layers = this.layers.mask;
    object.matrix = this.matrix.toArray();
    object.up = this.up.toArray();
    if (this.pivot !== null) object.pivot = this.pivot.toArray();
    if (this.morphTargetDictionary !== void 0) object.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary);
    if (this.morphTargetInfluences !== void 0) object.morphTargetInfluences = this.morphTargetInfluences.slice();
    if (this.isInstancedMesh) {
      object.type = "InstancedMesh";
      object.count = this.count;
      object.instanceMatrix = this.instanceMatrix.toJSON();
      if (this.instanceColor !== null) object.instanceColor = this.instanceColor.toJSON();
    }
    if (this.isBatchedMesh) {
      object.type = "BatchedMesh";
      object.perObjectFrustumCulled = this.perObjectFrustumCulled;
      object.sortObjects = this.sortObjects;
      object.drawRanges = this._drawRanges;
      object.reservedRanges = this._reservedRanges;
      object.geometryInfo = this._geometryInfo.map((info) => ({
        ...info,
        boundingBox: info.boundingBox ? info.boundingBox.toJSON() : void 0,
        boundingSphere: info.boundingSphere ? info.boundingSphere.toJSON() : void 0
      }));
      object.instanceInfo = this._instanceInfo.map((info) => ({ ...info }));
      object.availableInstanceIds = this._availableInstanceIds.slice();
      object.availableGeometryIds = this._availableGeometryIds.slice();
      object.nextIndexStart = this._nextIndexStart;
      object.nextVertexStart = this._nextVertexStart;
      object.geometryCount = this._geometryCount;
      object.maxInstanceCount = this._maxInstanceCount;
      object.maxVertexCount = this._maxVertexCount;
      object.maxIndexCount = this._maxIndexCount;
      object.geometryInitialized = this._geometryInitialized;
      object.matricesTexture = this._matricesTexture.toJSON(meta);
      object.indirectTexture = this._indirectTexture.toJSON(meta);
      if (this._colorsTexture !== null) {
        object.colorsTexture = this._colorsTexture.toJSON(meta);
      }
      if (this.boundingSphere !== null) {
        object.boundingSphere = this.boundingSphere.toJSON();
      }
      if (this.boundingBox !== null) {
        object.boundingBox = this.boundingBox.toJSON();
      }
    }
    function serialize(library, element) {
      if (library[element.uuid] === void 0) {
        library[element.uuid] = element.toJSON(meta);
      }
      return element.uuid;
    }
    if (this.isScene) {
      if (this.background) {
        if (this.background.isColor) {
          object.background = this.background.toJSON();
        } else if (this.background.isTexture) {
          object.background = this.background.toJSON(meta).uuid;
        }
      }
      if (this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== true) {
        object.environment = this.environment.toJSON(meta).uuid;
      }
    } else if (this.isMesh || this.isLine || this.isPoints) {
      object.geometry = serialize(meta.geometries, this.geometry);
      const parameters = this.geometry.parameters;
      if (parameters !== void 0 && parameters.shapes !== void 0) {
        const shapes = parameters.shapes;
        if (Array.isArray(shapes)) {
          for (let i = 0, l = shapes.length; i < l; i++) {
            const shape = shapes[i];
            serialize(meta.shapes, shape);
          }
        } else {
          serialize(meta.shapes, shapes);
        }
      }
    }
    if (this.isSkinnedMesh) {
      object.bindMode = this.bindMode;
      object.bindMatrix = this.bindMatrix.toArray();
      if (this.skeleton !== void 0) {
        serialize(meta.skeletons, this.skeleton);
        object.skeleton = this.skeleton.uuid;
      }
    }
    if (this.material !== void 0) {
      if (Array.isArray(this.material)) {
        const uuids = [];
        for (let i = 0, l = this.material.length; i < l; i++) {
          uuids.push(serialize(meta.materials, this.material[i]));
        }
        object.material = uuids;
      } else {
        object.material = serialize(meta.materials, this.material);
      }
    }
    if (this.children.length > 0) {
      object.children = [];
      for (let i = 0; i < this.children.length; i++) {
        object.children.push(this.children[i].toJSON(meta).object);
      }
    }
    if (this.animations.length > 0) {
      object.animations = [];
      for (let i = 0; i < this.animations.length; i++) {
        const animation = this.animations[i];
        object.animations.push(serialize(meta.animations, animation));
      }
    }
    if (isRootObject) {
      const geometries = extractFromCache(meta.geometries);
      const materials = extractFromCache(meta.materials);
      const textures = extractFromCache(meta.textures);
      const images = extractFromCache(meta.images);
      const shapes = extractFromCache(meta.shapes);
      const skeletons = extractFromCache(meta.skeletons);
      const animations = extractFromCache(meta.animations);
      const nodes = extractFromCache(meta.nodes);
      if (geometries.length > 0) output.geometries = geometries;
      if (materials.length > 0) output.materials = materials;
      if (textures.length > 0) output.textures = textures;
      if (images.length > 0) output.images = images;
      if (shapes.length > 0) output.shapes = shapes;
      if (skeletons.length > 0) output.skeletons = skeletons;
      if (animations.length > 0) output.animations = animations;
      if (nodes.length > 0) output.nodes = nodes;
    }
    output.object = object;
    return output;
    function extractFromCache(cache) {
      const values = [];
      for (const key in cache) {
        const data = cache[key];
        delete data.metadata;
        values.push(data);
      }
      return values;
    }
  }
  /**
   * Returns a new 3D object with copied values from this instance.
   *
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are also cloned.
   * @return {Object3D} A clone of this instance.
   */
  clone(recursive) {
    return new this.constructor().copy(this, recursive);
  }
  /**
   * Copies the values of the given 3D object to this instance.
   *
   * @param {Object3D} source - The 3D object to copy.
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are cloned.
   * @return {Object3D} A reference to this instance.
   */
  copy(source, recursive = true) {
    this.name = source.name;
    this.up.copy(source.up);
    this.position.copy(source.position);
    this.rotation.order = source.rotation.order;
    this.quaternion.copy(source.quaternion);
    this.scale.copy(source.scale);
    this.pivot = source.pivot !== null ? source.pivot.clone() : null;
    this.matrix.copy(source.matrix);
    this.matrixWorld.copy(source.matrixWorld);
    this.matrixAutoUpdate = source.matrixAutoUpdate;
    this.matrixWorldAutoUpdate = source.matrixWorldAutoUpdate;
    this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
    this.layers.mask = source.layers.mask;
    this.visible = source.visible;
    this.castShadow = source.castShadow;
    this.receiveShadow = source.receiveShadow;
    this.frustumCulled = source.frustumCulled;
    this.renderOrder = source.renderOrder;
    this.static = source.static;
    this.animations = source.animations.slice();
    this.userData = JSON.parse(JSON.stringify(source.userData));
    if (recursive === true) {
      for (let i = 0; i < source.children.length; i++) {
        const child = source.children[i];
        this.add(child.clone());
      }
    }
    return this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * Geometries, materials and textures are potentially shared with other
   * 3D objects and must be disposed of separately.
   *
   * @fires Object3D#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
};
Object3D.DEFAULT_UP = /* @__PURE__ */ new Vector3(0, 1, 0);
Object3D.DEFAULT_MATRIX_AUTO_UPDATE = true;
Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
var _colorKeywords = {
  "aliceblue": 15792383,
  "antiquewhite": 16444375,
  "aqua": 65535,
  "aquamarine": 8388564,
  "azure": 15794175,
  "beige": 16119260,
  "bisque": 16770244,
  "black": 0,
  "blanchedalmond": 16772045,
  "blue": 255,
  "blueviolet": 9055202,
  "brown": 10824234,
  "burlywood": 14596231,
  "cadetblue": 6266528,
  "chartreuse": 8388352,
  "chocolate": 13789470,
  "coral": 16744272,
  "cornflowerblue": 6591981,
  "cornsilk": 16775388,
  "crimson": 14423100,
  "cyan": 65535,
  "darkblue": 139,
  "darkcyan": 35723,
  "darkgoldenrod": 12092939,
  "darkgray": 11119017,
  "darkgreen": 25600,
  "darkgrey": 11119017,
  "darkkhaki": 12433259,
  "darkmagenta": 9109643,
  "darkolivegreen": 5597999,
  "darkorange": 16747520,
  "darkorchid": 10040012,
  "darkred": 9109504,
  "darksalmon": 15308410,
  "darkseagreen": 9419919,
  "darkslateblue": 4734347,
  "darkslategray": 3100495,
  "darkslategrey": 3100495,
  "darkturquoise": 52945,
  "darkviolet": 9699539,
  "deeppink": 16716947,
  "deepskyblue": 49151,
  "dimgray": 6908265,
  "dimgrey": 6908265,
  "dodgerblue": 2003199,
  "firebrick": 11674146,
  "floralwhite": 16775920,
  "forestgreen": 2263842,
  "fuchsia": 16711935,
  "gainsboro": 14474460,
  "ghostwhite": 16316671,
  "gold": 16766720,
  "goldenrod": 14329120,
  "gray": 8421504,
  "green": 32768,
  "greenyellow": 11403055,
  "grey": 8421504,
  "honeydew": 15794160,
  "hotpink": 16738740,
  "indianred": 13458524,
  "indigo": 4915330,
  "ivory": 16777200,
  "khaki": 15787660,
  "lavender": 15132410,
  "lavenderblush": 16773365,
  "lawngreen": 8190976,
  "lemonchiffon": 16775885,
  "lightblue": 11393254,
  "lightcoral": 15761536,
  "lightcyan": 14745599,
  "lightgoldenrodyellow": 16448210,
  "lightgray": 13882323,
  "lightgreen": 9498256,
  "lightgrey": 13882323,
  "lightpink": 16758465,
  "lightsalmon": 16752762,
  "lightseagreen": 2142890,
  "lightskyblue": 8900346,
  "lightslategray": 7833753,
  "lightslategrey": 7833753,
  "lightsteelblue": 11584734,
  "lightyellow": 16777184,
  "lime": 65280,
  "limegreen": 3329330,
  "linen": 16445670,
  "magenta": 16711935,
  "maroon": 8388608,
  "mediumaquamarine": 6737322,
  "mediumblue": 205,
  "mediumorchid": 12211667,
  "mediumpurple": 9662683,
  "mediumseagreen": 3978097,
  "mediumslateblue": 8087790,
  "mediumspringgreen": 64154,
  "mediumturquoise": 4772300,
  "mediumvioletred": 13047173,
  "midnightblue": 1644912,
  "mintcream": 16121850,
  "mistyrose": 16770273,
  "moccasin": 16770229,
  "navajowhite": 16768685,
  "navy": 128,
  "oldlace": 16643558,
  "olive": 8421376,
  "olivedrab": 7048739,
  "orange": 16753920,
  "orangered": 16729344,
  "orchid": 14315734,
  "palegoldenrod": 15657130,
  "palegreen": 10025880,
  "paleturquoise": 11529966,
  "palevioletred": 14381203,
  "papayawhip": 16773077,
  "peachpuff": 16767673,
  "peru": 13468991,
  "pink": 16761035,
  "plum": 14524637,
  "powderblue": 11591910,
  "purple": 8388736,
  "rebeccapurple": 6697881,
  "red": 16711680,
  "rosybrown": 12357519,
  "royalblue": 4286945,
  "saddlebrown": 9127187,
  "salmon": 16416882,
  "sandybrown": 16032864,
  "seagreen": 3050327,
  "seashell": 16774638,
  "sienna": 10506797,
  "silver": 12632256,
  "skyblue": 8900331,
  "slateblue": 6970061,
  "slategray": 7372944,
  "slategrey": 7372944,
  "snow": 16775930,
  "springgreen": 65407,
  "steelblue": 4620980,
  "tan": 13808780,
  "teal": 32896,
  "thistle": 14204888,
  "tomato": 16737095,
  "turquoise": 4251856,
  "violet": 15631086,
  "wheat": 16113331,
  "white": 16777215,
  "whitesmoke": 16119285,
  "yellow": 16776960,
  "yellowgreen": 10145074
};
var _hslA = { h: 0, s: 0, l: 0 };
var _hslB = { h: 0, s: 0, l: 0 };
function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
  return p;
}
var Color = class {
  /**
   * Constructs a new color.
   *
   * Note that standard method of specifying color in three.js is with a hexadecimal triplet,
   * and that method is used throughout the rest of the documentation.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   */
  constructor(r, g, b) {
    this.isColor = true;
    this.r = 1;
    this.g = 1;
    this.b = 1;
    return this.set(r, g, b);
  }
  /**
   * Sets the colors's components from the given values.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   * @return {Color} A reference to this color.
   */
  set(r, g, b) {
    if (g === void 0 && b === void 0) {
      const value = r;
      if (value && value.isColor) {
        this.copy(value);
      } else if (typeof value === "number") {
        this.setHex(value);
      } else if (typeof value === "string") {
        this.setStyle(value);
      }
    } else {
      this.setRGB(r, g, b);
    }
    return this;
  }
  /**
   * Sets the colors's components to the given scalar value.
   *
   * @param {number} scalar - The scalar value.
   * @return {Color} A reference to this color.
   */
  setScalar(scalar) {
    this.r = scalar;
    this.g = scalar;
    this.b = scalar;
    return this;
  }
  /**
   * Sets this color from a hexadecimal value.
   *
   * @param {number} hex - The hexadecimal value.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHex(hex, colorSpace = SRGBColorSpace) {
    hex = Math.floor(hex);
    this.r = (hex >> 16 & 255) / 255;
    this.g = (hex >> 8 & 255) / 255;
    this.b = (hex & 255) / 255;
    ColorManagement.colorSpaceToWorking(this, colorSpace);
    return this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} r - Red channel value between `0.0` and `1.0`.
   * @param {number} g - Green channel value between `0.0` and `1.0`.
   * @param {number} b - Blue channel value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setRGB(r, g, b, colorSpace = ColorManagement.workingColorSpace) {
    this.r = r;
    this.g = g;
    this.b = b;
    ColorManagement.colorSpaceToWorking(this, colorSpace);
    return this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHSL(h, s, l, colorSpace = ColorManagement.workingColorSpace) {
    h = euclideanModulo(h, 1);
    s = clamp(s, 0, 1);
    l = clamp(l, 0, 1);
    if (s === 0) {
      this.r = this.g = this.b = l;
    } else {
      const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
      const q = 2 * l - p;
      this.r = hue2rgb(q, p, h + 1 / 3);
      this.g = hue2rgb(q, p, h);
      this.b = hue2rgb(q, p, h - 1 / 3);
    }
    ColorManagement.colorSpaceToWorking(this, colorSpace);
    return this;
  }
  /**
   * Sets this color from a CSS-style string. For example, `rgb(250, 0,0)`,
   * `rgb(100%, 0%, 0%)`, `hsl(0, 100%, 50%)`, `#ff0000`, `#f00`, or `red` ( or
   * any [X11 color name](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) -
   * all 140 color names are supported).
   *
   * @param {string} style - Color as a CSS-style string.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setStyle(style, colorSpace = SRGBColorSpace) {
    function handleAlpha(string) {
      if (string === void 0) return;
      if (parseFloat(string) < 1) {
        warn("Color: Alpha component of " + style + " will be ignored.");
      }
    }
    let m;
    if (m = /^(\w+)\(([^\)]*)\)/.exec(style)) {
      let color;
      const name = m[1];
      const components = m[2];
      switch (name) {
        case "rgb":
        case "rgba":
          if (color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(components)) {
            handleAlpha(color[4]);
            return this.setRGB(
              Math.min(255, parseInt(color[1], 10)) / 255,
              Math.min(255, parseInt(color[2], 10)) / 255,
              Math.min(255, parseInt(color[3], 10)) / 255,
              colorSpace
            );
          }
          if (color = /^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(components)) {
            handleAlpha(color[4]);
            return this.setRGB(
              Math.min(100, parseFloat(color[1])) / 100,
              Math.min(100, parseFloat(color[2])) / 100,
              Math.min(100, parseFloat(color[3])) / 100,
              colorSpace
            );
          }
          break;
        case "hsl":
        case "hsla":
          if (color = /^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(components)) {
            handleAlpha(color[4]);
            return this.setHSL(
              parseFloat(color[1]) / 360,
              parseFloat(color[2]) / 100,
              parseFloat(color[3]) / 100,
              colorSpace
            );
          }
          break;
        default:
          warn("Color: Unknown color model " + style);
      }
    } else if (m = /^\#([A-Fa-f\d]+)$/.exec(style)) {
      const hex = m[1];
      const size2 = hex.length;
      if (size2 === 3) {
        return this.setRGB(
          parseInt(hex.charAt(0), 16) / 15,
          parseInt(hex.charAt(1), 16) / 15,
          parseInt(hex.charAt(2), 16) / 15,
          colorSpace
        );
      } else if (size2 === 6) {
        return this.setHex(parseInt(hex, 16), colorSpace);
      } else {
        warn("Color: Invalid hex color " + style);
      }
    } else if (style && style.length > 0) {
      return this.setColorName(style, colorSpace);
    }
    return this;
  }
  /**
   * Sets this color from a color name. Faster than {@link Color#setStyle} if
   * you don't need the other CSS-style formats.
   *
   * For convenience, the list of names is exposed in `Color.NAMES` as a hash.
   * ```js
   * Color.NAMES.aliceblue // returns 0xF0F8FF
   * ```
   *
   * @param {string} style - The color name.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setColorName(style, colorSpace = SRGBColorSpace) {
    const hex = _colorKeywords[style.toLowerCase()];
    if (hex !== void 0) {
      this.setHex(hex, colorSpace);
    } else {
      warn("Color: Unknown color " + style);
    }
    return this;
  }
  /**
   * Returns a new color with copied values from this instance.
   *
   * @return {Color} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  /**
   * Copies the values of the given color to this instance.
   *
   * @param {Color} color - The color to copy.
   * @return {Color} A reference to this color.
   */
  copy(color) {
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    return this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copySRGBToLinear(color) {
    this.r = SRGBToLinear(color.r);
    this.g = SRGBToLinear(color.g);
    this.b = SRGBToLinear(color.b);
    return this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copyLinearToSRGB(color) {
    this.r = LinearToSRGB(color.r);
    this.g = LinearToSRGB(color.g);
    this.b = LinearToSRGB(color.b);
    return this;
  }
  /**
   * Converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertSRGBToLinear() {
    this.copySRGBToLinear(this);
    return this;
  }
  /**
   * Converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertLinearToSRGB() {
    this.copyLinearToSRGB(this);
    return this;
  }
  /**
   * Returns the hexadecimal value of this color.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {number} The hexadecimal value.
   */
  getHex(colorSpace = SRGBColorSpace) {
    ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
    return Math.round(clamp(_color.r * 255, 0, 255)) * 65536 + Math.round(clamp(_color.g * 255, 0, 255)) * 256 + Math.round(clamp(_color.b * 255, 0, 255));
  }
  /**
   * Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The hexadecimal value as a string.
   */
  getHexString(colorSpace = SRGBColorSpace) {
    return ("000000" + this.getHex(colorSpace).toString(16)).slice(-6);
  }
  /**
   * Converts the colors RGB values into the HSL format and stores them into the
   * given target object.
   *
   * @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {{h:number,s:number,l:number}} The HSL representation of this color.
   */
  getHSL(target, colorSpace = ColorManagement.workingColorSpace) {
    ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
    const r = _color.r, g = _color.g, b = _color.b;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let hue, saturation;
    const lightness = (min + max) / 2;
    if (min === max) {
      hue = 0;
      saturation = 0;
    } else {
      const delta = max - min;
      saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
      switch (max) {
        case r:
          hue = (g - b) / delta + (g < b ? 6 : 0);
          break;
        case g:
          hue = (b - r) / delta + 2;
          break;
        case b:
          hue = (r - g) / delta + 4;
          break;
      }
      hue /= 6;
    }
    target.h = hue;
    target.s = saturation;
    target.l = lightness;
    return target;
  }
  /**
   * Returns the RGB values of this color and stores them into the given target object.
   *
   * @param {Color} target - The target color that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} The RGB representation of this color.
   */
  getRGB(target, colorSpace = ColorManagement.workingColorSpace) {
    ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
    target.r = _color.r;
    target.g = _color.g;
    target.b = _color.b;
    return target;
  }
  /**
   * Returns the value of this color as a CSS style string. Example: `rgb(255,0,0)`.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The CSS representation of this color.
   */
  getStyle(colorSpace = SRGBColorSpace) {
    ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
    const r = _color.r, g = _color.g, b = _color.b;
    if (colorSpace !== SRGBColorSpace) {
      return `color(${colorSpace} ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)})`;
    }
    return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
  }
  /**
   * Adds the given HSL values to this color's values.
   * Internally, this converts the color's RGB values to HSL, adds HSL
   * and then converts the color back to RGB.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @return {Color} A reference to this color.
   */
  offsetHSL(h, s, l) {
    this.getHSL(_hslA);
    return this.setHSL(_hslA.h + h, _hslA.s + s, _hslA.l + l);
  }
  /**
   * Adds the RGB values of the given color to the RGB values of this color.
   *
   * @param {Color} color - The color to add.
   * @return {Color} A reference to this color.
   */
  add(color) {
    this.r += color.r;
    this.g += color.g;
    this.b += color.b;
    return this;
  }
  /**
   * Adds the RGB values of the given colors and stores the result in this instance.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @return {Color} A reference to this color.
   */
  addColors(color1, color2) {
    this.r = color1.r + color2.r;
    this.g = color1.g + color2.g;
    this.b = color1.b + color2.b;
    return this;
  }
  /**
   * Adds the given scalar value to the RGB values of this color.
   *
   * @param {number} s - The scalar to add.
   * @return {Color} A reference to this color.
   */
  addScalar(s) {
    this.r += s;
    this.g += s;
    this.b += s;
    return this;
  }
  /**
   * Subtracts the RGB values of the given color from the RGB values of this color.
   *
   * @param {Color} color - The color to subtract.
   * @return {Color} A reference to this color.
   */
  sub(color) {
    this.r = Math.max(0, this.r - color.r);
    this.g = Math.max(0, this.g - color.g);
    this.b = Math.max(0, this.b - color.b);
    return this;
  }
  /**
   * Multiplies the RGB values of the given color with the RGB values of this color.
   *
   * @param {Color} color - The color to multiply.
   * @return {Color} A reference to this color.
   */
  multiply(color) {
    this.r *= color.r;
    this.g *= color.g;
    this.b *= color.b;
    return this;
  }
  /**
   * Multiplies the given scalar value with the RGB values of this color.
   *
   * @param {number} s - The scalar to multiply.
   * @return {Color} A reference to this color.
   */
  multiplyScalar(s) {
    this.r *= s;
    this.g *= s;
    this.b *= s;
    return this;
  }
  /**
   * Linearly interpolates this color's RGB values toward the RGB values of the
   * given color. The alpha argument can be thought of as the ratio between
   * the two colors, where `0.0` is this color and `1.0` is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerp(color, alpha) {
    this.r += (color.r - this.r) * alpha;
    this.g += (color.g - this.g) * alpha;
    this.b += (color.b - this.b) * alpha;
    return this;
  }
  /**
   * Linearly interpolates between the given colors and stores the result in this instance.
   * The alpha argument can be thought of as the ratio between the two colors, where `0.0`
   * is the first and `1.0` is the second color.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpColors(color1, color2, alpha) {
    this.r = color1.r + (color2.r - color1.r) * alpha;
    this.g = color1.g + (color2.g - color1.g) * alpha;
    this.b = color1.b + (color2.b - color1.b) * alpha;
    return this;
  }
  /**
   * Linearly interpolates this color's HSL values toward the HSL values of the
   * given color. It differs from {@link Color#lerp} by not interpolating straight
   * from one color to the other, but instead going through all the hues in between
   * those two colors. The alpha argument can be thought of as the ratio between
   * the two colors, where 0.0 is this color and 1.0 is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpHSL(color, alpha) {
    this.getHSL(_hslA);
    color.getHSL(_hslB);
    const h = lerp(_hslA.h, _hslB.h, alpha);
    const s = lerp(_hslA.s, _hslB.s, alpha);
    const l = lerp(_hslA.l, _hslB.l, alpha);
    this.setHSL(h, s, l);
    return this;
  }
  /**
   * Sets the color's RGB components from the given 3D vector.
   *
   * @param {Vector3} v - The vector to set.
   * @return {Color} A reference to this color.
   */
  setFromVector3(v) {
    this.r = v.x;
    this.g = v.y;
    this.b = v.z;
    return this;
  }
  /**
   * Transforms this color with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix.
   * @return {Color} A reference to this color.
   */
  applyMatrix3(m) {
    const r = this.r, g = this.g, b = this.b;
    const e = m.elements;
    this.r = e[0] * r + e[3] * g + e[6] * b;
    this.g = e[1] * r + e[4] * g + e[7] * b;
    this.b = e[2] * r + e[5] * g + e[8] * b;
    return this;
  }
  /**
   * Returns `true` if this color is equal with the given one.
   *
   * @param {Color} c - The color to test for equality.
   * @return {boolean} Whether this bounding color is equal with the given one.
   */
  equals(c) {
    return c.r === this.r && c.g === this.g && c.b === this.b;
  }
  /**
   * Sets this color's RGB components from the given array.
   *
   * @param {Array<number>} array - An array holding the RGB values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Color} A reference to this color.
   */
  fromArray(array2, offset = 0) {
    this.r = array2[offset];
    this.g = array2[offset + 1];
    this.b = array2[offset + 2];
    return this;
  }
  /**
   * Writes the RGB components of this color to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the color components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The color components.
   */
  toArray(array2 = [], offset = 0) {
    array2[offset] = this.r;
    array2[offset + 1] = this.g;
    array2[offset + 2] = this.b;
    return array2;
  }
  /**
   * Sets the components of this color from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding color data.
   * @param {number} index - The index into the attribute.
   * @return {Color} A reference to this color.
   */
  fromBufferAttribute(attribute, index) {
    this.r = attribute.getX(index);
    this.g = attribute.getY(index);
    this.b = attribute.getZ(index);
    return this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the color
   * as a hexadecimal value.
   *
   * @return {number} The hexadecimal value.
   */
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r;
    yield this.g;
    yield this.b;
  }
};
var _color = /* @__PURE__ */ new Color();
Color.NAMES = _colorKeywords;
var _tables = /* @__PURE__ */ _generateTables();
function _generateTables() {
  const buffer = new ArrayBuffer(4);
  const floatView = new Float32Array(buffer);
  const uint32View = new Uint32Array(buffer);
  const baseTable = new Uint32Array(512);
  const shiftTable = new Uint32Array(512);
  for (let i = 0; i < 256; ++i) {
    const e = i - 127;
    if (e < -27) {
      baseTable[i] = 0;
      baseTable[i | 256] = 32768;
      shiftTable[i] = 24;
      shiftTable[i | 256] = 24;
    } else if (e < -14) {
      baseTable[i] = 1024 >> -e - 14;
      baseTable[i | 256] = 1024 >> -e - 14 | 32768;
      shiftTable[i] = -e - 1;
      shiftTable[i | 256] = -e - 1;
    } else if (e <= 15) {
      baseTable[i] = e + 15 << 10;
      baseTable[i | 256] = e + 15 << 10 | 32768;
      shiftTable[i] = 13;
      shiftTable[i | 256] = 13;
    } else if (e < 128) {
      baseTable[i] = 31744;
      baseTable[i | 256] = 64512;
      shiftTable[i] = 24;
      shiftTable[i | 256] = 24;
    } else {
      baseTable[i] = 31744;
      baseTable[i | 256] = 64512;
      shiftTable[i] = 13;
      shiftTable[i | 256] = 13;
    }
  }
  const mantissaTable = new Uint32Array(2048);
  const exponentTable = new Uint32Array(64);
  const offsetTable = new Uint32Array(64);
  for (let i = 1; i < 1024; ++i) {
    let m = i << 13;
    let e = 0;
    while ((m & 8388608) === 0) {
      m <<= 1;
      e -= 8388608;
    }
    m &= -8388609;
    e += 947912704;
    mantissaTable[i] = m | e;
  }
  for (let i = 1024; i < 2048; ++i) {
    mantissaTable[i] = 939524096 + (i - 1024 << 13);
  }
  for (let i = 1; i < 31; ++i) {
    exponentTable[i] = i << 23;
  }
  exponentTable[31] = 1199570944;
  exponentTable[32] = 2147483648;
  for (let i = 33; i < 63; ++i) {
    exponentTable[i] = 2147483648 + (i - 32 << 23);
  }
  exponentTable[63] = 3347054592;
  for (let i = 1; i < 64; ++i) {
    if (i !== 32) {
      offsetTable[i] = 1024;
    }
  }
  return {
    floatView,
    uint32View,
    baseTable,
    shiftTable,
    mantissaTable,
    exponentTable,
    offsetTable
  };
}
function toHalfFloat(val) {
  if (Math.abs(val) > 65504) warn("DataUtils.toHalfFloat(): Value out of range.");
  val = clamp(val, -65504, 65504);
  _tables.floatView[0] = val;
  const f = _tables.uint32View[0];
  const e = f >> 23 & 511;
  return _tables.baseTable[e] + ((f & 8388607) >> _tables.shiftTable[e]);
}
function fromHalfFloat(val) {
  const m = val >> 10;
  _tables.uint32View[0] = _tables.mantissaTable[_tables.offsetTable[m] + (val & 1023)] + _tables.exponentTable[m];
  return _tables.floatView[0];
}
var DataUtils = class {
  /**
   * Returns a half precision floating point value (FP16) from the given single
   * precision floating point value (FP32).
   *
   * @param {number} val - A single precision floating point value.
   * @return {number} The FP16 value.
   */
  static toHalfFloat(val) {
    return toHalfFloat(val);
  }
  /**
   * Returns a single precision floating point value (FP32) from the given half
   * precision floating point value (FP16).
   *
   * @param {number} val - A half precision floating point value.
   * @return {number} The FP32 value.
   */
  static fromHalfFloat(val) {
    return fromHalfFloat(val);
  }
};
var _vector1 = /* @__PURE__ */ new Vector3();
var _vector2 = /* @__PURE__ */ new Vector3();
var _normalMatrix = /* @__PURE__ */ new Matrix3();
var Plane = class {
  /**
   * Constructs a new plane.
   *
   * @param {Vector3} [normal=(1,0,0)] - A unit length vector defining the normal of the plane.
   * @param {number} [constant=0] - The signed distance from the origin to the plane.
   */
  constructor(normal = new Vector3(1, 0, 0), constant = 0) {
    this.isPlane = true;
    this.normal = normal;
    this.constant = constant;
  }
  /**
   * Sets the plane components by copying the given values.
   *
   * @param {Vector3} normal - The normal.
   * @param {number} constant - The constant.
   * @return {Plane} A reference to this plane.
   */
  set(normal, constant) {
    this.normal.copy(normal);
    this.constant = constant;
    return this;
  }
  /**
   * Sets the plane components by defining `x`, `y`, `z` as the
   * plane normal and `w` as the constant.
   *
   * @param {number} x - The value for the normal's x component.
   * @param {number} y - The value for the normal's y component.
   * @param {number} z - The value for the normal's z component.
   * @param {number} w - The constant value.
   * @return {Plane} A reference to this plane.
   */
  setComponents(x, y, z, w) {
    this.normal.set(x, y, z);
    this.constant = w;
    return this;
  }
  /**
   * Sets the plane from the given normal and coplanar point (that is a point
   * that lies onto the plane).
   *
   * @param {Vector3} normal - The normal.
   * @param {Vector3} point - A coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromNormalAndCoplanarPoint(normal, point) {
    this.normal.copy(normal);
    this.constant = -point.dot(this.normal);
    return this;
  }
  /**
   * Sets the plane from three coplanar points. The winding order is
   * assumed to be counter-clockwise, and determines the direction of
   * the plane normal.
   *
   * @param {Vector3} a - The first coplanar point.
   * @param {Vector3} b - The second coplanar point.
   * @param {Vector3} c - The third coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromCoplanarPoints(a, b, c) {
    const normal = _vector1.subVectors(c, b).cross(_vector2.subVectors(a, b)).normalize();
    this.setFromNormalAndCoplanarPoint(normal, a);
    return this;
  }
  /**
   * Copies the values of the given plane to this instance.
   *
   * @param {Plane} plane - The plane to copy.
   * @return {Plane} A reference to this plane.
   */
  copy(plane) {
    this.normal.copy(plane.normal);
    this.constant = plane.constant;
    return this;
  }
  /**
   * Normalizes the plane normal and adjusts the constant accordingly.
   *
   * @return {Plane} A reference to this plane.
   */
  normalize() {
    const inverseNormalLength = 1 / this.normal.length();
    this.normal.multiplyScalar(inverseNormalLength);
    this.constant *= inverseNormalLength;
    return this;
  }
  /**
   * Negates both the plane normal and the constant.
   *
   * @return {Plane} A reference to this plane.
   */
  negate() {
    this.constant *= -1;
    this.normal.negate();
    return this;
  }
  /**
   * Returns the signed distance from the given point to this plane.
   *
   * @param {Vector3} point - The point to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToPoint(point) {
    return this.normal.dot(point) + this.constant;
  }
  /**
   * Returns the signed distance from the given sphere to this plane.
   *
   * @param {Sphere} sphere - The sphere to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToSphere(sphere) {
    return this.distanceToPoint(sphere.center) - sphere.radius;
  }
  /**
   * Projects a the given point onto the plane.
   *
   * @param {Vector3} point - The point to project.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The projected point on the plane.
   */
  projectPoint(point, target) {
    return target.copy(point).addScaledVector(this.normal, -this.distanceToPoint(point));
  }
  /**
   * Returns the intersection point of the passed line and the plane. Returns
   * `null` if the line does not intersect. Returns the line's starting point if
   * the line is coplanar with the plane.
   *
   * @param {Line3} line - The line to compute the intersection for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @param {boolean} [clampToLine=true] - Whether to clamp the intersection to the line segment.
   * @return {?Vector3} The intersection point. Returns `null` if no intersection is detected.
   */
  intersectLine(line, target, clampToLine = true) {
    const direction2 = line.delta(_vector1);
    const denominator = this.normal.dot(direction2);
    if (denominator === 0) {
      if (this.distanceToPoint(line.start) === 0) {
        return target.copy(line.start);
      }
      return null;
    }
    const t = -(line.start.dot(this.normal) + this.constant) / denominator;
    if (clampToLine === true && (t < 0 || t > 1)) {
      return null;
    }
    return target.copy(line.start).addScaledVector(direction2, t);
  }
  /**
   * Returns `true` if the given line segment intersects with (passes through) the plane.
   *
   * @param {Line3} line - The line to test.
   * @return {boolean} Whether the given line segment intersects with the plane or not.
   */
  intersectsLine(line) {
    const startSign = this.distanceToPoint(line.start);
    const endSign = this.distanceToPoint(line.end);
    return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;
  }
  /**
   * Returns `true` if the given bounding box intersects with the plane.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with the plane or not.
   */
  intersectsBox(box) {
    return box.intersectsPlane(this);
  }
  /**
   * Returns `true` if the given bounding sphere intersects with the plane.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with the plane or not.
   */
  intersectsSphere(sphere) {
    return sphere.intersectsPlane(this);
  }
  /**
   * Returns a coplanar vector to the plane, by calculating the
   * projection of the normal at the origin onto the plane.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The coplanar point.
   */
  coplanarPoint(target) {
    return target.copy(this.normal).multiplyScalar(-this.constant);
  }
  /**
   * Apply a 4x4 matrix to the plane. The matrix must be an affine, homogeneous transform.
   *
   * The optional normal matrix can be pre-computed like so:
   * ```js
   * const optionalNormalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );
   * ```
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @param {Matrix4} [optionalNormalMatrix] - A pre-computed normal matrix.
   * @return {Plane} A reference to this plane.
   */
  applyMatrix4(matrix, optionalNormalMatrix) {
    const normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix(matrix);
    const referencePoint = this.coplanarPoint(_vector1).applyMatrix4(matrix);
    const normal = this.normal.applyMatrix3(normalMatrix).normalize();
    this.constant = -referencePoint.dot(normal);
    return this;
  }
  /**
   * Translates the plane by the distance defined by the given offset vector.
   * Note that this only affects the plane constant and will not affect the normal vector.
   *
   * @param {Vector3} offset - The offset vector.
   * @return {Plane} A reference to this plane.
   */
  translate(offset) {
    this.constant -= offset.dot(this.normal);
    return this;
  }
  /**
   * Returns `true` if this plane is equal with the given one.
   *
   * @param {Plane} plane - The plane to test for equality.
   * @return {boolean} Whether this plane is equal with the given one.
   */
  equals(plane) {
    return plane.normal.equals(this.normal) && plane.constant === this.constant;
  }
  /**
   * Returns a new plane with copied values from this instance.
   *
   * @return {Plane} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Returns a serialized structure of the plane.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      normal: this.normal.toArray(),
      constant: this.constant
    };
  }
  /**
   * Sets the plane properties from the given JSON.
   *
   * @param {Object} json - The serialized json to set the plane from.
   * @return {Plane} A reference to this plane.
   */
  fromJSON(json) {
    this.normal.fromArray(json.normal);
    this.constant = json.constant;
    return this;
  }
};
var DataTexture = class extends Texture {
  /**
   * Constructs a new data texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=NearestFilter] - The mag filter value.
   * @param {number} [minFilter=NearestFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(data = null, width = 1, height = 1, format, type, mapping, wrapS, wrapT, magFilter = NearestFilter, minFilter = NearestFilter, anisotropy, colorSpace) {
    super(null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace);
    this.isDataTexture = true;
    this.image = { data, width, height };
    this.generateMipmaps = false;
    this.flipY = false;
    this.unpackAlignment = 1;
  }
};
function cloneUniforms(src) {
  const dst = {};
  for (const u in src) {
    dst[u] = {};
    for (const p in src[u]) {
      const property = src[u][p];
      if (isThreeObject(property)) {
        if (property.isRenderTargetTexture) {
          warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().");
          dst[u][p] = null;
        } else {
          dst[u][p] = property.clone();
        }
      } else if (Array.isArray(property)) {
        if (isThreeObject(property[0])) {
          const clonedProperty = [];
          for (let i = 0, l = property.length; i < l; i++) {
            clonedProperty[i] = property[i].clone();
          }
          dst[u][p] = clonedProperty;
        } else {
          dst[u][p] = property.slice();
        }
      } else {
        dst[u][p] = property;
      }
    }
  }
  return dst;
}
function mergeUniforms(uniforms) {
  const merged = {};
  for (let u = 0; u < uniforms.length; u++) {
    const tmp = cloneUniforms(uniforms[u]);
    for (const p in tmp) {
      merged[p] = tmp[p];
    }
  }
  return merged;
}
function isThreeObject(property) {
  return property && (property.isColor || property.isMatrix3 || property.isMatrix4 || property.isVector2 || property.isVector3 || property.isVector4 || property.isTexture || property.isQuaternion);
}
function convertArray(array2, type) {
  if (!array2 || array2.constructor === type) return array2;
  if (typeof type.BYTES_PER_ELEMENT === "number") {
    return new type(array2);
  }
  return Array.prototype.slice.call(array2);
}
function hasTangents(settings) {
  return settings !== void 0 && settings.inTangents !== void 0 && settings.outTangents !== void 0;
}
var Interpolant = class {
  /**
   * Constructs a new interpolant.
   *
   * @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
   * @param {TypedArray} sampleValues - The sample values.
   * @param {number} sampleSize - The sample size
   * @param {TypedArray} [resultBuffer] - The result buffer.
   */
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    this.parameterPositions = parameterPositions;
    this._cachedIndex = 0;
    this.resultBuffer = resultBuffer !== void 0 ? resultBuffer : new sampleValues.constructor(sampleSize);
    this.sampleValues = sampleValues;
    this.valueSize = sampleSize;
    this.settings = null;
    this.DefaultSettings_ = {};
  }
  /**
   * Evaluate the interpolant at position `t`.
   *
   * @param {number} t - The interpolation factor.
   * @return {TypedArray} The result buffer.
   */
  evaluate(t) {
    const pp = this.parameterPositions;
    let i1 = this._cachedIndex, t1 = pp[i1], t0 = pp[i1 - 1];
    validate_interval: {
      seek: {
        let right;
        linear_scan: {
          forward_scan: if (!(t < t1)) {
            for (let giveUpAt = i1 + 2; ; ) {
              if (t1 === void 0) {
                if (t < t0) break forward_scan;
                i1 = pp.length;
                this._cachedIndex = i1;
                return this.copySampleValue_(i1 - 1);
              }
              if (i1 === giveUpAt) break;
              t0 = t1;
              t1 = pp[++i1];
              if (t < t1) {
                break seek;
              }
            }
            right = pp.length;
            break linear_scan;
          }
          if (!(t >= t0)) {
            const t1global = pp[1];
            if (t < t1global) {
              i1 = 2;
              t0 = t1global;
            }
            for (let giveUpAt = i1 - 2; ; ) {
              if (t0 === void 0) {
                this._cachedIndex = 0;
                return this.copySampleValue_(0);
              }
              if (i1 === giveUpAt) break;
              t1 = t0;
              t0 = pp[--i1 - 1];
              if (t >= t0) {
                break seek;
              }
            }
            right = i1;
            i1 = 0;
            break linear_scan;
          }
          break validate_interval;
        }
        while (i1 < right) {
          const mid = i1 + right >>> 1;
          if (t < pp[mid]) {
            right = mid;
          } else {
            i1 = mid + 1;
          }
        }
        t1 = pp[i1];
        t0 = pp[i1 - 1];
        if (t0 === void 0) {
          this._cachedIndex = 0;
          return this.copySampleValue_(0);
        }
        if (t1 === void 0) {
          i1 = pp.length;
          this._cachedIndex = i1;
          return this.copySampleValue_(i1 - 1);
        }
      }
      this._cachedIndex = i1;
      this.intervalChanged_(i1, t0, t1);
    }
    return this.interpolate_(i1, t0, t, t1);
  }
  /**
   * Returns the interpolation settings.
   *
   * @return {Object} The interpolation settings.
   */
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  /**
   * Copies a sample value to the result buffer.
   *
   * @param {number} index - An index into the sample value buffer.
   * @return {TypedArray} The result buffer.
   */
  copySampleValue_(index) {
    const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, offset = index * stride;
    for (let i = 0; i !== stride; ++i) {
      result[i] = values[offset + i];
    }
    return result;
  }
  /**
   * Copies a sample value to the result buffer.
   *
   * @abstract
   * @param {number} i1 - An index into the sample value buffer.
   * @param {number} t0 - The previous interpolation factor.
   * @param {number} t - The current interpolation factor.
   * @param {number} t1 - The next interpolation factor.
   * @return {TypedArray} The result buffer.
   */
  interpolate_() {
    throw new Error("THREE.Interpolant: Call to abstract method.");
  }
  /**
   * Optional method that is executed when the interval has changed.
   *
   * @param {number} i1 - An index into the sample value buffer.
   * @param {number} t0 - The previous interpolation factor.
   * @param {number} t1 - The next interpolation factor.
   */
  intervalChanged_() {
  }
};
var CubicInterpolant = class extends Interpolant {
  /**
   * Constructs a new cubic interpolant.
   *
   * @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
   * @param {TypedArray} sampleValues - The sample values.
   * @param {number} sampleSize - The sample size
   * @param {TypedArray} [resultBuffer] - The result buffer.
   */
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
    this._weightPrev = -0;
    this._offsetPrev = -0;
    this._weightNext = -0;
    this._offsetNext = -0;
    this.DefaultSettings_ = {
      endingStart: ZeroCurvatureEnding,
      endingEnd: ZeroCurvatureEnding
    };
  }
  intervalChanged_(i1, t0, t1) {
    const pp = this.parameterPositions;
    let iPrev = i1 - 2, iNext = i1 + 1, tPrev = pp[iPrev], tNext = pp[iNext];
    if (tPrev === void 0) {
      switch (this.getSettings_().endingStart) {
        case ZeroSlopeEnding:
          iPrev = i1;
          tPrev = 2 * t0 - t1;
          break;
        case WrapAroundEnding:
          iPrev = pp.length - 2;
          tPrev = t0 + pp[iPrev] - pp[iPrev + 1];
          break;
        default:
          iPrev = i1;
          tPrev = t1;
      }
    }
    if (tNext === void 0) {
      switch (this.getSettings_().endingEnd) {
        case ZeroSlopeEnding:
          iNext = i1;
          tNext = 2 * t1 - t0;
          break;
        case WrapAroundEnding:
          iNext = 1;
          tNext = t1 + pp[1] - pp[0];
          break;
        default:
          iNext = i1 - 1;
          tNext = t0;
      }
    }
    const halfDt = (t1 - t0) * 0.5, stride = this.valueSize;
    this._weightPrev = halfDt / (t0 - tPrev);
    this._weightNext = halfDt / (tNext - t1);
    this._offsetPrev = iPrev * stride;
    this._offsetNext = iNext * stride;
  }
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, o1 = i1 * stride, o0 = o1 - stride, oP = this._offsetPrev, oN = this._offsetNext, wP = this._weightPrev, wN = this._weightNext, p = (t - t0) / (t1 - t0), pp = p * p, ppp = pp * p;
    const sP = -wP * ppp + 2 * wP * pp - wP * p;
    const s0 = (1 + wP) * ppp + (-1.5 - 2 * wP) * pp + (-0.5 + wP) * p + 1;
    const s1 = (-1 - wN) * ppp + (1.5 + wN) * pp + 0.5 * p;
    const sN = wN * ppp - wN * pp;
    for (let i = 0; i !== stride; ++i) {
      result[i] = sP * values[oP + i] + s0 * values[o0 + i] + s1 * values[o1 + i] + sN * values[oN + i];
    }
    return result;
  }
};
var LinearInterpolant = class extends Interpolant {
  /**
   * Constructs a new linear interpolant.
   *
   * @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
   * @param {TypedArray} sampleValues - The sample values.
   * @param {number} sampleSize - The sample size
   * @param {TypedArray} [resultBuffer] - The result buffer.
   */
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, offset1 = i1 * stride, offset0 = offset1 - stride, weight1 = (t - t0) / (t1 - t0), weight0 = 1 - weight1;
    for (let i = 0; i !== stride; ++i) {
      result[i] = values[offset0 + i] * weight0 + values[offset1 + i] * weight1;
    }
    return result;
  }
};
var DiscreteInterpolant = class extends Interpolant {
  /**
   * Constructs a new discrete interpolant.
   *
   * @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
   * @param {TypedArray} sampleValues - The sample values.
   * @param {number} sampleSize - The sample size
   * @param {TypedArray} [resultBuffer] - The result buffer.
   */
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }
  interpolate_(i1) {
    return this.copySampleValue_(i1 - 1);
  }
};
var BezierInterpolant = class extends Interpolant {
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer;
    const values = this.sampleValues;
    const stride = this.valueSize;
    const offset1 = i1 * stride;
    const offset0 = offset1 - stride;
    const inTangents = this.inTangents;
    const outTangents = this.outTangents;
    if (!inTangents || !outTangents) {
      const weight1 = (t - t0) / (t1 - t0);
      const weight0 = 1 - weight1;
      for (let i = 0; i !== stride; ++i) {
        result[i] = values[offset0 + i] * weight0 + values[offset1 + i] * weight1;
      }
      return result;
    }
    const tangentStride = stride * 2;
    const i0 = i1 - 1;
    for (let i = 0; i !== stride; ++i) {
      const v0 = values[offset0 + i];
      const v1 = values[offset1 + i];
      const outTangentOffset = i0 * tangentStride + i * 2;
      const c0x = outTangents[outTangentOffset];
      const c0y = outTangents[outTangentOffset + 1];
      const inTangentOffset = i1 * tangentStride + i * 2;
      const c1x = inTangents[inTangentOffset];
      const c1y = inTangents[inTangentOffset + 1];
      const s = solveBezierParameter(t, t0, c0x, c1x, t1);
      result[i] = cubicBezier(s, v0, c0y, c1y, v1);
    }
    return result;
  }
};
function cubicBezier(s, p0, p1, p2, p3) {
  const k = 1 - s;
  return k * k * k * p0 + 3 * k * k * s * p1 + 3 * k * s * s * p2 + s * s * s * p3;
}
function cubicBezierSlope(s, p0, p1, p2, p3) {
  const k = 1 - s;
  return 3 * k * k * (p1 - p0) + 6 * k * s * (p2 - p1) + 3 * s * s * (p3 - p2);
}
function solveBezierParameter(x, x0, x1, x2, x3) {
  let s = (x - x0) / (x3 - x0);
  for (let i = 0; i < 8; i++) {
    const error2 = cubicBezier(s, x0, x1, x2, x3) - x;
    if (Math.abs(error2) < 1e-10) break;
    const slope = cubicBezierSlope(s, x0, x1, x2, x3);
    if (Math.abs(slope) < 1e-10) break;
    s = Math.max(0, Math.min(1, s - error2 / slope));
  }
  return s;
}
var KeyframeTrack = class {
  /**
   * Constructs a new keyframe track.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<number|string|boolean>} values - A list of keyframe values.
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth|InterpolateBezier)} [interpolation] - The interpolation type.
   */
  constructor(name, times2, values, interpolation) {
    if (name === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (times2 === void 0 || times2.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + name);
    this.name = name;
    this.times = convertArray(times2, this.TimeBufferType);
    this.values = convertArray(values, this.ValueBufferType);
    this.setInterpolation(interpolation || this.DefaultInterpolation);
  }
  /**
   * Converts the keyframe track to JSON.
   *
   * @static
   * @param {KeyframeTrack} track - The keyframe track to serialize.
   * @return {Object} The serialized keyframe track as JSON.
   */
  static toJSON(track) {
    const trackType = track.constructor;
    let json;
    if (trackType.toJSON !== this.toJSON) {
      json = trackType.toJSON(track);
    } else {
      json = {
        "name": track.name,
        "times": convertArray(track.times, Array),
        "values": convertArray(track.values, Array)
      };
      const interpolation = track.getInterpolation();
      if (interpolation !== track.DefaultInterpolation) {
        json.interpolation = interpolation;
      }
      if (hasTangents(track.settings)) {
        json.settings = {
          inTangents: convertArray(track.settings.inTangents, Array),
          outTangents: convertArray(track.settings.outTangents, Array)
        };
      }
    }
    json.type = track.ValueTypeName;
    return json;
  }
  /**
   * Factory method for creating a new discrete interpolant.
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {DiscreteInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodDiscrete(result) {
    return new DiscreteInterpolant(this.times, this.values, this.getValueSize(), result);
  }
  /**
   * Factory method for creating a new linear interpolant.
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {LinearInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodLinear(result) {
    return new LinearInterpolant(this.times, this.values, this.getValueSize(), result);
  }
  /**
   * Factory method for creating a new smooth interpolant.
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {CubicInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodSmooth(result) {
    return new CubicInterpolant(this.times, this.values, this.getValueSize(), result);
  }
  /**
   * Factory method for creating a new Bezier interpolant.
   *
   * The Bezier interpolant requires tangent data to be set via the `settings` property
   * on the track before creating the interpolant. The settings should contain:
   * - `inTangents`: Float32Array with [time, value] pairs per keyframe per component
   * - `outTangents`: Float32Array with [time, value] pairs per keyframe per component
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {BezierInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodBezier(result) {
    const interpolant = new BezierInterpolant(this.times, this.values, this.getValueSize(), result);
    if (this.settings) {
      interpolant.inTangents = this.settings.inTangents;
      interpolant.outTangents = this.settings.outTangents;
    }
    return interpolant;
  }
  /**
   * Defines the interpolation factor method for this keyframe track.
   *
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth|InterpolateBezier)} interpolation - The interpolation type.
   * @return {KeyframeTrack} A reference to this keyframe track.
   */
  setInterpolation(interpolation) {
    let factoryMethod;
    switch (interpolation) {
      case InterpolateDiscrete:
        factoryMethod = this.InterpolantFactoryMethodDiscrete;
        break;
      case InterpolateLinear:
        factoryMethod = this.InterpolantFactoryMethodLinear;
        break;
      case InterpolateSmooth:
        factoryMethod = this.InterpolantFactoryMethodSmooth;
        break;
      case InterpolateBezier:
        factoryMethod = this.InterpolantFactoryMethodBezier;
        break;
    }
    if (factoryMethod === void 0) {
      const message = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0) {
        if (interpolation !== this.DefaultInterpolation) {
          this.setInterpolation(this.DefaultInterpolation);
        } else {
          throw new Error(message);
        }
      }
      warn("KeyframeTrack:", message);
      return this;
    }
    this.createInterpolant = factoryMethod;
    return this;
  }
  /**
   * Returns the current interpolation type.
   *
   * @return {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth|InterpolateBezier)} The interpolation type.
   */
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return InterpolateDiscrete;
      case this.InterpolantFactoryMethodLinear:
        return InterpolateLinear;
      case this.InterpolantFactoryMethodSmooth:
        return InterpolateSmooth;
      case this.InterpolantFactoryMethodBezier:
        return InterpolateBezier;
    }
  }
  /**
   * Returns the value size.
   *
   * @return {number} The value size.
   */
  getValueSize() {
    return this.values.length / this.times.length;
  }
  /**
   * Moves all keyframes either forward or backward in time.
   *
   * @param {number} timeOffset - The offset to move the time values.
   * @return {KeyframeTrack} A reference to this keyframe track.
   */
  shift(timeOffset) {
    if (timeOffset !== 0) {
      const times2 = this.times;
      for (let i = 0, n = times2.length; i !== n; ++i) {
        times2[i] += timeOffset;
      }
      if (hasTangents(this.settings)) {
        shiftTangentTimes(this.settings.inTangents, timeOffset);
        shiftTangentTimes(this.settings.outTangents, timeOffset);
      }
    }
    return this;
  }
  /**
   * Scale all keyframe times by a factor (useful for frame - seconds conversions).
   *
   * @param {number} timeScale - The time scale.
   * @return {KeyframeTrack} A reference to this keyframe track.
   */
  scale(timeScale) {
    if (timeScale !== 1) {
      const times2 = this.times;
      for (let i = 0, n = times2.length; i !== n; ++i) {
        times2[i] *= timeScale;
      }
      if (hasTangents(this.settings)) {
        scaleTangentTimes(this.settings.inTangents, timeScale);
        scaleTangentTimes(this.settings.outTangents, timeScale);
      }
    }
    return this;
  }
  /**
   * Removes keyframes before and after animation without changing any values within the defined time range.
   *
   * Note: The method does not shift around keys to the start of the track time, because for interpolated
   * keys this will change their values
   *
   * @param {number} startTime - The start time.
   * @param {number} endTime - The end time.
   * @return {KeyframeTrack} A reference to this keyframe track.
   */
  trim(startTime, endTime) {
    const times2 = this.times, nKeys = times2.length;
    let from = 0, to = nKeys - 1;
    while (from !== nKeys && times2[from] < startTime) {
      ++from;
    }
    while (to !== -1 && times2[to] > endTime) {
      --to;
    }
    ++to;
    if (from !== 0 || to !== nKeys) {
      if (from >= to) {
        to = Math.max(to, 1);
        from = to - 1;
      }
      const stride = this.getValueSize();
      this.times = times2.slice(from, to);
      this.values = this.values.slice(from * stride, to * stride);
    }
    return this;
  }
  /**
   * Performs minimal validation on the keyframe track. Returns `true` if the values
   * are valid.
   *
   * @return {boolean} Whether the keyframes are valid or not.
   */
  validate() {
    let valid = true;
    const valueSize = this.getValueSize();
    if (valueSize - Math.floor(valueSize) !== 0) {
      error("KeyframeTrack: Invalid value size in track.", this);
      valid = false;
    }
    const times2 = this.times, values = this.values, nKeys = times2.length;
    if (nKeys === 0) {
      error("KeyframeTrack: Track is empty.", this);
      valid = false;
    }
    let prevTime = null;
    for (let i = 0; i !== nKeys; i++) {
      const currTime = times2[i];
      if (typeof currTime === "number" && isNaN(currTime)) {
        error("KeyframeTrack: Time is not a valid number.", this, i, currTime);
        valid = false;
        break;
      }
      if (prevTime !== null && prevTime > currTime) {
        error("KeyframeTrack: Out of order keys.", this, i, currTime, prevTime);
        valid = false;
        break;
      }
      prevTime = currTime;
    }
    if (values !== void 0) {
      if (isTypedArray(values)) {
        for (let i = 0, n = values.length; i !== n; ++i) {
          const value = values[i];
          if (isNaN(value)) {
            error("KeyframeTrack: Value is not a valid number.", this, i, value);
            valid = false;
            break;
          }
        }
      }
    }
    return valid;
  }
  /**
   * Optimizes this keyframe track by removing equivalent sequential keys (which are
   * common in morph target sequences).
   *
   * @return {KeyframeTrack} A reference to this keyframe track.
   */
  optimize() {
    const times2 = this.times.slice(), values = this.values.slice(), stride = this.getValueSize(), smoothInterpolation = this.getInterpolation() === InterpolateSmooth, lastIndex = times2.length - 1;
    let writeIndex = 1;
    for (let i = 1; i < lastIndex; ++i) {
      let keep = false;
      const time = times2[i];
      const timeNext = times2[i + 1];
      if (time !== timeNext && (i !== 1 || time !== times2[0])) {
        if (!smoothInterpolation) {
          const offset = i * stride, offsetP = offset - stride, offsetN = offset + stride;
          for (let j = 0; j !== stride; ++j) {
            const value = values[offset + j];
            if (value !== values[offsetP + j] || value !== values[offsetN + j]) {
              keep = true;
              break;
            }
          }
        } else {
          keep = true;
        }
      }
      if (keep) {
        if (i !== writeIndex) {
          times2[writeIndex] = times2[i];
          const readOffset = i * stride, writeOffset = writeIndex * stride;
          for (let j = 0; j !== stride; ++j) {
            values[writeOffset + j] = values[readOffset + j];
          }
        }
        ++writeIndex;
      }
    }
    if (lastIndex > 0) {
      times2[writeIndex] = times2[lastIndex];
      for (let readOffset = lastIndex * stride, writeOffset = writeIndex * stride, j = 0; j !== stride; ++j) {
        values[writeOffset + j] = values[readOffset + j];
      }
      ++writeIndex;
    }
    if (writeIndex !== times2.length) {
      this.times = times2.slice(0, writeIndex);
      this.values = values.slice(0, writeIndex * stride);
    } else {
      this.times = times2;
      this.values = values;
    }
    return this;
  }
  /**
   * Returns a new keyframe track with copied values from this instance.
   *
   * @return {KeyframeTrack} A clone of this instance.
   */
  clone() {
    const times2 = this.times.slice();
    const values = this.values.slice();
    const TypedKeyframeTrack = this.constructor;
    const track = new TypedKeyframeTrack(this.name, times2, values);
    track.createInterpolant = this.createInterpolant;
    if (hasTangents(this.settings)) {
      track.settings = {
        inTangents: this.settings.inTangents.slice(),
        outTangents: this.settings.outTangents.slice()
      };
    }
    return track;
  }
};
function shiftTangentTimes(tangents, timeOffset) {
  for (let i = 0, n = tangents.length; i !== n; i += 2) {
    tangents[i] += timeOffset;
  }
}
function scaleTangentTimes(tangents, timeScale) {
  for (let i = 0, n = tangents.length; i !== n; i += 2) {
    tangents[i] *= timeScale;
  }
}
KeyframeTrack.prototype.ValueTypeName = "";
KeyframeTrack.prototype.TimeBufferType = Float32Array;
KeyframeTrack.prototype.ValueBufferType = Float32Array;
KeyframeTrack.prototype.DefaultInterpolation = InterpolateLinear;
var BooleanKeyframeTrack = class extends KeyframeTrack {
  /**
   * Constructs a new boolean keyframe track.
   *
   * This keyframe track type has no `interpolation` parameter because the
   * interpolation is always discrete.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<boolean>} values - A list of keyframe values.
   */
  constructor(name, times2, values) {
    super(name, times2, values);
  }
};
BooleanKeyframeTrack.prototype.ValueTypeName = "bool";
BooleanKeyframeTrack.prototype.ValueBufferType = Array;
BooleanKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete;
BooleanKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0;
BooleanKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
var ColorKeyframeTrack = class extends KeyframeTrack {
  /**
   * Constructs a new color keyframe track.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<number>} values - A list of keyframe values.
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
   */
  constructor(name, times2, values, interpolation) {
    super(name, times2, values, interpolation);
  }
};
ColorKeyframeTrack.prototype.ValueTypeName = "color";
var NumberKeyframeTrack = class extends KeyframeTrack {
  /**
   * Constructs a new number keyframe track.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<number>} values - A list of keyframe values.
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
   */
  constructor(name, times2, values, interpolation) {
    super(name, times2, values, interpolation);
  }
};
NumberKeyframeTrack.prototype.ValueTypeName = "number";
var QuaternionLinearInterpolant = class extends Interpolant {
  /**
   * Constructs a new SLERP interpolant.
   *
   * @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
   * @param {TypedArray} sampleValues - The sample values.
   * @param {number} sampleSize - The sample size
   * @param {TypedArray} [resultBuffer] - The result buffer.
   */
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer, values = this.sampleValues, stride = this.valueSize, alpha = (t - t0) / (t1 - t0);
    let offset = i1 * stride;
    for (let end = offset + stride; offset !== end; offset += 4) {
      Quaternion.slerpFlat(result, 0, values, offset - stride, values, offset, alpha);
    }
    return result;
  }
};
var QuaternionKeyframeTrack = class extends KeyframeTrack {
  /**
   * Constructs a new Quaternion keyframe track.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<number>} values - A list of keyframe values.
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
   */
  constructor(name, times2, values, interpolation) {
    super(name, times2, values, interpolation);
  }
  /**
   * Overwritten so the method returns Quaternion based interpolant.
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {QuaternionLinearInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodLinear(result) {
    return new QuaternionLinearInterpolant(this.times, this.values, this.getValueSize(), result);
  }
};
QuaternionKeyframeTrack.prototype.ValueTypeName = "quaternion";
QuaternionKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
var StringKeyframeTrack = class extends KeyframeTrack {
  /**
   * Constructs a new string keyframe track.
   *
   * This keyframe track type has no `interpolation` parameter because the
   * interpolation is always discrete.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<string>} values - A list of keyframe values.
   */
  constructor(name, times2, values) {
    super(name, times2, values);
  }
};
StringKeyframeTrack.prototype.ValueTypeName = "string";
StringKeyframeTrack.prototype.ValueBufferType = Array;
StringKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete;
StringKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0;
StringKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
var VectorKeyframeTrack = class extends KeyframeTrack {
  /**
   * Constructs a new vector keyframe track.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<number>} values - A list of keyframe values.
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
   */
  constructor(name, times2, values, interpolation) {
    super(name, times2, values, interpolation);
  }
};
VectorKeyframeTrack.prototype.ValueTypeName = "vector";
var Cache = {
  /**
   * Whether caching is enabled or not.
   *
   * @static
   * @type {boolean}
   * @default false
   */
  enabled: false,
  /**
   * A dictionary that holds cached files.
   *
   * @static
   * @type {Object<string,Object>}
   */
  files: {},
  /**
   * Adds a cache entry with a key to reference the file. If this key already
   * holds a file, it is overwritten.
   *
   * @static
   * @param {string} key - The key to reference the cached file.
   * @param {Object} file -  The file to be cached.
   */
  add: function(key, file) {
    if (this.enabled === false) return;
    if (isBlobURL(key)) return;
    this.files[key] = file;
  },
  /**
   * Gets the cached value for the given key.
   *
   * @static
   * @param {string} key - The key to reference the cached file.
   * @return {Object|undefined} The cached file. If the key does not exist `undefined` is returned.
   */
  get: function(key) {
    if (this.enabled === false) return;
    if (isBlobURL(key)) return;
    return this.files[key];
  },
  /**
   * Removes the cached file associated with the given key.
   *
   * @static
   * @param {string} key - The key to reference the cached file.
   */
  remove: function(key) {
    delete this.files[key];
  },
  /**
   * Remove all values from the cache.
   *
   * @static
   */
  clear: function() {
    this.files = {};
  }
};
function isBlobURL(key) {
  try {
    const urlString = key.slice(key.indexOf(":") + 1);
    const url = new URL(urlString);
    return url.protocol === "blob:";
  } catch (e) {
    return false;
  }
}
var LoadingManager = class {
  /**
   * Constructs a new loading manager.
   *
   * @param {Function} [onLoad] - Executes when all items have been loaded.
   * @param {Function} [onProgress] - Executes when single items have been loaded.
   * @param {Function} [onError] - Executes when an error occurs.
   */
  constructor(onLoad, onProgress, onError) {
    const scope = this;
    let isLoading = false;
    let itemsLoaded = 0;
    let itemsTotal = 0;
    let urlModifier = void 0;
    const handlers = [];
    this.onStart = void 0;
    this.onLoad = onLoad;
    this.onProgress = onProgress;
    this.onError = onError;
    this._abortController = null;
    this.itemStart = function(url) {
      itemsTotal++;
      if (isLoading === false) {
        if (scope.onStart !== void 0) {
          scope.onStart(url, itemsLoaded, itemsTotal);
        }
      }
      isLoading = true;
    };
    this.itemEnd = function(url) {
      itemsLoaded++;
      if (scope.onProgress !== void 0) {
        scope.onProgress(url, itemsLoaded, itemsTotal);
      }
      if (itemsLoaded === itemsTotal) {
        isLoading = false;
        if (scope.onLoad !== void 0) {
          scope.onLoad();
        }
      }
    };
    this.itemError = function(url) {
      if (scope.onError !== void 0) {
        scope.onError(url);
      }
    };
    this.resolveURL = function(url) {
      url = url.normalize("NFC");
      if (urlModifier) {
        return urlModifier(url);
      }
      return url;
    };
    this.setURLModifier = function(transform) {
      urlModifier = transform;
      return this;
    };
    this.addHandler = function(regex, loader) {
      handlers.push(regex, loader);
      return this;
    };
    this.removeHandler = function(regex) {
      const index = handlers.indexOf(regex);
      if (index !== -1) {
        handlers.splice(index, 2);
      }
      return this;
    };
    this.getHandler = function(file) {
      for (let i = 0, l = handlers.length; i < l; i += 2) {
        const regex = handlers[i];
        const loader = handlers[i + 1];
        if (regex.global) regex.lastIndex = 0;
        if (regex.test(file)) {
          return loader;
        }
      }
      return null;
    };
    this.abort = function() {
      this.abortController.abort();
      this._abortController = null;
      return this;
    };
  }
  // TODO: Revert this back to a single member variable once this issue has been fixed
  // https://github.com/cloudflare/workerd/issues/3657
  /**
   * Used for aborting ongoing requests in loaders using this manager.
   *
   * @type {AbortController}
   */
  get abortController() {
    if (!this._abortController) {
      this._abortController = new AbortController();
    }
    return this._abortController;
  }
};
var DefaultLoadingManager = /* @__PURE__ */ new LoadingManager();
var Loader = class {
  /**
   * Constructs a new loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    this.manager = manager !== void 0 ? manager : DefaultLoadingManager;
    this.crossOrigin = "anonymous";
    this.withCredentials = false;
    this.path = "";
    this.resourcePath = "";
    this.requestHeader = {};
    this.priority = "auto";
    this.cache = "default";
    if (typeof __THREE_DEVTOOLS__ !== "undefined") {
      __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
    }
  }
  /**
   * This method needs to be implemented by all concrete loaders. It holds the
   * logic for loading assets from the backend.
   *
   * @abstract
   * @param {string} url - The path/URL of the file to be loaded.
   * @param {Function} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
   * @param {onErrorCallback} [onError] - Executed when errors occur.
   */
  load() {
  }
  /**
   * A async version of {@link Loader#load}.
   *
   * @param {string} url - The path/URL of the file to be loaded.
   * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
   * @return {Promise} A Promise that resolves when the asset has been loaded.
   */
  loadAsync(url, onProgress) {
    const scope = this;
    return new Promise(function(resolve, reject) {
      scope.load(url, resolve, onProgress, reject);
    });
  }
  /**
   * This method needs to be implemented by all concrete loaders. It holds the
   * logic for parsing the asset into three.js entities.
   *
   * @abstract
   * @param {any} data - The data to parse.
   */
  parse() {
  }
  /**
   * Sets the `crossOrigin` String to implement CORS for loading the URL
   * from a different domain that allows CORS.
   *
   * @param {string} crossOrigin - The `crossOrigin` value.
   * @return {Loader} A reference to this instance.
   */
  setCrossOrigin(crossOrigin) {
    this.crossOrigin = crossOrigin;
    return this;
  }
  /**
   * Whether the XMLHttpRequest uses credentials such as cookies, authorization
   * headers or TLS client certificates, see [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials).
   *
   * Note: This setting has no effect if you are loading files locally or from the same domain.
   *
   * @param {boolean} value - The `withCredentials` value.
   * @return {Loader} A reference to this instance.
   */
  setWithCredentials(value) {
    this.withCredentials = value;
    return this;
  }
  /**
   * Sets the base path for the asset.
   *
   * @param {string} path - The base path.
   * @return {Loader} A reference to this instance.
   */
  setPath(path) {
    this.path = path;
    return this;
  }
  /**
   * Sets the base path for dependent resources like textures.
   *
   * @param {string} resourcePath - The resource path.
   * @return {Loader} A reference to this instance.
   */
  setResourcePath(resourcePath) {
    this.resourcePath = resourcePath;
    return this;
  }
  /**
   * Sets the given request header.
   *
   * @param {Object} requestHeader - A [request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header)
   * for configuring the HTTP request.
   * @return {Loader} A reference to this instance.
   */
  setRequestHeader(requestHeader) {
    this.requestHeader = requestHeader;
    return this;
  }
  /**
   * Sets a browser scheduling hint. Browsers may ignore this hint.
   * Internally created loaders inherit it. Loaders supplied by the application
   * (for example decoder loaders or loading manager handlers) retain their own settings.
   *
   * @param {('high'|'low'|'auto')} value - The request priority hint.
   * @return {Loader} A reference to this instance.
   */
  setPriority(value) {
    this.priority = value;
    return this;
  }
  /**
   * Sets the HTTP cache mode for fetch requests. `no-cache` revalidates cached
   * responses; `no-store` bypasses the HTTP cache. This does not affect
   * {@link Cache} or image element requests.
   *
   * @param {('default'|'no-store'|'reload'|'no-cache'|'force-cache')} value - The HTTP cache mode.
   * @return {Loader} A reference to this instance.
   */
  setCache(value) {
    this.cache = value;
    return this;
  }
  /**
   * This method can be implemented in loaders for aborting ongoing requests.
   *
   * @abstract
   * @return {Loader} A reference to this instance.
   */
  abort() {
    return this;
  }
};
Loader.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var loading = {};
var HttpError = class extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
};
var FileLoader = class extends Loader {
  /**
   * Constructs a new file loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
    this.mimeType = "";
    this.responseType = "";
    this._abortController = new AbortController();
  }
  /**
   * Starts loading from the given URL and pass the loaded response to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(any)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
   * @param {onErrorCallback} [onError] - Executed when errors occur.
   */
  load(url, onLoad, onProgress, onError) {
    if (url === void 0) url = "";
    if (this.path !== void 0) url = this.path + url;
    url = this.manager.resolveURL(url);
    const cached = Cache.get(`file:${url}`);
    if (cached !== void 0) {
      this.manager.itemStart(url);
      setTimeout(() => {
        if (onLoad) onLoad(cached);
        this.manager.itemEnd(url);
      }, 0);
      return;
    }
    if (loading[url] !== void 0) {
      loading[url].push({
        onLoad,
        onProgress,
        onError
      });
      return;
    }
    loading[url] = [];
    loading[url].push({
      onLoad,
      onProgress,
      onError
    });
    const req = new Request(url, {
      headers: new Headers(this.requestHeader),
      credentials: this.withCredentials ? "include" : "same-origin",
      priority: this.priority,
      cache: this.cache,
      signal: typeof AbortSignal.any === "function" ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal
    });
    const mimeType = this.mimeType;
    const responseType = this.responseType;
    fetch(req).then((response) => {
      if (response.status === 200 || response.status === 0) {
        if (response.status === 0) {
          warn("FileLoader: HTTP Status 0 received.");
        }
        if (typeof ReadableStream === "undefined" || response.body === void 0 || response.body.getReader === void 0) {
          return response;
        }
        const callbacks = loading[url];
        const reader = response.body.getReader();
        const contentLength = response.headers.get("X-File-Size") || response.headers.get("Content-Length");
        const total = contentLength ? parseInt(contentLength) : 0;
        const lengthComputable = total !== 0;
        let loaded = 0;
        const stream = new ReadableStream({
          start(controller) {
            readData();
            function readData() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                } else {
                  loaded += value.byteLength;
                  const event = new ProgressEvent("progress", { lengthComputable, loaded, total });
                  for (let i = 0, il = callbacks.length; i < il; i++) {
                    const callback = callbacks[i];
                    if (callback.onProgress) callback.onProgress(event);
                  }
                  controller.enqueue(value);
                  readData();
                }
              }, (e) => {
                controller.error(e);
              });
            }
          }
        });
        return new Response(stream);
      } else {
        throw new HttpError(`fetch for "${response.url}" responded with ${response.status}: ${response.statusText}`, response);
      }
    }).then((response) => {
      switch (responseType) {
        case "arraybuffer":
          return response.arrayBuffer();
        case "blob":
          return response.blob();
        case "document":
          return response.text().then((text) => {
            const parser = new DOMParser();
            return parser.parseFromString(text, mimeType);
          });
        case "json":
          return response.json();
        default:
          if (mimeType === "") {
            return response.text();
          } else {
            const re = /charset="?([^;"\s]*)"?/i;
            const exec = re.exec(mimeType);
            const label = exec && exec[1] ? exec[1].toLowerCase() : void 0;
            const decoder = new TextDecoder(label);
            return response.arrayBuffer().then((ab) => decoder.decode(ab));
          }
      }
    }).then((data) => {
      Cache.add(`file:${url}`, data);
      const callbacks = loading[url];
      delete loading[url];
      for (let i = 0, il = callbacks.length; i < il; i++) {
        const callback = callbacks[i];
        if (callback.onLoad) callback.onLoad(data);
      }
    }).catch((err) => {
      const callbacks = loading[url];
      if (callbacks === void 0) {
        this.manager.itemError(url);
        throw err;
      }
      delete loading[url];
      for (let i = 0, il = callbacks.length; i < il; i++) {
        const callback = callbacks[i];
        if (callback.onError) callback.onError(err);
      }
      this.manager.itemError(url);
    }).finally(() => {
      this.manager.itemEnd(url);
    });
    this.manager.itemStart(url);
  }
  /**
   * Sets the expected response type.
   *
   * @param {('arraybuffer'|'blob'|'document'|'json'|'')} value - The response type.
   * @return {FileLoader} A reference to this file loader.
   */
  setResponseType(value) {
    this.responseType = value;
    return this;
  }
  /**
   * Sets the expected mime type of the loaded file.
   *
   * @param {string} value - The mime type.
   * @return {FileLoader} A reference to this file loader.
   */
  setMimeType(value) {
    this.mimeType = value;
    return this;
  }
  /**
   * Aborts ongoing fetch requests.
   *
   * @return {FileLoader} A reference to this instance.
   */
  abort() {
    this._abortController.abort();
    this._abortController = new AbortController();
    return this;
  }
};
var DataTextureLoader = class extends Loader {
  /**
   * Constructs a new data texture loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
  }
  /**
   * Starts loading from the given URL and passes the loaded data texture
   * to the `onLoad()` callback. The method also returns a new texture object which can
   * directly be used for material creation. If you do it this way, the texture
   * may pop up in your scene once the respective loading process is finished.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(DataTexture)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   * @return {DataTexture} The data texture.
   */
  load(url, onLoad, onProgress, onError) {
    const scope = this;
    const texture = new DataTexture();
    const loader = new FileLoader(this.manager);
    loader.setPriority(this.priority);
    loader.setCache(this.cache);
    loader.setResponseType("arraybuffer");
    loader.setRequestHeader(this.requestHeader);
    loader.setPath(this.path);
    loader.setWithCredentials(scope.withCredentials);
    loader.load(url, function(buffer) {
      let texData;
      try {
        texData = scope.parse(buffer);
      } catch (e) {
        if (onError !== void 0) {
          onError(e);
        } else {
          error(e);
        }
        return;
      }
      scope._applyTexData(texture, texData);
      if (onLoad) onLoad(texture, texData);
    }, onProgress, onError);
    return texture;
  }
  /**
   * Parses the given buffer and returns a configured data texture. Use this method
   * for parsing texture data that is already in memory (e.g. drag and drop or data
   * loaded from a server) without going through {@link DataTextureLoader#load}.
   *
   * @param {ArrayBuffer} buffer - The raw texture data.
   * @return {DataTexture} The data texture.
   */
  createDataTexture(buffer) {
    const texture = new DataTexture();
    this._applyTexData(texture, this.parse(buffer));
    return texture;
  }
  /**
   * Applies the given parsed texture data to the given data texture.
   *
   * @private
   * @param {DataTexture} texture - The data texture.
   * @param {DataTextureLoader~TexData} texData - The parsed texture data.
   */
  _applyTexData(texture, texData) {
    if (texData.image !== void 0) {
      texture.image = texData.image;
    } else if (texData.data !== void 0) {
      texture.image.width = texData.width;
      texture.image.height = texData.height;
      texture.image.data = texData.data;
    }
    texture.wrapS = texData.wrapS !== void 0 ? texData.wrapS : ClampToEdgeWrapping;
    texture.wrapT = texData.wrapT !== void 0 ? texData.wrapT : ClampToEdgeWrapping;
    texture.magFilter = texData.magFilter !== void 0 ? texData.magFilter : LinearFilter;
    texture.minFilter = texData.minFilter !== void 0 ? texData.minFilter : LinearFilter;
    texture.anisotropy = texData.anisotropy !== void 0 ? texData.anisotropy : 1;
    if (texData.colorSpace !== void 0) {
      texture.colorSpace = texData.colorSpace;
    }
    if (texData.flipY !== void 0) {
      texture.flipY = texData.flipY;
    }
    if (texData.format !== void 0) {
      texture.format = texData.format;
    }
    if (texData.type !== void 0) {
      texture.type = texData.type;
    }
    if (texData.mipmaps !== void 0) {
      texture.mipmaps = texData.mipmaps;
      texture.minFilter = LinearMipmapLinearFilter;
    }
    if (texData.mipmapCount === 1) {
      texture.minFilter = LinearFilter;
    }
    if (texData.generateMipmaps !== void 0) {
      texture.generateMipmaps = texData.generateMipmaps;
    }
    texture.needsUpdate = true;
  }
};
var _position$2 = /* @__PURE__ */ new Vector3();
var _quaternion$2 = /* @__PURE__ */ new Quaternion();
var _scale$2 = /* @__PURE__ */ new Vector3();
var Camera = class extends Object3D {
  /**
   * Constructs a new camera.
   */
  constructor() {
    super();
    this.isCamera = true;
    this.type = "Camera";
    this.matrixWorldInverse = new Matrix4();
    this.projectionMatrix = new Matrix4();
    this.projectionMatrixInverse = new Matrix4();
    this.coordinateSystem = WebGLCoordinateSystem;
    this._reversedDepth = false;
  }
  /**
   * The flag that indicates whether the camera uses a reversed depth buffer.
   *
   * @type {boolean}
   * @default false
   */
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(source, recursive) {
    super.copy(source, recursive);
    this.matrixWorldInverse.copy(source.matrixWorldInverse);
    this.projectionMatrix.copy(source.projectionMatrix);
    this.projectionMatrixInverse.copy(source.projectionMatrixInverse);
    this.coordinateSystem = source.coordinateSystem;
    return this;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * This method is overwritten since cameras have a different forward vector compared to other
   * 3D objects. A camera looks down its local, negative z-axis by default.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(target) {
    return super.getWorldDirection(target).negate();
  }
  updateMatrixWorld(force) {
    super.updateMatrixWorld(force);
    this.matrixWorld.decompose(_position$2, _quaternion$2, _scale$2);
    if (_scale$2.x === 1 && _scale$2.y === 1 && _scale$2.z === 1) {
      this.matrixWorldInverse.copy(this.matrixWorld).invert();
    } else {
      this.matrixWorldInverse.compose(_position$2, _quaternion$2, _scale$2.set(1, 1, 1)).invert();
    }
  }
  updateWorldMatrix(updateParents, updateChildren, force = false) {
    super.updateWorldMatrix(updateParents, updateChildren, force);
    this.matrixWorld.decompose(_position$2, _quaternion$2, _scale$2);
    if (_scale$2.x === 1 && _scale$2.y === 1 && _scale$2.z === 1) {
      this.matrixWorldInverse.copy(this.matrixWorld).invert();
    } else {
      this.matrixWorldInverse.compose(_position$2, _quaternion$2, _scale$2.set(1, 1, 1)).invert();
    }
  }
  clone() {
    return new this.constructor().copy(this);
  }
};
var _v3$1 = /* @__PURE__ */ new Vector3();
var _minTarget = /* @__PURE__ */ new Vector2();
var _maxTarget = /* @__PURE__ */ new Vector2();
var PerspectiveCamera = class extends Camera {
  /**
   * Constructs a new perspective camera.
   *
   * @param {number} [fov=50] - The vertical field of view.
   * @param {number} [aspect=1] - The aspect ratio.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(fov = 50, aspect = 1, near = 0.1, far = 2e3) {
    super();
    this.isPerspectiveCamera = true;
    this.type = "PerspectiveCamera";
    this.fov = fov;
    this.zoom = 1;
    this.near = near;
    this.far = far;
    this.focus = 10;
    this.aspect = aspect;
    this.view = null;
    this.filmGauge = 35;
    this.filmOffset = 0;
    this.updateProjectionMatrix();
  }
  copy(source, recursive) {
    super.copy(source, recursive);
    this.fov = source.fov;
    this.zoom = source.zoom;
    this.near = source.near;
    this.far = source.far;
    this.focus = source.focus;
    this.aspect = source.aspect;
    this.view = source.view === null ? null : Object.assign({}, source.view);
    this.filmGauge = source.filmGauge;
    this.filmOffset = source.filmOffset;
    return this;
  }
  /**
   * Sets the FOV by focal length in respect to the current {@link PerspectiveCamera#filmGauge}.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * @param {number} focalLength - Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(focalLength) {
    const vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;
    this.fov = RAD2DEG * 2 * Math.atan(vExtentSlope);
    this.updateProjectionMatrix();
  }
  /**
   * Returns the focal length from the current {@link PerspectiveCamera#fov} and
   * {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The computed focal length.
   */
  getFocalLength() {
    const vExtentSlope = Math.tan(DEG2RAD * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / vExtentSlope;
  }
  /**
   * Returns the current vertical field of view angle in degrees considering {@link PerspectiveCamera#zoom}.
   *
   * @return {number} The effective FOV.
   */
  getEffectiveFOV() {
    return RAD2DEG * 2 * Math.atan(
      Math.tan(DEG2RAD * 0.5 * this.fov) / this.zoom
    );
  }
  /**
   * Returns the width of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  /**
   * Returns the height of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets `minTarget` and `maxTarget` to the coordinates of the lower-left and upper-right corners of the view rectangle.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} minTarget - The lower-left corner of the view rectangle is written into this vector.
   * @param {Vector2} maxTarget - The upper-right corner of the view rectangle is written into this vector.
   */
  getViewBounds(distance, minTarget, maxTarget) {
    _v3$1.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse);
    minTarget.set(_v3$1.x, _v3$1.y).multiplyScalar(-distance / _v3$1.z);
    _v3$1.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse);
    maxTarget.set(_v3$1.x, _v3$1.y).multiplyScalar(-distance / _v3$1.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} target - The target vector that is used to store result where x is width and y is height.
   * @returns {Vector2} The view size.
   */
  getViewSize(distance, target) {
    this.getViewBounds(distance, _minTarget, _maxTarget);
    return target.subVectors(_maxTarget, _minTarget);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *```
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *```
   * then for each monitor you would call it like this:
   *```js
   * const w = 1920;
   * const h = 1080;
   * const fullWidth = w * 3;
   * const fullHeight = h * 2;
   *
   * // --A--
   * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   * // --B--
   * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   * // --C--
   * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   * // --D--
   * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   * // --E--
   * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   * // --F--
   * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   * ```
   *
   * Note there is no reason monitors have to be the same size or in a grid.
   *
   * @param {number} fullWidth - The full width of multiview setup.
   * @param {number} fullHeight - The full height of multiview setup.
   * @param {number} x - The horizontal offset of the subcamera.
   * @param {number} y - The vertical offset of the subcamera.
   * @param {number} width - The width of subcamera.
   * @param {number} height - The height of subcamera.
   */
  setViewOffset(fullWidth, fullHeight, x, y, width, height) {
    this.aspect = fullWidth / fullHeight;
    if (this.view === null) {
      this.view = {
        enabled: true,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      };
    }
    this.view.enabled = true;
    this.view.fullWidth = fullWidth;
    this.view.fullHeight = fullHeight;
    this.view.offsetX = x;
    this.view.offsetY = y;
    this.view.width = width;
    this.view.height = height;
    this.updateProjectionMatrix();
  }
  /**
   * Removes the view offset from the projection matrix.
   */
  clearViewOffset() {
    if (this.view !== null) {
      this.view.enabled = false;
    }
    this.updateProjectionMatrix();
  }
  /**
   * Updates the camera's projection matrix. Must be called after any change of
   * camera properties.
   */
  updateProjectionMatrix() {
    const near = this.near;
    let top = near * Math.tan(DEG2RAD * 0.5 * this.fov) / this.zoom;
    let height = 2 * top;
    let width = this.aspect * height;
    let left = -0.5 * width;
    const view = this.view;
    if (this.view !== null && this.view.enabled) {
      const fullWidth = view.fullWidth, fullHeight = view.fullHeight;
      left += view.offsetX * width / fullWidth;
      top -= view.offsetY * height / fullHeight;
      width *= view.width / fullWidth;
      height *= view.height / fullHeight;
    }
    const skew = this.filmOffset;
    if (skew !== 0) left += near * skew / this.getFilmWidth();
    this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far, this.coordinateSystem, this.reversedDepth);
    this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    data.object.fov = this.fov;
    data.object.zoom = this.zoom;
    data.object.near = this.near;
    data.object.far = this.far;
    data.object.focus = this.focus;
    data.object.aspect = this.aspect;
    if (this.view !== null) data.object.view = Object.assign({}, this.view);
    data.object.filmGauge = this.filmGauge;
    data.object.filmOffset = this.filmOffset;
    return data;
  }
};
var OrthographicCamera = class extends Camera {
  /**
   * Constructs a new orthographic camera.
   *
   * @param {number} [left=-1] - The left plane of the camera's frustum.
   * @param {number} [right=1] - The right plane of the camera's frustum.
   * @param {number} [top=1] - The top plane of the camera's frustum.
   * @param {number} [bottom=-1] - The bottom plane of the camera's frustum.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(left = -1, right = 1, top = 1, bottom = -1, near = 0.1, far = 2e3) {
    super();
    this.isOrthographicCamera = true;
    this.type = "OrthographicCamera";
    this.zoom = 1;
    this.view = null;
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.near = near;
    this.far = far;
    this.updateProjectionMatrix();
  }
  copy(source, recursive) {
    super.copy(source, recursive);
    this.left = source.left;
    this.right = source.right;
    this.top = source.top;
    this.bottom = source.bottom;
    this.near = source.near;
    this.far = source.far;
    this.zoom = source.zoom;
    this.view = source.view === null ? null : Object.assign({}, source.view);
    return this;
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * @param {number} fullWidth - The full width of multiview setup.
   * @param {number} fullHeight - The full height of multiview setup.
   * @param {number} x - The horizontal offset of the subcamera.
   * @param {number} y - The vertical offset of the subcamera.
   * @param {number} width - The width of subcamera.
   * @param {number} height - The height of subcamera.
   * @see {@link PerspectiveCamera#setViewOffset}
   */
  setViewOffset(fullWidth, fullHeight, x, y, width, height) {
    if (this.view === null) {
      this.view = {
        enabled: true,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      };
    }
    this.view.enabled = true;
    this.view.fullWidth = fullWidth;
    this.view.fullHeight = fullHeight;
    this.view.offsetX = x;
    this.view.offsetY = y;
    this.view.width = width;
    this.view.height = height;
    this.updateProjectionMatrix();
  }
  /**
   * Removes the view offset from the projection matrix.
   */
  clearViewOffset() {
    if (this.view !== null) {
      this.view.enabled = false;
    }
    this.updateProjectionMatrix();
  }
  /**
   * Updates the camera's projection matrix. Must be called after any change of
   * camera properties.
   */
  updateProjectionMatrix() {
    const dx = (this.right - this.left) / (2 * this.zoom);
    const dy = (this.top - this.bottom) / (2 * this.zoom);
    const cx = (this.right + this.left) / 2;
    const cy = (this.top + this.bottom) / 2;
    let left = cx - dx;
    let right = cx + dx;
    let top = cy + dy;
    let bottom = cy - dy;
    if (this.view !== null && this.view.enabled) {
      const scaleW = (this.right - this.left) / this.view.fullWidth / this.zoom;
      const scaleH = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      left += scaleW * this.view.offsetX;
      right = left + scaleW * this.view.width;
      top -= scaleH * this.view.offsetY;
      bottom = top - scaleH * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far, this.coordinateSystem, this.reversedDepth);
    this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    data.object.zoom = this.zoom;
    data.object.left = this.left;
    data.object.right = this.right;
    data.object.top = this.top;
    data.object.bottom = this.bottom;
    data.object.near = this.near;
    data.object.far = this.far;
    if (this.view !== null) data.object.view = Object.assign({}, this.view);
    return data;
  }
};
var _RESERVED_CHARS_RE = "\\[\\]\\.:\\/";
var _reservedRe = new RegExp("[" + _RESERVED_CHARS_RE + "]", "g");
var _wordChar = "[^" + _RESERVED_CHARS_RE + "]";
var _wordCharOrDot = "[^" + _RESERVED_CHARS_RE.replace("\\.", "") + "]";
var _directoryRe = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", _wordChar);
var _nodeRe = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", _wordCharOrDot);
var _objectRe = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", _wordChar);
var _propertyRe = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", _wordChar);
var _trackRe = new RegExp(
  "^" + _directoryRe + _nodeRe + _objectRe + _propertyRe + "$"
);
var _supportedObjectNames = ["material", "materials", "bones", "map"];
var Composite = class {
  constructor(targetGroup, path, optionalParsedPath) {
    const parsedPath = optionalParsedPath || PropertyBinding.parseTrackName(path);
    this._targetGroup = targetGroup;
    this._bindings = targetGroup.subscribe_(path, parsedPath);
  }
  getValue(array2, offset) {
    this.bind();
    const firstValidIndex = this._targetGroup.nCachedObjects_, binding = this._bindings[firstValidIndex];
    if (binding !== void 0) binding.getValue(array2, offset);
  }
  setValue(array2, offset) {
    const bindings = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i) {
      bindings[i].setValue(array2, offset);
    }
  }
  bind() {
    const bindings = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i) {
      bindings[i].bind();
    }
  }
  unbind() {
    const bindings = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i) {
      bindings[i].unbind();
    }
  }
};
var PropertyBinding = class _PropertyBinding {
  /**
   * Constructs a new property binding.
   *
   * @param {Object} rootNode - The root node.
   * @param {string} path - The path.
   * @param {?Object} [parsedPath] - The parsed path.
   */
  constructor(rootNode, path, parsedPath) {
    this.path = path;
    this.parsedPath = parsedPath || _PropertyBinding.parseTrackName(path);
    this.node = _PropertyBinding.findNode(rootNode, this.parsedPath.nodeName);
    this.rootNode = rootNode;
    this.getValue = this._getValue_unbound;
    this.setValue = this._setValue_unbound;
  }
  /**
   * Factory method for creating a property binding from the given parameters.
   *
   * @static
   * @param {Object} root - The root node.
   * @param {string} path - The path.
   * @param {?Object} [parsedPath] - The parsed path.
   * @return {PropertyBinding|Composite} The created property binding or composite.
   */
  static create(root, path, parsedPath) {
    if (!(root && root.isAnimationObjectGroup)) {
      return new _PropertyBinding(root, path, parsedPath);
    } else {
      return new _PropertyBinding.Composite(root, path, parsedPath);
    }
  }
  /**
   * Replaces spaces with underscores and removes unsupported characters from
   * node names, to ensure compatibility with parseTrackName().
   *
   * @param {string} name - Node name to be sanitized.
   * @return {string} The sanitized node name.
   */
  static sanitizeNodeName(name) {
    return name.replace(/\s/g, "_").replace(_reservedRe, "");
  }
  /**
   * Parses the given track name (an object path to an animated property) and
   * returns an object with information about the path. Matches strings in the following forms:
   *
   * - nodeName.property
   * - nodeName.property[accessor]
   * - nodeName.material.property[accessor]
   * - uuid.property[accessor]
   * - uuid.objectName[objectIndex].propertyName[propertyIndex]
   * - parentName/nodeName.property
   * - parentName/parentName/nodeName.property[index]
   * - .bone[Armature.DEF_cog].position
   * - scene:helium_balloon_model:helium_balloon_model.position
   *
   * @static
   * @param {string} trackName - The track name to parse.
   * @return {Object} The parsed track name as an object.
   */
  static parseTrackName(trackName) {
    const matches = _trackRe.exec(trackName);
    if (matches === null) {
      throw new Error("THREE.PropertyBinding: Cannot parse trackName: " + trackName);
    }
    const results = {
      // directoryName: matches[ 1 ], // (tschw) currently unused
      nodeName: matches[2],
      objectName: matches[3],
      objectIndex: matches[4],
      propertyName: matches[5],
      // required
      propertyIndex: matches[6]
    };
    const lastDot = results.nodeName && results.nodeName.lastIndexOf(".");
    if (lastDot !== void 0 && lastDot !== -1) {
      const objectName = results.nodeName.substring(lastDot + 1);
      if (_supportedObjectNames.indexOf(objectName) !== -1) {
        results.nodeName = results.nodeName.substring(0, lastDot);
        results.objectName = objectName;
      }
    }
    if (results.propertyName === null || results.propertyName.length === 0) {
      throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + trackName);
    }
    return results;
  }
  /**
   * Searches for a node in the hierarchy of the given root object by the given
   * node name.
   *
   * @static
   * @param {Object} root - The root object.
   * @param {string|number} nodeName - The name of the node.
   * @return {?Object} The found node. Returns `null` if no object was found.
   */
  static findNode(root, nodeName) {
    if (nodeName === void 0 || nodeName === "" || nodeName === "." || nodeName === -1 || nodeName === root.name || nodeName === root.uuid) {
      return root;
    }
    if (root.skeleton) {
      const bone = root.skeleton.getBoneByName(nodeName);
      if (bone !== void 0) {
        return bone;
      }
    }
    if (root.children) {
      const searchNodeSubtree = function(children) {
        for (let i = 0; i < children.length; i++) {
          const childNode = children[i];
          if (childNode.name === nodeName || childNode.uuid === nodeName) {
            return childNode;
          }
          const result = searchNodeSubtree(childNode.children);
          if (result) return result;
        }
        return null;
      };
      const subTreeNode = searchNodeSubtree(root.children);
      if (subTreeNode) {
        return subTreeNode;
      }
    }
    return null;
  }
  // these are used to "bind" a nonexistent property
  _getValue_unavailable() {
  }
  _setValue_unavailable() {
  }
  // Getters
  _getValue_direct(buffer, offset) {
    buffer[offset] = this.targetObject[this.propertyName];
  }
  _getValue_array(buffer, offset) {
    const source = this.resolvedProperty;
    for (let i = 0, n = source.length; i !== n; ++i) {
      buffer[offset++] = source[i];
    }
  }
  _getValue_arrayElement(buffer, offset) {
    buffer[offset] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(buffer, offset) {
    this.resolvedProperty.toArray(buffer, offset);
  }
  // Direct
  _setValue_direct(buffer, offset) {
    this.targetObject[this.propertyName] = buffer[offset];
  }
  _setValue_direct_setNeedsUpdate(buffer, offset) {
    this.targetObject[this.propertyName] = buffer[offset];
    this.targetObject.needsUpdate = true;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(buffer, offset) {
    this.targetObject[this.propertyName] = buffer[offset];
    this.targetObject.matrixWorldNeedsUpdate = true;
  }
  // EntireArray
  _setValue_array(buffer, offset) {
    const dest = this.resolvedProperty;
    for (let i = 0, n = dest.length; i !== n; ++i) {
      dest[i] = buffer[offset++];
    }
  }
  _setValue_array_setNeedsUpdate(buffer, offset) {
    const dest = this.resolvedProperty;
    for (let i = 0, n = dest.length; i !== n; ++i) {
      dest[i] = buffer[offset++];
    }
    this.targetObject.needsUpdate = true;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(buffer, offset) {
    const dest = this.resolvedProperty;
    for (let i = 0, n = dest.length; i !== n; ++i) {
      dest[i] = buffer[offset++];
    }
    this.targetObject.matrixWorldNeedsUpdate = true;
  }
  // ArrayElement
  _setValue_arrayElement(buffer, offset) {
    this.resolvedProperty[this.propertyIndex] = buffer[offset];
  }
  _setValue_arrayElement_setNeedsUpdate(buffer, offset) {
    this.resolvedProperty[this.propertyIndex] = buffer[offset];
    this.targetObject.needsUpdate = true;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(buffer, offset) {
    this.resolvedProperty[this.propertyIndex] = buffer[offset];
    this.targetObject.matrixWorldNeedsUpdate = true;
  }
  // HasToFromArray
  _setValue_fromArray(buffer, offset) {
    this.resolvedProperty.fromArray(buffer, offset);
  }
  _setValue_fromArray_setNeedsUpdate(buffer, offset) {
    this.resolvedProperty.fromArray(buffer, offset);
    this.targetObject.needsUpdate = true;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(buffer, offset) {
    this.resolvedProperty.fromArray(buffer, offset);
    this.targetObject.matrixWorldNeedsUpdate = true;
  }
  _getValue_unbound(targetArray, offset) {
    this.bind();
    this.getValue(targetArray, offset);
  }
  _setValue_unbound(sourceArray, offset) {
    this.bind();
    this.setValue(sourceArray, offset);
  }
  /**
   * Creates a getter / setter pair for the property tracked by this binding.
   */
  bind() {
    let targetObject = this.node;
    const parsedPath = this.parsedPath;
    const objectName = parsedPath.objectName;
    const propertyName = parsedPath.propertyName;
    let propertyIndex = parsedPath.propertyIndex;
    if (!targetObject) {
      targetObject = _PropertyBinding.findNode(this.rootNode, parsedPath.nodeName);
      this.node = targetObject;
    }
    this.getValue = this._getValue_unavailable;
    this.setValue = this._setValue_unavailable;
    if (!targetObject) {
      warn("PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (objectName) {
      let objectIndex = parsedPath.objectIndex;
      switch (objectName) {
        case "materials":
          if (!targetObject.material) {
            error("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!targetObject.material.materials) {
            error("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          targetObject = targetObject.material.materials;
          break;
        case "bones":
          if (!targetObject.skeleton) {
            error("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          targetObject = targetObject.skeleton.bones;
          for (let i = 0; i < targetObject.length; i++) {
            if (targetObject[i].name === objectIndex) {
              objectIndex = i;
              break;
            }
          }
          break;
        case "map":
          if ("map" in targetObject) {
            targetObject = targetObject.map;
            break;
          }
          if (!targetObject.material) {
            error("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!targetObject.material.map) {
            error("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return;
          }
          targetObject = targetObject.material.map;
          break;
        default:
          if (targetObject[objectName] === void 0) {
            error("PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          targetObject = targetObject[objectName];
      }
      if (objectIndex !== void 0) {
        if (targetObject[objectIndex] === void 0) {
          error("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, targetObject);
          return;
        }
        targetObject = targetObject[objectIndex];
      }
    }
    const nodeProperty = targetObject[propertyName];
    if (nodeProperty === void 0) {
      const nodeName = parsedPath.nodeName;
      error("PropertyBinding: Trying to update property for track: " + nodeName + "." + propertyName + " but it wasn't found.", targetObject);
      return;
    }
    let versioning = this.Versioning.None;
    this.targetObject = targetObject;
    if (targetObject.isMaterial === true) {
      versioning = this.Versioning.NeedsUpdate;
    } else if (targetObject.isObject3D === true) {
      versioning = this.Versioning.MatrixWorldNeedsUpdate;
    }
    let bindingType = this.BindingType.Direct;
    if (propertyIndex !== void 0) {
      if (propertyName === "morphTargetInfluences") {
        if (!targetObject.geometry) {
          error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!targetObject.geometry.morphAttributes) {
          error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        if (targetObject.morphTargetDictionary[propertyIndex] !== void 0) {
          propertyIndex = targetObject.morphTargetDictionary[propertyIndex];
        }
      }
      bindingType = this.BindingType.ArrayElement;
      this.resolvedProperty = nodeProperty;
      this.propertyIndex = propertyIndex;
    } else if (nodeProperty.fromArray !== void 0 && nodeProperty.toArray !== void 0) {
      bindingType = this.BindingType.HasFromToArray;
      this.resolvedProperty = nodeProperty;
    } else if (Array.isArray(nodeProperty)) {
      bindingType = this.BindingType.EntireArray;
      this.resolvedProperty = nodeProperty;
    } else {
      this.propertyName = propertyName;
    }
    this.getValue = this.GetterByBindingType[bindingType];
    this.setValue = this.SetterByBindingTypeAndVersioning[bindingType][versioning];
  }
  /**
   * Unbinds the property.
   */
  unbind() {
    this.node = null;
    this.getValue = this._getValue_unbound;
    this.setValue = this._setValue_unbound;
  }
};
PropertyBinding.Composite = Composite;
PropertyBinding.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
PropertyBinding.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
PropertyBinding.prototype.GetterByBindingType = [
  PropertyBinding.prototype._getValue_direct,
  PropertyBinding.prototype._getValue_array,
  PropertyBinding.prototype._getValue_arrayElement,
  PropertyBinding.prototype._getValue_toArray
];
PropertyBinding.prototype.SetterByBindingTypeAndVersioning = [
  [
    // Direct
    PropertyBinding.prototype._setValue_direct,
    PropertyBinding.prototype._setValue_direct_setNeedsUpdate,
    PropertyBinding.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    // EntireArray
    PropertyBinding.prototype._setValue_array,
    PropertyBinding.prototype._setValue_array_setNeedsUpdate,
    PropertyBinding.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    // ArrayElement
    PropertyBinding.prototype._setValue_arrayElement,
    PropertyBinding.prototype._setValue_arrayElement_setNeedsUpdate,
    PropertyBinding.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    // HasToFromArray
    PropertyBinding.prototype._setValue_fromArray,
    PropertyBinding.prototype._setValue_fromArray_setNeedsUpdate,
    PropertyBinding.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
var _controlInterpolantsResultBuffer = new Float32Array(1);
var Matrix2 = class {
  static {
    this.prototype.isMatrix2 = true;
  }
  /**
   * Constructs a new 2x2 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   */
  constructor(n11, n12, n21, n22) {
    this.elements = [
      1,
      0,
      0,
      1
    ];
    if (n11 !== void 0) {
      this.set(n11, n12, n21, n22);
    }
  }
  /**
   * Sets this matrix to the 2x2 identity matrix.
   *
   * @return {Matrix2} A reference to this matrix.
   */
  identity() {
    this.set(
      1,
      0,
      0,
      1
    );
    return this;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix2} A reference to this matrix.
   */
  fromArray(array2, offset = 0) {
    for (let i = 0; i < 4; i++) {
      this.elements[i] = array2[i + offset];
    }
    return this;
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} n11 - 1-1 matrix element.
   * @param {number} n12 - 1-2 matrix element.
   * @param {number} n21 - 2-1 matrix element.
   * @param {number} n22 - 2-2 matrix element.
   * @return {Matrix2} A reference to this matrix.
   */
  set(n11, n12, n21, n22) {
    const te = this.elements;
    te[0] = n11;
    te[2] = n12;
    te[1] = n21;
    te[3] = n22;
    return this;
  }
};
if (typeof __THREE_DEVTOOLS__ !== "undefined") {
  __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
    revision: REVISION
  } }));
}
if (typeof window !== "undefined") {
  if (window.__THREE__) {
    warn("WARNING: Multiple instances of Three.js being imported.");
  } else {
    window.__THREE__ = REVISION;
  }
}

// ../../../../../tmp/one-phase-cpu-render/three/package/build/three.module.js
var alphahash_fragment = "#ifdef USE_ALPHAHASH\n	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif";
var alphahash_pars_fragment = "#ifdef USE_ALPHAHASH\n	const float ALPHA_HASH_SCALE = 0.05;\n	float hash2D( vec2 value ) {\n		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n	}\n	float hash3D( vec3 value ) {\n		return hash2D( vec2( hash2D( value.xy ), value.z ) );\n	}\n	float getAlphaHashThreshold( vec3 position ) {\n		float maxDeriv = max(\n			length( dFdx( position.xyz ) ),\n			length( dFdy( position.xyz ) )\n		);\n		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n		vec2 pixScales = vec2(\n			exp2( floor( log2( pixScale ) ) ),\n			exp2( ceil( log2( pixScale ) ) )\n		);\n		vec2 alpha = vec2(\n			hash3D( floor( pixScales.x * position.xyz ) ),\n			hash3D( floor( pixScales.y * position.xyz ) )\n		);\n		float lerpFactor = fract( log2( pixScale ) );\n		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n		float a = min( lerpFactor, 1.0 - lerpFactor );\n		vec3 cases = vec3(\n			x * x / ( 2.0 * a * ( 1.0 - a ) ),\n			( x - 0.5 * a ) / ( 1.0 - a ),\n			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n		);\n		float threshold = ( x < ( 1.0 - a ) )\n			? ( ( x < a ) ? cases.x : cases.y )\n			: cases.z;\n		return clamp( threshold , 1.0e-6, 1.0 );\n	}\n#endif";
var alphamap_fragment = "#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif";
var alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif";
var alphatest_fragment = "#ifdef USE_ALPHATEST\n	#ifdef ALPHA_TO_COVERAGE\n	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n	if ( diffuseColor.a == 0.0 ) discard;\n	#else\n	if ( diffuseColor.a < alphaTest ) discard;\n	#endif\n#endif";
var alphatest_pars_fragment = "#ifdef USE_ALPHATEST\n	uniform float alphaTest;\n#endif";
var aomap_fragment = "#ifdef USE_AOMAP\n	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n	reflectedLight.indirectDiffuse *= ambientOcclusion;\n	#if defined( USE_CLEARCOAT ) \n		clearcoatSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_SHEEN ) \n		sheenSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD )\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n	#endif\n#endif";
var aomap_pars_fragment = "#ifdef USE_AOMAP\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n#endif";
var batching_pars_vertex = "#ifdef USE_BATCHING\n	#if ! defined( GL_ANGLE_multi_draw )\n	#define gl_DrawID _gl_DrawID\n	uniform int _gl_DrawID;\n	#endif\n	uniform highp sampler2D batchingTexture;\n	uniform highp usampler2D batchingIdTexture;\n	mat4 getBatchingMatrix( const in float i ) {\n		int size = textureSize( batchingTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n	float getIndirectIndex( const in int i ) {\n		int size = textureSize( batchingIdTexture, 0 ).x;\n		int x = i % size;\n		int y = i / size;\n		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n	}\n#endif\n#ifdef USE_BATCHING_COLOR\n	uniform sampler2D batchingColorTexture;\n	vec4 getBatchingColor( const in float i ) {\n		int size = textureSize( batchingColorTexture, 0 ).x;\n		int j = int( i );\n		int x = j % size;\n		int y = j / size;\n		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );\n	}\n#endif";
var batching_vertex = "#ifdef USE_BATCHING\n	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif";
var begin_vertex = "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n	vPosition = vec3( position );\n#endif";
var beginnormal_vertex = "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n	vec3 objectTangent = vec3( tangent.xyz );\n#endif";
var bsdfs = "float G_BlinnPhong_Implicit( ) {\n	return 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( specularColor, 1.0, dotVH );\n	float G = G_BlinnPhong_Implicit( );\n	float D = D_BlinnPhong( shininess, dotNH );\n	return F * ( G * D );\n} // validated";
var iridescence_fragment = "#ifdef USE_IRIDESCENCE\n	const mat3 XYZ_TO_REC709 = mat3(\n		 3.2404542, -0.9692660,  0.0556434,\n		-1.5371385,  1.8760108, -0.2040259,\n		-0.4985314,  0.0415560,  1.0572252\n	);\n	vec3 Fresnel0ToIor( vec3 fresnel0 ) {\n		vec3 sqrtF0 = sqrt( fresnel0 );\n		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n	}\n	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n	}\n	float IorToFresnel0( float transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n	}\n	vec3 evalSensitivity( float OPD, vec3 shift ) {\n		float phase = 2.0 * PI * OPD * 1.0e-9;\n		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n		xyz /= 1.0685e-7;\n		vec3 rgb = XYZ_TO_REC709 * xyz;\n		return rgb;\n	}\n	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n		vec3 I;\n		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n		float cosTheta2Sq = 1.0 - sinTheta2Sq;\n		if ( cosTheta2Sq < 0.0 ) {\n			return vec3( 1.0 );\n		}\n		float cosTheta2 = sqrt( cosTheta2Sq );\n		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n		float R12 = F_Schlick( R0, 1.0, cosTheta1 );\n		float T121 = 1.0 - R12;\n		float phi12 = 0.0;\n		if ( iridescenceIOR < outsideIOR ) phi12 = PI;\n		float phi21 = PI - phi12;\n		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n		vec3 phi23 = vec3( 0.0 );\n		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n		vec3 phi = vec3( phi21 ) + phi23;\n		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n		vec3 r123 = sqrt( R123 );\n		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n		vec3 C0 = R12 + Rs;\n		I = C0;\n		vec3 Cm = Rs - T121;\n		for ( int m = 1; m <= 2; ++ m ) {\n			Cm *= r123;\n			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n			I += Cm * Sm;\n		}\n		return max( I, vec3( 0.0 ) );\n	}\n#endif";
var bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vBumpMapUv );\n		vec2 dSTdy = dFdy( vBumpMapUv );\n		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 ) * faceDirection;\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif";
var clipping_planes_fragment = "#if NUM_CLIPPING_PLANES > 0\n	vec4 plane;\n	#ifdef ALPHA_TO_COVERAGE\n		float distanceToPlane, distanceGradient;\n		float clipOpacity = 1.0;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n			distanceGradient = fwidth( distanceToPlane ) / 2.0;\n			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			if ( clipOpacity == 0.0 ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			float unionClipOpacity = 1.0;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n				distanceGradient = fwidth( distanceToPlane ) / 2.0;\n				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			}\n			#pragma unroll_loop_end\n			clipOpacity *= 1.0 - unionClipOpacity;\n		#endif\n		diffuseColor.a *= clipOpacity;\n		if ( diffuseColor.a == 0.0 ) discard;\n	#else\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			bool clipped = true;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n			}\n			#pragma unroll_loop_end\n			if ( clipped ) discard;\n		#endif\n	#endif\n#endif";
var clipping_planes_pars_fragment = "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif";
var clipping_planes_pars_vertex = "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n#endif";
var clipping_planes_vertex = "#if NUM_CLIPPING_PLANES > 0\n	vClipPosition = - mvPosition.xyz;\n#endif";
var color_fragment = "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	diffuseColor *= vColor;\n#endif";
var color_pars_fragment = "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#endif";
var color_pars_vertex = "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	varying vec4 vColor;\n#endif";
var color_vertex = "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	vColor = vec4( 1.0 );\n#endif\n#ifdef USE_COLOR_ALPHA\n	vColor *= color;\n#elif defined( USE_COLOR )\n	vColor.rgb *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n	vColor.rgb *= instanceColor.rgb;\n#endif\n#ifdef USE_BATCHING_COLOR\n	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );\n#endif";
var common = "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n	const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n	return fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n	float precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n	float precisionSafeLength( vec3 v ) {\n		float maxComponent = max3( abs( v ) );\n		return length( v / maxComponent ) * maxComponent;\n	}\n#endif\nstruct IncidentLight {\n	vec3 color;\n	vec3 direction;\n	bool visible;\n};\nstruct ReflectedLight {\n	vec3 directDiffuse;\n	vec3 directSpecular;\n	vec3 indirectDiffuse;\n	vec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n	varying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\n#define inverseTransformDirection transformDirectionByInverseViewMatrix\nvec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {\n	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );\n}\nvec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {\n	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n	return m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n	return vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n	return RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated";
var defaultnormal_vertex = "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n	vec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n	mat3 bm = mat3( batchingMatrix );\n	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n	transformedNormal = bm * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = bm * transformedTangent;\n	#endif\n#endif\n#ifdef USE_INSTANCING\n	mat3 im = mat3( instanceMatrix );\n	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n	transformedNormal = im * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = im * transformedTangent;\n	#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n	transformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n#endif";
var displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n#endif";
var displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif";
var emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n		emissiveColor = sRGBTransferEOTF( emissiveColor );\n	#endif\n	totalEmissiveRadiance *= emissiveColor.rgb;\n#endif";
var emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n	uniform sampler2D emissiveMap;\n#endif";
var colorspace_fragment = "gl_FragColor = linearToOutputTexel( gl_FragColor );";
var colorspace_pars_fragment = "vec4 LinearTransferOETF( in vec4 value ) {\n	return value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}";
var envmap_fragment = "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vec3 cameraToFrag;\n		if ( isOrthographic ) {\n			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToFrag = normalize( vWorldPosition - cameraPosition );\n		}\n		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( cameraToFrag, worldNormal );\n		#else\n			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n		#endif\n	#else\n		vec3 reflectVec = vReflect;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );\n		#ifdef ENVMAP_BLENDING_MULTIPLY\n			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_MIX )\n			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_ADD )\n			outgoingLight += envColor.xyz * specularStrength * reflectivity;\n		#endif\n	#endif\n#endif";
var envmap_common_pars_fragment = "#ifdef USE_ENVMAP\n	uniform float envMapIntensity;\n	uniform mat3 envMapRotation;\n	uniform samplerCube envMap;\n	#ifdef ENVMAP_TYPE_PMREM\n		float roughnessToMip( const in float roughness ) {\n			float r = clamp( roughness, 0.0, 1.0 );\n			return ENVMAP_MAX_LOD * r * ( 2.0 - r );\n		}\n	#endif\n#endif";
var envmap_pars_fragment = "#ifdef USE_ENVMAP\n	uniform float reflectivity;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		varying vec3 vWorldPosition;\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif";
var envmap_pars_vertex = "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		\n		varying vec3 vWorldPosition;\n	#else\n		varying vec3 vReflect;\n		uniform float refractionRatio;\n	#endif\n#endif";
var envmap_vertex = "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vWorldPosition = worldPosition.xyz;\n	#else\n		vec3 cameraToVertex;\n		if ( isOrthographic ) {\n			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n		}\n		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vReflect = reflect( cameraToVertex, worldNormal );\n		#else\n			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#endif\n#endif";
var fog_vertex = "#ifdef USE_FOG\n	vFogDepth = - mvPosition.z;\n#endif";
var fog_pars_vertex = "#ifdef USE_FOG\n	varying float vFogDepth;\n#endif";
var fog_fragment = "#ifdef USE_FOG\n	#ifdef FOG_EXP2\n		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n	#endif\n	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif";
var fog_pars_fragment = "#ifdef USE_FOG\n	uniform vec3 fogColor;\n	varying float vFogDepth;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif";
var gradientmap_pars_fragment = "#ifdef USE_GRADIENTMAP\n	uniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n	float dotNL = dot( normal, lightDirection );\n	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n	#ifdef USE_GRADIENTMAP\n		return vec3( texture2D( gradientMap, coord ).r );\n	#else\n		vec2 fw = fwidth( coord ) * 0.5;\n		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n	#endif\n}";
var lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n#endif";
var lights_lambert_fragment = "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;";
var lights_lambert_pars_fragment = "varying vec3 vViewPosition;\nstruct LambertMaterial {\n	vec3 diffuseColor;\n	float specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Lambert\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert";
var lights_pars_begin = "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n	uniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n	float x = normal.x, y = normal.y, z = normal.z;\n	vec3 result = shCoefficients[ 0 ] * 0.886227;\n	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n	return result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n	return irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n	vec3 irradiance = ambientLightColor;\n	return irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n	if ( cutoffDistance > 0.0 ) {\n		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n	}\n	return distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n	return smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_SUN_LIGHTS > 0\n	struct SunLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];\n	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {\n		light.color = sunLight.color;\n		light.direction = sunLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_DIR_LIGHTS > 0\n	struct DirectionalLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n		light.color = directionalLight.color;\n		light.direction = directionalLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_POINT_LIGHTS > 0\n	struct PointLight {\n		vec3 position;\n		vec3 color;\n		float distance;\n		float decay;\n	};\n	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = pointLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		light.color = pointLight.color;\n		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n		light.visible = ( light.color != vec3( 0.0 ) );\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	struct SpotLight {\n		vec3 position;\n		vec3 direction;\n		vec3 color;\n		float distance;\n		float decay;\n		float coneCos;\n		float penumbraCos;\n	};\n	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = spotLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float angleCos = dot( light.direction, spotLight.direction );\n		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n		if ( spotAttenuation > 0.0 ) {\n			float lightDistance = length( lVector );\n			light.color = spotLight.color * spotAttenuation;\n			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n			light.visible = ( light.color != vec3( 0.0 ) );\n		} else {\n			light.color = vec3( 0.0 );\n			light.visible = false;\n		}\n	}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n	struct RectAreaLight {\n		vec3 color;\n		vec3 position;\n		vec3 halfWidth;\n		vec3 halfHeight;\n	};\n	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;\n	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	struct HemisphereLight {\n		vec3 direction;\n		vec3 skyColor;\n		vec3 groundColor;\n	};\n	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n		float dotNL = dot( normal, hemiLight.direction );\n		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n		return irradiance;\n	}\n#endif\n#include <lightprobes_pars_fragment>";
var envmap_physical_pars_fragment = "#ifdef USE_ENVMAP\n	vec3 getIBLIrradiance( const in vec3 normal ) {\n		#ifdef ENVMAP_TYPE_PMREM\n			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );\n			return PI * envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n		#ifdef ENVMAP_TYPE_PMREM\n			vec3 reflectVec = reflect( - viewDir, normal );\n			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );\n			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );\n			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );\n			return envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	#ifdef USE_RETROREFLECTION\n		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n			#ifdef ENVMAP_TYPE_PMREM\n				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );\n				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );\n				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );\n				return envMapColor.rgb * envMapIntensity;\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n	#endif\n	#ifdef USE_ANISOTROPY\n		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n			#ifdef ENVMAP_TYPE_PMREM\n				vec3 bentNormal = cross( bitangent, viewDir );\n				bentNormal = normalize( cross( bentNormal, bitangent ) );\n				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n				return getIBLRadiance( viewDir, bentNormal, roughness );\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n		#ifdef USE_RETROREFLECTION\n			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n				#ifdef ENVMAP_TYPE_PMREM\n					vec3 bentNormal = cross( bitangent, viewDir );\n					bentNormal = normalize( cross( bentNormal, bitangent ) );\n					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n					return getIBLRetroRadiance( viewDir, bentNormal, roughness );\n				#else\n					return vec3( 0.0 );\n				#endif\n			}\n		#endif\n	#endif\n#endif";
var lights_toon_fragment = "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;";
var lights_toon_pars_fragment = "varying vec3 vViewPosition;\nstruct ToonMaterial {\n	vec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Toon\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon";
var lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;";
var lights_phong_pars_fragment = "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n	vec3 diffuseColor;\n	vec3 specularColor;\n	float specularShininess;\n	float specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong";
var lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.metalness = metalnessFactor;\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.045 );\nmaterial.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef USE_DIFFUSE_ROUGHNESS\n	float diffuseRoughnessFactor = diffuseRoughness;\n	#ifdef USE_DIFFUSE_ROUGHNESSMAP\n		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;\n	#endif\n	material.diffuseRoughness = saturate( diffuseRoughnessFactor );\n#endif\n#ifdef IOR\n	material.ior = ior;\n	#ifdef USE_SPECULAR\n		float specularIntensityFactor = specularIntensity;\n		vec3 specularColorFactor = specularColor;\n		#ifdef USE_SPECULAR_COLORMAP\n			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n		#endif\n		#ifdef USE_SPECULAR_INTENSITYMAP\n			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n		#endif\n		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n	#else\n		float specularIntensityFactor = 1.0;\n		vec3 specularColorFactor = vec3( 1.0 );\n		material.specularF90 = 1.0;\n	#endif\n	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n#else\n	material.specularColor = vec3( 0.04 );\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n	material.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n	material.clearcoat = clearcoat;\n	material.clearcoatRoughness = clearcoatRoughness;\n	material.clearcoatF0 = vec3( 0.04 );\n	material.clearcoatF90 = 1.0;\n	#ifdef USE_CLEARCOATMAP\n		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n	#endif\n	#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n	#endif\n	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );\n	material.clearcoatRoughness += geometryRoughness;\n	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n	material.dispersion = dispersion;\n#endif\n#ifdef USE_RETROREFLECTION\n	material.retroreflectivity = retroreflectivity;\n#endif\n#ifdef USE_IRIDESCENCE\n	material.iridescence = iridescence;\n	material.iridescenceIOR = iridescenceIOR;\n	#ifdef USE_IRIDESCENCEMAP\n		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n	#endif\n	#ifdef USE_IRIDESCENCE_THICKNESSMAP\n		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n	#else\n		material.iridescenceThickness = iridescenceThicknessMaximum;\n	#endif\n#endif\n#ifdef USE_SHEEN\n	material.sheenColor = sheenColor;\n	#ifdef USE_SHEEN_COLORMAP\n		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n	#endif\n	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	#ifdef USE_ANISOTROPYMAP\n		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n	#else\n		vec2 anisotropyV = anisotropyVector;\n	#endif\n	material.anisotropy = length( anisotropyV );\n	if( material.anisotropy == 0.0 ) {\n		anisotropyV = vec2( 1.0, 0.0 );\n	} else {\n		anisotropyV /= material.anisotropy;\n		material.anisotropy = saturate( material.anisotropy );\n	}\n	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif";
var lights_physical_pars_fragment = "uniform sampler2D dfgLUT;\nstruct PhysicalMaterial {\n	vec3 diffuseColor;\n	vec3 diffuseContribution;\n	vec3 specularColor;\n	vec3 specularColorBlended;\n	float roughness;\n	float metalness;\n	float specularF90;\n	float dispersion;\n	vec2 dfg;\n	vec3 multiScatteringCompensation;\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		float diffuseRoughness;\n	#endif\n	#ifdef USE_RETROREFLECTION\n		float retroreflectivity;\n	#endif\n	#ifdef USE_CLEARCOAT\n		float clearcoat;\n		float clearcoatRoughness;\n		vec3 clearcoatF0;\n		float clearcoatF90;\n	#endif\n	#ifdef USE_IRIDESCENCE\n		float iridescence;\n		float iridescenceIOR;\n		float iridescenceThickness;\n		vec3 iridescenceFresnel;\n		vec3 iridescenceF0Dielectric;\n		vec3 iridescenceF0Metallic;\n	#endif\n	#ifdef USE_SHEEN\n		vec3 sheenColor;\n		float sheenRoughness;\n	#endif\n	#ifdef IOR\n		float ior;\n	#endif\n	#ifdef USE_TRANSMISSION\n		float transmission;\n		float transmissionAlpha;\n		float thickness;\n		float attenuationDistance;\n		vec3 attenuationColor;\n	#endif\n	#ifdef USE_ANISOTROPY\n		float anisotropy;\n		float alphaT;\n		vec3 anisotropyT;\n		vec3 anisotropyB;\n	#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\n#ifdef USE_DIFFUSE_ROUGHNESS\n	const float EON_EPSILON = 1e-7;\n	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {\n		float muComp = 1.0 - mu;\n		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );\n		return A * ( 1.0 + roughness * gOverPi );\n	}\n	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {\n		vec3 rho = saturate( diffuseColor );\n		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float s = dot( lightDir, viewDir ) - dotNL * dotNV;\n		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;\n		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );\n		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );\n		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );\n		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );\n		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );\n		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );\n		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI\n			* max( EON_EPSILON, 1.0 - albedoV )\n			* max( EON_EPSILON, 1.0 - albedoL )\n			/ max( EON_EPSILON, 1.0 - averageAlbedo );\n		return singleScatter + multiScatter;\n	}\n	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {\n		vec3 rho = saturate( diffuseColor );\n		if ( roughness <= EON_EPSILON ) return rho;\n		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );\n		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );\n		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );\n		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );\n		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );\n	}\n#endif\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	return 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n	float a2 = pow2( alpha );\n	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n	return RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n		return 0.5 / max( gv + gl, EPSILON );\n	}\n	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n		float a2 = alphaT * alphaB;\n		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n		highp float v2 = dot( v, v );\n		float w2 = a2 / v2;\n		return RECIPROCAL_PI * a2 * pow2 ( w2 );\n	}\n#endif\n#ifdef USE_CLEARCOAT\n	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n		vec3 f0 = material.clearcoatF0;\n		float f90 = material.clearcoatF90;\n		float roughness = max( material.clearcoatRoughness, 0.045 );\n		float alpha = pow2( roughness );\n		vec3 halfDir = normalize( lightDir + viewDir );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float dotNH = saturate( dot( normal, halfDir ) );\n		float dotVH = saturate( dot( viewDir, halfDir ) );\n		vec3 F = F_Schlick( f0, f90, dotVH );\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n		return F * ( V * D );\n	}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 f0 = material.specularColorBlended;\n	float f90 = material.specularF90;\n	float roughness = max( material.roughness, 0.045 );\n	float alpha = pow2( roughness );\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( f0, f90, dotVH );\n	#ifdef USE_IRIDESCENCE\n		F = mix( F, material.iridescenceFresnel, material.iridescence );\n	#endif\n	#ifdef USE_ANISOTROPY\n		float dotTL = dot( material.anisotropyT, lightDir );\n		float dotTV = dot( material.anisotropyT, viewDir );\n		float dotTH = dot( material.anisotropyT, halfDir );\n		float dotBL = dot( material.anisotropyB, lightDir );\n		float dotBV = dot( material.anisotropyB, viewDir );\n		float dotBH = dot( material.anisotropyB, halfDir );\n		float alphaT = max( material.alphaT, alpha );\n		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );\n	#else\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n	#endif\n	return F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n	const float LUT_SIZE = 64.0;\n	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n	const float LUT_BIAS = 0.5 / LUT_SIZE;\n	float dotNV = saturate( dot( N, V ) );\n	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n	uv = uv * LUT_SCALE + LUT_BIAS;\n	return uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n	float l = length( f );\n	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n	float x = dot( v1, v2 );\n	float y = abs( x );\n	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n	float b = 3.4175940 + ( 4.1616724 + y ) * y;\n	float v = a / b;\n	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n	return cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n	vec3 lightNormal = cross( v1, v2 );\n	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n	vec3 T1, T2;\n	T1 = normalize( V - N * dot( V, N ) );\n	T2 = - cross( N, T1 );\n	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );\n	vec3 coords[ 4 ];\n	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n	coords[ 0 ] = normalize( coords[ 0 ] );\n	coords[ 1 ] = normalize( coords[ 1 ] );\n	coords[ 2 ] = normalize( coords[ 2 ] );\n	coords[ 3 ] = normalize( coords[ 3 ] );\n	vec3 vectorFormFactor = vec3( 0.0 );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n	return vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n	float alpha = pow2( roughness );\n	float invAlpha = 1.0 / alpha;\n	float cos2h = dotNH * dotNH;\n	float sin2h = max( 1.0 - cos2h, 0.0078125 );\n	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float D = D_Charlie( sheenRoughness, dotNH );\n	float V = V_Neubelt( dotNV, dotNL );\n	return sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float r2 = roughness * roughness;\n	float rInv = 1.0 / ( roughness + 0.1 );\n	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;\n	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;\n	float DG = exp( a * dotNV + b );\n	return saturate( DG );\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n	return specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n	#ifdef USE_IRIDESCENCE\n		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n	#else\n		vec3 Fr = specularColor;\n	#endif\n	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n	float Ess = fab.x + fab.y;\n	float Ems = 1.0 - Ess;\n	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n	singleScatter += FssEss;\n	multiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n		vec3 normal = geometryNormal;\n		vec3 viewDir = geometryViewDir;\n		vec3 position = geometryPosition;\n		vec3 lightPos = rectAreaLight.position;\n		vec3 halfWidth = rectAreaLight.halfWidth;\n		vec3 halfHeight = rectAreaLight.halfHeight;\n		vec3 lightColor = rectAreaLight.color;\n		float roughness = material.roughness;\n		vec3 rectCoords[ 4 ];\n		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n		vec2 uv = LTC_Uv( normal, viewDir, roughness );\n		vec4 t1 = texture2D( ltc_1, uv );\n		vec4 t2 = texture2D( ltc_2, uv );\n		mat3 mInv = mat3(\n			vec3( t1.x, 0, t1.y ),\n			vec3(    0, 1,    0 ),\n			vec3( t1.z, 0, t1.w )\n		);\n		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );\n		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n		#ifdef USE_CLEARCOAT\n			vec3 Ncc = geometryClearcoatNormal;\n			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );\n			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );\n			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );\n			mat3 mInvClearcoat = mat3(\n				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),\n				vec3(             0, 1,             0 ),\n				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )\n			);\n			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;\n			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );\n		#endif\n	}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifdef USE_CLEARCOAT\n		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n		vec3 ccIrradiance = dotNLcc * directLight.color;\n		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n	#endif\n	#ifdef USE_SHEEN\n \n 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n \n 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );\n \n 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );\n \n 		irradiance *= sheenEnergyComp;\n \n 	#endif\n	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n	#ifdef USE_RETROREFLECTION\n		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );\n		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );\n		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );\n	#endif\n	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;\n	vec3 halfDir = normalize( directLight.direction + geometryViewDir );\n	float dotVH = saturate( dot( geometryViewDir, halfDir ) );\n	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );\n	#ifdef USE_RETROREFLECTION\n		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );\n		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );\n		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );\n		F = mix( F, retroF, saturate( material.retroreflectivity ) );\n	#endif\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );\n	#else\n		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );\n	#endif\n	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 singleScattering = vec3( 0.0 );\n	vec3 multiScattering = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );\n	#else\n		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );\n	#endif\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );\n		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );\n	#else\n		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );\n	#endif\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		diffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectDiffuse += diffuse;\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n	#ifdef USE_CLEARCOAT\n		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;\n 	#endif\n	vec3 singleScatteringDielectric = vec3( 0.0 );\n	vec3 multiScatteringDielectric = vec3( 0.0 );\n	vec3 singleScatteringMetallic = vec3( 0.0 );\n	vec3 multiScatteringMetallic = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );\n	#else\n		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );\n	#endif\n	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );\n	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );\n	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;\n	#ifdef USE_DIFFUSE_ROUGHNESS\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );\n	#else\n		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );\n	#endif\n	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n	vec3 indirectSpecular = radiance * singleScattering;\n	indirectSpecular += multiScattering * cosineWeightedIrradiance;\n	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		indirectSpecular *= sheenEnergyComp;\n		indirectDiffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectSpecular += indirectSpecular;\n	reflectedLight.indirectDiffuse += indirectDiffuse;\n}\n#define RE_Direct				RE_Direct_Physical\n#define RE_Direct_RectArea		RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular		RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}";
var lights_fragment_begin = "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n	geometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n	float dotNVi = saturate( dot( normal, geometryViewDir ) );\n	if ( material.iridescenceThickness == 0.0 ) {\n		material.iridescence = 0.0;\n	} else {\n		material.iridescence = saturate( material.iridescence );\n	}\n	if ( material.iridescence > 0.0 ) {\n		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );\n		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );\n		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );\n		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );\n	}\n#endif\n#ifdef STANDARD\n	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );\n	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;\n	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )\n		float EssMs = material.dfg.x + material.dfg.y;\n		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );\n	#endif\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n	PointLight pointLight;\n	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		getPointLightInfo( pointLight, geometryPosition, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n		pointLightShadow = pointLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n	SpotLight spotLight;\n	vec4 spotColor;\n	vec3 spotLightCoord;\n	bool inSpotLightMap;\n	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		getSpotLightInfo( spotLight, geometryPosition, directLight );\n		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n		#else\n		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#endif\n		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n		#endif\n		#undef SPOT_LIGHT_MAP_INDEX\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		spotLightShadow = spotLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )\n	SunLight sunLight;\n	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0\n	SunLightShadow sunLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {\n		sunLight = sunLights[ i ];\n		getSunLightInfo( sunLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )\n		sunLightShadow = sunLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n	DirectionalLight directionalLight;\n	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		getDirectionalLightInfo( directionalLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n		directionalLightShadow = directionalLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n	RectAreaLight rectAreaLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n		rectAreaLight = rectAreaLights[ i ];\n		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n	vec3 iblIrradiance = vec3( 0.0 );\n	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n	#if defined( USE_LIGHT_PROBES )\n		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n	#endif\n	#if ( NUM_HEMI_LIGHTS > 0 )\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_LIGHT_PROBE_GRIDS > 0\n		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;\n		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );\n		int probeGrid = - 1;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {\n			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;\n		}\n		#pragma unroll_loop_end\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {\n			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if defined( RE_IndirectSpecular )\n	vec3 radiance = vec3( 0.0 );\n	vec3 clearcoatRadiance = vec3( 0.0 );\n#endif";
var lights_fragment_maps = "#if defined( RE_IndirectDiffuse )\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n		irradiance += lightMapIrradiance;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )\n		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )\n			iblIrradiance += getIBLIrradiance( geometryNormal );\n		#endif\n	#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n	#ifdef USE_ANISOTROPY\n		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n	#else\n		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n	#endif\n	#ifdef USE_RETROREFLECTION\n		#ifdef USE_ANISOTROPY\n			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n		#else\n			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );\n		#endif\n		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );\n	#endif\n	radiance += iblRadiance;\n	#ifdef USE_CLEARCOAT\n		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n	#endif\n#endif";
var lights_fragment_end = "#if defined( RE_IndirectDiffuse )\n	#if defined( LAMBERT ) || defined( PHONG )\n		irradiance += iblIrradiance;\n	#endif\n	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif";
var lightprobes_pars_fragment = "#if NUM_LIGHT_PROBE_GRIDS > 0\nuniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];\nuniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];\nuniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];\nuniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];\nbool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {\n	vec3 spacing = ( probesMax - probesMin ) / probesResolution;\n	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;\n	vec3 margin = spacing * 0.01;\n	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );\n}\nvec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {\n	vec3 res = probesResolution;\n	vec3 gridRange = probesMax - probesMin;\n	vec3 probeSpacing = gridRange / res;\n	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;\n	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );\n	float nz          = res.z;\n	float paddedSlices = nz + 2.0;\n	float atlasDepth  = 7.0 * paddedSlices;\n	float uvZBase     = uvw.z * nz + 1.0;\n	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );\n	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );\n	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );\n	vec3 c0 = s0.xyz;\n	vec3 c1 = vec3( s0.w, s1.xy );\n	vec3 c2 = vec3( s1.zw, s2.x );\n	vec3 c3 = s2.yzw;\n	vec3 c4 = s3.xyz;\n	vec3 c5 = vec3( s3.w, s4.xy );\n	vec3 c6 = vec3( s4.zw, s5.x );\n	vec3 c7 = s5.yzw;\n	vec3 c8 = s6.xyz;\n	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;\n	vec3 result = c0 * 0.886227;\n	result += c1 * 2.0 * 0.511664 * y;\n	result += c2 * 2.0 * 0.511664 * z;\n	result += c3 * 2.0 * 0.511664 * x;\n	result += c4 * 2.0 * 0.429043 * x * y;\n	result += c5 * 2.0 * 0.429043 * y * z;\n	result += c6 * ( 0.743125 * z * z - 0.247708 );\n	result += c7 * 2.0 * 0.429043 * x * z;\n	result += c8 * 0.429043 * ( x * x - y * y );\n	return max( result, vec3( 0.0 ) );\n}\n#endif";
var logdepthbuf_fragment = "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif";
var logdepthbuf_pars_fragment = "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	uniform float logDepthBufFC;\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif";
var logdepthbuf_pars_vertex = "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif";
var logdepthbuf_vertex = "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	vFragDepth = 1.0 + gl_Position.w;\n	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif";
var map_fragment = "#ifdef USE_MAP\n	vec4 sampledDiffuseColor = texture2D( map, vMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n	#endif\n	diffuseColor *= sampledDiffuseColor;\n#endif";
var map_pars_fragment = "#ifdef USE_MAP\n	uniform sampler2D map;\n#endif";
var map_particle_fragment = "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n	#if defined( USE_POINTS_UV )\n		vec2 uv = vUv;\n	#else\n		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n	#endif\n#endif\n#ifdef USE_MAP\n	diffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif";
var map_particle_pars_fragment = "#if defined( USE_POINTS_UV )\n	varying vec2 vUv;\n#else\n	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n		uniform mat3 uvTransform;\n	#endif\n#endif\n#ifdef USE_MAP\n	uniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif";
var metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n	metalnessFactor *= texelMetalness.b;\n#endif";
var metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n	uniform sampler2D metalnessMap;\n#endif";
var morphinstance_vertex = "#ifdef USE_INSTANCING_MORPH\n	float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n	}\n#endif";
var morphcolor_vertex = "#if defined( USE_MORPHCOLORS )\n	#if defined( USE_COLOR_ALPHA )\n		vColor *= morphTargetBaseInfluence;\n	#elif defined( USE_COLOR )\n		vColor.rgb *= morphTargetBaseInfluence;\n	#endif\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		#if defined( USE_COLOR_ALPHA )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n		#elif defined( USE_COLOR )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n		#endif\n	}\n#endif";
var morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n	objectNormal *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif";
var morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n	#ifndef USE_INSTANCING_MORPH\n		uniform float morphTargetBaseInfluence;\n		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	#endif\n	uniform sampler2DArray morphTargetsTexture;\n	uniform ivec2 morphTargetsTextureSize;\n	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n		int y = texelIndex / morphTargetsTextureSize.x;\n		int x = texelIndex - y * morphTargetsTextureSize.x;\n		ivec3 morphUV = ivec3( x, y, morphTargetIndex );\n		return texelFetch( morphTargetsTexture, morphUV, 0 );\n	}\n#endif";
var morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n	transformed *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif";
var normal_fragment_begin = "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n#else\n	vec3 normal = normalize( vNormal );\n	#ifdef DOUBLE_SIDED\n		normal *= faceDirection;\n	#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n	#ifdef USE_TANGENT\n		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn = getTangentFrame( - vViewPosition, normal,\n		#if defined( USE_NORMALMAP )\n			vNormalMapUv\n		#elif defined( USE_CLEARCOAT_NORMALMAP )\n			vClearcoatNormalMapUv\n		#else\n			vUv\n		#endif\n		);\n	#endif\n	#ifdef DOUBLE_SIDED\n		tbn[0] *= faceDirection;\n		tbn[1] *= faceDirection;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	#ifdef USE_TANGENT\n		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n	#endif\n	#ifdef DOUBLE_SIDED\n		tbn2[0] *= faceDirection;\n		tbn2[1] *= faceDirection;\n	#endif\n#endif\nvec3 nonPerturbedNormal = normal;";
var normal_fragment_maps = "#ifdef USE_NORMALMAP_OBJECTSPACE\n	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#ifdef FLIP_SIDED\n		normal = - normal;\n	#endif\n	#ifdef DOUBLE_SIDED\n		normal = normal * faceDirection;\n	#endif\n	normal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#if defined( USE_PACKED_NORMALMAP )\n		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );\n	#endif\n	mapN.xy *= normalScale;\n	normal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif";
var normal_pars_fragment = "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif";
var normal_pars_vertex = "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif";
var normal_vertex = "#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n	#ifdef USE_TANGENT\n		vTangent = normalize( transformedTangent );\n		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n		#ifdef FLIP_SIDED\n			vBitangent = - vBitangent;\n		#endif\n	#endif\n#endif";
var normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n	uniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( uv.st );\n		vec2 st1 = dFdy( uv.st );\n		vec3 N = surf_norm;\n		vec3 q1perp = cross( q1, N );\n		vec3 q0perp = cross( N, q0 );\n		vec3 T = q1perp * st0.x + q0perp * st1.x;\n		vec3 B = q1perp * st0.y + q0perp * st1.y;\n		float det = max( dot( T, T ), dot( B, B ) );\n		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n		return mat3( T * scale, B * scale, N );\n	}\n#endif";
var clearcoat_normal_fragment_begin = "#ifdef USE_CLEARCOAT\n	vec3 clearcoatNormal = nonPerturbedNormal;\n#endif";
var clearcoat_normal_fragment_maps = "#ifdef USE_CLEARCOAT_NORMALMAP\n	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n	clearcoatMapN.xy *= clearcoatNormalScale;\n	clearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif";
var clearcoat_pars_fragment = "#ifdef USE_CLEARCOATMAP\n	uniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform sampler2D clearcoatNormalMap;\n	uniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform sampler2D clearcoatRoughnessMap;\n#endif";
var iridescence_pars_fragment = "#ifdef USE_IRIDESCENCEMAP\n	uniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform sampler2D iridescenceThicknessMap;\n#endif";
var opaque_fragment = "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );";
var packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n	return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n	return 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n	if( v <= 0.0 )\n		return vec4( 0., 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec4( 1., 1., 1., 1. );\n	float vuf;\n	float af = modf( v * PackFactors.a, vuf );\n	float bf = modf( vuf * ShiftRight8, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n	if( v <= 0.0 )\n		return vec3( 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec3( 1., 1., 1. );\n	float vuf;\n	float bf = modf( v * PackFactors.b, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n	if( v <= 0.0 )\n		return vec2( 0., 0. );\n	if( v >= 1.0 )\n		return vec2( 1., 1. );\n	float vuf;\n	float gf = modf( v * 256., vuf );\n	return vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n	return dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n	return dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n	\n		return depth * ( far - near ) - far;\n	#else\n		return depth * ( near - far ) - near;\n	#endif\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		return ( near * far ) / ( ( near - far ) * depth - near );\n	#else\n		return ( near * far ) / ( ( far - near ) * depth - far );\n	#endif\n}";
var premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n	gl_FragColor.rgb *= gl_FragColor.a;\n#endif";
var project_vertex = "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n	mvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n	mvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;";
var dithering_fragment = "#ifdef DITHERING\n	gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif";
var dithering_pars_fragment = "#ifdef DITHERING\n	vec3 dithering( vec3 color ) {\n		float grid_position = rand( gl_FragCoord.xy );\n		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n		return color + dither_shift_RGB;\n	}\n#endif";
var roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n	roughnessFactor *= texelRoughness.g;\n#endif";
var roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n	uniform sampler2D roughnessMap;\n#endif";
var shadowmap_pars_fragment = "#if NUM_SPOT_LIGHT_COORDS > 0\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		#define SUN_LIGHT_CASCADES 2\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];\n		#endif\n		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];\n		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];\n		varying vec4 vSunShadowWorldPosition;\n		varying vec3 vSunShadowWorldNormal;\n		struct SunLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#endif\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#elif defined( SHADOWMAP_TYPE_BASIC )\n			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float interleavedGradientNoise( vec2 position ) {\n			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );\n		}\n		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {\n			const float goldenAngle = 2.399963229728653;\n			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );\n			float theta = float( sampleIndex ) * goldenAngle + phi;\n			return vec2( cos( theta ), sin( theta ) ) * r;\n		}\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n				vec2 radius = shadowRadius * texelSize;\n				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n				shadow = (\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )\n				) * 0.2;\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#elif defined( SHADOWMAP_TYPE_VSM )\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;\n				float mean = distribution.x;\n				float variance = distribution.y * distribution.y;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					float hard_shadow = step( mean, shadowCoord.z );\n				#else\n					float hard_shadow = step( shadowCoord.z, mean );\n				#endif\n				\n				if ( hard_shadow == 1.0 ) {\n					shadow = 1.0;\n				} else {\n					variance = max( variance, 0.0000001 );\n					float d = shadowCoord.z - mean;\n					float p_max = variance / ( variance + d * d );\n					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );\n					shadow = max( hard_shadow, p_max );\n				}\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#else\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				float depth = texture2D( shadowMap, shadowCoord.xy ).r;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					shadow = step( depth, shadowCoord.z );\n				#else\n					shadow = step( shadowCoord.z, depth );\n				#endif\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#endif\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		float getSunShadow(\n			#if defined( SHADOWMAP_TYPE_PCF )\n				sampler2DShadow shadowMap,\n			#else\n				sampler2D shadowMap,\n			#endif\n			SunLightShadow sunLightShadow,\n			int shadowIndex\n		) {\n			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );\n			float viewDepth = vSunShadowWorldPosition.w;\n			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;\n			float shadow = 1.0;\n			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {\n				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];\n				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {\n					float cascadeShadow = getShadow(\n						shadowMap,\n						sunLightShadow.shadowMapSize,\n						sunLightShadow.shadowIntensity,\n						sunLightShadow.shadowBias,\n						sunLightShadow.shadowRadius,\n						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition\n					);\n					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );\n				}\n			}\n			return shadow;\n		}\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n	#if defined( SHADOWMAP_TYPE_PCF )\n	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 bd3D = normalize( lightToPosition );\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			float lightDistance = length( lightToPosition );\n			float depthRange = shadowCameraFar - shadowCameraNear;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				float depthA = - shadowCameraNear / depthRange - shadowBias;\n				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );\n			#else\n				float depthA = shadowCameraFar / depthRange + shadowBias;\n				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );\n			#endif\n			float texelSize = shadowRadius / shadowMapSize.x;\n			vec3 absDir = abs( bd3D );\n			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );\n			tangent = normalize( cross( bd3D, tangent ) );\n			vec3 bitangent = cross( bd3D, tangent );\n			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n			shadow = 0.0;\n			for ( int i = 0; i < 5; i ++ ) {\n				vec2 offset = vogelDiskSample( i, 5, phi );\n				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;\n				vec3 absDirection = abs( direction );\n				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );\n				shadow += texture( shadowMap, vec4( direction, dp ) );\n			}\n			shadow *= 0.2;\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#elif defined( SHADOWMAP_TYPE_BASIC )\n	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n			dp += shadowBias;\n			vec3 bd3D = normalize( lightToPosition );\n			float depth = textureCube( shadowMap, bd3D ).r;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				depth = 1.0 - depth;\n			#endif\n			shadow = step( dp, depth );\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#endif\n	#endif\n#endif";
var shadowmap_pars_vertex = "#if NUM_SPOT_LIGHT_COORDS > 0\n	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		varying vec4 vSunShadowWorldPosition;\n		varying vec3 vSunShadowWorldNormal;\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n#endif";
var shadowmap_vertex = "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n	#ifdef HAS_NORMAL\n		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n	#else\n		vec3 shadowWorldNormal = vec3( 0.0 );\n	#endif\n	vec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );\n		vSunShadowWorldNormal = shadowWorldNormal;\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n		shadowWorldPosition = worldPosition;\n		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n		#endif\n		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n#endif";
var shadowmask_pars_fragment = "float getShadowMask() {\n	float shadow = 1.0;\n	#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n	SunLightShadow sunLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {\n		sunLight = sunLightShadows[ i ];\n		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n		directionalLight = directionalLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n		spotLight = spotLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n	PointLightShadow pointLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n		pointLight = pointLightShadows[ i ];\n		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#endif\n	return shadow;\n}";
var skinbase_vertex = "#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif";
var skinning_pars_vertex = "#ifdef USE_SKINNING\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n	uniform highp sampler2D boneTexture;\n	mat4 getBoneMatrix( const in float i ) {\n		int size = textureSize( boneTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n#endif";
var skinning_vertex = "#ifdef USE_SKINNING\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	transformed = ( bindMatrixInverse * skinned ).xyz;\n#endif";
var skinnormal_vertex = "#ifdef USE_SKINNING\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n	#ifdef USE_TANGENT\n		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n	#endif\n#endif";
var specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif";
var specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif";
var tonemapping_fragment = "#if defined( TONE_MAPPING )\n	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif";
var tonemapping_pars_fragment = "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n	return saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	return saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	color = max( vec3( 0.0 ), color - 0.004 );\n	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n	return a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n	const mat3 ACESInputMat = mat3(\n		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),\n		vec3( 0.04823, 0.01566, 0.83777 )\n	);\n	const mat3 ACESOutputMat = mat3(\n		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),\n		vec3( -0.07367, -0.00605,  1.07602 )\n	);\n	color *= toneMappingExposure / 0.6;\n	color = ACESInputMat * color;\n	color = RRTAndODTFit( color );\n	color = ACESOutputMat * color;\n	return saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n	vec3( 1.6605, - 0.1246, - 0.0182 ),\n	vec3( - 0.5876, 1.1329, - 0.1006 ),\n	vec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n	vec3( 0.6274, 0.0691, 0.0164 ),\n	vec3( 0.3293, 0.9195, 0.0880 ),\n	vec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n	vec3 x2 = x * x;\n	vec3 x4 = x2 * x2;\n	return + 15.5 * x4 * x2\n		- 40.14 * x4 * x\n		+ 31.96 * x4\n		- 6.868 * x2 * x\n		+ 0.4298 * x2\n		+ 0.1191 * x\n		- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n	const mat3 AgXInsetMatrix = mat3(\n		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n	);\n	const mat3 AgXOutsetMatrix = mat3(\n		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n	);\n	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;\n	color *= toneMappingExposure;\n	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n	color = AgXInsetMatrix * color;\n	color = max( color, 1e-10 );	color = log2( color );\n	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n	color = clamp( color, 0.0, 1.0 );\n	color = agxDefaultContrastApprox( color );\n	color = AgXOutsetMatrix * color;\n	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n	color = clamp( color, 0.0, 1.0 );\n	return color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n	const float StartCompression = 0.8 - 0.04;\n	const float Desaturation = 0.15;\n	color *= toneMappingExposure;\n	float x = min( color.r, min( color.g, color.b ) );\n	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n	color -= offset;\n	float peak = max( color.r, max( color.g, color.b ) );\n	if ( peak < StartCompression ) return color;\n	float d = 1. - StartCompression;\n	float newPeak = 1. - d * d / ( peak + d - StartCompression );\n	color *= newPeak / peak;\n	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n	return mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }";
var transmission_fragment = "#ifdef USE_TRANSMISSION\n	material.transmission = transmission;\n	material.transmissionAlpha = 1.0;\n	material.thickness = thickness;\n	material.attenuationDistance = attenuationDistance;\n	material.attenuationColor = attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n	#endif\n	vec3 pos = vWorldPosition;\n	vec3 v = normalize( cameraPosition - pos );\n	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );\n	vec4 transmitted = getIBLVolumeRefraction(\n		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,\n		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n		material.attenuationColor, material.attenuationDistance );\n	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif";
var transmission_pars_fragment = "#ifdef USE_TRANSMISSION\n	uniform float transmission;\n	uniform float thickness;\n	uniform float attenuationDistance;\n	uniform vec3 attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		uniform sampler2D transmissionMap;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		uniform sampler2D thicknessMap;\n	#endif\n	uniform vec2 transmissionSamplerSize;\n	uniform sampler2D transmissionSamplerMap;\n	uniform mat4 modelMatrix;\n	uniform mat4 projectionMatrix;\n	varying vec3 vWorldPosition;\n	float w0( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n	}\n	float w1( float a ) {\n		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n	}\n	float w2( float a ){\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n	}\n	float w3( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * a * a );\n	}\n	float g0( float a ) {\n		return w0( a ) + w1( a );\n	}\n	float g1( float a ) {\n		return w2( a ) + w3( a );\n	}\n	float h0( float a ) {\n		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n	}\n	float h1( float a ) {\n		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n	}\n	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n		uv = uv * texelSize.zw + 0.5;\n		vec2 iuv = floor( uv );\n		vec2 fuv = fract( uv );\n		float g0x = g0( fuv.x );\n		float g1x = g1( fuv.x );\n		float h0x = h0( fuv.x );\n		float h1x = h1( fuv.x );\n		float h0y = h0( fuv.y );\n		float h1y = h1( fuv.y );\n		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n	}\n	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n		vec2 fLodSizeInv = 1.0 / fLodSize;\n		vec2 cLodSizeInv = 1.0 / cLodSize;\n		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n		return mix( fSample, cSample, fract( lod ) );\n	}\n	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n		vec3 modelScale;\n		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n		return normalize( refractionVector ) * thickness * modelScale;\n	}\n	float applyIorToRoughness( const in float roughness, const in float ior ) {\n		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n	}\n	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n	}\n	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n		if ( isinf( attenuationDistance ) ) {\n			return vec3( 1.0 );\n		} else {\n			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;\n		}\n	}\n	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n		const in vec3 attenuationColor, const in float attenuationDistance ) {\n		vec4 transmittedLight;\n		vec3 transmittance;\n		#ifdef USE_DISPERSION\n			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n			for ( int i = 0; i < 3; i ++ ) {\n				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n				vec3 refractedRayExit = position + transmissionRay;\n				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n				vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n				refractionCoords += 1.0;\n				refractionCoords /= 2.0;\n				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n				transmittedLight[ i ] = transmissionSample[ i ];\n				transmittedLight.a += transmissionSample.a;\n				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n			}\n			transmittedLight.a /= 3.0;\n		#else\n			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n			vec3 refractedRayExit = position + transmissionRay;\n			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n			vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n			refractionCoords += 1.0;\n			refractionCoords /= 2.0;\n			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n		#endif\n		vec3 attenuatedColor = transmittance * transmittedLight.rgb;\n		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n	}\n#endif";
var uv_pars_fragment = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESSMAP\n	varying vec2 vDiffuseRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif";
var uv_pars_vertex = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	uniform mat3 mapTransform;\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform mat3 alphaMapTransform;\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	uniform mat3 lightMapTransform;\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	uniform mat3 aoMapTransform;\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	uniform mat3 bumpMapTransform;\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	uniform mat3 normalMapTransform;\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	uniform mat3 displacementMapTransform;\n	varying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	uniform mat3 emissiveMapTransform;\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	uniform mat3 metalnessMapTransform;\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	uniform mat3 roughnessMapTransform;\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESSMAP\n	uniform mat3 diffuseRoughnessMapTransform;\n	varying vec2 vDiffuseRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	uniform mat3 anisotropyMapTransform;\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	uniform mat3 clearcoatMapTransform;\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform mat3 clearcoatNormalMapTransform;\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform mat3 clearcoatRoughnessMapTransform;\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	uniform mat3 sheenColorMapTransform;\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	uniform mat3 sheenRoughnessMapTransform;\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	uniform mat3 iridescenceMapTransform;\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform mat3 iridescenceThicknessMapTransform;\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	uniform mat3 specularMapTransform;\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	uniform mat3 specularColorMapTransform;\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	uniform mat3 specularIntensityMapTransform;\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif";
var uv_vertex = "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	vUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESSMAP\n	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif";
var worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n	vec4 worldPosition = vec4( transformed, 1.0 );\n	#ifdef USE_BATCHING\n		worldPosition = batchingMatrix * worldPosition;\n	#endif\n	#ifdef USE_INSTANCING\n		worldPosition = instanceMatrix * worldPosition;\n	#endif\n	worldPosition = modelMatrix * worldPosition;\n#endif";
var vertex$h = "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	gl_Position = vec4( position.xy, 1.0, 1.0 );\n}";
var fragment$h = "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n	vec4 texColor = texture2D( t2D, vUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}";
var vertex$g = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}";
var fragment$g = "uniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <envmap_common_pars_fragment>\nvoid main() {\n	#ifdef ENVMAP_TYPE_PMREM\n		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );\n	#else\n		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}";
var vertex$f = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}";
var fragment$f = "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n	gl_FragColor = texColor;\n	gl_FragColor.a *= opacity;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}";
var vertex$e = "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vHighPrecisionZW = gl_Position.zw;\n}";
var fragment$e = "#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <logdepthbuf_fragment>\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];\n	#else\n		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;\n	#endif\n	#if DEPTH_PACKING == 3200\n		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n	#elif DEPTH_PACKING == 3201\n		gl_FragColor = packDepthToRGBA( fragCoordZ );\n	#elif DEPTH_PACKING == 3202\n		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n	#elif DEPTH_PACKING == 3203\n		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n	#endif\n}";
var vertex$d = "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	vWorldPosition = worldPosition.xyz;\n}";
var fragment$d = "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	float dist = length( vWorldPosition - referencePosition );\n	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n	dist = saturate( dist );\n	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );\n}";
var vertex$c = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n}";
var fragment$c = "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vec3 direction = normalize( vWorldDirection );\n	vec2 sampleUV = equirectUv( direction );\n	gl_FragColor = texture2D( tEquirect, sampleUV );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}";
var vertex$b = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vLineDistance = scale * lineDistance;\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}";
var fragment$b = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}";
var vertex$a = "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinbase_vertex>\n		#include <skinnormal_vertex>\n		#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <fog_vertex>\n}";
var fragment$a = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n	#else\n		reflectedLight.indirectDiffuse += vec3( 1.0 );\n	#endif\n	#include <aomap_fragment>\n	reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
var vertex$9 = "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}";
var fragment$9 = "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_lambert_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
var vertex$8 = "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n	vViewPosition = - mvPosition.xyz;\n}";
var fragment$8 = "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	vec3 viewDir = normalize( vViewPosition );\n	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n	vec3 y = cross( viewDir, x );\n	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n	#ifdef USE_MATCAP\n		vec4 matcapColor = texture2D( matcap, uv );\n	#else\n		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n	#endif\n	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
var vertex$7 = "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	vViewPosition = - mvPosition.xyz;\n#endif\n}";
var fragment$7 = "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );\n	#ifdef OPAQUE\n		gl_FragColor.a = 1.0;\n	#endif\n}";
var vertex$6 = "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}";
var fragment$6 = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_phong_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
var vertex$5 = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n	varying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n	vWorldPosition = worldPosition.xyz;\n#endif\n}";
var fragment$5 = "#define STANDARD\n#ifdef PHYSICAL\n	#define IOR\n	#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n	uniform float ior;\n#endif\n#ifdef USE_SPECULAR\n	uniform float specularIntensity;\n	uniform vec3 specularColor;\n	#ifdef USE_SPECULAR_COLORMAP\n		uniform sampler2D specularColorMap;\n	#endif\n	#ifdef USE_SPECULAR_INTENSITYMAP\n		uniform sampler2D specularIntensityMap;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT\n	uniform float clearcoat;\n	uniform float clearcoatRoughness;\n#endif\n#ifdef USE_DIFFUSE_ROUGHNESS\n	uniform float diffuseRoughness;\n	#ifdef USE_DIFFUSE_ROUGHNESSMAP\n		uniform sampler2D diffuseRoughnessMap;\n	#endif\n#endif\n#ifdef USE_DISPERSION\n	uniform float dispersion;\n#endif\n#ifdef USE_RETROREFLECTION\n	uniform float retroreflectivity;\n#endif\n#ifdef USE_IRIDESCENCE\n	uniform float iridescence;\n	uniform float iridescenceIOR;\n	uniform float iridescenceThicknessMinimum;\n	uniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n	uniform vec3 sheenColor;\n	uniform float sheenRoughness;\n	#ifdef USE_SHEEN_COLORMAP\n		uniform sampler2D sheenColorMap;\n	#endif\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		uniform sampler2D sheenRoughnessMap;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	uniform vec2 anisotropyVector;\n	#ifdef USE_ANISOTROPYMAP\n		uniform sampler2D anisotropyMap;\n	#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <clearcoat_normal_fragment_begin>\n	#include <clearcoat_normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_physical_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n	#include <transmission_fragment>\n	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n	#ifdef USE_SHEEN\n \n		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;\n \n 	#endif\n	#ifdef USE_CLEARCOAT\n		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n	#endif\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
var vertex$4 = "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}";
var fragment$4 = "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_toon_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}";
var vertex$3 = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n	varying vec2 vUv;\n	uniform mat3 uvTransform;\n#endif\nvoid main() {\n	#ifdef USE_POINTS_UV\n		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	#endif\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	gl_PointSize = size;\n	#ifdef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n	#endif\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <fog_vertex>\n}";
var fragment$3 = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}";
var vertex$2 = "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}";
var fragment$2 = "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n	#include <logdepthbuf_fragment>\n	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}";
var vertex$1 = "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	vec4 mvPosition = modelViewMatrix[ 3 ];\n	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n	#ifndef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) scale *= - mvPosition.z;\n	#endif\n	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n	vec2 rotatedPosition;\n	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n	mvPosition.xy += rotatedPosition;\n	gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}";
var fragment$1 = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}";
var ShaderChunk = {
  alphahash_fragment,
  alphahash_pars_fragment,
  alphamap_fragment,
  alphamap_pars_fragment,
  alphatest_fragment,
  alphatest_pars_fragment,
  aomap_fragment,
  aomap_pars_fragment,
  batching_pars_vertex,
  batching_vertex,
  begin_vertex,
  beginnormal_vertex,
  bsdfs,
  iridescence_fragment,
  bumpmap_pars_fragment,
  clipping_planes_fragment,
  clipping_planes_pars_fragment,
  clipping_planes_pars_vertex,
  clipping_planes_vertex,
  color_fragment,
  color_pars_fragment,
  color_pars_vertex,
  color_vertex,
  common,
  defaultnormal_vertex,
  displacementmap_pars_vertex,
  displacementmap_vertex,
  emissivemap_fragment,
  emissivemap_pars_fragment,
  colorspace_fragment,
  colorspace_pars_fragment,
  envmap_fragment,
  envmap_common_pars_fragment,
  envmap_pars_fragment,
  envmap_pars_vertex,
  envmap_physical_pars_fragment,
  envmap_vertex,
  fog_vertex,
  fog_pars_vertex,
  fog_fragment,
  fog_pars_fragment,
  gradientmap_pars_fragment,
  lightmap_pars_fragment,
  lights_lambert_fragment,
  lights_lambert_pars_fragment,
  lights_pars_begin,
  lights_toon_fragment,
  lights_toon_pars_fragment,
  lights_phong_fragment,
  lights_phong_pars_fragment,
  lights_physical_fragment,
  lights_physical_pars_fragment,
  lights_fragment_begin,
  lights_fragment_maps,
  lights_fragment_end,
  lightprobes_pars_fragment,
  logdepthbuf_fragment,
  logdepthbuf_pars_fragment,
  logdepthbuf_pars_vertex,
  logdepthbuf_vertex,
  map_fragment,
  map_pars_fragment,
  map_particle_fragment,
  map_particle_pars_fragment,
  metalnessmap_fragment,
  metalnessmap_pars_fragment,
  morphinstance_vertex,
  morphcolor_vertex,
  morphnormal_vertex,
  morphtarget_pars_vertex,
  morphtarget_vertex,
  normal_fragment_begin,
  normal_fragment_maps,
  normal_pars_fragment,
  normal_pars_vertex,
  normal_vertex,
  normalmap_pars_fragment,
  clearcoat_normal_fragment_begin,
  clearcoat_normal_fragment_maps,
  clearcoat_pars_fragment,
  iridescence_pars_fragment,
  opaque_fragment,
  packing,
  premultiplied_alpha_fragment,
  project_vertex,
  dithering_fragment,
  dithering_pars_fragment,
  roughnessmap_fragment,
  roughnessmap_pars_fragment,
  shadowmap_pars_fragment,
  shadowmap_pars_vertex,
  shadowmap_vertex,
  shadowmask_pars_fragment,
  skinbase_vertex,
  skinning_pars_vertex,
  skinning_vertex,
  skinnormal_vertex,
  specularmap_fragment,
  specularmap_pars_fragment,
  tonemapping_fragment,
  tonemapping_pars_fragment,
  transmission_fragment,
  transmission_pars_fragment,
  uv_pars_fragment,
  uv_pars_vertex,
  uv_vertex,
  worldpos_vertex,
  background_vert: vertex$h,
  background_frag: fragment$h,
  backgroundCube_vert: vertex$g,
  backgroundCube_frag: fragment$g,
  cube_vert: vertex$f,
  cube_frag: fragment$f,
  depth_vert: vertex$e,
  depth_frag: fragment$e,
  distance_vert: vertex$d,
  distance_frag: fragment$d,
  equirect_vert: vertex$c,
  equirect_frag: fragment$c,
  linedashed_vert: vertex$b,
  linedashed_frag: fragment$b,
  meshbasic_vert: vertex$a,
  meshbasic_frag: fragment$a,
  meshlambert_vert: vertex$9,
  meshlambert_frag: fragment$9,
  meshmatcap_vert: vertex$8,
  meshmatcap_frag: fragment$8,
  meshnormal_vert: vertex$7,
  meshnormal_frag: fragment$7,
  meshphong_vert: vertex$6,
  meshphong_frag: fragment$6,
  meshphysical_vert: vertex$5,
  meshphysical_frag: fragment$5,
  meshtoon_vert: vertex$4,
  meshtoon_frag: fragment$4,
  points_vert: vertex$3,
  points_frag: fragment$3,
  shadow_vert: vertex$2,
  shadow_frag: fragment$2,
  sprite_vert: vertex$1,
  sprite_frag: fragment$1
};
var UniformsLib = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Color(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Matrix3() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Matrix3() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Matrix3() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Matrix3() },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 },
    // basic, lambert, phong
    dfgLUT: { value: null }
    // DFG LUT for physically-based rendering
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Matrix3() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Matrix3() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Matrix3() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Matrix3() },
    normalScale: { value: /* @__PURE__ */ new Vector2(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Matrix3() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Matrix3() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Matrix3() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Matrix3() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Color(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    sunLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    sunLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    sunShadowMatrix: { value: [] },
    sunShadowCascade: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null },
    probesSH: { value: [] },
    probesMin: { value: [] },
    probesMax: { value: [] },
    probesResolution: { value: [] }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Color(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Matrix3() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Matrix3() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Color(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Vector2(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Matrix3() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Matrix3() },
    alphaTest: { value: 0 }
  }
};
var ShaderLib = {
  basic: {
    uniforms: /* @__PURE__ */ mergeUniforms([
      UniformsLib.common,
      UniformsLib.specularmap,
      UniformsLib.envmap,
      UniformsLib.aomap,
      UniformsLib.lightmap,
      UniformsLib.fog
    ]),
    vertexShader: ShaderChunk.meshbasic_vert,
    fragmentShader: ShaderChunk.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ mergeUniforms([
      UniformsLib.common,
      UniformsLib.specularmap,
      UniformsLib.envmap,
      UniformsLib.aomap,
      UniformsLib.lightmap,
      UniformsLib.emissivemap,
      UniformsLib.bumpmap,
      UniformsLib.normalmap,
      UniformsLib.displacementmap,
      UniformsLib.fog,
      UniformsLib.lights,
      {
        emissive: { value: /* @__PURE__ */ new Color(0) },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: ShaderChunk.meshlambert_vert,
    fragmentShader: ShaderChunk.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ mergeUniforms([
      UniformsLib.common,
      UniformsLib.specularmap,
      UniformsLib.envmap,
      UniformsLib.aomap,
      UniformsLib.lightmap,
      UniformsLib.emissivemap,
      UniformsLib.bumpmap,
      UniformsLib.normalmap,
      UniformsLib.displacementmap,
      UniformsLib.fog,
      UniformsLib.lights,
      {
        emissive: { value: /* @__PURE__ */ new Color(0) },
        specular: { value: /* @__PURE__ */ new Color(1118481) },
        shininess: { value: 30 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: ShaderChunk.meshphong_vert,
    fragmentShader: ShaderChunk.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ mergeUniforms([
      UniformsLib.common,
      UniformsLib.envmap,
      UniformsLib.aomap,
      UniformsLib.lightmap,
      UniformsLib.emissivemap,
      UniformsLib.bumpmap,
      UniformsLib.normalmap,
      UniformsLib.displacementmap,
      UniformsLib.roughnessmap,
      UniformsLib.metalnessmap,
      UniformsLib.fog,
      UniformsLib.lights,
      {
        emissive: { value: /* @__PURE__ */ new Color(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: ShaderChunk.meshphysical_vert,
    fragmentShader: ShaderChunk.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ mergeUniforms([
      UniformsLib.common,
      UniformsLib.aomap,
      UniformsLib.lightmap,
      UniformsLib.emissivemap,
      UniformsLib.bumpmap,
      UniformsLib.normalmap,
      UniformsLib.displacementmap,
      UniformsLib.gradientmap,
      UniformsLib.fog,
      UniformsLib.lights,
      {
        emissive: { value: /* @__PURE__ */ new Color(0) }
      }
    ]),
    vertexShader: ShaderChunk.meshtoon_vert,
    fragmentShader: ShaderChunk.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ mergeUniforms([
      UniformsLib.common,
      UniformsLib.bumpmap,
      UniformsLib.normalmap,
      UniformsLib.displacementmap,
      UniformsLib.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: ShaderChunk.meshmatcap_vert,
    fragmentShader: ShaderChunk.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ mergeUniforms([
      UniformsLib.points,
      UniformsLib.fog
    ]),
    vertexShader: ShaderChunk.points_vert,
    fragmentShader: ShaderChunk.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ mergeUniforms([
      UniformsLib.common,
      UniformsLib.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: ShaderChunk.linedashed_vert,
    fragmentShader: ShaderChunk.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ mergeUniforms([
      UniformsLib.common,
      UniformsLib.displacementmap
    ]),
    vertexShader: ShaderChunk.depth_vert,
    fragmentShader: ShaderChunk.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ mergeUniforms([
      UniformsLib.common,
      UniformsLib.bumpmap,
      UniformsLib.normalmap,
      UniformsLib.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: ShaderChunk.meshnormal_vert,
    fragmentShader: ShaderChunk.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ mergeUniforms([
      UniformsLib.sprite,
      UniformsLib.fog
    ]),
    vertexShader: ShaderChunk.sprite_vert,
    fragmentShader: ShaderChunk.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Matrix3() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: ShaderChunk.background_vert,
    fragmentShader: ShaderChunk.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Matrix3() }
    },
    vertexShader: ShaderChunk.backgroundCube_vert,
    fragmentShader: ShaderChunk.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: ShaderChunk.cube_vert,
    fragmentShader: ShaderChunk.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: ShaderChunk.equirect_vert,
    fragmentShader: ShaderChunk.equirect_frag
  },
  distance: {
    uniforms: /* @__PURE__ */ mergeUniforms([
      UniformsLib.common,
      UniformsLib.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new Vector3() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: ShaderChunk.distance_vert,
    fragmentShader: ShaderChunk.distance_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ mergeUniforms([
      UniformsLib.lights,
      UniformsLib.fog,
      {
        color: { value: /* @__PURE__ */ new Color(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: ShaderChunk.shadow_vert,
    fragmentShader: ShaderChunk.shadow_frag
  }
};
ShaderLib.physical = {
  uniforms: /* @__PURE__ */ mergeUniforms([
    ShaderLib.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new Vector2(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      diffuseRoughness: { value: 0 },
      diffuseRoughnessMap: { value: null },
      diffuseRoughnessMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      dispersion: { value: 0 },
      retroreflectivity: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Color(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new Vector2() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Color(0) },
      specularColor: { value: /* @__PURE__ */ new Color(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Matrix3() },
      anisotropyVector: { value: /* @__PURE__ */ new Vector2() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Matrix3() }
    }
  ]),
  vertexShader: ShaderChunk.meshphysical_vert,
  fragmentShader: ShaderChunk.meshphysical_frag
};
var _m$1 = /* @__PURE__ */ new Matrix3();
_m$1.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
var toneMappingMap = {
  [LinearToneMapping]: "LINEAR_TONE_MAPPING",
  [ReinhardToneMapping]: "REINHARD_TONE_MAPPING",
  [CineonToneMapping]: "CINEON_TONE_MAPPING",
  [ACESFilmicToneMapping]: "ACES_FILMIC_TONE_MAPPING",
  [AgXToneMapping]: "AGX_TONE_MAPPING",
  [NeutralToneMapping]: "NEUTRAL_TONE_MAPPING",
  [CustomToneMapping]: "CUSTOM_TONE_MAPPING"
};
var mat4array = new Float32Array(16);
var mat3array = new Float32Array(9);
var mat2array = new Float32Array(4);
var toneMappingFunctions = {
  [LinearToneMapping]: "Linear",
  [ReinhardToneMapping]: "Reinhard",
  [CineonToneMapping]: "Cineon",
  [ACESFilmicToneMapping]: "ACESFilmic",
  [AgXToneMapping]: "AgX",
  [NeutralToneMapping]: "Neutral",
  [CustomToneMapping]: "Custom"
};
var shadowMapTypeDefines = {
  [PCFShadowMap]: "SHADOWMAP_TYPE_PCF",
  [VSMShadowMap]: "SHADOWMAP_TYPE_VSM"
};
var envMapModeDefines = {
  [CubeRefractionMapping]: "ENVMAP_MODE_REFRACTION"
};
var envMapBlendingDefines = {
  [MultiplyOperation]: "ENVMAP_BLENDING_MULTIPLY",
  [MixOperation]: "ENVMAP_BLENDING_MIX",
  [AddOperation]: "ENVMAP_BLENDING_ADD"
};
var _m = /* @__PURE__ */ new Matrix3();
_m.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
var DATA = new Uint16Array([
  12469,
  15057,
  12620,
  14925,
  13266,
  14620,
  13807,
  14376,
  14323,
  13990,
  14545,
  13625,
  14713,
  13328,
  14840,
  12882,
  14931,
  12528,
  14996,
  12233,
  15039,
  11829,
  15066,
  11525,
  15080,
  11295,
  15085,
  10976,
  15082,
  10705,
  15073,
  10495,
  13880,
  14564,
  13898,
  14542,
  13977,
  14430,
  14158,
  14124,
  14393,
  13732,
  14556,
  13410,
  14702,
  12996,
  14814,
  12596,
  14891,
  12291,
  14937,
  11834,
  14957,
  11489,
  14958,
  11194,
  14943,
  10803,
  14921,
  10506,
  14893,
  10278,
  14858,
  9960,
  14484,
  14039,
  14487,
  14025,
  14499,
  13941,
  14524,
  13740,
  14574,
  13468,
  14654,
  13106,
  14743,
  12678,
  14818,
  12344,
  14867,
  11893,
  14889,
  11509,
  14893,
  11180,
  14881,
  10751,
  14852,
  10428,
  14812,
  10128,
  14765,
  9754,
  14712,
  9466,
  14764,
  13480,
  14764,
  13475,
  14766,
  13440,
  14766,
  13347,
  14769,
  13070,
  14786,
  12713,
  14816,
  12387,
  14844,
  11957,
  14860,
  11549,
  14868,
  11215,
  14855,
  10751,
  14825,
  10403,
  14782,
  10044,
  14729,
  9651,
  14666,
  9352,
  14599,
  9029,
  14967,
  12835,
  14966,
  12831,
  14963,
  12804,
  14954,
  12723,
  14936,
  12564,
  14917,
  12347,
  14900,
  11958,
  14886,
  11569,
  14878,
  11247,
  14859,
  10765,
  14828,
  10401,
  14784,
  10011,
  14727,
  9600,
  14660,
  9289,
  14586,
  8893,
  14508,
  8533,
  15111,
  12234,
  15110,
  12234,
  15104,
  12216,
  15092,
  12156,
  15067,
  12010,
  15028,
  11776,
  14981,
  11500,
  14942,
  11205,
  14902,
  10752,
  14861,
  10393,
  14812,
  9991,
  14752,
  9570,
  14682,
  9252,
  14603,
  8808,
  14519,
  8445,
  14431,
  8145,
  15209,
  11449,
  15208,
  11451,
  15202,
  11451,
  15190,
  11438,
  15163,
  11384,
  15117,
  11274,
  15055,
  10979,
  14994,
  10648,
  14932,
  10343,
  14871,
  9936,
  14803,
  9532,
  14729,
  9218,
  14645,
  8742,
  14556,
  8381,
  14461,
  8020,
  14365,
  7603,
  15273,
  10603,
  15272,
  10607,
  15267,
  10619,
  15256,
  10631,
  15231,
  10614,
  15182,
  10535,
  15118,
  10389,
  15042,
  10167,
  14963,
  9787,
  14883,
  9447,
  14800,
  9115,
  14710,
  8665,
  14615,
  8318,
  14514,
  7911,
  14411,
  7507,
  14279,
  7198,
  15314,
  9675,
  15313,
  9683,
  15309,
  9712,
  15298,
  9759,
  15277,
  9797,
  15229,
  9773,
  15166,
  9668,
  15084,
  9487,
  14995,
  9274,
  14898,
  8910,
  14800,
  8539,
  14697,
  8234,
  14590,
  7790,
  14479,
  7409,
  14367,
  7067,
  14178,
  6621,
  15337,
  8619,
  15337,
  8631,
  15333,
  8677,
  15325,
  8769,
  15305,
  8871,
  15264,
  8940,
  15202,
  8909,
  15119,
  8775,
  15022,
  8565,
  14916,
  8328,
  14804,
  8009,
  14688,
  7614,
  14569,
  7287,
  14448,
  6888,
  14321,
  6483,
  14088,
  6171,
  15350,
  7402,
  15350,
  7419,
  15347,
  7480,
  15340,
  7613,
  15322,
  7804,
  15287,
  7973,
  15229,
  8057,
  15148,
  8012,
  15046,
  7846,
  14933,
  7611,
  14810,
  7357,
  14682,
  7069,
  14552,
  6656,
  14421,
  6316,
  14251,
  5948,
  14007,
  5528,
  15356,
  5942,
  15356,
  5977,
  15353,
  6119,
  15348,
  6294,
  15332,
  6551,
  15302,
  6824,
  15249,
  7044,
  15171,
  7122,
  15070,
  7050,
  14949,
  6861,
  14818,
  6611,
  14679,
  6349,
  14538,
  6067,
  14398,
  5651,
  14189,
  5311,
  13935,
  4958,
  15359,
  4123,
  15359,
  4153,
  15356,
  4296,
  15353,
  4646,
  15338,
  5160,
  15311,
  5508,
  15263,
  5829,
  15188,
  6042,
  15088,
  6094,
  14966,
  6001,
  14826,
  5796,
  14678,
  5543,
  14527,
  5287,
  14377,
  4985,
  14133,
  4586,
  13869,
  4257,
  15360,
  1563,
  15360,
  1642,
  15358,
  2076,
  15354,
  2636,
  15341,
  3350,
  15317,
  4019,
  15273,
  4429,
  15203,
  4732,
  15105,
  4911,
  14981,
  4932,
  14836,
  4818,
  14679,
  4621,
  14517,
  4386,
  14359,
  4156,
  14083,
  3795,
  13808,
  3437,
  15360,
  122,
  15360,
  137,
  15358,
  285,
  15355,
  636,
  15344,
  1274,
  15322,
  2177,
  15281,
  2765,
  15215,
  3223,
  15120,
  3451,
  14995,
  3569,
  14846,
  3567,
  14681,
  3466,
  14511,
  3305,
  14344,
  3121,
  14037,
  2800,
  13753,
  2467,
  15360,
  0,
  15360,
  1,
  15359,
  21,
  15355,
  89,
  15346,
  253,
  15325,
  479,
  15287,
  796,
  15225,
  1148,
  15133,
  1492,
  15008,
  1749,
  14856,
  1882,
  14685,
  1886,
  14506,
  1783,
  14324,
  1608,
  13996,
  1398,
  13702,
  1183
]);

// ../../../../../tmp/one-phase-cpu-render/three/package/examples/jsm/loaders/HDRLoader.js
var HDRLoader = class extends DataTextureLoader {
  /**
      * Constructs a new RGBE/HDR loader.
      *
      * @param {LoadingManager} [manager] - The loading manager.
      */
  constructor(manager) {
    super(manager);
    this.type = HalfFloatType;
  }
  /**
      * Parses the given RGBE texture data.
      *
      * @param {ArrayBuffer} buffer - The raw texture data.
      * @return {DataTextureLoader~TexData} An object representing the parsed texture data.
      */
  parse(buffer) {
    const rgbe_read_error = 1, rgbe_write_error = 2, rgbe_format_error = 3, rgbe_memory_error = 4, rgbe_error = function(rgbe_error_code, msg) {
      switch (rgbe_error_code) {
        case rgbe_read_error:
          throw new Error("THREE.HDRLoader: Read Error: " + (msg || ""));
        case rgbe_write_error:
          throw new Error("THREE.HDRLoader: Write Error: " + (msg || ""));
        case rgbe_format_error:
          throw new Error("THREE.HDRLoader: Bad File Format: " + (msg || ""));
        default:
        case rgbe_memory_error:
          throw new Error("THREE.HDRLoader: Memory Error: " + (msg || ""));
      }
    }, RGBE_VALID_PROGRAMTYPE = 1, RGBE_VALID_FORMAT = 2, RGBE_VALID_DIMENSIONS = 4, NEWLINE = "\n", fgets = function(buffer2, lineLimit, consume) {
      const chunkSize = 128;
      lineLimit = !lineLimit ? 1024 : lineLimit;
      let p = buffer2.pos, i = -1, len = 0, s = "", chunk = String.fromCharCode.apply(null, new Uint16Array(buffer2.subarray(p, p + chunkSize)));
      while (0 > (i = chunk.indexOf(NEWLINE)) && len < lineLimit && p < buffer2.byteLength) {
        s += chunk;
        len += chunk.length;
        p += chunkSize;
        chunk = String.fromCharCode.apply(null, new Uint16Array(buffer2.subarray(p, p + chunkSize)));
      }
      if (-1 < i) {
        if (false !== consume) buffer2.pos += len + i + 1;
        return s + chunk.slice(0, i);
      }
      return false;
    }, RGBE_ReadHeader = function(buffer2) {
      const magic_token_re = /^#\?(\S+)/, gamma_re = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, exposure_re = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, format_re = /^\s*FORMAT=(\S+)\s*$/, dimensions_re = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, header = {
        valid: 0,
        /* indicate which fields are valid */
        string: "",
        /* the actual header string */
        comments: "",
        /* comments found in header */
        programtype: "RGBE",
        /* listed at beginning of file to identify it after "#?". defaults to "RGBE" */
        format: "",
        /* RGBE format, default 32-bit_rle_rgbe */
        gamma: 1,
        /* image has already been gamma corrected with given gamma. defaults to 1.0 (no correction) */
        exposure: 1,
        /* a value of 1.0 in an image corresponds to <exposure> watts/steradian/m^2. defaults to 1.0 */
        width: 0,
        height: 0
        /* image dimensions, width/height */
      };
      let line, match;
      if (buffer2.pos >= buffer2.byteLength || !(line = fgets(buffer2))) {
        rgbe_error(rgbe_read_error, "no header found");
      }
      if (!(match = line.match(magic_token_re))) {
        rgbe_error(rgbe_format_error, "bad initial token");
      }
      header.valid |= RGBE_VALID_PROGRAMTYPE;
      header.programtype = match[1];
      header.string += line + "\n";
      while (true) {
        line = fgets(buffer2);
        if (false === line) break;
        header.string += line + "\n";
        if ("#" === line.charAt(0)) {
          header.comments += line + "\n";
          continue;
        }
        if (match = line.match(gamma_re)) {
          header.gamma = parseFloat(match[1]);
        }
        if (match = line.match(exposure_re)) {
          header.exposure = parseFloat(match[1]);
        }
        if (match = line.match(format_re)) {
          header.valid |= RGBE_VALID_FORMAT;
          header.format = match[1];
        }
        if (match = line.match(dimensions_re)) {
          header.valid |= RGBE_VALID_DIMENSIONS;
          header.height = parseInt(match[1], 10);
          header.width = parseInt(match[2], 10);
        }
        if (header.valid & RGBE_VALID_FORMAT && header.valid & RGBE_VALID_DIMENSIONS) break;
      }
      if (!(header.valid & RGBE_VALID_FORMAT)) {
        rgbe_error(rgbe_format_error, "missing format specifier");
      }
      if (!(header.valid & RGBE_VALID_DIMENSIONS)) {
        rgbe_error(rgbe_format_error, "missing image size specifier");
      }
      return header;
    }, RGBE_ReadPixels_RLE = function(buffer2, w2, h2) {
      const scanline_width = w2;
      if (
        // run length encoding is not allowed so read flat
        scanline_width < 8 || scanline_width > 32767 || // this file is not run length encoded
        (2 !== buffer2[0] || 2 !== buffer2[1] || buffer2[2] & 128)
      ) {
        return new Uint8Array(buffer2);
      }
      if (scanline_width !== (buffer2[2] << 8 | buffer2[3])) {
        rgbe_error(rgbe_format_error, "wrong scanline width");
      }
      const data_rgba = new Uint8Array(4 * w2 * h2);
      if (!data_rgba.length) {
        rgbe_error(rgbe_memory_error, "unable to allocate buffer space");
      }
      let offset = 0, pos = 0;
      const ptr_end = 4 * scanline_width;
      const rgbeStart = new Uint8Array(4);
      const scanline_buffer = new Uint8Array(ptr_end);
      let num_scanlines = h2;
      while (num_scanlines > 0 && pos < buffer2.byteLength) {
        if (pos + 4 > buffer2.byteLength) {
          rgbe_error(rgbe_read_error);
        }
        rgbeStart[0] = buffer2[pos++];
        rgbeStart[1] = buffer2[pos++];
        rgbeStart[2] = buffer2[pos++];
        rgbeStart[3] = buffer2[pos++];
        if (2 != rgbeStart[0] || 2 != rgbeStart[1] || (rgbeStart[2] << 8 | rgbeStart[3]) != scanline_width) {
          rgbe_error(rgbe_format_error, "bad rgbe scanline format");
        }
        let ptr = 0, count;
        while (ptr < ptr_end && pos < buffer2.byteLength) {
          count = buffer2[pos++];
          const isEncodedRun = count > 128;
          if (isEncodedRun) count -= 128;
          if (0 === count || ptr + count > ptr_end) {
            rgbe_error(rgbe_format_error, "bad scanline data");
          }
          if (isEncodedRun) {
            const byteValue = buffer2[pos++];
            for (let i = 0; i < count; i++) {
              scanline_buffer[ptr++] = byteValue;
            }
          } else {
            scanline_buffer.set(buffer2.subarray(pos, pos + count), ptr);
            ptr += count;
            pos += count;
          }
        }
        const l = scanline_width;
        for (let i = 0; i < l; i++) {
          let off = 0;
          data_rgba[offset] = scanline_buffer[i + off];
          off += scanline_width;
          data_rgba[offset + 1] = scanline_buffer[i + off];
          off += scanline_width;
          data_rgba[offset + 2] = scanline_buffer[i + off];
          off += scanline_width;
          data_rgba[offset + 3] = scanline_buffer[i + off];
          offset += 4;
        }
        num_scanlines--;
      }
      return data_rgba;
    };
    const RGBEByteToRGBFloat = function(sourceArray, sourceOffset, destArray, destOffset) {
      const e = sourceArray[sourceOffset + 3];
      const scale2 = Math.pow(2, e - 128) / 255;
      destArray[destOffset + 0] = sourceArray[sourceOffset + 0] * scale2;
      destArray[destOffset + 1] = sourceArray[sourceOffset + 1] * scale2;
      destArray[destOffset + 2] = sourceArray[sourceOffset + 2] * scale2;
      destArray[destOffset + 3] = 1;
    };
    const RGBEByteToRGBHalf = function(sourceArray, sourceOffset, destArray, destOffset) {
      const e = sourceArray[sourceOffset + 3];
      const scale2 = Math.pow(2, e - 128) / 255;
      destArray[destOffset + 0] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 0] * scale2, 65504));
      destArray[destOffset + 1] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 1] * scale2, 65504));
      destArray[destOffset + 2] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 2] * scale2, 65504));
      destArray[destOffset + 3] = DataUtils.toHalfFloat(1);
    };
    const byteArray = new Uint8Array(buffer);
    byteArray.pos = 0;
    const rgbe_header_info = RGBE_ReadHeader(byteArray);
    const w = rgbe_header_info.width, h = rgbe_header_info.height, image_rgba_data = RGBE_ReadPixels_RLE(byteArray.subarray(byteArray.pos), w, h);
    let data, type;
    let numElements;
    switch (this.type) {
      case FloatType:
        numElements = image_rgba_data.length / 4;
        const floatArray = new Float32Array(numElements * 4);
        for (let j = 0; j < numElements; j++) {
          RGBEByteToRGBFloat(image_rgba_data, j * 4, floatArray, j * 4);
        }
        data = floatArray;
        type = FloatType;
        break;
      case HalfFloatType:
        numElements = image_rgba_data.length / 4;
        const halfArray = new Uint16Array(numElements * 4);
        for (let j = 0; j < numElements; j++) {
          RGBEByteToRGBHalf(image_rgba_data, j * 4, halfArray, j * 4);
        }
        data = halfArray;
        type = HalfFloatType;
        break;
      default:
        throw new Error("THREE.HDRLoader: Unsupported type: " + this.type);
    }
    return {
      width: w,
      height: h,
      data,
      header: rgbe_header_info.string,
      gamma: rgbe_header_info.gamma,
      exposure: rgbe_header_info.exposure,
      type,
      colorSpace: LinearSRGBColorSpace,
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      generateMipmaps: false,
      flipY: true
    };
  }
  /**
      * Sets the texture type.
      *
      * @param {(HalfFloatType|FloatType)} value - The texture type to set.
      * @return {HDRLoader} A reference to this loader.
      */
  setDataType(value) {
    this.type = value;
    return this;
  }
};

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/glsl.js
var ShaderError = class extends Error {
  constructor(message) {
    super(`CPU GLSL: ${message}`);
    this.name = "ShaderError";
  }
};
var qualifiers = /* @__PURE__ */ new Set([
  "const",
  "uniform",
  "varying",
  "attribute",
  "in",
  "out",
  "inout",
  "highp",
  "mediump",
  "lowp",
  "flat",
  "smooth",
  "centroid"
]);
var types = /* @__PURE__ */ new Set([
  "void",
  "float",
  "int",
  "uint",
  "bool",
  "vec2",
  "vec3",
  "vec4",
  "ivec2",
  "ivec3",
  "ivec4",
  "uvec2",
  "uvec3",
  "uvec4",
  "bvec2",
  "bvec3",
  "bvec4",
  "mat2",
  "mat3",
  "mat4",
  "sampler2D"
]);
var precedence = {
  "=": 1,
  "+=": 1,
  "-=": 1,
  "*=": 1,
  "/=": 1,
  "%=": 1,
  "&=": 1,
  "|=": 1,
  "^=": 1,
  "<<=": 1,
  ">>=": 1,
  "?": 2,
  "||": 3,
  "^^": 4,
  "&&": 5,
  "|": 6,
  "^": 7,
  "&": 8,
  "==": 9,
  "!=": 9,
  "<": 10,
  ">": 10,
  "<=": 10,
  ">=": 10,
  "<<": 11,
  ">>": 11,
  "+": 12,
  "-": 12,
  "*": 13,
  "/": 13,
  "%": 13
};
var literal = (value) => ({
  op: "literal",
  value,
  args: []
});
function tokenize(source) {
  const clean = source.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
  const tokens = [];
  const pattern = /\s+|0[xX][\da-fA-F]+[uU]?|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?[fFuU]?|[A-Za-z_]\w*|<<=|>>=|\+\+|--|[+\-*/%=!<>&|^]=|&&|\|\||\^\^|<<|>>|[{}()[\].,;?:+\-*/%!=<>~&|^]/y;
  let index = 0;
  while (index < clean.length) {
    pattern.lastIndex = index;
    const match = pattern.exec(clean);
    if (!match)
      throw new ShaderError(`unexpected token near '${clean.slice(index, index + 32)}'`);
    index = pattern.lastIndex;
    if (match[0].trim())
      tokens.push(match[0]);
  }
  return tokens;
}
var Parser = class {
  tokens;
  index = 0;
  functions = /* @__PURE__ */ new Map();
  globals = [];
  varyings = [];
  outputs = [];
  structs = /* @__PURE__ */ new Map();
  isType(name) {
    return types.has(name) || this.structs.has(name);
  }
  constructor(tokens) {
    this.tokens = tokens;
  }
  peek(offset = 0) {
    return this.tokens[this.index + offset] ?? "";
  }
  take() {
    if (!this.peek())
      throw new ShaderError("unexpected end of source");
    return this.tokens[this.index++];
  }
  match(token) {
    if (this.peek() !== token)
      return false;
    this.index++;
    return true;
  }
  expect(token) {
    if (!this.match(token))
      throw new ShaderError(`expected '${token}', got '${this.peek()}'`);
  }
  identifier() {
    const name = this.take();
    if (!/^[A-Za-z_]\w*$/.test(name))
      throw new ShaderError(`expected identifier, got '${name}'`);
    return name;
  }
  declarationHeader() {
    let qualifier = "";
    while (qualifiers.has(this.peek())) {
      const q = this.take();
      if (["uniform", "varying", "attribute", "in", "out", "inout"].includes(q))
        qualifier = q;
    }
    const type = this.take();
    if (!this.isType(type))
      throw new ShaderError(`unsupported type '${type}'`);
    return {
      type,
      qualifier
    };
  }
  parse() {
    while (this.peek()) {
      if (this.match("struct")) {
        const name2 = this.identifier();
        if (this.isType(name2))
          throw new ShaderError(`duplicate type '${name2}'`);
        this.expect("{");
        const fields = [];
        while (this.peek() && this.peek() !== "}") {
          const { type: type2, qualifier: qualifier2 } = this.declarationHeader();
          fields.push(...this.declarations(type2, qualifier2, this.identifier()).body);
        }
        this.expect("}");
        this.structs.set(name2, fields);
        if (!this.match(";"))
          this.globals.push(...this.declarations(name2, "", this.identifier()).body);
        continue;
      }
      if (this.match("precision")) {
        this.take();
        this.take();
        this.expect(";");
        continue;
      }
      const { type, qualifier } = this.declarationHeader();
      const name = this.identifier();
      if (this.match("(")) {
        const parameters = [];
        if (this.peek() === "void" && this.peek(1) === ")")
          this.take();
        else if (this.peek() !== ")")
          do {
            const h = this.declarationHeader();
            const n = this.identifier();
            let size2;
            if (this.match("[")) {
              size2 = this.peek() === "]" ? literal(0) : this.expression();
              this.expect("]");
            }
            parameters.push({
              ...h,
              name: n,
              size: size2
            });
          } while (this.match(","));
        this.expect(")");
        if (this.match(";"))
          continue;
        const body = this.statement();
        const overloads = this.functions.get(name) ?? [];
        overloads.push({
          returnType: type,
          parameters,
          body
        });
        this.functions.set(name, overloads);
      } else {
        const declarations = this.declarations(type, qualifier, name);
        this.globals.push(...declarations.body);
        if (qualifier === "varying" || qualifier === "out" || qualifier === "in")
          this.varyings.push(...declarations.body.map((s) => s.name));
        if (qualifier === "out")
          this.outputs.push(...declarations.body.map((s) => s.name));
      }
    }
    if (!this.functions.has("main"))
      throw new ShaderError("missing main()");
    return this;
  }
  declarations(type, qualifier, firstName) {
    const body = [];
    let name = firstName;
    do {
      let size2;
      if (this.match("[")) {
        size2 = this.peek() === "]" ? literal(0) : this.expression();
        this.expect("]");
      }
      const init = this.match("=") ? this.expression(2) : {
        op: "default",
        name: type,
        args: []
      };
      body.push({
        kind: "declare",
        name,
        type,
        qualifier,
        expressions: [init, ...size2 ? [size2] : []]
      });
      if (!this.match(","))
        break;
      name = this.identifier();
    } while (this.peek());
    this.expect(";");
    return {
      kind: "sequence",
      body
    };
  }
  statement() {
    if (this.match("{")) {
      const body = [];
      while (this.peek() && this.peek() !== "}")
        body.push(this.statement());
      this.expect("}");
      return {
        kind: "block",
        body
      };
    }
    if (this.match(";"))
      return {
        kind: "sequence",
        body: []
      };
    if (this.match("if")) {
      this.expect("(");
      const condition = this.expression();
      this.expect(")");
      const body = [this.statement()];
      const alternate = this.match("else") ? this.statement() : void 0;
      return {
        kind: "if",
        expressions: [condition],
        body,
        alternate
      };
    }
    if (this.match("for")) {
      this.expect("(");
      const init = this.statement();
      const test = this.peek() === ";" ? literal(true) : this.expression();
      this.expect(";");
      const increment = this.peek() === ")" ? literal(0) : this.expression();
      this.expect(")");
      return {
        kind: "for",
        body: [init, this.statement()],
        expressions: [test, increment]
      };
    }
    if (this.match("while")) {
      this.expect("(");
      const test = this.expression();
      this.expect(")");
      return {
        kind: "while",
        expressions: [test],
        body: [this.statement()]
      };
    }
    if (this.match("do")) {
      const body = [this.statement()];
      this.expect("while");
      this.expect("(");
      const test = this.expression();
      this.expect(")");
      this.expect(";");
      return { kind: "do", expressions: [test], body };
    }
    if (this.match("switch")) {
      this.expect("(");
      const selector = this.expression();
      this.expect(")");
      this.expect("{");
      const body = [];
      let branch;
      let hasDefault = false;
      while (this.peek() && this.peek() !== "}") {
        if (this.match("case")) {
          branch = { kind: "case", expressions: [this.expression()], body: [] };
          this.expect(":");
          body.push(branch);
        } else if (this.match("default")) {
          if (hasDefault)
            throw new ShaderError("duplicate switch default");
          hasDefault = true;
          branch = { kind: "case", body: [] };
          this.expect(":");
          body.push(branch);
        } else {
          if (!branch)
            throw new ShaderError("expected switch label");
          branch.body.push(this.statement());
        }
      }
      this.expect("}");
      return { kind: "switch", expressions: [selector], body };
    }
    if (["return", "discard", "break", "continue"].includes(this.peek())) {
      const kind = this.take();
      const expressions = kind === "return" && this.peek() !== ";" ? [this.expression()] : [];
      this.expect(";");
      return {
        kind,
        expressions
      };
    }
    if (this.isType(this.peek()) || qualifiers.has(this.peek())) {
      const { type, qualifier } = this.declarationHeader();
      return this.declarations(type, qualifier, this.identifier());
    }
    const expression = this.expression();
    this.expect(";");
    return {
      kind: "expression",
      expressions: [expression]
    };
  }
  expression(min = 1) {
    let left;
    const token = this.take();
    if (["-", "+", "!", "~", "++", "--"].includes(token))
      left = {
        op: `pre${token}`,
        args: [this.expression(14)]
      };
    else if (token === "(") {
      left = this.expression();
      this.expect(")");
    } else if (/^(?:\d|\.\d)/.test(token))
      left = {
        ...literal(Number(token.replace(/^0[xX]/.test(token) ? /[uU]$/ : /[fFuU]$/, ""))),
        type: /[uU]$/.test(token) ? "uint" : !/^0[xX]/.test(token) && /[.eEfF]/.test(token) ? "float" : "int"
      };
    else if (token === "true" || token === "false")
      left = literal(token === "true");
    else if (/^[A-Za-z_]\w*$/.test(token))
      left = {
        op: "name",
        name: token,
        args: []
      };
    else
      throw new ShaderError(`unexpected expression '${token}'`);
    while (true) {
      if (this.match(".")) {
        left = {
          op: "member",
          name: this.identifier(),
          args: [left]
        };
        continue;
      }
      if (this.match("[")) {
        const index = this.peek() === "]" ? literal(0) : this.expression();
        this.expect("]");
        left = {
          op: "index",
          args: [left, index]
        };
        continue;
      }
      if (this.match("(")) {
        const args = [];
        if (this.peek() !== ")")
          do {
            args.push(this.expression(2));
          } while (this.match(","));
        this.expect(")");
        if (left.op === "member" && left.name === "length" && args.length === 0) {
          left = { op: "arrayLength", args: left.args };
          continue;
        }
        if (left.op === "index" && left.args[0].op === "name" && this.isType(left.args[0].name)) {
          left = { op: "arrayConstructor", name: left.args[0].name, args: [left.args[1], ...args] };
          continue;
        }
        if (left.op !== "name")
          throw new ShaderError("indirect calls are unsupported");
        left = {
          op: "call",
          name: left.name,
          args
        };
        continue;
      }
      if (this.peek() === "++" || this.peek() === "--") {
        left = {
          op: `post${this.take()}`,
          args: [left]
        };
        continue;
      }
      const op = this.peek(), level = precedence[op];
      if (!level || level < min)
        break;
      this.take();
      if (op === "?") {
        const yes = this.expression();
        this.expect(":");
        left = {
          op,
          args: [left, yes, this.expression(2)]
        };
      } else
        left = {
          op,
          args: [left, this.expression(level === 1 ? 1 : level + 1)]
        };
    }
    return left;
  }
};
var copy = (v) => Array.isArray(v) ? v.map(copy) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, copy(x)])) : v;
var array = (v) => Array.isArray(v) ? v : [v];
var num = (v) => Number(v);
function map(v, fn) {
  if (typeof v === "number")
    return fn(v);
  if (isMatrix(v))
    return { matrix: map(v.matrix, fn), size: v.size };
  if (Array.isArray(v)) {
    const out = new Array(v.length);
    for (let i = 0; i < v.length; i++) {
      const x = v[i];
      out[i] = typeof x === "number" ? fn(x) : map(x, fn);
    }
    return out;
  }
  return fn(num(v));
}
function zip(a, b, fn) {
  if (typeof a === "number" && typeof b === "number")
    return fn(a, b);
  if (isMatrix(a) || isMatrix(b)) {
    if (isMatrix(a) && isMatrix(b) && a.size !== b.size)
      throw new ShaderError("matrix dimensions do not match");
    return {
      matrix: zip(isMatrix(a) ? a.matrix : a, isMatrix(b) ? b.matrix : b, fn),
      size: isMatrix(a) ? a.size : b.size
    };
  }
  if (Array.isArray(a)) {
    const n = a.length;
    if (Array.isArray(b)) {
      if (n !== 1 && b.length !== 1 && n !== b.length)
        throw new ShaderError("vector dimensions do not match");
      const m = Math.max(n, b.length), out2 = new Array(m);
      for (let i = 0; i < m; i++) {
        const x = a[n === 1 ? 0 : i], y2 = b[b.length === 1 ? 0 : i];
        out2[i] = typeof x === "number" && typeof y2 === "number" ? fn(x, y2) : zip(x, y2, fn);
      }
      return out2;
    }
    const y = num(b), out = new Array(n);
    for (let i = 0; i < n; i++) {
      const x = a[i];
      out[i] = typeof x === "number" ? fn(x, y) : zip(x, b, fn);
    }
    return out;
  }
  if (Array.isArray(b)) {
    const x = num(a), out = new Array(b.length);
    for (let i = 0; i < b.length; i++) {
      const y = b[i];
      out[i] = typeof y === "number" ? fn(x, y) : zip(a, y, fn);
    }
    return out;
  }
  return fn(num(a), num(b));
}
var matrixValue = (data) => ({
  matrix: [...data],
  size: Math.sqrt(data.length)
});
var isMatrix = (v) => !!v && typeof v === "object" && !Array.isArray(v) && "matrix" in v;
var times = (x, y) => x * y;
function multiply(a, b) {
  if (typeof a === "number" && typeof b === "number")
    return a * b;
  const am = isMatrix(a), bm = isMatrix(b);
  if (!am && !bm)
    return zip(a, b, times);
  if (am && bm) {
    const n = a.size;
    if (n !== b.size)
      throw new ShaderError("matrix dimensions do not match");
    const out = Array(n * n).fill(0);
    for (let col = 0; col < n; col++)
      for (let row = 0; row < n; row++)
        for (let k = 0; k < n; k++)
          out[col * n + row] += num(a.matrix[k * n + row]) * num(b.matrix[col * n + k]);
    return matrixValue(out);
  }
  if (am && Array.isArray(b)) {
    if (a.size !== b.length)
      throw new ShaderError("matrix dimensions do not match");
    const n = a.size, m = a.matrix, out = new Array(n);
    for (let row = 0; row < n; row++) {
      let sum = 0;
      for (let c = 0; c < b.length; c++)
        sum += num(m[c * n + row]) * num(b[c]);
      out[row] = sum;
    }
    return out;
  }
  if (Array.isArray(a) && bm) {
    if (a.length !== b.size)
      throw new ShaderError("matrix dimensions do not match");
    const n = b.size, m = b.matrix, out = new Array(n);
    for (let col = 0; col < n; col++) {
      let sum = 0;
      for (let r = 0; r < a.length; r++)
        sum += num(m[col * n + r]) * num(a[r]);
      out[col] = sum;
    }
    return out;
  }
  if (am)
    return { matrix: map(a.matrix, (v) => v * num(b)), size: a.size };
  return multiply(b, a);
}
function dot(a, b) {
  if (!Array.isArray(a))
    return num(a) * num(array(b)[0]);
  const bb = array(b);
  let sum = 0;
  for (let i = 0; i < a.length; i++)
    sum += num(a[i]) * num(bb[i]);
  return sum;
}
var normalize = (v) => map(v, (x) => x / (Math.sqrt(dot(v, v)) || 1));
var vecInfo = Object.fromEntries(["vec", "ivec", "uvec", "bvec"].flatMap((prefix) => [2, 3, 4].map((n) => [`${prefix}${n}`, { n, kind: prefix[0] }])));
function construct(type, args) {
  if (type === "float") {
    const v = args[0];
    return typeof v === "number" ? v : num(array(v ?? 0)[0]);
  }
  if (type === "int" || type === "uint")
    return type === "uint" ? num(array(args[0] ?? 0)[0]) >>> 0 : num(array(args[0] ?? 0)[0]) | 0;
  if (type === "bool")
    return !!array(args[0] ?? 0)[0];
  if (type === "sampler2D")
    return args[0] ?? null;
  if (type.startsWith("mat")) {
    const n = Number(type.slice(-1)), out = Array(n * n).fill(0);
    if (isMatrix(args[0])) {
      const m = args[0];
      for (let c = 0; c < n; c++)
        for (let r = 0; r < n; r++)
          out[c * n + r] = c < m.size && r < m.size ? num(m.matrix[c * m.size + r]) : c === r ? 1 : 0;
    } else if (args.length <= 1 && !Array.isArray(args[0])) {
      for (let i = 0; i < n; i++)
        out[i * n + i] = num(args[0] ?? 0);
    } else {
      const flat = args.flatMap(array);
      if (flat.length !== n * n)
        throw new ShaderError(`invalid ${type} constructor`);
      return matrixValue(flat.map(num));
    }
    return matrixValue(out);
  }
  const vec = vecInfo[type];
  if (vec) {
    const { n, kind } = vec;
    let flat;
    if (args.length === 1 && Array.isArray(args[0]))
      flat = args[0];
    else {
      flat = [];
      for (const arg of args) {
        if (Array.isArray(arg))
          for (const x of arg)
            flat.push(x);
        else
          flat.push(arg);
      }
    }
    if (flat.length > 1 && flat.length < n)
      throw new ShaderError(`invalid ${type} constructor`);
    const out = new Array(n);
    for (let i = 0; i < n; i++) {
      const v = flat.length ? flat[flat.length === 1 ? 0 : i] : 0;
      out[i] = kind === "v" ? typeof v === "number" ? v : num(v) : kind === "b" ? !!v : kind === "u" ? num(v) >>> 0 : num(v) | 0;
    }
    return out;
  }
  return 0;
}
function evaluateDerivativeQuad(evaluate, selected, budget = 2e5) {
  const resolved = [];
  const allowance = { remaining: budget };
  const pause = /* @__PURE__ */ Symbol("derivative rendezvous");
  const divergent = "derivative in non-uniform control flow or after divergent discard";
  const order = selected === void 0 ? [0, 1, 2, 3] : [selected, ...[0, 1, 2, 3].filter((i) => i !== selected)];
  const results = new Array(4);
  const difference = (a, b) => {
    if (typeof a === "number" && typeof b === "number")
      return b - a;
    if (Array.isArray(a) && Array.isArray(b) && a.length === b.length)
      return a.map((v, i) => difference(v, b[i]));
    throw new ShaderError("derivatives require matching float or vector operands");
  };
  const width = (a, b) => Array.isArray(a) ? a.map((v, i) => width(v, b[i])) : Math.abs(a) + Math.abs(b);
  const withoutDerivatives = () => {
    for (const lane of order) {
      let cursor = 0;
      results[lane] = evaluate(lane, {
        budget: allowance,
        evaluate(site, operation, value, implicit) {
          const known = resolved[cursor++];
          if (known) {
            if (known.site !== site || known.operation !== operation)
              throw new ShaderError("derivative in non-uniform control flow");
            return copy(known.values[lane]);
          }
          if (!implicit)
            throw new ShaderError(divergent);
          return difference(value, value);
        }
      });
      if (lane === selected)
        return results;
    }
    return results;
  };
  for (let round = 0; round < 1024; round++) {
    const pending = [];
    let completed = 0;
    for (const lane of order) {
      let cursor = 0;
      try {
        results[lane] = evaluate(lane, {
          budget: allowance,
          evaluate(site, operation, value, implicit) {
            const known = resolved[cursor++];
            if (known) {
              if (known.site !== site || known.operation !== operation)
                throw new ShaderError("derivative in non-uniform control flow");
              return copy(known.values[lane]);
            }
            pending[lane] = { site, operation, value: copy(value), implicit: implicit === true };
            throw pause;
          }
        });
        completed++;
        if (lane === selected)
          return results;
      } catch (error2) {
        if (error2 !== pause)
          throw error2;
      }
    }
    if (completed === 4)
      return results;
    const first = pending[0];
    if (completed || !first || pending.some((p) => p.site !== first.site || p.operation !== first.operation)) {
      if (pending.some(Boolean) && pending.every((p) => !p || p.implicit))
        return withoutDerivatives();
      throw new ShaderError(divergent);
    }
    const values = pending.map((p) => p.value);
    const dx = [difference(values[0], values[1]), difference(values[2], values[3])];
    const dy = [difference(values[0], values[2]), difference(values[1], values[3])];
    resolved.push({ site: first.site, operation: first.operation, values: values.map((_, lane) => first.operation === "dFdx" ? dx[lane >> 1] : first.operation === "dFdy" ? dy[lane & 1] : width(dx[lane >> 1], dy[lane & 1])) });
  }
  throw new ShaderError("derivative rendezvous budget exceeded");
}
var swizzle = (name) => [...name].map((c) => "xyzw".includes(c) ? "xyzw".indexOf(c) : "rgba".includes(c) ? "rgba".indexOf(c) : "stpq".indexOf(c));
var DISCARD = /* @__PURE__ */ Symbol("discard");
var FLOW_NONE = 0;
var FLOW_BREAK = 1;
var FLOW_CONTINUE = 2;
var FLOW_RETURN = 3;
var FLOW_DISCARD = 4;
function tick(rt) {
  if (rt.context.derivatives && --rt.context.derivatives.budget.remaining <= 0 || --rt.remaining <= 0)
    throw new ShaderError("instruction budget exceeded");
}
var CompileScope = class _CompileScope {
  parent;
  fn;
  names = /* @__PURE__ */ new Map();
  types = /* @__PURE__ */ new Map();
  constructor(parent, fn) {
    this.parent = parent;
    this.fn = fn;
  }
  child() {
    return new _CompileScope(this, this.fn);
  }
  declare(name, type = "") {
    const slot = this.fn.slots++;
    this.names.set(name, slot);
    this.types.set(name, type);
    return slot;
  }
  resolve(name) {
    return this.names.get(name) ?? this.parent?.resolve(name);
  }
  type(name) {
    return this.types.get(name) ?? this.parent?.type(name);
  }
};
var binaryOps = {
  "*": multiply,
  "+": (a, b) => zip(a, b, (x, y) => x + y),
  "-": (a, b) => zip(a, b, (x, y) => x - y),
  "/": (a, b) => zip(a, b, (x, y) => x / y),
  "%": (a, b) => zip(a, b, (x, y) => x % y),
  "<": (a, b) => zip(a, b, (x, y) => x < y),
  ">": (a, b) => zip(a, b, (x, y) => x > y),
  "<=": (a, b) => zip(a, b, (x, y) => x <= y),
  ">=": (a, b) => zip(a, b, (x, y) => x >= y),
  "&": (a, b) => zip(a, b, (x, y) => x & y),
  "|": (a, b) => zip(a, b, (x, y) => x | y),
  "^": (a, b) => zip(a, b, (x, y) => x ^ y),
  "<<": (a, b) => zip(a, b, (x, y) => x << y),
  ">>": (a, b) => zip(a, b, (x, y) => x >> y),
  "^^": (a, b) => zip(a, b, (x, y) => !!x !== !!y),
  "==": (a, b) => JSON.stringify(a) === JSON.stringify(b),
  "!=": (a, b) => JSON.stringify(a) !== JSON.stringify(b)
};
var unary = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  asin: Math.asin,
  acos: Math.acos,
  abs: Math.abs,
  sign: Math.sign,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
  trunc: Math.trunc,
  sqrt: Math.sqrt,
  inversesqrt: (x) => 1 / Math.sqrt(x),
  exp: Math.exp,
  exp2: (x) => 2 ** x,
  log: Math.log,
  log2: Math.log2,
  fract: (x) => x - Math.floor(x),
  radians: (x) => x * Math.PI / 180,
  degrees: (x) => x * 180 / Math.PI
};
var zipped = {
  pow: Math.pow,
  min: Math.min,
  max: Math.max,
  mod: (x, y) => x - y * Math.floor(x / y),
  step: (edge2, x) => x < edge2 ? 0 : 1
};
var compared = {
  lessThan: (x, y) => x < y,
  greaterThan: (x, y) => x > y,
  lessThanEqual: (x, y) => x <= y,
  greaterThanEqual: (x, y) => x >= y,
  equal: (x, y) => x === y,
  notEqual: (x, y) => x !== y
};
var minus = (x, y) => x - y;
var saturateRatio = (x, y) => Math.max(0, Math.min(1, x / y));
var smooth = (x) => x * x * (3 - 2 * x);
var oneMinus = (x) => 1 - x;
function compileBuiltin(name, args) {
  const [a, b, c] = args;
  if (unary[name])
    return (f) => map(a(f), unary[name]);
  if (zipped[name])
    return (f) => zip(a(f), b(f), zipped[name]);
  if (compared[name])
    return (f) => zip(a(f), b(f), compared[name]);
  switch (name) {
    case "transpose":
      return (f) => {
        const m = a(f);
        if (!isMatrix(m))
          throw new ShaderError("transpose requires a matrix");
        const out = new Array(m.size * m.size);
        for (let col = 0; col < m.size; col++)
          for (let row = 0; row < m.size; row++)
            out[col * m.size + row] = num(m.matrix[row * m.size + col]);
        return matrixValue(out);
      };
    case "matrixCompMult":
      return (f) => {
        const x = a(f), y = b(f);
        if (!isMatrix(x) || !isMatrix(y))
          throw new ShaderError("matrixCompMult requires matrices");
        return zip(x, y, times);
      };
    case "outerProduct":
      return (f) => {
        const x = array(a(f)), y = array(b(f));
        if (x.length !== y.length)
          throw new ShaderError("non-square matrices are unsupported");
        return matrixValue(y.flatMap((col) => x.map((row) => num(row) * num(col))));
      };
    case "determinant":
    case "inverse":
      return (f) => {
        const matrix = a(f);
        if (!isMatrix(matrix))
          throw new ShaderError(`${name} requires a matrix`);
        const n = matrix.size, m = matrix.matrix.map(num), inverse = construct(`mat${n}`, [1]);
        let det = 1;
        for (let k = 0; k < n; k++) {
          let pivot = k;
          for (let row = k + 1; row < n; row++)
            if (Math.abs(m[k * n + row]) > Math.abs(m[k * n + pivot]))
              pivot = row;
          if (m[k * n + pivot] === 0) {
            if (name === "determinant")
              return 0;
            throw new ShaderError("cannot invert singular matrix");
          }
          if (pivot !== k) {
            det = -det;
            for (let col = 0; col < n; col++) {
              [m[col * n + k], m[col * n + pivot]] = [m[col * n + pivot], m[col * n + k]];
              [inverse.matrix[col * n + k], inverse.matrix[col * n + pivot]] = [inverse.matrix[col * n + pivot], inverse.matrix[col * n + k]];
            }
          }
          const diagonal = m[k * n + k];
          det *= diagonal;
          for (let col = 0; col < n; col++) {
            m[col * n + k] /= diagonal;
            inverse.matrix[col * n + k] /= diagonal;
          }
          for (let row = 0; row < n; row++)
            if (row !== k) {
              const factor = m[k * n + row];
              for (let col = 0; col < n; col++) {
                m[col * n + row] -= factor * m[col * n + k];
                inverse.matrix[col * n + row] -= factor * inverse.matrix[col * n + k];
              }
            }
        }
        return name === "determinant" ? det : inverse;
      };
    case "atan":
      return args.length === 2 ? (f) => zip(a(f), b(f), Math.atan2) : (f) => map(a(f), Math.atan);
    case "clamp":
      return (f) => zip(zip(a(f), b(f), Math.max), c(f), Math.min);
    case "mix":
      return (f) => {
        const t = c(f);
        return binaryOps["+"](multiply(a(f), map(t, oneMinus)), multiply(b(f), t));
      };
    case "smoothstep":
      return (f) => {
        const lo = a(f), hi = b(f);
        const t = zip(zip(c(f), lo, minus), zip(hi, lo, minus), saturateRatio);
        return map(t, smooth);
      };
    case "dot":
      return (f) => dot(a(f), b(f));
    case "length":
      return (f) => {
        const v = a(f);
        return Math.sqrt(dot(v, v));
      };
    case "distance":
      return (f) => {
        const v = binaryOps["-"](a(f), b(f));
        return Math.sqrt(dot(v, v));
      };
    case "normalize":
      return (f) => normalize(a(f));
    case "cross":
      return (f) => {
        const u = array(a(f)).map(num), v = array(b(f)).map(num);
        return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
      };
    case "reflect":
      return (f) => {
        const i = a(f), n = b(f);
        return binaryOps["-"](i, multiply(n, 2 * dot(n, i)));
      };
    case "refract":
      return (f) => {
        const i = a(f), n = b(f), eta = num(c(f)), d = dot(n, i), k = 1 - eta * eta * (1 - d * d);
        return k < 0 ? map(i, () => 0) : binaryOps["-"](multiply(i, eta), multiply(n, eta * d + Math.sqrt(k)));
      };
    case "faceforward":
      return (f) => {
        const n = a(f);
        return dot(c(f), b(f)) < 0 ? n : map(n, (x) => -x);
      };
    case "any":
      return (f) => array(a(f)).some(Boolean);
    case "all":
      return (f) => array(a(f)).every(Boolean);
    case "not":
      return (f) => map(a(f), (x) => !x);
    default:
      return null;
  }
}
var CompiledProgram = class {
  usesDerivatives = false;
  usesImplicitTextureSampling = false;
  structs = /* @__PURE__ */ new Map();
  globalTypes = /* @__PURE__ */ new Map();
  matrixInputTypes = /* @__PURE__ */ new Map();
  globalSlots = /* @__PURE__ */ new Map();
  declarations = [];
  functions = /* @__PURE__ */ new Map();
  main = null;
  constructor(parsed) {
    if (!parsed)
      return;
    this.structs = parsed.structs;
    for (const [name, overloads] of parsed.functions)
      this.functions.set(name, overloads.map((definition) => ({ returnType: definition.returnType, parameters: definition.parameters, slots: 0, body: () => 0 })));
    for (const declaration of parsed.globals)
      this.globalTypes.set(declaration.name, declaration.type + (declaration.expressions?.[1] ? "[]" : ""));
    for (const [name, type] of this.globalTypes)
      if (this.needsMatrixImport(type))
        this.matrixInputTypes.set(name, type);
    const globalScope = new CompileScope(null, { slots: 0 });
    for (const declaration of parsed.globals) {
      this.declarations.push({
        slot: this.globalSlot(declaration.name),
        exec: this.compileDeclare(declaration, globalScope, true)
      });
    }
    for (const [name, overloads] of parsed.functions)
      overloads.forEach((definition, index) => {
        const compiled = this.functions.get(name)[index], state = { slots: 0 };
        const scope = new CompileScope(null, state);
        for (const parameter of definition.parameters)
          scope.declare(parameter.name, parameter.type + (parameter.size ? "[]" : ""));
        compiled.body = this.compileStatement(definition.body, scope);
        compiled.slots = state.slots;
      });
    this.main = this.functions.get("main")?.[0] ?? null;
  }
  globalSlot(name) {
    let slot = this.globalSlots.get(name);
    if (slot === void 0) {
      slot = this.globalSlots.size;
      this.globalSlots.set(name, slot);
    }
    return slot;
  }
  compileDeclare(statement, scope, global) {
    const expressions = statement.expressions ?? [];
    const init = this.compileExpr(expressions[0], scope);
    const size2 = expressions[1] ? this.compileExpr(expressions[1], scope) : null;
    const slot = global ? this.globalSlot(statement.name) : scope.declare(statement.name, statement.type + (size2 ? "[]" : ""));
    return (f) => {
      let value = init(f);
      if (size2) {
        const count = num(size2(f));
        if (!Number.isInteger(count) || count < 0 || count > 4096 || count === 0 && expressions[0].op === "default")
          throw new ShaderError("invalid array length");
        if (expressions[0].op === "default")
          value = Array.from({ length: count }, () => copy(value));
        else if (!Array.isArray(value) || count !== 0 && value.length !== count)
          throw new ShaderError("array initializer length mismatch");
      }
      if (global)
        f.globals[slot] = value;
      else
        f.locals[slot] = value;
      return FLOW_NONE;
    };
  }
  compileStatement(statement, scope) {
    const { kind, body = [], expressions = [] } = statement;
    switch (kind) {
      case "block":
      case "sequence": {
        const inner = kind === "block" ? scope.child() : scope;
        const steps = body.map((child) => this.compileStatement(child, inner));
        if (steps.length === 1)
          return steps[0];
        return (f) => {
          for (let i = 0; i < steps.length; i++) {
            const flow = steps[i](f);
            if (flow)
              return flow;
          }
          return FLOW_NONE;
        };
      }
      case "declare":
        return this.compileDeclare(statement, scope, false);
      case "switch": {
        const selector = this.compileExpr(expressions[0], scope), inner = scope.child();
        const branches = body.map((branch) => ({
          test: branch.expressions?.[0] ? this.compileExpr(branch.expressions[0], inner) : null,
          exec: this.compileStatement({ kind: "sequence", body: branch.body }, inner)
        }));
        return (f) => {
          const value = selector(f);
          let start = branches.findIndex((branch) => branch.test && branch.test(f) === value);
          if (start < 0)
            start = branches.findIndex((branch) => !branch.test);
          if (start < 0)
            return FLOW_NONE;
          for (let i = start; i < branches.length; i++) {
            const flow = branches[i].exec(f);
            if (flow === FLOW_BREAK)
              return FLOW_NONE;
            if (flow)
              return flow;
          }
          return FLOW_NONE;
        };
      }
      case "expression": {
        const thunk = this.compileExpr(expressions[0], scope);
        return (f) => {
          thunk(f);
          return FLOW_NONE;
        };
      }
      case "if": {
        const condition = this.compileExpr(expressions[0], scope), then = this.compileStatement(body[0], scope.child());
        const otherwise = statement.alternate ? this.compileStatement(statement.alternate, scope.child()) : null;
        return (f) => condition(f) ? then(f) : otherwise ? otherwise(f) : FLOW_NONE;
      }
      case "for":
      case "while":
      case "do": {
        const inner = scope.child();
        const init = kind === "for" ? this.compileStatement(body[0], inner) : null;
        const test = this.compileExpr(expressions[0], inner);
        const increment = kind === "for" ? this.compileExpr(expressions[1], inner) : null;
        const loop = this.compileStatement(body[kind === "for" ? 1 : 0], inner);
        return (f) => {
          init?.(f);
          let first = kind === "do";
          while (first || test(f)) {
            first = false;
            tick(f.rt);
            const flow = loop(f);
            if (flow === FLOW_BREAK)
              break;
            if (flow === FLOW_RETURN || flow === FLOW_DISCARD)
              return flow;
            increment?.(f);
          }
          return FLOW_NONE;
        };
      }
      case "return": {
        const value = expressions[0] ? this.compileExpr(expressions[0], scope) : null;
        return (f) => {
          f.rt.returned = value ? value(f) : 0;
          return FLOW_RETURN;
        };
      }
      case "discard":
        return () => FLOW_DISCARD;
      case "break":
        return () => FLOW_BREAK;
      case "continue":
        return () => FLOW_CONTINUE;
      default:
        throw new ShaderError(`unsupported statement ${kind}`);
    }
  }
  compileReference(expr, scope) {
    if (expr.op === "name") {
      const local = scope.resolve(expr.name);
      const slot = local ?? this.globalSlot(expr.name);
      return (f) => {
        const values = local === void 0 ? f.globals : f.locals;
        return { read: () => values[slot], write: (value) => {
          values[slot] = value;
        } };
      };
    }
    if (expr.op !== "member" && expr.op !== "index")
      throw new ShaderError("invalid assignment target");
    const parent = this.compileReference(expr.args[0], scope);
    const index = expr.op === "index" ? this.compileExpr(expr.args[1], scope) : null;
    const member = expr.name, indices = expr.op === "member" ? swizzle(member) : [];
    return (f) => {
      const base = parent(f), i = index ? num(index(f)) : 0;
      const parts = (value) => {
        const values = isMatrix(value) ? value.matrix : value;
        const length2 = isMatrix(value) ? value.size : Array.isArray(value) ? value.length : 0;
        if (!Array.isArray(values) || !Number.isInteger(i) || i < 0 || i >= length2)
          throw new ShaderError("array or matrix index out of bounds");
        return values;
      };
      return {
        read: () => {
          const value = base.read();
          if (index) {
            const values = parts(value);
            return isMatrix(value) ? values.slice(i * value.size, (i + 1) * value.size) : values[i];
          }
          if (Array.isArray(value)) {
            if (indices.some((i2) => i2 < 0 || i2 >= value.length))
              throw new ShaderError("invalid swizzle");
            return indices.length === 1 ? value[indices[0]] : indices.map((i2) => value[i2]);
          }
          if (value && typeof value === "object" && Object.prototype.hasOwnProperty.call(value, member))
            return value[member];
          throw new ShaderError("invalid member assignment");
        },
        write: (value) => {
          const target = copy(base.read());
          if (index) {
            const values = parts(target);
            if (isMatrix(target)) {
              if (!Array.isArray(value) || value.length !== target.size)
                throw new ShaderError("invalid matrix column assignment");
              values.splice(i * target.size, target.size, ...value);
            } else
              values[i] = copy(value);
          } else if (Array.isArray(target)) {
            if (new Set(indices).size !== indices.length || indices.some((i2) => i2 < 0 || i2 >= target.length))
              throw new ShaderError("invalid writable swizzle");
            const values = array(value);
            if (values.length !== indices.length)
              throw new ShaderError("swizzle dimensions do not match");
            indices.forEach((i2, k) => {
              target[i2] = values[k];
            });
          } else if (target && typeof target === "object" && Object.prototype.hasOwnProperty.call(target, member))
            target[member] = value;
          else
            throw new ShaderError("invalid member assignment");
          base.write(target);
        }
      };
    };
  }
  compileExpr(expr, scope) {
    const { op, args, name } = expr;
    if (op === "literal") {
      const value = expr.value;
      return () => value;
    }
    if (op === "default" && this.structs.has(name)) {
      const fields = this.structs.get(name);
      const initializers = fields.map((field) => {
        const init = this.compileExpr(field.expressions[0], scope);
        const size2 = field.expressions[1] ? this.compileExpr(field.expressions[1], scope) : null;
        return (f) => {
          const value = init(f);
          if (!size2)
            return value;
          const count = num(size2(f));
          if (!Number.isInteger(count) || count < 1 || count > 4096)
            throw new ShaderError("invalid array length");
          return Array.from({ length: count }, () => copy(value));
        };
      });
      return (f) => Object.fromEntries(fields.map((field, i) => [field.name, initializers[i](f)]));
    }
    if (op === "default")
      return () => construct(name, []);
    if (op === "arrayLength") {
      const base = this.compileExpr(args[0], scope);
      return (f) => {
        const value = base(f);
        if (isMatrix(value))
          return value.size;
        if (!Array.isArray(value))
          throw new ShaderError("length() requires an array, vector or matrix");
        return value.length;
      };
    }
    if (op === "arrayConstructor") {
      const size2 = this.compileExpr(args[0], scope), values = args.slice(1).map((a) => this.compileExpr(a, scope));
      return (f) => {
        const count = num(size2(f));
        if (count !== 0 && count !== values.length || values.length > 4096)
          throw new ShaderError("array constructor length mismatch");
        return values.map((value) => copy(value(f)));
      };
    }
    if (op === "name") {
      const local = scope.resolve(name);
      if (local !== void 0)
        return (f) => f.locals[local];
      const slot = this.globalSlot(name), label = name;
      return (f) => {
        const value = f.globals[slot];
        if (value === void 0)
          throw new ShaderError(`unknown variable '${label}'`);
        return value;
      };
    }
    if (op === "member") {
      const base = this.compileExpr(args[0], scope), indices = swizzle(name), member = name;
      const single = indices.length === 1 ? indices[0] : -1, valid = indices.every((i) => i >= 0);
      return (f) => {
        const value = base(f);
        if (Array.isArray(value)) {
          if (single >= 0) {
            if (single < value.length)
              return value[single];
          } else if (valid) {
            const out = new Array(indices.length);
            for (let i = 0; i < indices.length; i++) {
              if (indices[i] >= value.length)
                throw new ShaderError(`invalid swizzle .${member}`);
              out[i] = value[indices[i]];
            }
            return out;
          }
          throw new ShaderError(`invalid swizzle .${member}`);
        }
        if (value && typeof value === "object" && Object.prototype.hasOwnProperty.call(value, member))
          return value[member];
        throw new ShaderError(`unknown member .${member}`);
      };
    }
    if (op === "index") {
      const base = this.compileExpr(args[0], scope), index = this.compileExpr(args[1], scope);
      return (f) => {
        const value = base(f), i = num(index(f));
        if (isMatrix(value)) {
          if (!Number.isInteger(i) || i < 0 || i >= value.size)
            throw new ShaderError("matrix index out of bounds");
          return value.matrix.slice(i * value.size, (i + 1) * value.size);
        }
        if (!Array.isArray(value) || !Number.isInteger(i) || i < 0 || i >= value.length)
          throw new ShaderError("array index out of bounds");
        return value[i];
      };
    }
    if (op === "?") {
      const [condition, yes, no] = args.map((a) => this.compileExpr(a, scope));
      return (f) => condition(f) ? yes(f) : no(f);
    }
    if (op === "&&" || op === "||") {
      const [left2, right2] = args.map((a) => this.compileExpr(a, scope));
      return op === "&&" ? (f) => !!left2(f) && !!right2(f) : (f) => !!left2(f) || !!right2(f);
    }
    if (op === "call")
      return this.compileCall(name, args, scope);
    if (op === "=" || precedence[op] === 1) {
      const right2 = this.compileExpr(args[1], scope), access = this.compileReference(args[0], scope);
      if (op === "=")
        return (f) => {
          const target = access(f), value = right2(f);
          target.write(value);
          return value;
        };
      const combine2 = binaryOps[op.slice(0, -1)];
      const type2 = this.expressionType(args[0], scope);
      const integer = type2 && /^(?:u?int|[iu]vec[234])$/.test(type2);
      return (f) => {
        const target = access(f);
        let value = op === ">>=" && type2?.startsWith("u") ? zip(target.read(), right2(f), (x, y) => x >>> y) : op === "*=" && integer ? zip(target.read(), right2(f), Math.imul) : combine2(target.read(), right2(f));
        if (integer)
          value = map(value, (x) => type2.startsWith("u") ? x >>> 0 : x | 0);
        target.write(value);
        return value;
      };
    }
    if (op === "pre++" || op === "pre--" || op === "post++" || op === "post--") {
      const access = this.compileReference(args[0], scope);
      const delta = op.endsWith("++") ? 1 : -1, post = op.startsWith("post");
      const type2 = this.expressionType(args[0], scope);
      return (f) => {
        const target = access(f), before = target.read(), after = map(before, (x) => type2 && /^(?:u?int|[iu]vec[234])$/.test(type2) ? type2.startsWith("u") ? x + delta >>> 0 : x + delta | 0 : x + delta);
        target.write(after);
        return post ? before : after;
      };
    }
    if (op.startsWith("pre")) {
      const operand = this.compileExpr(args[0], scope);
      const fn = op === "pre-" ? (x) => -x : op === "pre!" ? (x) => !x : op === "pre~" ? (x) => ~x : (x) => x;
      const type2 = this.expressionType(expr, scope);
      if (type2 && /^(?:u?int|[iu]vec[234])$/.test(type2))
        return (f) => map(operand(f), (x) => type2.startsWith("u") ? Number(fn(x)) >>> 0 : Number(fn(x)) | 0);
      return (f) => map(operand(f), fn);
    }
    const combine = binaryOps[op];
    if (!combine)
      throw new ShaderError(`unsupported operator ${op}`);
    const [left, right] = args.map((a) => this.compileExpr(a, scope));
    const type = this.expressionType(expr, scope);
    if (type && /^(?:u?int|[iu]vec[234])$/.test(type))
      return (f) => map(op === ">>" && type.startsWith("u") ? zip(left(f), right(f), (x, y) => x >>> y) : op === "*" ? zip(left(f), right(f), Math.imul) : combine(left(f), right(f)), (x) => type.startsWith("u") ? x >>> 0 : x | 0);
    return (f) => combine(left(f), right(f));
  }
  expressionType(expr, scope) {
    const { op, name, args } = expr;
    if (expr.type)
      return expr.type;
    if (op === "literal")
      return typeof expr.value === "boolean" ? "bool" : "float";
    if (op === "name")
      return scope.type(name) ?? this.globalTypes.get(name) ?? {
        position: "vec3",
        normal: "vec3",
        uv: "vec2",
        gl_Position: "vec4",
        gl_FragColor: "vec4",
        gl_FragCoord: "vec4",
        gl_PointCoord: "vec2",
        gl_FrontFacing: "bool"
      }[name];
    if (op === "default" || op === "arrayConstructor")
      return name + (op === "arrayConstructor" ? "[]" : "");
    if (op === "arrayLength")
      return "int";
    if (op === "member") {
      const base = this.expressionType(args[0], scope);
      const field = base && this.structs.get(base)?.find((field2) => field2.name === name);
      if (field)
        return field.type + (field.expressions?.[1] ? "[]" : "");
      if (base && /^(?:[iub]?vec)[234]$/.test(base)) {
        const prefix = base.slice(0, -1);
        return name.length > 1 ? prefix + name.length : { vec: "float", ivec: "int", uvec: "uint", bvec: "bool" }[prefix];
      }
      return void 0;
    }
    if (op === "index") {
      const base = this.expressionType(args[0], scope);
      if (base?.endsWith("[]"))
        return base.slice(0, -2);
      if (base?.startsWith("mat"))
        return `vec${base.slice(-1)}`;
      return base && { vec: "float", ivec: "int", uvec: "uint", bvec: "bool" }[base.slice(0, -1)];
    }
    if (op === "call") {
      if (types.has(name) || this.structs.has(name))
        return name;
      if (this.functions.has(name))
        return this.resolveFunction(name, args, scope)?.returnType;
      if (["dot", "length", "distance", "determinant"].includes(name))
        return "float";
      if (["any", "all"].includes(name))
        return "bool";
      if ([
        "texture",
        "texture2D",
        "texture2DProj",
        "textureLod",
        "texture2DLod",
        "texture2DLodEXT",
        "textureGrad",
        "texture2DGradEXT",
        "textureProj"
      ].includes(name))
        return "vec4";
      if (name === "outerProduct")
        return `mat${this.expressionType(args[0], scope)?.slice(-1)}`;
      if (Object.prototype.hasOwnProperty.call(compared, name))
        return `bvec${this.expressionType(args[0], scope)?.slice(-1)}`;
      return args[0] && this.expressionType(args[0], scope);
    }
    if (["==", "!=", "<", ">", "<=", ">=", "&&", "||", "^^", "pre!"].includes(op))
      return "bool";
    if (op === "?")
      return this.expressionType(args[1], scope);
    const a = args[0] && this.expressionType(args[0], scope), b = args[1] && this.expressionType(args[1], scope);
    if (op === "*" && a?.startsWith("mat") && b?.includes("vec"))
      return b;
    if (op === "*" && a?.includes("vec") && b?.startsWith("mat"))
      return a;
    if (b?.includes("vec") || b?.startsWith("mat"))
      return b;
    return a === "int" && b === "float" ? b : a;
  }
  resolveFunction(name, expressions, scope) {
    const candidates = this.functions.get(name)?.filter((fn) => fn.parameters.length === expressions.length) ?? [];
    if (candidates.length < 2)
      return candidates[0];
    const argumentTypes = expressions.map((expr) => this.expressionType(expr, scope));
    const matches = candidates.filter((fn) => fn.parameters.every((p, i) => argumentTypes[i] === p.type + (p.size ? "[]" : "")));
    if (matches.length !== 1)
      throw new ShaderError(`ambiguous overload '${name}' (${argumentTypes.join(", ")})`);
    return matches[0];
  }
  compileCall(name, expressions, scope) {
    const args = expressions.map((e) => this.compileExpr(e, scope));
    const fields = this.structs.get(name);
    if (fields) {
      if (args.length !== fields.length)
        throw new ShaderError(`invalid ${name} constructor`);
      return (f) => Object.fromEntries(fields.map((field, i) => [field.name, copy(args[i](f))]));
    }
    if (types.has(name)) {
      const vec = vecInfo[name];
      if (vec && vec.kind === "v" && args.length === vec.n)
        return (f) => {
          const values = new Array(args.length);
          let scalar = true;
          for (let i = 0; i < args.length; i++) {
            const v = args[i](f);
            values[i] = v;
            if (typeof v !== "number")
              scalar = false;
          }
          return scalar ? values : construct(name, values);
        };
      return (f) => {
        const values = new Array(args.length);
        for (let i = 0; i < args.length; i++)
          values[i] = args[i](f);
        return construct(name, values);
      };
    }
    const callee = this.resolveFunction(name, expressions, scope);
    if (callee) {
      const setters = callee.parameters.map((p, i) => p.qualifier === "out" || p.qualifier === "inout" ? this.compileReference(expressions[i], scope) : null);
      return (f) => {
        const rt = f.rt, frame2 = { locals: new Array(callee.slots), globals: f.globals, rt };
        const references = [];
        for (let i = 0; i < args.length; i++) {
          const reference = setters[i]?.(f) ?? null;
          references.push(reference);
          frame2.locals[i] = reference ? reference.read() : args[i](f);
        }
        if (++rt.depth > 32)
          throw new ShaderError("call depth exceeded");
        tick(rt);
        const flow = callee.body(frame2);
        rt.depth--;
        if (flow === FLOW_DISCARD)
          throw DISCARD;
        const returned = flow === FLOW_RETURN ? rt.returned : 0;
        for (let i = 0; i < references.length; i++)
          references[i]?.write(frame2.locals[i]);
        return returned;
      };
    }
    if (["dFdx", "dFdy", "fwidth"].includes(name)) {
      const type = expressions[0] && this.expressionType(expressions[0], scope);
      if (args.length !== 1 || type && !["float", "vec2", "vec3", "vec4"].includes(type))
        throw new ShaderError(`${name} expects one float or floating-point vector`);
      this.usesDerivatives = true;
      const site = Symbol(name);
      return (f) => {
        if (!f.rt.context.derivatives)
          throw new ShaderError(`${name} requires a fragment quad`);
        return f.rt.context.derivatives.evaluate(site, name, args[0](f));
      };
    }
    if ([
      "texture",
      "texture2D",
      "texture2DProj",
      "textureProj",
      "textureLod",
      "texture2DLod",
      "texture2DLodEXT",
      "textureGrad",
      "texture2DGradEXT"
    ].includes(name)) {
      const explicitLod = name.includes("Lod"), explicitGrad = name.includes("Grad");
      const projected = name.endsWith("Proj");
      if (explicitLod ? args.length !== 3 : explicitGrad ? args.length !== 4 : args.length < 2 || args.length > 3)
        throw new ShaderError(`invalid arguments to ${name}`);
      if (!explicitLod && !explicitGrad)
        this.usesImplicitTextureSampling = true;
      const dxSite = /* @__PURE__ */ Symbol("texture dx"), dySite = /* @__PURE__ */ Symbol("texture dy");
      return (f) => {
        const sampler = args[0](f), coords = array(args[1](f)).map(num);
        const uv = projected ? [coords[0] / coords[coords.length - 1], coords[1] / coords[coords.length - 1]] : coords;
        const context = f.rt.context;
        if (explicitLod)
          return context.texture(sampler, uv, { lod: num(args[2](f)) });
        if (explicitGrad)
          return context.texture(sampler, uv, { dx: array(args[2](f)).map(num), dy: array(args[3](f)).map(num) });
        const bias = args[2] ? num(args[2](f)) : 0;
        if (context.derivatives && (context.textureNeedsFootprint?.(sampler) ?? true)) {
          const dx = context.derivatives.evaluate(dxSite, "dFdx", uv, true);
          const dy = context.derivatives.evaluate(dySite, "dFdy", uv, true);
          return context.texture(sampler, uv, { dx, dy, bias });
        }
        return context.texture(sampler, uv, { lod: 0, bias });
      };
    }
    const builtin = compileBuiltin(name, args);
    if (!builtin)
      throw new ShaderError(`unsupported function '${name}'`);
    return builtin;
  }
  run(inputs, context) {
    if (!this.main)
      throw new ShaderError("missing main()");
    const globals = new Array(this.globalSlots.size);
    for (const name in inputs) {
      const value = context.derivatives ? copy(inputs[name]) : inputs[name];
      globals[this.globalSlot(name)] = this.importValue(value, this.matrixInputTypes.get(name));
    }
    const rt = { remaining: context.budget ?? 5e4, depth: 0, returned: 0, context };
    const frame2 = { locals: [], globals, rt };
    try {
      for (const declaration of this.declarations)
        if (globals[declaration.slot] === void 0)
          declaration.exec(frame2);
      const flow = this.main.body({ locals: new Array(this.main.slots), globals, rt });
      if (flow === FLOW_DISCARD)
        return null;
      const result = {};
      for (const [name, slot] of this.globalSlots) {
        const value = globals[slot];
        if (value !== void 0)
          result[name] = value;
      }
      return result;
    } catch (error2) {
      if (error2 === DISCARD)
        return null;
      throw error2;
    }
  }
  needsMatrixImport(type) {
    if (type.endsWith("[]"))
      return this.needsMatrixImport(type.slice(0, -2));
    return /^mat[234]$/.test(type) || !!this.structs.get(type)?.some((field) => this.needsMatrixImport(field.type));
  }
  importValue(value, type) {
    if (!type)
      return value;
    if (type.endsWith("[]") && Array.isArray(value))
      return value.map((item) => this.importValue(item, type.slice(0, -2)));
    if (/^mat[234]$/.test(type) && Array.isArray(value))
      return matrixValue(value);
    const fields = this.structs.get(type);
    if (fields && value && typeof value === "object" && !Array.isArray(value))
      return Object.fromEntries(fields.map((field) => [
        field.name,
        this.importValue(value[field.name], field.type + (field.expressions?.[1] ? "[]" : ""))
      ]));
    return value;
  }
};
function evaluateConstant(expr) {
  const program = new CompiledProgram(null);
  const rt = { remaining: 5e4, depth: 0, returned: 0, context: { texture: () => [0, 0, 0, 0] } };
  return program.compileExpr(expr, new CompileScope(null, { slots: 0 }))({ locals: [], globals: [], rt });
}
function expandMacros(source, macros, disabled = /* @__PURE__ */ new Set(), depth = 0, budget = { remaining: 1e5 }) {
  if (depth > 64 || --budget.remaining <= 0)
    throw new ShaderError("macro expansion budget exceeded");
  const tokens = source.match(/0[xX][\da-fA-F]+[uU]?|(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?[fFuU]?|[A-Za-z_]\w*|\s+|[^\s]/g) ?? [];
  let result = "";
  for (let i = 0; i < tokens.length; i++) {
    const name = tokens[i];
    let macro = macros.get(name);
    if (!macro || disabled.has(name)) {
      result += name;
      continue;
    }
    const aliases = /* @__PURE__ */ new Set([name]);
    while (!macro.parameters && /^[A-Za-z_]\w*$/.test(macro.body)) {
      const alias = macro.body, next = macros.get(alias);
      if (!next || aliases.has(alias) || disabled.has(alias))
        break;
      aliases.add(alias);
      macro = next;
    }
    let body = macro.body;
    if (macro.parameters) {
      let open = i + 1;
      while (/^\s+$/.test(tokens[open] ?? ""))
        open++;
      if (tokens[open] !== "(") {
        result += name;
        continue;
      }
      const actual = [];
      let nesting = 1, arg = "", j = open + 1;
      for (; j < tokens.length; j++) {
        const token = tokens[j];
        if (token === "(")
          nesting++;
        if (token === ")")
          nesting--;
        if (!nesting) {
          if (arg.trim() || actual.length || macro.parameters.length)
            actual.push(arg);
          break;
        }
        if (token === "," && nesting === 1) {
          actual.push(arg);
          arg = "";
        } else
          arg += token;
      }
      if (nesting)
        throw new ShaderError(`unterminated macro '${name}'`);
      if (actual.length !== macro.parameters.length)
        throw new ShaderError(`invalid macro arguments for '${name}'`);
      const replacements = new Map(macro.parameters.map((p, k) => [p, expandMacros(actual[k], macros, disabled, depth + 1, budget)]));
      body = body.replace(/\b[A-Za-z_]\w*\b/g, (word) => replacements.get(word) ?? word);
      i = j;
    }
    result += expandMacros(body, macros, /* @__PURE__ */ new Set([...disabled, ...aliases]), depth + 1, budget);
    if (result.length > 1e6)
      throw new ShaderError("macro expansion budget exceeded");
  }
  return result;
}
function preprocess(source, defines, includes, depth = 0, macros = new Map(Object.entries(defines).map(([k, v]) => [k, { body: String(v === true ? 1 : v === false ? 0 : v) }]))) {
  if (depth > 32)
    throw new ShaderError("include depth exceeded");
  const conditions = [];
  let active = true;
  const evaluate = (condition) => {
    const defined = condition.replace(/defined\s*(?:\(\s*(\w+)\s*\)|(\w+))/g, (_, a, b) => macros.has(a ?? b) ? "1" : "0");
    const tokens = tokenize(expandMacros(defined, macros)).map((token) => /^[A-Za-z_]\w*$/.test(token) ? "0" : token);
    const parser = new Parser(tokens), expr = parser.expression();
    if (parser.peek())
      throw new ShaderError("invalid preprocessor expression");
    return !!evaluateConstant(expr);
  };
  const out = [], pending = [];
  const flush = () => {
    if (pending.length)
      out.push(expandMacros(pending.splice(0).join("\n"), macros));
  };
  const clean = source.replace(/\\\r?\n/g, "").replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, " ")).replace(/\/\/[^\n]*/g, "");
  for (const line of clean.split(/\r?\n/)) {
    const directive = line.match(/^\s*#\s*(\w+)\s*(.*)$/);
    if (!directive) {
      if (active)
        pending.push(line);
      continue;
    }
    flush();
    const [, command, arg] = directive;
    if (["if", "ifdef", "ifndef"].includes(command)) {
      const value = active && (command === "ifdef" ? macros.has(arg.trim()) : command === "ifndef" ? !macros.has(arg.trim()) : evaluate(arg));
      conditions.push({ parent: active, matched: value, seenElse: false });
      active = value;
    } else if (command === "else" || command === "elif") {
      const condition = conditions[conditions.length - 1];
      if (!condition || condition.seenElse)
        throw new ShaderError("unmatched conditional");
      const value = condition.parent && !condition.matched && (command === "else" || evaluate(arg));
      condition.seenElse = command === "else";
      condition.matched ||= value;
      active = value;
    } else if (command === "endif") {
      const condition = conditions.pop();
      if (!condition)
        throw new ShaderError("unmatched #endif");
      active = condition.parent;
    } else if (active && command === "define") {
      const match = arg.match(/^(\w+)(?:\(([^)]*)\))?(.*)$/);
      if (!match || match[3].includes("#"))
        throw new ShaderError("invalid macro definition");
      const parameters = match[2] === void 0 ? void 0 : match[2].trim() ? match[2].split(",").map((p) => p.trim()) : [];
      if (parameters && (parameters.some((p) => !/^[A-Za-z_]\w*$/.test(p)) || new Set(parameters).size !== parameters.length))
        throw new ShaderError("invalid macro parameters");
      macros.set(match[1], { body: match[3].trim(), parameters });
    } else if (active && command === "undef")
      macros.delete(arg.trim());
    else if (active && command === "include") {
      const key = arg.match(/^<(\w+)>$/)?.[1];
      if (!key || !(key in includes))
        throw new ShaderError(`unknown include ${arg}`);
      out.push(preprocess(includes[key], {}, includes, depth + 1, macros));
    } else if (active && command === "error")
      throw new ShaderError(`#error ${arg}`);
    else if (active && !["version", "extension", "pragma"].includes(command))
      throw new ShaderError(`unsupported directive #${command}`);
  }
  flush();
  if (conditions.length)
    throw new ShaderError("unterminated preprocessor conditional");
  return out.join("\n");
}
var CpuShader = class {
  program;
  varyings;
  outputs;
  constructor(source, defines = {}, includes = {}) {
    const parsed = new Parser(tokenize(preprocess(source, defines, includes))).parse();
    this.program = new CompiledProgram(parsed);
    this.varyings = parsed.varyings;
    this.outputs = parsed.outputs;
  }
  get usesDerivatives() {
    return this.program.usesDerivatives;
  }
  get usesImplicitTextureSampling() {
    return this.program.usesImplicitTextureSampling;
  }
  /** Four fragment inputs in bottom-left, bottom-right, top-left, top-right order. */
  runQuad(inputs, context) {
    if (inputs.length !== 4)
      throw new ShaderError("a fragment quad requires four inputs");
    if (!this.usesDerivatives && !this.usesImplicitTextureSampling)
      return inputs.map((input) => this.run(input, context));
    return evaluateDerivativeQuad((lane, derivatives) => this.run(inputs[lane], { ...context, derivatives }), void 0, (context.budget ?? 5e4) * 4);
  }
  run(inputs, context) {
    return this.program.run(inputs, context);
  }
};

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/math.js
var add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
var sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
var scale = (a, b) => [a[0] * b, a[1] * b, a[2] * b];
var mul = (a, b) => [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
var dot2 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
var cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0]
];
var length = (a) => Math.sqrt(dot2(a, a));
var normalize2 = (a) => scale(a, 1 / (length(a) || 1));
var mix = (a, b, t) => add(scale(a, 1 - t), scale(b, t));
var reflect = (i, n) => sub(i, scale(n, 2 * dot2(i, n)));
var refract = (i, n, eta) => {
  const ni = dot2(n, i), k = 1 - eta * eta * (1 - ni * ni);
  return k < 0 ? [0, 0, 0] : sub(scale(i, eta), scale(n, eta * ni + Math.sqrt(k)));
};
var clamp2 = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));
var transform4 = (m, v) => [0, 1, 2, 3].map((r) => m[r] * v[0] + m[4 + r] * v[1] + m[8 + r] * v[2] + m[12 + r] * (v[3] ?? 1));
var transform3 = (m, v) => [
  m[0] * v[0] + m[3] * v[1] + m[6] * v[2],
  m[1] * v[0] + m[4] * v[1] + m[7] * v[2],
  m[2] * v[0] + m[5] * v[1] + m[8] * v[2]
];
var halton = (index, base) => {
  let result = 0, fraction = 1;
  while (index > 0) {
    fraction /= base;
    result += fraction * (index % base);
    index = Math.floor(index / base);
  }
  return result;
};

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/sharedBuffers.js
var shareable = () => typeof SharedArrayBuffer !== "undefined" && (typeof globalThis.crossOriginIsolated === "boolean" ? globalThis.crossOriginIsolated : inNode());
function inNode() {
  const process = globalThis.process;
  return typeof process?.versions?.node === "string";
}
var sharedFloat32 = (length2) => shareable() ? new Float32Array(new SharedArrayBuffer(length2 * 4)) : new Float32Array(length2);
var sharedFloat64 = (length2) => shareable() ? new Float64Array(new SharedArrayBuffer(length2 * 8)) : new Float64Array(length2);
var sharedUint32 = (length2) => shareable() ? new Uint32Array(new SharedArrayBuffer(length2 * 4)) : new Uint32Array(length2);
var sharedInt32 = (length2) => shareable() ? new Int32Array(new SharedArrayBuffer(length2 * 4)) : new Int32Array(length2);
var sharedUint8 = (length2) => shareable() ? new Uint8Array(new SharedArrayBuffer(length2)) : new Uint8Array(length2);
function sharedCopy(create, values) {
  const out = create(values.length);
  out.set(values);
  return out;
}

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/texture.js
var srgbToLinear = (v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
var linearToSrgb = (v) => v <= 31308e-7 ? v * 12.92 : 1.055 * Math.max(0, v) ** (1 / 2.4) - 0.055;
var linearBytes = Float32Array.from({ length: 256 }, (_, i) => i / 255);
var srgbBytes = Float32Array.from(linearBytes, srgbToLinear);
function wrap(index, size2, mode) {
  if (mode === RepeatWrapping)
    return (index % size2 + size2) % size2;
  if (mode === MirroredRepeatWrapping) {
    const i = (index % (size2 * 2) + size2 * 2) % (size2 * 2);
    return i < size2 ? i : size2 * 2 - 1 - i;
  }
  return clamp2(index, 0, size2 - 1);
}
function isMipmapFilter(filter) {
  return filter === NearestMipmapNearestFilter || filter === NearestMipmapLinearFilter || filter === LinearMipmapNearestFilter || filter === LinearMipmapLinearFilter;
}
function textureFootprint(texture, sampling, transform = true) {
  const bias = sampling.bias ?? 0;
  if (sampling.lod !== void 0)
    return { lod: sampling.lod + bias, taps: 1, axis: [0, 0] };
  if (!sampling.dx || !sampling.dy)
    return { lod: bias, taps: 1, axis: [0, 0] };
  const m = texture.matrix;
  const uvSpace = (d) => transform ? [m[0] * d[0] + m[3] * d[1], m[1] * d[0] + m[4] * d[1]] : d;
  const dx = uvSpace(sampling.dx), dy = uvSpace(sampling.dy);
  const px = Math.hypot(dx[0] * texture.width, dx[1] * texture.height);
  const py = Math.hypot(dy[0] * texture.width, dy[1] * texture.height);
  const major = Math.max(px, py, 1e-20), minor = Math.min(px, py);
  const ratio = clamp2(major / Math.max(minor, 1), 1, Math.max(1, texture.anisotropy ?? 1));
  return { lod: Math.log2(major / ratio) + bias, taps: Math.ceil(ratio - 1e-6), axis: px >= py ? dx : dy };
}
function sampleTexture(texture, uv, transform = true, sampling) {
  const m = texture.matrix;
  const u = transform ? m[0] * uv[0] + m[3] * uv[1] + m[6] : uv[0];
  let v = transform ? m[1] * uv[0] + m[4] * uv[1] + m[7] : uv[1];
  if (!Number.isFinite(u) || !Number.isFinite(v))
    return [0, 0, 0, 0];
  if (texture.flipY)
    v = 1 - v;
  if (!sampling)
    return sampleLod(texture, u, v, 0);
  const { lod, taps, axis } = textureFootprint(texture, sampling, transform);
  if (taps < 2)
    return sampleLod(texture, u, v, lod);
  const sum = [0, 0, 0, 0];
  for (let i = 0; i < taps; i++) {
    const t = (i + 0.5) / taps - 0.5, tap = sampleLod(texture, u + t * axis[0], v + t * axis[1], lod);
    for (let c = 0; c < 4; c++)
      sum[c] += tap[c];
  }
  return sum.map((c) => c / taps);
}
function sampleLod(texture, u, v, lod) {
  const mag = texture.magFilter ?? (texture.nearest ? NearestFilter : LinearFilter);
  const min = texture.minFilter ?? mag;
  const transition = mag === LinearFilter && (min === NearestMipmapNearestFilter || min === NearestMipmapLinearFilter) ? 0.5 : 0;
  if (Number.isNaN(lod) || lod <= transition)
    return sampleLevel(texture, texture, u, v, mag === NearestFilter);
  const nearest = min === NearestFilter || min === NearestMipmapNearestFilter || min === NearestMipmapLinearFilter;
  if (!isMipmapFilter(min) || !texture.mipmaps?.length)
    return sampleLevel(texture, texture, u, v, nearest);
  const level = clamp2(lod, 0, texture.mipmaps.length);
  const at = (i) => sampleLevel(texture, i === 0 ? texture : texture.mipmaps[i - 1], u, v, nearest);
  if (min === NearestMipmapNearestFilter || min === LinearMipmapNearestFilter)
    return at(Math.round(level));
  const low = Math.floor(level), weight = level - low;
  const a = at(low);
  if (!weight)
    return a;
  const b = at(low + 1);
  return a.map((v2, c) => v2 * (1 - weight) + b[c] * weight);
}
function sampleLevel(texture, level, u, v, nearest) {
  const { width, height, data } = level;
  const byte = data instanceof Uint8Array;
  const rgb = texture.colorSpace === SRGBColorSpace ? srgbBytes : linearBytes;
  u = u * width - 0.5;
  v = v * height - 0.5;
  if (nearest) {
    const o = (wrap(Math.floor(v + 0.5), height, texture.wrapT) * width + wrap(Math.floor(u + 0.5), width, texture.wrapS)) * 4;
    if (byte)
      return [rgb[data[o]], rgb[data[o + 1]], rgb[data[o + 2]], linearBytes[data[o + 3]]];
    return [data[o], data[o + 1], data[o + 2], data[o + 3]];
  }
  const x = Math.floor(u), y = Math.floor(v), tx = u - x, ty = v - y;
  const x0 = wrap(x, width, texture.wrapS), x1 = wrap(x + 1, width, texture.wrapS);
  const y0 = wrap(y, height, texture.wrapT) * width, y1 = wrap(y + 1, height, texture.wrapT) * width;
  const o00 = (y0 + x0) * 4, o10 = (y0 + x1) * 4, o01 = (y1 + x0) * 4, o11 = (y1 + x1) * 4;
  const w00 = (1 - tx) * (1 - ty), w10 = tx * (1 - ty), w01 = (1 - tx) * ty, w11 = tx * ty;
  if (byte) {
    const result = new Array(4);
    for (let c = 0; c < 4; c++) {
      const table = c === 3 ? linearBytes : rgb;
      result[c] = table[data[o00 + c]] * w00 + table[data[o10 + c]] * w10 + table[data[o01 + c]] * w01 + table[data[o11 + c]] * w11;
    }
    return result;
  }
  return [
    data[o00] * w00 + data[o10] * w10 + data[o01] * w01 + data[o11] * w11,
    data[o00 + 1] * w00 + data[o10 + 1] * w10 + data[o01 + 1] * w01 + data[o11 + 1] * w11,
    data[o00 + 2] * w00 + data[o10 + 2] * w10 + data[o01 + 2] * w01 + data[o11 + 2] * w11,
    data[o00 + 3] * w00 + data[o10 + 3] * w10 + data[o01 + 3] * w01 + data[o11 + 3] * w11
  ];
}

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/environment.js
var LEVEL_STEP = 0.25;
var LEVEL_SIZES = [[96, 48], [48, 24], [32, 16], [32, 16]];
var LEVEL_SAMPLES = [32, 48, 64, 64];
var BASE_WIDTH = 256;
var BASE_HEIGHT = 128;
var IMPORTANCE_PEAK_RATIO = 8;
var texelLuminance = (c) => c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
var direction = (u, v) => {
  const phi = (u - 0.5) * 2 * Math.PI, theta = v * Math.PI;
  return [Math.sin(theta) * Math.cos(phi), Math.cos(theta), Math.sin(theta) * Math.sin(phi)];
};
function lookup(grid, d) {
  const u = (Math.atan2(d[2], d[0]) / (2 * Math.PI) + 0.5) * grid.width - 0.5;
  const v = Math.acos(clamp2(d[1], -1, 1)) / Math.PI * grid.height - 0.5;
  const x = Math.floor(u), y = Math.floor(v), texels = grid.texels;
  const texel = (a, b) => {
    const i = (clamp2(b, 0, grid.height - 1) * grid.width + (a % grid.width + grid.width) % grid.width) * 3;
    return [texels[i], texels[i + 1], texels[i + 2]];
  };
  return mix(mix(texel(x, y), texel(x + 1, y), u - x), mix(texel(x, y + 1), texel(x + 1, y + 1), u - x), v - y);
}
function mipChain(base) {
  const chain = [base];
  while (chain[chain.length - 1].width > 8) {
    const { width, height, texels } = chain[chain.length - 1], w = width / 2, h = height / 2;
    const next = new Float64Array(w * h * 3);
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++)
        for (let c = 0; c < 3; c++) {
          const at = (dx, dy) => texels[((2 * y + dy) * width + 2 * x + dx) * 3 + c];
          next[(y * w + x) * 3 + c] = (at(0, 0) + at(1, 0) + at(0, 1) + at(1, 1)) / 4;
        }
    chain.push({ width: w, height: h, texels: next });
  }
  return chain;
}
function lookupFiltered(chain, d, solidAngle) {
  const texel = 4 * Math.PI / (chain[0].width * chain[0].height);
  const lod = clamp2(0.5 * Math.log2(solidAngle / texel) + 1, 0, chain.length - 1), low = Math.floor(lod);
  if (low === lod || low === chain.length - 1)
    return lookup(chain[low], d);
  return mix(lookup(chain[low], d), lookup(chain[low + 1], d), lod - low);
}
function tangentFrame(n) {
  const t = normalize2(cross(Math.abs(n[1]) > 0.99 ? [1, 0, 0] : [0, 1, 0], n));
  return { t, b: cross(n, t) };
}
function prefilter(chain, roughness, width, height, samples) {
  const alpha = roughness * roughness, texels = sharedFloat64(width * height * 3);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const n = direction((x + 0.5) / width, (y + 0.5) / height), { t, b } = tangentFrame(n);
      let sum = [0, 0, 0], weight = 0;
      for (let i = 1; i <= samples; i++) {
        const phi = halton(i, 2) * 2 * Math.PI, u = halton(i, 3);
        const cosTheta = Math.sqrt((1 - u) / (1 + (alpha * alpha - 1) * u));
        const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
        const h = add(add(scale(t, sinTheta * Math.cos(phi)), scale(b, sinTheta * Math.sin(phi))), scale(n, cosTheta));
        const l = sub(scale(h, 2 * cosTheta), n), nl = l[0] * n[0] + l[1] * n[1] + l[2] * n[2];
        if (nl <= 0)
          continue;
        const lobe = cosTheta * cosTheta * (alpha * alpha - 1) + 1, pdf = alpha * alpha / (Math.PI * lobe * lobe) / 4;
        sum = add(sum, scale(lookupFiltered(chain, l, 1 / (samples * pdf)), nl));
        weight += nl;
      }
      texels.set(weight > 0 ? scale(sum, 1 / weight) : [0, 0, 0], (y * width + x) * 3);
    }
  return { width, height, texels };
}
function buildImportance(base) {
  const { width, height, texels } = base, count = width * height;
  const luminance3 = sharedFloat64(count), columns = sharedFloat64(count), rows = sharedFloat64(height);
  let total = 0, peak = 0, sum = 0;
  for (let y = 0; y < height; y++) {
    const sinTheta = Math.sin((y + 0.5) / height * Math.PI);
    let rowSum = 0;
    for (let x = 0; x < width; x++) {
      const i = y * width + x, l = texelLuminance([texels[i * 3], texels[i * 3 + 1], texels[i * 3 + 2]]);
      luminance3[i] = l;
      rowSum += l * sinTheta;
      columns[i] = rowSum;
      peak = Math.max(peak, l);
      sum += l;
    }
    for (let x = 0; x < width; x++)
      columns[y * width + x] = rowSum > 0 ? columns[y * width + x] / rowSum : (x + 1) / width;
    total += rowSum;
    rows[y] = total;
  }
  if (!(total > 0) || peak < IMPORTANCE_PEAK_RATIO * (sum / count))
    return null;
  for (let y = 0; y < height; y++)
    rows[y] /= total;
  return { width, height, rows, columns, luminance: luminance3, total };
}
function searchCdf(cdf, start, count, u) {
  let low = start, high = start + count - 1;
  while (low < high) {
    const mid = low + high >>> 1;
    if (u < cdf[mid])
      high = mid;
    else
      low = mid + 1;
  }
  return low;
}
function irradiance(chain, width, height, samples) {
  const texels = sharedFloat64(width * height * 3);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const n = direction((x + 0.5) / width, (y + 0.5) / height), { t, b } = tangentFrame(n);
      let color = [0, 0, 0];
      for (let i = 1; i <= samples; i++) {
        const r = Math.sqrt(halton(i, 2)), a = halton(i, 3) * 2 * Math.PI;
        const cosine = Math.sqrt(1 - r * r);
        const d = add(add(scale(t, r * Math.cos(a)), scale(b, r * Math.sin(a))), scale(n, cosine));
        color = add(color, scale(lookupFiltered(chain, d, Math.PI / (samples * Math.max(cosine, 0.05))), 1 / samples));
      }
      texels.set(color, (y * width + x) * 3);
    }
  return { width, height, texels };
}
function foregroundShader(source) {
  if (!source)
    return void 0;
  const replaced = source.replace(/\btextureCube\s*\(\s*uSkyMap\s*,/g, "cpuSkyMap(");
  return new CpuShader(`
        varying vec3 vDirection;
        uniform sampler2D uCpuSky;
        vec4 cpuSkyMap(vec3 direction) {
          vec3 d = normalize(direction);
          return texture2D(uCpuSky, vec2(atan(d.z, d.x) / 6.283185307179586 + 0.5,
            acos(clamp(d.y, -1.0, 1.0)) / 3.141592653589793));
        }
        ${replaced}
        void main() { gl_FragColor = vec4(skyForeground(normalize(vDirection)), 1.0); }
      `);
}
var CpuEnvironment = class _CpuEnvironment {
  texture = null;
  levels = [];
  diffuse = null;
  /** Sampling distribution of the map; null disables environment importance sampling in global illumination. */
  importance = null;
  top = [1, 1, 1];
  bottom = [0, 0, 0];
  exponent = 2;
  procedural;
  foreground;
  /** Prepare the smooth atmosphere once; celestial bodies stay sharp at output resolution. */
  static *fromProcedural(descriptor, width = 128) {
    const env = new _CpuEnvironment();
    env.procedural = descriptor;
    const height = width / 2;
    if (!Number.isInteger(width) || width < 8 || width > 512 || !Number.isInteger(height))
      throw new Error("CPU renderer: invalid procedural sky resolution.");
    const shader = new CpuShader(descriptor.fragmentShader);
    const data = sharedFloat32(width * height * 4);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const result = shader.run({
          ...descriptor.uniforms,
          vDirection: direction((x + 0.5) / width, (y + 0.5) / height),
          gl_FragCoord: [x + 0.5, y + 0.5, 0, 1],
          gl_FragColor: [0, 0, 0, 1]
        }, { texture: () => {
          throw new Error("CPU renderer: unbound procedural sky texture.");
        } });
        const color = result?.gl_FragColor;
        if (!Array.isArray(color) || color.length !== 4 || !color.every((v) => typeof v === "number" && Number.isFinite(v)))
          throw new Error("CPU renderer: procedural sky must output finite RGBA radiance.");
        data.set(color, (y * width + x) * 4);
      }
      yield;
    }
    env.texture = {
      id: "procedural-sky",
      width,
      height,
      data,
      colorSpace: "srgb-linear",
      wrapS: 1e3,
      wrapT: 1001,
      matrix: [1, 0, 0, 0, 1, 0, 0, 0, 1],
      flipY: false,
      channel: 0,
      nearest: false
    };
    env.foreground = foregroundShader(descriptor.foregroundShader);
    env.convolve();
    return env;
  }
  snapshot() {
    return {
      texture: this.texture,
      levels: this.levels,
      diffuse: this.diffuse,
      importance: this.importance,
      top: this.top,
      bottom: this.bottom,
      exponent: this.exponent,
      procedural: this.procedural
    };
  }
  /** Environment convolved by another worker: only the sky shader is compiled again. */
  static fromSnapshot(snapshot) {
    const env = new _CpuEnvironment();
    env.texture = snapshot.texture;
    env.levels = snapshot.levels;
    env.diffuse = snapshot.diffuse;
    env.importance = snapshot.importance;
    env.top = snapshot.top;
    env.bottom = snapshot.bottom;
    env.exponent = snapshot.exponent;
    env.procedural = snapshot.procedural;
    env.foreground = foregroundShader(snapshot.procedural?.foregroundShader);
    return env;
  }
  get backgroundVisible() {
    return this.procedural?.background ?? true;
  }
  /** Background brightness is independent of the sky's illumination strength. */
  sampleBackground(d, rotation) {
    if (!this.procedural)
      return this.sample(d, rotation);
    if (!this.foreground)
      return this.raw(d);
    const result = this.foreground.run({
      ...this.procedural.uniforms,
      vDirection: d,
      uCpuSky: { texture: this.texture.id },
      gl_FragColor: [0, 0, 0, 1]
    }, { texture: (_sampler, uv, sampling) => sampleTexture(this.texture, uv, false, sampling) });
    const color = result?.gl_FragColor;
    if (!Array.isArray(color) || color.length !== 4 || !color.every((v) => typeof v === "number" && Number.isFinite(v)))
      throw new Error("CPU renderer: sky foreground must output finite RGBA radiance.");
    return color.slice(0, 3);
  }
  /** Environment from a linear equirectangular map already in memory (tests and fixtures). */
  static fromTexture(texture) {
    const env = new _CpuEnvironment();
    env.texture = texture;
    env.convolve();
    return env;
  }
  static async load(descriptor, signal) {
    const env = new _CpuEnvironment();
    if (descriptor.kind === "hdri") {
      if (!descriptor.url)
        throw new Error("HDRI URL is missing.");
      const response = await fetch(descriptor.url, { signal });
      if (!response.ok)
        throw new Error(`HDRI: HTTP ${response.status}`);
      const parsed = new HDRLoader().setDataType(FloatType).parse(await response.arrayBuffer());
      if (!parsed.width || !parsed.height || !parsed.data)
        throw new Error("Invalid HDRI image.");
      const data = sharedFloat32(parsed.data.length);
      data.set(parsed.data);
      env.texture = {
        id: "environment",
        data,
        width: parsed.width,
        height: parsed.height,
        colorSpace: "srgb-linear",
        wrapS: 1e3,
        wrapT: 1001,
        matrix: [1, 0, 0, 0, 1, 0, 0, 0, 1],
        flipY: false,
        channel: 0,
        nearest: false
      };
    } else {
      env.top = new Color(descriptor.topColor ?? "#ffffff").toArray();
      env.bottom = new Color(descriptor.bottomColor ?? "#000000").toArray();
      env.exponent = descriptor.exponent ?? 2;
    }
    env.convolve();
    return env;
  }
  raw(direction2) {
    if (!this.texture)
      return mix(this.bottom, this.top, ((direction2[1] + 1) / 2) ** this.exponent);
    return sampleTexture(this.texture, [
      Math.atan2(direction2[2], direction2[0]) / (2 * Math.PI) + 0.5,
      Math.acos(clamp2(direction2[1], -1, 1)) / Math.PI
    ], false).slice(0, 3);
  }
  /** Base grid downsampled by box averaging: acts as the mip level for the convolutions. */
  base() {
    const texels = new Float64Array(BASE_WIDTH * BASE_HEIGHT * 3);
    for (let y = 0; y < BASE_HEIGHT; y++)
      for (let x = 0; x < BASE_WIDTH; x++) {
        if (!this.texture) {
          texels.set(this.raw(direction((x + 0.5) / BASE_WIDTH, (y + 0.5) / BASE_HEIGHT)), (y * BASE_WIDTH + x) * 3);
          continue;
        }
        const { width, height, data } = this.texture;
        const x0 = Math.floor(x * width / BASE_WIDTH), y0 = Math.floor(y * height / BASE_HEIGHT);
        const x1 = Math.max(x0 + 1, Math.floor((x + 1) * width / BASE_WIDTH));
        const y1 = Math.max(y0 + 1, Math.floor((y + 1) * height / BASE_HEIGHT));
        const sum = [0, 0, 0];
        for (let sy = y0; sy < y1; sy++)
          for (let sx = x0; sx < x1; sx++) {
            const offset = (Math.min(sy, height - 1) * width + Math.min(sx, width - 1)) * 4;
            sum[0] += data[offset];
            sum[1] += data[offset + 1];
            sum[2] += data[offset + 2];
          }
        texels.set(scale(sum, 1 / ((x1 - x0) * (y1 - y0))), (y * BASE_WIDTH + x) * 3);
      }
    return { width: BASE_WIDTH, height: BASE_HEIGHT, texels };
  }
  convolve() {
    const base = this.base(), chain = mipChain(base);
    this.levels = LEVEL_SIZES.map(([width, height], index) => prefilter(chain, LEVEL_STEP * (index + 1), width, height, LEVEL_SAMPLES[index]));
    this.diffuse = irradiance(chain, 32, 16, 64);
    this.importance = this.texture ? buildImportance(base) : null;
  }
  /** Effective rotation: a procedural sky ignores the HDR rotation so its sun stays aligned with the light. */
  angle(rotation) {
    return this.procedural ? 0 : rotation * Math.PI / 180;
  }
  /** World direction sampled by the map's luminance, and its density per solid angle. */
  sampleDirection(u, v, rotation) {
    const imp = this.importance;
    if (!imp)
      return null;
    const y = searchCdf(imp.rows, 0, imp.height, u);
    const rowStart = y === 0 ? 0 : imp.rows[y - 1], rowSpan = imp.rows[y] - rowStart;
    const x = searchCdf(imp.columns, y * imp.width, imp.width, v) - y * imp.width;
    const columnStart = x === 0 ? 0 : imp.columns[y * imp.width + x - 1];
    const columnSpan = imp.columns[y * imp.width + x] - columnStart;
    const jy = rowSpan > 0 ? clamp2((u - rowStart) / rowSpan, 0, 0.999999) : 0.5;
    const jx = columnSpan > 0 ? clamp2((v - columnStart) / columnSpan, 0, 0.999999) : 0.5;
    const t = direction((x + jx) / imp.width, (y + jy) / imp.height);
    const angle = this.angle(rotation), c = Math.cos(angle), s = Math.sin(angle);
    return {
      direction: [t[0] * c + t[2] * s, t[1], -t[0] * s + t[2] * c],
      pdf: imp.luminance[y * imp.width + x] * imp.width * imp.height / (2 * Math.PI * Math.PI * imp.total)
    };
  }
  /** Density per solid angle with which `sampleDirection` produces a world direction. */
  pdf(d, rotation) {
    const imp = this.importance;
    if (!imp)
      return 0;
    const angle = this.angle(rotation), c = Math.cos(angle), s = Math.sin(angle);
    const t = normalize2([d[0] * c - d[2] * s, d[1], d[0] * s + d[2] * c]);
    const x = (Math.floor((Math.atan2(t[2], t[0]) / (2 * Math.PI) + 0.5) * imp.width) % imp.width + imp.width) % imp.width;
    const y = clamp2(Math.floor(Math.acos(clamp2(t[1], -1, 1)) / Math.PI * imp.height), 0, imp.height - 1);
    return imp.luminance[y * imp.width + x] * imp.width * imp.height / (2 * Math.PI * Math.PI * imp.total);
  }
  sample(direction2, rotation, roughness = 0, diffuse = false) {
    if (this.procedural)
      rotation = 0;
    const intensity = this.procedural?.intensity ?? 1;
    const angle = rotation * Math.PI / 180, c = Math.cos(angle), s = Math.sin(angle);
    const d = normalize2([direction2[0] * c - direction2[2] * s, direction2[1], direction2[0] * s + direction2[2] * c]);
    if (diffuse)
      return scale(this.diffuse ? lookup(this.diffuse, d) : this.raw(d), intensity);
    if (roughness <= 0 || !this.levels.length)
      return scale(this.raw(d), intensity);
    const position = clamp2(roughness) / LEVEL_STEP, index = Math.floor(position);
    const lower = index === 0 ? this.raw(d) : lookup(this.levels[index - 1], d);
    const upper = lookup(this.levels[Math.min(index, this.levels.length - 1)], d);
    return scale(mix(lower, upper, position - index), intensity);
  }
};

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/camera.js
function cameraProjection(camera, aspect) {
  if (camera.projectionMatrix)
    return new Matrix4().fromArray(camera.projectionMatrix);
  const projection = camera.type === "orthographic" ? new OrthographicCamera(camera.left, camera.right, camera.top, camera.bottom, camera.near, camera.far) : new PerspectiveCamera(camera.fov ?? 50, camera.aspect ?? aspect, camera.near, camera.far);
  projection.zoom = camera.zoom ?? 1;
  projection.updateProjectionMatrix();
  return projection.projectionMatrix;
}

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/compute.js
var readPath = (data, path) => path.split(".").reduce((value, key) => value && typeof value === "object" ? value[key] : void 0, data);
function resolveBindings(bindings, data) {
  return Object.fromEntries(bindings.map((binding) => {
    const scalar = (raw2, fallback) => {
      const value2 = raw2 === void 0 ? fallback : raw2;
      if (binding.type === "color")
        return new Color(value2 ?? "#ffffff").toArray();
      if (binding.type === "bool")
        return Boolean(value2);
      if (binding.type.startsWith("vec"))
        return Array.from({ length: Number(binding.type.slice(3)) }, (_, i) => Number(Array.isArray(value2) ? value2[i] ?? 0 : 0));
      if (binding.type === "texture")
        throw new Error("CPU compute: texture bindings must reference pipeline buffers.");
      return typeof value2 === "number" ? value2 : 0;
    };
    const raw = binding.path ? readPath(data, binding.path) : void 0;
    const value = binding.arrayLength ? Array.from({ length: binding.arrayLength }, (_, i) => {
      let entry = binding.paths?.[i] ? readPath(data, binding.paths[i]) : Array.isArray(raw) ? raw[i] : void 0;
      if (binding.components && entry && typeof entry === "object")
        entry = binding.components.map((key) => Number(entry[key] ?? 0));
      return scalar(entry, Array.isArray(binding.default) ? binding.default[i] : void 0);
    }) : scalar(raw, binding.default);
    return [binding.name, value];
  }));
}
function decodeFloats(base64) {
  const binary = atob(base64), bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++)
    bytes[i] = binary.charCodeAt(i);
  return new Float32Array(bytes.buffer);
}
function floatTexture(id, width, height, output = false) {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width * height > 4194304)
    throw new Error("CPU compute: invalid buffer resolution (maximum 4 megapixels).");
  return {
    id,
    width,
    height,
    data: sharedFloat32(width * height * 4),
    colorSpace: "",
    wrapS: output ? 1e3 : 1001,
    wrapT: output ? 1e3 : 1001,
    nearest: !output,
    matrix: [1, 0, 0, 0, 1, 0, 0, 0, 1],
    flipY: false,
    channel: 0
  };
}
function size(spec, data) {
  const raw = typeof spec === "number" ? spec : readPath(data, spec.path) ?? spec.default;
  return Math.max(1, Math.round(typeof spec === "object" && spec.transform === "log2" ? Math.log2(Number(raw)) : Number(raw)));
}
var CpuComputePipeline = class {
  descriptor;
  id;
  data;
  buffers = /* @__PURE__ */ new Map();
  config = /* @__PURE__ */ new Map();
  programs;
  constructor(descriptor, id, data) {
    this.descriptor = descriptor;
    this.id = id;
    this.data = data;
    const outputs = new Set(Object.values(descriptor.outputs));
    for (const buffer of descriptor.buffers) {
      if (this.buffers.has(buffer.name))
        throw new Error(`CPU compute: duplicate buffer ${buffer.name}.`);
      const texture = floatTexture(`${id}:${buffer.name}`, size(buffer.width, data), size(buffer.height, data), outputs.has(buffer.name));
      this.buffers.set(buffer.name, {
        front: texture,
        back: buffer.pingPong ? { ...texture, data: new Float32Array(texture.data.length) } : texture
      });
    }
    this.programs = descriptor.passes.map((pass) => {
      if (!this.buffers.has(pass.output) || pass.inputs.some((input) => !this.buffers.has(input)))
        throw new Error(`CPU compute: invalid buffer binding in ${pass.name}.`);
      if (pass.inputs.includes(pass.output) && !descriptor.buffers.find((b) => b.name === pass.output)?.pingPong)
        throw new Error(`CPU compute: ${pass.name} requires a ping-pong buffer.`);
      const declarations = (pass.uniforms ?? []).map((b) => {
        const type = b.type === "color" ? "vec3" : b.type === "texture" ? "sampler2D" : b.type;
        return `uniform ${type} ${b.name}${b.arrayLength ? `[${b.arrayLength}]` : ""};`;
      });
      const samplers = pass.inputs.map((n) => `uniform sampler2D ${n};`).join("\n");
      return new CpuShader("varying vec2 vUv; uniform int uIteration; uniform float uTime; uniform float uDeltaTime;\n" + samplers + "\n" + declarations.join("\n") + "\n" + pass.fragmentShader);
    });
  }
  restore(snapshot) {
    for (const [uniform, name] of Object.entries(this.descriptor.outputs)) {
      const output = snapshot.outputs[uniform];
      if (!output)
        throw new Error(`CPU compute: paused snapshot is missing ${uniform}.`);
      const state = this.buffers.get(name);
      if (state.front.width !== output.width || state.front.height !== output.height)
        throw new Error(`CPU compute: paused snapshot resolution differs for ${uniform}.`);
      const values = typeof output.data === "string" ? decodeFloats(output.data) : output.data;
      if (values.length !== state.front.data.length)
        throw new Error(`CPU compute: invalid snapshot ${uniform}.`);
      state.front.data.set(values);
    }
  }
  *tick(time, deltaTime = 0) {
    for (let index = 0; index < this.descriptor.passes.length; index++) {
      const pass = this.descriptor.passes[index], uniforms = resolveBindings(pass.uniforms ?? [], this.data);
      const config = JSON.stringify(uniforms);
      if (pass.trigger === "onConfigChange" && this.config.get(pass.name) === config)
        continue;
      const state = this.buffers.get(pass.output);
      const iterations = pass.iterations === void 0 ? 1 : size(pass.iterations, this.data);
      if (!Number.isInteger(iterations) || iterations > 4096)
        throw new Error(`CPU compute: invalid iteration count in ${pass.name}.`);
      for (let iteration = 0; iteration < iterations; iteration++) {
        const inputs = new Map(pass.inputs.map((name) => [name, this.buffers.get(name).front]));
        const context = { texture: (sampler, uv, sampling) => {
          const texture = inputs.get(String(sampler));
          if (!texture)
            throw new Error(`CPU compute: unbound sampler in ${pass.name}.`);
          return sampleTexture(texture, uv, false, sampling);
        } };
        const globals = {
          ...uniforms,
          ...Object.fromEntries(pass.inputs.map((n) => [n, n])),
          uTime: time,
          uDeltaTime: deltaTime,
          uIteration: iteration
        };
        const target = state.back;
        for (let y = 0; y < target.height; y++) {
          for (let x = 0; x < target.width; x++) {
            const result = this.programs[index].run({
              ...globals,
              vUv: [(x + 0.5) / target.width, (y + 0.5) / target.height],
              gl_FragCoord: [x + 0.5, y + 0.5, 0.5, 1],
              gl_FragColor: [0, 0, 0, 0]
            }, context);
            if (!result)
              continue;
            const color = result.gl_FragColor;
            if (!Array.isArray(color) || color.length !== 4 || !color.every(Number.isFinite))
              throw new Error(`CPU compute: ${pass.name} produced non-finite pixels at ${x},${y}.`);
            target.data.set(color, (y * target.width + x) * 4);
          }
          yield;
        }
        [state.front, state.back] = [state.back, state.front];
      }
      this.config.set(pass.name, config);
    }
  }
  outputs() {
    return Object.fromEntries(Object.entries(this.descriptor.outputs).map(([uniform, name]) => {
      const state = this.buffers.get(name);
      if (!state)
        throw new Error(`CPU compute: unknown output ${name}.`);
      return [uniform, state.front];
    }));
  }
};

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/bvh.js
function buildBvh(positions, count, include) {
  const bounds = [], nodes = [], leaves = [];
  const centroids = new Float64Array(count * 3);
  for (let i = 0; i < count; i++)
    for (let c = 0; c < 3; c++)
      centroids[i * 3 + c] = (positions[i * 9 + c] + positions[i * 9 + 3 + c] + positions[i * 9 + 6 + c]) / 3;
  const BINS = 32, binMin = new Float64Array(BINS * 3), binMax = new Float64Array(BINS * 3), binCount = new Int32Array(BINS);
  const leftArea = new Float64Array(BINS), leftCount = new Int32Array(BINS);
  const area = (min, max) => {
    const x = max[0] - min[0], y = max[1] - min[1], z = max[2] - min[2];
    return 2 * (x * y + y * z + z * x);
  };
  const build = (indices) => {
    const node = nodes.length / 2;
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    const cmin = [Infinity, Infinity, Infinity], cmax = [-Infinity, -Infinity, -Infinity];
    for (const i of indices) {
      for (let k = 0; k < 9; k++) {
        const c = k % 3, value = positions[i * 9 + k];
        if (value < min[c])
          min[c] = value;
        if (value > max[c])
          max[c] = value;
      }
      for (let c = 0; c < 3; c++) {
        const value = centroids[i * 3 + c];
        if (value < cmin[c])
          cmin[c] = value;
        if (value > cmax[c])
          cmax[c] = value;
      }
    }
    bounds.push(min[0], min[1], min[2], max[0], max[1], max[2]);
    nodes.push(0, 0);
    const leaf = () => {
      nodes[node * 2] = -1 - leaves.length;
      nodes[node * 2 + 1] = indices.length;
      leaves.push(...indices);
      return node;
    };
    if (indices.length <= 4)
      return leaf();
    const extent = [cmax[0] - cmin[0], cmax[1] - cmin[1], cmax[2] - cmin[2]];
    let left, right;
    if (extent[0] <= 0 && extent[1] <= 0 && extent[2] <= 0) {
      const mid = indices.length >> 1;
      left = indices.slice(0, mid);
      right = indices.slice(mid);
    } else {
      const parentArea = area(min, max);
      let bestCost = Infinity, bestSplit = -1, bestAxis = -1, bestScale = 0;
      for (let axis = 0; axis < 3; axis++) {
        if (extent[axis] <= 0)
          continue;
        binCount.fill(0);
        binMin.fill(Infinity);
        binMax.fill(-Infinity);
        const scale2 = BINS / extent[axis];
        const binOf = (i) => Math.min(BINS - 1, Math.floor((centroids[i * 3 + axis] - cmin[axis]) * scale2));
        for (const i of indices) {
          const b = binOf(i);
          binCount[b]++;
          for (let k = 0; k < 9; k++) {
            const c = k % 3, value = positions[i * 9 + k];
            if (value < binMin[b * 3 + c])
              binMin[b * 3 + c] = value;
            if (value > binMax[b * 3 + c])
              binMax[b * 3 + c] = value;
          }
        }
        const rmin = [Infinity, Infinity, Infinity], rmax = [-Infinity, -Infinity, -Infinity];
        let n = 0;
        for (let b = 0; b < BINS; b++) {
          for (let c = 0; c < 3; c++) {
            rmin[c] = Math.min(rmin[c], binMin[b * 3 + c]);
            rmax[c] = Math.max(rmax[c], binMax[b * 3 + c]);
          }
          n += binCount[b];
          leftArea[b] = n ? area(rmin, rmax) : 0;
          leftCount[b] = n;
        }
        rmin.fill(Infinity);
        rmax.fill(-Infinity);
        n = 0;
        for (let b = BINS - 1; b > 0; b--) {
          for (let c = 0; c < 3; c++) {
            rmin[c] = Math.min(rmin[c], binMin[b * 3 + c]);
            rmax[c] = Math.max(rmax[c], binMax[b * 3 + c]);
          }
          n += binCount[b];
          if (!n || !leftCount[b - 1])
            continue;
          const cost = leftArea[b - 1] * leftCount[b - 1] + area(rmin, rmax) * n;
          if (cost < bestCost) {
            bestCost = cost;
            bestSplit = b;
            bestAxis = axis;
            bestScale = scale2;
          }
        }
      }
      if (bestSplit < 0 || indices.length <= 8 && 1 + bestCost / parentArea >= indices.length)
        return leaf();
      const splitOf = (i) => Math.min(BINS - 1, Math.floor((centroids[i * 3 + bestAxis] - cmin[bestAxis]) * bestScale));
      left = [];
      right = [];
      for (const i of indices)
        (splitOf(i) < bestSplit ? left : right).push(i);
    }
    const l = build(left), r = build(right);
    nodes[node * 2] = l;
    nodes[node * 2 + 1] = r;
    return node;
  };
  const included = [];
  for (let i = 0; i < count; i++)
    if (include(i))
      included.push(i);
  if (included.length)
    build(included);
  return {
    bounds: sharedCopy(sharedFloat64, bounds),
    nodes: sharedCopy(sharedInt32, nodes),
    indices: sharedCopy(sharedUint32, leaves)
  };
}
function slabEntry(bounds, b, ox, oy, oz, dx, dy, dz, ix, iy, iz, far) {
  if (dx === 0 && (ox < bounds[b] || ox > bounds[b + 3]) || dy === 0 && (oy < bounds[b + 1] || oy > bounds[b + 4]) || dz === 0 && (oz < bounds[b + 2] || oz > bounds[b + 5]))
    return Infinity;
  let near = 0;
  let a = (bounds[b] - ox) * ix, c = (bounds[b + 3] - ox) * ix;
  if (a > c) {
    const t = a;
    a = c;
    c = t;
  }
  near = a > near ? a : near;
  far = c < far ? c : far;
  a = (bounds[b + 1] - oy) * iy;
  c = (bounds[b + 4] - oy) * iy;
  if (a > c) {
    const t = a;
    a = c;
    c = t;
  }
  near = a > near ? a : near;
  far = c < far ? c : far;
  a = (bounds[b + 2] - oz) * iz;
  c = (bounds[b + 5] - oz) * iz;
  if (a > c) {
    const t = a;
    a = c;
    c = t;
  }
  near = a > near ? a : near;
  far = c < far ? c : far;
  return near > far ? Infinity : near;
}
var ShadowBvh = class {
  data;
  positions;
  castShadow;
  stack = [];
  constructor(source, includeNonCasters = false) {
    if (Array.isArray(source)) {
      this.positions = new Float64Array(source.length * 9);
      source.forEach((triangle, index) => this.positions.set(triangle.positions.flat(), index * 9));
      this.castShadow = Uint8Array.from(source, (triangle) => triangle.castShadow ? 1 : 0);
      this.data = buildBvh(this.positions, source.length, (index) => includeNonCasters || source[index].castShadow);
    } else {
      this.data = source.data;
      this.positions = source.positions;
      this.castShadow = source.castShadow;
    }
  }
  /** Iterative scalar traversal; returns immediately on the first accepted shadow hit. */
  occluded(origin, direction2, distance, ignore, accepts) {
    return this.trace(origin, direction2, distance, ignore, accepts, false) !== null;
  }
  /** Closest scene hit, including surfaces that do not cast direct-light shadows. */
  intersect(origin, direction2, distance = Infinity, ignore = -1) {
    return this.trace(origin, direction2, distance, ignore, void 0, true);
  }
  stackT = [];
  trace(origin, direction2, distance, ignore, accepts, closest) {
    const { bounds, nodes, indices } = this.data, positions = this.positions, castShadow = this.castShadow;
    if (!nodes.length)
      return null;
    let hit = null;
    const epsilon = closest ? 1e-7 : 1e-5;
    const ox = origin[0], oy = origin[1], oz = origin[2], dx = direction2[0], dy = direction2[1], dz = direction2[2];
    const ix = 1 / dx, iy = 1 / dy, iz = 1 / dz;
    const stack = this.stack, stackT = this.stackT;
    if (slabEntry(bounds, 0, ox, oy, oz, dx, dy, dz, ix, iy, iz, distance) === Infinity)
      return null;
    let top = 0;
    stack[top] = 0;
    stackT[top++] = 0;
    while (top > 0) {
      const node = stack[--top];
      if (stackT[top] >= distance)
        continue;
      const first = nodes[node * 2], second = nodes[node * 2 + 1];
      if (first >= 0) {
        const t1 = slabEntry(bounds, first * 6, ox, oy, oz, dx, dy, dz, ix, iy, iz, distance);
        const t2 = slabEntry(bounds, second * 6, ox, oy, oz, dx, dy, dz, ix, iy, iz, distance);
        if (t1 <= t2) {
          if (t2 !== Infinity) {
            stack[top] = second;
            stackT[top++] = t2;
          }
          if (t1 !== Infinity) {
            stack[top] = first;
            stackT[top++] = t1;
          }
        } else {
          stack[top] = first;
          stackT[top++] = t1;
          stack[top] = second;
          stackT[top++] = t2;
        }
        continue;
      }
      for (let k = -1 - first, end = k + second; k < end; k++) {
        const index = indices[k];
        if (index === ignore || !closest && !(castShadow[index] & 1))
          continue;
        const o = index * 9, p0x = positions[o], p0y = positions[o + 1], p0z = positions[o + 2];
        const e1x = positions[o + 3] - p0x, e1y = positions[o + 4] - p0y, e1z = positions[o + 5] - p0z;
        const e2x = positions[o + 6] - p0x, e2y = positions[o + 7] - p0y, e2z = positions[o + 8] - p0z;
        const hx = dy * e2z - dz * e2y, hy = dz * e2x - dx * e2z, hz = dx * e2y - dy * e2x;
        const determinant = e1x * hx + e1y * hy + e1z * hz;
        if (Math.abs(determinant) < 1e-10)
          continue;
        const inverse = 1 / determinant;
        const sx = ox - p0x, sy = oy - p0y, sz = oz - p0z;
        const u = (sx * hx + sy * hy + sz * hz) * inverse;
        if (u < 0 || u > 1)
          continue;
        const qx = sy * e1z - sz * e1y, qy = sz * e1x - sx * e1z, qz = sx * e1y - sy * e1x;
        const v = (dx * qx + dy * qy + dz * qz) * inverse;
        if (v < 0 || u + v > 1)
          continue;
        const t = (e2x * qx + e2y * qy + e2z * qz) * inverse;
        if (t > epsilon && t < distance - epsilon && (!accepts || accepts(index, u, v))) {
          hit = { index, u, v, distance: t };
          if (!closest)
            return hit;
          distance = t;
        }
      }
    }
    return hit;
  }
};

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/globalIllumination.js
var BLACK = [0, 0, 0];
var luminance = (c) => c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
var powerWeight = (a, b) => a * a / (a * a + b * b);
var DIMENSIONS_PER_BOUNCE = 8;
var primes = [
  2,
  3,
  5,
  7,
  11,
  13,
  17,
  19,
  23,
  29,
  31,
  37,
  41,
  43,
  47,
  53,
  59,
  61,
  67,
  71,
  73,
  79,
  83,
  89,
  97,
  101,
  103,
  107,
  109,
  113,
  127,
  131,
  137,
  139,
  149,
  151,
  157,
  163,
  167,
  173,
  179,
  181,
  191,
  193,
  197,
  199,
  211,
  223,
  227,
  229,
  233,
  239,
  241,
  251,
  257,
  263,
  269,
  271,
  277,
  281,
  283,
  293,
  307,
  311,
  313,
  317
];
function random(sample, dimension, seed) {
  const v = Math.sin(seed * 7183.17 + dimension * 39.3467) * 47453.5453;
  return (halton(sample + 1, primes[dimension % primes.length]) + v - Math.floor(v)) % 1;
}
var DiffuseGi = class {
  scene;
  emitters = [];
  emitterByTriangle = /* @__PURE__ */ new Map();
  totalWeight = 0;
  lights;
  continuation = /* @__PURE__ */ new Map();
  constructor(scene) {
    this.scene = scene;
    this.lights = scene.lights.map((light) => ({ ...light, castShadow: true }));
    for (let index = 0; index < scene.triangles.count; index++) {
      const m = scene.triangles.material(index);
      if (m.data.shader)
        continue;
      const power = luminance(m.vector("emissive", BLACK)) * m.number("emissiveIntensity", 1);
      if (power <= 0)
        continue;
      const [a, b, c] = this.corners(index);
      const area = length(cross(sub(b, a), sub(c, a))) * 0.5;
      if (area <= 1e-12)
        continue;
      const weight = power * area;
      this.totalWeight += weight;
      const emitter = { index, area, weight, cumulative: this.totalWeight, normal: this.geometricNormal(index) };
      this.emitters.push(emitter);
      this.emitterByTriangle.set(index, emitter);
    }
  }
  geometricNormal(index) {
    const normals = this.scene.triangles.faceNormals, o = index * 3;
    return [normals[o], normals[o + 1], normals[o + 2]];
  }
  corners(index) {
    const p = this.scene.triangles.positions, o = index * 9;
    return [[p[o], p[o + 1], p[o + 2]], [p[o + 3], p[o + 4], p[o + 5]], [p[o + 6], p[o + 7], p[o + 8]]];
  }
  evaluate(source, position, normal, seed) {
    return this.estimate(source, position, normal, seed).color;
  }
  estimate(source, position, normal, seed) {
    const { giSamples = 64, giBounces = 3, giIntensity = 1, giClamp = 0 } = this.scene.settings;
    if (giIntensity === 0)
      return { color: BLACK, variance: 0, radius: Infinity };
    let sum = [0, 0, 0], sumL = 0, sumL2 = 0;
    const stats = { inverseDistance: 0, hits: 0 };
    for (let sample = 0; sample < giSamples; sample++) {
      let value = this.irradiance(source, position, normal, giBounces, 0, sample, seed, stats);
      const energy = luminance(value);
      if (giClamp > 0 && energy > giClamp)
        value = scale(value, giClamp / energy);
      sum = add(sum, value);
      const l = luminance(value);
      sumL += l;
      sumL2 += l * l;
    }
    const mean = sumL / giSamples;
    const variance = giSamples > 1 ? Math.max(0, sumL2 / giSamples - mean * mean) / (giSamples - 1) * giIntensity * giIntensity : 0;
    return {
      color: scale(sum, giIntensity / giSamples),
      variance,
      radius: stats.hits ? stats.hits / stats.inverseDistance : Infinity
    };
  }
  context(source, seed, indirect, transport, emissionWeight = 1) {
    return {
      lights: this.lights,
      settings: this.scene.settings,
      environment: this.scene.environment,
      occlusion: () => 1,
      indirect,
      transport,
      emissionWeight,
      visibility: (p, n, d, distance) => {
        const g = this.geometricNormal(source), geometric = dot2(g, n) < 0 ? scale(g, -1) : g;
        let direction2 = d;
        const spread = Math.tan((this.scene.settings.shadowSoftness ?? 0) * Math.PI / 360);
        if (spread > 0) {
          const t = normalize2(cross(Math.abs(d[1]) > 0.99 ? [1, 0, 0] : [0, 1, 0], d)), b = cross(d, t);
          const r = Math.sqrt(random(0, 0, seed)) * spread, angle = random(0, 1, seed) * 2 * Math.PI;
          direction2 = normalize2(add(d, add(scale(t, r * Math.cos(angle)), scale(b, r * Math.sin(angle)))));
        }
        if (dot2(direction2, geometric) <= 0)
          return 0;
        return this.hit(this.scene.origin(p, geometric), direction2, distance, source, seed) ? 0 : 1;
      }
    };
  }
  /** Alpha cutouts/discard do not consume a bounce. Blended coverage is sampled stochastically. */
  hit(origin, d, distance, ignore, seed) {
    let p = origin, remaining = distance;
    for (let layer = 0; layer < 64; layer++) {
      const hit = this.scene.intersect(p, d, remaining, ignore);
      if (!hit)
        return null;
      const material = this.scene.triangles.material(hit.index);
      if (material.rayOpaque)
        return { hit, surface: null };
      const surface = this.scene.surface(hit, d);
      const emission = material.shade(surface, this.context(hit.index, seed, () => BLACK, "emission"));
      if (emission && emission.alpha > random(layer, 39, seed))
        return { hit, surface };
      const next = this.scene.origin(surface.position, d);
      remaining -= length(sub(next, p));
      p = next;
      ignore = hit.index;
    }
    throw new Error("CPU GI: more than 64 transparent layers along a ray.");
  }
  lightPdf(emitter, from, to, direction2) {
    const cosine = Math.abs(dot2(emitter.normal, direction2));
    const delta = sub(to, from);
    return cosine > 1e-10 ? emitter.weight / this.totalWeight * dot2(delta, delta) / (emitter.area * cosine) : 0;
  }
  facesRay(index, surface) {
    const side = this.scene.triangles.material(index).number("side", 0);
    return side === 2 || (side === 1 ? !surface.frontFacing : surface.frontFacing);
  }
  /** Probability of the path continuing at a material: a dark surface returns little, so it stops earlier. */
  continuationProbability(material) {
    let q = this.continuation.get(material);
    if (q === void 0) {
      q = clamp2(luminance(material.vector("color", [1, 1, 1])), 0.1, 0.95);
      this.continuation.set(material, q);
    }
    return q;
  }
  irradiance(source, position, normal, remaining, depth, sample, seed, stats) {
    if (remaining === 0)
      return BLACK;
    const g = this.geometricNormal(source);
    const geometric = dot2(g, normal) < 0 ? scale(g, -1) : g;
    const origin = this.scene.origin(position, geometric), dimension = depth * DIMENSIONS_PER_BOUNCE;
    let result = this.sampleEmitter(source, origin, normal, geometric, sample, dimension, seed);
    const environment = this.scene.environment, rotation = this.scene.settings.environmentRotation;
    const importance = Boolean(environment.importance);
    if (importance)
      result = add(result, this.sampleEnvironment(source, origin, normal, geometric, sample, dimension, seed));
    const t = normalize2(cross(Math.abs(normal[1]) > 0.99 ? [1, 0, 0] : [0, 1, 0], normal));
    const b = cross(normal, t), u = random(sample, dimension, seed);
    const phi = random(sample, dimension + 1, seed) * 2 * Math.PI;
    const r = Math.sqrt(u), cosine = Math.sqrt(1 - u);
    const d = add(add(scale(t, r * Math.cos(phi)), scale(b, r * Math.sin(phi))), scale(normal, cosine));
    if (dot2(d, geometric) <= 0)
      return result;
    const found = this.hit(origin, d, Infinity, source, seed + sample * 0.754877 + depth * 0.56984);
    if (!found) {
      let sky = scale(environment.sample(d, rotation), this.scene.settings.environmentIntensity);
      if (importance)
        sky = scale(sky, powerWeight(cosine / Math.PI, environment.pdf(d, rotation)));
      for (const light of this.scene.lights) {
        if (light.type === "AmbientLight")
          sky = add(sky, scale(light.color, light.intensity / Math.PI));
        if (light.type === "HemisphereLight")
          sky = add(sky, scale(mix(light.groundColor, light.color, dot2(d, normalize2(light.position)) * 0.5 + 0.5), light.intensity / Math.PI));
      }
      return add(result, sky);
    }
    if (stats) {
      stats.inverseDistance += 1 / Math.max(found.hit.distance, 1e-6);
      stats.hits++;
    }
    const { hit } = found, surface = found.surface ?? this.scene.surface(hit, d);
    if (!this.facesRay(hit.index, surface))
      return result;
    const emitter = this.emitterByTriangle.get(hit.index);
    const emissionWeight = emitter ? powerWeight(cosine / Math.PI, this.lightPdf(emitter, origin, surface.position, d)) : 1;
    const material = this.scene.triangles.material(hit.index);
    let weight = 1;
    if (depth >= 1 && remaining > 1) {
      const q = this.continuationProbability(material);
      weight = random(sample, dimension + 7, seed) < q ? 1 / q : 0;
    }
    const ctx = this.context(hit.index, seed + sample + depth, weight === 0 ? () => BLACK : (p, n) => scale(this.irradiance(hit.index, p, n, remaining - 1, depth + 1, sample, seed), weight), "diffuse", emissionWeight);
    const shaded = material.shade(surface, ctx);
    if (shaded)
      result = add(result, shaded.color);
    return result;
  }
  sampleEmitter(source, origin, n, geometric, sample, dimension, seed) {
    if (!this.emitters.length)
      return BLACK;
    const pick = random(sample, dimension + 2, seed) * this.totalWeight;
    let low = 0, high = this.emitters.length - 1;
    while (low < high) {
      const mid = low + high >>> 1;
      if (pick < this.emitters[mid].cumulative)
        high = mid;
      else
        low = mid + 1;
    }
    const emitter = this.emitters[low];
    if (emitter.index === source)
      return BLACK;
    const r = Math.sqrt(random(sample, dimension + 3, seed)), v = random(sample, dimension + 4, seed);
    const [a, b, c] = this.corners(emitter.index);
    const point = add(add(scale(a, 1 - r), scale(b, r * (1 - v))), scale(c, r * v));
    const delta = sub(point, origin), distance = length(delta), d = normalize2(delta), cosine = dot2(n, d);
    if (cosine <= 0 || dot2(geometric, d) <= 0 || distance < 1e-7)
      return BLACK;
    const surface = this.scene.surface({ index: emitter.index, u: r * (1 - v), v: r * v, distance }, d);
    if (!this.facesRay(emitter.index, surface))
      return BLACK;
    const pdf = this.lightPdf(emitter, origin, point, d);
    if (pdf <= 0)
      return BLACK;
    const endpointBias = length(sub(this.scene.origin(point, d), point));
    if (this.hit(origin, d, Math.max(0, distance - endpointBias), source, seed + sample * 0.3287))
      return BLACK;
    const emission = this.scene.triangles.material(emitter.index).shade(surface, this.context(emitter.index, seed, () => BLACK, "emission"));
    return emission ? scale(emission.color, emission.alpha * cosine / (Math.PI * pdf) * powerWeight(pdf, cosine / Math.PI)) : BLACK;
  }
  /** Samples an environment direction by map luminance; the power heuristic shares it with cosine sampling. */
  sampleEnvironment(source, origin, n, geometric, sample, dimension, seed) {
    const environment = this.scene.environment, rotation = this.scene.settings.environmentRotation;
    const picked = environment.sampleDirection(random(sample, dimension + 5, seed), random(sample, dimension + 6, seed), rotation);
    if (!picked || picked.pdf <= 0)
      return BLACK;
    const d = picked.direction, cosine = dot2(n, d);
    if (cosine <= 0 || dot2(geometric, d) <= 0)
      return BLACK;
    if (this.hit(origin, d, Infinity, source, seed + sample * 0.1931))
      return BLACK;
    const radiance = scale(environment.sample(d, rotation), this.scene.settings.environmentIntensity);
    return scale(radiance, cosine / Math.PI / picked.pdf * powerWeight(picked.pdf, cosine / Math.PI));
  }
};

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/irradianceCache.js
var PLANE_TOLERANCE = 0.05;
var RECORD_STRIDE = 11;
function recordWeight(position, normal, px, py, pz, nx, ny, nz, radius) {
  const dx = position[0] - px, dy = position[1] - py, dz = position[2] - pz;
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (distance >= radius)
    return 0;
  const cosine = normal[0] * nx + normal[1] * ny + normal[2] * nz;
  const error2 = distance / radius + Math.sqrt(Math.max(0, 1 - cosine));
  if (error2 >= 1)
    return 0;
  if ((dx * (nx + normal[0]) + dy * (ny + normal[1]) + dz * (nz + normal[2])) * 0.5 < -PLANE_TOLERANCE * radius)
    return 0;
  return (1 - error2) * (1 - error2);
}
var PLACEMENT_COVERAGE = 0.25;
var LOOKUP_SMOOTHING = 3;
var GRID_REACH = 3;
function allocateIrradianceGrid(width, height, spacing) {
  const columns = Math.ceil(width / spacing), rows = Math.ceil(height / spacing);
  return {
    width,
    height,
    spacing,
    columns,
    rows,
    data: sharedFloat32(columns * rows * RECORD_STRIDE),
    flags: sharedInt32(columns * rows)
  };
}
var IrradianceGrid = class {
  buffers;
  constructor(buffers) {
    this.buffers = buffers;
  }
  cellX(px) {
    return Math.min(this.buffers.columns - 1, Math.max(0, Math.floor(px / this.buffers.spacing)));
  }
  cellY(py) {
    return Math.min(this.buffers.rows - 1, Math.max(0, Math.floor(py / this.buffers.spacing)));
  }
  has(cx, cy) {
    return Atomics.load(this.buffers.flags, cy * this.buffers.columns + cx) === 1;
  }
  write(cx, cy, record) {
    const i = cy * this.buffers.columns + cx, o = i * RECORD_STRIDE, data = this.buffers.data;
    data.set(record.position, o);
    data.set(record.normal, o + 3);
    data.set(record.color, o + 6);
    data[o + 9] = record.variance;
    data[o + 10] = record.radius;
    Atomics.store(this.buffers.flags, i, 1);
    return i;
  }
  /**
   * Interpolates the records in the window around the pixel that reach the point; null when none does, or when
   * their summed weight does not exceed `coverage`. `smoothing` widens both the records and the window: placement
   * asks with 1, shading with `LOOKUP_SMOOTHING`.
   */
  lookupAt(px, py, position, normal, coverage = 0, smoothing = 1) {
    const { columns, rows, data, flags } = this.buffers;
    const cx = this.cellX(px), cy = this.cellY(py);
    const reach = Math.ceil(GRID_REACH * smoothing);
    const x0 = Math.max(0, cx - reach), x1 = Math.min(columns - 1, cx + reach);
    const y0 = Math.max(0, cy - reach), y1 = Math.min(rows - 1, cy + reach);
    let weightSum = 0, r = 0, g = 0, b = 0, variance = 0;
    for (let y = y0; y <= y1; y++)
      for (let x = x0; x <= x1; x++) {
        const i = y * columns + x;
        if (Atomics.load(flags, i) !== 1)
          continue;
        const o = i * RECORD_STRIDE;
        const weight = recordWeight(position, normal, data[o], data[o + 1], data[o + 2], data[o + 3], data[o + 4], data[o + 5], data[o + 10] * smoothing);
        if (weight === 0)
          continue;
        weightSum += weight;
        r += data[o + 6] * weight;
        g += data[o + 7] * weight;
        b += data[o + 8] * weight;
        variance += data[o + 9] * weight;
      }
    if (weightSum <= coverage)
      return null;
    return { color: [r / weightSum, g / weightSum, b / weightSum], variance: variance / weightSum };
  }
  /** Written cells, each record prefixed by its index, for transfer without shared memory. */
  exportCells(cells) {
    const out = new Float32Array(cells.length * (RECORD_STRIDE + 1));
    cells.forEach((cell, k) => {
      out[k * (RECORD_STRIDE + 1)] = cell;
      out.set(this.buffers.data.subarray(cell * RECORD_STRIDE, (cell + 1) * RECORD_STRIDE), k * (RECORD_STRIDE + 1) + 1);
    });
    return out;
  }
  importCells(packed) {
    for (let k = 0; k + RECORD_STRIDE + 1 <= packed.length; k += RECORD_STRIDE + 1) {
      const cell = packed[k];
      this.buffers.data.set(packed.subarray(k + 1, k + 1 + RECORD_STRIDE), cell * RECORD_STRIDE);
      Atomics.store(this.buffers.flags, cell, 1);
    }
  }
};
var IrradianceCache = class _IrradianceCache {
  records = [];
  get size() {
    return this.records.length;
  }
  add(record) {
    this.records.push(record);
  }
  /** Records in a flat array, to travel between the cache pass and the shading pass. */
  pack() {
    const out = new Float32Array(this.records.length * RECORD_STRIDE);
    this.records.forEach((record, i) => {
      const o = i * RECORD_STRIDE;
      out.set(record.position, o);
      out.set(record.normal, o + 3);
      out.set(record.color, o + 6);
      out[o + 9] = record.variance;
      out[o + 10] = record.radius;
    });
    return out;
  }
  static fromPacked(data) {
    const cache = new _IrradianceCache();
    for (let o = 0; o + RECORD_STRIDE <= data.length; o += RECORD_STRIDE)
      cache.records.push({
        position: [data[o], data[o + 1], data[o + 2]],
        normal: [data[o + 3], data[o + 4], data[o + 5]],
        color: [data[o + 6], data[o + 7], data[o + 8]],
        variance: data[o + 9],
        radius: data[o + 10]
      });
    return cache;
  }
  lookup(position, normal, smoothing = 1) {
    let weightSum = 0, r = 0, g = 0, b = 0, variance = 0;
    for (const record of this.records) {
      const weight = recordWeight(position, normal, record.position[0], record.position[1], record.position[2], record.normal[0], record.normal[1], record.normal[2], record.radius * smoothing);
      if (weight === 0)
        continue;
      weightSum += weight;
      r += record.color[0] * weight;
      g += record.color[1] * weight;
      b += record.color[2] * weight;
      variance += record.variance * weight;
    }
    if (weightSum === 0)
      return null;
    return { color: [r / weightSum, g / weightSum, b / weightSum], variance: variance / weightSum };
  }
};

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/volumetricLight.js
var smoothstep = (a, b, value) => {
  const t = b > a ? clamp2((value - a) / (b - a)) : Number(value >= b);
  return t * t * (3 - 2 * t);
};
var CpuVolumetricLight = class {
  lights;
  constructor(lights) {
    this.lights = lights.filter((l) => l.volumetric && (l.type === "PointLight" || l.type === "SpotLight")).map((light) => {
      const density = Math.max(0, light.medium?.density ?? 0.01), spread = clamp2(light.medium?.spread ?? 0);
      const outer = light.angle + spread * Math.max(0, 1.5 - light.angle);
      return {
        light,
        density,
        spread,
        outer,
        anisotropy: clamp2(light.medium?.anisotropy ?? 0, -0.95, 0.95),
        axis: normalize2(sub(light.target, light.position)),
        radius: light.distance > 0 ? light.distance : -3 * Math.log(1e-4)
      };
    });
  }
  get active() {
    return this.lights.length > 0;
  }
  sample(origin, direction2, distance, visible, jitter = 0.5, fogVisibility) {
    const result = [0, 0, 0];
    let tStart = Math.min(distance, 40), tEnd = 0;
    for (const { light, axis, radius, outer } of this.lights) {
      const delta = sub(origin, light.position), b = dot2(delta, direction2);
      const disc = b * b - dot2(delta, delta) + radius * radius;
      if (disc <= 0)
        continue;
      const start = Math.max(0, -b - Math.sqrt(disc));
      const end = Math.min(distance, 40, -b + Math.sqrt(disc));
      if (end <= start)
        continue;
      const cuts = [start, end];
      const cone = Math.cos(outer);
      if (light.type === "SpotLight") {
        const ar = dot2(axis, direction2), ac = dot2(axis, delta), cos2 = cone * cone;
        const qa = ar * ar - cos2, qb = ar * ac - dot2(direction2, delta) * cos2;
        const qc = ac * ac - dot2(delta, delta) * cos2, discriminant = qb * qb - qa * qc;
        const roots = Math.abs(qa) < 1e-8 ? Math.abs(qb) > 1e-8 ? [-qc / (2 * qb)] : [] : discriminant >= 0 ? [(-qb - Math.sqrt(discriminant)) / qa, (-qb + Math.sqrt(discriminant)) / qa] : [];
        cuts.push(...roots.filter((t) => t > start && t < end));
        cuts.sort((a, b2) => a - b2);
      }
      for (let segment = 1; segment < cuts.length; segment++) {
        const lo = cuts[segment - 1], hi = cuts[segment];
        if (light.type === "SpotLight" && dot2(normalize2(add(delta, scale(direction2, (lo + hi) / 2))), axis) < cone)
          continue;
        tStart = Math.min(tStart, lo);
        tEnd = Math.max(tEnd, hi);
      }
    }
    if (tEnd <= tStart)
      return result;
    const step = (tEnd - tStart) / 64;
    const transmittance = this.lights.map(({ density }) => Math.exp(-density * tStart));
    const extinction = this.lights.map(({ density }) => Math.exp(-density * step));
    for (let i = 0; i < 64; i++) {
      const t = tStart + (i + jitter) * step, p = add(origin, scale(direction2, t));
      const fogged = fogVisibility ? fogVisibility(p) : 1;
      if (fogged <= 1e-4)
        break;
      let lit = false;
      this.lights.forEach(({ light, axis, density, anisotropy, spread, outer }, index) => {
        if (transmittance[index] <= 3e-3)
          return;
        lit = true;
        const toLight = sub(light.position, p), dist = Math.hypot(...toLight), toward = scale(toLight, 1 / dist);
        let attenuation = Math.exp(-dist / ((light.distance > 0 ? light.distance : 10) * 0.3));
        if (light.distance > 0)
          attenuation *= 1 - smoothstep(light.distance * 0.8, light.distance, dist);
        if (light.type === "SpotLight") {
          const along = -dot2(toward, axis);
          const core = smoothstep(Math.cos(light.angle), Math.cos(light.angle * (1 - light.penumbra)), along);
          attenuation *= spread > 0 ? Math.max(core, spread * smoothstep(Math.cos(outer), Math.cos(light.angle * (1 - light.penumbra)), along) ** 2) : core;
        }
        if (attenuation <= 1e-4 || light.type === "SpotLight" && light.castShadow && !visible(p, toward, dist))
          return;
        const g = anisotropy, cosine = dot2(toward, direction2);
        const phase = g === 0 ? 1 : (1 - g * g) / (1 + g * g - 2 * g * cosine) ** 1.5;
        const weight = attenuation * density * step * transmittance[index] * fogged * phase * 1.5 * light.intensity;
        for (let c = 0; c < 3; c++)
          result[c] += light.color[c] * weight;
      });
      if (!lit)
        break;
      for (let index = 0; index < transmittance.length; index++)
        transmittance[index] *= extinction[index];
    }
    return result.map((v) => v / (1 + v));
  }
};

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/material.js
var shaderChunks = {
  ...ShaderChunk,
  tonemapping_fragment: "",
  colorspace_fragment: "",
  encodings_fragment: ""
};
var nativeShaderHelpers = `
vec3 inverseTransformDirection(vec3 dir, mat4 matrix) { return normalize((vec4(dir, 0.0) * matrix).xyz); }
float getDistanceAttenuation(float lightDistance, float cutoffDistance, float decayExponent) {
  float falloff = 1.0 / max(pow(lightDistance, decayExponent), 0.01);
  if (cutoffDistance > 0.0) falloff *= pow(clamp(1.0 - pow(lightDistance / cutoffDistance, 4.0), 0.0, 1.0), 2.0);
  return falloff;
}
float getSpotAttenuation(float coneCosine, float penumbraCosine, float angleCosine) {
  return smoothstep(coneCosine, penumbraCosine, angleCosine);
}
`;
var ONES = [1, 1, 1, 1];
var ONES3 = [1, 1, 1];
var ZERO3 = [0, 0, 0];
var lightCache = /* @__PURE__ */ new WeakMap();
function lightConstants(light) {
  let c = lightCache.get(light);
  if (!c) {
    c = {
      direction: normalize2(sub(light.position, light.target)),
      outer: Math.cos(light.angle),
      inner: Math.cos(light.angle * (1 - light.penumbra))
    };
    lightCache.set(light, c);
  }
  return c;
}
var schlick = (f0, cosine) => f0 + (1 - f0) * (1 - cosine) ** 5;
function filmSensitivity(opd, shift) {
  const phase = 2 * Math.PI * opd * 1e-9;
  const val = [54856e-17, 44201e-17, 52481e-17], pos = [1681e3, 1795300, 2208400];
  const variance = [43278e5, 93046e5, 66121e5];
  const xyz = [0, 1, 2].map((i) => val[i] * Math.sqrt(2 * Math.PI * variance[i]) * Math.cos(pos[i] * phase + shift[i]) * Math.exp(-phase * phase * variance[i]));
  xyz[0] += 9747e-17 * Math.sqrt(2 * Math.PI * 45282e5) * Math.cos(2239900 * phase + shift[0]) * Math.exp(-45282e5 * phase * phase);
  const [x, y, z] = xyz.map((c) => c / 10685e-11);
  return [
    3.2404542 * x - 1.5371385 * y - 0.4985314 * z,
    -0.969266 * x + 1.8760108 * y + 0.041556 * z,
    0.0556434 * x - 0.2040259 * y + 1.0572252 * z
  ];
}
function iridescentFresnel(filmIor, cosTheta1, thickness, baseF0) {
  const ior = 1 + (filmIor - 1) * (thickness >= 0.03 ? 1 : ((t) => t * t * (3 - 2 * t))(thickness / 0.03));
  const cosTheta2Sq = 1 - (1 / ior) ** 2 * (1 - cosTheta1 * cosTheta1);
  if (cosTheta2Sq < 0)
    return [1, 1, 1];
  const cosTheta2 = Math.sqrt(cosTheta2Sq), r12 = schlick(((ior - 1) / (ior + 1)) ** 2, cosTheta1), t121 = 1 - r12;
  const phi21 = Math.PI - (ior < 1 ? Math.PI : 0);
  const baseIor = baseF0.map((f) => {
    const root = Math.sqrt(clamp2(f, 0, 0.9999));
    return (1 + root) / (1 - root);
  });
  const r23 = baseIor.map((b) => schlick(((b - ior) / (b + ior)) ** 2, cosTheta2));
  const phi = baseIor.map((b) => phi21 + (b < ior ? Math.PI : 0)), opd = 2 * ior * thickness * cosTheta2;
  const r123 = r23.map((r) => clamp2(r12 * r, 1e-5, 0.9999));
  const rs = r23.map((r, i) => t121 * t121 * r / (1 - r123[i]));
  const result = rs.map((r) => r12 + r), cm = rs.map((r) => r - t121);
  for (let m = 1; m <= 2; m++) {
    const sensitivity = filmSensitivity(m * opd, phi.map((x) => m * x));
    for (let i = 0; i < 3; i++) {
      cm[i] *= Math.sqrt(r123[i]);
      result[i] += cm[i] * 2 * sensitivity[i];
    }
  }
  return result.map((x) => Math.max(x, 0));
}
function sheenAlbedo(cosine, roughness) {
  const r2 = roughness * roughness, inverse = 1 / (roughness + 0.1);
  const a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * inverse;
  const b = -0.6014 + 0.5538 * roughness - 0.467 * r2 - 0.1255 * inverse;
  return clamp2(Math.exp(a * clamp2(cosine) + b));
}
function sheenLobe(roughness, nh, nv, nl) {
  const inverse = 1 / (roughness * roughness), sin2h = Math.max(1 - nh * nh, 78125e-7);
  return (2 + inverse) * sin2h ** (inverse * 0.5) / (2 * Math.PI) * clamp2(1 / (4 * (nl + nv - nl * nv)));
}
function environmentBrdf(roughness, nv) {
  const x = 1 - roughness, y = 0.0425 - 0.0275 * roughness, z = 1.04 - 0.572 * roughness, w = 0.022 * roughness - 0.04;
  const a004 = Math.min(x * x, 2 ** (-9.28 * nv)) * x + y;
  return [-1.04 * a004 + z, 1.04 * a004 + w];
}
var specularOcclusion = (nv, ao, roughness) => clamp2((nv + ao) ** 2 ** (-16 * roughness - 1) - 1 + ao);
var LIT_MATERIALS = /* @__PURE__ */ new Set([
  "MeshLambertMaterial",
  "MeshPhongMaterial",
  "MeshToonMaterial",
  "MeshStandardMaterial",
  "MeshPhysicalMaterial"
]);
var CpuMaterial = class {
  data;
  textures;
  vertex;
  fragment;
  fragmentAfter;
  uniforms;
  /** The tangent frame is only built for normal/bump maps and anisotropy. */
  needsTangents;
  /** Per-fragment uniforms only matter to shaders; native materials skip the copy. */
  needsUniforms;
  needsTextureFootprint;
  /** A ray hitting this material always stops: no map, alpha, cutout or shader that could let it through. */
  rayOpaque;
  /** Lit native material, with or without hooks: these are the ones that query indirect light from GI. */
  diffuseGi;
  /** Without maps, vertex colors or shaders, a ray hit can skip interpolating attributes and varyings. */
  needsAttributes;
  /** Scalar and vector material values, resolved once so shading does not look them up by name. */
  p;
  constructor(data, textures) {
    this.data = data;
    this.textures = textures;
    const pbr = data.type === "MeshStandardMaterial" || data.type === "MeshPhysicalMaterial";
    const ior = this.number("ior", 1.5);
    this.p = {
      transparent: this.flag("transparent"),
      vertexColors: this.flag("vertexColors"),
      alphaHash: this.flag("alphaHash"),
      alphaTest: this.number("alphaTest", 0),
      opacity: this.number("opacity", 1),
      color: this.vector("color", [1, 1, 1]),
      roughness: this.number("roughness", 1),
      metalness: this.number("metalness", 0),
      emissive: this.vector("emissive", [0, 0, 0]),
      emissiveIntensity: this.number("emissiveIntensity", 1),
      ior,
      dielectric: ((ior - 1) / (ior + 1)) ** 2,
      specularIntensity: this.number("specularIntensity", 1),
      specularColor: this.vector(pbr ? "specularColor" : "specular", pbr ? [1, 1, 1] : [0.066, 0.066, 0.066]),
      iridescence: this.number("iridescence", 0),
      iridescenceIOR: this.number("iridescenceIOR", 1.3),
      iridescenceThicknessRange: this.vector("iridescenceThicknessRange", [100, 400]),
      clearcoat: this.number("clearcoat", 0),
      clearcoatRoughness: this.number("clearcoatRoughness", 0),
      sheen: this.number("sheen", 0),
      sheenColor: this.vector("sheenColor", [0, 0, 0]),
      sheenRoughness: this.number("sheenRoughness", 1),
      anisotropy: this.number("anisotropy", 0),
      anisotropyRotation: this.number("anisotropyRotation", 0),
      transmission: this.number("transmission", 0),
      thickness: this.number("thickness", 0),
      attenuationDistance: this.number("attenuationDistance", Infinity),
      attenuationColor: this.vector("attenuationColor", [1, 1, 1]),
      envMapIntensity: this.number("envMapIntensity", 1),
      normalMapType: this.number("normalMapType", 0),
      normalScale: this.vector("normalScale", [1, 1]),
      aoMapIntensity: this.number("aoMapIntensity", 1),
      lightMapIntensity: this.number("lightMapIntensity", 1),
      shininess: this.number("shininess", 30),
      reflectivity: this.number("reflectivity", 1),
      refractionRatio: this.number("refractionRatio", 0.98),
      combine: this.number("combine", 0),
      clearcoatNormalScale: this.vector("clearcoatNormalScale", [1, 1]),
      dispersion: this.number("dispersion", 0),
      clippingPlanes: data.values.clippingPlanes,
      clipIntersection: this.flag("clipIntersection"),
      pbr
    };
    this.uniforms = data.shader?.uniforms ?? {};
    this.rayOpaque = !data.shader && !this.flag("transparent") && !data.maps.map && !data.maps.alphaMap && !this.flag("vertexColors") && !this.flag("alphaHash") && this.number("alphaTest", 0) <= 0 && this.number("transmission", 0) <= 0 && !data.values.clippingPlanes?.length;
    this.needsTangents = Boolean(data.maps.normalMap || data.maps.bumpMap || data.maps.clearcoatNormalMap || this.number("anisotropy", 0) > 0);
    this.diffuseGi = LIT_MATERIALS.has(data.type) && (!data.shader || data.shader.patched);
    this.needsAttributes = Boolean(data.shader) || this.flag("vertexColors") || Object.values(data.maps).some(Boolean);
    this.needsUniforms = Boolean(data.shader);
    const textureIds = new Set(Object.values(data.maps));
    const collectTextures = (value) => {
      if (Array.isArray(value)) {
        for (const child of value)
          collectTextures(child);
      } else if (value && typeof value === "object") {
        if (typeof value.texture === "string")
          textureIds.add(value.texture);
        else
          for (const child of Object.values(value))
            collectTextures(child);
      }
    };
    collectTextures(this.uniforms);
    this.needsTextureFootprint = [...textureIds].some((id) => {
      const t = textures.get(id);
      return t && t.minFilter !== void 0 && t.minFilter !== t.magFilter;
    });
    if (data.shader) {
      try {
        this.vertex = new CpuShader(data.shader.vertex, data.shader.defines, shaderChunks);
        this.fragment = new CpuShader((data.shader.patched ? nativeShaderHelpers : "") + data.shader.fragment, data.shader.defines, shaderChunks);
        if (data.shader.fragmentAfter)
          this.fragmentAfter = new CpuShader(data.shader.fragmentAfter, data.shader.defines, shaderChunks);
      } catch (error2) {
        throw new Error(`${data.name}: ${error2.message}`, { cause: error2 });
      }
    }
  }
  get usesDerivatives() {
    return Boolean(this.fragment?.usesDerivatives || this.fragmentAfter?.usesDerivatives);
  }
  get requiresShaderQuad() {
    return this.usesDerivatives || this.needsTextureFootprint && Boolean(this.fragment?.usesImplicitTextureSampling || this.fragmentAfter?.usesImplicitTextureSampling);
  }
  get needsFragmentQuad() {
    return this.requiresShaderQuad || this.needsTextureFootprint;
  }
  number(name, fallback) {
    const value = this.data.values[name];
    return typeof value === "number" ? value : fallback;
  }
  flag(name, fallback = false) {
    const value = this.data.values[name];
    return typeof value === "boolean" ? value : fallback;
  }
  vector(name, fallback) {
    const value = this.data.values[name];
    return Array.isArray(value) ? value : fallback;
  }
  texture = (sampler, uv, sampling) => {
    if (!sampler || typeof sampler !== "object" || Array.isArray(sampler) || typeof sampler.texture !== "string")
      throw new Error(`${this.data.name}: unbound sampler.`);
    const texture = this.textures.get(sampler.texture);
    if (!texture)
      throw new Error(`${this.data.name}: missing texture ${sampler.texture}.`);
    return sampleTexture(texture, uv, false, sampling);
  };
  textureNeedsFootprint = (sampler) => {
    const id = sampler && typeof sampler === "object" && !Array.isArray(sampler) ? sampler.texture : null;
    const texture = typeof id === "string" ? this.textures.get(id) : void 0;
    return Boolean(texture && texture.minFilter !== void 0 && texture.minFilter !== texture.magFilter);
  };
  map(name, attributes, fallback = ONES, offset, gradients) {
    const id = this.data.maps[name];
    if (!id)
      return fallback;
    const texture = this.textures.get(id);
    if (!texture)
      return fallback;
    const uv = attributes[texture.channel ? `uv${texture.channel}` : "uv"] ?? [0, 0];
    return sampleTexture(texture, offset ? [uv[0] + offset[0], uv[1] + offset[1]] : uv, true, gradients?.[texture.channel ? `uv${texture.channel}` : "uv"]);
  }
  alpha(attributes, gradients) {
    let alpha = this.p.opacity;
    if (this.data.maps.map)
      alpha *= this.map("map", attributes, ONES, void 0, gradients)[3];
    if (this.data.maps.alphaMap)
      alpha *= this.map("alphaMap", attributes, ONES, void 0, gradients)[1];
    return alpha;
  }
  /**
   * UV footprints of `s` from its fragment quad, computed once for all four lanes so that alpha tests and shading
   * read the same mip level. Undefined without a quad or when no texture needs a footprint.
   */
  uvGradients(s) {
    if (s.uvGradients || !this.needsTextureFootprint || !s.quad)
      return s.uvGradients;
    const helpers = s.quad.surfaces();
    const keys = Object.keys(s.attributes).filter((name) => /^uv\d*$/.test(name));
    if (!s.attributes.uv && s.varyings.gl_PointCoord)
      keys.push("uv");
    for (let lane = 0; lane < 4; lane++) {
      const gradients = {};
      for (const key of keys) {
        const uv = (i) => helpers[i].attributes[key] ?? [
          Number(helpers[i].varyings.gl_PointCoord[0]),
          1 - Number(helpers[i].varyings.gl_PointCoord[1])
        ];
        const left = uv(lane & 2), right = uv((lane & 2) + 1), bottom = uv(lane & 1), top = uv((lane & 1) + 2);
        gradients[key] = {
          dx: [right[0] - left[0], right[1] - left[1]],
          dy: [top[0] - bottom[0], top[1] - bottom[1]]
        };
      }
      helpers[lane].uvGradients = gradients;
    }
    return s.uvGradients;
  }
  shade(s, ctx) {
    const planes = this.p.clippingPlanes;
    if (planes?.length && !s.helper) {
      const tests = planes.map((p2) => dot2(p2, s.position) + p2[3] < 0);
      if (this.p.clipIntersection ? tests.every(Boolean) : tests.some(Boolean))
        return null;
    }
    if (ctx.transport && this.fragment && !this.data.shader?.patched)
      return {
        color: [0, 0, 0],
        alpha: 1,
        depth: s.depth,
        transmission: 0,
        attenuation: [1, 1, 1],
        diffuse: [0, 0, 0]
      };
    this.uvGradients(s);
    if (this.requiresShaderQuad && !s.derivatives) {
      if (!s.quad)
        throw new ShaderError("material derivatives require rasterized fragment helpers");
      const quad = s.quad, surfaces = quad.surfaces();
      return evaluateDerivativeQuad((lane, derivatives) => this.shade({ ...surfaces[lane], derivatives, helper: lane !== quad.lane }, ctx), quad.lane)[quad.lane];
    }
    const shaderInputs = this.fragment || this.fragmentAfter ? {
      ...s.uniforms,
      ...this.uniforms,
      ...s.varyings,
      gl_FragCoord: s.fragCoord,
      gl_FrontFacing: s.frontFacing,
      gl_FragDepth: s.depth,
      gl_FragColor: [0, 0, 0, 1]
    } : {};
    if (this.fragment && !this.data.shader?.patched) {
      const result = this.fragment.run(shaderInputs, {
        texture: this.texture,
        textureNeedsFootprint: this.textureNeedsFootprint,
        derivatives: s.derivatives
      });
      if (!result)
        return null;
      const color2 = this.fragment.outputs.length ? result[this.fragment.outputs[0]] : result.gl_FragColor;
      if (!Array.isArray(color2) || color2.length !== 4)
        throw new Error(`${this.data.name}: fragment shader must write vec4 output.`);
      return {
        color: color2.slice(0, 3),
        alpha: clamp2(color2[3]),
        depth: Number(result.gl_FragDepth ?? s.depth),
        transmission: 0,
        attenuation: [1, 1, 1],
        diffuse: color2.slice(0, 3),
        premultiplied: this.flag("premultipliedAlpha")
      };
    }
    const sampleMap = (name, attributes2, fallback = ONES, offset) => this.map(name, attributes2, fallback, offset, s.uvGradients);
    if (this.data.type === "LineDashedMaterial") {
      const distance = (s.attributes.lineDistance?.[0] ?? 0) * this.number("scale", 1);
      const dash = this.number("dashSize", 3), period = dash + this.number("gapSize", 1);
      if (period > 0 && (distance % period + period) % period > dash)
        return null;
    }
    const coord = s.varyings.gl_PointCoord;
    const attributes = this.data.type === "PointsMaterial" && coord && !s.attributes.uv ? { ...s.attributes, uv: [coord[0], 1 - coord[1]] } : s.attributes;
    const p = this.p;
    let color = this.data.maps.map ? mul(p.color, sampleMap("map", attributes)) : p.color, alpha = this.alpha(attributes, s.uvGradients);
    if (p.vertexColors && attributes.color) {
      color = mul(color, attributes.color);
      alpha *= attributes.color[3] ?? 1;
    }
    if (alpha < p.alphaTest && !s.helper)
      return null;
    if (p.alphaHash) {
      const noise = Math.sin(dot2(s.position, [12.9898, 78.233, 37.719])) * 43758.5453;
      if (alpha < noise - Math.floor(noise) && !s.helper)
        return null;
      alpha = 1;
    }
    let n = normalize2(s.normal);
    if (!s.frontFacing)
      n = scale(n, -1);
    const geometricNormal = n;
    if (this.data.maps.normalMap) {
      const tex = sampleMap("normalMap", attributes), ns = p.normalScale;
      const mapped = [(tex[0] * 2 - 1) * ns[0], (tex[1] * 2 - 1) * ns[1], tex[2] * 2 - 1];
      n = p.normalMapType === 1 ? normalize2(mapped) : normalize2(add(add(scale(s.tangent, mapped[0]), scale(s.bitangent, mapped[1])), scale(n, mapped[2])));
    } else if (this.data.maps.bumpMap) {
      const tex = this.textures.get(this.data.maps.bumpMap), du = 1 / tex.width, dv = 1 / tex.height, h = sampleMap("bumpMap", attributes)[0], amount = this.number("bumpScale", 1);
      const dx = (sampleMap("bumpMap", attributes, [1, 1, 1, 1], [du, 0])[0] - h) * amount, dy = (sampleMap("bumpMap", attributes, [1, 1, 1, 1], [0, dv])[0] - h) * amount;
      n = normalize2(sub(n, add(scale(s.tangent, dx), scale(s.bitangent, dy))));
    }
    let roughness = clamp2(this.data.maps.roughnessMap ? p.roughness * sampleMap("roughnessMap", attributes)[1] : p.roughness, 0.0525, 1);
    let metalness = clamp2(this.data.maps.metalnessMap ? p.metalness * sampleMap("metalnessMap", attributes)[2] : p.metalness);
    let emissive = p.emissiveIntensity === 1 && !this.data.maps.emissiveMap ? p.emissive : scale(this.data.maps.emissiveMap ? mul(p.emissive, sampleMap("emissiveMap", attributes)) : p.emissive, p.emissiveIntensity);
    let stage = {};
    if (this.fragment) {
      const result = this.fragment.run({
        ...shaderInputs,
        diffuseColor: [...color, alpha],
        normal: n,
        roughnessFactor: roughness,
        metalnessFactor: metalness,
        totalEmissiveRadiance: emissive,
        vViewPosition: s.uniforms.vViewPosition ?? scale(s.view, -1),
        vUv: attributes.uv ?? [0, 0],
        outgoingLight: color
      }, { texture: this.texture, textureNeedsFootprint: this.textureNeedsFootprint, derivatives: s.derivatives });
      if (!result)
        return null;
      stage = result;
      const diffuse2 = result.diffuseColor;
      color = diffuse2.slice(0, 3);
      alpha = diffuse2[3];
      n = normalize2(result.normal);
      roughness = clamp2(Number(result.roughnessFactor), 0.0525, 1);
      metalness = clamp2(Number(result.metalnessFactor));
      emissive = result.totalEmissiveRadiance;
    }
    const type = this.data.type;
    let indirectRaw, modulation;
    const finish = (rgb, transmission2 = 0, attenuation2 = [1, 1, 1], diffuse2 = rgb, transmitted2) => {
      const result = this.fragmentAfter?.run({
        ...stage,
        ...shaderInputs,
        diffuseColor: [...color, alpha],
        normal: n,
        outgoingLight: rgb,
        gl_FragColor: [...rgb, p.transparent ? clamp2(alpha) : 1]
      }, { texture: this.texture, textureNeedsFootprint: this.textureNeedsFootprint, derivatives: s.derivatives });
      if (this.fragmentAfter && !result)
        return null;
      const output = result?.gl_FragColor;
      const final = output?.slice(0, 3) ?? rgb;
      return {
        color: final,
        alpha: output ? output[3] : p.transparent ? clamp2(alpha) : 1,
        depth: s.depth,
        transmission: transmission2,
        attenuation: attenuation2,
        // If the hook rewrote the final color, the diffuse/specular split no longer exists.
        diffuse: output ? final : diffuse2,
        transmitted: transmitted2,
        indirect: output ? void 0 : indirectRaw,
        modulation: output ? void 0 : modulation
      };
    };
    if (ctx.transport && !LIT_MATERIALS.has(type))
      return finish([0, 0, 0]);
    if (ctx.transport === "emission")
      return finish(emissive);
    if (ctx.emissionWeight !== void 0)
      emissive = scale(emissive, ctx.emissionWeight);
    if (type === "MeshNormalMaterial")
      return finish(n.map((v2) => v2 * 0.5 + 0.5));
    if (type === "MeshDepthMaterial" || type === "MeshDistanceMaterial")
      return finish([1 - s.depth, 1 - s.depth, 1 - s.depth]);
    if (type === "MeshMatcapMaterial") {
      const x = normalize2([s.view[2], 0, -s.view[0]]), y = cross(s.view, x);
      const texture = this.textures.get(this.data.maps.matcap);
      const matcap = texture ? sampleTexture(texture, [dot2(x, n) * 0.495 + 0.5, dot2(y, n) * 0.495 + 0.5]) : [dot2(n, s.view) * 0.5 + 0.5, dot2(n, s.view) * 0.5 + 0.5, dot2(n, s.view) * 0.5 + 0.5];
      return finish(mul(color, matcap));
    }
    const v = normalize2(s.view), nv = Math.max(1e-4, dot2(n, v)), reflection = reflect(scale(v, -1), n);
    const ownEnv = this.textures.get(this.data.maps.envMap);
    const equirect = (texture, direction2) => sampleTexture(texture, [
      Math.atan2(direction2[2], direction2[0]) / (2 * Math.PI) + 0.5,
      Math.asin(clamp2(direction2[1], -1, 1)) / Math.PI + 0.5
    ], false).slice(0, 3);
    const legacyEnv = ownEnv && !ctx.transport && (type === "MeshBasicMaterial" || type === "MeshLambertMaterial" || type === "MeshPhongMaterial") ? (rgb) => {
      const direction2 = ownEnv.refraction ? refract(scale(v, -1), n, p.refractionRatio) : reflection;
      const envColor = equirect(ownEnv, direction2);
      const amount = p.reflectivity * (this.data.maps.specularMap ? sampleMap("specularMap", attributes)[0] : 1);
      return p.combine === 1 ? mix(rgb, envColor, amount) : p.combine === 2 ? add(rgb, scale(envColor, amount)) : mix(rgb, mul(rgb, envColor), amount);
    } : null;
    if (["MeshBasicMaterial", "PointsMaterial", "LineBasicMaterial", "LineDashedMaterial", "SpriteMaterial"].includes(type))
      return finish(legacyEnv ? legacyEnv(color) : color);
    const envIntensity = ctx.settings.environmentIntensity * p.envMapIntensity;
    const env = (direction2, r = 0, diffuse2 = false) => {
      const own = p.pbr ? ownEnv : void 0;
      return scale(own ? equirect(own, direction2) : ctx.environment.sample(direction2, ctx.settings.environmentRotation, r, diffuse2), envIntensity);
    };
    const pbr = p.pbr, dielectric = p.dielectric;
    const specularMapName = pbr ? "specularColorMap" : "specularMap";
    const specularBase = this.data.maps[specularMapName] ? mul(p.specularColor, sampleMap(specularMapName, attributes)) : p.specularColor;
    const specularFactor = pbr ? dielectric * p.specularIntensity * (this.data.maps.specularIntensityMap ? sampleMap("specularIntensityMap", attributes)[3] : 1) : 1;
    const specular = specularFactor === 1 ? specularBase : scale(specularBase, specularFactor);
    const f0 = mix(specular, color, metalness);
    const range = p.iridescenceThicknessRange;
    const filmThickness = this.data.maps.iridescenceThicknessMap ? range[0] + (range[1] - range[0]) * sampleMap("iridescenceThicknessMap", attributes)[1] : range[1];
    const iri = p.iridescence && filmThickness > 0 ? clamp2(p.iridescence * sampleMap("iridescenceMap", attributes)[0]) : 0;
    const film = iri > 0 ? mix(iridescentFresnel(p.iridescenceIOR, nv, filmThickness, specular), iridescentFresnel(p.iridescenceIOR, nv, filmThickness, color), metalness) : null;
    const fresnel = (vh) => {
      const t = 1 - vh, k = t * t * t * t * t;
      const f = [f0[0] + (1 - f0[0]) * k, f0[1] + (1 - f0[1]) * k, f0[2] + (1 - f0[2]) * k];
      return film ? mix(f, film, iri) : f;
    };
    const ao = (this.data.maps.aoMap ? 1 + (sampleMap("aoMap", attributes)[0] - 1) * p.aoMapIntensity : 1) * ctx.occlusion(s.position, geometricNormal);
    const diffuseAlbedo = pbr && ctx.indirect ? mul(color, f0.map((f) => 1 - clamp2(f))) : color;
    if (ctx.indirect && !ctx.transport && metalness < 1 && color.some((c) => c > 0))
      indirectRaw = ctx.indirect(s.position, n);
    let indirect = mul(diffuseAlbedo, ctx.indirect ? indirectRaw ?? (metalness < 1 && color.some((c) => c > 0) ? ctx.indirect(s.position, n) : [0, 0, 0]) : type === "MeshToonMaterial" ? ZERO3 : env(n, 1, true));
    if (this.data.maps.lightMap)
      indirect = add(indirect, scale(mul(color, sampleMap("lightMap", attributes)), p.lightMapIntensity));
    for (const light of ctx.indirect ? [] : ctx.lights) {
      if (light.type !== "AmbientLight" && light.type !== "HemisphereLight")
        continue;
      const ambient = light.type === "AmbientLight" ? light.color : mix(light.groundColor, light.color, dot2(n, normalize2(light.position)) * 0.5 + 0.5);
      indirect = add(indirect, scale(mul(color, ambient), light.intensity / Math.PI));
    }
    const sheen = p.sheen;
    const sheenColor = sheen ? scale(mul(p.sheenColor, sampleMap("sheenColorMap", attributes)), sheen) : ZERO3;
    const sheenRoughness = clamp2(p.sheenRoughness, 1e-4, 1) * (sheen ? sampleMap("sheenRoughnessMap", attributes)[3] : 1);
    const sheenPeak = Math.max(...sheenColor), sheenView = sheenPeak ? sheenAlbedo(nv, sheenRoughness) : 0;
    const sheenIndirect = 1 - sheenPeak * sheenView;
    let diffuse = scale(indirect, (1 - metalness) * ao * sheenIndirect);
    if (indirectRaw)
      modulation = scale(diffuseAlbedo, (1 - metalness) * ao * sheenIndirect);
    let specularOut = emissive;
    if (!ctx.transport && pbr) {
      const [scaleF0, bias] = environmentBrdf(roughness, nv);
      const albedo = f0.map((f) => f * scaleF0 + bias), reflectance = film ? mix(albedo, film, iri) : albedo;
      specularOut = add(specularOut, scale(mul(env(reflection, roughness), reflectance), specularOcclusion(nv, ao, roughness) * sheenIndirect));
      if (!ctx.indirect)
        diffuse = mul(diffuse, albedo.map((a) => 1 - clamp2(a)));
    }
    if (sheenPeak && !ctx.transport)
      specularOut = add(specularOut, scale(mul(env(n, 1, true), sheenColor), sheenView * ao));
    const coat = p.clearcoat ? p.clearcoat * sampleMap("clearcoatMap", attributes)[0] : 0;
    const coatRoughness = Math.max(0.0525, coat ? p.clearcoatRoughness * sampleMap("clearcoatRoughnessMap", attributes)[1] : p.clearcoatRoughness);
    let coatN = geometricNormal;
    if (coat && this.data.maps.clearcoatNormalMap) {
      const tex = sampleMap("clearcoatNormalMap", attributes), ns = p.clearcoatNormalScale;
      coatN = normalize2(add(add(scale(s.tangent, (tex[0] * 2 - 1) * ns[0]), scale(s.bitangent, (tex[1] * 2 - 1) * ns[1])), scale(geometricNormal, tex[2] * 2 - 1)));
    }
    const coatNv = Math.max(1e-4, dot2(coatN, v));
    if (coat) {
      const coatFresnel = coat * (0.04 + 0.96 * (1 - coatNv) ** 5);
      diffuse = scale(diffuse, 1 - coatFresnel);
      if (modulation)
        modulation = scale(modulation, 1 - coatFresnel);
      const [coatScale, coatBias] = environmentBrdf(coatRoughness, coatNv);
      if (!ctx.transport)
        specularOut = add(scale(specularOut, 1 - coatFresnel), scale(env(reflect(scale(v, -1), coatN), coatRoughness), coat * (0.04 * coatScale + coatBias) * ao));
    }
    const toon = type === "MeshToonMaterial", gradient = toon ? this.textures.get(this.data.maps.gradientMap) : void 0;
    let shadow = 0;
    for (const light of ctx.lights) {
      if (light.type === "AmbientLight" || light.type === "HemisphereLight")
        continue;
      const constant = lightConstants(light);
      let l, distance, power = light.intensity, tint = null;
      if (light.type === "DirectionalLight") {
        l = constant.direction;
        distance = Infinity;
      } else {
        l = sub(light.position, s.position);
        distance = length(l);
        power /= Math.max(distance ** light.decay, 0.01);
        if (light.distance > 0)
          power *= Math.max(0, 1 - (distance / light.distance) ** 4) ** 2;
        if (light.type === "SpotLight") {
          const cosine = dot2(constant.direction, l) / distance;
          const outer = constant.outer, inner = constant.inner;
          const t = inner === outer ? Number(cosine >= outer) : clamp2((cosine - outer) / (inner - outer));
          power *= t * t * (3 - 2 * t);
          const projected = light.map && light.mapMatrix ? this.textures.get(light.map) : void 0;
          if (projected && power > 0) {
            const c = transform4(light.mapMatrix, s.position), x = c[0] / c[3], y = c[1] / c[3], z = c[2] / c[3];
            if (c[3] > 0 && x > 0 && x < 1 && y > 0 && y < 1 && z > 0 && z < 1)
              tint = sampleTexture(projected, [x, y]);
          }
        }
        if (light.type === "RectAreaLight") {
          const m = light.matrixWorld;
          power *= light.width * light.height / Math.max(distance * distance, 0.01) * Math.max(0, dot2(normalize2(l), [m[8], m[9], m[10]]));
        }
      }
      if (light.type !== "DirectionalLight")
        l = normalize2(l);
      let nl = Math.max(0, dot2(n, l));
      if (nl <= 0 && !toon || power <= 0)
        continue;
      const visibility = light.castShadow ? ctx.visibility(s.position, n, l, distance, toon && dot2(n, l) < 0.1) : 1;
      shadow = Math.max(shadow, 1 - visibility);
      power *= visibility;
      if (toon) {
        const coord2 = dot2(n, l) * 0.5 + 0.5;
        nl = gradient ? sampleTexture(gradient, [coord2, 0.5], false)[0] : coord2 >= 0.7 ? 1 : 0.7;
      }
      let diffuseBrdf = scale(color, (1 - metalness) / Math.PI), specularBrdf = [0, 0, 0];
      const h = normalize2(add(l, v)), nh = Math.max(0, dot2(n, h)), vh = Math.max(0, dot2(v, h));
      if (pbr && ctx.transport) {
        diffuseBrdf = mul(diffuseBrdf, fresnel(vh).map((x) => 1 - x));
      } else if (pbr) {
        const a = roughness * roughness, a2 = a * a, denominator = nh * nh * (a2 - 1) + 1;
        let distribution = a2 / (Math.PI * denominator * denominator);
        const anisotropy = p.anisotropy ? p.anisotropy * sampleMap("anisotropyMap", attributes)[2] : 0;
        if (anisotropy > 0) {
          const angle = p.anisotropyRotation;
          const tangent = add(scale(s.tangent, Math.cos(angle)), scale(s.bitangent, Math.sin(angle)));
          const bitangent = cross(n, tangent);
          const at = Math.max(a, 1e-3) + anisotropy * anisotropy * (1 - a), ab = Math.max(a, 1e-3);
          const d = (dot2(h, tangent) / at) ** 2 + (dot2(h, bitangent) / ab) ** 2 + nh * nh;
          distribution = 1 / (Math.PI * at * ab * d * d);
        }
        const visibilityTerm = 0.5 / (nl * Math.sqrt(nv * nv * (1 - a2) + a2) + nv * Math.sqrt(nl * nl * (1 - a2) + a2) + 1e-7);
        const f = fresnel(vh);
        diffuseBrdf = mul(diffuseBrdf, f.map((x) => 1 - x));
        specularBrdf = scale(f, distribution * visibilityTerm);
      } else if (type === "MeshPhongMaterial" && !ctx.transport) {
        const shininess = p.shininess;
        specularBrdf = scale(fresnel(vh), (shininess * 0.5 + 1) / Math.PI * nh ** shininess);
      }
      if (sheenPeak && !ctx.transport) {
        const direct = 1 - sheenPeak * Math.max(sheenView, sheenAlbedo(nl, sheenRoughness));
        diffuseBrdf = scale(diffuseBrdf, direct);
        specularBrdf = add(scale(specularBrdf, direct), scale(sheenColor, sheenLobe(sheenRoughness, nh, nv, nl)));
      }
      if (coat > 0) {
        const coatNl = Math.max(0, dot2(coatN, l)), coatNh = Math.max(0, dot2(coatN, h));
        const a2 = coatRoughness ** 4, d = coatNh * coatNh * (a2 - 1) + 1, f = 0.04 + 0.96 * (1 - vh) ** 5;
        diffuseBrdf = scale(diffuseBrdf, 1 - coat * f);
        if (!ctx.transport)
          specularBrdf = add(scale(specularBrdf, 1 - coat * f), scale([1, 1, 1], coat * f * a2 / (Math.PI * d * d * Math.max(4 * coatNv * coatNl, 1e-3)) * coatNl / nl));
      }
      const lightColor = tint ? mul(light.color, tint) : light.color;
      diffuse = add(diffuse, scale(mul(diffuseBrdf, lightColor), power * nl));
      if (!ctx.transport)
        specularOut = add(specularOut, scale(mul(specularBrdf, lightColor), power * nl));
    }
    if (type === "ShadowMaterial")
      return {
        color,
        alpha: shadow * p.opacity,
        depth: s.depth,
        transmission: 0,
        attenuation: [1, 1, 1],
        diffuse: color
      };
    const transmission = p.transmission ? clamp2(p.transmission * sampleMap("transmissionMap", attributes)[0]) * (1 - metalness) : 0;
    if (ctx.transport === "diffuse")
      return finish(add(scale(diffuse, 1 - transmission), emissive));
    if (legacyEnv) {
      indirectRaw = modulation = void 0;
      return finish(legacyEnv(add(diffuse, specularOut)));
    }
    if (!transmission)
      return finish(add(diffuse, specularOut), 0, ONES3, diffuse);
    const thickness = p.thickness * sampleMap("thicknessMap", attributes)[1];
    const attenuationDistance = p.attenuationDistance;
    const surfaceFresnel = fresnel(nv);
    const attenuation = p.attenuationColor.map((x, i) => color[i] * (1 - surfaceFresnel[i]) * (attenuationDistance === Infinity ? 1 : Math.exp(Math.log(Math.max(x, 1e-6)) * thickness / Math.max(attenuationDistance, 1e-6))));
    const lookup2 = (ior) => ctx.transmitted?.(add(s.position, scale(normalize2(refract(scale(v, -1), n, 1 / ior)), thickness)), roughness * clamp2(ior * 2 - 2));
    let transmitted = p.dispersion > 0 ? void 0 : lookup2(p.ior);
    if (p.dispersion > 0) {
      const halfSpread = (p.ior - 1) * 0.025 * p.dispersion;
      const channels = [p.ior - halfSpread, p.ior, p.ior + halfSpread].map(lookup2);
      if (channels.every(Boolean))
        transmitted = channels.map((rgb, i) => rgb[i]);
    }
    return finish(add(diffuse, specularOut), transmission, attenuation, diffuse, transmitted);
  }
};

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/color.js
function toneMap(rgb, exposure, mode) {
  let c = rgb.map((v) => Math.max(0, v * exposure));
  if (mode === "aces") {
    c = transform3([0.59719, 0.076, 0.0284, 0.35458, 0.90834, 0.13383, 0.04823, 0.01566, 0.83777], c.map((v) => v / 0.6));
    c = c.map((v) => (v * (v + 0.0245786) - 90537e-9) / (v * (0.983729 * v + 0.432951) + 0.238081));
    c = transform3([1.60475, -0.10208, -327e-5, -0.53108, 1.10813, -0.07276, -0.07367, -605e-5, 1.07602], c);
  } else if (mode === "agx") {
    c = transform3([0.6274, 0.0691, 0.0164, 0.3293, 0.9195, 0.088, 0.0433, 0.0113, 0.8956], c);
    c = transform3([
      0.856627153315983,
      0.137318972929847,
      0.11189821299995,
      0.0951212405381588,
      0.761241990602591,
      0.0767994186031903,
      0.0482516061458583,
      0.101439036467562,
      0.811302368396859
    ], c);
    c = c.map((v) => clamp2((Math.log2(Math.max(v, 1e-10)) + 12.47393) / 16.499999));
    c = c.map((x) => 15.5 * x ** 6 - 40.14 * x ** 5 + 31.96 * x ** 4 - 6.868 * x ** 3 + 0.4298 * x ** 2 + 0.1191 * x - 232e-5);
    c = transform3([
      1.1271005818144368,
      -0.1413297634984383,
      -0.14132976349843826,
      -0.11060664309660323,
      1.157823702216272,
      -0.11060664309660294,
      -0.016493938717834573,
      -0.016493938717834257,
      1.2519364065950405
    ], c).map((v) => Math.max(0, v) ** 2.2);
    c = transform3([1.6605, -0.1246, -0.0182, -0.5876, 1.1329, -0.1006, -0.0728, -83e-4, 1.1187], c);
  } else if (mode === "neutral") {
    const x = Math.min(...c), offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
    c = c.map((v) => v - offset);
    const peak = Math.max(...c);
    if (peak >= 0.76) {
      const newPeak = 1 - 0.24 * 0.24 / (peak + 0.24 - 0.76), g = 1 - 1 / (0.15 * (peak - newPeak) + 1);
      c = c.map((v) => v * newPeak / peak * (1 - g) + newPeak * g);
    }
  }
  return c.map((v) => clamp2(v));
}
function encodeColor(rgb, exposure, mode, mapped = true) {
  return (mapped ? toneMap(rgb, exposure, mode) : rgb).map((v) => Math.round(clamp2(linearToSrgb(v)) * 255));
}
function toneMap3(r, g, b, exposure, mode) {
  if (mode !== "aces")
    return toneMap([r, g, b], exposure, mode);
  r = Math.max(0, r * exposure) / 0.6;
  g = Math.max(0, g * exposure) / 0.6;
  b = Math.max(0, b * exposure) / 0.6;
  let x = 0.59719 * r + 0.35458 * g + 0.04823 * b;
  let y = 0.076 * r + 0.90834 * g + 0.01566 * b;
  let z = 0.0284 * r + 0.13383 * g + 0.83777 * b;
  x = (x * (x + 0.0245786) - 90537e-9) / (x * (0.983729 * x + 0.432951) + 0.238081);
  y = (y * (y + 0.0245786) - 90537e-9) / (y * (0.983729 * y + 0.432951) + 0.238081);
  z = (z * (z + 0.0245786) - 90537e-9) / (z * (0.983729 * z + 0.432951) + 0.238081);
  return [
    clamp2(1.60475 * x - 0.53108 * y - 0.07367 * z),
    clamp2(-0.10208 * x + 1.10813 * y - 605e-5 * z),
    clamp2(-327e-5 * x - 0.07276 * y + 1.07602 * z)
  ];
}

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/preparedGeometry.js
var VERTEX_HEADER = 11;
var CAST_SHADOW = 1;
var RECEIVE_SHADOW = 2;
var SHADOW_OPAQUE = 4;
var FLAT_NORMAL = 8;
var mismatch = () => new Error("CPU renderer: a varying changed type between vertices.");
function valueShape(value) {
  if (typeof value === "number")
    return 0;
  if (typeof value === "boolean")
    return 1;
  if (Array.isArray(value))
    return value.map(valueShape);
  if (value && typeof value === "object")
    return { keys: Object.entries(value).map(([key, child]) => [key, valueShape(child)]) };
  throw new Error("CPU renderer: varyings must be numeric.");
}
function shapeSize(shape) {
  if (shape === 0 || shape === 1)
    return 1;
  if (Array.isArray(shape))
    return shape.reduce((total, child) => total + shapeSize(child), 0);
  return shape.keys.reduce((total, [, child]) => total + shapeSize(child), 0);
}
function vertexLayout(attributes, varyings, points) {
  const attributeList = Object.entries(attributes).map(([name, attribute]) => [name, attribute.itemSize]);
  const varyingList = Object.entries(varyings).map(([name, value]) => [name, valueShape(value)]);
  if (points)
    varyingList.push(["gl_PointCoord", [0, 0]]);
  const stride = VERTEX_HEADER + attributeList.reduce((total, [, size2]) => total + size2, 0) + varyingList.reduce((total, [, shape]) => total + shapeSize(shape), 0);
  return { attributes: attributeList, varyings: varyingList, stride };
}
function writeValue(value, shape, out, offset) {
  if (shape === 0) {
    if (typeof value !== "number")
      throw mismatch();
    out[offset] = value;
    return offset + 1;
  }
  if (shape === 1) {
    if (typeof value !== "boolean")
      throw mismatch();
    out[offset] = value ? 1 : 0;
    return offset + 1;
  }
  if (Array.isArray(shape)) {
    if (!Array.isArray(value) || value.length !== shape.length)
      throw mismatch();
    for (let i = 0; i < shape.length; i++)
      offset = writeValue(value[i], shape[i], out, offset);
    return offset;
  }
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw mismatch();
  for (const [key, child] of shape.keys)
    offset = writeValue(value[key], child, out, offset);
  return offset;
}
function readValue(data, base, shape, cursor) {
  if (shape === 0)
    return data[base + cursor[0]++];
  if (shape === 1)
    return data[base + cursor[0]++] !== 0;
  if (Array.isArray(shape))
    return shape.map((child) => readValue(data, base, child, cursor));
  return Object.fromEntries(shape.keys.map(([key, child]) => [key, readValue(data, base, child, cursor)]));
}
function interpolateStored(data, a, b, c, shape, w0, w1, w2, cursor) {
  if (shape === 0) {
    const k = cursor[0]++;
    return data[a + k] * w0 + data[b + k] * w1 + data[c + k] * w2;
  }
  if (shape === 1)
    return data[a + cursor[0]++] !== 0;
  if (Array.isArray(shape))
    return shape.map((child) => interpolateStored(data, a, b, c, child, w0, w1, w2, cursor));
  return readValue(data, a, shape, cursor);
}
var GeometryWriter = class {
  vertices = new Float64Array(4096);
  groups = [];
  vertexLength = 0;
  triangleData = new Uint32Array(4096);
  flagData = new Uint8Array(1024);
  triangleCount = 0;
  /** Reserves a vertex and returns its offset; `vertices` may be replaced by a larger array. */
  allocateVertex(stride) {
    const next = this.vertexLength + stride;
    if (next > 4294967295)
      throw new Error("CPU renderer: scene geometry is too large.");
    if (next > this.vertices.length) {
      const grown = new Float64Array(Math.max(this.vertices.length * 2, next));
      grown.set(this.vertices.subarray(0, this.vertexLength));
      this.vertices = grown;
    }
    const offset = this.vertexLength;
    this.vertexLength = next;
    return offset;
  }
  addTriangle(group, a, b, c, flags) {
    const index = this.triangleCount;
    if ((index + 1) * 4 > this.triangleData.length) {
      const triangles = new Uint32Array(this.triangleData.length * 2);
      const grownFlags = new Uint8Array(this.flagData.length * 2);
      triangles.set(this.triangleData);
      grownFlags.set(this.flagData);
      this.triangleData = triangles;
      this.flagData = grownFlags;
    }
    const o = index * 4;
    this.triangleData[o] = group;
    this.triangleData[o + 1] = a;
    this.triangleData[o + 2] = b;
    this.triangleData[o + 3] = c;
    this.flagData[index] = flags;
    this.triangleCount++;
    return index;
  }
  finish(bins, includeNonCasters) {
    const count = this.triangleCount;
    const vertices = sharedCopy(sharedFloat64, this.vertices.subarray(0, this.vertexLength));
    const triangles = sharedCopy(sharedUint32, this.triangleData.subarray(0, count * 4));
    const flags = sharedCopy(sharedUint8, this.flagData.subarray(0, count));
    this.vertices = new Float64Array(0);
    this.triangleData = new Uint32Array(0);
    this.flagData = new Uint8Array(0);
    const positions = sharedFloat64(count * 9), faceNormals = sharedFloat64(count * 3);
    for (let t = 0; t < count; t++) {
      const corners = [1, 2, 3].map((k) => {
        const o = triangles[t * 4 + k] + 4;
        return [vertices[o], vertices[o + 1], vertices[o + 2]];
      });
      corners.forEach((corner, k) => positions.set(corner, t * 9 + k * 3));
      faceNormals.set(normalize2(cross(sub(corners[1], corners[0]), sub(corners[2], corners[0]))), t * 3);
    }
    const binOffsets = sharedUint32(bins.length + 1);
    let total = 0;
    bins.forEach((bin, index) => {
      binOffsets[index] = total;
      total += bin.length;
    });
    binOffsets[bins.length] = total;
    const binTriangles = sharedUint32(total);
    bins.forEach((bin, index) => {
      binTriangles.set(bin, binOffsets[index]);
      bin.length = 0;
    });
    const bvh = buildBvh(positions, count, (index) => includeNonCasters || (flags[index] & CAST_SHADOW) !== 0);
    return { groups: this.groups, vertices, triangles, flags, positions, faceNormals, binOffsets, binTriangles, bvh };
  }
};

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/rasterizer.js
var ZERO32 = [0, 0, 0];
var CACHE_ACCURACY = 0.35;
var CACHE_MIN_SPACING = 1.5;
var CACHE_MAX_SPACING = GRID_REACH;
var PREPASS_LEVELS = [4, 2, 1];
var PREPASS_BAND = 32;
var AO_SAMPLES = 12;
var SHADOW_SAMPLES = 8;
var TRANSMISSION_RAYS = 64;
var smoothstep2 = (a, b, x) => {
  if (b <= a)
    return x >= b ? 1 : 0;
  const t = clamp2((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
var hash = (x, y) => {
  const v = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return v - Math.floor(v);
};
function frame(n) {
  const t = normalize2(cross(Math.abs(n[1]) > 0.99 ? [1, 0, 0] : [0, 1, 0], n));
  return { t, b: cross(n, t) };
}
var shadowThreshold = (material) => Math.max(material.number("alphaTest", 0), 0.5);
function interpolate3(a, b, c, w0, w1, w2) {
  if (typeof a === "number")
    return a * w0 + Number(b) * w1 + Number(c) * w2;
  if (Array.isArray(a))
    return a.map((v, i) => interpolate3(v, b[i], c[i], w0, w1, w2));
  return a;
}
function passTriangle(triangle, material) {
  const [p0, p1, p2] = triangle.xy, [v0, v1, v2] = triangle.vertices;
  const invW0 = 1 / v0.clip[3], invW1 = 1 / v1.clip[3], invW2 = 1 / v2.clip[3];
  const depthTest = material.flag("depthTest", true);
  const z0 = v0.clip[2] * invW0 * 0.5 + 0.5, z1 = v1.clip[2] * invW1 * 0.5 + 0.5, z2 = v2.clip[2] * invW2 * 0.5 + 0.5;
  let polygonOffset = 0;
  if (material.flag("polygonOffset")) {
    const ax = p1[0] - p0[0], ay = p1[1] - p0[1], bx = p2[0] - p0[0], by = p2[1] - p0[1], det = ax * by - bx * ay;
    const slope = det ? Math.max(Math.abs(((z1 - z0) * by - (z2 - z0) * ay) / det), Math.abs(((z2 - z0) * ax - (z1 - z0) * bx) / det)) : 0;
    polygonOffset = material.number("polygonOffsetFactor", 0) * slope + material.number("polygonOffsetUnits", 0) / 16777216;
  }
  return {
    triangle,
    tl0: topLeft(p1, p2),
    tl1: topLeft(p2, p0),
    tl2: topLeft(p0, p1),
    translucent: material.flag("transparent") || material.number("transmission", 0) > 0,
    wireframe: material.flag("wireframe"),
    lineWidth: material.number("wireframeLinewidth", 1),
    depthTest,
    depthFunc: material.number("depthFunc", 3),
    depthWrite: material.flag("depthWrite", true),
    colorWrite: material.flag("colorWrite", true),
    polygonOffset,
    earlyZ: !material.fragment && depthTest,
    invW0,
    invW1,
    invW2,
    z0,
    z1,
    z2,
    invArea: 1 / triangle.area,
    len0: Math.hypot(p2[0] - p1[0], p2[1] - p1[1]),
    len1: Math.hypot(p0[0] - p2[0], p0[1] - p2[1]),
    len2: Math.hypot(p1[0] - p0[0], p1[1] - p0[1])
  };
}
function coversPixel(t, x, y, jitters) {
  const [p0, p1, p2] = t.triangle.xy;
  for (const [jx, jy] of jitters) {
    const px = x + jx, py = y + jy;
    const e0 = edge(p1, p2, px, py), e1 = edge(p2, p0, px, py), e2 = edge(p0, p1, px, py);
    if (e0 < 0 || e1 < 0 || e2 < 0 || e0 === 0 && !t.tl0 || e1 === 0 && !t.tl1 || e2 === 0 && !t.tl2)
      continue;
    if (t.wireframe && Math.min(e0 / t.len0, e1 / t.len1, e2 / t.len2) > t.lineWidth)
      continue;
    return true;
  }
  return false;
}
function createBuckets(width, height, size2) {
  const buckets = [];
  for (let y = 0; y < height; y += size2)
    for (let x = 0; x < width; x += size2)
      buckets.push({
        x,
        y,
        width: Math.min(size2, width - x),
        height: Math.min(size2, height - y),
        index: buckets.length
      });
  return buckets.sort((a, b) => (a.x + a.width / 2 - width / 2) ** 2 + (a.y + a.height / 2 - height / 2) ** 2 - ((b.x + b.width / 2 - width / 2) ** 2 + (b.y + b.height / 2 - height / 2) ** 2));
}
function interpolateValue(a, b, t) {
  if (typeof a === "number" && typeof b === "number")
    return a + (b - a) * t;
  if (Array.isArray(a) && Array.isArray(b))
    return a.map((v, i) => interpolateValue(v, b[i], t));
  return a;
}
function interpolateVertex(a, b, t) {
  const lerp2 = (x, y) => x.map((v, i) => v + (y[i] - v) * t);
  return {
    clip: lerp2(a.clip, b.clip),
    world: lerp2(a.world, b.world),
    normal: lerp2(a.normal, b.normal),
    attributes: Object.fromEntries(Object.entries(a.attributes).map(([k, v]) => [k, lerp2(v, b.attributes[k])])),
    varyings: Object.fromEntries(Object.entries(a.varyings).map(([k, v]) => [k, interpolateValue(v, b.varyings[k], t)]))
  };
}
function clipPolygon(vertices, planes = [0, 1, 2, 3, 4, 5]) {
  let polygon = vertices;
  const distance = (v, p) => v.clip[3] + v.clip[Math.floor(p / 2)] * (p % 2 === 0 ? 1 : -1);
  for (const plane of planes) {
    const output = [];
    for (let i = 0; i < polygon.length; i++) {
      const a = polygon[i], b = polygon[(i + 1) % polygon.length], da = distance(a, plane), db = distance(b, plane);
      if (da >= 0)
        output.push(a);
      if (da >= 0 !== db >= 0)
        output.push(interpolateVertex(a, b, da / (da - db)));
    }
    polygon = output;
    if (!polygon.length)
      break;
  }
  return polygon;
}
var edge = (a, b, x, y) => (b[0] - a[0]) * (y - a[1]) - (b[1] - a[1]) * (x - a[0]);
var topLeft = (a, b) => b[1] < a[1] || b[1] === a[1] && b[0] > a[0];
function depthPass(func, incoming, stored) {
  switch (func) {
    case 0:
      return false;
    case 1:
      return true;
    case 2:
      return incoming < stored;
    case 3:
      return incoming <= stored;
    case 4:
      return incoming === stored;
    case 5:
      return incoming >= stored;
    case 6:
      return incoming > stored;
    case 7:
      return incoming !== stored;
    default:
      return incoming <= stored;
  }
}
var CpuRasterizer = class _CpuRasterizer {
  scene;
  camera;
  settings;
  width;
  height;
  environment;
  target;
  adopted;
  buckets;
  groups = [];
  geometry = null;
  bvh = null;
  gi = null;
  // Indirect light records of the bucket in progress; null when the cache is disabled.
  giCache = null;
  // The bucket's grid is already computed (in this call or in an earlier prepass): do not place it again.
  cachePlaced = false;
  // Full-image record grid, built by the cache prepass; null when there is no separate prepass.
  giGrid = null;
  // Pixel of the fragment being shaded, to look up the right grid window.
  fragmentX = 0;
  fragmentY = 0;
  // Variance of the last indirect light lookup, read right after shading the fragment.
  lastVariance = 0;
  // Full-image buffers for the denoiser, when this frame requested it.
  aov = null;
  // Direction of the ray in flight: the soft shadow and occlusion loops overwrite the three values on
  // each sample instead of allocating a vector per ray. `trace` reads the components on entry and does
  // not keep the reference, so reusing the same buffer is safe.
  rayDirection = [0, 0, 0];
  // Tangent frame of the last requested triangle: neighboring fragments usually belong to the same one.
  tangentSource = -1;
  tangent = ZERO32;
  bitangentSign = 1;
  // Vertices read from the geometry during a bucket, keyed by offset: reused by neighboring triangles and lens passes.
  vertexCache = null;
  // Flat-shaded triangles replace the normal of all three vertices, so they are cached per triangle.
  flatCache = null;
  projection;
  inverseProjection;
  volumetric;
  view;
  cameraPosition;
  cameraWorld;
  cameraHandedness;
  lensRadius;
  backgroundColor;
  /** The render settings' fog covers everything; otherwise `scene.fog` applies to the materials that accept it. */
  fog;
  globals;
  /**
   * `adopted` is the geometry another worker already prepared for the same scene, camera, settings and resolution:
   * with it, `prepare` only compiles the materials and reads the shared arrays.
   */
  constructor(scene, camera, settings, width, height, environment, target = {}, adopted) {
    this.scene = scene;
    this.camera = camera;
    this.settings = settings;
    this.width = width;
    this.height = height;
    this.environment = environment;
    this.target = target;
    this.adopted = adopted;
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width * height > 32e6)
      throw new Error("CPU renderer: invalid resolution (maximum 32 megapixels).");
    if (!Number.isInteger(settings.tileSize) || settings.tileSize < 8 || settings.tileSize > 256 || !Number.isInteger(settings.maxSamples) || settings.maxSamples < 1 || settings.maxSamples > 256)
      throw new Error("CPU renderer: invalid sampling or bucket settings.");
    if (settings.globalIllumination && (!Number.isInteger(settings.giSamples ?? 64) || (settings.giSamples ?? 64) < 1 || (settings.giSamples ?? 64) > 1024 || !Number.isInteger(settings.giBounces ?? 3) || (settings.giBounces ?? 3) < 1 || (settings.giBounces ?? 3) > 8 || !Number.isFinite(settings.giIntensity ?? 1) || (settings.giIntensity ?? 1) < 0 || (settings.giIntensity ?? 1) > 4 || !Number.isFinite(settings.giClamp ?? 0) || (settings.giClamp ?? 0) < 0 || (settings.giClamp ?? 0) > 100 || !Number.isInteger(settings.giCacheSpacing ?? 4) || (settings.giCacheSpacing ?? 4) < 1 || (settings.giCacheSpacing ?? 4) > 16))
      throw new Error("CPU renderer: invalid global illumination settings.");
    const projection = cameraProjection(camera, target.aspect ?? width / height);
    this.projection = projection.toArray();
    this.inverseProjection = projection.clone().invert().toArray();
    this.volumetric = new CpuVolumetricLight(scene.lights);
    this.cameraWorld = camera.matrixWorld;
    this.cameraHandedness = Math.sign(new Matrix4().fromArray(this.cameraWorld).determinant());
    this.view = new Matrix4().fromArray(camera.matrixWorld).invert().toArray();
    this.cameraPosition = camera.matrixWorld.slice(12, 15);
    this.buckets = createBuckets(width, height, settings.tileSize);
    const focalLength = 0.035 / (2 * Math.tan((camera.fov ?? 50) * Math.PI / 360));
    this.lensRadius = settings.dofEnabled && !this.orthographic ? focalLength / (2 * settings.dofAperture) : 0;
    this.backgroundColor = new Color(settings.backgroundColor).toArray();
    this.fog = settings.fogEnabled ? {
      color: new Color(settings.fogColor ?? "#ffffff").toArray(),
      near: settings.fogNear ?? 0,
      far: settings.fogFar ?? 1,
      everything: true
    } : scene.fog ? { ...scene.fog, everything: false } : null;
    this.globals = {
      projectionMatrix: matrixValue(this.projection),
      viewMatrix: matrixValue(this.view),
      cameraPosition: this.cameraPosition,
      isOrthographic: this.orthographic,
      cameraNear: camera.near,
      cameraFar: camera.far,
      directionalLights: scene.lights.filter((l) => l.type === "DirectionalLight").map((l) => ({
        color: scale(l.color, l.intensity),
        direction: normalize2(transform4(this.view, [...normalize2(sub(l.position, l.target)), 0]).slice(0, 3))
      })),
      pointLights: scene.lights.filter((l) => l.type === "PointLight").map((l) => ({
        color: scale(l.color, l.intensity),
        position: transform4(this.view, l.position).slice(0, 3),
        distance: l.distance,
        decay: l.decay
      })),
      spotLights: scene.lights.filter((l) => l.type === "SpotLight").map((l) => ({
        color: scale(l.color, l.intensity),
        position: transform4(this.view, l.position).slice(0, 3),
        distance: l.distance,
        decay: l.decay,
        direction: normalize2(transform4(this.view, [...normalize2(sub(l.position, l.target)), 0]).slice(0, 3)),
        coneCos: Math.cos(l.angle),
        penumbraCos: Math.cos(l.angle * (1 - l.penumbra))
      }))
    };
  }
  /** Attaches the denoiser buffers; each finished bucket writes its own region into them. */
  attachAov(aov) {
    if (aov.width !== this.width || aov.height !== this.height)
      throw new Error("CPU renderer: denoise buffers do not match the frame.");
    this.aov = aov;
  }
  get frameAov() {
    return this.aov;
  }
  /** Whether this frame runs an irradiance cache prepass before shading. */
  get usesCache() {
    return Boolean(this.gi && this.settings.giCache);
  }
  /**
   * Distance, in pixels, over which neighboring pixels share the noise of their indirect light: the reach of a
   * cache record. Zero without the cache, where every pixel has its own estimate. The denoiser needs it.
   */
  get noiseCorrelation() {
    return this.usesCache ? (this.settings.giCacheSpacing ?? 4) * CACHE_MAX_SPACING * LOOKUP_SMOOTHING : 0;
  }
  /** Attaches the full-image record grid that the cache prepass fills and shading looks up. */
  attachIrradianceGrid(buffers) {
    if (buffers.width !== this.width || buffers.height !== this.height)
      throw new Error("CPU renderer: irradiance grid does not match the frame.");
    this.giGrid = new IrradianceGrid(buffers);
  }
  get irradianceGrid() {
    return this.giGrid;
  }
  /** Cache prepass jobs, per level: the client and the worker compute the same list. */
  static prepassJobs(_width, height, spacing) {
    return PREPASS_LEVELS.map((level) => {
      const step = level * spacing, gridRows = Math.ceil(height / step), perJob = Math.max(1, Math.floor(PREPASS_BAND / step));
      const jobs = [];
      for (let row = 0; row < gridRows; row += perJob) {
        const rows = Math.min(perJob, gridRows - row), y = row * step;
        jobs.push({ level, row, rows, y, height: Math.min(height - y, rows * step) });
      }
      return jobs;
    });
  }
  prepassJob(index) {
    const job = _CpuRasterizer.prepassJobs(this.width, this.height, this.settings.giCacheSpacing ?? 4).flat()[index];
    if (!job)
      throw new Error("CPU renderer: unknown irradiance cache job.");
    return job;
  }
  /**
   * Opaque surface visible at a pixel center, via a camera ray: the first one that passes the same rules as
   * record placement (opaque, depth tested, writes color, queries indirect light, correct side, alpha).
   */
  primarySurface(px, py) {
    if (!this.bvh)
      return null;
    const { direction: direction2, origin: rayOrigin } = this.viewRay(px, py);
    let origin = rayOrigin, ignore = -1;
    for (let layer = 0; layer < 64; layer++) {
      const hit = this.bvh.intersect(origin, direction2, Infinity, ignore);
      if (!hit)
        return null;
      const material = this.group(hit.index).material, surface = this.raySurface(hit, direction2);
      const side = material.number("side", 0);
      const eligible = !material.flag("transparent") && material.number("transmission", 0) <= 0 && material.flag("depthTest", true) && material.flag("colorWrite", true) && material.diffuseGi && (side === 2 || (side === 1 ? !surface.frontFacing : surface.frontFacing));
      if (eligible) {
        const alphaTest = material.number("alphaTest", 0);
        let alpha = alphaTest > 0 ? material.alpha(surface.attributes, material.uvGradients(surface)) : 1;
        if (alphaTest > 0 && material.flag("vertexColors") && surface.attributes.color)
          alpha *= surface.attributes.color[3] ?? 1;
        if (alpha >= alphaTest)
          return { source: hit.index, surface };
      }
      origin = this.rayOrigin(surface.position, direction2);
      ignore = hit.index;
    }
    return null;
  }
  /**
   * Opaque scene the camera sees through a world-space point: what Three reads from its transmission framebuffer
   * at the refracted exit. Translucent surfaces are skipped, as they are absent from that pass; `blur` spreads the
   * ray over the footprint of the mip level Three would sample for that roughness.
   */
  transmittedLight(exit, blur, seed, shade) {
    const clip = transform4(this.projection, transform4(this.view, exit));
    if (!this.bvh || clip[3] <= 1e-10)
      return void 0;
    const spread = blur > 0 ? 0.65 * this.width ** blur : 0;
    const cx = (clip[0] / clip[3] * 0.5 + 0.5) * this.width, cy = (0.5 - clip[1] / clip[3] * 0.5) * this.height;
    const rays = spread > 1 ? Math.min(TRANSMISSION_RAYS, Math.ceil(spread * spread)) : 1, sum = [0, 0, 0];
    for (let i = 0; i < rays; i++) {
      const u = (halton(i + 1, 2) + seed) % 1, v = (halton(i + 1, 3) + seed * 0.618034) % 1;
      const radius = spread * Math.sqrt(-2 * Math.log(1 - u * 0.999)), angle = 2 * Math.PI * v;
      const light = this.cameraRay(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle), shade);
      sum[0] += light[0];
      sum[1] += light[1];
      sum[2] += light[2];
    }
    return scale(sum, 1 / rays);
  }
  /** Opaque scene along the camera ray through image position `px`, `py`, skipping translucent surfaces. */
  cameraRay(px, py, shade) {
    const { direction: direction2, origin: rayOrigin } = this.viewRay(px, py);
    const clipPlane = this.target.clipPlane;
    let origin = rayOrigin, ignore = -1;
    for (let layer = 0; layer < 64; layer++) {
      const hit = this.bvh.intersect(origin, direction2, Infinity, ignore);
      if (!hit)
        break;
      const material = this.group(hit.index).material, surface = this.raySurface(hit, direction2);
      const side = material.number("side", 0);
      const eligible = !material.flag("transparent") && material.number("transmission", 0) <= 0 && material.flag("colorWrite", true) && (side === 2 || (side === 1 ? !surface.frontFacing : surface.frontFacing)) && !(clipPlane && dot2(clipPlane, surface.position) + clipPlane[3] < 0);
      const fragment = eligible ? shade(hit.index, surface, px, py) : null;
      if (fragment) {
        this.applyFog(fragment, surface.position, material);
        return fragment.color;
      }
      origin = this.rayOrigin(surface.position, direction2);
      ignore = hit.index;
    }
    return this.background(px, py).slice(0, 3);
  }
  /** How much of the fog color replaces what lies at `position`: Three's Fog or FogExp2 over view depth. */
  fogAmount(position) {
    const fog = this.fog, depth = this.viewDepth(position);
    return fog.density !== void 0 ? 1 - Math.exp(-((fog.density * depth) ** 2)) : smoothstep2(fog.near, fog.far, depth);
  }
  /** Like Three's Fog and FogExp2: over view depth, in linear light, leaving the background untouched. */
  applyFog(fragment, position, material) {
    const fog = this.fog;
    if (!fog || !(fog.everything || material.flag("fog", true)))
      return;
    const amount = this.fogAmount(position);
    if (amount <= 0)
      return;
    fragment.color = mix(fragment.color, fog.color, amount);
    fragment.diffuse = mix(fragment.diffuse, fog.color, amount);
    if (fragment.modulation)
      fragment.modulation = scale(fragment.modulation, 1 - amount);
  }
  /**
   * One cache prepass job: walks the level's grid points in the band, finds the surface by ray tracing,
   * skips points the grid already covers and computes the rest, writing into the shared grid. Each record becomes
   * a gray dot in the preview (`progress` receives the band buffer and the pixel index within it).
   * Returns the written cells.
   */
  *cachePrepass(index, progress) {
    const grid = this.giGrid, written = [];
    if (!grid || !this.gi)
      return written;
    const job = this.prepassJob(index), spacing = grid.buffers.spacing, step = job.level * spacing;
    const columns = Math.ceil(this.width / step), coarsest = job.level === PREPASS_LEVELS[0];
    const pixels = progress ? new Uint8ClampedArray(this.width * job.height * 4) : null;
    const dot3 = Math.max(1, Math.min(2, spacing)), preview = new Float32Array(4);
    const vignette = clamp2(this.settings.vignette ?? 0), grain = clamp2(this.settings.grain ?? 0);
    let lastYield = performance.now();
    for (let gy = job.row; gy < job.row + job.rows; gy++)
      for (let gx = 0; gx < columns; gx++) {
        if (!coarsest && gx % 2 === 0 && gy % 2 === 0)
          continue;
        const x = gx * step, y = gy * step;
        if (x >= this.width || y >= this.height)
          continue;
        const cx = gx * job.level, cy = gy * job.level;
        if (grid.has(cx, cy))
          continue;
        const px = x + 0.5, py = y + 0.5, primary = this.primarySurface(px, py);
        if (!primary)
          continue;
        const normal = normalize2(primary.surface.normal);
        if (grid.lookupAt(px, py, primary.surface.position, normal, PLACEMENT_COVERAGE))
          continue;
        const estimate = this.gi.estimate(primary.source, primary.surface.position, normal, hash(px, py));
        const footprint = this.pixelFootprint(this.viewDepth(primary.surface.position)) * spacing;
        const radius = clamp2(estimate.radius * CACHE_ACCURACY, footprint * CACHE_MIN_SPACING, footprint * CACHE_MAX_SPACING);
        written.push(grid.write(cx, cy, {
          position: primary.surface.position,
          normal,
          color: estimate.color,
          variance: estimate.variance,
          radius
        }));
        if (pixels && progress) {
          const l = 0.25 + 0.75 * Math.min(1, estimate.color[0] * 0.2126 + estimate.color[1] * 0.7152 + estimate.color[2] * 0.0722);
          preview[0] = l;
          preview[1] = l;
          preview[2] = l;
          preview[3] = 1;
          for (let dy = 0; dy < dot3; dy++)
            for (let dx = 0; dx < dot3; dx++) {
              const sx = x + dx, sy = y - job.y + dy;
              if (sx >= this.width || sy >= job.height)
                continue;
              const i = sy * this.width + sx;
              this.resolveSample(sx + 0.5, y + dy + 0.5, preview, 0, 1, pixels, i * 4, vignette, grain);
              progress(pixels, i);
            }
        }
        if (performance.now() - lastYield > 8) {
          yield;
          lastYield = performance.now();
        }
      }
    return written;
  }
  /** Prepared geometry, for the other workers to adopt. */
  get preparedGeometry() {
    if (!this.geometry)
      throw new Error("CPU renderer: geometry is not prepared yet.");
    return this.geometry;
  }
  /** Incremental preparation lets the worker process cancellation during large scene exports. */
  *prepare() {
    const textures = new Map(this.scene.textures.map((t) => [t.id, t]));
    const materials = /* @__PURE__ */ new Map();
    const meshes = /* @__PURE__ */ new Map();
    const meshContext = (index) => {
      let context = meshes.get(index);
      if (!context) {
        const mesh = this.scene.meshes[index];
        const model = new Matrix4().fromArray(mesh.matrixWorld);
        const modelView = new Matrix4().fromArray(this.view).multiply(model);
        const viewNormal = new Matrix3().getNormalMatrix(modelView).toArray();
        context = {
          winding: Math.sign(model.determinant() * new Matrix4().fromArray(this.cameraWorld).determinant()),
          worldNormal: new Matrix3().getNormalMatrix(model).toArray(),
          uniforms: {
            ...this.globals,
            modelMatrix: matrixValue(mesh.matrixWorld),
            modelViewMatrix: matrixValue(modelView.toArray()),
            normalMatrix: matrixValue(viewNormal)
          }
        };
        meshes.set(index, context);
      }
      return context;
    };
    const materialFor = (data) => {
      let material = materials.get(data);
      if (!material) {
        material = new CpuMaterial(data.shader ? { ...data, shader: { ...data.shader, defines: {
          ...data.shader.defines,
          NUM_DIR_LIGHTS: this.globals.directionalLights.length,
          NUM_POINT_LIGHTS: this.globals.pointLights.length,
          NUM_SPOT_LIGHTS: this.globals.spotLights.length
        } } } : data, textures);
        materials.set(data, material);
      }
      return material;
    };
    if (this.adopted) {
      for (const prepared of this.adopted.groups) {
        const mesh = this.scene.meshes[prepared.mesh];
        const data = mesh?.materials[mesh.groups[prepared.group]?.materialIndex];
        if (!data)
          throw new Error("CPU renderer: prepared geometry does not match the scene.");
        const context = meshContext(prepared.mesh);
        this.groups.push({
          material: materialFor(data),
          uniforms: context.uniforms,
          renderOrder: mesh.renderOrder,
          winding: mesh.primitive ? 1 : context.winding,
          layout: prepared.layout
        });
        yield;
      }
      this.useGeometry(this.adopted);
      return;
    }
    const writer = new GeometryWriter();
    const bins = Array.from({ length: this.buckets.length }, () => []);
    for (let meshIndex = 0; meshIndex < this.scene.meshes.length; meshIndex++) {
      const mesh = this.scene.meshes[meshIndex], context = meshContext(meshIndex), uniforms = context.uniforms;
      const points = mesh.primitive === "points";
      const lines = mesh.primitive === "line" || mesh.primitive === "lineSegments" || mesh.primitive === "lineLoop";
      for (let groupIndex = 0; groupIndex < mesh.groups.length; groupIndex++) {
        const group = mesh.groups[groupIndex];
        const data = mesh.materials[group.materialIndex];
        if (!data)
          throw new Error("CPU renderer: invalid geometry material group.");
        const material = materialFor(data);
        if (!material.flag("visible", true))
          continue;
        let layout = null, runtimeIndex = -1;
        const vertexCache = /* @__PURE__ */ new Map();
        const vertex = (index) => {
          const cached = vertexCache.get(index);
          if (cached !== void 0)
            return cached;
          const attributes = {};
          for (const [name, attribute] of Object.entries(mesh.attributes))
            attributes[name] = Array.from(attribute.data.subarray(index * attribute.itemSize, (index + 1) * attribute.itemSize));
          let position = attributes.position, normal = attributes.normal ?? [0, 0, 1];
          if (position.length !== 3)
            throw new Error("CPU renderer: invalid position attribute.");
          if (material.data.maps.displacementMap)
            position = add(position, scale(normal, material.map("displacementMap", attributes)[0] * material.number("displacementScale", 1) + material.number("displacementBias", 0)));
          let clip;
          let pointSize = 1;
          const varyings = {};
          if (material.vertex) {
            const result = material.vertex.run({
              ...uniforms,
              ...material.uniforms,
              ...Object.fromEntries(Object.entries(attributes).map(([name, value]) => [name, value.length === 1 ? value[0] : value])),
              uPointScale: this.height / (2 * Math.tan((this.camera.fov ?? 50) * Math.PI / 360)),
              gl_PointSize: 1,
              position,
              normal,
              transformed: position,
              objectNormal: normal,
              cpuPosition: position,
              cpuNormal: normal,
              gl_Position: [NaN, NaN, NaN, NaN],
              gl_VertexID: index
            }, { texture: material.texture });
            if (!result)
              throw new Error(`${data.name}: discard is invalid in a vertex shader.`);
            if (material.data.shader?.patched) {
              position = result.cpuPosition;
              normal = result.cpuNormal;
              if (result.gl_Position.every(Number.isFinite))
                clip = result.gl_Position;
            } else
              clip = result.gl_Position;
            pointSize = Number(result.gl_PointSize ?? 1);
            for (const name of material.vertex.varyings)
              if (result[name] !== void 0)
                varyings[name] = result[name];
          }
          let world = transform4(mesh.matrixWorld, position).slice(0, 3);
          if (mesh.primitive === "sprite" && !material.vertex) {
            const center = transform4(this.view, mesh.matrixWorld.slice(12, 15));
            const attenuation = !this.orthographic && !material.flag("sizeAttenuation", true) ? -center[2] : 1;
            const sx = Math.hypot(...mesh.matrixWorld.slice(0, 3)) * attenuation;
            const sy = Math.hypot(...mesh.matrixWorld.slice(4, 7)) * attenuation;
            const x = (position[0] - ((mesh.center?.[0] ?? 0.5) - 0.5)) * sx;
            const y = (position[1] - ((mesh.center?.[1] ?? 0.5) - 0.5)) * sy;
            const angle = material.number("rotation", 0), c = Math.cos(angle), s = Math.sin(angle);
            center[0] += x * c - y * s;
            center[1] += x * s + y * c;
            clip = transform4(this.projection, center);
          }
          if (points && !material.vertex) {
            pointSize = material.number("size", 1);
            if (!this.orthographic && material.flag("sizeAttenuation", true))
              pointSize *= this.height / (2 * -transform4(this.view, world)[2]);
          }
          if (clip) {
            const viewPosition = transform4(this.inverseProjection, clip);
            world = transform4(this.cameraWorld, viewPosition.map((v) => v / viewPosition[3])).slice(0, 3);
          }
          clip ??= transform4(this.projection, transform4(this.view, world));
          if (!clip.every(Number.isFinite))
            throw new Error(`${data.name}: vertex shader produced an invalid gl_Position.`);
          layout ??= vertexLayout(mesh.attributes, varyings, points);
          const offset = writer.allocateVertex(layout.stride), out = writer.vertices;
          out.set(clip.slice(0, 4), offset);
          out.set(world, offset + 4);
          out.set(normalize2(transform3(context.worldNormal, normal)), offset + 7);
          out[offset + 10] = pointSize;
          let cursor = offset + VERTEX_HEADER;
          for (const [name, itemSize] of layout.attributes) {
            out.set(attributes[name], cursor);
            cursor += itemSize;
          }
          const varyingCount = layout.varyings.length - (points ? 1 : 0);
          for (let i = 0; i < varyingCount; i++)
            cursor = writeValue(varyings[layout.varyings[i][0]], layout.varyings[i][1], out, cursor);
          vertexCache.set(index, offset);
          return offset;
        };
        const groupId = () => {
          if (runtimeIndex < 0) {
            runtimeIndex = this.groups.length;
            writer.groups.push({ mesh: meshIndex, group: groupIndex, layout });
            this.groups.push({
              material,
              uniforms,
              renderOrder: mesh.renderOrder,
              winding: mesh.primitive ? 1 : context.winding,
              layout
            });
          }
          return runtimeIndex;
        };
        const shadowOpaque = !material.data.maps.map && !material.data.maps.alphaMap && !material.flag("vertexColors") && material.number("opacity", 1) >= shadowThreshold(material);
        const flags = (!mesh.primitive && mesh.castShadow ? CAST_SHADOW : 0) | (mesh.receiveShadow ? RECEIVE_SHADOW : 0) | (shadowOpaque ? SHADOW_OPAQUE : 0) | (!mesh.primitive && (!mesh.attributes.normal || material.flag("flatShading")) ? FLAT_NORMAL : 0);
        const end = group.start + group.count;
        const step = points || lines && mesh.primitive !== "lineSegments" ? 1 : lines ? 2 : 3;
        for (let offset = group.start; offset + (points || mesh.primitive === "lineLoop" ? 0 : lines ? 1 : 2) < end; offset += step) {
          if (points && offset % 128 === 0)
            yield;
          const faces = [];
          if (lines) {
            if (group.count < 2)
              continue;
            const next = offset + 1 < end ? offset + 1 : group.start;
            let a = vertex(mesh.index ? mesh.index[offset] : offset);
            let b = vertex(mesh.index ? mesh.index[next] : next);
            let rejected = false;
            for (const sign of [1, -1]) {
              const stored2 = writer.vertices;
              const da = stored2[a + 3] + sign * stored2[a + 2], db = stored2[b + 3] + sign * stored2[b + 2];
              if (da < 0 && db < 0) {
                rejected = true;
                break;
              }
              if (da < 0 || db < 0) {
                const t = da / (da - db), clipped = writer.allocateVertex(layout.stride), out = writer.vertices;
                for (let c = 0; c < layout.stride; c++)
                  out[clipped + c] = out[a + c] * (1 - t) + out[b + c] * t;
                if (da < 0)
                  a = clipped;
                else
                  b = clipped;
              }
            }
            if (rejected)
              continue;
            const stored = writer.vertices, aw = stored[a + 3], bw = stored[b + 3];
            if (aw <= 0 || bw <= 0)
              continue;
            const dx = (stored[b] / bw - stored[a] / aw) * this.width;
            const dy = (stored[b + 1] / bw - stored[a + 1] / aw) * this.height;
            const length2 = Math.hypot(dx, dy), width = material.number("linewidth", 1);
            if (length2 === 0 || width <= 0)
              continue;
            const corners = [[a, -1], [b, -1], [b, 1], [a, 1]].map(([source, sign]) => {
              const corner = writer.allocateVertex(layout.stride), out = writer.vertices;
              out.copyWithin(corner, source, source + layout.stride);
              out[corner] += -dy / length2 * width / this.width * out[source + 3] * sign;
              out[corner + 1] += dx / length2 * width / this.height * out[source + 3] * sign;
              const vp = transform4(this.inverseProjection, Array.from(out.subarray(corner, corner + 4)));
              out.set(transform4(this.cameraWorld, vp.map((v) => v / vp[3])).slice(0, 3), corner + 4);
              return corner;
            });
            faces.push([corners[0], corners[1], corners[2]], [corners[0], corners[2], corners[3]]);
          } else if (points) {
            const center = vertex(mesh.index ? mesh.index[offset] : offset), stored = writer.vertices;
            const size2 = stored[center + 10], w = stored[center + 3], cx = stored[center], cy = stored[center + 1];
            if (size2 <= 0 || w <= 0)
              continue;
            if (!Number.isFinite(size2))
              throw new Error(`${data.name}: invalid gl_PointSize.`);
            const stride = layout.stride;
            const corners = [[0, 0], [1, 0], [1, 1], [0, 1]].map(([u, v]) => {
              const corner = writer.allocateVertex(stride), out = writer.vertices;
              out.copyWithin(corner, center, center + stride);
              out[corner] = cx + (u * 2 - 1) * size2 / this.width * w;
              out[corner + 1] = cy + (v * 2 - 1) * size2 / this.height * w;
              const vp = transform4(this.inverseProjection, Array.from(out.subarray(corner, corner + 4)));
              out.set(transform4(this.cameraWorld, vp.map((v2) => v2 / vp[3])).slice(0, 3), corner + 4);
              out[corner + stride - 2] = u;
              out[corner + stride - 1] = 1 - v;
              return corner;
            });
            faces.push([corners[0], corners[1], corners[2]], [corners[0], corners[2], corners[3]]);
          } else
            faces.push([0, 1, 2].map((i) => vertex(mesh.index ? mesh.index[offset + i] : offset + i)));
          for (const face of faces) {
            const source = writer.addTriangle(groupId(), face[0], face[1], face[2], flags);
            const stored = writer.vertices;
            const clipped = clipPolygon(face.map((o) => ({
              clip: [stored[o], stored[o + 1], stored[o + 2], stored[o + 3]],
              world: [],
              normal: [],
              attributes: {},
              varyings: {}
            })), [4, 5]);
            if (clipped.length) {
              let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
              for (const v of clipped) {
                const w = v.clip[3];
                if (w <= 1e-10)
                  continue;
                const x = (v.clip[0] / w * 0.5 + 0.5) * this.width, y = (0.5 - v.clip[1] / w * 0.5) * this.height;
                const blur = Math.abs(this.lensRadius * this.projection[5] * (1 / this.settings.dofFocusDistance - 1 / w) * this.height / 2) + 1;
                minX = Math.min(minX, x - blur);
                maxX = Math.max(maxX, x + blur);
                minY = Math.min(minY, y - blur);
                maxY = Math.max(maxY, y + blur);
              }
              const columns = Math.ceil(this.width / this.settings.tileSize), tile = this.settings.tileSize;
              for (let row = Math.max(0, Math.floor(minY / tile)); row <= Math.min(Math.ceil(this.height / tile) - 1, Math.floor(maxY / tile)); row++)
                for (let col = Math.max(0, Math.floor(minX / tile)); col <= Math.min(columns - 1, Math.floor(maxX / tile)); col++)
                  bins[row * columns + col].push(source);
            }
            if (source % 128 === 0)
              yield;
          }
        }
      }
      yield;
    }
    this.useGeometry(writer.finish(bins, Boolean(this.settings.globalIllumination) || this.groups.some((group) => group.material.number("transmission", 0) > 0)));
  }
  useGeometry(geometry) {
    this.geometry = geometry;
    this.bvh = new ShadowBvh({ data: geometry.bvh, positions: geometry.positions, castShadow: geometry.flags });
    if (this.settings.globalIllumination)
      this.gi = new DiffuseGi({
        triangles: {
          count: geometry.flags.length,
          positions: geometry.positions,
          faceNormals: geometry.faceNormals,
          material: (index) => this.group(index).material
        },
        settings: this.settings,
        lights: this.scene.lights,
        environment: this.environment,
        intersect: (p, d, distance, ignore) => this.bvh.intersect(p, d, distance, ignore),
        surface: (hit, d) => this.raySurface(hit, d),
        origin: (p, n) => this.rayOrigin(p, n)
      });
  }
  group(source) {
    return this.groups[this.geometry.triangles[source * 4]];
  }
  hasFlag(source, flag) {
    return (this.geometry.flags[source] & flag) !== 0;
  }
  /** A vertex read from the prepared geometry; `normal` replaces the stored one when the face is flat-shaded. */
  storedVertex(offset, layout, normal) {
    const data = this.geometry.vertices, attributes = {};
    let cursor = offset + VERTEX_HEADER;
    for (const [name, size2] of layout.attributes) {
      const values = new Array(size2);
      for (let i = 0; i < size2; i++)
        values[i] = data[cursor + i];
      attributes[name] = values;
      cursor += size2;
    }
    const varyings = {}, position = [cursor - offset];
    for (const [name, shape] of layout.varyings)
      varyings[name] = readValue(data, offset, shape, position);
    return {
      clip: [data[offset], data[offset + 1], data[offset + 2], data[offset + 3]],
      pointSize: data[offset + 10],
      world: [data[offset + 4], data[offset + 5], data[offset + 6]],
      normal: normal ?? [data[offset + 7], data[offset + 8], data[offset + 9]],
      attributes,
      varyings
    };
  }
  /** The three original vertices of a triangle, read from the prepared geometry. */
  sourceVertices(source) {
    const { triangles, faceNormals } = this.geometry, layout = this.group(source).layout;
    if (this.hasFlag(source, FLAT_NORMAL)) {
      const cached = this.flatCache?.get(source);
      if (cached)
        return cached;
      const normal = [faceNormals[source * 3], faceNormals[source * 3 + 1], faceNormals[source * 3 + 2]];
      const vertices = [1, 2, 3].map((k) => this.storedVertex(triangles[source * 4 + k], layout, normal));
      this.flatCache?.set(source, vertices);
      return vertices;
    }
    return [1, 2, 3].map((k) => {
      const offset = triangles[source * 4 + k];
      let vertex = this.vertexCache?.get(offset);
      if (!vertex) {
        vertex = this.storedVertex(offset, layout, null);
        this.vertexCache?.set(offset, vertex);
      }
      return vertex;
    });
  }
  /**
   * Side culling decided from clip coordinates alone, before reading attributes. With all three vertices in
   * front of the camera, clipping preserves orientation; otherwise the full path decides.
   */
  culledBySide(source, lens, winding, side) {
    if (side !== 0 && side !== 1)
      return false;
    const { vertices: data, triangles } = this.geometry, xy = [];
    for (let k = 1; k <= 3; k++) {
      const o = triangles[source * 4 + k], w = data[o + 3];
      if (!(w > 1e-10))
        return false;
      let x = data[o], y = data[o + 1];
      if (lens[0] || lens[1]) {
        x += this.projection[0] * lens[0] * (w / this.settings.dofFocusDistance - 1);
        y += this.projection[5] * lens[1] * (w / this.settings.dofFocusDistance - 1);
      }
      xy.push((x / w * 0.5 + 0.5) * this.width, (0.5 - y / w * 0.5) * this.height);
    }
    const area = edge([xy[0], xy[1]], [xy[2], xy[3]], xy[4], xy[5]);
    if (Math.abs(area) < 1e-10)
      return false;
    const front = area * winding < 0;
    return side === 0 ? !front : front;
  }
  project(source, lens) {
    const group = this.group(source);
    if (this.culledBySide(source, lens, group.winding, group.material.number("side", 0)))
      return [];
    const vertices = this.sourceVertices(source).map((v) => {
      if (!lens[0] && !lens[1])
        return v;
      const clip = [...v.clip];
      clip[0] += this.projection[0] * lens[0] * (clip[3] / this.settings.dofFocusDistance - 1);
      clip[1] += this.projection[5] * lens[1] * (clip[3] / this.settings.dofFocusDistance - 1);
      return {
        ...v,
        clip
      };
    });
    const polygon = clipPolygon(vertices), out = [];
    for (let i = 1; i + 1 < polygon.length; i++) {
      const vs = [polygon[0], polygon[i], polygon[i + 1]], xy = vs.map((v) => [(v.clip[0] / v.clip[3] * 0.5 + 0.5) * this.width, (0.5 - v.clip[1] / v.clip[3] * 0.5) * this.height]);
      let area = edge(xy[0], xy[1], xy[2][0], xy[2][1]);
      if (Math.abs(area) < 1e-10)
        continue;
      const front = area * group.winding < 0, side = group.material.number("side", 0);
      if (side === 0 && !front || side === 1 && front)
        continue;
      if (area < 0) {
        [vs[1], vs[2]] = [vs[2], vs[1]];
        [xy[1], xy[2]] = [xy[2], xy[1]];
        area = -area;
      }
      out.push({
        vertices: vs,
        xy,
        area,
        front,
        source
      });
    }
    return out;
  }
  get orthographic() {
    return this.projection[15] === 1;
  }
  viewRay(px, py) {
    const v = transform4(this.inverseProjection, [2 * px / this.width - 1, 1 - 2 * py / this.height, -1, 1]);
    const point = v.slice(0, 3).map((c) => c / v[3]);
    const origin = this.orthographic ? transform4(this.cameraWorld, point).slice(0, 3) : this.cameraPosition;
    const direction2 = normalize2(transform4(this.cameraWorld, [...this.orthographic ? [0, 0, -1] : point, 0]).slice(0, 3));
    return { origin, direction: direction2 };
  }
  background(x, y) {
    if (this.settings.backgroundMode === "transparent" || this.settings.backgroundMode === "environment" && !this.environment.backgroundVisible)
      return [0, 0, 0, 0];
    const { direction: direction2 } = this.viewRay(x, y);
    const color = this.settings.backgroundMode === "color" ? this.backgroundColor : scale(this.environment.sampleBackground(direction2, this.settings.environmentRotation), this.settings.environmentIntensity);
    return [...color, 1];
  }
  /** Per-triangle tangent frame: constant across the plane; only the fit to the interpolated normal is per fragment. */
  tangentFrame(source) {
    if (source === this.tangentSource)
      return;
    const { vertices: data, triangles } = this.geometry, layout = this.group(source).layout;
    let uvOffset = -1, cursor = VERTEX_HEADER;
    for (const [name, size2] of layout.attributes) {
      if (name === "uv") {
        uvOffset = cursor;
        break;
      }
      cursor += size2;
    }
    const world = (k) => {
      const o = triangles[source * 4 + k];
      return [data[o + 4], data[o + 5], data[o + 6]];
    };
    const uv = (k) => {
      const o = triangles[source * 4 + k] + uvOffset;
      return uvOffset < 0 ? ZERO32 : [data[o], data[o + 1]];
    };
    const a = world(1), dp1 = sub(world(2), a), dp2 = sub(world(3), a);
    const ua = uv(1), ub = uv(2), uc = uv(3);
    const du1 = ub[0] - ua[0], dv1 = ub[1] - ua[1], du2 = uc[0] - ua[0], dv2 = uc[1] - ua[1];
    const det = du1 * dv2 - du2 * dv1, faceNormal = normalize2(cross(dp1, dp2));
    this.tangent = Math.abs(det) > 1e-10 ? normalize2(scale(sub(scale(dp1, dv2), scale(dp2, dv1)), 1 / det)) : normalize2(cross(Math.abs(faceNormal[1]) < 0.99 ? [0, 1, 0] : [1, 0, 0], faceNormal));
    this.bitangentSign = det < 0 ? -1 : 1;
    this.tangentSource = source;
  }
  surface(triangle, weights, x, y, depth, lens, total) {
    const [a, b, c] = triangle.vertices, [w0, w1, w2] = weights;
    const attributes = {};
    for (const name in a.attributes) {
      const va = a.attributes[name], vb = b.attributes[name], vc = c.attributes[name];
      const out = new Array(va.length);
      for (let i = 0; i < va.length; i++)
        out[i] = va[i] * w0 + vb[i] * w1 + vc[i] * w2;
      attributes[name] = out;
    }
    const varyings = {};
    for (const name in a.varyings)
      varyings[name] = interpolate3(a.varyings[name], b.varyings[name], c.varyings[name], w0, w1, w2);
    const position = [
      a.world[0] * w0 + b.world[0] * w1 + c.world[0] * w2,
      a.world[1] * w0 + b.world[1] * w1 + c.world[1] * w2,
      a.world[2] * w0 + b.world[2] * w1 + c.world[2] * w2
    ];
    const normal = normalize2([
      a.normal[0] * w0 + b.normal[0] * w1 + c.normal[0] * w2,
      a.normal[1] * w0 + b.normal[1] * w1 + c.normal[1] * w2,
      a.normal[2] * w0 + b.normal[2] * w1 + c.normal[2] * w2
    ]);
    return this.finishSurface(triangle.source, triangle.front, position, normal, attributes, varyings, x, y, depth, lens, total);
  }
  /** Extrapolate the same triangle into globally aligned GL quads, including uncovered helper pixels. */
  attachDerivativeQuad(surface, triangle, lens, polygonOffset = 0) {
    const x = surface.fragCoord[0], y = surface.fragCoord[1];
    const ix = Math.floor(x), iy = Math.floor(y), lane = (ix & 1) + 2 * (iy & 1);
    const qx = ix - (ix & 1) + (x - ix), qy = iy - (iy & 1) + (y - iy);
    let helpers;
    surface.quad = { lane, surfaces: () => helpers ??= [0, 1, 2, 3].map((i) => {
      if (i === lane)
        return surface;
      const px = qx + (i & 1), py = this.height - (qy + (i >> 1));
      const [a, b, c] = triangle.xy, vs = triangle.vertices;
      const bary = [edge(b, c, px, py), edge(c, a, px, py), edge(a, b, px, py)].map((v) => v / triangle.area);
      const perspective = bary.map((v, j) => v / vs[j].clip[3]);
      const total = perspective[0] + perspective[1] + perspective[2];
      const depth = bary.reduce((z, v, j) => z + v * (vs[j].clip[2] / vs[j].clip[3] * 0.5 + 0.5), polygonOffset);
      return this.surface(triangle, perspective.map((v) => v / total), px, py, depth, lens, total);
    }) };
  }
  /** Same interpolation as `surface`, straight from the prepared geometry: ray hits do not build vertices. */
  storedSurface(source, front, w0, w1, w2) {
    const { vertices: data, triangles, faceNormals } = this.geometry, group = this.group(source), layout = group.layout;
    const a = triangles[source * 4 + 1], b = triangles[source * 4 + 2], c = triangles[source * 4 + 3];
    const attributes = {};
    let cursor = VERTEX_HEADER;
    for (const [name, size2] of group.material.needsAttributes ? layout.attributes : []) {
      const out = new Array(size2);
      for (let i = 0; i < size2; i++) {
        const k = cursor + i;
        out[i] = data[a + k] * w0 + data[b + k] * w1 + data[c + k] * w2;
      }
      attributes[name] = out;
      cursor += size2;
    }
    const varyings = {}, position = [cursor];
    for (const [name, shape] of group.material.needsAttributes ? layout.varyings : [])
      varyings[name] = interpolateStored(data, a, b, c, shape, w0, w1, w2, position);
    const point = [
      data[a + 4] * w0 + data[b + 4] * w1 + data[c + 4] * w2,
      data[a + 5] * w0 + data[b + 5] * w1 + data[c + 5] * w2,
      data[a + 6] * w0 + data[b + 6] * w1 + data[c + 6] * w2
    ];
    const n = source * 3, flat = this.hasFlag(source, FLAT_NORMAL);
    const normal = flat ? normalize2([
      faceNormals[n] * w0 + faceNormals[n] * w1 + faceNormals[n] * w2,
      faceNormals[n + 1] * w0 + faceNormals[n + 1] * w1 + faceNormals[n + 1] * w2,
      faceNormals[n + 2] * w0 + faceNormals[n + 2] * w1 + faceNormals[n + 2] * w2
    ]) : normalize2([
      data[a + 7] * w0 + data[b + 7] * w1 + data[c + 7] * w2,
      data[a + 8] * w0 + data[b + 8] * w1 + data[c + 8] * w2,
      data[a + 9] * w0 + data[b + 9] * w1 + data[c + 9] * w2
    ]);
    return this.finishSurface(source, front, point, normal, attributes, varyings, 0, 0, 0, [0, 0], 1);
  }
  finishSurface(source, front, position, normal, attributes, varyings, x, y, depth, lens, total) {
    const group = this.group(source), material = group.material;
    let tangent = ZERO32, bitangent = ZERO32;
    if (material.needsTangents) {
      this.tangentFrame(source);
      tangent = normalize2(sub(this.tangent, scale(normal, dot2(this.tangent, normal))));
      bitangent = scale(cross(normal, tangent), this.bitangentSign);
    }
    let cx = this.cameraPosition[0], cy = this.cameraPosition[1], cz = this.cameraPosition[2];
    if (lens[0] || lens[1]) {
      const lensWorld = transform4(this.cameraWorld, [lens[0], lens[1], 0, 0]);
      cx += lensWorld[0];
      cy += lensWorld[1];
      cz += lensWorld[2];
    }
    const view = this.orthographic ? normalize2(this.cameraWorld.slice(8, 11)) : normalize2([cx - position[0], cy - position[1], cz - position[2]]);
    const uniforms = material.needsUniforms ? { ...group.uniforms, vViewPosition: scale(transform4(this.view, position).slice(0, 3), -1) } : group.uniforms;
    return {
      position,
      normal,
      tangent,
      bitangent,
      view,
      attributes,
      varyings,
      frontFacing: front,
      depth,
      fragCoord: [x, this.height - y, depth, total],
      uniforms
    };
  }
  /** World-space barycentrics also interpolate UVs, vertex colors, shader varyings and normal maps. */
  raySurface(hit, direction2) {
    const p = this.geometry.positions, o = hit.index * 9, p0 = [p[o], p[o + 1], p[o + 2]];
    const face = cross(sub([p[o + 3], p[o + 4], p[o + 5]], p0), sub([p[o + 6], p[o + 7], p[o + 8]], p0));
    const front = dot2(face, direction2) * this.group(hit.index).winding * this.cameraHandedness < 0;
    const surface = this.storedSurface(hit.index, front, 1 - hit.u - hit.v, hit.u, hit.v);
    surface.view = scale(direction2, -1);
    const clip = transform4(this.projection, transform4(this.view, surface.position));
    if (Math.abs(clip[3]) > 1e-10) {
      surface.depth = clip[2] / clip[3] * 0.5 + 0.5;
      surface.fragCoord = [
        (clip[0] / clip[3] * 0.5 + 0.5) * this.width,
        (clip[1] / clip[3] * 0.5 + 0.5) * this.height,
        surface.depth,
        1 / clip[3]
      ];
    }
    if (this.group(hit.index).material.needsFragmentQuad) {
      const vertices = this.sourceVertices(hit.index);
      const xy = vertices.map((v) => [
        (v.clip[0] / v.clip[3] * 0.5 + 0.5) * this.width,
        (0.5 - v.clip[1] / v.clip[3] * 0.5) * this.height
      ]);
      const area = edge(xy[0], xy[1], xy[2][0], xy[2][1]);
      if (Number.isFinite(area) && Math.abs(area) > 1e-10)
        this.attachDerivativeQuad(surface, { vertices, xy, area, front, source: hit.index }, [0, 0]);
    }
    return surface;
  }
  shadowAccept = (index, u, v) => {
    if (this.hasFlag(index, SHADOW_OPAQUE))
      return true;
    const group = this.group(index), m = group.material;
    const { vertices: data, triangles } = this.geometry;
    const a = triangles[index * 4 + 1], b = triangles[index * 4 + 2], c = triangles[index * 4 + 3], w0 = 1 - u - v;
    const attributes = {};
    let cursor = VERTEX_HEADER;
    for (const [name, size2] of group.layout.attributes) {
      if (name.startsWith("uv") || name === "color") {
        const out = new Array(size2);
        for (let i = 0; i < size2; i++) {
          const k = cursor + i;
          out[i] = data[a + k] * w0 + data[b + k] * u + data[c + k] * v;
        }
        attributes[name] = out;
      }
      cursor += size2;
    }
    let alpha = m.alpha(attributes);
    if (m.flag("vertexColors") && attributes.color)
      alpha *= attributes.color[3] ?? 1;
    return alpha >= shadowThreshold(m);
  };
  /** Ray origin, offset slightly off the surface to avoid hitting its own triangle. */
  rayOrigin(position, normal) {
    const bias = Math.max(1e-5, Math.max(Math.abs(position[0]), Math.abs(position[1]), Math.abs(position[2])) * 1e-6);
    return [position[0] + normal[0] * bias, position[1] + normal[1] * bias, position[2] + normal[2] * bias];
  }
  visibility(source, position, normal, direction2, distance, seed, soft = true, ignoreSelf = false) {
    if (!this.settings.shadows || !this.hasFlag(source, RECEIVE_SHADOW) || !this.bvh)
      return 1;
    const origin = this.rayOrigin(position, normal);
    const softness = soft ? (this.settings.shadowSoftness ?? 0) * Math.PI / 180 : 0;
    const triangles = this.geometry.triangles, own = triangles[source * 4];
    const accept = ignoreSelf ? (index, u, v) => triangles[index * 4] !== own && this.shadowAccept(index, u, v) : this.shadowAccept;
    if (softness <= 0)
      return this.bvh.occluded(origin, direction2, distance, source, accept) ? 0 : 1;
    const { t, b } = frame(direction2), spread = Math.tan(softness / 2);
    let lit = 0;
    for (let i = 0; i < SHADOW_SAMPLES; i++) {
      const u = (halton(i + 1, 2) + seed) % 1, v = (halton(i + 1, 3) + seed * 0.618034) % 1;
      const r = Math.sqrt(u) * spread, a = v * 2 * Math.PI;
      const cu = r * Math.cos(a), sv = r * Math.sin(a), d = this.rayDirection;
      const x = direction2[0] + (t[0] * cu + b[0] * sv);
      const y = direction2[1] + (t[1] * cu + b[1] * sv);
      const z = direction2[2] + (t[2] * cu + b[2] * sv);
      const inverse = 1 / (Math.sqrt(x * x + y * y + z * z) || 1);
      d[0] = x * inverse;
      d[1] = y * inverse;
      d[2] = z * inverse;
      if (!this.bvh.occluded(origin, d, distance, source, accept))
        lit++;
    }
    return lit / SHADOW_SAMPLES;
  }
  /** View depth of a world-space point (positive in front of the camera). */
  viewDepth(p) {
    const v = this.view;
    return -(v[2] * p[0] + v[6] * p[1] + v[10] * p[2] + v[14]);
  }
  /** World-space size of a pixel at that depth: scales the irradiance cache radii. */
  pixelFootprint(depth) {
    return (this.orthographic ? 1 : Math.max(depth, 1e-3)) * 2 / Math.abs(this.projection[5]) / this.height;
  }
  /** Computes indirect light at a point and stores the record for its neighbors in the bucket. */
  cacheRecord(source, position, normal, seed) {
    const estimate = this.gi.estimate(source, position, normal, seed);
    const spacing = this.pixelFootprint(this.viewDepth(position)) * (this.settings.giCacheSpacing ?? 4);
    const radius = clamp2(estimate.radius * CACHE_ACCURACY, spacing * CACHE_MIN_SPACING, spacing * CACHE_MAX_SPACING);
    this.giCache.add({ position, normal, color: estimate.color, variance: estimate.variance, radius });
    return estimate;
  }
  /** Indirect light of a fragment: from the cache when some record reaches the point, otherwise computed and stored. */
  indirect(source, position, normal, seed) {
    if (!this.giCache) {
      const estimate2 = this.gi.estimate(source, position, normal, seed);
      this.lastVariance = estimate2.variance;
      return estimate2.color;
    }
    const cached = this.giGrid?.lookupAt(this.fragmentX, this.fragmentY, position, normal, 0, LOOKUP_SMOOTHING) ?? this.giCache.lookup(position, normal, LOOKUP_SMOOTHING);
    if (cached) {
      this.lastVariance = cached.variance;
      return cached.color;
    }
    const estimate = this.cacheRecord(source, position, normal, seed);
    this.lastVariance = estimate.variance;
    return estimate.color;
  }
  /** Ray-traced ambient occlusion: fraction of the (cosine-weighted) hemisphere blocked within aoDistance. */
  occlusion(source, position, normal, seed) {
    const intensity = this.settings.aoIntensity ?? 1, distance = this.settings.aoDistance ?? 1.5;
    if (this.gi || !this.settings.ambientOcclusion || !this.bvh || intensity <= 0 || distance <= 0)
      return 1;
    const origin = this.rayOrigin(position, normal), { t, b } = frame(normal);
    let hits = 0;
    for (let i = 0; i < AO_SAMPLES; i++) {
      const u = (halton(i + 1, 2) + seed) % 1, v = (halton(i + 1, 3) + seed * 0.618034) % 1;
      const r = Math.sqrt(u), a = v * 2 * Math.PI;
      const cu = r * Math.cos(a), sv = r * Math.sin(a), up = Math.sqrt(1 - r * r), d = this.rayDirection;
      d[0] = t[0] * cu + b[0] * sv + normal[0] * up;
      d[1] = t[1] * cu + b[1] * sv + normal[1] * up;
      d[2] = t[2] * cu + b[2] * sv + normal[2] * up;
      if (this.bvh.occluded(origin, d, distance, source, this.shadowAccept))
        hits++;
    }
    return Math.max(0, 1 - intensity * hits / AO_SAMPLES);
  }
  /**
   * One completed bucket is returned at full sample quality. `progress` receives each pixel of the final image as
   * soon as it is resolved, in row order (with depth of field, once per lens pass, averaging the passes so far).
   */
  *renderBucket(bucket, progress) {
    this.vertexCache = /* @__PURE__ */ new Map();
    this.flatCache = /* @__PURE__ */ new Map();
    this.giCache = this.usesCache ? new IrradianceCache() : null;
    this.cachePlaced = this.giGrid !== null;
    const count = bucket.width * bucket.height, samples = this.settings.maxSamples;
    const sum = new Float32Array(count * 4);
    const aov = this.aov && !this.target.linear ? {
      modulation: new Float32Array(count * 3),
      indirect: new Float32Array(count * 3),
      weight: new Float32Array(count),
      normal: new Float32Array(count * 3),
      depth: new Float32Array(count),
      variance: new Float32Array(count)
    } : null;
    const targetDepth = this.target.linear ? new Float32Array(count).fill(1) : void 0;
    const background = new Float32Array(count * 4);
    for (let y = 0; y < bucket.height; y++)
      for (let x = 0; x < bucket.width; x++)
        background.set(this.background(bucket.x + x + 0.5, bucket.y + y + 0.5), (y * bucket.width + x) * 4);
    const jitter = (sample) => samples === 1 ? [0.5, 0.5] : [halton(sample + 1, 2), halton(sample + 1, 3)];
    const pixels = new Uint8ClampedArray(count * 4);
    const vignette = this.target.linear ? 0 : clamp2(this.settings.vignette ?? 0);
    const grain = this.target.linear ? 0 : clamp2(this.settings.grain ?? 0);
    const live = this.target.linear ? void 0 : progress;
    const resolved = (done) => live ? (pixel) => {
      this.resolvePixel(bucket, pixel, sum, done, pixels, vignette, grain);
      live(pixels, pixel);
    } : void 0;
    const onRecord = live && this.giCache && !this.cachePlaced ? this.recordPreview(bucket, pixels, live) : void 0;
    if (this.lensRadius > 0) {
      for (let sample = 0; sample < samples; sample++) {
        let radius = Math.sqrt(halton(sample + 1, 5)) * this.lensRadius;
        const angle = halton(sample + 1, 7) * 2 * Math.PI, blades = this.settings.bokehBlades;
        if (blades >= 3)
          radius *= Math.cos(Math.PI / blades) / Math.cos(angle % (2 * Math.PI / blades) - Math.PI / blades);
        yield* this.renderPass(bucket, [jitter(sample)], [radius * Math.cos(angle), radius * Math.sin(angle)], background, sum, targetDepth, resolved(sample + 1), aov, onRecord);
      }
    } else {
      yield* this.renderPass(bucket, Array.from({ length: samples }, (_, sample) => jitter(sample)), [0, 0], background, sum, targetDepth, resolved(samples), aov, onRecord);
    }
    this.vertexCache = null;
    this.flatCache = null;
    this.giCache = null;
    if (aov)
      this.storeAov(bucket, sum, aov);
    if (!live) {
      for (let i = 0; i < count; i++) {
        if (!this.target.linear) {
          this.resolvePixel(bucket, i, sum, samples, pixels, vignette, grain);
          continue;
        }
        const alpha = sum[i * 4 + 3] / samples;
        const rgb = [0, 1, 2].map((c) => alpha ? sum[i * 4 + c] / samples / alpha : 0);
        sum.set([...rgb, alpha], i * 4);
        pixels.set([...encodeColor(rgb, 1, "linear", false), Math.round(clamp2(alpha) * 255)], i * 4);
      }
    }
    return {
      bucket,
      pixels,
      linear: this.target.linear ? sum : void 0,
      depth: targetDepth
    };
  }
  /** The bucket's triangles projected for this lens and, per pixel, which ones cover any sample. */
  *preparePass(bucket, jitters, lens) {
    const count = bucket.width * bucket.height;
    const projected = [];
    if (this.geometry) {
      const { binOffsets, binTriangles } = this.geometry;
      for (let k = binOffsets[bucket.index]; k < binOffsets[bucket.index + 1]; k++)
        projected.push(...this.project(binTriangles[k], lens));
    }
    projected.sort((a, b) => this.group(a.source).renderOrder - this.group(b.source).renderOrder);
    const passTriangles = projected.map((triangle) => passTriangle(triangle, this.group(triangle.source).material));
    const candidates = new Array(count);
    for (let t = 0; t < passTriangles.length; t++) {
      const [p0, p1, p2] = passTriangles[t].triangle.xy;
      const minX = Math.max(bucket.x, Math.floor(Math.min(p0[0], p1[0], p2[0])));
      const maxX = Math.min(bucket.x + bucket.width - 1, Math.floor(Math.max(p0[0], p1[0], p2[0])));
      const minY = Math.max(bucket.y, Math.floor(Math.min(p0[1], p1[1], p2[1])));
      const maxY = Math.min(bucket.y + bucket.height - 1, Math.floor(Math.max(p0[1], p1[1], p2[1])));
      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          if (coversPixel(passTriangles[t], x, y, jitters))
            (candidates[(y - bucket.y) * bucket.width + x - bucket.x] ??= []).push(t);
        }
        yield;
      }
    }
    return { passTriangles, candidates };
  }
  /** Record preview: a small square in the indirect light color at its pixel, sent through the progress channel. */
  recordPreview(bucket, pixels, live) {
    const dot3 = Math.max(1, Math.floor((this.settings.giCacheSpacing ?? 4) / 2)), preview = new Float32Array(4);
    const vignette = clamp2(this.settings.vignette ?? 0), grain = clamp2(this.settings.grain ?? 0);
    return (pixel, rgb) => {
      preview[0] = rgb[0];
      preview[1] = rgb[1];
      preview[2] = rgb[2];
      preview[3] = 1;
      const cx = pixel % bucket.width, cy = Math.floor(pixel / bucket.width);
      for (let dy = 0; dy < dot3; dy++)
        for (let dx = 0; dx < dot3; dx++) {
          const x = cx + dx, y = cy + dy;
          if (x >= bucket.width || y >= bucket.height)
            continue;
          const i = y * bucket.width + x;
          this.resolveSample(bucket.x + x + 0.5, bucket.y + y + 0.5, preview, 0, 1, pixels, i * 4, vignette, grain);
          live(pixels, i);
        }
    };
  }
  /**
   * Irradiance cache records on a pixel grid over the bucket: at each point, the nearest opaque surface among the
   * materials that query indirect light gets a full computation, which its neighbors interpolate.
   */
  *placeCacheRecords(bucket, candidates, passTriangles, lens, clipPlane, onRecord) {
    const spacing = Math.max(1, Math.round(this.settings.giCacheSpacing ?? 4)), count = bucket.width * bucket.height;
    let lastYield = performance.now();
    for (let pixel = 0; pixel < count; pixel++) {
      const x = bucket.x + pixel % bucket.width, y = bucket.y + Math.floor(pixel / bucket.width);
      const list = candidates[pixel];
      if (x % spacing !== 0 || y % spacing !== 0 || !list)
        continue;
      const px = x + 0.5, py = y + 0.5;
      const covering = [];
      for (const t of list) {
        const pass = passTriangles[t];
        if (pass.translucent || !pass.depthTest || !pass.colorWrite || !this.group(pass.triangle.source).material.diffuseGi)
          continue;
        const [p0, p1, p2] = pass.triangle.xy;
        const e0 = edge(p1, p2, px, py), e1 = edge(p2, p0, px, py), e2 = edge(p0, p1, px, py);
        if (e0 < 0 || e1 < 0 || e2 < 0)
          continue;
        const b0 = e0 * pass.invArea, b1 = e1 * pass.invArea, b2 = e2 * pass.invArea;
        covering.push({ t, z: b0 * pass.z0 + b1 * pass.z1 + b2 * pass.z2 + pass.polygonOffset, b0, b1, b2 });
      }
      covering.sort((a, b) => a.z - b.z);
      for (const { t, z, b0, b1, b2 } of covering) {
        const pass = passTriangles[t], triangle = pass.triangle, material = this.group(triangle.source).material;
        const i0 = b0 * pass.invW0, i1 = b1 * pass.invW1, i2 = b2 * pass.invW2, total = i0 + i1 + i2;
        const surface = this.surface(triangle, [i0 / total, i1 / total, i2 / total], px, py, z, lens, total);
        if (clipPlane && dot2(clipPlane, surface.position) + clipPlane[3] < 0)
          continue;
        const alphaTest = material.number("alphaTest", 0);
        if (alphaTest > 0) {
          if (material.needsFragmentQuad)
            this.attachDerivativeQuad(surface, triangle, lens, pass.polygonOffset);
          let alpha = material.alpha(surface.attributes, material.uvGradients(surface));
          if (material.flag("vertexColors") && surface.attributes.color)
            alpha *= surface.attributes.color[3] ?? 1;
          if (alpha < alphaTest)
            continue;
        }
        const normal = scale(normalize2(surface.normal), triangle.front ? 1 : -1);
        const estimate = this.cacheRecord(triangle.source, surface.position, normal, hash(px, py));
        onRecord?.(pixel, mul(estimate.color, material.vector("color", [1, 1, 1])));
        break;
      }
      if (performance.now() - lastYield > 8) {
        yield;
        lastYield = performance.now();
      }
    }
  }
  /** Copies the bucket accumulators into the denoiser's full-image buffers. */
  storeAov(bucket, sum, local) {
    const frame2 = this.aov;
    for (let y = 0; y < bucket.height; y++)
      for (let x = 0; x < bucket.width; x++) {
        const i = y * bucket.width + x, g = (bucket.y + y) * frame2.width + bucket.x + x, w = local.weight[i];
        frame2.color.set(sum.subarray(i * 4, i * 4 + 4), g * 4);
        frame2.modulation.set(local.modulation.subarray(i * 3, i * 3 + 3), g * 3);
        for (let c = 0; c < 3; c++)
          frame2.indirect[g * 3 + c] = w > 0 ? local.indirect[i * 3 + c] / w : 0;
        frame2.normal.set(local.normal.subarray(i * 3, i * 3 + 3), g * 3);
        frame2.depth[g] = local.depth[i];
        frame2.variance[g] = local.variance[i];
      }
  }
  /**
   * Recomposes the full image with the filtered indirect light: each pixel receives the difference between the
   * filtered and the original indirect light, times the modulation, and goes through the same resolve as buckets.
   * `onRows` receives bands of finished rows; the last call completes the image.
   */
  *resolveDenoised(filtered, onRows) {
    const frame2 = this.aov;
    if (!frame2)
      throw new Error("CPU renderer: no denoise buffers were attached.");
    const samples = this.settings.maxSamples, sum = new Float32Array(4);
    const vignette = clamp2(this.settings.vignette ?? 0), grain = clamp2(this.settings.grain ?? 0);
    let rows = new Uint8ClampedArray(this.width * 4 * Math.min(this.height, 16)), firstRow = 0, filled = 0;
    let lastYield = performance.now();
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const g = y * this.width + x;
        for (let c = 0; c < 3; c++)
          sum[c] = frame2.color[g * 4 + c] + frame2.modulation[g * 3 + c] * (filtered[g * 3 + c] - frame2.indirect[g * 3 + c]);
        sum[3] = frame2.color[g * 4 + 3];
        this.resolveSample(x + 0.5, y + 0.5, sum, 0, samples, rows, (g - firstRow * this.width) * 4, vignette, grain);
      }
      filled++;
      if (filled * this.width * 4 >= rows.length || y === this.height - 1) {
        onRows(firstRow, rows.subarray(0, filled * this.width * 4));
        firstRow = y + 1;
        filled = 0;
        rows = new Uint8ClampedArray(this.width * 4 * Math.min(this.height - firstRow, 16));
      }
      if (performance.now() - lastYield > 8) {
        yield;
        lastYield = performance.now();
      }
    }
  }
  /** Converts a pixel's linear accumulator into the displayed color, using the `samples` taken so far. */
  resolvePixel(bucket, i, sum, samples, pixels, vignette, grain) {
    this.resolveSample(bucket.x + i % bucket.width + 0.5, bucket.y + Math.floor(i / bucket.width) + 0.5, sum, i * 4, samples, pixels, i * 4, vignette, grain);
  }
  /** Resolves the accumulator read at `offset` into the pixel written at `out`, at image position `px`, `py`. */
  resolveSample(px, py, sum, offset, samples, pixels, out, vignette, grain) {
    const alpha = sum[offset + 3] / samples;
    const inv = this.volumetric.active ? 1 / samples : alpha ? 1 / (samples * alpha) : 0;
    let r = sum[offset] * inv, g = sum[offset + 1] * inv, b = sum[offset + 2] * inv;
    if (vignette > 0) {
      const u = px / this.width * 2 - 1, v = py / this.height * 2 - 1;
      const k = 1 - vignette * smoothstep2(0.25, 2, u * u + v * v);
      r *= k;
      g *= k;
      b *= k;
    }
    const mapped = toneMap3(r, g, b, this.settings.exposure, this.settings.tonemapping);
    let noise = 0;
    if (grain > 0)
      noise = (hash(px, py) - 0.5) * grain * 0.2;
    const encoded = mapped.map((v) => clamp2(linearToSrgb(clamp2(v + noise))));
    const outputAlpha = this.volumetric.active ? Math.max(clamp2(alpha), ...encoded) : clamp2(alpha);
    const unpremultiply = this.volumetric.active && outputAlpha > 0 ? 1 / outputAlpha : 1;
    for (let c = 0; c < 3; c++)
      pixels[out + c] = Math.round(encoded[c] * unpremultiply * 255);
    pixels[out + 3] = Math.round(outputAlpha * 255);
  }
  /**
   * A pass rasterizes all samples of a single projection; the premultiplied result is added to `sum`.
   * It first records, per pixel, the triangles that cover it; then shades pixel by pixel in row order,
   * replaying each pixel's triangles in draw order. A pixel's depth and transparency depend only on
   * that sequence, so the image matches the per-triangle loop, and each pixel comes out finished.
   */
  *renderPass(bucket, jitters, lens, background, sum, targetDepth, onPixel, aov = null, onRecord) {
    const count = bucket.width * bucket.height, S = jitters.length;
    const { passTriangles, candidates } = yield* this.preparePass(bucket, jitters, lens);
    const color = new Float32Array(S * 4), depth = new Float64Array(S);
    let current = -1, seed = 0;
    const ctx = {
      lights: this.scene.lights,
      environment: this.environment,
      settings: this.settings,
      visibility: (p, n, d, dist, ignoreSelf) => this.visibility(current, p, n, d, dist, seed, true, ignoreSelf),
      occlusion: (p, n) => this.occlusion(current, p, n, seed),
      indirect: this.gi ? (p, n) => this.indirect(current, p, n, seed) : void 0,
      transmitted: (exit, blur) => {
        const source = current, fx = this.fragmentX, fy = this.fragmentY, variance = this.lastVariance;
        const light = this.transmittedLight(exit, blur, seed, (index, surface, px, py) => {
          current = index;
          this.fragmentX = px;
          this.fragmentY = py;
          return this.group(index).material.shade(surface, behind);
        });
        current = source;
        this.fragmentX = fx;
        this.fragmentY = fy;
        this.lastVariance = variance;
        return light;
      }
    };
    const behind = {
      ...ctx,
      visibility: (p, n, d, dist, ignoreSelf) => this.visibility(current, p, n, d, dist, seed, false, ignoreSelf),
      occlusion: () => 1,
      transmitted: void 0
    };
    let lastYield = performance.now();
    const covered = new Float64Array(S), clipPlane = this.target.clipPlane;
    if (this.giCache && !this.cachePlaced) {
      yield* this.placeCacheRecords(bucket, candidates, passTriangles, lens, clipPlane, onRecord);
      this.cachePlaced = true;
    }
    const modS = new Float32Array(S * 3), indS = new Float32Array(S * 3), weightS = new Float32Array(S);
    for (let pixel = 0; pixel < count; pixel++) {
      const x = bucket.x + pixel % bucket.width, y = bucket.y + Math.floor(pixel / bucket.width);
      const b0 = background[pixel * 4], b1 = background[pixel * 4 + 1], b2 = background[pixel * 4 + 2], b3 = background[pixel * 4 + 3];
      for (let s = 0; s < S; s++) {
        color[s * 4] = b0;
        color[s * 4 + 1] = b1;
        color[s * 4 + 2] = b2;
        color[s * 4 + 3] = b3;
        depth[s] = Infinity;
      }
      if (aov) {
        modS.fill(0);
        indS.fill(0);
        weightS.fill(0);
      }
      let entries;
      const list = candidates[pixel];
      if (list)
        for (let li = 0; li < list.length; li++) {
          const t = list[li];
          const pass = passTriangles[t], triangle = pass.triangle;
          const group = this.group(triangle.source), material = group.material;
          current = triangle.source;
          const [p0, p1, p2] = triangle.xy;
          let mask = 0, first = -1, fx = 0, fy = 0, fb0 = 0, fb1 = 0, fb2 = 0;
          for (let s = 0; s < S; s++) {
            const px = x + jitters[s][0], py = y + jitters[s][1];
            const e0 = edge(p1, p2, px, py), e1 = edge(p2, p0, px, py), e2 = edge(p0, p1, px, py);
            if (e0 < 0 || e1 < 0 || e2 < 0 || e0 === 0 && !pass.tl0 || e1 === 0 && !pass.tl1 || e2 === 0 && !pass.tl2)
              continue;
            if (pass.wireframe && Math.min(e0 / pass.len0, e1 / pass.len1, e2 / pass.len2) > pass.lineWidth)
              continue;
            const b02 = e0 * pass.invArea, b12 = e1 * pass.invArea, b22 = e2 * pass.invArea;
            const z = b02 * pass.z0 + b12 * pass.z1 + b22 * pass.z2 + pass.polygonOffset;
            if (pass.earlyZ && !depthPass(pass.depthFunc, z, depth[s]))
              continue;
            covered[s] = z;
            mask |= 1 << s;
            if (first < 0) {
              first = s;
              fx = px;
              fy = py;
              fb0 = b02;
              fb1 = b12;
              fb2 = b22;
            }
          }
          if (!mask)
            continue;
          const i0 = fb0 * pass.invW0, i1 = fb1 * pass.invW1, i2 = fb2 * pass.invW2, total = i0 + i1 + i2;
          const surface = this.surface(triangle, [i0 / total, i1 / total, i2 / total], fx, fy, covered[first], lens, total);
          if (clipPlane && dot2(clipPlane, surface.position) + clipPlane[3] < 0)
            continue;
          if (material.needsFragmentQuad)
            this.attachDerivativeQuad(surface, triangle, lens, pass.polygonOffset);
          seed = hash(fx, fy);
          this.fragmentX = fx;
          this.fragmentY = fy;
          this.lastVariance = 0;
          const fragment = material.shade(surface, ctx);
          const variance = this.lastVariance;
          if (performance.now() - lastYield > 8) {
            yield;
            lastYield = performance.now();
          }
          if (!fragment)
            continue;
          if (!fragment.color.every(Number.isFinite) || !Number.isFinite(fragment.alpha) || !Number.isFinite(fragment.depth))
            throw new Error(`${material.data.name}: fragment contains non-finite values.`);
          this.applyFog(fragment, surface.position, material);
          const shaderDepth = fragment.depth !== covered[first] ? clamp2(fragment.depth) : -1;
          if (pass.translucent) {
            (entries ??= []).push({
              fragment,
              material,
              order: group.renderOrder,
              mask,
              depths: shaderDepth >= 0 ? null : Float64Array.from(covered),
              depth: shaderDepth
            });
            continue;
          }
          const info = aov && fragment.indirect && fragment.modulation ? fragment : null;
          const fragmentNormal = info ? scale(normalize2(surface.normal), triangle.front ? 1 : -1) : ZERO32;
          for (let s = 0; s < S; s++) {
            if (!(mask & 1 << s))
              continue;
            const z = shaderDepth >= 0 ? shaderDepth : covered[s];
            if (pass.depthTest && !depthPass(pass.depthFunc, z, depth[s]))
              continue;
            if (pass.depthWrite)
              depth[s] = z;
            if (pass.colorWrite) {
              const offset = s * 4, alpha = fragment.alpha;
              color[offset] = fragment.color[0] * alpha;
              color[offset + 1] = fragment.color[1] * alpha;
              color[offset + 2] = fragment.color[2] * alpha;
              color[offset + 3] = alpha;
              if (aov) {
                const o = s * 3;
                if (info) {
                  modS[o] = info.modulation[0] * alpha;
                  modS[o + 1] = info.modulation[1] * alpha;
                  modS[o + 2] = info.modulation[2] * alpha;
                  indS[o] = info.indirect[0];
                  indS[o + 1] = info.indirect[1];
                  indS[o + 2] = info.indirect[2];
                  weightS[s] = alpha;
                } else {
                  modS[o] = modS[o + 1] = modS[o + 2] = 0;
                  weightS[s] = 0;
                }
                if (s === 0) {
                  aov.depth[pixel] = info ? this.viewDepth(surface.position) : 0;
                  aov.normal.set(fragmentNormal, pixel * 3);
                  aov.variance[pixel] = info ? variance : 0;
                }
              }
            }
          }
        }
      for (let s = 0; s < S; s++) {
        const slot = s;
        if (entries) {
          const visible = entries.filter((e) => e.mask & 1 << s).map((e) => ({ e, z: e.depth >= 0 ? e.depth : e.depths[s] }));
          visible.sort((a, b) => a.e.order - b.e.order || b.z - a.z);
          for (const { e, z } of visible) {
            const m = e.material, f = e.fragment;
            if (m.flag("depthTest", true) && !depthPass(m.number("depthFunc", 3), z, depth[slot]))
              continue;
            if (m.flag("depthWrite", true))
              depth[slot] = z;
            if (!m.flag("colorWrite", true))
              continue;
            const offset = slot * 4, dst = Array.from(color.subarray(offset, offset + 3)), da = color[offset + 3];
            const a = f.alpha, blending = m.number("blending", 1);
            const behind2 = mulColor(f.transmitted ?? dst, f.attenuation);
            let rgb = f.transmission ? add(sub(f.color, f.diffuse), mix(f.diffuse, behind2, f.transmission)) : f.color;
            if (aov) {
              const o = slot * 3;
              if (blending === 0) {
                modS[o] = modS[o + 1] = modS[o + 2] = 0;
                weightS[slot] = 0;
              } else if (blending === 4)
                for (let c = 0; c < 3; c++)
                  modS[o + c] *= 1 - a + a * rgb[c];
              else if (blending !== 2 && blending !== 3)
                for (let c = 0; c < 3; c++)
                  modS[o + c] *= 1 - a;
            }
            const source = f.premultiplied ? rgb : scale(rgb, a);
            if (blending === 2)
              rgb = add(dst, source);
            else if (blending === 3)
              rgb = sub(dst, scale(rgb, a)).map((v) => Math.max(0, v));
            else if (blending === 4)
              rgb = mulColor(dst, mix([1, 1, 1], rgb, a));
            else if (blending !== 0)
              rgb = add(source, scale(dst, 1 - a));
            color.set([...rgb, blending === 0 ? 1 : a + da * (1 - a)], offset);
          }
        }
        if (this.volumetric.active) {
          const px = x + jitters[s][0], py = y + jitters[s][1];
          const vp = transform4(this.inverseProjection, [
            px / this.width * 2 - 1,
            1 - py / this.height * 2,
            (Number.isFinite(depth[slot]) ? depth[slot] : 1) * 2 - 1,
            1
          ]);
          const point = vp.slice(0, 3).map((v) => v / vp[3]);
          point[0] -= lens[0] * (-point[2] / this.settings.dofFocusDistance - 1);
          point[1] -= lens[1] * (-point[2] / this.settings.dofFocusDistance - 1);
          const origin = this.orthographic ? this.viewRay(px, py).origin : transform4(this.cameraWorld, [lens[0], lens[1], 0]).slice(0, 3);
          const ray = sub(transform4(this.cameraWorld, point), origin);
          const glow = this.volumetric.sample(
            origin,
            normalize2(ray),
            Math.hypot(...ray),
            (p, d, dist) => !this.settings.shadows || !this.bvh || !this.bvh.occluded(p, d, dist, -1, this.shadowAccept),
            52.9829189 * (((x + 0.5) * 0.06711056 + (this.height - y - 0.5) * 583715e-8) % 1) % 1,
            // Light scattered in the medium crosses the same fog as the surfaces on its way to the camera.
            this.fog ? (p) => 1 - this.fogAmount(p) : void 0
          );
          const offset = slot * 4;
          const strength = Math.max(...glow);
          if (strength > 0) {
            const alpha = Math.max(color[offset + 3], strength);
            for (let c = 0; c < 3; c++)
              color[offset + c] += glow[c];
            color[offset + 3] = alpha;
          }
        }
        if (targetDepth)
          targetDepth[pixel] = Math.min(targetDepth[pixel], depth[slot]);
        sum[pixel * 4] += color[slot * 4];
        sum[pixel * 4 + 1] += color[slot * 4 + 1];
        sum[pixel * 4 + 2] += color[slot * 4 + 2];
        sum[pixel * 4 + 3] += color[slot * 4 + 3];
        if (aov) {
          const o = slot * 3, w = weightS[slot];
          for (let c = 0; c < 3; c++) {
            aov.modulation[pixel * 3 + c] += modS[o + c];
            aov.indirect[pixel * 3 + c] += indS[o + c] * w;
          }
          aov.weight[pixel] += w;
        }
      }
      onPixel?.(pixel);
      if ((pixel + 1) % bucket.width === 0) {
        yield;
        lastYield = performance.now();
      }
    }
  }
};
var mulColor = (a, b) => a.map((v, i) => v * b[i]);

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/pipeline.js
var CpuScenePipeline = class {
  source;
  computed = /* @__PURE__ */ new Map();
  constructor(source) {
    this.source = source;
  }
  *prepare(camera, settings, width, height, environment) {
    const materials = /* @__PURE__ */ new Map();
    const scene = {
      ...this.source,
      textures: [...this.source.textures],
      meshes: this.source.meshes.map((mesh) => ({
        ...mesh,
        materials: mesh.materials.map((original) => {
          let material = materials.get(original);
          if (!material) {
            material = {
              ...original,
              shader: original.shader ? { ...original.shader, uniforms: { ...original.shader.uniforms } } : void 0
            };
            materials.set(original, material);
          }
          return material;
        })
      }))
    };
    const textureIds = new Set(scene.textures.map((t) => t.id));
    for (const material of materials.values()) {
      if (!material.shader)
        continue;
      const { compute } = material;
      if (compute) {
        let outputs = this.computed.get(compute.id);
        if (!outputs) {
          const pipeline = new CpuComputePipeline(compute.pipeline, compute.id, compute.data ?? {});
          if (compute.snapshot)
            pipeline.restore(compute.snapshot);
          else
            yield* pipeline.tick(material.time ?? 0, 1 / 60);
          outputs = pipeline.outputs();
          this.computed.set(compute.id, outputs);
        }
        for (const [uniform, texture] of Object.entries(outputs)) {
          material.shader.uniforms[uniform] = { texture: texture.id };
          if (!textureIds.has(texture.id)) {
            scene.textures.push(texture);
            textureIds.add(texture.id);
          }
        }
      }
      if (material.time !== void 0)
        material.shader.uniforms.time = material.time;
    }
    const captureScene = { ...scene, meshes: scene.meshes.filter((mesh) => !mesh.materials.some((m) => m.planarCapture)) };
    for (const mesh of scene.meshes) {
      if (mesh.primitive)
        continue;
      for (const material of mesh.materials) {
        if (!material.planarCapture || !material.shader)
          continue;
        const id = `capture:${material.planarCapture.id}`;
        const model = new Matrix4().fromArray(mesh.matrixWorld);
        const normal = new Vector3(0, 1, 0).applyMatrix3(new Matrix3().getNormalMatrix(model)).normalize();
        const point = new Vector3().setFromMatrixPosition(model);
        const plane = new Plane().setFromNormalAndCoplanarPoint(normal, point);
        const { x, y, z } = normal, d = plane.constant;
        const mirror = new Matrix4().set(1 - 2 * x * x, -2 * x * y, -2 * x * z, -2 * d * x, -2 * y * x, 1 - 2 * y * y, -2 * y * z, -2 * d * y, -2 * z * x, -2 * z * y, 1 - 2 * z * z, -2 * d * z, 0, 0, 0, 1);
        const reflectedCamera = {
          ...camera,
          matrixWorld: mirror.multiply(new Matrix4().fromArray(camera.matrixWorld)).toArray()
        };
        const side = plane.distanceToPoint(new Vector3().fromArray(camera.matrixWorld, 12)) >= 0 ? 1 : -1;
        const projection = cameraProjection(camera, width / height);
        const bias = new Matrix4().set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
        const textureMatrix = (world) => bias.clone().multiply(projection).multiply(new Matrix4().fromArray(world).invert()).multiply(model).toArray();
        Object.assign(material.shader.uniforms, {
          reflectionMatrix: textureMatrix(reflectedCamera.matrixWorld),
          refractionMatrix: textureMatrix(camera.matrixWorld),
          cameraNear: camera.near,
          cameraFar: camera.far
        });
        const captureScale = Math.min(1, 1024 / Math.max(width, height));
        const captureWidth = Math.max(1, Math.round(width * captureScale));
        const captureHeight = Math.max(1, Math.round(height * captureScale));
        const captureSettings = { ...settings, dofEnabled: false, maxSamples: 1 };
        const captures = [
          {
            name: "tReflectionMap",
            camera: reflectedCamera,
            scene: captureScene,
            background: "transparent",
            clip: [x * side, y * side, z * side, d * side + 0.01]
          },
          {
            name: "tEnvironmentReflectionMap",
            camera: reflectedCamera,
            scene: { ...captureScene, meshes: [] },
            background: "environment"
          },
          {
            name: "tRefractionMap",
            camera,
            scene: captureScene,
            background: "environment",
            clip: [-x * side, -y * side, -z * side, -d * side + 0.01]
          }
        ];
        for (const capture of captures) {
          const renderer = new CpuRasterizer(capture.scene, capture.camera, { ...captureSettings, backgroundMode: capture.background }, captureWidth, captureHeight, environment, { linear: true, clipPlane: capture.clip, aspect: width / height });
          const texture = floatTexture(`${id}:${capture.name}`, captureWidth, captureHeight);
          texture.flipY = true;
          texture.nearest = false;
          const depth = capture.name === "tRefractionMap" ? floatTexture(`${id}:tRefractionDepth`, captureWidth, captureHeight) : null;
          if (depth) {
            depth.flipY = true;
            depth.data.fill(1);
          }
          yield* renderer.prepare();
          for (const bucket of renderer.buckets) {
            const result = yield* renderer.renderBucket(bucket);
            for (let y2 = 0; y2 < bucket.height; y2++) {
              texture.data.set(result.linear.subarray(y2 * bucket.width * 4, (y2 + 1) * bucket.width * 4), ((bucket.y + y2) * captureWidth + bucket.x) * 4);
              if (depth)
                for (let x2 = 0; x2 < bucket.width; x2++) {
                  const value = result.depth[y2 * bucket.width + x2];
                  depth.data.set([value, value, value, 1], ((bucket.y + y2) * captureWidth + bucket.x + x2) * 4);
                }
            }
            yield;
          }
          scene.textures.push(texture);
          material.shader.uniforms[capture.name] = { texture: texture.id };
          if (depth) {
            scene.textures.push(depth);
            material.shader.uniforms.tRefractionDepth = { texture: depth.id };
          }
        }
      }
    }
    return scene;
  }
};

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/denoise.js
var AOV_STRIDE = 15;
var ITERATIONS = 5;
var KERNEL = [1 / 16, 1 / 4, 3 / 8, 1 / 4, 1 / 16];
var SIGMA_DEPTH = 1;
var SIGMA_LUMINANCE = 4;
var luminance2 = (data, i) => data[i * 3] * 0.2126 + data[i * 3 + 1] * 0.7152 + data[i * 3 + 2] * 0.0722;
function allocateFrameAov(width, height) {
  const count = width * height;
  return {
    width,
    height,
    color: sharedFloat32(count * 4),
    modulation: sharedFloat32(count * 3),
    indirect: sharedFloat32(count * 3),
    normal: sharedFloat32(count * 3),
    depth: sharedFloat32(count),
    variance: sharedFloat32(count)
  };
}
function packBucketAov(aov, bucket) {
  const out = new Float32Array(bucket.width * bucket.height * AOV_STRIDE);
  let cursor = 0;
  for (let y = 0; y < bucket.height; y++)
    for (let x = 0; x < bucket.width; x++) {
      const i = (bucket.y + y) * aov.width + bucket.x + x;
      out.set(aov.color.subarray(i * 4, i * 4 + 4), cursor);
      out.set(aov.modulation.subarray(i * 3, i * 3 + 3), cursor + 4);
      out.set(aov.indirect.subarray(i * 3, i * 3 + 3), cursor + 7);
      out.set(aov.normal.subarray(i * 3, i * 3 + 3), cursor + 10);
      out[cursor + 13] = aov.depth[i];
      out[cursor + 14] = aov.variance[i];
      cursor += AOV_STRIDE;
    }
  return out;
}
function unpackBucketAov(aov, bucket, data) {
  let cursor = 0;
  for (let y = 0; y < bucket.height; y++)
    for (let x = 0; x < bucket.width; x++) {
      const i = (bucket.y + y) * aov.width + bucket.x + x;
      aov.color.set(data.subarray(cursor, cursor + 4), i * 4);
      aov.modulation.set(data.subarray(cursor + 4, cursor + 7), i * 3);
      aov.indirect.set(data.subarray(cursor + 7, cursor + 10), i * 3);
      aov.normal.set(data.subarray(cursor + 10, cursor + 13), i * 3);
      aov.depth[i] = data[cursor + 13];
      aov.variance[i] = data[cursor + 14];
      cursor += AOV_STRIDE;
    }
}
function normalWeight(c) {
  if (c <= 0)
    return 0;
  let v = c * c;
  v *= v;
  v *= v;
  v *= v;
  v *= v;
  v *= v;
  return v;
}
function* denoiseIndirect(aov, correlation = 0) {
  const { width, height, depth, normal } = aov, count = width * height;
  let color = Float32Array.from(aov.indirect), variance = Float32Array.from(aov.variance);
  let outColor = new Float32Array(count * 3), outVariance = new Float32Array(count);
  const gradient = new Float32Array(count);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const i = y * width + x, z = depth[i];
      if (!(z > 0))
        continue;
      let g = 0;
      for (const j of [i - 1, i + 1, i - width, i + width]) {
        if (j < 0 || j >= count || !(depth[j] > 0))
          continue;
        if (j === i - 1 && x === 0 || j === i + 1 && x === width - 1)
          continue;
        g = Math.max(g, Math.abs(z - depth[j]));
      }
      gradient[i] = g;
    }
  let lastYield = performance.now();
  for (let iteration = 0; iteration < ITERATIONS; iteration++) {
    const step = 1 << iteration, independent = step >= correlation;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x, z = depth[i];
        if (!(z > 0)) {
          outColor[i * 3] = color[i * 3];
          outColor[i * 3 + 1] = color[i * 3 + 1];
          outColor[i * 3 + 2] = color[i * 3 + 2];
          outVariance[i] = variance[i];
          continue;
        }
        let local = 0, localWeight = 0;
        for (let dy = -1; dy <= 1; dy++) {
          const yy = y + dy;
          if (yy < 0 || yy >= height)
            continue;
          for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx;
            if (xx < 0 || xx >= width)
              continue;
            const j = yy * width + xx;
            if (!(depth[j] > 0))
              continue;
            const w = (dx === 0 ? 0.5 : 0.25) * (dy === 0 ? 0.5 : 0.25);
            local += variance[j] * w;
            localWeight += w;
          }
        }
        const sigma = SIGMA_LUMINANCE * Math.sqrt(localWeight > 0 ? local / localWeight : variance[i]) + 1e-4;
        const l = luminance2(color, i), nx = normal[i * 3], ny = normal[i * 3 + 1], nz = normal[i * 3 + 2];
        const slope = gradient[i];
        let sumW = 0, r = 0, g = 0, b = 0, v = 0;
        for (let ky = -2; ky <= 2; ky++) {
          const yy = y + ky * step;
          if (yy < 0 || yy >= height)
            continue;
          for (let kx = -2; kx <= 2; kx++) {
            const xx = x + kx * step;
            if (xx < 0 || xx >= width)
              continue;
            const j = yy * width + xx, zj = depth[j];
            if (!(zj > 0))
              continue;
            const h = KERNEL[ky + 2] * KERNEL[kx + 2];
            const wn = normalWeight(nx * normal[j * 3] + ny * normal[j * 3 + 1] + nz * normal[j * 3 + 2]);
            const wz = Math.exp(-Math.abs(z - zj) / (SIGMA_DEPTH * slope * (Math.abs(kx) + Math.abs(ky)) * step + 1e-3 * z + 1e-6));
            const wl = Math.exp(-Math.abs(l - luminance2(color, j)) / sigma);
            const w = h * wn * wz * wl;
            sumW += w;
            r += color[j * 3] * w;
            g += color[j * 3 + 1] * w;
            b += color[j * 3 + 2] * w;
            v += variance[j] * (independent ? w * w : w);
          }
        }
        outColor[i * 3] = r / sumW;
        outColor[i * 3 + 1] = g / sumW;
        outColor[i * 3 + 2] = b / sumW;
        outVariance[i] = independent ? v / (sumW * sumW) : v / sumW;
      }
      if (performance.now() - lastYield > 8) {
        yield;
        lastYield = performance.now();
      }
    }
    [color, outColor] = [outColor, color];
    [variance, outVariance] = [outVariance, variance];
  }
  return color;
}

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/workerHost.js
function createWorkerHost(transport) {
  let revision = 0;
  let settings = null;
  let scene = null;
  let pipeline = null;
  let environment = null;
  let skyCache = null;
  let size2 = {
    width: 1,
    height: 1,
    pixelRatio: 1
  }, camera = null;
  let timer;
  let job = null;
  let renderer = null;
  let bucketsByIndex = /* @__PURE__ */ new Map();
  let queue = [];
  let paused = false, disposed = false;
  let publishPrepared = false;
  let environmentAbort = null;
  function post(message, transfer = []) {
    transport.post(message, transfer);
  }
  function cancel() {
    clearTimeout(timer);
    job = null;
    renderer = null;
    queue = [];
  }
  function fail(error2) {
    cancel();
    post({
      type: "error",
      revision,
      message: error2 instanceof Error ? error2.message : String(error2)
    });
  }
  function pump() {
    if (paused || disposed)
      return;
    try {
      const deadline = performance.now() + 8;
      while (performance.now() < deadline) {
        if (!job) {
          if (!renderer || !queue.length)
            return;
          job = renderBucket(renderer, queue.shift(), revision);
        }
        if (job.next().done)
          job = null;
      }
      timer = setTimeout(pump, 0);
    } catch (error2) {
      fail(error2);
    }
  }
  function start(ready, frameRevision) {
    renderer = ready;
    bucketsByIndex = new Map(ready.buckets.map((bucket) => [bucket.index, bucket]));
    post({
      type: "start",
      revision: frameRevision,
      width: ready.width,
      height: ready.height,
      order: ready.buckets.map((bucket) => bucket.index),
      denoise: Boolean(ready.frameAov),
      prepass: ready.irradianceGrid ? CpuRasterizer.prepassJobs(ready.width, ready.height, ready.settings.giCacheSpacing ?? 4).map((level) => level.length) : []
    });
  }
  function withoutComputeSnapshots(source) {
    const copies = /* @__PURE__ */ new Map();
    const meshes = source.meshes.map((mesh) => ({ ...mesh, materials: mesh.materials.map((material) => {
      let copy2 = copies.get(material);
      if (!copy2) {
        copy2 = material.compute?.snapshot ? { ...material, compute: { ...material.compute, snapshot: null } } : material;
        copies.set(material, copy2);
      }
      return copy2;
    }) }));
    return { ...source, meshes };
  }
  function* prepare(base, frameRevision) {
    let lighting = base.environment;
    if (base.scene.sky) {
      const key = JSON.stringify(base.scene.sky);
      if (skyCache?.key !== key) {
        const atmosphere = yield* CpuEnvironment.fromProcedural(base.scene.sky);
        skyCache = { key, environment: atmosphere };
      }
      lighting = skyCache.environment;
    }
    const prepared = yield* pipeline.prepare(base.camera, base.settings, base.width, base.height, lighting);
    const ready = new CpuRasterizer(prepared, base.camera, base.settings, base.width, base.height, lighting);
    yield* ready.prepare();
    const aov = base.settings.globalIllumination && base.settings.giDenoise ? allocateFrameAov(base.width, base.height) : void 0;
    if (aov)
      ready.attachAov(aov);
    const grid = ready.usesCache ? allocateIrradianceGrid(base.width, base.height, base.settings.giCacheSpacing ?? 4) : void 0;
    if (grid)
      ready.attachIrradianceGrid(grid);
    if (publishPrepared) {
      const frame2 = {
        scene: withoutComputeSnapshots(prepared),
        camera: base.camera,
        settings: base.settings,
        width: base.width,
        height: base.height,
        environment: lighting.snapshot(),
        geometry: ready.preparedGeometry,
        aov,
        grid
      };
      post({ type: "prepared", revision: frameRevision, frame: frame2 });
    }
    start(ready, frameRevision);
  }
  function* adopt(frame2, frameRevision) {
    const ready = new CpuRasterizer(frame2.scene, frame2.camera, frame2.settings, frame2.width, frame2.height, CpuEnvironment.fromSnapshot(frame2.environment), {}, frame2.geometry);
    yield* ready.prepare();
    if (frame2.aov)
      ready.attachAov(frame2.aov);
    if (frame2.grid)
      ready.attachIrradianceGrid(frame2.grid);
    start(ready, frameRevision);
  }
  function* denoise(target, frameRevision, slices) {
    const aov = target.frameAov;
    if (!aov)
      return;
    for (const slice of slices)
      unpackBucketAov(aov, slice.bucket, slice.data);
    const filtered = yield* denoiseIndirect(aov, target.noiseCorrelation);
    const whole = { x: 0, y: 0, width: aov.width, height: aov.height, index: -1 };
    yield* target.resolveDenoised(filtered, (row, pixels) => {
      const copy2 = new Uint8ClampedArray(pixels);
      post({ type: "pixels", revision: frameRevision, bucket: whole, row, pixels: copy2 }, [copy2.buffer]);
    });
    post({ type: "denoised", revision: frameRevision });
  }
  const PROGRESS_INTERVAL_MS = 30;
  function* renderBucket(target, request, frameRevision) {
    let bucket;
    if (request.phase === "cache") {
      const job2 = target.prepassJob(request.bucket);
      bucket = { x: 0, y: job2.y, width: target.width, height: job2.height, index: -1 };
    } else
      bucket = bucketsByIndex.get(request.bucket);
    if (!bucket)
      throw new Error("CPU renderer: unknown bucket index.");
    if (request.phase !== "cache")
      post({
        type: "active",
        revision: frameRevision,
        bucket
      });
    let lastPost = performance.now(), firstRow = -1, lastRow = -1, latest = null;
    const flush = () => {
      if (firstRow < 0 || !latest)
        return;
      const rows = latest.slice(firstRow * bucket.width * 4, (lastRow + 1) * bucket.width * 4);
      post({
        type: "pixels",
        revision: frameRevision,
        bucket,
        row: firstRow,
        pixels: rows
      }, [rows.buffer]);
      firstRow = lastRow = -1;
    };
    const progress = (live, pixel) => {
      const row = Math.floor(pixel / bucket.width);
      latest = live;
      if (firstRow < 0 || row < firstRow)
        firstRow = row;
      if (row > lastRow)
        lastRow = row;
      const now = performance.now();
      if (now - lastPost < PROGRESS_INTERVAL_MS)
        return;
      lastPost = now;
      flush();
    };
    if (request.phase === "cache") {
      const written = yield* target.cachePrepass(request.bucket, progress);
      flush();
      const cells = !publishPrepared || shareable() ? void 0 : target.irradianceGrid.exportCells(written);
      post({ type: "cached", revision: frameRevision, job: request.bucket, cells }, cells ? [cells.buffer] : []);
      return;
    }
    const result = yield* target.renderBucket(bucket, progress);
    const pixels = new Uint8ClampedArray(result.pixels);
    const aov = target.frameAov && publishPrepared && !shareable() ? packBucketAov(target.frameAov, bucket) : void 0;
    post({
      type: "bucket",
      revision: frameRevision,
      bucket,
      pixels,
      aov
    }, aov ? [pixels.buffer, aov.buffer] : [pixels.buffer]);
  }
  function restart() {
    cancel();
    if (!settings || !scene || !camera || !environment || disposed)
      return;
    timer = setTimeout(() => {
      try {
        const width = Math.max(1, Math.floor(size2.width * size2.pixelRatio * settings.renderScale));
        const height = Math.max(1, Math.floor(size2.height * size2.pixelRatio * settings.renderScale));
        job = prepare(new CpuRasterizer(scene, camera, settings, width, height, environment), revision);
        pump();
      } catch (error2) {
        fail(error2);
      }
    }, 60);
  }
  async function loadEnvironment(descriptor) {
    environmentAbort?.abort();
    const controller = new AbortController();
    environmentAbort = controller;
    environment = null;
    restart();
    try {
      const loaded = await CpuEnvironment.load(descriptor, controller.signal);
      if (controller.signal.aborted || disposed)
        return;
      environment = loaded;
      restart();
    } catch (error2) {
      if (!controller.signal.aborted && !disposed)
        fail(error2);
    }
  }
  return (request) => {
    if (disposed)
      return;
    try {
      if (!["render", "pause", "dispose"].includes(request.type))
        revision = request.revision;
      switch (request.type) {
        case "frame":
          publishPrepared = request.publishPrepared;
          size2 = { width: request.width, height: request.height, pixelRatio: request.pixelRatio };
          settings = request.settings;
          camera = request.camera;
          if (request.scene) {
            scene = request.scene;
            pipeline = new CpuScenePipeline(scene);
          }
          if (request.environment)
            void loadEnvironment(request.environment);
          else
            restart();
          break;
        case "adopt":
          cancel();
          job = adopt(request.frame, revision);
          pump();
          break;
        case "reset":
          cancel();
          break;
        case "render":
          if (request.revision !== revision || !renderer)
            break;
          queue.push(request);
          pump();
          break;
        case "records":
          if (request.revision === revision)
            renderer?.irradianceGrid?.importCells(request.cells);
          break;
        case "denoise":
          if (request.revision !== revision || !renderer)
            break;
          job = denoise(renderer, revision, request.slices);
          pump();
          break;
        case "pause":
          paused = request.paused;
          if (paused)
            clearTimeout(timer);
          else
            pump();
          break;
        case "dispose":
          disposed = true;
          cancel();
          environmentAbort?.abort();
          scene = null;
          pipeline = null;
          environment = null;
          skyCache = null;
          transport.close();
          break;
      }
    } catch (error2) {
      fail(error2);
    }
  };
}

// ../../../../../tmp/one-phase-cpu-render/@tinypoly-cpu-renderer/package/dist/worker.js
var handle = createWorkerHost({
  post: (message, transfer) => self.postMessage(message, transfer),
  close: () => self.close()
});
self.onmessage = (event) => handle(event.data);
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
