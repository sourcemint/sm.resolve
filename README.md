**Status: DEV**

sm.resolve
==========

Within any runtime context, given an internal or external **Module URI**, find the path to the *Module Source* and *Containing Package*.


API
===

    const resolve = require("sm.resolve").for(module);

resolve()
---------

    var info = resolve($PackageUri, $ModuleUri);
    console.log(info);

**NOTE:** The `resolve` method is *synchronous* as it should be abstracted/optimized away before the code hits the runtime by pre-loading any referenced dependencies. For resolving optional dependencies use `resolve.async()`.

resolve.async()
---------------

    resolve.async($PackageUri, $ModuleUri).then(function info() {
      console.log(info);
    });


resolve.on("<event>", function handler() {})
--------------------------------------------

  * `resolve` - () - triggered before a resolve occurs. Can return info and bypass resolve.
  * `resolved` - triggered after a resolve occured.



Use Cases
=========

NodeJS
------

Given:

  * `/package.json`
  * `/some/module.js`
  * `/some/package.json`
  * `/some/other/module.js`

And running `/some/module.js` from *CWD: /*:

	require("sm.resolve")(module)("", other/module.js");

Will yield:

	{
		"origin": "/",
		"from": "some/module.js",
		"find": {
      "package": "",
      "module": "other/module.js"
    },
    "found": {
      "package": "some",
      "module": "other/module.js"
    }
	}


Lookup Sequence
===============

  1) **Overrides** are mappings that swap out *Source-Space* implementations in the *Runtime-Space*


  2) **Relative** uris reference *Inside Source-Space* modules.


  3) **Aliased** uris reference *Mapped External Source-Space* modules.


  4) **Global** uris reference *Common Source-Space* modules.


  5) **Fallback** uris reference *Virtual Source-Space* modules.

