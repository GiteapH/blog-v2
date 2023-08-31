import { formatDate } from '../lib/js/tools'
import { message } from 'ant-design-vue'
import { post, get } from '../lib/js/axios'
export function parseComments(data) {
    if (data.length != 0) {
        let uids = {}, dislikes = {}
        if (data[0].type == 0)
            uids[data[0].cid] = data[0].goodUid ? [data[0].goodUid] : []
        else
            dislikes[data[0].cid] = data[0].goodUid ? [data[0].goodUid] : []
        delete data[0].goodUid
        delete data[0].goodAid
        let result = [data[0]]
        for (let i = 1; i < data.length; i++) {
            if (data[i].cid == data[i - 1].cid) {
                if (data[i].goodUid) {
                    if (data[i].type == 0)
                        uids[data[i].cid].push(data[i].goodUid)
                    else
                        dislikes[data[i].cid].push(data[i].goodUid)
                }
            } else {
                uids[data[i].cid] = []
                dislikes[data[i].cid] = []
                if (data[i].goodUid) {
                    if (data[i].type == 0)
                        uids[data[i].cid].push(data[i].goodUid)
                    else
                        dislikes[data[i].cid].push(data[i].goodUid)
                }
                delete data[i].goodUid
                delete data[0].goodAid
                result.push(data[i])
            }
        }

        return ({
            comments: result,
            comment_users: uids,
            dislikes: dislikes
        })
    }
    else
        return null
}

let f = false
let node = ''
export function getComments({ comments, comment_users, dislikes }, self, showDetail = true, { upuid, upaid, cType = 1 }) {
    if (!f) {
        f = true
        node = self
    }
    
    let rootComment = new Map()
    let users = new Map()
    for (let comment of comments) {
        users.set(comment.id, [comment.username, comment.head, comment.email, comment.describe, comment.cardimg])
    }
    for (let data of comments) {
        // 为根评论
        let pointsSet = new Set(comment_users[data.cid])
        let dislikesSet = new Set(dislikes[data.cid])
        data.content = data.content.replace(/\#(\d+);/g, `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/$1.gif"/>`)
        let content = ''
        // 回复用户删评论
        if (!users.get(data.toUid) && data.toUid) {
            content = '<span style="color:#afafaf;">需要回复的评论消失啦</span>'
        } else {
            content = data.toUid == null ? data.content : (`<a style="color:#40a9ff;margin-right:5px" href="/user/${data.fromUid}">@` + users.get(data.toUid)[0] + ":</a> " + data.content)
        }
        let comment = {
            needDynamic: false,
            precid: data.precid,
            cid: data.cid,
            points: pointsSet,
            dislikes: dislikesSet,
            toUid: !showDetail ? null : data.toUid,
            head: 'img/userHead/' + data.head,
            author: data.username,
            likes: data.like == null ? 0 : Json.parse(data.like).length,
            comment: content,
            date: formatDate(data.date),
            replay: async (fromId, content, sendDynamic = false) => {
                if (content == '') {
                    message.warning("评论不能为空")
                    return
                }
                await post('/comment/insertComment', {
                    uid: upuid,
                    aid: upaid,
                    content: content,
                    fromUid: fromId,
                    toUid: data.fromUid,
                    date: formatDate(new Date()),
                    precid: data.toUid ? data.precid : data.cid,
                    replayCid: data.cid,
                    ctype: cType
                }, null, {
                    need: sendDynamic
                }).then(res => {
                    if (res.resultCode == 200) {
                        self.submitting = false
                        message.success("发表成功")
                    } else {
                        message.error('发送异常，请检查网络')
                        self.submitting = false
                        throw new Error('Net Error')
                    }
                }).catch(err => {
                    self.submitting = false
                    throw new Error(err)
                })
            },
            showDetailComments: showDetail == true ? () => {
                node.$refs.comment.detailloading = true
                get('/comment/getDetailComments', {
                    uid: upuid,
                    aid: upaid,
                    rootUid: data.toUid,
                    answerUid: data.fromUid,
                    cid: data.precid
                }).then(({ data }) => {
                    if (data.resultCode == 200) {
                        message.success("获取成功")
                        let detailcomments = parseComments(data.data)
                        let comments = getComments(detailcomments, self, false, node)
                        node.$refs.comment.detailcomments = comments
                        node.$refs.comment.ShowDetail = true
                        node.$refs.comment.detailloading = false
                    } else {
                        message.error('获取失败，请检查网络')
                    }
                }).catch(e => {
                    node.$refs.comment.detailloading = false
                    
                })
            } : null,
            isReplay: false,
            children: []
        }
        try {
            // 
            if (!data.toUid) {
                //               cid
                rootComment.set(data.cid, comment)
                console.log(rootComment)
            } else {
                console.log(data)
                rootComment.get(data.precid).children.push(comment)
            }
        } catch (e) {
            console.error(e)
        }
    }
    let res = []
    for (let values of rootComment.values()) {
        res.push(values)
    }
    res.len = comments.length
    return res
}


export function getOrder(type) {
    
    switch (parseInt(type)) {
        case 0:
            return [{
                name: '综合排序',
                key: 0
            }, {
                name: '最多喜欢',
                key: 1
            }, {
                name: '最多收藏',
                key: 2
            }, {
                name: '最多观看',
                key: 3
            }, {
                name: '最多评论',
                key: 4
            }, {
                name: '最新发布',
                key: 5
            }]
        default:
            return []
    }
}

export function getMainTags(type) {
    switch (type) {
        case 1:
            return [
                {
                    name: '默认排序',
                    key: 0
                },
                {
                    name: '阅读数',
                    key: 1
                },{
                    name: '发布数',
                    key: 2
                },{
                    name: '被访问数',
                    key: 3
                },{
                    name: '点赞数',
                    key: 4
                },{
                    name: '注册时间',
                    key: 5
                },
            ]
        default:
            return []
    }
}
