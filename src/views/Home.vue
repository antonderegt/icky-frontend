<template>
  <div class="home">
    <h1>Welcome to Icky</h1>
    <h3>Problems</h3>
    <p v-for="problem in problems" id="problem" :key="problem.pk">
      <router-link :to="{ path: '/problem/' + problem.pk }">{{
        problem.problem
      }}</router-link>
    </p>
  </div>
</template>

<script>
import api from "@/gateways/api.js";

export default {
  data: function() {
    return {
      problems: []
    };
  },
  methods: {
    getProblems: async function() {
      try {
        const problems = await api.get(`/`);
        this.problems = problems.data;
      } catch (error) {
        alert(error);
      }
    }
  },
  mounted: function() {
    this.getProblems();
  }
};
</script>
