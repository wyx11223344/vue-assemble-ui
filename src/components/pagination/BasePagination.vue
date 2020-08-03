<template>
    <div class="page-bar">
        <ul>
            <li v-if="page.cur>1" @click="page.cur--"><a>&lt;</a></li>
            <li v-if="page.cur===1"><a class="banclick">&lt;</a></li>
            <!--当前页背景色为蓝色-->
            <li v-if="indexs[0] !== 1" @click="btnClick(indexs[0])"><a>...</a></li>
            <li @click="btnClick(index)" v-for="index in indexs" :class="{ 'active': page.cur === index}" :key="index">
                <a>{{ index }}</a>
            </li>
            <li v-if="indexs[indexs.length - 1] !== page.all" @click="btnClick(indexs[indexs.length - 1])"><a>...</a></li>
            <li v-if="page.cur<page.all" @click="page.cur++"><a>&gt;</a></li>
            <li v-if="page.cur === page.all"><a class="banclick">&gt;</a></li>
            <li><a>共<i>{{page.all}}</i>页</a></li>
        </ul>
    </div>
</template>

<script>
import { reactive, computed, watch, ref } from 'vue';

export default {
    name: 'BasePagination',
    props: {
        pageNum: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 1
        }
    },
    setup(props, { emit }) {
        const indexs = computed(() => {
            var left = 1;
            var right = page.all;
            var ar = [];
            if (page.all >= 5) {
                // 这里最大范围从3到6，如果到达7，那么下边加2变成9，已经超过最大的范围值
                if (page.cur > 3 && page.cur < page.all - 1) {
                    // 以4为参考基准，左面加2右边加2
                    left = page.cur - 2;
                    right = page.cur + 2;
                } else {
                    if (page.cur <= 3) {
                        left = 1;
                        right = 5;
                    } else {
                        right = page.all;
                        left = page.all - 4;
                    }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar;
        });

        const getPage = ref(props.pageNum);
        const page = reactive({
            all: computed(() => Math.ceil(props.total / props.pageSize)), // 总页数
            cur: getPage// 当前页码
        });

        function btnClick(data) {
            if (data !== page.cur) {
                page.cur = data;
            }
        }

        watch(getPage, () => {
            emit('update:pageNum', getPage.value);
            emit('change');
        });

        watch(props, () => {
            if (getPage.value !== props.pageNum) {
                getPage.value = props.pageNum;
            }
        });

        return {
            page,
            indexs,
            btnClick
        };
    }
};
</script>

<style scoped lang="less">
    .page-bar{
        height: 39px;
        ul{
            height: 39px;
            li{
                display: inline-block;
                padding: 9px 15px;
                border-radius: 20px;
                cursor: pointer;
                i{
                    color: #ff7575;
                    padding: 0 5px;
                }
            }
            .active{
                background-color: #ff7575;
                a{
                    color: white;
                }
            }
            .banclick{
                cursor: not-allowed;
            }
        }
    }
</style>
