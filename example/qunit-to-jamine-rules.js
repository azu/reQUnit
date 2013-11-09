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

/* forall a amount fn. */
/* test(a,amount, fn) */
/* it(a, fn) */

// ======= assertion ==================
// QUnit expect is not support...
/* forall amount. */
/* expect(amount); */
/* Number(amount); */

/* forall actual message. */
/* ok(actual, message) */
/* expect(!!actual).toBeTruthy(); */

// == equal

/* forall actual expected message. */
/* equal(actual, expected, message) */
/* expect(actual).toEqual(expected); */

/* forall actual expected message. */
/* notEqual(actual, expected, message) */
/* expect(actual).not.toEqual(expected); */

// == StrictEqual

/* forall actual expected message. */
/* strictEqual(actual, expected, message) */
/* expect(actual).toBe(expected); */

/* forall actual expected message. */
/* notStrictEqual(actual, expected, message) */
/* expect(actual).not.toBe(expected); */


// == deepEqual

/* forall actual expected message. */
/* deepEqual(actual, expected, message) */
/* expect(actual).toEqual(expected); */

/* forall actual expected message. */
/* notDeepEqual(actual, expected, message) */
/* expect(actual).not.toEqual(expected); */

// == throws

/* forall block expected message. */
/* throws( block, expected, message ) */
/* expect(block).toThrow(); */