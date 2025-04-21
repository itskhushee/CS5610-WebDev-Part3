// client/src/pages/AddTransaction/AddTransaction.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
        const fetchCategories = async () => {
          try {
            const res = await fetch("/categories", { credentials: "include" });
            const data = await res.json();
            if (res.ok) setCategories(data);
            else console.error("Failed to load categories");
          } catch (err) {
            console.error(err);
          }
        };
        fetchCategories();
      }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/add-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
          amount, 
          note,
          categoryId: parseInt(category), }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Error adding transaction");
        return;
      }
      navigate("/items");
    } catch {
      setError("Error adding transaction");
    }
  };

  const handleLogout = async () => {
    await fetch("/logout", { method: "POST", credentials: "include" });
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
      FinTrack
    </Link>
        <button style={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div style={styles.heroSection}>
        <h2 style={styles.heading}>Add Transaction</h2>
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Segoe UI', sans-serif",
    background: 'linear-gradient(135deg, #0062cc 0%, #007bff 100%)',
    minHeight: '100vh',
    paddingTop: '80px',   // push content below fixed navbar
  },
  navbar: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 5%',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    zIndex: 1000,
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#007bff',
    textDecoration: 'none',
  },
  heroSection: {
    marginTop: '70px',
    padding: '4rem 5%',  /* Reduced padding for a smaller hero section */
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #0062cc 0%, #007bff 100%)',
    color: 'white',
    minHeight: '40vh',    /* Reduced minimum height */
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 5%',
    marginBottom: '1rem',
  },
  heading: {
    fontSize: '2rem',
    color: 'white',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  input: {
    margin: '10px',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '100%',
    maxWidth: '300px',
    fontSize: '1rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  select: {
    padding: '10px',
    height: '40px',  /* Adjust based on your input height */
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width:' 100%',
    maxWidth: '300px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0056b3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  error: {
    color: 'salmon',
    padding: '0 5%',
    marginBottom: '1rem',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '0 5%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '20px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  noData: {
    color: 'white',
    textAlign: 'center',
    padding: '2rem 0',
  },
};

export default AddTransaction;
