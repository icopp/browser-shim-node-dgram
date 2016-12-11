# browser-shim-node-dgram

A browser shim for Node's `dgram`.

## Usage

In ES5:

```
var dgram = require('browser-shim-node-dgram')
```

In ES6:

```js
import dgram from 'browser-shim-node-dgram'
```

## Support

In Chrome, a [manifest entry](https://developer.chrome.com/apps/manifest/sockets) is required for any socket-related functions to work.

### createSocket

Supported on all platforms.

Note that these parameters are ignored in Chrome: `options.type` or `type`, `options.reuseAddr`.

### Socket#addMembership

Supported on Chrome >= 33.

### Socket#address

Supported on all platforms that support Socket#bind.

### Socket#bind

Supported on Chrome >= 33. Note that the `options.exclusive` parameter is ignored if supplied.

### Socket#close

Supported on Chrome >= 33.

### Socket#dropMembership

Supported on Chrome >= 33.

### Socket#send

Supported on Chrome >= 33.

### Socket#setBroadcast

Supported on Chrome >= 44.

### Socket#setMulticastLoopback

Supported on Chrome >= 33.

### Socket#setMulticastTTL

Supported on Chrome >= 33.

### Socket#setTTL

Not supported on any platforms.

### Socket#ref

Not supported on any platforms.

### Socket#unref

Not supported on any platforms.
