# sbrm - scoped bound resource management

lisp has the `with` pattern which is also present in python.
c++ has RAII (resource acquisition is instantiation).

there are 2 versions:

- scoped

```js
scope(
  () => new $class(),
  (instance) => instance.release()
)(
  (instance) => { /* use the instance */ }
);
```

- scopedClass

```js
class A {
  // acquire the object
  static acquire() { return new A; }
  // release object
  static release(i) { i.release(); }

  constructor() { /* acquire resources */ }
  work() { return 1; }
  release() { /* release stuff */ };
}

scopedClass(A)(
  (instance) => { /* use the instance */ }
);
```
