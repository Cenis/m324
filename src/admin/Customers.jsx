import "./Customers.css";
import image from "../assets/connected.svg";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { db } from "../firebase"; // Firestore import
import { collection, onSnapshot, addDoc } from "firebase/firestore"; // Firestore-specific imports
import ProfileCard from "./ProfileCard";

const Customers = () => {
  const [data, setData] = useState([]); // Store customer data
  const [user, setUser] = useState(null); // Store selected user data
  const [form, setForm] = useState(true); // Toggle between table and profile card view
  
  // const addCustomers = async () => {
  //   const customers = [
  //     {
  //       fname: "John Doe",
  //       lname: "Doe",
  //       email: "john.doe@gmail.com",
  //       mobile: "1234567890",
  //       accNo: "12345678901",
  //       balance: 5000,
  //       addhar: "1234 5678 9012",
  //       address: "123 Elm St, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X123",
  //       gender: "Male",
  //       ifsc: "IFSC123456",
  //       nominee: "Jane Doe",
  //       pan: "ABCDE1234F",
  //       status: "Single",
  //       upi: "johndoe@upi",
  //     },
  //     {
  //       fname: "Jane Smith",
  //       lname: "Smith",
  //       email: "jane.smith@yahoo.com",
  //       mobile: "0987654321",
  //       accNo: "10987654321",
  //       balance: 6500,
  //       addhar: "2345 6789 0123",
  //       address: "456 Oak St, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X456",
  //       gender: "Female",
  //       ifsc: "IFSC654321",
  //       nominee: "John Smith",
  //       pan: "EFGHI5678J",
  //       status: "Married",
  //       upi: "janesmith@upi",
  //     },
  //     {
  //       fname: "Michael Brown",
  //       lname: "Brown",
  //       email: "michael.brown@outlook.com",
  //       mobile: "1231231234",
  //       accNo: "11223344556",
  //       balance: 7200,
  //       addhar: "3456 7890 1234",
  //       address: "789 Pine St, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X789",
  //       gender: "Male",
  //       ifsc: "IFSC789012",
  //       nominee: "Sarah Brown",
  //       pan: "JKLMB9876N",
  //       status: "Single",
  //       upi: "michaelbrown@upi",
  //     },
  //     {
  //       fname: "Emily Johnson",
  //       lname: "Johnson",
  //       email: "emily.johnson@gmail.com",
  //       mobile: "4321432143",
  //       accNo: "22334455667",
  //       balance: 8800,
  //       addhar: "4567 8901 2345",
  //       address: "101 Cedar St, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X101",
  //       gender: "Female",
  //       ifsc: "IFSC890123",
  //       nominee: "David Johnson",
  //       pan: "NOPQR5432V",
  //       status: "Married",
  //       upi: "emilyjohnson@upi",
  //     },
  //     {
  //       fname: "William White",
  //       lname: "White",
  //       email: "william.white@gmail.com",
  //       mobile: "3213213214",
  //       accNo: "33445566778",
  //       balance: 12000,
  //       addhar: "5678 9012 3456",
  //       address: "202 Birch St, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X202",
  //       gender: "Male",
  //       ifsc: "IFSC901234",
  //       nominee: "Ella White",
  //       pan: "STUVW4321X",
  //       status: "Single",
  //       upi: "williamwhite@upi",
  //     },
  //     {
  //       fname: "Olivia Green",
  //       lname: "Green",
  //       email: "olivia.green@gmail.com",
  //       mobile: "9879879876",
  //       accNo: "44556677889",
  //       balance: 9100,
  //       addhar: "6789 0123 4567",
  //       address: "303 Maple St, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X303",
  //       gender: "Female",
  //       ifsc: "IFSC012345",
  //       nominee: "Oliver Green",
  //       pan: "YXZVU1234A",
  //       status: "Single",
  //       upi: "oliviagreen@upi",
  //     },
  //     {
  //       fname: "James Wilson",
  //       lname: "Wilson",
  //       email: "james.wilson@hotmail.com",
  //       mobile: "8768768765",
  //       accNo: "55667788990",
  //       balance: 4500,
  //       addhar: "7890 1234 5678",
  //       address: "404 Chestnut St, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X404",
  //       gender: "Male",
  //       ifsc: "IFSC123678",
  //       nominee: "Anna Wilson",
  //       pan: "BCDHE6589K",
  //       status: "Single",
  //       upi: "jameswilson@upi",
  //     },
  //     {
  //       fname: "Sophia Lewis",
  //       lname: "Lewis",
  //       email: "sophia.lewis@outlook.com",
  //       mobile: "7657657654",
  //       accNo: "66778899001",
  //       balance: 5300,
  //       addhar: "8901 2345 6789",
  //       address: "505 Redwood St, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X505",
  //       gender: "Female",
  //       ifsc: "IFSC789654",
  //       nominee: "Samuel Lewis",
  //       pan: "EFGIH9012L",
  //       status: "Married",
  //       upi: "sophialewis@upi",
  //     },
  //     {
  //       fname: "Benjamin Lee",
  //       lname: "Lee",
  //       email: "benjamin.lee@gmail.com",
  //       mobile: "6546546543",
  //       accNo: "77889900112",
  //       balance: 15000,
  //       addhar: "9012 3456 7890",
  //       address: "606 Fir St, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X606",
  //       gender: "Male",
  //       ifsc: "IFSC456123",
  //       nominee: "Grace Lee",
  //       pan: "IJKMN1234P",
  //       status: "Married",
  //       upi: "benjaminlee@upi",
  //     },
  //     {
  //       fname: "Ava Martinez",
  //       lname: "Martinez",
  //       email: "ava.martinez@yahoo.com",
  //       mobile: "5435435432",
  //       accNo: "88990011223",
  //       balance: 9800,
  //       addhar: "0123 4567 8901",
  //       address: "707 Palm St, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X707",
  //       gender: "Female",
  //       ifsc: "IFSC654789",
  //       nominee: "Lucas Martinez",
  //       pan: "QRSTU5678D",
  //       status: "Single",
  //       upi: "avamartinez@upi",
  //     },
  //     // Add 10 more records here with the remaining details
  //     {
  //       fname: "Suman",
  //       lname: "Ghosh",
  //       email: "xyz@mail.com",
  //       mobile: "7896589632",
  //       accNo: "725068564589",
  //       balance: 859600,
  //       addhar: "5898 2589 6585",
  //       address: "X-colony, Howrah-711365",
  //       branchName: "Howrah",
  //       debitCard: "XXXX-XXXX-X598",
  //       gender: "Male",
  //       ifsc: "UBI00036589758",
  //       nominee: "NA",
  //       pan: "KITHKI3692K",
  //       status: "Single",
  //       upi: "589685ajhd@apl",
  //     },
  //     // Add remaining records following this pattern...
  //     {
  //       fname: "Lucas Davis",
  //       lname: "Davis",
  //       email: "lucas.davis@gmail.com",
  //       mobile: "9876543210",
  //       accNo: "99001122334",
  //       balance: 4700,
  //       addhar: "0123 4567 7890",
  //       address: "808 Oak Lane, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X808",
  //       gender: "Male",
  //       ifsc: "IFSC890765",
  //       nominee: "Liam Davis",
  //       pan: "ABCDE8765L",
  //       status: "Married",
  //       upi: "lucasdavis@upi",
  //     },
  //     {
  //       fname: "Emma Clark",
  //       lname: "Clark",
  //       email: "emma.clark@hotmail.com",
  //       mobile: "8765432109",
  //       accNo: "10020030040",
  //       balance: 8600,
  //       addhar: "3456 7890 1234",
  //       address: "909 Maple Drive, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X909",
  //       gender: "Female",
  //       ifsc: "IFSC876543",
  //       nominee: "Ethan Clark",
  //       pan: "FGHIJ9876O",
  //       status: "Single",
  //       upi: "emmaclark@upi",
  //     },
  //     {
  //       fname: "Daniel Walker",
  //       lname: "Walker",
  //       email: "daniel.walker@yahoo.com",
  //       mobile: "7654321098",
  //       accNo: "11022033044",
  //       balance: 13200,
  //       addhar: "5678 9012 3456",
  //       address: "1010 Cedar Ave, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X1010",
  //       gender: "Male",
  //       ifsc: "IFSC654321",
  //       nominee: "Sophia Walker",
  //       pan: "KLMNO6543P",
  //       status: "Single",
  //       upi: "danielwalker@upi",
  //     },
  //     {
  //       fname: "Isabella Harris",
  //       lname: "Harris",
  //       email: "isabella.harris@outlook.com",
  //       mobile: "6543210987",
  //       accNo: "12332112321",
  //       balance: 7200,
  //       addhar: "6789 0123 4567",
  //       address: "111 Pine Street, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X111",
  //       gender: "Female",
  //       ifsc: "IFSC432123",
  //       nominee: "Charlotte Harris",
  //       pan: "PQRST8765Q",
  //       status: "Married",
  //       upi: "isabellaharris@upi",
  //     },
  //     {
  //       fname: "Henry Roberts",
  //       lname: "Roberts",
  //       email: "henry.roberts@gmail.com",
  //       mobile: "5432109876",
  //       accNo: "11221133225",
  //       balance: 9400,
  //       addhar: "7890 1234 5678",
  //       address: "212 Elm Street, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X212",
  //       gender: "Male",
  //       ifsc: "IFSC543987",
  //       nominee: "Olivia Roberts",
  //       pan: "UVWXY1234Z",
  //       status: "Single",
  //       upi: "henryroberts@upi",
  //     },
  //     {
  //       fname: "Amelia Jackson",
  //       lname: "Jackson",
  //       email: "amelia.jackson@gmail.com",
  //       mobile: "4321098765",
  //       accNo: "22334455660",
  //       balance: 11600,
  //       addhar: "8901 2345 6789",
  //       address: "313 Birch Lane, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X313",
  //       gender: "Female",
  //       ifsc: "IFSC987123",
  //       nominee: "Jack Jackson",
  //       pan: "YXZTU8765A",
  //       status: "Married",
  //       upi: "ameliajackson@upi",
  //     },
  //     {
  //       fname: "Oliver Lewis",
  //       lname: "Lewis",
  //       email: "oliver.lewis@gmail.com",
  //       mobile: "3210987654",
  //       accNo: "33445566778",
  //       balance: 10500,
  //       addhar: "9012 3456 7890",
  //       address: "414 Redwood Avenue, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X414",
  //       gender: "Male",
  //       ifsc: "IFSC321876",
  //       nominee: "Emma Lewis",
  //       pan: "LMNOP1234B",
  //       status: "Single",
  //       upi: "oliverlewis@upi",
  //     },
  //     {
  //       fname: "Ava Baker",
  //       lname: "Baker",
  //       email: "ava.baker@yahoo.com",
  //       mobile: "2109876543",
  //       accNo: "44556677889",
  //       balance: 9900,
  //       addhar: "0123 4567 8901",
  //       address: "515 Oak Street, Springfield",
  //       branchName: "Springfield",
  //       debitCard: "XXXX-XXXX-X515",
  //       gender: "Female",
  //       ifsc: "IFSC987654",
  //       nominee: "Mia Baker",
  //       pan: "QRSTU2345C",
  //       status: "Married",
  //       upi: "avabaker@upi",
  //     },
  //   ];
  
  //   try {
  //     for (const customer of customers) {
  //       await addDoc(collection(db, "customers"), customer);
  //       console.log("Customer added:", customer);
  //     }
  //   } catch (e) {
  //     console.error("Error adding customer: ", e);
  //   }
  // };
  


  useEffect(() => {
    // addCustomers();
  
    // Create a reference to the "customers" collection in Firestore
    const customersRef = collection(db, "customers");

    // Set up a Firestore listener that updates in real-time
    const unsubscribe = onSnapshot(customersRef, (snapshot) => {
      const customersArray = snapshot.docs.map((doc) => ({
        id: doc.id, // Firestore document ID as a unique identifier
        ...doc.data(), // Spread the document data into the object
      }));
      setData(customersArray); // Update the state with the fetched data
    });

    // Cleanup Firestore listener on component unmount
    return () => unsubscribe();
  }, []);

  const goToProfile = (data) => {
    setUser(data); // Store selected customer data
    setForm(false); // Toggle to profile card view
  };

  // Define columns for DataGrid
  const columns = [
    { field: "fname", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1 },
    { field: "mobile", headerName: "Mobile Number", type: "number", flex: 1 },
    { field: "accNo", headerName: "Account No.", type: "number", flex: 1 },
    {
      field: "balance",
      headerName: "Available Balance",
      type: "number",
      flex: 1,
    },
  ];

  // Render the customer table or profile card based on form state
  if (form) {
    return (
      <div className="customers">
        <div className="customers__left" style={{ height: 400, width: "100%" }}>
          {/* Render customer table with Material-UI DataGrid */}
          <DataGrid
            rows={data} // Data from Firestore
            columns={columns} // Column definitions
            pageSize={4} // Number of rows per page
            rowsPerPageOptions={[]} // Disable page size selection
            onRowClick={(params) => goToProfile(params.row)} // Go to profile on row click
          />
        </div>
        <div className="customers__right">
          <img src={image} alt="Connected" />
        </div>
      </div>
    );
  } else {
    return (
      // Render the profile card component when a customer is selected
      <ProfileCard
        fname={user.fname}
        lname={user.lname}
        gender={user.gender}
        accNo={user.accNo}
        addhar={user.addhar}
        address={user.address}
        balance={user.balance}
        branchName={user.branchName}
        debitCard={user.debitCard}
        dob={user.dob}
        email={user.email}
        ifsc={user.ifsc}
        mobile={user.mobile}
        nominee={user.nominee}
        pan={user.pan}
        status={user.status}
        upi={user.upi}
      />
    );
  }
};

export default Customers;
