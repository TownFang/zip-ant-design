import $t from '@/locales/index.js'
console.log($t)
export const FORM_RULES = {
  name: {
    rules: [
      { required: true, message: $t.t('form.basic-form.title.required') },
      { pattern: new RegExp('^[^\u4e00-\u9fa5]*$'), message: '不能输入中文' }
    ]
  },
  buildTime: {
    rules: [{ required: true, message: $t.t('form.basic-form.date.required') }]
  },
  type: {
    rules: [{ required: true, message: $t.t('form.basic-form.date.required') }]
  },
  customer: { rules: [{ required: true, message: $t.t('form.basic-form.client.required') }] }
}
