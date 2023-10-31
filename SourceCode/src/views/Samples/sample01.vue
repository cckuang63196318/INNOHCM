<template>
    <div class="myBlock">
        <!--:show-feedback="false" 看是否要顯示輸入的檢查，需要的話會增加element上下距離-->
        <n-form
            ref="formRef"
            :model="model"
            :rules="rules"
            :show-feedback="false"
            label-width="auto"
            label-placement="left"
        >
            <n-grid :cols="appStore.gridCols" :x-gap="appStore.gridXGap" :y-gap="appStore.gridYGap" responsive="screen">
                <n-grid-item>
                    <n-form-item label="Date" path="dateValue">
                        <n-date-picker v-model:value="model.datetValue" type="date" class="myNative" />
                    </n-form-item>                    
                </n-grid-item>
                <n-grid-item>
                    <n-form-item label="Datetime" path="datetimeValue">
                        <n-date-picker v-model:value="model.datettimeValue" type="datetime" class="myNative" />
                    </n-form-item>
                </n-grid-item>
                <n-grid-item>
                    <n-form-item-gi label="Input" path="inputValue">
                        <n-input v-model:value="model.inputValue" placeholder="Input" />
                    </n-form-item-gi>
                </n-grid-item>
                <n-grid-item>
                    <n-form-item-gi :span="12" label="Slider" path="sliderValue">
                        <n-slider v-model:value="model.sliderValue" />
                    </n-form-item-gi>
                </n-grid-item>
            </n-grid>
            <div style="margin-top: 20px;">
                <n-grid :cols="appStore.gridCols" :x-gap="appStore.gridXGap" :y-gap="appStore.gridYGap" responsive="screen">
                    <n-grid-item v-if="appStore.breakpointCols > 2"></n-grid-item>
                    <n-grid-item v-if="appStore.breakpointCols > 1"></n-grid-item>
                    <n-grid-item>
                        <n-button round type="primary" class="myNative">
                            {{ t('action.submit') }}
                        </n-button>
                    </n-grid-item>
                </n-grid>
            </div>

        </n-form>
    </div> 

    <div style="margin-top: 20px;">
        <n-data-table v-if="appStore.breakpointCols > 1"
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :max-height="250"
        :scroll-x="appStore.innerWidth*2"
        />
        <n-collapse v-else>
            <n-collapse-item title="Edward King 0" name="1">
            <div>Age : 18</div>
            </n-collapse-item>
            <n-collapse-item title="Edward King 1" name="2">
            <div>Age : 19</div>
            </n-collapse-item>
            <n-collapse-item title="Edward King 2" name="3">
            <div>Age : 20</div>
            </n-collapse-item>
        </n-collapse>
    </div>


</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { NDivider, NGrid, NGridItem, NDatePicker } from 'naive-ui'
import { appStore } from '../../stores';

const { t } = useI18n()

const model = ref({
    inputValue: null,
    dateValue: null,
    datetimeValue: null,
    sliderValue: null
})

const rules = {
    inputValue: {
        required: true,
        trigger: ["blur", "input"],
        message: "请输入 inputValue"
    },
    datetimeValue: {
        type: "number",
        required: true,
        trigger: ["blur", "change"],
        message: "请输入 datetimeValue"
    },
    sliderValue: {
        validator(rule, value) {
        return value > 50;
        },
        trigger: ["blur", "change"],
        message: "sliderValue 需要大于 50"
    },
}

const createColumns = () => [
  {
    type: "selection",
    fixed: "left"
  },
  {
    title: "Name",
    key: "name",
    width: 200
  },
  {
    title: "Age",
    key: "age",
    width: 100,
    fixed: "left"
  },
  {
    title: "Row",
    key: "row",
    render(row, index) {
      return h("span", ["row ", index]);
    }
  },
  {
    title: "Row1",
    key: "row1",
    render(row, index) {
      return h("span", ["row ", index]);
    }
  },
  {
    title: "Row2",
    key: "row2",
    render(row, index) {
      return h("span", ["row ", index]);
    },
    width: 100
  },
  {
    title: "Address",
    key: "address",
    width: 200,
    fixed: "right"
  }
]

var data = Array.from({ length: 46 }).map((_, index) => ({
        key: index,
        name: `Edward King ${index}`,
        age: 18 + index,
        address: `London, Park Lane no. ${index}`
      }))
var columns = createColumns()
var pagination = { pageSize: 10 }

</script>


<style>

</style>