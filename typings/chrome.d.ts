declare namespace chrome.sockets.udp {
  /**
   * Enables or disables broadcast packets on this socket.
   * @since Chrome 44
   */
  export function setBroadcast(socketId: number, enabled: boolean, callback?: (result: number) => void): void
}