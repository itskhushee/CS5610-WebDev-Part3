// client/src/pages/GetItems.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const BASE_CURRENCY = "USD";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GetItems = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getItems = async () => {
    try {
      const response = await fetch("/items", { credentials: "include" });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Error fetching data");
      } else {
        const list = Array.isArray(data.transactions)
          ? data.transactions
          : Array.isArray(data)
          ? data
          : [];
        setTransactions(list);
      }
    } catch (err) {
      console.error("GetItems error:", err);
      setError("Error fetching data");
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch("/categories", { credentials: "include" });
      const data = await response.json();
      if (response.ok) setCategories(data);
      else setError("Error fetching categories");
    } catch (err) {
      console.error("GetCategories error:", err);
      setError("Error fetching categories");
    }
  };

  const fetchExchangeRates = async () => {
    try {
      const apiKey = process.env.EXCHANGE_RATE_API_KEY;
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${BASE_CURRENCY}?apiKey=${apiKey}`
      );
      const data = await response.json();
      if (response.ok) {
        setExchangeRates(data.rates);
      } else {
        setError("Error fetching exchange rates");
      }
    } catch (err) {
      console.error("Error fetching exchange rates:", err);
      setError("Error fetching exchange rates");
    } finally {
      setLoading(false);
    }
  };

  // Fetch rates, items, and categories once on mount
  useEffect(() => {
    fetchExchangeRates();
    getItems();
    getCategories();
  }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleAddTransactionClick = () => {
    navigate("/add-items");
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) navigate("/login");
      else console.error("Logout failed");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const response = await fetch(`/delete-items/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Error deleting transaction");
        return;
      }
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    } catch (err) {
      setError("Error deleting transaction");
    }
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : "Unknown Category";
  };

  const calculateSpendingData = () => {
    const categorySpending = {};
    let totalSpending = 0;
    transactions.forEach((tx) => {
      const rate = exchangeRates[selectedCurrency] || 1;
      const converted = tx.amount * rate;
      totalSpending += converted;
      const name = getCategoryName(tx.categoryId);
      categorySpending[name] = (categorySpending[name] || 0) + converted;
    });
    return { totalSpending, categorySpending };
  };

  const { totalSpending, categorySpending } = calculateSpendingData();

  const chartData = {
    labels: Object.keys(categorySpending),
    datasets: [
      {
        label: `Spending by Category (${selectedCurrency})`,
        data: Object.values(categorySpending),
        backgroundColor: ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99", "#ffb3e6"],
      },
    ],
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

      <header style={styles.header}>
        <h1 style={styles.heading}>Your Transactions,</h1>
        <button style={styles.button} onClick={handleAddTransactionClick}>
          + Add Transaction
        </button>
        <select
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          style={styles.currencySelector}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
      </header>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.content}>
        <div style={styles.cardContainer}>
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <div key={tx.id} style={styles.card}>
                <div style={styles.cardRow}>
                  <p>
                    <strong>Amount:</strong>{" "}
                    {loading
                      ? "Loading..."
                      : `${selectedCurrency} ${(
                          tx.amount *
                          (exchangeRates[selectedCurrency] || 1)
                        ).toFixed(2)}`}
                  </p>
                  <p>
                    <strong>Note:</strong> {tx.note}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Category:</strong>{" "}
                    {getCategoryName(tx.categoryId)}
                  </p>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDeleteTransaction(tx.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noData}>No transactions available</div>
          )}
        </div>

        <div style={styles.chartContainer}>
          <h2>
            Total Spending:{" "}
            {loading
              ? "Loading..."
              : `${selectedCurrency} ${totalSpending.toFixed(2)}`}
          </h2>
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Segoe UI', sans-serif",
    background: "linear-gradient(135deg, #0062cc 0%, #007bff 100%)",
    minHeight: "100vh",
    paddingTop: "80px",
  },
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 5%",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
    zIndex: 1000,
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#007bff",
    textDecoration: "none",
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0 5%",
    marginBottom: "1rem",
  },
  heading: {
    fontSize: "2rem",
    color: "white",
    margin: 0,
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#0056b3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    marginLeft: "auto",
  },
  currencySelector: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  error: {
    color: "salmon",
    padding: "0 5%",
    marginBottom: "1rem",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "0 5%",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "20px",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  cardRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  noData: {
    color: "white",
    textAlign: "center",
    padding: "2rem 0",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 5%",
  },
  chartContainer: {
    width: "40%",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#d9534f',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
};

export default GetItems;
