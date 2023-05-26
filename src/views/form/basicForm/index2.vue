<template>
  <page-header-wrapper class="vat-calc" :title="false" :content="$t('form.basic-form.basic.description')">
    <span v-if="isSuccess">所有的校验都通过了</span>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          :label="$t('form.basic-form.title.label')"
          :label-col="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapper-col="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: $t('form.basic-form.title.required') },
                  { whitespace: true },
                  { pattern: new RegExp('^[^\u4e00-\u9fa5]*$'), message: '不能输入中文' },
                ],
              },
            ]"
            name="name"
            :placeholder="$t('form.basic-form.title.placeholder')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('form.basic-form.date.label')"
          :label-col="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapper-col="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-range-picker
            v-decorator="['buildTime', { rules: [{ required: true, message: $t('form.basic-form.date.required') }] }]"
            name="buildTime"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item
          :label="$t('form.basic-form.goal.label')"
          :label-col="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapper-col="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-textarea
            v-decorator="['description', { rules: [{ required: true, message: $t('form.basic-form.goal.required') }] }]"
            rows="4"
            :placeholder="$t('form.basic-form.goal.placeholder')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('form.basic-form.standard.label')"
          :label-col="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapper-col="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-textarea
            v-decorator="['type', { rules: [{ required: true, message: $t('form.basic-form.standard.required') }] }]"
            rows="4"
            :placeholder="$t('form.basic-form.standard.placeholder')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('form.basic-form.client.label')"
          :label-col="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapper-col="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input
            v-decorator="['customer', { rules: [{ required: true, message: $t('form.basic-form.client.required') }] }]"
            :placeholder="$t('form.basic-form.client.placeholder')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('form.basic-form.invites.label')"
          :label-col="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapper-col="{ lg: { span: 10 }, sm: { span: 17 } }"
          :required="false"
        >
          <a-input :placeholder="$t('form.basic-form.invites.placeholder')" />
        </a-form-item>
        <a-form-item
          :label="$t('form.basic-form.weight.label')"
          :label-col="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapper-col="{ lg: { span: 10 }, sm: { span: 17 } }"
          :required="false"
        >
          <a-input-number :min="0" :max="100" />
          <span> %</span>
        </a-form-item>
        <a-form-item
          :label="$t('form.basic-form.public.label')"
          :label-col="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapper-col="{ lg: { span: 10 }, sm: { span: 17 } }"
          :required="false"
          :help="$t('form.basic-form.label.help')"
        >
          <a-radio-group v-decorator="['target', { initialValue: 1 }]">
            <a-radio :value="1">{{ $t('form.basic-form.radio.public') }}</a-radio>
            <a-radio :value="2">{{ $t('form.basic-form.radio.partially-public') }}</a-radio>
            <a-radio :value="3">{{ $t('form.basic-form.radio.private') }}</a-radio>
          </a-radio-group>
          <a-form-item v-show="form.getFieldValue('target') === 2">
            <a-select mode="multiple">
              <a-select-option value="4">{{ $t('form.basic-form.option.A') }}</a-select-option>
              <a-select-option value="5">{{ $t('form.basic-form.option.B') }}</a-select-option>
              <a-select-option value="6">{{ $t('form.basic-form.option.C') }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-form-item>

        <a-table class="ost-mt10 ost-mb24 my-table" :columns="columns" :data-source="data">
          <template #number="text,record,i">
            <span>
              {{ i+1 }}
            </span>
          </template>
          <template #value="text,record,i">
            <a-form-item label="">
              <a-input v-decorator="[`tableData.${record.key}.value`, { rules: [{ required: true, message: $t('form.basic-form.goal.required') }, { pattern: new RegExp('^[^\u4e00-\u9fa5]*$'), message: '不能输入中文' },] }]" @change="handleParams(text,record,i)" />
            </a-form-item>
          </template>
          <template #rate="text,record,i">
            <a-form-item label="">
              <a-input v-decorator="[`tableData.${record.key}.rate`, { rules: [{ required: true, message: $t('form.basic-form.goal.required') }] }]" @change="handleParams(text,record,i)" />
            </a-form-item>
          </template>
          <template #file="">
            <span>
              <a-upload
                name="file"
                @change="handleChange"
              >
                <a-button>Upload</a-button>
              </a-upload>
            </span>
          </template>
          <template #action="text,record,i">
            <span>
              <a-button @click="handleDelete(text,record,i)">Delete</a-button>
            </span>
          </template>
          <div slot="footer" class="ost-align-center">
            <a-button @click="handleAdd">Add</a-button>
          </div>
        </a-table>

        <a-form-item :wrapper-col="{ span: 24 }" style="text-align: center">
          <a-button html-type="submit" type="primary">{{ $t('form.basic-form.form.submit') }}</a-button>
          <a-button style="margin-left: 8px">{{ $t('form.basic-form.form.save') }}</a-button>
        </a-form-item>
      </a-form>
      <div class="ost-mt24">
        <a-alert v-if="isSuccess" type="success" message="is Success" banner />
      </div>
      <div class="ost-mt24">
        <a-alert v-if="errorMsg" type="error" :message="errorMsg + ' is empty'" banner />
      </div>
    </a-card>
    <!-- <span v-if="isSuccess">所有的校验都通过了</span> -->
  </page-header-wrapper>
</template>

<script>
// import { FORM_RULES } from '../data/rules'
export default {
  name: 'BaseForm',
  data() {
    const _that = this
    return {
      columns: [
        { title: 'NO.', scopedSlots: { customRender: 'number' }},
        { title: 'Value', scopedSlots: { customRender: 'value' }},
        { title: 'Rate', scopedSlots: { customRender: 'rate' }, width: '300px' },
        { title: 'File', scopedSlots: { customRender: 'file' }, dataIndex: 'filePath' },
        { title: 'Actions', scopedSlots: { customRender: 'action' }}
      ],
      data: [
        { number: '', key: '1' },
        { number: '', key: '2' },
        { number: '', key: '3' },
        { number: '', key: '4' }
      ],
      form: this.$form.createForm(this, {
        onValuesChange(props, values) {
          // const { form } = props
          _that.$nextTick(() => {
            _that.checkRules(values)
          })
        }
      }),
      id: 4,
      errorMsg: '',
      isSuccess: false
    }
  },
  methods: {
    checkRules(payload) {
      this.$nextTick(() => {
        this.isSuccess = true
        // 从上到下
        const { form } = this
        const values = form.getFieldsValue()
        for (const key in values) {
          if (key === 'tableData') {
            continue
          }
          if (values[key] === undefined || values[key] === '' || form.getFieldError(key)) {
            console.log(form.getFieldError(key))
            this.isSuccess = false
            break
          }
        }
        // console.log(payload)
        if (payload && payload.tableData) {
          // console.log(payload.)
          this.errorMsg = ''
          const tableData = values.tableData
          // console.log(form.getFieldError(`tableData.1.rate`))
          for (const [keyItem, item] of tableData.entries()) {
          // console.log(key, 'zip log')
            console.log('遍历' + keyItem)
            for (const key in item) {
              if (item[key] === undefined || item[key] === '' || form.getFieldError(`tableData.${keyItem}.${key}`) !== undefined) {
                // console.log(key, index)
                this.errorMsg = key
                this.isSuccess = false
                return
              }
            }
          }
        }
      })
    },
    handleDelete(text, record) {
      this.data = this.data.filter(item => item.key !== record.key)
      this.checkRules({ tableData: [] })
    },
    handleAdd(text, record) {
      this.data.push({ key: ++this.id })
      this.checkRules({ tableData: [] })
    },
    handleParams() {},
    handleChange() {},
    // handler
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        this.checkRules({ tableData: [] })
        if (!err) {
          // console.log('Received values of form: ', values)
        }
      })
    }
    // rowKey(text, record, i) {
    //   return i
    // }
  }
}
</script>

<style lang="less" scoped>
::v-deep{
  .my-table{
    .ant-form-explain{
      display: none !important;
    }
    .ant-form-item-with-help,.ant-form-item{
      margin-bottom:0 !important;
    }
  }
}

</style>
