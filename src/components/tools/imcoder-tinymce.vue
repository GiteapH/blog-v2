<template>
    <!-- 富文本 -->
    <div>
        <editor v-model="content" :init="init" :disabled="disabled" @onClick="onClick"></editor>
    </div>
</template>


<script>
import tinymce from "tinymce/tinymce";
import Editor from '@tinymce/tinymce-vue';
import "tinymce/icons/default/icons";
import 'tinymce/models/dom/model'
import "tinymce/themes/silver/theme";
import "tinymce/plugins/image";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/preview";
import "tinymce/plugins/code";
import "tinymce/plugins/link";
import "tinymce/plugins/advlist";
import "tinymce/plugins/codesample";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/autolink";
import "tinymce/plugins/directionality";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/template";
import "tinymce/plugins/charmap";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/autosave";
import "tinymce/plugins/autoresize";

export default {
    components: {
        Editor
    },
    props: {
        value: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        },
        init: {
            type: Object,
            default: () => ({
                language_url: "/static/tinymce/langs/zh-Hans.js",
                language: "zh-Hans",
                skin_url: "/static/tinymce/skins/ui/oxide",
                height: 770,
                min_height: 770,
                max_height: 770,
                inline: false,
                toolbar_mode: "wrap",
                plugins: "preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap nonbreaking insertdatetime advlist lists wordcount imagetools autosave autoresize",
                toolbar:  "code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link codesample | alignleft aligncenter alignright alignjustify outdent indent lineheight formatpainter | \
    styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
    table image media charmap hr pagebreak insertdatetime | bdmap fullscreen preview",
                content_style: "p {margin: 5px 0;}",
                fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
                font_formats:
                    "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
                branding: false,
                //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
                //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
                images_upload_handler: function (blobInfo, success, failure) {
                    var reader = new FileReader();
                    reader.readAsDataURL(blobInfo.blob());
                    reader.onload = function () {
                        tinymce.util.ImageUploader
                        return Promise.resolve(this.result)
                    };
                },
            })
        }
    },
    data() {
        return {
            //初始化配置

            content: this.value
        };
    },
    mounted() {
        tinymce.init(this.init);
    },
    methods: {
        setContent(content) {
            tinymce.activeEditor.setContent(content)
        }
    },
    watch: {
        value(newValue) {
            this.content = newValue;
        },
        content(newValue) {
            this.$emit("input", newValue);
        }
    }
};
</script>
<style scoped lang="scss">
</style>