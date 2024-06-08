<script>
import que from '../components/Que.vue'
import quiz from '../components/Quiz.vue'
import statistics from '../components/Statistics.vue'

export default {
    // 父子層設定
    components: {      
        que,
        quiz,
        statistics,
    },
    data() {
        return {
            active: 'quiz',
        }
    },
    methods: {
        changeColor(btnIndex) {
            this.resetColor();
            this.$refs[`btn${btnIndex}`].style.backgroundColor = '#ffffff';
        },
        resetColor() {
            const btn1Ref = this.$refs.btn1;
            btn1Ref.style.backgroundColor = '#a8a2a2';
            const btn2Ref = this.$refs.btn2;
            btn2Ref.style.backgroundColor = '#a8a2a2';
        },
        showArea(areaName) {
            this.active = areaName;
        },
        inputFromChild(inputName){
            this.active = inputName;
            let acQuiz =  document.getElementById("quiz")
            let acQu =  document.getElementById("que")
            if(this.active === "quiz"){
                acQuiz.style.background = "#ffffff"
                acQu.style.background = "#a8a2a2"
            }
            if(this.active === "que"){
                acQuiz.style.background = "#a8a2a2"
                acQu.style.background = "#ffffff"
                
            }
        }

    },
}
</script>

<template>
    <div class="bigArea">
        <div class="backShowArea">
            <button id="quiz">問卷</button>
            <button id="que">題目</button>
            <!-- 要怎麼跳到每張問卷指定回答頁面，用原本方法網址會變 -->
            <!-- 把這邊拔掉，入口改從BackMain的搜尋前往? -->
            
            <!-- <button @click="showArea('statistics')">統計</button> -->
        </div>

        <div class="body">
            <quiz v-if="active === 'quiz'" @valChild="inputFromChild"/>
            <que v-if="active === 'que'" @valChild="inputFromChild" />
            <statistics v-if="active === 'statistics'" />
        </div>
    </div>

</template>

<style lang="scss" scoped>
.bigArea {
    position: relative;
    display: flex;
    // align-items: center;
    justify-content: center;
    // border: 1px solid #000000;

    .backShowArea {
        position: absolute;
        width: 65%;
        height: 50px;
        margin-top: 50px;

        .btn {
            background-color: #ffffff;
        }

        button {
            width: 150px;
            background-color: #a8a2a2;
            // border: 1px solid #ccc;
            border-radius: 4px 10px 4px 4px;
            padding: 10px;
            text-align: center;
            font-size: 20px;
            border-bottom: none;
        }
        #quiz{
            background:#ffffff
        }
    }

    .body {
        width: 1246px;
        height: 800px;
        border: 2px solid black;
        margin-top: 100px;
        margin-left: 2px;
    }

}
</style>