
const ASSERT = require("assert");
const RESOLVE = require("./sm.resolve").for(module);


describe('sm.resolve', function() {

	[
		["org.pinf.lib"],
		["org.pinf.lib@0.1.4"]
	].forEach(function (args) {
		it("resolve: " + args[0], function () {
			var result = RESOLVE(args[0]);
			ASSERT.equal(result.from, "test.js");
			ASSERT.equal(result.origin, __dirname);
			ASSERT.equal(result.found.package, "../../../../../node_modules/org.pinf.lib");
	    });
	});

	[
		["github.com/pinf/org.pinf.lib"],
		["github.com/pinf/org.pinf.lib/0.1.4"],
		["github.com~pinf~org.pinf.lib"],
		["github.com~pinf~org.pinf.lib/0.1.4"],
		["github.com~pinf~org.pinf.lib~0/source/installed/master"],
		[".deps/github.com~pinf~org.pinf.lib~0/source/installed/master"]
	].forEach(function (args) {
		it("resolve: " + args[0], function () {
			ASSERT.equal(RESOLVE(args[0]).found.package, "../../../../github.com~pinf~org.pinf.lib~0/source/installed/master");
	    });
	});

	[
		["org.pinf.lib", "component"],
		["org.pinf.lib", "component.js"],
		["org.pinf.lib", "lib/component"],
		["org.pinf.lib", "lib/component.js"]
	].forEach(function (args) {
		it("resolve: " + args[0] + " : " + args[1], function () {
			ASSERT.equal(RESOLVE(args[0], args[1]).found.package, "../../../../../node_modules/org.pinf.lib");
			ASSERT.equal(RESOLVE(args[0], args[1]).found.module, "lib/component.js");
	    });
	});

});

