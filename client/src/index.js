import { createRoot } from 'react-dom/client';

// third party
import { Provider } from 'react-redux';

// project imports
import App from 'App';
import { store } from 'store';

// style + assets
import 'assets/scss/style.scss';
import { UserContextProvider } from 'contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
	<Provider store={store}>
		<BrowserRouter>
		<UserContextProvider>
			<App />
		</UserContextProvider>
		</BrowserRouter>
	</Provider>
);

