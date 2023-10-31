<template>
    <n-space vertical>
      <n-transfer
        ref="transfer"
        v-model:value="value1"
        virtual-scroll
        :options="options1"
        source-filterable
      />
    </n-space>
</template>

<script setup>

var options1 = createOptions()
var value1 = ref([])

function createOptions() {
  return Array.from({ length: 100 }).map((v, i) => ({
    label: "Option " + i,
    value: i,
    disabled: i % 5 === 0
  }));
}

function createValues() {
  return Array.from({ length: 50 }).map((v, i) => i);
}

</script>