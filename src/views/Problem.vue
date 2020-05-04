<template>
  <div class="about">
    <h1>Problem parts table</h1>
    <CategoryCard
      v-for="cat in categories"
      :category="cat.category"
      :problemPk=1
      :catPk="cat.pk"
      :key="cat.pk"
    />
    <button @click="addCategory">Add Category</button>
  </div>
</template>

<script>
import CategoryCard from "@/components/CategoryCard.vue";
import api from "@/gateways/api.js";

export default {
  data: function() {
    return {
      problems: [],
      categories: [],
    };
  },
  components: {
    CategoryCard
  },
  methods: {
    getCategories: function() {
      api.get('/1/categories').then(response => this.categories= response.data);
    },
    addCategory: function() {
      this.categories.push({ name: "New Cat", items: ["item 1"] });
    }
  },
  mounted: function() {
    this.getCategories();
  }
};
</script>
