<template>
  <div id='app'>
    <div class="alert alert-success" v-if="listo">
      <strong>{{ListoMensaje}}</strong>{{ListoMensaje2}}
    </div>
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label for="validationServer01">Nombre</label>
          <input v-on:keyup="verificar()" v-on:keyup.enter="Agregar()" type="text" class="form-control is-valid" v-model="postNombre" placeholder="Nombre" required>
        </div>
        <div class="col-md-4 mb-3">
          <label for="validationServer02">Calorías</label>
          <input v-on:keyup="verificar()" v-on:keyup.enter="Agregar()" type="number" class="form-control is-valid" v-model="postCalorias" placeholder="Calorías" required>
        </div>
        <div class="col-md-4 mb-3">
          <label for="validationServer02">Ingredientes</label>
          <input v-on:keyup="verificar()" v-on:keyup.enter="Agregar()" type="text" class="form-control is-valid" v-model="postIngredientes" placeholder="Separados por coma ','" required>
        </div>
      </div>
      <span v-if="escrito">
        <button class="btn btn-info btn-lg" type="submit" @click="Agregar();">Agregar</button>
      </span>
      <span v-else>
        <button class="btn btn-info btn-lg" disabled type="submit">Agregar</button>
      </span>
  </div>
</template>

<script>

  import axios from 'axios';
  export default {

    name: 'Add',
    data() {
      return {
        error: [],
        escrito: false,
        ListoMensaje: "",
        ListoMensaje2: "",
        listo: false,
        idActualizar: "x",
        nombreActualizar: "",
        postNombre: ""
      
      }
    },
    created: function () {
      this.listar();
    },
    methods: {
      Agregar() {
        if(this.escrito){
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
          this.EmRelistar(),
          this.Correcto(),
          this.verificar()
        );
        }        
      },
      verificar() {
        if (this.postNombre.length >= 1 && this.postCalorias >= 1 && this.postIngredientes >= 1) {
          this.escrito = true;
        } else {
          this.escrito = false;
        }
      },
      Correcto: function () {
        this.listo = true;
        this.ListoMensaje = "¡Correcto!";
        this.ListoMensaje2 = "La hamburguesa ha sido agregada";
      },
      EmRelistar: function () {
        this.$emit('list:change')
      }
    }

  }
</script>
<style>
</style>
