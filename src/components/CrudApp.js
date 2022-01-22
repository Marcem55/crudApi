import React, { useState } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";

const initialDb = [
	{
		id: 1,
		name: "Seiya",
		constellation: "Pegaso",
	},
	{
		id: 2,
		name: "Shiryu",
		constellation: "Dragon",
	},
	{
		id: 3,
		name: "Hyoga",
		constellation: "Cisne",
	},
	{
		id: 4,
		name: "Shun",
		constellation: "Andromeda",
	},
	{
		id: 5,
		name: "Ikki",
		constellation: "Fenix",
	},
];

const CrudApp = () => {
	const [db, setDb] = useState(initialDb);
	const [dataToEdit, setDataToEdit] = useState(null);

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
			<h2>CRUD App</h2>
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

export default CrudApp;
