<template>
  <div class="about">
    <h1>Login</h1>
    <form-login />
  </div>
</template>

<script>
    import FormLogin from '@/components/FormLogin.vue';
    
    export default {
        name: 'login',
        components: {
            FormLogin,
        },
    }
</script>