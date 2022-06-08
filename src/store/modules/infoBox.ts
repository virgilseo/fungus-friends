import axios from 'axios'
import { ActionContext } from 'vuex'

type State = {
  loading: boolean,
  error: boolean,
  imageSrc: string
}

export const infoBox = {
  namespaced: true,
  state: (): State => ({
    loading: false,
    error: false,
    imageSrc: ''
  }),
  getters: {
    getLoading (state: State): boolean {
      return state.loading
    },
    getError (state: State): boolean {
      return state.error
    },
    getImage (state: State): string {
      return state.imageSrc
    }
  },
  mutations: {
    setError (state: State, payload: boolean): void {
      state.error = payload
    },
    setLoading (state: State, payload: boolean): void {
      state.loading = payload
    },
    setImage (state: State, response: string): void {
      state.imageSrc = response
    }
  },
  actions: {
    // Get image from unsplash API
    requestImage ({ commit }: ActionContext<State, unknown>): void {
      commit('setError', false)
      commit('setLoading', true)

      axios.get('https://api.unsplash.com/photos/random?count=1&query=mushroom&orientation=squarish', {
        headers: {
          Authorization: 'Client-ID 7rZFWXk7l3u4QBzMxe4xrHDY1gU0aKicfwkqjQ7G_zc'
        }
      })
        .then((response) => {
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
