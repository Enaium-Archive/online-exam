import { api } from "@/common/ApiInstance"
import { useSessionStore } from "@/store"
import { useQuery } from "@tanstack/vue-query"
import { NButton } from "naive-ui"
import { defineComponent } from "vue"
import { useRouter } from "vue-router"

export default defineComponent(() => {
  const router = useRouter()

  const session = useSessionStore()

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.peopleController.findPeople({ id: session.id! }),
    enabled: session.id !== undefined
  })

  return () => (
    <div class="h-screen flex flex justify-around items-center">
      {data.value?.role.name != "student" && (
        <NButton class="w-32 h-32 text-2xl" type="info" onClick={() => router.push({ name: "exam-manager" })}>
          考试管理
        </NButton>
      )}

      <NButton class="w-32 h-32 text-2xl" type="info" onClick={() => router.push({ name: "paper-list" })}>
        开始考试
      </NButton>
    </div>
  )
})
