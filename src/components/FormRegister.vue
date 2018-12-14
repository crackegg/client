<template>
  <div class="hello">
      <form @submit.prevent="saveRegister">
            <input type="text" placeholder="Username" v-model="username" /><br>
            <input type="password" placeholder="Password" v-model="password" /><br>
            <button>Register</button>
      </form>
  </div>
</template>

<script>
export default {
    name: 'form-login',
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        saveRegister() {
            firebase.database().ref('Users/').push({
                username: this.username,
                password: this.password,
                win: 0,
            }, error => {
                if (error) {
                    console.log(error)
                } else {
                    this.$router.push('/login');
                }
            }).key;
        },
    },
}
</script>