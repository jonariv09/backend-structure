const jwt = require("jsonwebtoken");

const generarJwt = (uid, name) => {
	return new Promise((resolve, reject) => {
		const payload = { uid, name };

		jwt.sign(
			payload,
			process.env.SECRET_JWT_SEED,
			{ expiresIn: "5m" },
			(err, token) => {
				if (err) {
					console.log(err);
					reject("No se pudo generar el token");
				}

				resolve(token);
			}
		);
	});
};

module.exports = {
	generarJwt,
};
