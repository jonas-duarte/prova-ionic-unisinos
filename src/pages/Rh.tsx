import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { Context } from '../data/context';
import { curriculoFields, CurriculoStorage } from '../data/curriculo-storage';
import { UserStorage } from '../data/user-storage';
import Errors, { __alert } from "../components/errors"

const Rh: React.FC = () => {

    const [form, setForm] = useState<any>({});
    const [logout, setLogout] = useState<any>(false);


    const stateHandler = useState([]);


    function getField({ name, label, type, options }: any) {
        switch (type) {
            case "text":
                return <IonTextarea value={form[name]} placeholder={label} onIonChange={e => setForm({ ...form, [name]: e.detail.value! })}></IonTextarea>
            case "select":
                return (
                    <>
                        <IonLabel>{label}</IonLabel>
                        <IonSelect onIonChange={e => setForm({ ...form, [name]: e.detail.value! })}>
                            {options.map((o: any) => <IonSelectOption key={o} value={o}>{o}</IonSelectOption>)}
                        </IonSelect>
                    </>
                )
            default:
                return <IonInput value={form[name]} placeholder={label} onIonChange={e => setForm({ ...form, [name]: e.detail.value! })} required></IonInput>
        }
    }

    async function addCurriculo(form: any) {
        if ((await Context.get("authorization")) !== "rh") {
            __alert("perfil invalido para realizar essa operação", stateHandler)
            await handleLogout()
            return
        }
        await CurriculoStorage.novoCurriculo(form)
        if (curriculoFields.some(f => !form[f.name])) {
            __alert("informe todos campos obrigatorios", stateHandler)
            return
        }
        __alert("curriculo cadastrado", stateHandler)
        setForm({})
    }


    async function handleLogout() {
        await UserStorage.logout()
        __alert("usuário deslogado", stateHandler)
        setLogout(true)
    }


    if (logout) return <Redirect from="/rh" to="/login" />

    return (
        <IonPage>
            <IonContent fullscreen>
                <Errors stateHandler={stateHandler} />
                {curriculoFields.map((field) =>
                    <IonItem key={field.name}>
                        {getField(field)}
                    </IonItem>)}

                <IonButton color="light" onClick={() => addCurriculo(form)}>Adicionar currículo</IonButton>
                <IonButton color="dark" onClick={() => handleLogout()}>Logout</IonButton>
            </IonContent>
        </IonPage >
    );
};

export default Rh;
