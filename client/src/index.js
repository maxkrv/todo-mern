import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IdContext } from "./context/idContext";
import { v5 } from "uuid";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

root.render(
	<>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<IdContext.Provider
					value={
						localStorage.getItem("id") ||
						localStorage.setItem("id", v5())
					}
				>
					<App />
				</IdContext.Provider>
			</ThemeProvider>
		</QueryClientProvider>
	</>
);
