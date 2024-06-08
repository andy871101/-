<script>
export default {
    data() {
        return {
            quizData: [],
            ansData: [],
            view: false,
            isDisabled: false,
            // 裝當前使用者資料
            userData: [],
            textAns: [],
        }
    },
    methods: {
        getData() {
            this.quizData = JSON.parse(localStorage.getItem("storageQuiz"));
            this.ansData = JSON.parse(localStorage.getItem("storageAns"));
            console.log(this.quizData.quizLists);
            console.log(this.ansData);
        },
        // 用email取出當前作答者的回答
        getUser() {
            // JS 的foreach 內let 參數不給值會從0開始跑
            console.log(this.ansData);
            for (let index in this.ansData.quizList) {
                if (this.ansData.quizList[index].email === this.$route.params.id) {
                    this.userData.push(this.ansData.quizList[index])
                }
            }
            console.log(this.userData);
        },

        // getAns() {
        //     // 用題目id 抓取對應的填答框的資料
        //     for (let index in this.quizData.quizList) {
        //         // 取得class的value
        //         let classValue = document.getElementsByClassName(`qu_${this.quizData.quizList[index].qu_id}`)
        //         console.dir(classValue);
        //         // 如果沒回答跳過當前題目
        //         console.log(this.userData[index].answer);
        //         if (this.userData[index].answer = '') {
        //             continue
        //         } else {
        //             // 如果有回答做判斷題型
        //             if (this.quizData.quizList[index].question_type = 0) {
        //                 classValue = this.userData[index].answer
        //             } else {
        //                 for (index2 in classValue) {
        //                     if (classValue) {

        //                     }
        //                 }
        //             }
        //         }

        //         // 根據 題目 qu_id 去抓取對應的填答框 (input) class_${qu_id}  ==> 抓到答案
        //         // 判斷有沒有東西：沒有的話，continue;，有的話就要做以下的判斷
        //         // 根據 quizData 的 type 去判斷題目類型
        //         // 如果是非選擇 ==> 抓到的輸入框的value = 對應的答案的 value
        //         // 如果是選擇   ==> 對 input 做 forEach，判斷 input 的 value 有無 contains 在 Answer 裡面，如果有就 checked
        //         // 當 question_type 為 0 時，將文字題的答案填入 textAns 中
        //     }
        // },

        created() {
            console.log(beforeMount);
            this.getData()
            this.getUser()
        },
    }
}
</script>

<template>
    <!-- <div class="bigArea">
        <button @click="this.getAns()">Btn</button>
        <div class="mainDiv">
            <h1>{{ this.quizData.quizList[0].quiz_name }}</h1>
            <div class="disDiv">
                {{ this.quizData.quizList[1].quiz_discription }}
            </div>
            <div class="baseDiv">
                <label for="">姓名:</label>
                <input type="text" :disabled=this.isDisabled v-model="this.userData[0].name">
            </div>
            <div class="baseDiv">
                <label for="">手機:</label>
                <input type="text" :disabled=this.isDisabled v-model="this.userData[0].phone">
            </div>
            <div class="baseDiv">
                <label for="">E-mail:</label>
                <input type="text" :disabled=this.isDisabled v-model="this.userData[0].email">
            </div>
            <div class="baseDiv">
                <label for="">年齡:</label>
                <input type="number" :disabled=this.isDisabled v-model="this.userData[0].age">
            </div>
            <div class="biggg" v-for="item in this.quizData.quizList">
                <div v-if="item.question_type == 1" class="single">
                    <div class="quDiv">
                        {{ item.qu_id }}.{{ item.question_name }}
                        <div class="necDiv" v-if="item.is_necessary == 1">
                            <p>(必填)</p>
                        </div>
                    </div>
                    <div class="opDiv"> -->
                        <!-- 用split()切，裡面用;切，外面有雙引號要用單引號才不會報錯 -->
                        <!-- <div class="innerOP" v-for="op in item.question_options.split(';')"> -->
                            <!-- class的v-bind讓每個答案有對應的qu_id，後面value的v-bind一定要設定才會賦予值 -->
                            <!-- class的名稱吃不到數字，所以用字串+數字就吃的到了 -->
                            <!-- <input type="radio" name="isRadio" :disabled="this.isDisabled" :class="'qu_' + item.qu_id"
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
                    <div class="opDiv"> -->
                        <!-- 用split()切，裡面用;切，外面有雙引號要用單引號才不會報錯 -->
                        <!-- <div class="innerOP" v-for="op in item.question_options.split(';')">
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
                    this.$router.push('/')
                }">取消</button>
                <button @click="() => { this.view = false, this.isDisabled = false }" v-if="view">上一步</button>
            </div>
        </div>
    </div> -->

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
            font-size: 25px;
            margin-top: 15px;
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