<template>
  <div class="container">
    <h2>Crud de hamburguesas</h2>    
    <!-- Trigger the modal with a button -->
    <br>
    <br>
    <add-hamburguesa @list:change="relistar"></add-hamburguesa>
    <br>
    <table class="table">
      <thead>
        <th>Nombre</th>
        <th>Ingredientes</th>
        <th>Calorías</th>
        <th>Opciones</th>
      </thead>
      <tbody>
        <template v-for="hamburguesa of hamburguesas">
          <tr>
            <td>
              <span v-if="formActualizar && idActualizar == hamburguesa._id">
                <input required class="form-control is-valid" v-model="nombreActualizar" @keyup.enter="Editar(hamburguesa)" type="text">
              </span>
              <span v-else>
                {{hamburguesa.nombre}}
              </span>
            </td>
            <td>
              <span v-if="formActualizar && idActualizar == hamburguesa._id">
                <input required class="form-control is-valid" v-model="ingredientesActualizar" @keyup.enter="Editar(hamburguesa)" type="text">
              </span>
              <span v-else>
                <template v-for="Ingrediente of hamburguesa.ingredientes">
                  <label>{{Ingrediente}}</label>
                </template>
              </span>
            </td>
            <td>
              <span v-if="formActualizar && idActualizar == hamburguesa._id">
                <input required class="form-control is-valid" v-model="caloriasActualizar" type="text" @keyup.enter="Editar(hamburguesa)">
              </span>
              <span v-else>
                {{hamburguesa.calorias}}
              </span>

            </td>
            <td>
            <form>
              <span v-if="formActualizar && idActualizar == hamburguesa._id">
                <button class="btn btn-success" type="submit" @click="Editar(hamburguesa);">Guardar</button>
              </span>              
              <span v-if="formEliminar && idActualizar == hamburguesa._id">
                <label>¿Estas seguro?</label><br>
                <div class="btn-group">
                <button class="btn btn-danger" type="submit" @click="Eliminar(hamburguesa);">Si</button>
                <button class="btn btn-info" type="submit" @click="canEliminar();">No</button>
                </div>
              </span>
              <span v-else>
                <div class="btn-group">
                <button class="btn btn-danger" type="submit" @click="verEliminar(hamburguesa);">Eliminar</button>
                <button class="btn btn-info" type="submit" @click="verEditar(hamburguesa)">Editar</button>
                </div>
              </span>
            </form>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

</template>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/axios@0.18.0/dist/axios.min.js"></script>
<script type="text/javascript">
  import axios from "axios";
  import AddHamburguesa from '../components/AddHamburguesa.vue';
  export default {
    name: "Burguers",
    components:{
      AddHamburguesa,
    },
    data() {
      return {
        hamburguesas: [],        
        error: [],        
        formActualizar: false,   
        formEliminar: false     
      };
    },
    created: function () {
      this.listar();
    },
    methods: {      
      Editar(hamburguesa) {
        return (
          axios
            .put(
              `https://prueba-hamburguesas.herokuapp.com/burguer/${
              hamburguesa._id
              }`,
              {
                nombre: this.nombreActualizar,
                ingredientes: this.ingredientesActualizar,
                calorias: this.caloriasActualizar
              }
            )
            .then(response => { })
            .catch(e => {
              console.error(e);
            }),
          (this.idActualizar = "x"),
          (this.formActualizar = false),
          this.relistar()
        );
      },
      verEditar(hamburguesa) {
        this.idActualizar = hamburguesa._id;
        this.nombreActualizar = hamburguesa.nombre;
        this.caloriasActualizar = hamburguesa.calorias;
        this.ingredientesActualizar = hamburguesa.ingredientes;
        this.formActualizar = true;
      },
      verEliminar(hamburguesa){
        this.idActualizar = hamburguesa._id;
        this.formEliminar = true;
      },
      canEliminar(){
        this.formEliminar = false;
        this.idActualizar = 'x';
      },
      listar() {
        axios
          .get("https://prueba-hamburguesas.herokuapp.com/burguer")
          .then(response => {
            this.hamburguesas = response.data;
          })
          .catch(e => {
            this.error.push(e);
          });
      },
      relistar() {
        setInterval(this.listar, 1000);
        setTimeout(clearInterval, 2000);
      },
      Eliminar(hamburguesa) {
        const url = `https://prueba-hamburguesas.herokuapp.com/burguer/${
          hamburguesa._id
          }`;
        return axios.delete(url), this.relistar();
      }
    }
  };
</script>

<style>
</style>