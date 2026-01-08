import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tailwind.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const container = document.getElementById('root');
if (!container) throw new Error('Root container missing');
createRoot(container).render(
		<>
			<App />
				{import.meta.env.PROD && (
					<>
						<Analytics />
						<SpeedInsights />
					</>
				)}
		</>
);
