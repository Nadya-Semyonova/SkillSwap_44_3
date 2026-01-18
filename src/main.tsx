import { StrictMode } from 'react'; // StrictMode - компонент для выявления проблем, возможен перерендеринг
import { createRoot } from 'react-dom/client'; // рендер
import './shared/fonts/fonts.css';
import './shared/assets/styles/variables.css';
import './shared/assets/styles/global.css';
import App from './app/App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found'); /* если нет элемента выдает ошибку */

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
