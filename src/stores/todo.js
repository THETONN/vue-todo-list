import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
const BASE_URL = 'https://6704f8f0031fd46a830e2037.mockapi.io'
export const useTodoStore = defineStore('todo', {
  state: () => ({

    list: [],
    seletedTodo: {},
    statuses: ['Pending', 'Doing', 'Done']


  }),
  actions: {
    async loadTodos() {
      try {
        const response = await axios.get(`${BASE_URL}/todos`)
        this.list = response.data
      } catch (error) {
        console.error('error', error);

      }
    },
    async loadTodo(id) {
      try {
        const response = await axios.get(`${BASE_URL}/todos/${id}`)
        this.seletedTodo = response.data
        console.log('load todo complete');
        
      } catch (error) {
        console.log('error', error);

      }
    },
    async addTodo(todoText) {
      const bodyData = {
        name: todoText,
        status: 'Pending'
      }

      try {
        const response = await axios.post(`${BASE_URL}/todos`, bodyData)
        console.log('Add data complete');
        console.log(response.data);
        this.list.push(response.data)


      } catch (error) {
        console.log('error', error);

      }
    },
    async editTodo (todoData, id) {
      // {name: 'test',
      //   status: 'Doing'
      // }

      try{
        const response = await axios.put(`${BASE_URL}/todos/${id}`,todoData)
        console.log('edit to do complete');
        
      }catch (error) {
        console.log('error', error);
        
      }
    },
    async removeTodo (id) {
      try{
        const response = await axios.delete(`${BASE_URL}/todos/${id}`)
        console.log('remove complete')

      }catch (error) {
        console.log('error', error);
        
      }
    },
  }
})
