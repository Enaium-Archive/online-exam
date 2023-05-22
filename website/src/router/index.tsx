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
import ExamManager from "@/views/ExamManager"
import Marking from "@/views/Marking"
import Marked from "@/views/Marked"

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
      path: "/manager",
      name: "manager",
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
        },
        {
          path: "exam-manager",
          name: "exam-manager",
          component: <ExamManager />
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
        },
        {
          path: "marked/:examId",
          name: "marked",
          component: <Marked />
        }
      ]
    },
    {
      path: "/marking/:examId",
      name: "marking",
      component: <Marking />
    }
  ]
})
