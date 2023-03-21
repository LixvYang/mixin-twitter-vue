import { App } from 'vue'

import {
  Button,
  List,
  Divider,
  Image,
  Lazyload,
  Popup,
  Icon,
  Toast,
  TextEllipsis,
  Field,
  CellGroup,
  BackTop
} from 'vant'

const components = [
  Button,
  List,
  Divider,
  Image,
  Popup,
  Icon,
  Toast,
  TextEllipsis,
  Field,
  CellGroup,
  BackTop
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
  app.use(Lazyload, {
    lazyComponent: true
  })
}
