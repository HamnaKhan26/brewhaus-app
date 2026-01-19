<template>
    <div class="pagination">
        <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Prev</button>
        <span>Page {{ currentPage }}</span>
        <button :disabled="!hasNextPage" @click="changePage(currentPage + 1)">Next</button>
    </div>
</template>

<script>
export default {
    props: ['currentPage', 'hasNextPage'],
    emits: ['page-changed'],
    methods: {
        changePage(page) {
            console.log('Emitting page:', page);
            this.$emit('page-changed', page);
        }
    }
};
</script>
