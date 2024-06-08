<!-- 抓資料進來時，毎十筆給一個標籤? -->

<script>
import { RouterLink, RouterView } from 'vue-router'
import ansPage from "../components/ansPage.vue"
export default {
    components: {
        RouterLink, RouterView,
        ansPage,
    },
    data() {
        return {
            quizName: "",
            startDate: "",
            endDate: "",
            isBack: false,
            resObj: [],
            currentIndex: 1,//索引位置
            quizData: [],
            pageData: [],
        }
    },
    methods: {
        // 同一張問卷不同題目的會重複顯示
        searchVal() {
            let obj = {
                quizName: this.quizName,
                startDate: this.startDate,
                endDate: this.endDate,
                isBack: this.isBack
            }
            fetch("http://localhost:8080/quiz/showQuiz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.resObj = data;
                    // console.log(this.resObj.quizList.length);
                    this.changePage();
                })
        },
        changePage() {
            console.log("changePage");
            this.pageData = [] //清空陣列要裝當前頁面新的資料
            let i = 0 + (this.currentIndex - 1) * 10; //底下for迴圈用，從第幾筆資料開始裝
            let j = 10 + (this.currentIndex - 1) * 10; //從i 裝到哪筆資料
            let k = 0;
            console.log(this.resObj.quizList.length);
            if (j > this.resObj.quizList.length) {
                k = this.resObj.quizList.length
            } else {
                k = j
            }
            for (i; i < k; i++) {
                this.pageData.push(this.resObj.quizList[i])
            }
            console.log(this.pageData);
            console.log(this.pageData.length);
        },
        btnChangePage(n) {
            if (this.currentIndex === n) {
                return
            }
            this.currentIndex = n;
            this.changePage(); //索引位置變了所以會裝不同位置的資料進來
        },
        getStatus(startDate, endDate) {
            const currentTime = new Date();
            startDate = new Date(startDate);
            endDate = new Date(endDate);
            if (currentTime < startDate) {
                return "未開始";
            } else if (currentTime > endDate) {
                return "已結束";
            } else {
                return "進行中"
            }
        },
        // v-bind用
        ansBtn(startDate, endDate) {
            const status = this.getStatus(startDate, endDate)
            if (status === "進行中") {
                return true
            } else {
                return false
            }
        },

    },

    beforeMount() {
        this.searchVal();
    }

}
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <div class="bigArea">
        <div class=" header">
            <div class="headerInner">
                <label for="">問卷名稱:</label>
                <input type="text" class="text" v-model="this.quizName">
            </div>
            <div class="headerInner">
                <label for="">統計時間:</label>
                <input type="date" class="date" min="2018-01-01" v-model="this.startDate">
                <label for="">&nbsp&nbsp&nbsp&nbsp到&nbsp&nbsp</label>
                <input type="date" class="date" max="2025-04-26" v-model="this.endDate">
                <button type="button" class="searchBtn" @click="this.searchVal()">搜尋</button>
            </div>
        </div>

        <div class="area body">
            <table border="2">
                <tr>
                    <th>編號</th>
                    <th>名稱</th>
                    <th>狀態</th>
                    <th>開始時間</th>
                    <th>結束時間</th>
                    <th>前往作答</th>
                </tr>
                <!-- :key="index"是必要的嗎?這邊給予index是因為要產生流水編號 -->
                <tr v-for="(item, index) in this.pageData" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.quiz_name }}</td>
                    <!-- 用方法判斷狀態 -->
                    <td>{{ getStatus(item.start_date, item.end_date) }}</td>
                    <td>{{ item.start_date }}</td>
                    <td>{{ item.end_date }}</td>
                    <!-- 根據狀態用v-bind判斷要不要開放填寫 -->
                    <!-- 點擊事件跳到對應頁面檢視 -->
                    <td>
                        <button type="button" v-if="this.ansBtn(item.start_date, item.end_date)" @click="() => { this.$router.push(`/ansPage/${item.quiz_id}`) }">前往</button>
                    </td>
                </tr>
            </table>

        </div>
        <div class="area footer">
            <!-- n不設定值會自動帶入1 -->
            <!-- for迴圈設定有幾頁 -->
            <!-- 無條件進位 -->
            <button type="button" v-for="n in Math.ceil(this.resObj.quizList.length / 10)"
                @click="this.btnChangePage(n)">{{ n
                }}</button>
                <RouterLink to="/">
                    <button type="button" class="backBtn">返回</button>
                </RouterLink>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.bigArea {
    width: 99.9%;
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 25px;

    input[type="text"] {
            font-size: 25px;
        }
}


.header {
    width: 80%;
    height: 200px;
    flex-wrap: wrap;
    margin-top: 20px;
    // border: 1px solid black;

    .headerInner {
        width: 90%;
        height: 30px;
        height: 70px;
        margin: 10px 5% 0;
        position: relative;

        .searchBtn{
            margin-left: 28px;
        }

        .backBtn {
            position: absolute;
            top: 4%;
            right: 2%;
        }

        // border: 1px solid black;
        .text {
            width: 80%;
            height: 40px;
            margin-left: 20px;
        }

        .date {
            width: 30%;
            height: 40px;
            margin: 0 10px 0 20px;
            font-size: 20px;
            margin-top: 20px;
            

        }

        button {
            width: 60px;
            height: 40px;
            font-size: 25px;
        }
    }

}

.area {
    width: 80%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    // border: 1px solid black;
}

.body {
    table {
        width: 60%;
        //border 無間隙
        border-collapse: collapse;
    }
    // 設定偶數列表格CSS
    tr:nth-child(even) {
        background-color: #7e737394; 
    }

    th, td {
        padding: 9px; 
        text-align: center; 
        border: 1px solid black; 
    }
    button{
        width: 60%;
        height: 30px;
        font-size: 18px;
    }
    .close {
        pointer-events: none;
    }
}

.footer {
    height: 70px;
    position: relative;
    .backBtn{
        position: absolute;
        width: 80px;
        height: 40px;
        right: 13%;
        font-size: 25px;
    }
    button {
        width: 50px;
        margin-right: 20px;
    }
}
</style>