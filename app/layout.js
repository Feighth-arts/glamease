import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import { AuthProvider } from './context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Glamease - Beauty Services Marketplace',
  description: 'Find and book beauty services from trusted providers in your area',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
