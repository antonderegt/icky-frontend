<template>
  <div class="home">
    <h1>Welcome to Icky</h1>
    <h3>Problems</h3>
    <p v-for="problem in problems" :key="problem.pk">
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
    getProblems: function() {
      api.get(`/`).then(response => (this.problems = response.data.data));
    }
  },
  mounted: function() {
    this.getProblems();
  }
};
</script>
