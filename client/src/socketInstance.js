import io from "socket.io-client";

export function init_socket() {
  return io("http://localhost:5500");
}
