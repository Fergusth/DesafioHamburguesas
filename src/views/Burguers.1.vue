<template>
    <div class="container">
        <h2>Hamburguesas</h2>
        <!-- Trigger the modal with a button -->
        
        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#ModalAgregar">Agregar hamburguesas</button>
        <br><br>        
        <div class="modal fade" id="ModalAgregar" role="dialog">
            <div class="modal-dialog">
            
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">Agregar hamburguesas</h4>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-row">
                          <div class="col-md-4 mb-3">
                            <label for="validationServer01">Nombre</label>
                            <input type="text" class="form-control is-valid" v-model="postNombre" placeholder="Nombre" required>
                          </div>
                          <div class="col-md-4 mb-3">
                            <label for="validationServer02">Calorías</label>
                            <input type="text" class="form-control is-valid" v-model="postCalorias" placeholder="Calorías" required>
                            </div>
                          <div class="col-md-4 mb-3">
                              <label for="validationServer02">Ingredientes</label>
                              <input type="text" class="form-control is-valid" v-model="postIngredientes" placeholder="Separados por coma ','" required>
                            </div>
                        </div>
                      <button class="btn btn-primary" type="submit" @click="Agregar()">Agregar</button>
                    </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                </div>
              </div>
              
            </div>
          </div>
          <table class="table">
              <thead>
              <th>Nombre</th>
              <th>Ingredientes</th>
              <th>Calorías</th>
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
                    </tr>                            
                </template>
              </tbody>
           </table>
      </div>

</template>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/axios@0.18.0/dist/axios.min.js"></script>
<script type="text/javascript">
import axios from 'axios';
export default {
  name: 'Burguers',
  data() {
    return{
      hamburguesas: [],
      ingredientes: [],
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
    Agregar(){
        axios.post('https://prueba-hamburguesas.herokuapp.com/burguer', {
        nombre: this.postNombre,
        ingredientes: this.postIngredientes,
        deleted: false,
        calorias: this.postCalorias        
        }).then((response) => {})
        .catch((e) => {
        console.error(e)
       })   
        
    }
      
  }
  
}
</script>

<style>
</style>
