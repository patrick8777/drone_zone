export default function Footer({backgroundColor, footerMarginBottom}) {
    return (
        <footer className="z-1000 footer items-center p-4 text-neutral-content bg-transparent " style={{
            position: 'fixed',
            bottom: '0',
            height: '3rem',
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)',
            background: backgroundColor ? 'transparent' : 'black', // Add background prop here
            marginBottom: footerMarginBottom ? '0' : '0'

        }}>
            <aside className="items-center grid-flow-col">
                <p>Copyright © 2024 - All right reserved</p>
            </aside>
        </footer>
    )
}
