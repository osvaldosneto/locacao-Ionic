import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HospedagemService } from '../../services/domain/hospedagem.service';
import { HospedagemDto } from '../../models/hospedagem.dto';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-pick-hospedagem',
  templateUrl: 'pick-hospedagem.html',
})
export class PickHospedagemPage {

  hospedagens: HospedagemDto[]
  hospedagem: HospedagemDto

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public hospedagemService: HospedagemService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.hospedagemService.findAll()
      .subscribe(response =>{
        this.hospedagens = response
      },
      error => {})
  }

  searchHospedagem(id : string){
    this.hospedagemService.findById(id)
      .subscribe(response =>{
        this.hospedagem = response
        this.showHospedagem()
      },
      error => {})
  }
  showHospedagem() {
    let alert = this.alertCtrl.create({
      title: 'Detalhes Hospedagem '+ this.hospedagem.nome+ '!',
      enableBackdropDismiss: false,
      buttons: [
        {text: 'Código : ' + this.hospedagem.id},
        {text: 'Nome : ' + this.hospedagem.nome},
        {text: 'Máximo de Hospedes : ' + this.hospedagem.maximoHospedes},
        {text: 'Diária : ' + this.hospedagem.valorDiaria + ',00'},
        {text: 'Valor Hospede Extra : ' + this.hospedagem.valorHospedeExtra + ',00'},
        {text: 'Valor Taxa de Limpeza : ' + this.hospedagem.taxaLimpeza + ',00'},
        {
          text: 'Ok',
          handler: () => {},
        }
      ]
    });
    alert.present();
  }

  removeHospedagem(id : string){
    this.hospedagemService.findById(id)
      .subscribe(response =>{
        this.hospedagem = response
        this.showDeleteOk()
      },
      error => {})
  }

  editHospedagem(id : string){
    this.navCtrl.push("EditHospedagemPage", {hospedagem_id : id})
  }

  showDeleteOk() {
    let alert = this.alertCtrl.create({
      title: 'Deletando Hospedagem!',
      message: 'Você tem certeza que deseja excluir a hospedagem ' + this.hospedagem.nome,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.confirmaDeleta()
            this.showDeletado()
            this.navCtrl.setRoot("PrincipalPage");
          }
        },
        {
          text: 'Não',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  confirmaDeleta(){
    this.hospedagemService.removeHospedagem(this.hospedagem.id)
      .subscribe(repsponse =>{
        this.navCtrl.push("PrincipalPage");
      },
      error => {});
  }

  showDeletado(){
    let alert = this.alertCtrl.create({
      title: 'Deletado!',
      message: 'Hospedagem deletada com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot("PrincipalPage");
          }
        }
      ]
    });
    alert.present();
  }
}