<template>
  <div class="neural-network" ref="neural" @click="editLayer">
    <div class="aside-panel">
      <button @click="$router.push('/')">
        <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </button>
      <button @click.once="addLayer('input')" ref="inputBtn">
        <span class="add-input add-layer">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </span>
      </button>
      <button @click="addLayer('inner')">
        <span class="add-inner add-layer">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </span>
      </button>
      <button @click.once="addLayer('output')" ref="outputBtn">
        <span class="add-output add-layer">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="neural-network__view" >
      <simple-flowchart class="svg" height="100%" :scene.sync="data"
        @nodeClick="nodeClick"
        @nodeDelete="deleteLayer"
        @linkBreak="deletePath"
        @linkAdded="addPath"
      ></simple-flowchart>
    </div>
    <div class="change-layer__name"
      v-if="changeLayerName !== false"
      :style="`top: ${changeLayerName.top}px; left: ${changeLayerName.left}px`">
      <input type="text" placeholder="Введите название"
        @keyup.enter="changeLayer"
        v-model="newName">
    </div>
  </div>
</template>

<script>
import SimpleFlowchart from "vue-simple-flowchart/src/components/SimpleFlowchart.vue";
import "vue-simple-flowchart/dist/vue-flowchart.css";

export default {
  components: {
    "simple-flowchart": SimpleFlowchart
  },
  data() {
    return {
      data: this.$store.getters.getNeuralNetwork,
      idLayerForEdit: null,
      changeLayerName: false,
      newName: '',
    };
  },
  methods: {
    addLayer(type) {
      this.$refs?.[type + "Btn"]?.classList?.add("disabled");
      const layer = {
        id: Math.random(),
        x: -300,
        y: 250,
        type,
        label: 'test'
      };
      this.$store.commit('addLayer', layer);
    },
    nodeClick(id) {
      this.idLayerForEdit = id;
    },
    editLayer(e) {
      if (e.target.classList.contains('flowchart-node')) {
        if (!!this.changeLayerName) {
          return this.changeLayerName = false;
        }
        this.changeLayerName = e.target.querySelector('.node-label').getBoundingClientRect();
      }
    },
    changeLayer() {
      const data = {
        id: this.idLayerForEdit,
        name: this.newName.trim()
      }
      this.data.nodes.forEach(node => {
        if (node.id == data.id) {
          node.label = data.name
        }
      })
      this.$store.commit('changeLayerName', data);
      this.changeLayerName = false;
    },
    deleteLayer(id) {
      this.$store.commit('deleteLayer', id);
    },
    deletePath(id) {
      this.$store.commit('deletePath', id);
    },
    addPath(path) {
      this.$store.commit('addPath', path);
    },
    deleteLayer(id) {
      this.$store.commit('deleteLayer', id);
    }
  },

};
</script>

nodeDelete: испускать при удалении узла, event = nodeID
linkBreak: генерировать, когда выбранная ссылка удалена, event = {id, from, to} (объект удаленной ссылки)
linkAdded: генерировать при добавлении новой ссылки, event = {id, from, to} (новый объект ссылки)

<style></style>
