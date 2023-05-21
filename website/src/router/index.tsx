import Manager from "@/layouts/Manager"
import Home from "@/views/Home"
import Login from "@/views/Login"
import QuestionManager from "@/views/QuestionManager"
import { createRouter, createWebHistory } from "vue-router"
import PaperManager from "@/views/PaperManager"
import PaperList from "@/views/PaperList"
import Student from "@/layouts/Student"
import ExamList from "@/views/ExamList"
import Answering from "@/views/Answering"

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
      redirect: { name: "question-manager" },
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
    },
    {
      path: "/student",
      name: "student",
      component: <Student />,
      redirect: { name: "paper-list" },
      children: [
        {
          path: "paper-list",
          name: "paper-list",
          component: <PaperList />
        },
        {
          path: "exam-list",
          name: "exam-list",
          component: <ExamList />
        },
        {
          path: "answering/:examId",
          name: "answering",
          component: <Answering />
        }
      ]
    }
  ]
})
