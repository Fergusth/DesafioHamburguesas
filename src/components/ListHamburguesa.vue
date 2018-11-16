<template>
<div>
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
                <td>{{hamburguesa.nombre}}</td>
                <td>
                    <template v-for="Ingrediente of hamburguesa.ingredientes">
                        <label>{{Ingrediente}}</label>
                     </template>
                </td>
                <td>{{hamburguesa.calorias}}</td>
                <td><button type="button" class="btn btn-primary">Modificar</button>
                    <button type="button" class="btn btn-danger">Eliminar</button>
                </td>
             </tr>                            
            </template>
         </tbody>
    </table>
  </div>
</div>
</template>
<script type="text/javascript">
    import axios from 'axios';
    export default {
      props: ['hamburguesas'],
      name: 'Burguers',
      data() {
        return{
          hamburguesas: [],
          error: [],
          
        }
      },
      created: function (){
        this.listar();
      },
      methods: {
        toggleSeen: function (hamburguesa) {
          hamburguesa.deleted = !hamburguesa.deleted
        },
        listar(){
          axios.get('https://prueba-hamburguesas.herokuapp.com/burguer')
            .then(response =>{
                this.hamburguesas=response.data;
            })
            .catch(e=>{
                this.error.push(e);
            })
        },
          
      }
      
    }
</script>
    
<style>
</style>
    