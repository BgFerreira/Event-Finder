const PORT = 8000;
const URL = "http://localhost:8000"
const USERS_PATH = "./tables/users.json";
const EVENTS_PATH = "./tables/events.json";
const SESSIONS_PATH = "./tables/sessions.json";
const QRCODES_PATH = "./tables/qrcodes.json";
const cookieLifetime = 1000 * 3600;

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const qrcode = require("qrcode-generator");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ "origin": "http://localhost:3000", "methods": "GET,POST", "credentials": true }));

// -------------------- LOGIN --------------------

app.post("/login", async (req, res) => {

    const { username } = req.body;
    const { password } = req.body;

    const timestamp = Date.now();
    const allUsers = await readFile(USERS_PATH);
    const userFound = searchForUser(allUsers, username);

    let logged = false;

    if (userFound !== undefined) {
        console.log("Prosseguindo com a tentativa de login");

        bcrypt.compare(password, userFound.password, async (error, passwordCheck) => {

            if (passwordCheck) {
                console.log("Usuário autenticado");

                const cookieHash = await createCookie(username, timestamp);
                res.cookie("cookieSession", cookieHash, {
                    secure: true,
                    httpOnly: true,
                    sameSite: 'none'
                }
                );

                const allSessions = await readFile(SESSIONS_PATH)

                const session = {
                    sessionHash: cookieHash,
                    userId: userFound.id,
                    userType: userFound.userType,
                    create: timestamp,
                    expire: timestamp + cookieLifetime
                }

                allSessions.push(session);

                writeFile(SESSIONS_PATH, allSessions)
                    .then((data) => {
                        console.log("Sessão salva");

                        logged = true;

                        res.send({
                            eventsRegistred: userFound.eventsRegistered,
                            userType: userFound.userType,
                            logged: logged
                        });
                    })
                    .catch((error) => {
                        res.status(500).json({ "message": "Erro no servidor. Tente novamente mais tarde" });
                    })
            } else {
                res.send({
                    eventsRegistred: undefined,
                    userType: undefined,
                    logged: logged
                });
            }
        });
    } else {
        res.send({
            eventsRegistred: undefined,
            userType: undefined,
            logged: logged
        });
    }
});

// -------------------- SIGNUP --------------------

app.post("/signup", (req, res) => {
    const { name } = req.body;
    const { username } = req.body;
    const { password } = req.body;
    const { confirmPassword } = req.body;

    const saltRounds = 13;

    readFile(USERS_PATH)
        .then((data) => {
            console.log("Arquivo de Usuários acessado \n");

            let allUsers = data;
            console.log(allUsers);

            const userExist = searchForUser(allUsers, username);

            if (userExist === undefined) {
                console.log("Prosseguindo com o cadastro...");

                const samePassword = password === confirmPassword;

                if (samePassword) {

                    try {
                        bcrypt.genSalt(saltRounds, (error, salt) => {
                            bcrypt.hash(password, salt, (error, hash) => {
                                console.log("Senha Criptografada");

                                console.log(hash);

                                const newUser = {
                                    id: allUsers.length,
                                    name: name,
                                    username: username,
                                    password: hash,
                                    userType: "noAdm",
                                    eventsRegistered: [],
                                    deleted: false
                                }

                                allUsers.push(newUser);
                                console.log(allUsers);

                                writeFile(USERS_PATH, allUsers)
                                    .then(() => {
                                        console.log("Novo usuário salvo!");
                                        res.status(200).json({ "message": "Usuário criado com sucesso" });
                                    })
                                    .catch(() => {
                                        console.log("Erro na escrita do arquivo de usuário!")
                                        res.status(500).json({ "message": "Erro no servidor. Tente novamente mais tarde" });
                                    })
                            })
                        })
                    } catch {
                        console.log("Falha na criptografia da senha");
                        res.status(500).json({ "message": "Erro no servidor. Tente novamente mais tarde" });
                    }
                } else {
                    console.log("Falha na confirmação da senha");
                    res.status(400).json({ "message": "As senhas devem ser indenticas" });
                }
            } else {
                console.log("Usuário existente");
                res.status(400).json({ "message": "Usuário já existente" });
            }
        })
        .catch((error) => {
            console.log("Não foi possível acessar os usuários salvos\n");
            res.status(500).json({ "message": "Erro no servidor. Tente novamente mais tarde" });
        });
});

// -------------------- GET EVENTS --------------------

