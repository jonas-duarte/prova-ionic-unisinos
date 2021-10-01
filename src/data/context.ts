import { Storage } from '@ionic/storage';

export class Context {
    private static data: Storage

    static async create() {
        const store = new Storage();
        const storage = await store.create()
        Context.data = storage
    }

    static async set(key: string, value: any) {
        if (!Context.data) await Context.create();
        Context.data.set(key, value);
    }

    static async get(key: string) {
        if (!Context.data) await Context.create();
        return Context.data.get(key);
    }
}