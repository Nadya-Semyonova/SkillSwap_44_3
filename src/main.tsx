import '@/shared/assets/fonts/fonts.css'; // шрифты
import '@/shared/assets/styles/variables.css'; // переменные CSS
import '@/shared/assets/styles/global.css'; // глобальные стили
import { StrictMode } from 'react'; // StrictMode - компонент для выявления проблем, возможен перерендеринг
import { createRoot } from 'react-dom/client'; // рендер
import { Provider } from 'react-redux';
import App from './app/App';
import store from './store/store';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found'); /* если нет элемента выдает ошибку */

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
