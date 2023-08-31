<template>
    <div>
        <div>
            <span :style="{ marginRight: '8px' }">感兴趣的标签:</span>
            <el-tag :closable="addMore" @close="removeTagVaue(tag)" v-for="tag in likeTags" :key="tag" size="large"
                style="margin-right:10px;margin-top:10px;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">{{
                    tag.categoryName
                }}</el-tag>
            <el-tag style="background: #fff; border-style: dashed" @click="addMore = true" size="large">
                <PlusOutlined />
                新增
            </el-tag>
            <div v-show="addMore" class="addMore" style="border:1px dashed gray;">
                <a-tabs v-model:activeKey="levelOneActive" :tab-position="mode" @tabScroll="callback">
                    <a-tab-pane v-for="(levelOne, index) in tagsData" :key="index" :tab="levelOne.categoryName">
                        <div class="more">
                            <span v-for="(levelTwo, index) in levelOne.sonCategories" :key="index">
                                <el-check-tag v-if="levelTwo.sonCategories.length == 0"
                                    :checked="checkContain(levelTwo)" size="large"
                                    @click="addTagVaue(levelTwo)"
                                    style="margin-right:10px;margin-top:10px;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">{{
                                        levelTwo.categoryName
                                    }}</el-check-tag>
                                <a-tree-select v-else v-model:value="levelTwo.sonCategories[0].categoryId" show-search
                                    style="width: 10%;margin-right:10px;margin-top:10px;"
                                    :dropdown-style="{ maxHeight: '250px', overflow: 'auto' }"
                                    placeholder="Please select" tree-default-expand-all @select="treeSelect"
                                    :tree-data="levelTwo.sonCategories" :field-names="{
                                        children: 'sonCategories',
                                        label: 'categoryName',
                                        value: 'categoryId',
                                    }"></a-tree-select>
                            </span>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
        <div style="margin-top:15px">
            <span :style="{ marginRight: '8px' }">不感兴趣的标签:</span>
            <el-tag :closable="!addMore" @close="removeTagVaue(tag)" v-for="tag in DislikeTags" :key="tag" size="large"
                style="margin-right:10px;margin-top:10px;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">{{
                    tag.categoryName
                }}</el-tag>
            <el-tag style="background: #fff; border-style: dashed" @click="addMore = false" size="large">
                <PlusOutlined />
                新增
            </el-tag>
            <div v-show="!addMore" class="addMore" style="border:1px dashed gray;">
                <a-tabs v-model:activeKey="levelTwoActive" :tab-position="mode" @tabScroll="callback">
                    <a-tab-pane v-for="(levelOne, index) in tagsData" :key="index" :tab="levelOne.categoryName">
                        <div class="more">
                            <span v-for="(levelTwo, index) in levelOne.sonCategories" :key="index">
                                <el-check-tag v-if="levelTwo.sonCategories.length == 0"
                                    :checked="checkContain(levelTwo)" size="large"
                                    @click="addTagVaue(levelTwo)"
                                    style="margin-right:10px;margin-top:10px;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">{{
                                        levelTwo.categoryName
                                    }}</el-check-tag>
                                <a-tree-select v-else v-model:value="levelTwo.sonCategories[0].categoryId" show-search 
                                    style="width: 10%;margin-right:10px;margin-top:10px;"
                                    :dropdown-style="{ maxHeight: '250px', overflow: 'auto' }"
                                    placeholder="Please select" -clear tree-default-expand-all @select="treeSelect"
                                    :tree-data="levelTwo.sonCategories" :field-names="{
                                        children: 'sonCategories',
                                        label: 'categoryName',
                                        value: 'categoryId',
                                    }"></a-tree-select>
                            </span>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import { PlusOutlined, ManOutlined, WomanOutlined, RobotOutlined, EditOutlined } from '@ant-design/icons-vue'
export default defineComponent({
    props: {
        userinfo: {
            default: {},
            type: Object
        }
    },
    data() {
        return {
            likeTags: [],
            DislikeTags: [],
            addMore: true,
            tagsData: [],
            moreLevelActive: '',
            levelTwoActive:'',
            levelOneActive:''
        };
    },
    components: {
        PlusOutlined
    },
    mounted() {
        
        this.$tags.getCategories().then(res => {
            this.tagsData = res
            
        })
        this.$users.getUserCategory(this.$props.userinfo.id).then(res => {
            this.likeTags = res?.likeCategory??[]
            this.DislikeTags = res?.dislikeCategory??[]
        })
    },
    methods: {
        treeSelect(val, node, extra) {
            this.addTagVaue(node, this.addMore)
        },
        addTagVaue(tag) {
            if (this.addMore) {
                if (this.likeTags.indexOf(tag) == -1)
                    this.likeTags.push(tag)
                this.updateData(this.likeTags)
            } else {
                if (this.DislikeTags.indexOf(tag) == -1)
                    this.DislikeTags.push(tag)
                this.updateData(this.DislikeTags)
            }

        },
        removeTagVaue(tag) {
            if (this.addMore) {
                for (let index = 0; index < this.likeTags.length; index++) {
                    if (this.likeTags[index].categoryName == tag.categoryName) {
                        this.likeTags.splice(index, 1)
                    }
                }
                this.updateData(this.likeTags)
            } else {
                for (let index = 0; index < this.DislikeTags.length; index++) {
                    if (this.DislikeTags[index].categoryName == tag.categoryName) {
                        this.DislikeTags.splice(index, 1)
                    }
                }
                this.updateData(this.DislikeTags)
            }
        },
        checkContain(item) {
            if (this.addMore) {
                for (let likeTag of this.likeTags) {
                    if (likeTag.categoryName == item.categoryName) {
                        return true
                    }
                }
                return false
            }else{
                for (let dislikeTag of this.DislikeTags) {
                    if (dislikeTag.categoryName == item.categoryName) {
                        return true
                    }
                }
                return false
            }
        },
        updateData(values){
            
            let data = values.map(value=>{
                    return value.categoryId
                }).join(",")
                
            if(this.addMore) {
                this.$users.updateUserInfo({
                    uid:this.$props.userinfo.id,
                    likeCategory:data
                })
            }else{
                this.$users.updateUserInfo({
                    uid:this.$props.userinfo.id,
                    dislikeCategory:data
                })
            }
        }
    }
})
</script>

<style>
.addMore {
    border-radius: 10px;
    margin-top: 25px;
    padding: 15px;
}

.more {}
</style>