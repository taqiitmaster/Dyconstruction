import { createRoot } from 'react-dom/client'
// Fonts are self-hosted (npm @fontsource), so they load with no third-party
// request and are inlined into the single-file demo build.
import '@fontsource-variable/sora'
import '@fontsource-variable/figtree'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(<App />)
