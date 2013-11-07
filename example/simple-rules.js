/* forall a fn. */
/* module(a, fn) */
/* describe(a, fn) */

/* forall a. */
/* setup(a) */
/* beforeEach(a) */

/* forall a. */
/* teardown(a) */
/* afterEach(a) */

/* forall a fn. */
/* test(a, fn) */
/* it(a, fn) */

/* forall actual message. */
/* ok(actual, message) */
/* expect(actual).toBeTruthy(); */

/* forall actual expected message. */
/* equal(actual, expected) */
/* expect(actual).toEqual(expected); */


module("module A", function a() {
    setup(function () {
        this.myValue = 1
    });
    teardown(function () {
    });
    test("test 1", function () {
        ok(true, "should be true");
    });
    test("equal", function () {
        equal(this.myValue, 1);
    });
});