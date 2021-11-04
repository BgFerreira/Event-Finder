const PORT = 8000;
const USERS_PATH = "./tables/users.json";
const EVENTS_PATH = "./tables/events.json";

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// -------------------- LOGIN --------------------

app.post("/login", (req, res) => {

    const { username } = req.body;
    const { password } = req.body;

    readFile(USERS_PATH)
    .then((data) => {
        console.log("Arquivo de Usuários acessado \n");

        const allUsers = data;
        console.log(allUsers);

        const userFound = searchForUser(allUsers, username);

        if (userFound !== undefined) {
            console.log("Prosseguindo com a tentativa de login");

            const passwordCheck = userFound.password === password ? true : false;

            if (passwordCheck) {
                console.log("Usuário autenticado");

                //prosseguir com a criação do hash
                res.status(200).json({"message":"Logado com sucesso"});
            } else {
                console.log("Senha Incorreta: ");
                console.log(password);

                res.status(403).json({"message":"Acesso não autorizado. Senha Incorreta"})
            }
        } else {
            console.log("Usuário não encontrado: ");
            console.log(username);

            res.status(403).json({"message":"Acesso não autorizado. Usuário não encontrado"})
        }
    })
    .catch ((error) => {
        console.log("Não foi possível acessar os usuários salvos\n");
        console.error(error);

        res.status(500).json({"message":"Erro no servidor. Tente novamente mais tarde"});
    })
})

// -------------------- SIGNUP --------------------

app.post("/signup", (req, res) => {
    const { name } = req.body;
    const { username } = req.body;
    const { password } = req.body;
    const { confirmPassword } = req.body;

    readFile(USERS_PATH)
    .then((data) => {
        console.log("Arquivo de Usuários acessado \n");

        let allUsers = data;
        console.log(allUsers);
        console.log(typeof(allUsers))

        const userExist = searchForUser(allUsers, username);

        if (userExist === undefined) {
            console.log("Prosseguindo com o cadastro...");
            
            const samePassword = password === confirmPassword ? true : false;

            if (samePassword) {

                const newUser = {
                    id: allUsers.length,
                    name: name,
                    username: username,
                    password: password,
                    userType: "noAdm",
                    eventsRegistered: [],
                    deleted: false
                }

                allUsers.push(newUser);
                console.log(allUsers);

                writeFile(USERS_PATH, allUsers);

                res.status(400).json({"message":"Cadastro realizado com sucesso"})
            } else {
                console.log("Falha na confirmação da senha");
                console.log(password, confirmPassword);

                res.status(400).json({"message":"As senhas devem ser indenticas"});
            }
        } else {
            console.log("Usuário existente");
            console.log(username);

            res.status(400).json({"message":"Usuário já existente"});
        }
    })
    .catch((error) => {
        console.log("Não foi possível acessar os usuários salvos\n");
        console.error(error);

        res.status(500).json({"message":"Erro no servidor. Tente novamente mais tarde"});
    });
});

// -------------------- FUNCTIONS --------------------

const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

const writeFile = (filePath, data) => {
    const dataToWrite = JSON.stringify(data);

    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, dataToWrite, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve("File Writed")
            }
        });
    })
}

// Passar o username do usuário como segundo parametro
const searchForUser = (userArray, userToFind) => {
    let userFound = undefined;

    userArray.forEach((element) => {
        if (element.username === userToFind) {
            userFound = element;

            console.log("Usuário existente!");
            console.table(element);
        }
    });

    return userFound;
}

// -------------------- LISTENNING --------------------

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});