const debug = process.env.NODE_ENV !== 'production'
export const store = {
  state: {
    age: 0
  },
  mutations: {
    incrementAge (state) {
      state.age++
    }
  }
}