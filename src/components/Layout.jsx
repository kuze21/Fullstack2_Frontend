import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import "./Layout.css"

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="main-container">
        {children}
      </main>
      <Footer />
    </div>
  )
}
