import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Layout({ children }) {
  return (
    <div style={{ width: '1900px', height: '800px', boxSizing: 'initial' }}>
      <Header />
      <div
        className="main-container"
        style={{
          flex: 1,
          width: '100%',
          padding: 24,
          boxSizing: 'border-box',
          backgroundColor: 'transparent',
          margin: 0,
          borderRadius: 0,
          paddingTop: 100,
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  )
}
