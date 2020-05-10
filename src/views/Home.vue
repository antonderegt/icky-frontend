<template>
  <div class="home">
    <h1>Welcome to Icky</h1>
    <h3>Problems</h3>
    <p v-for="problem in problemList" id="problem" :key="problem.pk">
      <router-link :to="{ path: '/problem/' + problem.pk }">{{
        problem.problem
      }}</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["problemList"])
  },
  methods: {
    ...mapActions(["getProblems"])
  },
  created: function() {
    this.getProblems();
  }
};
</script>