app.get("/get-events", async (req, res) => {
    const allEvents = await readFile(EVENTS_PATH);
    res.send(allEvents);
});

app.get("/get-events/:eventId", async (req, res) => {
    const { eventId } = req.params;

    const allEvents = await readFile(EVENTS_PATH);
    const eventFiltred = allEvents.filter((element) => {
        return element.id == eventId;
    })

    res.send(eventFiltred[0]);
});

// -------------------- CREATE EVENTS --------------------

app.post("/post-events", async (req, res) => {
    const { title } = req.body;
    const { description } = req.body;
    const { date } = req.body;
    const { time } = req.body;
    const { img } = req.body;

    const { cookies } = req;

    const timestamp = Date.now();

    if ("cookieSession" in cookies) {
        const allSessions = await readFile(SESSIONS_PATH);

        const sessionFound = allSessions.find((element) => {
            return element.sessionHash === cookies.cookieSession;
        });

        if (sessionFound !== undefined && sessionFound.expire > timestamp && sessionFound.create < timestamp && sessionFound.userType === "adm") {
            const allEvents = await readFile(EVENTS_PATH);

            const newEvent = {
                id: allEvents.length,
                title: title,
                description: description,
                date: date,
                time: time,
                participants: [],
                img: img,
                deleted: false
            }

            allEvents.push(newEvent);
            writeFile(EVENTS_PATH, allEvents);

            res.status(200).json({ "message": "Evento criado" });
        } else {
            res.status(403).json({ "message": "Seção invalida! Apenas o Adm pde cadastrar novos eventos!" });
        }
    } else {
        res.status(403).json({ "message": "Cookie inválido" });
    }
});

// -------------------- GENERATE QRCODE --------------------

app.get("/get-events/:eventId/generate-qrcode", async (req, res) => {

    const { eventId } = req.params
    const { cookieSession } = req.cookies;

    if (cookieSession !== undefined) {
        const allSessions = await readFile(SESSIONS_PATH);
        const timestamp = Date.now();

        const sessionFound = allSessions.find((element) => {
            return element.sessionHash === cookieSession;
        });

        if (sessionFound !== undefined && sessionFound.expire > timestamp && sessionFound.create < timestamp) {
            const allQrcodes = await readFile(QRCODES_PATH);
            const dataToHash = `${eventId}${sessionFound.userId}`;

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const qrcodeHash = await bcrypt.hash(dataToHash, salt);

            const newQrcode = {
                hash: qrcodeHash,
                userId: sessionFound.userId,
                eventId: eventId,
                valid: true
            }

            allQrcodes.push(newQrcode);
            writeFile(QRCODES_PATH, allQrcodes);
            const chekinUrl = `${URL}/checkIn?hash=${qrcodeHash}`;
            const typeNumber = 5;
            const errorCorrectionLevel = "L";
            const qr = qrcode(typeNumber, errorCorrectionLevel);
            qr.addData(chekinUrl);
            qr.make();

            const qrUrl = qr.createDataURL(6);
            console.log(chekinUrl)
            res.send(qrUrl);
        } else {
            res.status(403).json({ "message": "Seção invalida! Faça o Login!" })
        }
    } else {
        res.status(403).json({ "message": "Cookie inválido" })
    }
});

// -------------------- VALIDATE QRCODE --------------------

app.get("/checkIn?", async (req, res) => {
    const { hash } = req.query;
    const allQrcodes = await readFile(QRCODES_PATH);

    const qrcodeFound = allQrcodes.find((element) => element.hash === hash);

    if (qrcodeFound !== undefined) {
        if (qrcodeFound.valid) {
            res.send(`<h2>Acesso Autorizado</h2>`);

            allQrcodes.forEach(element => {
                if (element.hash === qrcodeFound.hash) {
                    element.valid = false;
                }
            });

            writeFile(QRCODES_PATH, allQrcodes);
        } else {
            res.send(`<h2>Acesso Negado</h2>`);
        }
    } else {
        res.send(`<h2>Acesso Negado</h2>`);
    }
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
                resolve("File Writed");
            }
        });
    })
}

const searchForUser = (userArray, userToFind) => {
    return userArray.find((element) => element.username === userToFind);
}

const createCookie = async (username, timestamp) => {
    const cookie = `${username}${timestamp}`;

    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(cookie, salt);

    console.log(hash);
    return hash;
}

// -------------------- LISTENNING --------------------

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});