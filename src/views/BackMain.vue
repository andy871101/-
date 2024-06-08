<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    components: {
        RouterLink, RouterView
    },
    data() {
        return {
            quizName: "",
            startDate: "",
            endDate: "",
            isBack: true,
            resObj: [],
            currentIndex: 1,//索引位置
            quizData: [],
            pageData: [],
        }
    },
    methods: {
        searchVal() {
            let obj = {
                quizName: this.quizName,
                startDate: this.startDate,
                endDate: this.endDate,
            }
            fetch("http://localhost:8080/quiz/backShowQuiz", {
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
            this.pageData = [] //清空陣列要裝當前頁面新的資料
            let i = 0 + (this.currentIndex - 1) * 10; //底下for迴圈用，從第幾筆資料開始裝
            let j = 10 + (this.currentIndex - 1) * 10; //從i 裝到哪筆資料
            let k = 0;
            // console.log(this.resObj.quizList.length);
            if (j > this.resObj.quizList.length) {
                k = this.resObj.quizList.length
            } else {
                k = j
            }
            for (i; i < k; i++) {
                this.pageData.push(this.resObj.quizList[i])
            }
            // console.log(this.pageData);
            // console.log(this.pageData.length);
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
        // v-bind判斷顯示用
        ansBtn(startDate, endDate) {
            const status = this.getStatus(startDate, endDate)
            if (status === "未開始") {
                return false
            } else {
                return true
            }
        },
        checkShow(startDate, endDate) {
            const status = this.getStatus(startDate, endDate)
            if (status === "未開始") {
                return true
            } else {
                return false
            }
        },
        // 判斷checkbox有沒有被勾選
        delQuiz() {
            let quizArr = []
            for (let checkId = 1; checkId <= this.pageData.length; checkId++) {
                // 跟複選題一樣照順序給checkbox，class
                let eachCheckbox = document.getElementById(`quiz_${checkId}`);
                if(!eachCheckbox){
                    continue;
                }
                if (eachCheckbox.checked === true) {
                    quizArr.push(eachCheckbox._value)
                }
            }
            // 後端格式是 {[ ]} Obj+陣列
            // 這邊帶的變數名稱quizIds 陣列一定要和後端一樣
            let delObj = {quizIds: quizArr};
            fetch("http://localhost:8080/quiz/delete_quiz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(delObj)
            })
            .then(res =>res.json())
            .then( data =>{
                console.log(data);
                window.alert("刪除成功")
                location.reload();
            })
        },
        // 存最後一筆quizId，要存問卷用
        idStorage(){
            localStorage.setItem("idData", JSON.stringify(this.resObj.quizList[this.resObj.quizList.length - 1]));
        },
        // 換頁 + 帶標題過去
        storageAndchange(value,item){
            sessionStorage.setItem("quizTitle", value);
            this.$router.push(`/Answer/${item.quiz_id}`);
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
                <input type="date" class="date" v-model="this.startDate">
                <label for="">&nbsp&nbsp&nbsp&nbsp到&nbsp&nbsp</label>
                <input type="date" class="date" v-model="this.endDate">
                <button type="button" class="searchBtn"@click="this.searchVal()">搜尋</button>
            </div>
        </div>
        <div class="area icon">
            <i class="fa-solid fa-trash-can" @click="this.delQuiz()" style="cursor: pointer;"></i>
            <RouterLink to="/BackShow">
                <i class="fa-solid fa-plus" @click="this.idStorage()"></i>
            </RouterLink>
        </div>
        <div class="area body">
            <table border="2">
                <tr>
                    <th>編號</th>
                    <th>名稱</th>
                    <th>狀態</th>
                    <th>開始時間</th>
                    <th>結束時間</th>
                    <th>結果</th>
                </tr>
                <tr v-for="(item, index) in this.pageData" :key="index">
                    <!-- :value綁定原始問卷id(附身在當前checkbox內，dir印出後可以看到value屬性內的值)，v-bind id給上面方法判斷class值，if判斷是否要顯示checkbox -->
                    <td ><input type="checkbox" class="checkbox" :value="item.quiz_id"  v-if="this.checkShow(item.start_date,item.end_date)" :id="'quiz_' + (index + 1)">{{ index + 1 }}</td>
                    <!-- <td> </td> -->
                    <td>{{ item.quiz_name }}</td>
                    <!-- 用方法判斷狀態 -->
                    <td>{{ getStatus(item.start_date, item.end_date) }}</td>
                    <td>{{ item.start_date }}</td>
                    <td>{{ item.end_date }}</td>
                    <td>
                        <!-- @click不能使用兩個方法,整合成一個 -->
                        <button type="button" v-if="this.ansBtn(item.start_date, item.end_date)" @click="this.storageAndchange(item.quiz_name,item)">前往</button>
                    </td>
                </tr>
            </table>
        </div>
        <div class="area footer">
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
    // border: 1px solid black;
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
        height: 70px;
        margin: 0px 5% 0;
        position: relative;
        // border: 1px solid black;

        .searchBtn{
            margin-left: 28px;
        }
        .backBtn{
            position: absolute;
            top: 4%;
            right: 2%;
        }
        .text {
            width: 80%;
            height: 40px;
            margin-left: 20px;
            // margin-top: 20px;
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

.icon {
    height: 70px;
    justify-content: flex-start; //靠左

    .fa-solid {
        margin-left: 10px;
        font-size: 40px;
        margin-left: 5%;
        margin-right: 1%;
    }

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

    
    .checkbox{
            width: 22px;
            height: 22px;
        }
    th, td {
        padding: 9px; 
        text-align: center; 
        border: 1px solid black; 
    }
    
    button{
        width: 80%;
        height: 30px;
        font-size: 18px;
    }
}

.footer {
    margin-top: 35px;
    height: 70px;
    position: relative;
    .backBtn{
        position: absolute;
        width: 80px;
        height: 40px;
        right: 13%;
        font-size: 25px;
    }
    button{
        width: 50px;
        margin-right: 20px;
    }
}
</style>