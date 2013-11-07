module("module A", {
    setup: function () {
        this.myValue = 1;
    },
    teardown: function () {

    }
});
test("test 1", function () {
    expect(1);
    ok(true, "should be true");
});
test("ok test", function () {
    ok(true, "true succeeds");
    ok("non-empty", "non-empty string succeeds");
    ok(false, "false fails");
    ok(0, "0 fails");
    ok(NaN, "NaN fails");
    ok("", "empty string fails");
    ok(null, "null fails");
    ok(undefined, "undefined fails");
});
test("equal", function () {
    equal(this.myValue, 1);
    equal(0, 0, "Zero; equal succeeds");
    equal("", 0, "Empty, Zero; equal succeeds");
    equal("", "", "Empty, Empty; equal succeeds");
    equal(0, 0, "Zero, Zero; equal succeeds");
    equal(null, false, "null, false; equal fails");
});
test("deepEqual test", function () {
    var obj = { foo: "bar" };
    deepEqual(obj, { foo: "bar" }, "Two objects can be the same in value");
    deepEqual(obj, { foo: "bar" });
});
test("strictEqual test", function () {
    strictEqual(1, 1, "1 and 1 are the same value and type");
});
test("notDeepEqual test", function () {
    var obj = { foo: "bar" };
    notDeepEqual(obj, { foo: "bla" }, "Different object, same key, different value, not equal");
});
test("a test", function () {
    notStrictEqual(1, "1", "String '1' and number 1 don't have the same value");
});
test("throws", function () {
    function CustomError(message) {
        this.message = message;
    }

    CustomError.prototype.toString = function () {
        return this.message;
    };
    throws(
        function () {
            throw "error"
        },
        "throws with just a message, no expected"
    );
    throws(
        function () {
            throw new CustomError();
        },
        CustomError,
        "raised error is an instance of CustomError"
    );
    throws(
        function () {
            throw new CustomError("some error description");
        },
        /description/,
        "raised error message contains 'description'"
    );
});