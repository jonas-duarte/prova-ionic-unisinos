import { IonButton, IonContent, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { UserStorage } from '../data/user-storage';
import Errors, { __alert } from "../components/errors"

const Login: React.FC = () => {

  const [usuario, setUsuario] = useState<string>("test");
  const [senha, setSenha] = useState<string>("senha");
  const [authorized, setAuthorized] = useState<string | null>(null);

  const stateHandler = useState([]);

  async function handleLogin(username: string, password: string) {
    const authorization = await UserStorage.isAuthorized({ username, password });
    if (!authorization) __alert("usuario invalido", stateHandler)
    setAuthorized(authorization);
  }


  if (authorized === "rh") return <Redirect from="/login" to="/rh" />
  if (authorized === "gerente") return <Redirect from="/login" to="/gerente" />

  return (
    <IonPage>
      <IonContent fullscreen>
        <Errors stateHandler={stateHandler} />
        <IonItem>
          <IonInput value={usuario} placeholder="Usuário" onIonChange={e => setUsuario(e.detail.value!)} clearInput></IonInput>
        </IonItem>
        <IonItem>
          <IonInput value={senha} placeholder="Senha" onIonChange={e => setSenha(e.detail.value!)} clearInput type="password"></IonInput>
        </IonItem>
        <IonButton color="light" onClick={() => handleLogin(usuario, senha)}>Login</IonButton>
      </IonContent>
    </IonPage >
  );
};

export default Login;
