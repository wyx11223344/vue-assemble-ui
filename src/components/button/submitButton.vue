<template>
    <div class="submit-button f-csp" :class="type">
        <div class="hover-submit-button"></div>
        <div class="show-button">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'primary'
        }
    }
};
</script>

<style scoped lang="less">
.submit-button{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    margin: 0 10px;
    font-size: 16px;
    font-weight: bold;
    overflow: hidden;
    &:hover{
        .hover-submit-button{
            transform: translateY(0);
        }
    }
    .show-button{
        padding: 0 15px;
        z-index: 1;
        transition: 0.3s;
        transform: translateY(-30px);
    }
    .hover-submit-button{
        width: 100%;
        height: 30px;
        transition: 0.3s;
        transform: translateY(28px);
    }
}
.primary {
	background-color: #fff;
    &:hover{
        .show-button{
			color: #fff;
        }
    }
    .show-button{
        color: #1890ff;
    }
    .hover-submit-button{
		background-color: #1890ff;
    }
}
.info {
	background-color: #fff;
    &:hover{
        .show-button{
            color: #fff;
        }
    }
    .show-button{
        color: #b4b4b4;
    }
    .hover-submit-button{
		background-color: #b4b4b4;
    }
}
</style>
