function scoped(acquire, release) {
  return function(fn) {
    let instance, result = fn(instance = acquire());
    return release(instance), result;
  };
}

module.exports = {
  scoped,
  scopedClass: function scopedClass($class) {
    return scoped(
      function() { return $class.acquire(); },
      function(i) { $class.release(i); }
    );
  }
};
