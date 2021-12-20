# components
按钮、表格一类的通用组件在packages/components中进行开发

支持：
- [x] vue单文件组件(SFC)
- [x] vue-class-component, vue-property-decorator
- [x] scss, scss自动添加-webkit, -moz等前缀
- [x] pug
- [x] css中的`background-image: url(some.png)`和html中的`<img src="some.png">`图片转base64
- [x] vue-test-utils + jest
- [x] storybook

## 推荐结构

```
packages/
  components/
    component-a/
      ComponentA.vue
      ComponentA.spec.ts
    component-b/
      ComponentB.vue
      ComponentB.spec.ts
    index.js


index.js:

import ComponentA from './component-a/ComponentA.vue' // 待工程配置完善后应该可以做到 './component-a' 即可
import ComponentB from './component-b/ComponentB.vue' 

export { ComponentA, ComponentB }

```

## 注意事项

- 在`.vue`文件的`<style></style>`中引入node_modules中的样式文件时采用如下格式：

  ```@import 'node_modules/path/to/style/file';```

  即，**不加后缀**

## build
```
yarn build 或者 npm run build
```

会输出 `dist/components.js`, `dist/components.css` 两个文件

## watch
```
yarn watch 或者 npm run watch
```

## test
```
yarn test 或者 npm run test
```
所有*.spec.ts会被认为是测试文件

```
yarn test --watch 或者 npm run test -- --watch
```
watch模式下按`w`来查看所支持的快捷操作（运行所有测试、运行未通过的测试、运行有改动的测试等）


## storybook
```
yarn storybook 或者 npm run storybook
```

[http://localhost:9001](http://localhost:9001)

### storybook结构

```
packages/components/stories/
  index.js
  component-a.stories.js
  component-b.stories.js

// 命名格式统一成stories.js方便后期用脚本生成index.js的内容


// index.js内容

import '../dist/components.css' //引入css

import './component-a.stories'
import './component-b.stories'


// component-a.stories.js

import { storiesOf } from '@storybook/vue'

import { ComponentA } from '../dist/components' // 注意一定要从dist中引入

storiesOf('ComponentA')
  .add('some-story', () => ({
    components: { ComponentA },
    template: '<ComponentA/>'
  }))
  .add('another-story', () => ({
    components: { ComponentA },
    template: '<ComponentA/>'
  }))
```