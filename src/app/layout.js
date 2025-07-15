import '../../styles/globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import './global.css';   

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ColorStack UTA',
  description: 'ColorStack UTA Website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

