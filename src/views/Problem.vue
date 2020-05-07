<template>
  <div class="about">
    <h1 v-if="!editTitle" @click="editTitle = true">{{ problem.problem }}</h1>
    <h1 v-else>
      <input v-model="problem.problem" @keyup.enter="changeTitle" type="text" />
      <button @click="changeTitle" class="add">V</button>
    </h1>
    <CategoryCard
      id="category-card"
      v-for="cat in categories"
      :catName="cat.category"
      :problemPk="problem.pk"
      :catPk="cat.pk"
      :key="cat.pk"
    />
    <button id="add-category" @click="addCategory">Add Category</button>
  </div>
</template>

<script>
import CategoryCard from "@/components/CategoryCard.vue";
import api from "@/gateways/api.js";

export default {
  data: function() {
    return {
      problem: {
        problem: "",
        pk: "1"
      },
      categories: [],
      editTitle: false
    };
  },
  components: {
    CategoryCard
  },
  methods: {
    getProblem: async function() {
      try {
        this.problem = await api.get(`/${this.problem.pk}`);
      } catch (error) {
        alert(error);
      }
    },
    getCategories: async function() {
      try {
        this.categories = await api.get(`/${this.problem.pk}/categories`);
      } catch (error) {
        alert(error);
      }
    },
    addCategory: async function() {
      try {
        const category = await api.put(`/${this.problem.pk}/new`, {
          category: "New category"
        });
        this.categories.push(category);
      } catch (error) {
        alert(error);
      }
    },
    changeTitle: function() {
      try {
        api.put(`/${this.problem.pk}`, { problem: this.problem.problem });
      } catch (error) {
        alert(error);
      }
      this.editTitle = false;
    },
  },
  created: async function() {
    if (this.$route.params.problemPk) {
      this.problem.pk = this.$route.params.problemPk;
    } else this.problem.pk = 1;
    this.getProblem();
    this.getCategories();
  }
};
</script>
