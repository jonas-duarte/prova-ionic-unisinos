import { IonButton, IonItem, IonLabel } from '@ionic/react';

function remove(error: any, stateHandler: any) {
    stateHandler[1](stateHandler[0].filter((e: any) => e !== error))
}

const Errors: React.FC<any> = ({ stateHandler }) => {
    const [errors] = stateHandler
    return (
        < >
            {errors.map((e: any, i: number) => (
                <IonItem key={i} color={e.type}>
                    <IonLabel>{e.message}</IonLabel>
                    <IonButton color={e.type} onClick={() => remove(e, stateHandler)}>X</IonButton>
                </IonItem>
            ))}
        </>
    );
};

export default Errors;

export function __alert(message: string, stateHandler: any) {
    stateHandler[1]([...stateHandler[0], { type: "danger", message }])

}
