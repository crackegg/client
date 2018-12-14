<template>
  <div class="about">
    <h1>Register</h1>
    <form-register />
  </div>
</template>

<script>
    import FormRegister from '@/components/FormRegister.vue';
    
    export default {
        name: 'register',
        components: {
            FormRegister,
        },
    }
</script>