import { Storage } from '@ionic/storage';

export const curriculoFields = [
    { name: "nome", label: "NOME DO CANDIDATO" },
    { name: "vaga", label: "VAGA PRETENDIDA" },
    { name: "avaliador", label: "GERENTE QUE AVALIA" },
    { name: "formacao", label: "FORMAÇÃO EDUCACIONAL", type: "text" },
    { name: "experience", label: "EXPERIÊNCIA PROFISSIONAL", type: "text" },
    { name: "nivelIngles", label: "NÍVEL DE CONHECIMENTO EM INGLÊS", type: "select", options: ["iniciante", "médio", "avançado"] }
]

export class CurriculoStorage {
    private static data: Storage

    private static id: number = 2

    static async create() {
        const store = new Storage();
        const storage = await store.create()

        await storage.set("1", {
            nome: "Jonas",
            vaga: "Rei da Gambiarra",
            avaliador: "Professor",
            formacao: "Workaround SA",
            experience: "Muita",
            nivelIngles: "avançado",
        })

        await storage.set("2", {
            nome: "Rafael",
            vaga: "Rei da Gambiarra",
            avaliador: "Professor",
            formacao: "Workaround SA",
            experience: "Muita",
            nivelIngles: "avançado",
        })


        CurriculoStorage.data = storage
    }


    static async novoCurriculo(form: any) {
        if (!CurriculoStorage.data) await CurriculoStorage.create()

        this.id++
        CurriculoStorage.data.set("" + this.id, { ...form, disponivel: true })
    }

    static async getAll() {
        if (!CurriculoStorage.data) await CurriculoStorage.create()

        const promises = []
        for (let i = 1; i <= this.id; i++) {
            promises.push(CurriculoStorage.data.get("" + i))
        }

        return (await Promise.all(promises)).filter(r => r).map((d, i) => ({ ...d, id: i + 1 }))
    }

    static async setCurriculo(form: any) {
        if (!CurriculoStorage.data) await CurriculoStorage.create()
        CurriculoStorage.data.set("" + form.id, { ...form })
    }

}