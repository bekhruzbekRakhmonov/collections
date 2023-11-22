import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import Paper from "@mui/material/Paper";

interface Column {
	id: string;
	label: string;
	numeric?: boolean;
}

interface Props {
	result: { data: Record<string, any>[]; total: number };
	columns: Column[];
	containerStyle?: React.CSSProperties;
	onEdit?: (id: number[]) => void;
	onDelete?: (id: number[]) => void;
	onBlock?: (id: number[]) => void;
	onDeleteSelected?: () => void;
	onBlockSelected?: () => void;
	refreshData: (
		page?: number,
		limit?: number,
		order?: string,
		orderBy?: string
	) => void;
}

const SimpleTable: React.FC<Props> = ({
	result,
	columns,
	containerStyle,
	onEdit,
	onDelete,
	onBlock,
	onDeleteSelected,
	onBlockSelected,
	refreshData,
}) => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [selected, setSelected] = React.useState<number[]>([]);
	const [order, setOrder] = React.useState<"asc" | "desc">("asc");
	const [orderBy, setOrderBy] = React.useState<string>("");

	React.useEffect(() => {
		console.log("Data changed");
		console.log(result.data);
	}, [result]);

	const handleRequestSort = (property: string) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
		refreshData(page, rowsPerPage, order, orderBy); // use current page, rowsPerPage, order, and orderBy values
	};

	const handleSelectAllClick = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.checked) {
			const newSelecteds = result.data.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: number[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const isSelected = (id: number) => selected.indexOf(id) !== -1;

	const emptyRows =
		rowsPerPage -
		Math.min(rowsPerPage, result.total - (page - 1) * rowsPerPage);

	return (
		<Paper elevation={3} style={containerStyle}>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox
									indeterminate={
										selected.length > 0 &&
										selected.length < result.total
									}
									checked={selected.length === result.total}
									onChange={handleSelectAllClick}
								/>
							</TableCell>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									sortDirection={
										orderBy === column.id ? order : false
									}
								>
									<TableSortLabel
										active={orderBy === column.id}
										direction={
											orderBy === column.id
												? order
												: "asc"
										}
										onClick={() =>
											handleRequestSort(column.id)
										}
									>
										{column.label}
									</TableSortLabel>
								</TableCell>
							))}
							<TableCell>Actions</TableCell>
							<TableCell>
								<IconButton
									onClick={() =>
										onDeleteSelected && onDeleteSelected()
									}
									color="secondary"
								>
									<DeleteSweepIcon />
								</IconButton>
								<IconButton
									onClick={() =>
										onBlockSelected && onBlockSelected()
									}
									color="default"
								>
									<BlockOutlinedIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{result.data?.map((row, rowIndex) => {
								const isItemSelected = isSelected(row.id);
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={rowIndex}
										selected={isItemSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox
												checked={isItemSelected}
												onClick={(event) =>
													handleClick(event, row.id)
												}
											/>
										</TableCell>
										{columns.map((column) => (
											<TableCell
												key={column.id}
												align={
													column.numeric
														? "right"
														: "left"
												}
											>
												{column.id === "created_at" ||
												column.id === "updated_at" ||
												column.id === "last_login"
													? new Date(
															row[column.id]
													  ).toLocaleString()
													: row[column.id]}
											</TableCell>
										))}
										<TableCell>
											{onEdit && (
												<IconButton
													onClick={() =>
														onEdit([row.id])
													}
													color="primary"
												>
													<EditIcon />
												</IconButton>
											)}
											{onDelete && (
												<IconButton
													onClick={() =>
														onDelete([row.id])
													}
													color="secondary"
												>
													<DeleteIcon />
												</IconButton>
											)}
											{onBlock && (
												<IconButton
													onClick={() =>
														onBlock([row.id])
													}
													color="default"
												>
													<BlockIcon />
												</IconButton>
											)}
										</TableCell>
									</TableRow>
								);
							})}
						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={columns.length + 3} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25, 50]}
				component="div"
				count={result.total}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={(event, newPage) => {
					setPage(newPage);
					console.log(page, rowsPerPage);
					refreshData(newPage + 1, rowsPerPage, order, orderBy);
				}}
				onRowsPerPageChange={(event) => {
					const newRowsPerPage = parseInt(event.target.value, 10);
					setRowsPerPage(newRowsPerPage);
					setPage(0);
					refreshData(1, newRowsPerPage, order, orderBy);
				}}
			/>
		</Paper>
	);
};

export default SimpleTable;
