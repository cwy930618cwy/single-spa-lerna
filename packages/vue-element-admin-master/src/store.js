const debug = process.env.NODE_ENV !== 'production'
export const store = {
  state: {
    count: 0
  },
  mutations: {
    incrementCount (state) {
      console.log('wokao---', state.count)
      state.count++
    }
  },
  getters: {
    getCount: state => {
      return state.count
    }
  }
}