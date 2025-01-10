import "./Transaction.css";
import { useState, useEffect } from "react";
import image from "../assets/backup.svg";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { jsPDF } from "jspdf";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment, IconButton } from "@mui/material";

const Transaction = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const transactionRef = collection(db, "transactions");
    const unsubscribe = onSnapshot(transactionRef, (snapshot) => {
      const transactionArray = snapshot.docs.map((doc) => ({
        tid: doc.id,
        ...doc.data(),
      }));
      setData(transactionArray);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredData = data.filter((item) =>
    [item.name, item.accNo, item.purpose]
      .some(field => field?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction History", 10, 10);

    let yPos = 20;

    if (filteredData.length === 0) {
      doc.text("No transactions found for the given search query.", 10, yPos);
    } else {
      filteredData.forEach((item, index) => {
        doc.text(
          `${index + 1}. ${item.name} | ${item.accNo} | ${item.amount} | ${item.purpose} | ${item.status}`,
          10,
          yPos
        );
        yPos += 10;
      });
    }

    doc.save("transaction_history.pdf");
  };

  const columns = [
    { field: "tid", headerName: "Transaction Id", width: 150 },
    { field: "name", headerName: "Full Name", width: 200 },
    { field: "accNo", headerName: "Account No.", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "purpose", headerName: "Purpose", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  return (
    <div className="transaction">
      <div className="left">
        <img src={image} alt="Transaction Backup" className="transaction-image" />
      </div>

      <div className="right">
        <div className="top-bar">
          <TextField
            variant="standard"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />

          <IconButton
            color="primary"
            aria-label="download PDF"
            onClick={handleDownloadPDF}
            className="download-btn"
            disabled={filteredData.length === 0}
          >
            <DownloadIcon />
          </IconButton>
        </div>

        <div className="table-container">
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            loading={loading}
            disableSelectionOnClick
            className="table"
            getRowId={(row) => row.tid}
            autoHeight
          />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
