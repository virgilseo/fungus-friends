import axios from 'axios'
import { ActionContext } from 'vuex'

type State = {
  loading: boolean,
  error: boolean,
  imageSrc: string
}

export const infoBox = {
  namespaced: true,
  state: () => ({
    loading: false,
    error: false,
    imageSrc: ''
  }),
  getters: {
    getLoading (state: State) {
      return state.loading
    },
    getError (state: State) {
      return state.error
    },
    getImage (state: State) {
      return state.imageSrc
    }
  },
  mutations: {
    setError (state: State, payload: boolean) {
      state.error = payload
    },
    setLoading (state: State, payload: boolean) {
      state.loading = payload
    },
    setImage (state: State, response: string) {
      state.imageSrc = response
    }
  },
  actions: {
    // Get image from unsplash API
    requestImage ({ commit, state }: ActionContext<State, unknown>) {
      commit('setError', false)
      commit('setLoading', true)

      axios.get('https://api.unsplash.com/photos/random?count=1&query=mushroom&orientation=squarish', {
        headers: {
          Authorization: 'Client-ID 7rZFWXk7l3u4QBzMxe4xrHDY1gU0aKicfwkqjQ7G_zc'
        }
      })
        .then((response: any) => {
          commit('setImage', response.data[0].urls.thumb)
        })
        .catch((error) => {
          console.log(error)
          commit('setError', true)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
  }
}
