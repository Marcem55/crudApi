export const helpHttp = () => {
	const customFetch = (endpoint, options) => {
		const defaultHeader = {
			accept: "application/json",
		};

		// Si el request no recibe respuesta, abortamos o hacemos alguna otra accion
		const controller = new AbortController();
		options.signal = controller.signal;

		// Si el usuario no especifica el metodo de la request, por defecto es GET
		options.method = options.method || "GET";

		// Si el usuario especifica headers, me creo un objeto con mi defaultHeader y lo que especifica el usuario, sino solo mi defaultHeader
		options.headers = options.headers
			? { ...defaultHeader, ...options.headers }
			: defaultHeader;

		// Si existe el body, se parsea para que llegue correctamente al back, sino se setea en false, luego se verifica esa fasledad y si da true, se elimina
		options.body = JSON.stringify(options.body) || false;
		if (!options.body) delete options.body;

		console.log(options);
    
		// Si despues de 3 segundos no recibo respuesta del back, aborto la peticion con el metodo abort del objeto controller
		setTimeout(() => {
			controller.abort();
		}, 3000);

		return fetch(endpoint, options)
			.then((res) =>
				res.ok
					? res.json()
					: Promise.reject({
							err: true,
							status: res.status || "00",
							statusText: res.statusText || "Ocurrió un error",
					  })
			)
			.catch((err) => err);
	};

	const get = (url, options = {}) => customFetch(url, options);

	const post = (url, options = {}) => {
		options.method = "POST";
		return customFetch(url, options);
	};

	const put = (url, options = {}) => {
		options.method = "PUT";
		return customFetch(url, options);
	};

	const del = (url, options = {}) => {
		options.method = "DELETE";
		return customFetch(url, options);
	};

	return {
		get,
		post,
		put,
		del,
	};
};
