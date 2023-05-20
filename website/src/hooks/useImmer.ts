import { ref, type Ref, type UnwrapRef } from "vue"
import { produce, type Draft } from "immer"

export function useImmer<T>(
  initialValue: T
): [Ref<UnwrapRef<T>>, (updater: (draft: Draft<UnwrapRef<T>>) => void) => void] {
  const state = ref(initialValue)

  function setState(updater: (draft: Draft<UnwrapRef<T>>) => void) {
    const nextState = produce(state.value, updater)
    state.value = nextState
  }

  return [state, setState]
}
