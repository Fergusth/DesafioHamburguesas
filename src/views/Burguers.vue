<template>
  <div class="container">
    <h2>Crud de hamburguesas</h2>

    <div class="alert alert-success" v-if="listo">
      <strong>{{ListoMensaje}}</strong>{{ListoMensaje2}}
    </div>
    <!-- Trigger the modal with a button -->

    <br>
    <br>
    <form>
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label for="validationServer01">Nombre</label>
          <input type="text" class="form-control is-valid" v-model="postNombre" placeholder="Nombre" required>
        </div>
        <div class="col-md-4 mb-3">
          <label for="validationServer02">Calorías</label>
          <input type="number" class="form-control is-valid" v-model="postCalorias" placeholder="Calorías" required>
        </div>
        <div class="col-md-4 mb-3">
          <label for="validationServer02">Ingredientes</label>
          <input type="text" class="form-control is-valid" v-model="postIngredientes" placeholder="Separados por coma ','" required>
        </div>
      </div>
      <button class="btn btn-info btn-lg" type="submit" @click="Agregar(); Correcto();">Agregar</button>
    </form>
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
              <span v-else>
                <button class="btn btn-danger" type="submit" @click="Eliminar(hamburguesa);">Eliminar</button>
                <button class="btn btn-info" type="submit" @click="verEditar(hamburguesa)">Editar</button>
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
  export default {
    name: "Burguers",
    data() {
      return {
        hamburguesas: [],
        ListoMensaje: "",
        ListoMensaje2: "",
        error: [],
        listo: false,
        formActualizar: false,
        idActualizar: "x",
        nombreActualizar: ""
      };
    },
    created: function () {
      this.listar();
    },
    methods: {
      Correcto: function () {
        this.listo = true;
        this.ListoMensaje = "¡Correcto!";
        this.ListoMensaje2 = "La hamburguesa ha sido agregada";
      },
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
      Agregar() {
        return (
          axios
            .post("https://prueba-hamburguesas.herokuapp.com/burguer", {
              nombre: this.postNombre,
              ingredientes: this.postIngredientes,
              deleted: false,
              calorias: this.postCalorias
            })
            .then(response => { })
            .catch(e => {
              console.error(e);
            }),
          (this.postNombre = ""),
          (this.postIngredientes = ""),
          (this.postCalorias = ""),
          this.relistar()
        );
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