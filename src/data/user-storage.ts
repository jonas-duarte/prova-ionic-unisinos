import { Storage } from '@ionic/storage';
import { Context } from './context';

export class UserStorage {
    private static data: Storage

    static async create() {
        const store = new Storage();
        const storage = await store.create()

        await storage.set("test", { id: 1, nome: "Test Junior", senha: "senha", perfil: "rh" })
        await storage.set("jonas", { id: 1, nome: "Jonas Junior", senha: "123", perfil: "rh" })
        await storage.set("fulano", { id: 1, nome: "Fulano Junior", senha: "gosto_de_mandioca", perfil: "rh" })
        await storage.set("ger", { id: 1, nome: "Fulano Junior", senha: "senha", perfil: "gerente" })

        UserStorage.data = storage
    }

    static async isAuthorized(user: { username: string, password: string }) {
        if (!UserStorage.data) await UserStorage.create()
        const _user = await UserStorage.data.get(user.username)
        const authorized = _user.senha === user.password
        if (!authorized) return null
        Context.set("authorization", _user.perfil)
        return _user.perfil
    }

    static async logout() {
        if (!UserStorage.data) await UserStorage.create()
        Context.set("authorized", false)
    }
}