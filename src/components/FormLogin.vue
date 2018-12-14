<template>
  <div class="hello">
      <form @submit.prevent="saveLogin">
            <input type="text" placeholder="Username" v-model="username" /><br>
            <input type="password" placeholder="Password" v-model="password" /><br>
            <button>Login</button>
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
      saveLogin() {
        var starCountRef = firebase.database().ref('Users/');
        starCountRef.on('value', snapshot => {
            let obj = snapshot.val();
            for(let i in obj) {
                let dapet = obj[i];
                if(dapet.username === this.username && dapet.password === this.password) {
                    localStorage.setItem('userAktif', dapet.username);
                    this.$router.push('/lobby');
                }
            }
            console.log('Sorry username password salah')
        });

      },
  },
}
</script>