<script>
export default {
    data() {
        return {
            quizName: "",
            quizDiscription: "",
            startDate: "",
            endDate: "",
            published: false,
            childName:'que',
            returnData:{}
        }
    },
    methods: {
        // 傳資料給第二頁
        outputData() {
            if (!this.quizName) {
                    window.alert("請輸入問卷名稱");
                    return;
                }
            if (!this.startDate || !this.endDate) {
                    window.alert("請輸入時間");
                    return;
                }
                if(this.published){
                    this.published = true
                }
                let obj = {
                    quizName: this.quizName,
                    quizDiscription: this.quizDiscription,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    published: this.published
                }
                
            localStorage.setItem("createQuiz", JSON.stringify(obj));
            this.$emit('valChild', this.childName)
        },
        // 取得從第二頁回傳的資料
        getReturnData(){
            this.returnData = JSON.parse(localStorage.getItem("returnData"))
        }
    },
}
</script>
<template>
    <div class="quizArea">
        <div class="quizName">
            <label for="">問卷名稱:</label>
            <input type="text" class="text2" v-model="this.quizName">
            <input type="checkbox" class="checkbox" v-model="this.published">
            <span>是否發布</span>
        </div>
        <div class="quizDis">
            <label for="">問卷說明:</label>
            <textarea class="text" name="" id="" cols="30" rows="10" v-model="this.quizDiscription"></textarea>
        </div>
        <div class="time startTime">
            <label for="">開始時間:</label>
            <input type="date" class="date" v-model="this.startDate">
        </div>
        <div class="time ">
            <label for="">結束時間:</label>
            <input type="date" class="date" v-model="this.endDate">
        </div>
        <div class="button">
            <RouterLink to="/BackMain">
                <button type="button">取消</button>
            </RouterLink>
            <button type="button" @click="outputData()">下一步</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.quizArea {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 1246px;
    height: 800px;

    input[type="text"] {
        font-size: 20px;
    }

    textarea{
        font-size: 25px;
    }
    .text2{
        width:50%;
    }
    .checkbox{
        position: absolute;
        width: 30px;
        height: 30px;
        top:12%;
        // margin-right: 20px;
    }
    span{
        margin-left: 60px;
        font-size: 25px;
    }
    .text {
        width: 65%;
        padding-top: 0%;
        margin-left: 20px;
        resize: none;
    }

    label {
        font-size: 30px;
    }

    input {
        width: 20%;
        margin-left: 20px;
        height: 40%;
    }

    .quizName {
        width: 100%;
        height: 15%;
        margin-left: 12%;
        margin-top: 7%;
    }

    .quizDis {
        display: flex;
        width: 100%;
        height: 50%;
        margin-left: 12%;

        input {
            height: 100%;
        }

        label {
            align-self: flex-start; //對其到最上面
        }
    }

    .startTime {
        margin-top: 3%;

    }

    .time {
        width: 100%;
        height: 15%;
        margin-left: 12%;

    }

    .button {
        position: relative;
        width: 25%;
        height: 15%;
        left: 65%;
        padding-left: 10%;

        button {
            width: 25%;
            height: 50%;
            font-size: 23px;
            margin-right: 25px;
        }
    }
}
</style>