import React, { useEffect, useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { db } from "../../firebase"; // Ensure correct path for Firestore import
import { collection, doc, setDoc } from "firebase/firestore";

const theme = createTheme();

export default function Form() {
  const textInput = useRef(null);
  const textInput2 = useRef(null);
  const textInput3 = useRef(null);
  const textInput4 = useRef(null);
  const textInput5 = useRef(null);
  const textInput6 = useRef(null);

  const [formData, setFormData] = useState({});
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [error, setError] = useState({});
  const [validation, setValidation] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (
      Object.keys(formData).length &&
      !validation &&
      amount !== "" &&
      account !== ""
    ) {
      const info2 = {
        ...formData,
        date: new Date().toLocaleString(),
        status: "successful",
        tid: Math.ceil(Math.random() * 111) * 1256525698,
      };

      // Firestore logic to save the data
      const transactionsRef = collection(db, "transactions");
      const transactionDoc = doc(transactionsRef, info2.tid.toString());
      
      setDoc(transactionDoc, info2)
        .then(() => {
          console.log("Transaction saved successfully:", info2);
          setShowAlert(true);

          // Clear input fields
          textInput.current.value = "";
          textInput2.current.value = "";
          textInput3.current.value = "";
          textInput4.current.value = "";
          textInput5.current.value = "";
          textInput6.current.value = "";
        })
        .catch((error) => {
          console.error("Error saving transaction:", error);
        });
    }
  }, [formData, validation, amount, account]);

  const handleSelectChange = (event) => {
    setPurpose(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidation(
      error.accountError ||
        error.amountError ||
        error.confAccountError ||
        error.confAmountError
    );

    const data = new FormData(event.currentTarget);
    const info = {
      amount: data.get("amount"),
      accNo: data.get("account"),
      name: data.get("name"),
      purpose: purpose,
    };
    setFormData(info);
  };

  const checkAmount = (event) => {
    if (isNaN(event.target.value)) {
      setError({
        ...error,
        amountError: true,
        amountErrorMsg: "Must be a number",
      });
    } else {
      setError({
        ...error,
        amountError: false,
        amountErrorMsg: "",
      });
      setAmount(event.target.value);
    }
  };

  const checkConfAmount = (event) => {
    if (event.target.value !== amount) {
      setError({
        ...error,
        confAmountError: true,
        confAmountErrorMsg: "Must be the same",
      });
    } else {
      setError({
        ...error,
        confAmountError: false,
        confAmountErrorMsg: "",
      });
    }
  };

  const checkAccount = (event) => {
    if (isNaN(event.target.value)) {
      setError({
        ...error,
        accountError: true,
        accountErrorMsg: "Enter a valid account number",
      });
    } else if (event.target.value.length <= 9) {
      setError({
        ...error,
        accountError: true,
        accountErrorMsg: "Must be greater than 10 digits",
      });
    } else {
      setError({
        ...error,
        accountError: false,
        accountErrorMsg: "",
      });
      setAccount(event.target.value);
    }
  };

  const checkConfAccount = (event) => {
    if (event.target.value !== account) {
      setError({
        ...error,
        confAccountError: true,
        confAccountErrorMsg: "Must be the same number",
      });
    } else {
      setError({
        ...error,
        confAccountError: false,
        confAccountErrorMsg: "",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#6c63ff" }}>
            <AccountBalanceIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Money Transfer
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="amount"
                  required
                  fullWidth
                  id="amount"
                  label="Amount"
                  autoFocus
                  inputRef={textInput}
                  onChange={checkAmount}
                  {...(error.amountError && {
                    error: true,
                    helperText: error.amountErrorMsg,
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="confAmount"
                  label="Confirm Amount"
                  inputRef={textInput2}
                  name="confAmount"
                  onChange={checkConfAmount}
                  {...(error.confAmountError && {
                    error: true,
                    helperText: error.confAmountErrorMsg,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="account"
                  label="Account Number"
                  name="account"
                  inputRef={textInput3}
                  onChange={checkAccount}
                  {...(error.accountError && {
                    error: true,
                    helperText: error.accountErrorMsg,
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confAccount"
                  label="Confirm Account"
                  inputRef={textInput4}
                  id="confAccount"
                  onChange={checkConfAccount}
                  {...(error.confAccountError && {
                    error: true,
                    helperText: error.confAccountErrorMsg,
                  })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="Full Name"
                  inputRef={textInput5}
                  id="name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="purpose">Purpose</InputLabel>
                  <Select
                    labelId="purpose"
                    id="select-purpose"
                    inputRef={textInput6}
                    value={purpose}
                    label="Purpose"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Deposit"}>Deposit</MenuItem>
                    <MenuItem value={"Payment"}>Payment</MenuItem>
                    <MenuItem value={"Gift"}>Gift</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Stack sx={{ width: "100%" }} spacing={2}>
              {showAlert && (
                <Alert severity="success">Transaction Successful!</Alert>
              )}
            </Stack>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}    
            >
              Submit Money
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
