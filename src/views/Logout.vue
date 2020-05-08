<template>
    <h1>Logging out...</h1>
</template>

<script>
export default {
    
  mounted: function() {
        console.log("remove jwt");
        localStorage.removeItem('jwt');
        this.$router.push('/');
    }
}
</script>