module.exports = {
  extends: ['travisreynolds-vue'],
  rules: {
    'vue-a11y/label-has-for': [ 2, {
      required: {
        some: [ 'nesting', 'id' ]
      },
      allowChildren: false
    }]
  }
}
