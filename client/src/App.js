import React, { useContext } from "react";
import {
	Box,
	Button,
	Checkbox,
	IconButton,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TodoService from "./services/todo.service";
import { IdContext } from "./context/idContext";
import DeleteIcon from "@mui/icons-material/Delete";

const App = () => {
	const queryClient = useQueryClient();

	const [value, setValue] = React.useState("");
	const sub_id = useContext(IdContext);

	const { data, isLoading } = useQuery({
		queryKey: ["test"],
		queryFn: () => TodoService.getTodos(sub_id),
	});
	const createTodo = useMutation({
		mutationKey: ["createTodo"],
		mutationFn: () =>
			TodoService.createTodo({
				sub_id,
				title: value,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["test"] });
			console.log("success");
		},
	});
	const updateTodo = useMutation({
		mutationKey: ["updateTodo"],
		mutationFn: ({ id, completed, title }) =>
			TodoService.updateTodo({
				id,
				completed,
				title,
				sub_id,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["test"] });
		},
	});
	const deleteTodo = useMutation({
		mutationKey: ["deleteTodo"],
		mutationFn: (id) => TodoService.deleteTodoById(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["test"] });
		},
	});

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Typography component="h1" align="center" sx={{ mt: 4 }}>
				MERN-todos
			</Typography>
			<div style={{ maxWidth: "500px" }}>
				<Box
					sx={{
						mt: 4,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: "10px",
					}}
				>
					<TextField
						placeholder="Add todo"
						variant="outlined"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					<Button
						variant="contained"
						onClick={() => {
							if (value) createTodo.mutate();
						}}
					>
						Submit
					</Button>
				</Box>

				<div
					style={{
						marginTop: "20px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						gap: "10px",
					}}
				>
					{data?.map((item) => (
						<Paper
							key={item._id}
							style={{
								display: "flex",
								alignItems: "center",
								width: "100%",
								padding: "0 10px",
							}}
						>
							<div>{item.title}</div>
							<Checkbox
								style={{ marginLeft: "auto" }}
								checked={item.completed}
								onClick={() =>
									updateTodo.mutate({
										id: item._id,
										completed: !item.completed,
										title: item.title,
									})
								}
							/>
							<IconButton
								onClick={() => deleteTodo.mutate(item._id)}
							>
								<DeleteIcon />
							</IconButton>
						</Paper>
					))}
				</div>
			</div>
		</div>
	);
};

export default App;
