import { createRoot } from 'react-dom/client';

import Counter from './Counter';
import './global.css';

const root = createRoot(document.querySelector('#app')!);
root.render(<Counter />);
