<script setup>
import { useTodoStore } from '../stores/todo'
import { onMounted, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import Loading from '@/component/Loading.vue';

const todoStore = useTodoStore()
const todoText = ref('')
const isLoading = ref(false)
const selectedStatus = ref('Pending')


onMounted(async () => {
    isLoading.value = true
    await todoStore.loadTodos()
    isLoading.value = false

})

const addTodo = async (todoText) => {
    try {
        isLoading.value = true
        await todoStore.addTodo(todoText)
        isLoading.value = false
        // await todoStore.loadTodos()

    } catch (error) {
        console.log('error', error);

    }
}

const editStatus = async (todoData, todoId) => {
    try {
        isLoading.value = true
        const updateData = {
            name: todoData.name,
            status: todoData.status
        }
        await todoStore.editTodo(updateData, todoId)
        isLoading.value = false

    } catch (error) {
        console.log('error', error);

    }
}

const deleteTodo = async (todoId) => {
    try {
        isLoading.value = true
        await todoStore.removeTodo(todoId)
        console.log('remove complete');
        await todoStore.loadTodos()
        isLoading.value = false


    } catch (error) {
        console.log('error', error);

    }
}

const changeStatus = async (event, todoId) => {
    try {

        if (event.target.checked) {
            await todoStore.editTodo({ status: 'Done' }, todoId)

        } else {
            await todoStore.editTodo({ status: 'Doing' }, todoId)

        }
        await todoStore.loadTodos()

    } catch (error) {
        console.log('error', error);

    }
}

const changeSelectedStatus = async (newstatus) => {
    selectedStatus.value = newstatus
}

const filterTodoList = computed(() => {
    return todoStore.list.filter(todo => todo.status === selectedStatus.value)
})

</script>

<template>

    <div class="container">
        <div class="flex items-center justify-center m-5 mt-10">
            <div class="text-4xl hover:subpixel-antialiased font-bold">Todo List</div>
        </div>
        <div class="flex items-center justify-center m-5">Basic todo list by vue and daisyUI</div>
        <div class="flex">
            <input class="input input-bordered w-full" type="text" v-model="todoText"
                placeholder="Enter your todo list...">
            <button class="btn btn-primary ml-2" @click="addTodo(todoText)">Add</button>
        </div>
        <div>
            <Loading v-if="isLoading"></Loading>
        </div>
        <div  class="tabs tabs-boxed mt-4">
            <a v-for="status in todoStore.statuses" 
            :class="status === selectedStatus ?  'tab tab-active' : 'tab'" 
            @click="changeSelectedStatus(status)"
            >
            {{ status }}
        </a>
        </div>
        
        <div>

            <div class="flex items-center justify-between mt-3" v-for="todo in filterTodoList" :key="todo.id">
                <input type="checkbox" :checked="todo.status === 'Done'" class="checkbox"
                    @change="changeStatus($event, todo.id)" />
                <div :class="todo.status === 'Done' ? 'line-through' : ''">
                    {{ todo.name }}
                </div>
                <!-- <select v-model="todo.status" @change="editStatus(todo, todo.id)">
                    <option>Select Status</option>
                    <option v-for="status in todoStore.statuses" :value="status">
                        {{ status }}
                    </option>
                </select> -->
                <div class="">

                    <RouterLink :to="{ name: 'edit-todo', params: { id: todo.id } }">
                        <button class="btn btn-info btn-outline">
                            Edit
                        </button>
                    </RouterLink>
                    <button class="btn btn-error btn-outline ml-2" @click="deleteTodo(todo.id)">Delete</button>
                </div>

            </div>


        </div>
    </div>
</template>