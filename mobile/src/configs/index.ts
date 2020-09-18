import fire from './fire'
import { observerBatchingOptOut } from 'mobx-react'
fire.install()
observerBatchingOptOut()
