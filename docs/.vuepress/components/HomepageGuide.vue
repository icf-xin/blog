<template>
    <div>
        <div>
            <h2>文章导航</h2>
        </div>
        <div>
            <div v-for="(item, index) in context_data['guide']" :key="index">
                <a :href="index">{{item}}</a>
            </div>
        </div>
    </div>
</template>
<script>
import context_data from '/content_data.json';

export default {
    name:"homepageGuide",
    data(){
        return {
            context_data: null,
            page_list:[]
        }
    },
    mounted(){
        this.context_data = context_data;
        for(let item in this.context_data['guide']){
            this.page_list.push([path.slice(0, path.length-1)+".html", this.context_data['guide'][item]])
        }
    }
}
</script>