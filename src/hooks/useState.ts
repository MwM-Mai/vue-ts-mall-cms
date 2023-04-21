import { computed } from 'vue'
import { useStore, mapState } from 'vuex'

export default function useState(mapper: any) {
  const store = useStore()

  const storeStateFns = mapState(mapper)

  const storeState: any = {}

  Object.keys(storeStateFns).forEach((fnKey) => {
    const fn = storeStateFns[fnKey].bind({ $store: store })
    storeState[fnKey] = computed(fn)
  })

  return storeState
}
