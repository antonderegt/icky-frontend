<template>
  <div class="about">
    <h1>Problem parts table</h1>
    <CategoryCard
      v-for="cat in categories"
      :category="cat.name"
      :items="cat.items"
      :key="cat.name"
    />
    <button @click="addCategory">Add Category</button>
    <button @click="getProblems">Show Problems</button>
    {{ problems }}
  </div>
</template>

<script>
import CategoryCard from "@/components/CategoryCard.vue";
import api from "@/gateways/api.js";

export default {
  data: function() {
    return {
      problems: [],
      categories: [
        {
          name: "cat 1",
          items: ["test 1", "test 2"]
        },
        {
          name: "cat 2",
          items: ["test 1", "test 2", "test 3"]
        }
      ]
    };
  },
  components: {
    CategoryCard
  },
  methods: {
    getProblems: function() {
      api.get('/').then(response => this.problems = response.data);
    },
    addCategory: function() {
      this.categories.push({ name: "New Cat", items: ["item 1"] });
    }
  }
};
</script>
