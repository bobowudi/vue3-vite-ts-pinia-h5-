<template>
    <svg aria-hidden="true">
        <use :xlink:href="'#svg-' + name" />
    </svg>
    
</template>

<script lang="ts" setup>

defineProps<{ name: string; }>()

</script>