import express from "express"; // Importando o express
import conectarAoBanco from "./src/config/dbConfig.js"; // Importando a função conectarAoBanco
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Função para iniciar o servidor

//Definindo um array de posts
const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imgUrl: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Gato adorável se espreguiçando no sol",
        imgUrl: "https://placecats.com/millie/300/150"
    },
    {
        id: 3,
        descricao: "Um gato curioso olhando para a câmera",
        imgUrl: "https://placecats.com/millie/300/150"
    }
];

//Criando uma instância do express
const app = express();
app.use(express.json());

//Iniciando o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// Função para obter todos os posts do banco de dados
async function getTodosPosts() {
    const db = conexao.db("imersao-instalike");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
};

//Definindo uma rota para a raiz
app.get("/posts", async (req, res) => {
    const posts = await getTodosPosts();
    res.status(200).json(posts)
});

//Função para buscar um post por ID
//function buscarPostPorId(id) {
//    return posts.findIndex((post) => {
//        return post.id === Number(id);
//    });
//}

//Definindo uma rota para um post específico
//app.get("/posts/:id", (req, res) => {
//    const index = buscarPostPorId(req.params.id);
//    res.status(200).json(posts[index]);
//});