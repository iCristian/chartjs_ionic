import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-barras',
  templateUrl: 'barras.html',
})
export class BarrasPage {

  public pesoGestante;
  public estaturaGestante;
  public semanasGestante;
  public imc;
  public isDisabled;

  //GraphJs
  public imcVector = [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,];
  public lineChartData:Array<any>;
  public lineChartLabels:Array<any>;
  public lineChartOptions:any;
  public lineChartColors:Array<any>;
  public lineChartLegend:boolean;
  public lineChartType:string;


  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.lineChartLabels = [6, 7, 8,	9,	10,	11,	12,	13,	14,	15,	16,	17,	18,	19,	20,	21,	22,	23,	24,	25,	26,	27,	28,	29,	30,	31,	32,	33,	34,	35,	36,	37,	38,	39,	40,	41,	42];
    this.isDisabled = false;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ImcPage');
  }

  showBasicAlert(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  calcularImc(){
    if(this.pesoGestante == null || this.estaturaGestante == null || this.semanasGestante == null){
      this.showBasicAlert("Error en parámetros", "Asegurese de completar todos los parámetros solicitados");
    }else if(this.pesoGestante > 180 || this.pesoGestante < 30){
      this.showBasicAlert("Error en el Peso", "Revise que el Peso este en Kilogramos, en caso de utilizar decimales debe agregarlo con el separador punto (.)");
    }else if(this.estaturaGestante > 2.5 || this.estaturaGestante < 1){
      this.showBasicAlert("Error en la Estatura", "Asegurese que el separador de estatura es punto (.) y no coma");
    }else{
      this.isDisabled = true;
      this.pesoGestante = parseFloat(this.pesoGestante);
      this.estaturaGestante = parseFloat(this.estaturaGestante);
      console.log(this.pesoGestante);
      console.log(this.estaturaGestante);
      this.imc = ((this.pesoGestante)/(this.estaturaGestante * this.estaturaGestante)).toFixed(1);
      console.log(this.imc);
      this.imcVector[this.semanasGestante - 6] = this.imc;
      //grafico
      this.lineChartData = [
        {data: this.imcVector, label:'IMC Gestante'},
        {data: [20.0,	20.1,	20.2,	20.2,	20.3,	20.4,	20.5,	20.7,	20.8,	20.9,	21.1,	21.2,	21.3,	21.5,	21.6,	21.8,	21.9,	22.1,	22.3,	22.5,	22.7,	22.8,	23.0,	23.2,	23.4,	23.5,	23.7,	23.9,	24.0,	24.2,	24.3,	24.5,	24.6,	24.8,	25.0,	25.1,	25.1], label: 'Enflaquecida'},
        {data: [24.9,	24.9,	25.0,	25.1,	25.2,	25.3,	25.4,	25.6,	25.7,	25.8,	25.9,	26.0,	26.1,	26.2,	26.3,	26.4,	26.6,	26.7,	26.9,	27.0,	27.2,	27.3,	27.5,	27.6,	27.8,	27.9,	28.0,	28.1,	28.3,	28.4,	28.5,	28.7,	28.8,	28.9,	29.1,	29.2,	29.2], label: 'Normal'},
        {data: [30.0,	30.0,	30.1,	30.2,	30.2,	30.3,	30.3,	30.4,	30.5,	30.6,	30.7,	30.8,	30.9,	30.9,	31.0,	31.1,	31.2,	31.3,	31.5,	31.6,	31.7,	31.8,	31.9,	32.0,	32.1,	32.2,	32.3,	32.4,	32.5,	32.6, 32.7,	32.8,	32.9,	33.0,	33.1,	33.2,	33.2], label: 'Sobrepeso'},
        {data: [40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0,], label: 'Obesidad'},
      ];

      this.lineChartOptions = {
        responsive: true
      };
      this.lineChartColors = [
        { // Caso
          backgroundColor: 'rgba(49, 27, 146, 1)',
          //borderColor: 'rgba(255, 23, 68, 1)',
          pointBackgroundColor: 'rgba(49, 27, 146, 1)',
          pointBorderColor: 'rgba(101, 31, 255, 0.7)',
          //pointHoverBackgroundColor: '#fff',
          //pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // Enflaquecido
          backgroundColor: 'rgba(255, 23, 68, 0.6)',
          borderColor: 'rgba(255, 23, 68, 1)',
          pointBackgroundColor: 'rgba(255, 23, 68, 0)',
          pointBorderColor: 'rgba(255, 23, 68, 0)',
          //pointHoverBackgroundColor: '#fff',
          //pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // Normal
          backgroundColor: 'rgba(124, 179, 66, 0.6)',
          borderColor: 'rgba(124, 179, 66, 1)',
          pointBackgroundColor: 'rgba(124, 179, 66, 0)',
          pointBorderColor: 'rgba(124, 179, 66, 0)',
          //pointHoverBackgroundColor: '#fff',
          //pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // Sobrepeso
          backgroundColor: 'rgba(255, 235, 59,0.6)',
          borderColor: 'rgba(255, 235, 59,1)',
          pointBackgroundColor: 'rgba(255, 235, 59,0)',
          pointBorderColor: 'rgba(255, 235, 59,0)',
          //pointHoverBackgroundColor: '#fff',
          //pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // Obesidad
          backgroundColor: 'rgba(245, 124, 0,0.6)',
          borderColor: 'rgba(245, 124, 0,1)',
          pointBackgroundColor: 'rgba(245, 124, 0,0)',
          pointBorderColor: 'rgba(245, 124, 0,0)',
          //pointHoverBackgroundColor: '#fff',
          //pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
      ];
      this.lineChartLegend = true;
      this.lineChartType = 'line';
      //fin grafico
    }
  }

  borrar(){
    this.pesoGestante = null;
    this.estaturaGestante = null;
    this.semanasGestante = null;
    this.imc = null;
    this.imcVector = null;
    this.imcVector  = [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,];
    this.isDisabled = false;
  }

}
