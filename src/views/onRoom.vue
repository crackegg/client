<template>
 <div>
        <b-card img-src="https://placekitten.com/1000/300"
                img-alt="Card image"
                img-top
                style="max-width: 25rem;" v-for="(user, index) in users" :key="index">
            <p class="card-text">
               Player {{index + 1}}
               <br>
               <br>
               {{user.username}}
            </p>
              <b-card-body>
            <a href="#"
               class="card-link">Ready</a>
        </b-card-body>
        </b-card>
        <b-button variant="success" @click="play">PLAY</b-button>
</div>
</template>

<script>
export default {
    data () {
        return {
            users: []
        }
    },
    methods: {
        getRoom () {
            // firebase.database().ref(`rooms/${this.$route.params.id}`);
            var listenRoomId = firebase.database().ref(`Rooms/${this.$route.params.id}`)
            listenRoomId.on('value', (payload) => {
                // console.log(payload.val())
            let data = payload.val()
            // console.log(data.users)
                let arrData = []
                for(let i in data.users) {
                    console.log(data.users)
                    let obj = {
                        username: i,
                        score: i.score
                    }
                arrData.push(obj)
                }
                this.users = arrData
                // console.log(arrData)
            });
        },
        play () {
            this.$route.push(`${this.$route.params.id}/play`)
        }
    },
    mounted () {
        this.getRoom()
    }
}
</script>

