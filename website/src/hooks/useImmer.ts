/*
 * This is a simple examination system
 *
 * Copyright (C) 2023  Enaium
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
