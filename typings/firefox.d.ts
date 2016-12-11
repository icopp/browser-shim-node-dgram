
/**
 * Expand Navigator definition with the socket APIs
 */
interface Navigator {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Mozilla/B2G_OS/API/TPC_Socket_API
   * @requires FirefoxOS
   */
  mozTCPSocket: navigator.TCPSocket

  /**
   * @requires FirefoxOS
   */
  mozUDPSocket: navigator.UDPSocket
}

declare namespace navigator {
  interface TCPSocketEvent {
    /** The TCPSocket object which fired the event. */
    target: TCPSocket

    /** A string defining the type of the event. */
    type: 'open' | 'error' | 'data' | 'drain' | 'close'

    /** The data related to the event, if any. */
    data?: any
  }

  interface TCPSocketEventData extends TCPSocketEvent {
    data: string | ArrayBuffer
  }

  interface TCPSocketEventError extends TCPSocketEvent {
    data: string
  }

  interface TCPSocketEventConnect extends TCPSocketEvent {
    data: TCPSocket
  }

  /**
   * The TCPSocket interface provides access to a raw TCP socket.
   *
   * The main entry point for this API is the navigator.mozTCPSocket property
   * which is a TCPSocket object.
   *
   * @requires FirefoxOS
   */
  export interface TCPSocket {
    /** A string representing the host name of the server the socket is connected to. */
    readonly host: string

    /** A number representing the port the socket is connected to. */
    readonly port: number

    /** A boolean indicating whether the socket is encrypted with SSL (true) or not (false). */
    readonly ssl: boolean

    /** The number of bytes of not-yet-sent data in the socket buffered. */
    readonly bufferedAmount: number

    /** The type of data used. Possible value is arraybuffer or string. */
    readonly binaryType: 'string' | 'arraybuffer'

    /** The socket state. */
    readonly readyState: 'connecting' | 'open' | 'closing' | 'closed'

    /** A handler for the open event. After this event, the socket is ready to send and receive data. */
    onopen?: (event: TCPSocketEvent) => void

    /** A handler for the drain event. This event is triggered each time the buffer of data is flushed. */
    ondrain?: (event: TCPSocketEvent) => void

    /** A handler for the error event. */
    ondata?: (event: TCPSocketEventData) => void

    /** A handler for the data event. This event is triggered each time data has been received. */
    onerror?: (event: TCPSocketEvent) => void

    /** A handler for the close event. */
    onclose?: (event: TCPSocketEvent) => void

    /**
     * Returns a new TCPSocket object connected to the given host at the given port.
     * @param host A string representing the host name of the server to connect
     *             to.
     * @param port A number representing the port to connect to.
     * @param useSSL Use the value to create an SSL socket. Defaults to false.
     * @param binaryType A string with the value string (default) or
     *                   arraybuffer. If the latter is used the argument for the
     *                   send() method must be an ArrayBuffer and the data
     *                   received from the server will be available as an
     *                   ArrayBuffer. Otherwise, a string is expected.
     * @version Firefox 1.0.1
     */
    open(host: string, port: number, options?: {useSSL?: boolean, binaryType?: 'string' | 'ArrayBuffer'}): TCPSocket

    /**
     * Returns a new TCPSocket object connected to the given host at the given port.
     * @param host A string representing the host name of the server to connect
     *             to.
     * @param port A number representing the port to connect to.
     * @param useSecureTransport Use the value to create an SSL socket. Defaults
     *                           to false.
     * @param binaryType A string with the value string (default) or
     *                   arraybuffer. If the latter is used the argument for the
     *                   send() method must be an ArrayBuffer and the data
     *                   received from the server will be available as an
     *                   ArrayBuffer. Otherwise, a string is expected.
     * @version Firefox 1.0.2
     */
    open(host: string, port: number, options?: {useSecureTransport?: boolean, binaryType?: 'string' | 'ArrayBuffer'}): TCPSocket

    /**
     * Returns a new TCPServerSocket object listening at the given port.
     * @param port A number representing the port the server socket is listening
     *             on. Pass -1 to indicate no preference, and a port will be
     *             selected automatically.
     * @param options.binaryType A string with the value string (default) or
     *                           arraybuffer. If the latter is used, the
     *                           argument for the send() method must be an
     *                           ArrayBuffer and the data received from the
     *                           server will be available as an ArrayBuffer.
     *                           Otherwise, a string is expected.
     * @param backlog A number representing the maximum length the queue of
     *                pending connections may grow to. This parameter may be
     *                silently limited by the operating system. Pass -1 to use
     *                the default value.
     * @since FirefoxOS 1.2
     */
    listen(port: number, options?: {binaryType: 'string' | 'ArrayBuffer'}, backlog?: number): TCPServerSocket

    /**
     * Enables secure on channel.
     * @requires FirefoxOS
     * @since FirefoxOS 1.2
     */
    upgradeToSecure(): void

    /** Pauses the data events. */
    suspend(): void

    /** Resumes the data events. */
    resume(): void

    /** Closes the connection. */
    close(): void

    /**
     * Buffers data to be sent across the network.
     * @param data The data to write to the socket. Depending on the binaryType
     *             option passed to the open() method, it will be a string or an
     *             ArrayBuffer.
     * @param byteOffset The offset within the data from which to begin writing.
     *                   Only relevant for ArrayBuffer data.
     * @param byteLength The number of bytes to write. Only relevant for
     *                   ArrayBuffer data.
     * @param returns It returns a boolean as a hint to the caller that they may
     *                either continue sending more data immediately, or may want
     *                to wait until the other side has read some of the data
     *                which has already been written to the socket before
     *                buffering more.
     */
    send(data: string | ArrayBuffer, byteOffset?: number, byteLength?: number): boolean
  }

  /**
   * The TCPServerSocket interface provides an API to handle a persistent server
   * that will listen for incoming connections on a given port.
   * @requires FirefoxOS
   */
  export interface TCPServerSocket {
    /** The localPort property returns the port number listened to by the server socket. */
    readonly localPort: number

    /**
     * The onconnect property is used to specify a callback handler to deal with
     * new incoming connections. This callback is called each time a client
     * connection is accepted.
     *
     * The data attribute of the event object passed to the onconnect handler is
     * a TCPSocket instance, which is used for communication between client and
     * server.
     */
    onconnect: (event: TCPSocketEventConnect) => void

    /**
     * The onerror property is used to specify a callback handler to deal with
     * errors from the server socket. This callback is called each time the
     * listen of a server socket is aborted.
     *
     * The data attribute of the event object passed to the onerror handler is a
     * string describing the error.
     */
    onerror: (event: TCPSocketEventError) => void

    /**
     * The close method cleanly closes the server socket.
     *
     * When the server is closed, no new incoming connections are allowed.
     * However, currently open connections are still alive as long as they are
     * not closed by themselves.
     */
    close(): void
  }

  /**
   * @requires FirefoxOS
   */
  export interface UDPSocket {
    onmessage: (event: Event) => void
    send(message: string, address: string, port: number): void
  }
}
