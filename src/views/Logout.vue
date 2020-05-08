<template>
    <h1>Logging out...</h1>
</template>

<script>
export default {
    methods: {
        removeItem(sKey, sPath, sDomain) {
            document.cookie = encodeURIComponent(sKey) + 
                "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + 
                (sDomain ? "; domain=" + sDomain : "") + 
                (sPath ? "; path=" + sPath : "");

            console.log("removed cookie");
        }
    },
    mounted: function() {
        this.removeItem("Token");
        this.$router.push('/');
    }
}
</script>