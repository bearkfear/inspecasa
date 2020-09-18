## Vue class component

```typescript
import { Vue, Component } from "vue-property-decorator"

@Component
export default MeuComponente { 
  atributo = "inspecasa"

  created(){}
  mounted(){}
  // ...
  camelCaseMethod(camelCaseProerty: number): void { }
}

```


## Vuex

```typescript


import Vue from 'vue'
import Component from 'vue-class-component'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'

const someModule = namespace('path/to/module')

@Component
export class MyComp extends Vue {
  @State('foo') stateFoo
  @State(state => state.bar) stateBar
  @Getter('foo') getterFoo
  @Action('foo') actionFoo
  @Mutation('foo') mutationFoo
  @someModule.Getter('foo') moduleGetterFoo

  @State foo
  @Getter bar
  @Action baz
  @Mutation qux
}
````