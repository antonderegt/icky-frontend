<template>
  <div class="about">
    <h1 v-if="!editTitle" @click="editTitle = true">{{ problem.problem }}</h1>
    <h1 v-else>
      <input v-model="problem.problem" @keyup.enter="toggleTitle" type="text" />
      <button @click="toggleTitle" class="add">V</button>
    </h1>
    <CategoryCard
      id="category-card"
      v-for="cat in problem.categories"
      :categoryProp="cat"
      :problemPkProp="problem.pk"
      :key="cat.pk"
    />
    <button id="add-category" @click="addCategory(problem.pk)">
      Add Category
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CategoryCard from "@/components/CategoryCard.vue";

export default {
  computed: {
    ...mapGetters(["problem"])
  },
  data: function() {
    return {
      editTitle: false
    };
  },
  components: {
    CategoryCard
  },
  methods: {
    ...mapActions(["getProblem", "addCategory", "changeProblemName"]),
    toggleTitle: function() {
      const updatedProblem = {
        pk: this.problem.pk,
        problem: this.problem.problem
      };

      this.changeProblemName(updatedProblem).then(() => {
        this.editTitle = false;
      });
    }
  },
  created: async function() {
    if (this.$route.params.problemPk) {
      this.problem.pk = parseInt(this.$route.params.problemPk);
    } else this.problem.pk = 1;
    this.getProblem(this.problem.pk);
  }
};
</script>
