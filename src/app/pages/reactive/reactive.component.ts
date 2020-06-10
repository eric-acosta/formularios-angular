import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma:FormGroup;


  constructor(private fb:FormBuilder, private validadores:ValidadoresService) { 
  this.crearFormulario();
  this.cargarDataAlFormulario();
  this.crearListeners();
  }

  ngOnInit(): void {
  }

  nombreNoValido(){
    return  this.forma.get('nombre').invalid && this.forma.get('nombre').touched

  }
  apellidoNoValido(){
    return  this.forma.get('apellido').invalid && this.forma.get('apellido').touched

  }
  correoNoValido(){
    return  this.forma.get('correo').invalid && this.forma.get('correo').touched

  }
  delegacionNoValido(){
    return  this.forma.get('direccion.delegacion').invalid && this.forma.get('direccion.delegacion').touched

  }
  ciudadNoValido(){
    return  this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched

  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  get pass1NoValido(){
    return  this.forma.get('pass1').invalid && this.forma.get('pass1').touched
  }

  get pass2NoValido(){
    const pass1 =this.forma.get('pass1').value;
    const pass2 =this.forma.get('pass2').value;

    return (pass1 === pass2)? false:true
  }

  usuarioNoValido(){
    return  this.forma.get('usuario').invalid && this.forma.get('usuario').touched
    
  }



  crearFormulario(){
    this.forma = this.fb.group({
      nombre  :['',[Validators.required,Validators.minLength(4)] ],
      apellido:['',[Validators.required, this.validadores.noVega]],
      correo  :['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      usuario:['', , this.validadores.existeUsuario],
      pass1:['',Validators.required],
      pass2:['',Validators.required],
      direccion: this.fb.group({
        delegacion:['',Validators.required],
        ciudad:['',Validators.required]
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.validadores.passwordsIguales('pass1','pass2')
    });

  }
  cargarDataAlFormulario(){
    this.forma.reset({
      "nombre": "Eric",
      "apellido": "Acosta",
      "correo": "mail@mail.net",
      "pass1": '123',
      "pass2": '123',
      "direccion": {
        "delegacion": "Coyoacan",
        "ciudad": "CDMX"
      }
    } );

    //['comer','dormir'].forEach(valor=>this.pasatiempos.push(this.fb.control(valor)));


  }




  guardar(){

    if(this.forma.invalid){
      
      return Object.values(this.forma.controls).forEach(control=>{

        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAllAsTouched());
        }
        else{
        control.markAsTouched();
      }
      })
    }
    console.log(this.forma);

    //Posteo de formulario

    this.forma.reset({
      nombre:'sin nombre'
    });



  }

  agregarPasatiempo(){
    this.pasatiempos.push(this.fb.control(''))
  }

  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i);
  }

  crearListeners(){
    // this.forma.valueChanges.subscribe( valor =>{
    //   console.log(valor)
    // })

    // this.forma.statusChanges.subscribe(status => console.log({status}));
    this.forma.get('nombre').valueChanges.subscribe(console.log);

  }

}
