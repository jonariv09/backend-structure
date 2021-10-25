const { Router } = require("express");
const {
	crearUsuario,
	loginUsuario,
	renewUsuario,
} = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", (req, res) => {
	return res.json({
		ok: true,
	});
});

router.post(
	"/new",
	[
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("email", "El email no es valido").isEmail(),
		check("password", "El password debe de ser de 6 caracteres").isLength({
			min: 6,
		}),
		validarCampos,
	],
	crearUsuario
);

router.post(
	"/",
	[
		check("email", "El email no es valido").isEmail(),
		check("password", "El password debe de ser de 6 caracteres").isLength({
			min: 6,
		}),
		validarCampos,
		validarJwt,
	],
	loginUsuario
);

router.get("/renew", validarJwt, renewUsuario);

module.exports = router;
