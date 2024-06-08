<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    components: {
        RouterLink, RouterView
    },
    data() {
        return {
            ansName: "",
            ansPhone: "",
            ansEmail: "",
            ansAge: "",
            ansList: [],
            view: false,
            isDisabled: false,
        }
    },
    methods: {
        replySearch() {
            let quizId = this.$route.params.id;
            fetch(`http://localhost:8080/quiz/replySearch?quiz_id=${quizId}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.ansList = data;
                    // console.log(this.ansList.quizList[0].quiz_name);
                    // console.log(this.ansList.quizList[0]);
                })
        },
        ansSave() {
            let ansArr = []
            for (let i = 1; i <= this.ansList.quizList.length; i++) {  // 代表題號
                let ansObj = {     // 毎一列需要有的內容
                    // 固定的值用v-model在input輸入了
                    // 不固定的給空字串
                    quizId: this.$route.params.id,
                    quId: '',
                    name: this.ansName,
                    phone: this.ansPhone,
                    email: this.ansEmail,
                    age: this.ansAge,
                    answer: '',
                }
                if (!this.ansName || !this.ansPhone || !this.ansEmail || !this.ansAge) {
                    window.alert("基本資料為必填項目");
                    return;
                }
                if (this.ansPhone.length !== 10) {
                    window.alert("手機格式錯誤")
                    return
                }
                // `` 是 JS裡面放變數用
                let eachAns = document.getElementsByClassName(`qu_${i}`);
                for (let item in eachAns) {   // 一題的毎個答案
                    console.dir(eachAns[item]);
                    if (eachAns[item].type === "radio") {//item是數字，所以取值要用變數[item]
                        if (eachAns[item].checked == true) {//單選多選要用.checked判斷有沒有被勾選
                            ansObj.answer = eachAns[item].value;
                        }
                    }
                    if (eachAns[item].type === "checkbox") {
                        // console.log(eachAns[item].value);
                        // console.log(eachAns[item].checked);
                        if (eachAns[item].checked == true) {
                            ansObj.answer += eachAns[item].value;//多選用+=塞多個值
                        }
                    }
                    if (eachAns[item].type === "text") {
                        ansObj.answer = eachAns[item].value;
                    }
                }
                ansObj.quId = i;// 給quid
                ansArr.push(ansObj);// 把一題的完整內容塞進陣列
            }
            console.log(ansArr);
            let obj = { answerList: ansArr };
            fetch("http://localhost:8080/quiz/answer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.alert("作答完成")
                    this.$router.push('/FrontMain')
                })
        },
    },
    beforeMount() {
        this.replySearch();
    },

}
</script>

<template>
    <!-- 用迴圈判斷題型，用v-bind設定class -->
    <!-- 1單選，2多選，0簡答 -->
    <div class="bigArea">
        <div class="mainDiv">
            <h1>{{ this.ansList.quizList[0].quiz_name }}</h1>
            <div class="disDiv">
                {{ this.ansList.quizList[0].quiz_discription }}
            </div>
            <div class="baseDiv">
                <label for="">姓名:</label>
                <input type="text" :disabled=this.isDisabled v-model="this.ansName">
            </div>
            <div class="baseDiv">
                <label for="">手機:</label>
                <input type="text" :disabled=this.isDisabled v-model="this.ansPhone">
            </div>
            <div class="baseDiv">
                <label for="">E-mail:</label>
                <input type="text" :disabled=this.isDisabled v-model="this.ansEmail">
            </div>
            <div class="baseDiv">
                <label for="">年齡:</label>
                <input type="number" :disabled=this.isDisabled v-model="this.ansAge">
            </div>
            <div>{{ item }}</div>
            <div class="big" v-for="item in this.ansList.quizList">
                <div v-if="item.question_type == 1" class="single">
                    <div class="quDiv">
                        {{ item.qu_id }}.{{ item.question_name }}
                        <div class="necDiv" v-if="item.is_necessary == 1">
                            <p>(必填)</p>
                        </div>
                    </div>
                    <div class="opDiv">
                        <!-- 用split()切，裡面用;切，外面有雙引號要用單引號才不會報錯 -->
                        <div class="innerOP" v-for="op in item.question_options.split(';')">
                            <!-- class的v-bind讓每個答案有對應的qu_id，後面value的v-bind一定要設定才會賦予值 -->
                            <!-- class的名稱吃不到數字，所以用字串+數字就吃的到了 -->
                            <input type="radio" name="isRadio" :disabled="this.isDisabled" :class="'qu_' + item.qu_id"
                                :value="op">
                            <span>{{ op }}</span>
                        </div>
                    </div>
                </div>
                <div v-if="item.question_type == 2" class="multiple">
                    <div class="quDiv">
                        {{ item.qu_id }}.{{ item.question_name }}
                        <div class="necDiv" v-if="item.is_necessary == 1">
                            <p>(必填)</p>
                        </div>
                    </div>
                    <div class="opDiv">
                        <!-- 用split()切，裡面用;切，外面有雙引號要用單引號才不會報錯 -->
                        <div class="innerOP" v-for="op in item.question_options.split(';')">
                            <input type="checkbox" :disabled=this.isDisabled :value="op" :class="'qu_' + item.qu_id">
                            <span>{{ op }}</span>
                        </div>
                    </div>
                </div>
                <div v-if="item.question_type == 0" class="text">
                    <div class="quDiv">
                        {{ item.qu_id }}.{{ item.question_name }}
                        <div class="necDiv" v-if="item.is_necessary == 1">
                            <p>(必填)</p>
                        </div>
                    </div>
                    <label for=""></label>
                    <input type="text" :disabled=this.isDisabled :class="'qu_' + item.qu_id">
                </div>
            </div>
            <div class="btnDiv">
                <button v-if="!view" @click="() => {
                    this.$router.push('/FrontMain')
                }">取消</button>
                <button @click="() => { this.view = false, this.isDisabled = false }" v-if="view">上一步</button>
                <button v-if="!view" @click="() => { this.view = true, this.isDisabled = true }">預覽</button>
                <!-- <RouterLink to="/FrontMain"> -->
                <button v-if="view" @click="this.ansSave()">送出</button>
                <!-- </RouterLink> -->
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.bigArea {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 25px;

    .mainDiv {
        width: 80%;
        height: auto; //最後改成auto試試看
        display: flex;
        justify-content: center;
        // align-items: center;
        flex-direction: column;
        // border: 1px solid black;

        input[type="text"] {
            font-size: 20px;
        }

        .single {
            margin-bottom: 20px;
        }

        .multiple {
            margin-bottom: 20px;
        }

        .text {
            margin-bottom: 20px;

            input {
                width: 50vw;
                height: 20vh;
                line-height: 0vh;
            }
        }

        h1 {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
            font-size: 40px;
        }

        .disDiv {

            width: 90%;
            font-size: 25px;
            margin-top: 15px;
            margin-left: 50px;
        }

        .baseDiv {
            margin-top: 15px;

            label {
                margin-right: 20px;
            }

            input {
                width: 20vw;
                height: 25px;
            }
        }

        .quDiv {
            position: relative;

            .nucDiv {
                position: absolute;
            }
        }

        .opDiv {
            width: auto;
            height: auto;
            display: flex;
            justify-content: center;
            // align-items: center;
            flex-direction: column;

            input {
                width: 20px;
                height: 20px;
                margin-right: 20px;
            }
        }



        // 設定不顯示的樣式
        :disabled {
            border: none;
            background: none;
        }

        .btnDiv {
            // 靠右
            text-align: right;

            button {
                width: 8vw;
                height: 5vh;
                margin-right: 20px;
                font-size: 20px;
            }
        }
    }
}
</style>