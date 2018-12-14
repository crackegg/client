<template>
 <div>
        <b-card img-src="https://placekitten.com/1000/300"
                img-alt="Card image"
                img-top
                style="max-width: 25rem;" v-for="(user, i) in users" :key="i">
            <p class="card-text">
               <br>
               <br>
               {{i}}
            </p>
              <b-card-body>
        </b-card-body>
        </b-card>
                    <a href="#"
               class="card-link" @click="ready">Ready</a>
</div>
</template>

<script>
export default {
    name: 'on-room',
    data () {
        return {
            users: []
        }
    },
    methods: {
        getRoom () {
            var listenRoomId = firebase.database().ref(`Rooms2/${this.$route.params.id}`)
            listenRoomId.on('value', (payload) => {
                let data = payload.val()
                this.users = data.users
                let check = true
                for(let i in data.users) {
                    if(data.users[i].status === false) {
                        check = false
                    }
                }
                if(check) {
                    this.$router.push(`/${this.$route.params.id}/play`)
                }
            });
        },
        play () {
            this.$router.push(`/${this.$route.params.id}/play`)
        },
        ready () {
            let username = localStorage.getItem('username')
            firebase.database().ref(`Rooms2/${this.$route.params.id}/users/${username}`).set({
                status: true
            })
        }
    },
    mounted () {
        this.getRoom()
    }
}
</script>

