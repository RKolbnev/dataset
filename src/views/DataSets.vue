<template>
  <div class="sample-population">
    <div class="filter">
      <p>Теги</p>
      <div class="tags">
        <label class="tag " v-for="tag in tags" :key="tag">
          <input type="checkbox" name="filter" :value="tag" v-model="filters" />
          <span class="border-item">{{ tag }}</span>
        </label>
      </div>
    </div>
    <div class="datasets">
      <div class="datasets-title">
        <span>Выберите датасет</span>
        <div>
          <button @click="editDataSet(false)">
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span>Добавить датасет</span>
          </button>
          <button @click="$router.push('/neuralNetwork')">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="sets">
        <div
          class="set border-item"
          v-for="item in sortByFilter()"
          :key="item.id"
        >
          <span class="set-name">{{ item.title }}</span>
          <span class="set-edit" @click="editDataSet(item)">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </span>
          <div class="set-tags">
            <span v-for="tag in item.tags" :key="tag">
              <i class="fa fa-tag" aria-hidden="true"></i>
              {{ tag }}
            </span>
          </div>
          <span class="set-weight">{{ item.weight }}</span>
        </div>
      </div>
    </div>
    <teleport to="body">
      <app-edit-dataset
        v-if="showModal"
        :dataset="dataset"
        @closeWindow="showModal = false"
        @deleteDataset="deleteDataset"
        @deleteTag="deleteTag"
        @addTag="addTag"
        @saveDataset="saveDataset"
      ></app-edit-dataset>
    </teleport>
  </div>
</template>

<script>
import AppEditDataSet from "../components/AppEditDataSet";

export default {
  components: {
    "app-edit-dataset": AppEditDataSet
  },
  data() {
    return {
      showModal: false,
      dataset: null,
      filters: [],
      tags: new Set([
        "images",
        "classification",
        "tensorflow.keras",
        "English",
        "regression",
        "timeseries",
        "Terra AI",
        "segmentation"
      ]),
      datasets: [
        {
          title: "mnist",
          id: Math.random(),
          tags: ["images", "classification", "tensorflow.keras"],
          weight: "предустановенный"
        },
        {
          title: "mnist",
          id: Math.random(),
          tags: ["images", "English", "tensorflow.keras"],
          weight: "предустановенный"
        },
        {
          title: "mnist",
          id: Math.random(),
          tags: ["images", "Terra AI", "tensorflow.keras"],
          weight: "предустановенный"
        },
        {
          title: "mnist",
          id: Math.random(),
          tags: ["timeseries", "classification", "tensorflow.keras"],
          weight: "предустановенный"
        },
        {
          title: "mnist",
          id: Math.random(),
          tags: ["classification", "tensorflow.keras"],
          weight: "предустановенный"
        },
        {
          title: "mnist",
          id: Math.random(),
          tags: ["regression", "English", "tensorflow.keras"],
          weight: "предустановенный"
        },
        {
          title: "mnist",
          id: Math.random(),
          tags: ["regression", "Terra AI", "tensorflow.keras"],
          weight: "предустановенный"
        },
        {
          title: "mnist",
          id: Math.random(),
          tags: ["timeseries", "tensorflow.keras"],
          weight: "предустановенный"
        }
      ]
    };
  },
  methods: {
    editDataSet(item) {
      this.showModal = true;
      this.dataset = item;
    },
    deleteDataset(dataset) {
      this.showModal = false;
      this.datasets = this.datasets.filter(set => set.id !== dataset.id);
    },
    sortByFilter() {
      if (this.filters.length < 1) return this.datasets;
      return this.datasets.filter(set => {
        for (let filter of this.filters) {
          if (!set.tags.includes(filter)) return false;
        }
        return true;
      });
    },
    deleteTag(dataset, tag) {
      this.datasets.forEach(set => {
        if (set.id === dataset.id) {
          const idx = set.tags.indexOf(tag);
          set.tags.splice(idx, 1);
        }
      });
    },
    addTag(dataset, tag) {
      this.datasets.forEach(set => {
        if (set.id === dataset.id) {
          set.tags.push(tag);
          set.tags = [...new Set(set.tags)];
        }
      });
      this.tags.add(tag);
    },
    saveDataset(dataset) {
      this.datasets.push(dataset);
      dataset.tags.forEach(tag => this.tags.add(tag))
      this.showModal = false;
    }
  }
};
</script>
