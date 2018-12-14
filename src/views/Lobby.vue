<template>
  <div class="about">
    <h1>Lobby Room</h1>
    <form @submit.prevent="saveRoom">
        <input type="text" placeholder="Enter Name Room" v-model="name" />
        <button>Save</button>
    </form><br>
    <table align="center" border="1px solid" cellpadding="5">
        <tr>
            <td>Nama Room</td>
            <td>User Aktif</td>
            <td>Action</td>
        </tr>
        <tr v-for="(data, i) in rooms" :key="i">
            <td>{{ data.name }}</td>
            <td>
                <ul>
                    <li v-for="(data2, index2) in data.users" :key="index2">{{ index2 }}</li>
                </ul>
            </td>
            <td><button @click="openRoom(i)">Pilih Room</button></td>
        </tr>
    </table>
  </div>
</template>

<script>


    export default {
        name: 'lobby',
        data() {
            return {
                rooms: [],
                name: '',
            };
        },
        mounted() {
            var starCountRef = firebase.database().ref('Rooms2/');
            starCountRef.on('value', snapshot => {
                this.rooms = snapshot.val()
            });
            // this.playSong()
        },
        created () {

        },
        methods: {
            saveRoom() {
                const ref = firebase.database().ref('Rooms2/').push()
                const key = ref.key
                ref.set({
                    name: this.name,
                })
                .then(data => {
                    this.openRoom(key)
                })
                .catch(err => {
                    console.log(err)
                })

            },
            openRoom (roomId) {
                console.log(roomId)
                firebase.database().ref(`Rooms2/${roomId}/users/${localStorage.getItem('username')}`).set({
                    score: 0,
                    status: false,
                })
                this.$router.push(`/lobby/${roomId}`)
            },
            playSong () {

            }
        },
    }
</script>