function Footer() {
  return (
    <footer style={{
      background: "#1e1b4b",
      color: "#94a3b8",
      textAlign: "center",
      padding: "25px 10px",
      marginTop: "50px",
      borderTop: "1px solid rgba(255,255,255,0.1)"
    }}>
      <p style={{ color: "white", fontWeight: "bold", marginBottom: "8px" }}>
        📱 Mobile Store App — React & Redux Toolkit
      </p>
      <p style={{ fontSize: "14px" }}>
        Built with React Router, JSON-Server Auth, and Redux State Management.
      </p>
    </footer>
  );
}

export default Footer;