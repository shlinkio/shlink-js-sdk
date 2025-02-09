# API version compatibility

This SDK will fulfill [Semantic Versioning](https://semver.org/), and every version of this SDK will support all Shlink versions released in the previous ~2 years.

From time to time, major versions of this SDK may drop support for some older Shlink versions, affecting definitions of some of the API contract types.

In order to keep backwards compatibility between minor releases, new response payload properties introduced by new Shlink API versions, will be defined as optional (`foo?: string`), so that it's clear that for older versions still supported by the SDK, those may not come present.

On the other hand, new endpoints will be supported in the form of new public methods in `ShlinkApiClient`. If you try to use those with an old Shlink version which did not implement them yet, you will get an error.
