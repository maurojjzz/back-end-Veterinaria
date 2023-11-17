import { Usuario } from "../usuario/usuario.entity.js";
import { orm } from "../shared/db/orm.js";
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();
const em = orm.em;
em.getRepository(Usuario);
export const authLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await em.findOneOrFail(Usuario, { email }, { populate: ['rol', 'mascotas'] });
        if (email === usuario.email && password === usuario.password) {
            const user = { id: usuario.id, email: email, role: usuario.rol.descripcion };
            const accessToken = generateAccessToken(user);
            res.header('authorization', accessToken).json({
                message: "Usuario auntenticado",
                token: accessToken,
                role: usuario.rol.descripcion
            });
        }
        else {
            res.status(401).json({ error: "Credenciales incorrectas" });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};
//# sourceMappingURL=auth.controller.js.map