const express = require("express");
const { validationResult } = require("express-validator");
const { generarJwt } = require("../helpers/jwt");

const crearUsuario = async (req, res = express.response) => {
	const { id, name, email, password } = req.body;

	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	return res.status(400).json({
	// 		ok: false,
	// 		errors: errors.mapped(),
	// 	});
	// }

	const token = await generarJwt(id, name);

	return res.status(201).json({
		ok: true,
		msg: "registro",
		token,
	});
};

const loginUsuario = (req, res = express.response) => {
	const { email, password } = req.body;

	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	return res.status(400).json({
	// 		ok: false,
	// 		errors: errors.mapped(),
	// 	});
	// }

	return res.json({
		ok: true,
		msg: "login",
	});
};

const renewUsuario = async (req, res = express.response) => {
	const { uid, email, name, password } = req;

	const token = await generarJwt(uid, name);

	return res.json({
		ok: true,
		msg: "renew",
		token,
	});
};

module.exports = {
	crearUsuario,
	loginUsuario,
	renewUsuario,
};
