import S from "./types"

const state = (): S => ({
  lastEmail: null,
  authorized: false,
	user: {}
})

export default state;