<template>
  <div class="neural-network">
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
    <div class="neural-network__view">
      <div :class="['layer', layer.type, {'choose-layer': chainCandidate !== false, 'choose-layer__delete': deleteChainCandidate !== false}]"
        draggable="false"
        @mousemove="changePosition($event, layer)"
        @mouseleave="unavailableMove"
        @mousedown="availableMove"
        @mouseup="unavailableMove"
        @click="chainLayer(layer), deletePath(layer)"
        :ref="`layer${layer.id}`"
        v-for="layer in layers"
        :key="layer.id">
        <div class="layer-title">
          <span>{{ layer.type }}</span>
        </div>
        <div class="layer-btns">
          <i class="fa fa-link" aria-hidden="true" @click.stop="startToChain(layer)"></i>
          <i class="fa fa-chain-broken" aria-hidden="true" @click.stop="startToDeleteChain(layer)"></i>
          <i class="fa fa-trash-o" aria-hidden="true" @click="deleteLayer(layer)"></i>
        </div>
      </div>
    </div>
    <svg class="svg" xmlns="http://www.w3.org/2000/svg">
      <path v-for="path in paths" :key="path" :d="createPath(path)" stroke="#fff" fill="transparent" stroke-width="3"/>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      layers: [],
      paths: [],
      top: null,
      left: null,
      chainCandidate: false,
      deleteChainCandidate: false
    };
  },
  methods: {
    availableMove(evt) {
      const layer = evt.target.closest('.layer');
      this.top = evt.pageY - layer.offsetTop
      this.left = evt.pageX - layer.offsetLeft;
    },
    unavailableMove() {
      this.top = null;
      this.left = null;
    },
    changePosition(evt, layerObj) {
      if (this.top) {
        const layer = evt.target.closest('.layer');
        const top = evt.pageY - this.top;
        const left = evt.pageX - this.left;
        layer.style.top = `${top}px`;
        layer.style.left = `${left}px`;
        layerObj.position = layer.getBoundingClientRect();
      }
    },
    addLayer(type) {
      this.$refs?.[type + "Btn"]?.classList?.add("disabled");
      const layer = {
        id: Math.random(),
        type,
        title: "",
        position: null
      };
      this.layers.push(layer);
    },
    startToChain(layer) {
      this.chainCandidate = !this.chainCandidate ? layer: false;
    },
    startToDeleteChain(layer) {
      this.deleteChainCandidate = !this.deleteChainCandidate ? layer : false;
    },
    chainLayer(layer2) {
      if (!this.chainCandidate) return;
      const path = [
        this.chainCandidate,
        layer2
      ]
      this.paths.push(path);
      this.chainCandidate = false;
    },
    deletePath(layer2) {
      if (!this.deleteChainCandidate) return;
      const id1 = this.deleteChainCandidate.id;
      const id2 = layer2.id;
      this.paths = this.paths.filter(path => {
        const ids = [path[0].id, path[1].id];
        return ids.includes(id1) + ids.includes(id2) == 1;
      })
      this.deleteChainCandidate = false;
    },
    deleteLayer(layer) {
      this.layers = this.layers.filter(item => item.id !== layer.id);
      this.paths = this.paths.filter(path => (path[0].id !== layer.id && path[1].id !== layer.id))
    },
    createPath(path) {
      const coords1 = path[0].position ?? this.$refs[`layer${path[0].id}`].getBoundingClientRect();
      const coords2 = path[1].position ?? this.$refs[`layer${path[1].id}`].getBoundingClientRect();

      const x1 = coords1.left > coords2.right ? coords1.left : coords1.right- coords1.width/2;
      const y1 = coords1.top > coords2.bottom ? coords1.top: coords1.bottom;
      const x2 = coords2.left > coords1.right ? coords2.left : coords2.right - coords1.width/2;
      const y2 = coords2.top > coords1.bottom ? coords2.top : coords2.bottom;
      const dx = (x2 - x1) * 1;
      const c1 = x1 + dx;
      const c2 = x2 - dx;
      return `M ${x1} ${y1} C ${c1} ${y1}, ${c2}  ${y2}, ${x2} ${y2}`;

      /*
        const weight = 0.3;
        const dx = (x2 - x1) * weight;
        const c1 = x1 + dx;
        const c2 = x2 - dx;
        ? return `<path d="M${x1},${y1} C${c1},${y1} ${c2},${y2} ${x2},${y2}" stroke="black" fill="transparent"/>`;
      }

      x1, y1 - начальная точка
      x2, y2 - конечная точка
      ? weight - жёсткость
      */
    }
  },
};
</script>

<style></style>
