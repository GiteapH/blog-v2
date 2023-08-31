<template>
    <div style="overflow: scroll;height: 400px;z-index: 999999;">
        <div v-for="collase in collapses" v-show="collase.list.length != 0" :key="collase.key" class="user_card">
            <p>{{ collase.key }}</p>
            <div v-for="user in collase.list" :key="user.id" class="user_item" @click="addAt(user)">
                <a-row>
                    <a-col :span="5">
                        <a-avatar :src="'/img/userHead/' + user.head"></a-avatar>
                    </a-col>
                    <a-col :span="19">
                        <editHTML :html="user.usernameHTML"></editHTML>
                        <P
                            style="color:grey;font-size: 10px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width:100%">
                            {{ user.describe }}</P>
                    </a-col>
                </a-row>
            </div>
        </div>
    </div>
</template>

<script>
import editHTML from '../editHTML'
export default {
    name: 'BlogMention',
    components: {
        editHTML,
    },
    watch: {
        keyboard(nv, ov) {            
            this.copyCollapses.forEach((e,idx) => {
                this.collapses[idx].list = e.list.filter((v,idx2)=>{
                    let f = v.username.indexOf(nv) != -1
                    if(f){
                        let start = v.username.indexOf(nv),end = start+nv.length
                        
                        let select =  v.username.substring(start,end)
                        let front = v.username.substring(0,start)
                        let back = v.username.substring(end)
                        
                        v.usernameHTML = `<p>${front}<span style="color:#3abced">${select}</span>${back}</p>`
                    }
                    return f;
                })
            })

            
        }
    },
    data() {
        return {
            collapses: [],
            copyCollapses:[],
            initLoading: false,
            userinfo: this.$store.state.myself,
            keyboard: ""
        };
    },

    mounted() {
        this.getGroups()
    },

    methods: {
        addAt(user){
            this.$parent.dynamicContent=this.$parent.dynamicContent.substring(0,this.$parent.dynamicContent.lastIndexOf('@'))+ `\`@${user.username}:\` `
            this.$parent.showArt=false
            
        },
        async getGroups() {
            await this.$FanReq.getGroups(this.userinfo.id).then(res => {
                for (let collapse of res) {
                    this.collapses.push({
                        key: collapse,
                        current: 1,
                        total: 0,
                        sortKey: '1',
                        list: []
                    })
                    this.copyCollapses.push({
                        key: collapse,
                        current: 1,
                        total: 0,
                        sortKey: '1',
                        list: []
                    })
                }
            })
            for (let i = 0; i < this.collapses.length; i++)
                this.getFans(this.userinfo.id, 1, 1688, i, 0)
        },
        getFans(loginUid, page, limit, sortKey, type) {
            this.initLoading = true
            this.$FanReq.getLUFans(loginUid, page, limit, sortKey, type).then(res => {
                res = res.map(e=>{
                    e.usernameHTML = `<p style="color:#3c3c3c">${e.username}</p>`
                    return e
                })
                this.collapses[type].list = res
                this.collapses[type].total = res[0]?.size ?? 0
                this.copyCollapses[type].list = res
                this.copyCollapses[type].total = res[0]?.size ?? 0
                this.initLoading = false
            })
        }
    },
};
</script>

<style scoped>
.user_card {
    margin-top: 10px;
    background: whitesmoke;
}

.user_item {
    margin-top: 10px;
    padding: 5px;
    border-radius: 5px;
}

.user_item:hover {
    background: #cecece;
}

.at_span{
    color:rgb(0, 195, 255);
    padding:5px;
}

.at_span:hover{
    background:rgba(72, 191, 247, 0.644);
}
</style>