import Manager from "@/views/Manager"
import Home from "@/views/Home"
import Login from "@/views/Login"
import QuestionManager from "@/views/QuestionManager"
import { createRouter, createWebHistory } from "vue-router"
import PaperManager from "@/views/PaperManager"

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      component: <Login />
    },
    {
      path: "/home",
      name: "home",
      component: <Home />
    },
    {
      path: "/exam-manager",
      name: "exam-manager",
      component: <Manager />,
      children: [
        {
          path: "question-manager",
          name: "question-manager",
          component: <QuestionManager />
        },
        {
          path: "paper-manager",
          name: "paper-manager",
          component: <PaperManager />
        }
      ]
    }
  ]
})
