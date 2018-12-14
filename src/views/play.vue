<template>
    <div class="centered color-change-2x">
        <div v-if="!win">
            <h1>score: {{ this.points }}</h1>
            <a href="#" @click="triggerClick" ><img :class="classs" src="../assets/telor.png" alt=""></a>
        </div>
        <div v-else>
            <h1>{{ this.winner }} is win the game</h1>
            <button @click="goLobby">back to lobby</button>
        </div>
    </div>
</template>

<script>
import FartMp3 from '@/assets/fart.mp3'
import WinMp3 from '@/assets/win.mp3'
import LoseMp3 from '@/assets/lose.mp3'
import SongMp3 from '@/assets/bgmtrue.mp3'

export default {
    name: 'play',
    data () {
        return {
            points: 0,
            win: false,
            winner: '',
            classs: '',
            username: ''
        }
    },
    methods: {
        triggerClick () {
            let fart = new Audio(FartMp3)
            fart.play()
            this.classs = 'vibrate-1'
            setTimeout(() => {
                this.classs = ''
            }, 250);
            this.points += 1
            firebase.database().ref(`Rooms2/${this.$route.params.id}/users/${this.username}`).update({
                score: this.points
            });
        },
        setGame () {
                this.username = localStorage.getItem('username')
                this.classs = 'bounce-in-top'
                this.win = false
                var starCountRef = firebase.database().ref(`Rooms2/${this.$route.params.id}/users`);
                starCountRef.on('value', (snapshot) => {
                let data = snapshot.val()
                for(let index in data) {
                        if(data[index].score === 20) {
                        this.classs = 'bounce-out-top'
                        this.winner = index
                        this.win = true
                        if(index === this.username) {
                                new Audio(WinMp3).play()
                        } else {
                                new Audio(LoseMp3).play()
                        }
                        firebase.database().ref(`Rooms2/${this.$route.params.id}/users/${this.username}`).update({
                                score: 0
                        });
                        }
                }
                });
        },
        goLobby () {
                firebase.database().ref(`Rooms2/${this.$route.params.id}/users/${localStorage.getItem('username')}`).remove()
                this.$router.push('/lobby')
        }
    },
    mounted () {
            this.setGame()
        let song = new Audio(SongMp3)
                song.play()
    }
}
</script>

<style>
img {
    width: 45vh
}

.color-change-2x {
	-webkit-animation: color-change-2x 2s linear infinite alternate both;
	        animation: color-change-2x 2s linear infinite alternate both;
}

@-webkit-keyframes color-change-2x {
  0% {
    background: #19dcea;
  }
  100% {
    background: #b22cff;
  }
}
@keyframes color-change-2x {
  0% {
    background: #19dcea;
  }
  100% {
    background: #b22cff;
  }
}


.centered {
        margin: 13vh 15vw 13vh 15vw;
        padding: 5%;
        border-radius: 25px
}

.bounce-in-top {
	-webkit-animation: bounce-in-top 1.1s both;
	        animation: bounce-in-top 1.1s both;
}

@-webkit-keyframes bounce-in-top {
  0% {
    -webkit-transform: translateY(-500px);
            transform: translateY(-500px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: translateY(-65px);
            transform: translateY(-65px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: translateY(-28px);
            transform: translateY(-28px);
    -webkit-animation-timing-function: ease-in;
  }
  90% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}
@keyframes bounce-in-top {
  0% {
    -webkit-transform: translateY(-500px);
            transform: translateY(-500px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: translateY(-65px);
            transform: translateY(-65px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: translateY(-28px);
            transform: translateY(-28px);
    -webkit-animation-timing-function: ease-in;
  }
  90% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}


.bounce-out-top {
	-webkit-animation: bounce-out-top 1.5s both;
	        animation: bounce-out-top 1.5s both;
}

@-webkit-keyframes bounce-out-top {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  5% {
    -webkit-transform: translateY(-30px);
            transform: translateY(-30px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  15% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  25% {
    -webkit-transform: translateY(-38px);
            transform: translateY(-38px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  38% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  52% {
    -webkit-transform: translateY(-75px);
            transform: translateY(-75px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  70% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  85% {
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-800px);
            transform: translateY(-800px);
    opacity: 0;
  }
}
@keyframes bounce-out-top {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  5% {
    -webkit-transform: translateY(-30px);
            transform: translateY(-30px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  15% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  25% {
    -webkit-transform: translateY(-38px);
            transform: translateY(-38px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  38% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  52% {
    -webkit-transform: translateY(-75px);
            transform: translateY(-75px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  70% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  85% {
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-800px);
            transform: translateY(-800px);
    opacity: 0;
  }
}


.vibrate-1 {
	-webkit-animation: vibrate-1 0.3s linear infinite both;
	        animation: vibrate-1 0.3s linear infinite both;
}

@-webkit-keyframes vibrate-1 {
  0% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
            transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
            transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
            transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
            transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
}
@keyframes vibrate-1 {
  0% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
            transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
            transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
            transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
            transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
            transform: translate(0);
  }
}

</style>

