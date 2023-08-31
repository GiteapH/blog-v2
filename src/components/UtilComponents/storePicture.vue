<template>
    <div>
        <p style="margin-bottom: 15px;">上传图片&nbsp&nbsp&nbsp<span style="color:grey;font-size: 12px;">{{
            `${fileList.length}/${limit}` }}</span></p>
        <photo-provider style="display: flex;">
            <a-divider style="width:100%"></a-divider>
            <photo-consumer v-for="(src, index) in fileList" :intro="src.uid" :key="src.uid" :src="src.base64" style="    transition: all ease 0.5s;">
                <div style="margin-left:5px">
                    <img :src="src.base64" class="view-box">
                    <a-row class="delete">
                        <a-col :span="21">
                            <DeleteOutlined @click="$event => onDelete($event, index)" style="cursor: pointer;" />
                        </a-col>
                    </a-row>
                </div>
                <a-spin :spinning="src.loading" tip="处理中..."></a-spin>
            </photo-consumer>
            <div v-if="fileList.length < limit" style="padding:auto auto;">
                <div class="upload_text" id="add_file" @click="openInput">
                    <plus-outlined />
                    <p>上传动态图片</p>
                </div>
                <input id="file_input" type="file" ref="file" name="file" @change="getFile" style="display: none;">
            </div>
        </photo-provider>
    </div>
</template>

<script>
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { getBase64 } from '@/lib/js/tools'
export default {
    name: 'BlogStorePicture',
    data() {
        return {
            fileList: []
        };
    },
    props: {
        limit: {
            type: Number,
            default: 10
        }
    },
    mounted() {

    },

    methods: {
        openInput() {
            
            this.$refs.file.dispatchEvent(new MouseEvent('click'))
        },
        async getFile(el) {
            let file = el.target.files[0]
            file.loading = true
            await getBase64(file).then(res => {
                file.loading = false
                file.base64 = res
            }).catch(err => {
                file.loading = false
            })
            
            this.fileList.push(file)
        },
        onDelete(event, index) {
            event.stopPropagation()
            this.fileList.splice(index, 1)
        }
    },
    components: {
        PlusOutlined,
        DeleteOutlined
    },
};
</script>

<style scoped>
.upload_text {
    border: dotted 1px rgba(202, 202, 202, 0.856);
    text-align: center;
    width: 100px;
    height: 100px;
    padding-top: 20px;
}

.upload_text:hover {
    border: dotted 1px rgba(32, 139, 226, 0.856);
}

.view-box {
    height: 100px;
    /* margin-right: 15px; */
    margin-bottom: 15px;
}

.PhotoConsumer:hover .delete {
    display: block;
}



.delete {
    position: relative;
    z-index: 999;
    top:-55px;
    transition: all 0.5s ease;
    text-align:center;
    background:rgba(32, 139, 226, 0.256);
    color:white;
}

.delete:hover {
    color: rgba(32, 139, 226, 0.856);
    z-index: 999;
    display: block;
}

img:hover {
    border:1px solid rgba(32, 139, 226, 0.856);
    z-index: 999;
    display: block;
}
</style>