<template>
    <draggable v-model="colors" @update="datadragEnd" :options = "{animation:500}">
            <transition-group>
                <div v-for="element in colors" :key="element.text" class = "drag-item">
                    {{element.text}}
                </div>
            </transition-group>
    </draggable>
</template>

<script>
    import draggable from 'vuedraggable'
    export default{
        data(){
            return{
                msg:"这是自由拖拽组件",
                colors: [
                    {
                        text: "拖拽模块一",
                    }, 
                    {
                        text: "拖拽模块二",
                    }, 
                    {
                        text: "拖拽模块三",
                    }, 
                ],
                startArr:[],
                endArr:[],
                count:0,
            }
        },
        components: {
        　　draggable
        },
        methods:{
            getdata (evt) {
                console.log(evt.draggedContext.element.text)
            },
            datadragEnd (evt) {
                //阻止火狐浏览器的默认事件
                evt.preventDefault();
                //获取排序后的新顺序
                console.log(this.colors);
            }
        },
        mounted () {
	        //为了防止火狐浏览器拖拽的时候以新标签打开
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
</script>

<style  scoped>
    .test{
        border:1px solid #ccc;
    }
    .drag-item{
        width: 200px;
        height: 50px;
        line-height: 50px;
        margin: auto;
        position: relative;
        background: #ddd;
        margin-top:20px;
    }
    .ghostClass{
        opacity: 1;
    }
    .bottom{
        width: 200px;
        height: 50px;
        position: relative;
        background: blue;
        top:2px;
        left: 2px;
        transition: all .5s linear;
    }
</style>
