<script>
export default {
    data() {
        return {
            quizId: '',
            quId: "",
            quizName: '',
            question: "",
            quizDiscription: "",
            startDate: '',
            endDate: '',
            type: "1",
            necessary: "",
            options: "",
            published: "",
            resObj: {},
            childName: "quiz",
            quizData: {},
            empty: "",
            quList: [],
            formObj: [],
            lastId:{}
        }
    },
    methods: {
        sentVal() {
            let obj = {
                Quiz: {
                    quizId: this.quizId,
                    quId: this.quId,
                    quizName: this.quizName,
                    quizDiscription: this.quizDiscription,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    type: this.type,
                    necessary: this.necessary,
                    options: this.options,
                    published: this.published,
                }
            }
            fetch("http://localhost:8080/quiz/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:
                    JSON.stringify(obj)
            }
            )
                .then(res => res.json())
                .then((data) => {
                    this.resObj = data
                })
        },
        // 回傳第二頁資料給第一頁
        outputName() {
            this.$emit('valChild', this.childName)
            let obj = {
                question: this.question,
                type: this.type,
                necessary: this.necessary,
                options: this.options,
            }
            localStorage.setItem("returnData", JSON.stringify(obj));
        },
        // 取得第一頁問卷資料
        getData() {
            this.quizData = JSON.parse(localStorage.getItem("createQuiz"));
            this.lastId = JSON.parse(localStorage.getItem("idData"));
        },
        // 送出時清空資料
        cleanStorage() {
            localStorage.setItem("createQuiz", "")
            localStorage.setItem("returnData", "")
        },
        //新增問題
        // 用表格List，裝問題List
        addQu() {
            if(this.type === ""){
                window.alert("請選擇題目類型")
                    return
            }
            if (this.question.trim().length === 0) {
                window.alert("請輸入題目內容")
                return 
            }
            // 判斷題型，題型防呆順便
            if (this.type == 1) {
                this.type = 1;
                if (!this.options.includes(";")) {
                    window.alert("選項格式錯誤")
                    return 
                }

            }
            if (this.type == 2) {
                if (!this.options.includes(";")) {
                    window.alert("選項格式錯誤")
                    return 
                }
            }
            if (this.type == 0) {
                // this.type = 0;
                // 簡答不用選項
                if (this.options.trim().length !== 0) {
                    window.alert("簡答不需輸入選項")
                    return 
                }
            }
            // 判斷是否為必填
            if (this.necessary) {
                this.necessary = 1;
            } else {
                this.necessary = 0;
            }
            // this.quizId = this.lastId.quiz_id
            // this.quizDiscription = this.quizData.quizDiscription
            // this.quizName = this.quizData.quizName
            // this.startDate = this.quizData.startDate
            // this.endDate = this.quizData.endDate
            // this.published = this.quizData.published
            
            // 還沒設定quId
            // 一起把前面設定帶進來，可以直接傳回給後端
            this.quList.push(this.question, this.type, this.necessary, this.options)
            this.formObj.push(this.quList)
            console.log(this.quList);
            console.log(this.formObj);
        },
        quType(type) {
            if (type == 1) {
                return "單選題"
            }
            if (type == 2) {
                return "多選題"
            } else {
                return "簡答題"
            }
        },
        quNes(qu) {
            if (qu === 1) {
                return "是"
            } else {
                return "否"
            }
        },
    },
    beforeMount(){
        this.getData()
        console.log(this.quizData);
        console.log(this.lastId);
    },
}
</script>
<template>
    <h1>{{ this.quizName }}</h1>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <div class="queArea">
        <div class="que all">
            <label for="" class="queIn">問題:</label>
            <input type="text" v-model="this.question" class="queIn text">
            <select class="queIn" v-model="this.type">
                <option value="1">單選題</option>
                <option value="2">多選題</option>
                <option value="0">簡答題</option>
            </select>
            <input type="checkbox" class="queIn checkbox" v-model="this.necessary">
            <label for="" class="queIn">必填項目</label>
        </div>
        <div class="op all">
            <label for="">選項:</label>
            <label for="" class="text">(多個答案以;分隔)</label>
        </div>
        <div class="opText all">
            <textarea class="text" name="" id="" cols="30" rows="10" v-model="this.options"></textarea>
            <button type="button" @click="addQu()">加入</button>
        </div>
        <div class="icon all">
            <i class="fa-solid fa-trash-can"></i>
        </div>
        <div class="form ">
            <table border="1">
                <tr>
                    <th></th>
                    <th>編號</th>
                    <th>選項</th>
                    <th>問題種類</th>
                    <th>必填</th>
                </tr>
                <tr v-for="(item, index) in this.formObj" :key="index">
                    <td><input type="checkbox"></td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ item[0] }}</td>
                    <td>{{ quType(item[1]) }}</td>
                    <td>{{ quNes(item[2]) }}</td>

                </tr>

            </table>
        </div>
        <div class="button">
            <button type="button" @click="outputName()">上一步</button>
            <button type="button" @click="this.sentVal()">送出</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.queArea {
    position: relative;
    width: 1246px;
    height: 750px;

    input[type="text"] {
        font-size: 20px;
    }

    textarea {
        font-size: 25px;
    }

    .all {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        justify-items: center;
        margin-left: 10%;
        width: 90%;
        height: 10%;
        font-size: 30px;
    }

    .que {
        margin-top: 4%;

        table {
            width: 60%;
            border-collapse: collapse;
        }

        tr:nth-child(even) {
            background-color: #7e737394;
        }


        .checkbox {
            width: 22px;
            height: 22px;
        }

        th,
        td {
            padding: 9px;
            text-align: center;
            border: 1px solid black;
        }

        input,
        select {
            height: 40%;
        }

        select {
            width: 10%;
            height: 40px;
            font-size: 25px;
            margin-top: 5px;
        }

        .text {
            width: 50%;
            height: 38px;
            margin-left: 5%;
            margin-top: 4px;
        }

        .queIn {
            margin-right: 2%;
        }

        .checkbox {
            margin-top: 10px;
            margin-right: 1%;
            height: 20px;
            width: 20px;
        }
    }

    .op {
        .text {
            margin-left: 6%;
        }
    }

    .opText {
        height: 180px;

        .text {
            height: 100%;
            width: 50%;
            margin-left: 13%;
            resize: none;
            padding-top: 0%;
        }

        button {
            margin-left: 2.2%;
            margin-top: 0;
            width: 10.5%;
            height: 20%;
            font-size: 20px;
        }
    }

    .icon {
        font-size: 45px;
    }

    .form {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        justify-items: center;
        margin-left: 10%;
        width: 90%;
        height: 30%;
        font-size: 30px;
    }

    .button {
        margin-top: 4%;
        position: relative;
        left: 52.5%;
        height: 6%;
        width: 40%;
        text-align: right;

        // border: 1px solid black;
        button {
            height: 90%;
            width: 90px;
            margin-left: 20px;
            font-size: 23px;
        }

    }
}
</style>