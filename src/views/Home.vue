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
export default {
  data: function() {
    return {
      problems: []
    };
  },
  methods: {
    getProblems: async function() {
      this.$store
        .dispatch("getProblems")
        .then(res => {
          this.problems = res;
        })
        .catch(error => {
          alert(error);
        })
    }
  },
  mounted: function() {
    this.getProblems();
  }
};
</script>
