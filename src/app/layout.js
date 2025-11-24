import './globals.css'

export const metadata = {
    title: 'Swinder - Find Your Padel Partner',
    description: 'Match with Padel players in UAE',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
