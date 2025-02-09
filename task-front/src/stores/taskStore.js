import { defineStore } from "pinia";
import axios from "axios";

//almacena la variable de entorno de la API
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const useTaskStore = defineStore("task", {
  state: () => ({
    task: [],
    newTask: "",
  }),

  actions: {
    //accciones para modificar el estado de la tarea
    async getTask() {
      try {
        const response = await axios.get(apiUrl);
        this.task = response.data;
      } catch (error) {
        console.log("Error al recibir la tarea: " + error);
      }
    }, //traer todas las tareas

    async addTask() {
      if(this.newTask.trim() === "") return; //si el input esta vacio no se agrega la tarea
      try {
        const response = await axios.post(apiUrl, { // Agregado await aquí
          task: this.newTask
        });

        this.task.push(response.data);
        this.newTask = ""; // Cambio de nextTask a newTask para limpiar el input
      } catch (error) {
        console.log("Error al agregar la tarea: " + error);
      }
    }, //crear una tarea

    async updateTask(task) {
      try {
        await axios.put(`${apiUrl}/${task.id}`, task); //indicamos la ruta (api + /id) y la tarea a actualizar
      } catch (error) {
        console.log("Error al actualizar la tarea: " + error);
      }
    }, //actualizar una tarea

    async deleteTask(id) {
      try {
        await axios.delete(`${apiUrl}/${id}`); //indicamos la ruta (api + /id) y la tarea a eliminar
        this.task = this.task.filter((task) => task.id !== id); //filtramos la tarea eliminada
      } catch (error) {
        console.log("Error al eliminar la tarea: " + error);
      } //eliminar una tarea
    },
  },
});
