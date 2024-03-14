import Form from "./components/Form";
import { Column, Content, Grid, Heading, Stack } from "@carbon/react";
import { TaskList } from "./components/TaskList";
import Modal from "./components/Modal";

function App() {
	return (
		<>
			<Content>
				<Grid>
					<Column
						sm={{
							span: 4,
							offset: 0
						}} md={{
							span: 6,
							offset: 1
						}} lg={{
							span: 10,
							offset: 3
						}}>
						<Stack gap={7}>
							<Heading >To do List</Heading>
							<Form />
							<TaskList />
						</Stack>
						<Modal />
					</Column>
				</Grid>
			</Content>
		</>
	)
}

export default App;
