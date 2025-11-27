// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import './index.scss';
import { App } from '@components';
import { store } from '@store';

createRoot(document.getElementById('root')!).render(
	// <StrictMode>
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
	// </StrictMode>
);
