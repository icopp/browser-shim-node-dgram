# browser-shim-node-dgram

A browser shim for Node's `dgram`.

## Support

* Chrome, but only extensions and apps with appropriate permissions. See [https://developer.chrome.com/apps/manifest/sockets](chrome.sockets.tcp manifest requirements).
* Firefox, but only with applicable experimental builds and permissions.

Functionality that is impossible on a given platform (rather than merely encountering network errors) will raise an Error.

## Usage

In ES5:

```
var dgram = require('browser-shim-node-dgram')
```

In ES6:

```js
import dgram from 'browser-shim-node-dgram'
```
