<template>
  <div class="about">
    <h1>Lobby Room</h1>
    <form @submit.prevent="saveRoom">
        <input type="text" placeholder="Enter Name Room" v-model="name" />
        <button>Save</button>
    </form><br>
    <table align="center" border="1px solid" cellpadding="5">
        <tr>
            <td>Id</td>
            <td>Nama Room</td>
            <td>User Aktif</td>
            <td>Action</td>
        </tr>
        <tr v-for="(data, index) in rooms" :key="index">
            <td>{{ data.roomId }}</td>
            <td>{{ data.data.name }}</td>
            <td>
                <ul>
                    <li v-for="(data2, index2) in data.data.users" :key="index2">{{ index2 }}</li>
                </ul>
            </td>
            <td><button @click="openRoom(data.roomId)">Pilih Room</button></td>
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
            var starCountRef = firebase.database().ref('Rooms/');
            starCountRef.on('value', snapshot => {
                let obj = snapshot.val();
                let objArray = [];
                for(let i in obj) {
                    let dapet = {
                        roomId: i,
                        data: obj[i]
                    };
                    objArray.push(dapet);
                }
                this.rooms = objArray;
            });
        },
        methods: {
            saveRoom() {
                firebase.database().ref('Rooms/').push({
                    name: this.name,
                }, error => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('sukses')
                    }
                }).key;
            },
            openRoom (roomId) {
                firebase.database().ref(`Rooms/${roomId}/users/${localStorage.getItem('username')}`).set({
                    score: 0,
                    status: false
                })
                this.$router.push(`/lobby/${roomId}`)
            }
        },
    }
</script>