import React, { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";

const CrudApi = () => {
	const [db, setDb] = useState([]);
	const [dataToEdit, setDataToEdit] = useState(null);

	let api = helpHttp();
	let url = "https://localhost:3001/personajes";

	useEffect(() => {
		api.get(url).then((res) => {
			console.log(res);
		});
	}, []);

	const createData = (data) => {
		data.id = Date.now();
		// console.log(data);
		setDb([...db, data]);
	};

	const updateData = (data) => {
		let newData = db.map((el) => (el.id === data.id ? data : el));
		setDb(newData);
	};

	const deleteData = (id) => {
		let isDelete = window.confirm(
			`Estas seguro de eliminar el registro con el id '${id}'`
		);
		if (isDelete) {
			setDb(db.filter((el) => el.id !== id));
		} else {
			return;
		}
	};

	return (
		<>
			<h2>CRUD API</h2>
			<article className="grid-1-2">
				<CrudForm
					createData={createData}
					updateData={updateData}
					dataToEdit={dataToEdit}
					setDataToEdit={setDataToEdit}
				/>
				<CrudTable
					data={db}
					setDataToEdit={setDataToEdit}
					deleteData={deleteData}
				/>
			</article>
		</>
	);
};

export default CrudApi;
