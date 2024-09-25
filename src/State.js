import { proxy, useSnapshot } from "valtio"

// we can use some textures too here in valtio ( with some extra setup )
const State = proxy({
    current: null,
    items: {
      laces: "#ffffff",
      mesh: "#ffffff",
      caps: "#ffffff",
      inner: "#ffffff",
      sole: "#ffffff",
      stripes: "#ffffff",
      band: "#ffffff",
      patch: "#ffffff",
    },
  })
  
  export default State;