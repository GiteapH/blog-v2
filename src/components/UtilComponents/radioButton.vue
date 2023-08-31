<template>
    <div style="flex-wrap:wrap;display:flex">
        <div v-for="(tag, index) in tags" :key="tag.key" :class="`tag ${activeIdx == index ? 'active' : ''}`"
            @click="onClick(tag, index)">

            {{ tag.name }}

        </div>
    </div>
</template>

<script>
export default {
    name: 'BlogRadioButton',
    props: {
        tags: {
            type: Array,
            default: []
        },
        value: {
            type: Object,
            default: {
                name: '',
                key: 0
            }
        }
    },
    data() {
        return {
            activeIdx: 0
        };
    },

    mounted() {

    },

    methods: {
        onClick(tag, index) {
            this.activeIdx = index
            this.$emit('change', tag)
        }
    },
};
</script>

<style scoped>
.active {
    color: #00aeec;
    background: #DFF6FD;
    border-radius: 8px;

}

.tag {
    margin-right: 15px;
    font-size: 18px;
    padding: 5px;
    width:auto;
    text-align: center;
    transition: all 0.5s ease;
}

.tag p {
    width: 100px;
    text-align: center;
}
</style>