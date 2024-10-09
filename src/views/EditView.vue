<script setup>

import { useTodoStore } from '../stores/todo'
import { useRoute, RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import Loading from '@/component/Loading.vue';


const todoStore = useTodoStore()
const route = useRoute()
const todoId = ref(-1)
const isLoaded = ref(false)
const isUpdated = ref(false)

onMounted(async () => {
    // console.log(route.params.id);

    await todoStore.loadTodo(route.params.id)
    isLoaded.value = true
    todoId.value = parseInt(route.params.id)
    // console.log(todoStore.seletedTodo);

})

const editTodo = async (selectedTodo) => {
    console.log(selectedTodo);

    try {

        const bodyData = {
            name: selectedTodo.name,
            status: selectedTodo.status
        }

        await todoStore.editTodo(bodyData, todoId.value)
        // alert('edit complete!')
        isUpdated.value = true
        isLoaded.value = true
        setTimeout(() => {
            isUpdated.value = false
        }, 3000)

    } catch (error) {
        console.log('error', error);

    }
}

</script>

<template>

    <div class="w-1/2 mx-auto">
        <div v-if="isUpdated" role="alert" class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Update Successful.</span>
        </div>

        <RouterLink :to="{ name: 'todo-list' }">
            <button class="btn btn-active btn-neutral first-letter mt-5">Back todo list</button>
        </RouterLink>

        <div v-if="isLoaded">
            <div>
                <button class="btn mt-4">
                    ID:
                    <div class="badge">{{ todoId }}</div>
                </button>
            </div>
            <div>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Name Todo</span>
                    </div>
                    <input type="text" placeholder="Type name todo..." class="input input-bordered"
                        v-model="todoStore.seletedTodo.name" />
                </label>
            </div>

            <div class="form-control w-full">
                <div class="label">
                    <span class="label-text">Status</span>
                </div>
                <select class="select select-bordered" v-model="todoStore.seletedTodo.status">
                    <option value="">Select Status</option>
                    <option v-for="status in todoStore.statuses" :value="status">
                        {{ status }}
                    </option>
                </select>
            </div>
            <div class="flex">
                <button class="btn btn-success w-full  mt-3" @click="editTodo(todoStore.seletedTodo)">Edit</button>
            </div>

        </div>
        <div v-else>
            <Loading></Loading>
        </div>
    </div>
    <div>

    </div>
</template>