export default function Home() {
  return (
    <main style={{ background: "#0b1120", minHeight: "100vh", color: "white" }}>
      
      {/* Header */}
      <header style={{
        display: "flex",
        alignItems: "center",
        padding: "0 120px",
        height: "80px"
      }}>
        <div style={{
          flex: 1,
          display: "flex",
          gap: "40px",
          alignItems: "center"
        }}>
          <div style={{ fontWeight: "bold" }}>MEZON</div>
          <nav style={{ display: "flex", gap: "32px" }}>
            <a>Home</a>
            <a>Courses</a>
            <a>Tutors</a>
            <a>About</a>
            <a>Contact</a>
          </nav>
        </div>
        <button style={{
          padding: "10px 20px",
          border: "1px solid white",
          background: "transparent",
          color: "white",
          borderRadius: "6px"
        }}>
          Login
        </button>
      </header>

      {/* Hero */}
      <section style={{
        display: "flex",
        alignItems: "center",
        padding: "100px 120px"
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
            Find the Best Tutors Online
          </h1>
          <p style={{ fontSize: "18px", marginBottom: "30px", maxWidth: "500px" }}>
            Connect with expert tutors anytime, anywhere.
            Learn smarter and achieve your goals faster.
          </p>
          <button style={{
            padding: "14px 32px",
            background: "#2563eb",
            border: "none",
            color: "white",
            borderRadius: "8px"
          }}>
            Get Started
          </button>
        </div>

        <img
          src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg"
          alt="Tutor"
          style={{ width: "500px",
    height: "auto",
    borderRadius: "12px" }}
        />
      </section>

    </main>
  );
}