<script>
// import { RouterLink, RouterView } from 'vue-router'
export default {
    // components: {
    //     RouterLink, RouterView
    // }
}
</script>

<template>
    <div class='bigArea'>
        <div class='area'>
            <p>請選擇</p>
            <div class="button">
                <router-link to="/FrontMain"><button type="button">使用者</button></router-link>
                <router-link to="/BackMain"><button type="button">管理員</button></router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bigArea {
    display: flex;
    justify-content: center;
    // align-items: center;   
    // border: 1px solid black;
.area{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 90vh;
    margin-top: 2%;
    border: 1px solid black;
    border-radius: 10px;
}
    p {
        font-size: 40px;
    }

    .button {
        width: 60%;
        height: 80px;
        // border: 1px solid black;
        display: flex;
        justify-content: space-between;
        margin-top: 10%;

        button {
            width: 23vw;
            height: 80px;
            font-size: 30px;
            border-radius: 7px;
            // margin-left: 1%;
        }
    }


}
</style>