<template>
  <div class="modal" @click="closeModal">
    <div class="modal-content">
      <div class="modal-content__header">Параметры датасета</div>
      <div class="modal-content__name">
        <span>Название датасета</span>
        <input type="text" :value="dataset.title || title" @input="datasetTitle">
      </div>
      <div class="modal-content__tags">
        <span>Теги</span>
        <div>
          <i class="fa fa-tag" aria-hidden="true"
            v-for="tag in showTags" :key="tag">
            <span>{{tag}}</span>
            <i class="fa fa-times" aria-hidden="true" @click="deleteTag(tag)"></i>
          </i>
        </div>
        <input type="text" @keyup.enter="addTag" placeholder="Новый тег" v-model="newTag">
      </div>
      <div class="modal-content__weight">
        <span>Размер датасета</span>
        <input type="text" :value="dataset.weight || weight" @input="datasetWeight">
      </div>
      <div class="btn-group">
        <button v-if="!dataset" @click="saveDataset">Сохранить</button>
        <button v-else @click="$emit('deleteDataset', dataset)">Удалить</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['dataset'],
  emits: ['closeWindow', 'deleteTag', 'addTag', 'saveDataset', 'deleteDataset'],
  data() {
    return {
      tags: [],
      newTag: '',
      title: '',
      weight: '',
    }
  },
  methods: {
    closeModal(evt) {
      if (evt.target.classList.contains('modal')) {
        this.$emit('closeWindow')
      }
    },
    datasetTitle(evt) {
      this.title = evt.target.value.trim();
    },
    deleteTag(tag) {
      if (this.dataset) {
        this.$emit('deleteTag', this.dataset, tag.trim());
      } else {
        this.tags = this.tags.filter(item !== tag.trim())
      }
    },
    addTag() {
      console.log(this.dataset);
      if (this.dataset) {
        this.$emit('addTag', this.dataset, this.newTag.trim());
      } else {
        this.tags.push(this.newTag.trim());
      }
      this.newTag = '';
    },
    datasetWeight(evt) {
      this.weight = evt.target.value.trim();
    },
    saveDataset() {
      const dataset = {
        title: this.title,
        id: Math.random(),
        tags: this.tags,
        weight: this.weight
      }
      if (dataset.title?.length === 0 || dataset.weight < 1) return;
      this.$emit('saveDataset', dataset);
    },
  },
  computed: {
    showTags() {
      if (this.dataset) return this.dataset.tags
      return this.tags
    }
  }

}
</script>

<style></style>
