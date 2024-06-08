<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    components: {
        RouterLink, RouterView
    },
    data() {
        return {
            ansList: [],
            // 裝不重複quizId
            showList: [],
            // quizTitle在BackMain設定值了
            title: sessionStorage.getItem("quizTitle"),
            // 拿來裝當前問卷
            quizList: [],
            currentIndex: 1,
            pageData: []
        }
    },
    methods: {

        ansSearch() {
            let quizId = this.$route.params.id;
            // method為 GET
            fetch(`http://localhost:8080/quiz/answer_search?quiz_id=${quizId}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.ansList = data;
                    // console.log(this.ansList.quizList[0]);
                    // fetch是非同步，會最後執行，所以把判斷包在fetch之後ansList才會有資料
                    this.addShowList();
                    this.storageData();
                    this.changePage();

                })
        },
        addShowList() {
            let index = 0;
            let quizId = this.$route.params.id;
            // v-for: item in Arr   JS for each: index in Arr
            // 這邊foreach 了所有index的quizList內的資料
            for (index in this.ansList.quizList) {
                console.log(this.ansList.quizList[index].quizId);
                console.log(quizId);

                if (this.ansList.quizList[index].quizId == quizId) {

                    if (this.ansList.quizList[index].quId == 1) {

                        this.showList.push(this.ansList.quizList[index])
                    }
                }
                // console.log(this.ansList.quizList[index]);
            }
            console.log(this.showList);
        },
        // 做完用storage傳過去
        // 取得當前問卷
        getQuiz() {
            let quizId = this.$route.params.id;
            fetch(`http://localhost:8080/quiz/replySearch?quiz_id=${quizId}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    this.quizList = data;
                    // console.log(this.quizList);
                    // 儲存當前問卷問題，非字串轉成JSON格式
                    localStorage.setItem("storageQuiz", JSON.stringify(this.quizList));
                })
        },
        storageData() {
            // 儲存回答
            localStorage.setItem("storageAns", JSON.stringify(this.ansList))
        },
        changePage() {
            this.pageData = [] //清空陣列要裝當前頁面新的資料
            let i = 0 + (this.currentIndex - 1) * 10; //底下for迴圈用，從第幾筆資料開始裝
            let j = 10 + (this.currentIndex - 1) * 10; //從i 裝到哪筆資料
            let k = 0;
            console.log(i, j);
            // console.log(this.resObj.quizList.length);
            if (j > this.showList.length) {
                k = this.showList.length
                console.log(k);
            } else {
                k = j
            }
            for (i; i < k; i++) {
                this.pageData.push(this.showList[i])
                // console.log(this.showList);
            }
        },
        btnChangePage(n) {
            // 數字一樣不變
            if (this.currentIndex === n) {
                return
            }
            // 按不同頁更新索引位置
            this.currentIndex = n;
            console.log(n);
            console.log(this.currentIndex);
            //索引位置變了所以會裝不同位置的資料進來
            this.changePage();
        },
    },
    beforeMount() {
        this.ansSearch();
        this.getQuiz();
    }

}
</script>

<template>
    <div class="ansArea">
        <div class="header">
            <h1>{{ this.title }}</h1>
        </div>
        <div class="body">
            <table border="1">
                <tr>
                    <!-- 寫方法把重複的quiz塞選掉、用quId=1的 -->
                    <th>編號</th>
                    <th>姓名</th>
                    <th>電話</th>
                    <th>觀看回復</th>
                </tr>
                <!-- 用不重複List生成表格 -->
                <tr v-for="(item, index) in this.pageData" :key="item.name">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.phone }}</td>
                    <td>
                        <!-- email有設不重複 -->
                        <button @click="() => { this.$router.push(`/AnswerView/${item.email}`) }">前往</button>
                    </td>
                </tr>
            </table>
        </div>

        <div class="footer">
            <RouterLink to='/BackMain'>
                <button class="returnBtn">上一頁</button>
            </RouterLink>
            <button type="button" class="pageBtn" v-for="n in Math.ceil(this.showList.length / 10)"
                @click="this.btnChangePage(n)">{{ n
                }}</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ansArea {
    width: 99.9%;
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // border: 1px solid black;
    font-size: 25px;

    .header {
        width: 80%;
        height: 120px;
        flex-wrap: wrap;
        // border: 1px solid black;
    }

    .body {
        width: 80%;
        display: flex;
        justify-content: center;
        // border: 1px solid black;

        table {
            width: 50%;
            //border 無間隙
            border-collapse: collapse;
        }

        // 設定偶數列表格CSS
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

        button {
            width: 50%;
            height: 30px;
            font-size: 18px;
        }
    }

    .footer {
        width: 80%;
        position: relative;
        display: flex;
        justify-content: center;
        margin-top: 25px;

        // border: 1px solid black;
        .returnBtn {
            position: absolute;
            width: 90px;
            height: 50px;
            font-size: 25px;
            margin-top: 20px;
            right: 5%;
            bottom: 0%;
        }

        .pageBtn {
            width: 80px;
            height: 35px;
            margin-left: 20px;

        }
    }
}
</style>