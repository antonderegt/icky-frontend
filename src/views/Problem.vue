<template>
  <div class="about">
    <h1 v-if="!editTitle" @click="editTitle = true">{{ problem.problem }}</h1>
    <h1 v-else>
      <input v-model="problem.problem" @keyup.enter="changeTitle" type="text" />
      <button @click="changeTitle" class="add">V</button>
    </h1>
    <ProblemCard
      v-for="cat in categories"
      :catName="cat.category"
      :problemPk=$route.params.problemPk
      :catPk="cat.pk"
      :key="cat.pk"
    />
  <button @click="addCategory">Add Category</button>
  </div>
</template>

<script>
import ProblemCard from "@/components/ProblemCard.vue";
import api from "@/gateways/api.js";

export default {
  props: {
    problemPk: Number
  },
  data: function() {
    return {
      problem: "",
      categories: [],
      editTitle: false
    };
  },
  components: {
    ProblemCard
  },
  methods: {
    getProblem: function() {
      this.problem = this.$route.params.problemPk;
      api.get(`/${this.problem}`)
      .then(response => this.problem = response.data)
      .catch(error => { console.log(error) });
    },
    getCategories: function() {
      this.problem = this.$route.params.problemPk;
      api.get(`/${this.problem}/categories`)
      .then(response => this.categories= response.data)
      .catch(error => { console.log(error) });
    },
    addCategory: function() {
      api.put(`/${this.problem.pk}/new`, { category: "New category" }).then(response => {
        this.categories.push(response.data);
      })
    },
    changeTitle: function() {
      api.put(`/${this.problem.pk}`, { problem: this.problem.problem})
      this.editTitle = false;
    }
  },
  mounted: function() {
    this.getProblem();
    this.getCategories();
  }
};
</script>
