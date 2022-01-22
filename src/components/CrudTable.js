import React from "react";
import CrudTableRow from "./CrudTableRow";

const CrudTable = ({ data, setDataToEdit, deleteData }) => {
	return (
		<div>
			<h4>Tabla de datos</h4>
			<table>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Constelacion</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{data.length === 0 ? (
						<tr>
							<td colSpan="3">Sin Datos</td>
						</tr>
					) : (
						data.map((el) => (
							<CrudTableRow
								key={el.id}
								el={el}
								setDataToEdit={setDataToEdit}
								deleteData={deleteData}
							/>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default CrudTable;
