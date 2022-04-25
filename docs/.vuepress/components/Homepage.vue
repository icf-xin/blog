<template>
  <div>
    <div>
      <h2>首页引导页</h2>
    </div>
    <div>test
      <a href="/md/acg/">我喜欢败犬角色的理由 —— 《败犬女主太多了简评》</a>
    </div>
    <div v-for="(item, index) in page_list" :key="index">
      <h3>{{item[0]}}</h3>
      <div v-for="(item0, index0) in item[1]" :key="index0">
        <a :href="item0[0]">{{item0[1]}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import context_data from '/content_data.json';

export default {
  name: "Homepage.vue",
  data(){
    return {
      content_data:null,
      page_list: [],
      page_name:{
        "acg":"生活",
        "guide":"分栏"
      }
    }
  },
  mounted(){
    this.content_data = context_data;
    console.log(this.content_data)
    for(let item in this.content_data){
      let data_item = []
      for(let path in this.content_data[item]){
        data_item.push(
            [path, this.content_data[item][path]]
        )
      }
      this.page_list.push([this.page_name[item], data_item])
    }
  }
}
</script>

<style scoped>

</style>