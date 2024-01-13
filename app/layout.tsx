import { ThemeProvider } from '@/components/provider/Theme-Provider';
import ConvexClientProvider from '@/components/provider/convex-provider';
import { ModalProvider } from '@/components/provider/modal-provider';
import { EdgeStoreProvider } from '@/lib/edgestore';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Notion Clone by Israk',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<EdgeStoreProvider>
						<ConvexClientProvider>
							<Toaster position='top-center' />
							<ModalProvider />
							{children}
						</ConvexClientProvider>
					</EdgeStoreProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
