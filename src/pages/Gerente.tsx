import { IonButton, IonChip, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTextarea, IonToolbar, useIonPopover } from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router';
import { Context } from '../data/context';
import { curriculoFields, CurriculoStorage } from '../data/curriculo-storage';
import { UserStorage } from '../data/user-storage';
import Errors, { __alert } from "../components/errors"


class Gerente extends React.Component {
  state = {
    candidatos: [],
    logout: false,
    errors: []
  }

  async componentDidMount() {
    const stateHandler = [this.state.errors, (errors: any[]) => this.setState({ errors })];
    if ((await Context.get("authorization")) !== "gerente") {
      __alert("perfil invalido para realizar essa operação", stateHandler)
      this.handleLogout()
      return
    }
    const candidatos = await CurriculoStorage.getAll()
    this.setState({ candidatos })
  }

  async handleLogout() {
    const stateHandler = [this.state.errors, (errors: any[]) => this.setState({ errors })];
    await UserStorage.logout()
    __alert("usuário deslogado", stateHandler)
    this.setState({ logout: true })
  }

  async toggleSelecionado(candidato: any) {
    candidato.aprovado = !candidato.aprovado;
    await CurriculoStorage.setCurriculo(candidato);
    this.setState({});
  }

  render() {

    const stateHandler = [this.state.errors, (errors: any[]) => this.setState({ errors })];

    if (this.state.logout) return <Redirect from="/rh" to="/login" />

    return (<IonPage>
      <IonContent fullscreen>
        <Errors stateHandler={stateHandler} />

        <IonItem><IonToolbar >Candidatos</IonToolbar></IonItem>
        {this.state.candidatos.map((c: any) => (
          <IonItem className="ion-text-wrap" key={c.id}  >
            
            <IonLabel className="ion-text-wrap" >
            <IonChip color={c.aprovado ? "success" : "danger"} onClick={() => this.toggleSelecionado(c)}> <IonLabel color="dark">{c.aprovado ? "Aprovado" : "Não selecionado"}</IonLabel></IonChip>
              {curriculoFields.map((field) =>

                <IonChip color="secondary" key={c.id + field.name}  >
                  <IonLabel color="dark">{c[field.name]}</IonLabel>
                </IonChip>
              )}
            </IonLabel>
          </IonItem>
        ))
        }


        <IonButton color="dark" onClick={() => this.handleLogout()}>Logout</IonButton>
      </IonContent>
    </IonPage >)
  }
}

export default Gerente

