const { scoped, scopedClass } = require('./index.js');
const assert = require('assert');

[
  [
    'scope using functions to acquire and release',
    () => {
      let acquirerCalled = false;
      let releaserCalled = false;

      class A {
	constructor() { acquirerCalled = true; }
	work() { return 1; }
	release() { releaserCalled = true; };
      }

      const result = scoped(
	() => { return new A; },
	(i) => { i.release(); }
      )((i) => i.work());

      assert.strictEqual(acquirerCalled, true);
      assert.strictEqual(result, 1);
      assert.strictEqual(releaserCalled, true);
    }
  ],
  [
    'scope a class to acquire and release',
    () => {
      let acquirerCalled = false;
      let releaserCalled = false;

      class A {
	static acquire() { acquirerCalled = true; return new A; }
	static release(i) { i.release(); }
	work() { return 1; }
	release() { releaserCalled = true; };
      }

      const result = scopedClass(A)((i) => i.work());

      assert.strictEqual(acquirerCalled, true);
      assert.strictEqual(result, 1);
      assert.strictEqual(releaserCalled, true);
    }
  ]
].forEach(
  ([title, work]) => {
    console.log(title);
    work();
  }
)
