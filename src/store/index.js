import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      neuralNetwork: {
        centerX: 1024,
        centerY: 140,
        scale: 1,
        nodes: [],
        links: []
      }
    };
  },
  getters: {
    getNeuralNetwork(state) {
      return state.neuralNetwork;
    }
  },
  mutations: {
    addLayer(state, layer) {
      state.neuralNetwork.nodes.push(layer);
    },
    changeLayerName(state, data) {
      state.neuralNetwork.nodes.forEach(node => {
        console.log(node);
        if (node.id === data.id) {
          node.label = data.name;
          console.log(node);
        }
      })
    },
    deleteLayer(state, id) {
      state.neuralNetwork.nodes = state.neuralNetwork.nodes.filter(node => node.id !== id);
    },
    addPath(state, path) {
      state.neuralNetwork.links.push(path);
    },
    deletePath(state, id) {
      state.neuralNetwork.links = state.neuralNetwork.links.filter(link => link.id !== id);
    }

  },
})
