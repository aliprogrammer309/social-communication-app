import "./admin.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, auth, app } from "../../firebase";
import { Link } from "react-router-dom";
import { deleteUser, getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";

const Admin = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setRows(list);
        console.log(rows);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    // LISTEN (REALTIME)
    // const unsub = onSnapshot(
    //   collection(db, "competition"),
    //   (snapShot) => {
    //     let list = [];
    //     snapShot.docs.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    // return () => {
    //   unsub();
    // };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setRows(rows.filter((user) => user.id !== id));
    } catch (err) {
      console.log(err);
    }

    // console.log(id);
    // deleteUser(id).then(() => {
    //   alert("user deleted!");
    // }).catch((error) => {
    //   alert(error);
    // });
  };
  return (
    <>
      <h1>Welcome Admin!</h1>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Email</TableCell>
              <TableCell className="tableCell">Age</TableCell>
              <TableCell className="tableCell">Gender</TableCell>
              <TableCell className="tableCell">Action</TableCell>
              {/* <TableCell className="tableCell">Amount</TableCell> */}
              {/* <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {/* <TableCell className="tableCell">{row.id}</TableCell> */}
                <TableCell className="tableCell">
                  <Link
                    to="/UserProfile"
                    state={{
                      obj: row,
                      // name: row.displayName,
                      // eventID: event.id
                    }}
                  >
                    <div className="cellWrapper">
                      <img src={row.photoURL} alt="" className="image" />
                      {row.displayName}
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="tableCell">{row.email}</TableCell>
                <TableCell className="tableCell">{row.age}</TableCell>
                <TableCell className="tableCell">{row.gender}</TableCell>
                <TableCell className="tableCell">
                  <Link
                    style={{ marginRight: "10px" }}
                    to="/UserProfile"
                    state={{
                      obj: row,
                      // name: row.displayName,
                      // eventID: event.id
                    }}
                  >
                    <Button variant="outlined" size="small">
                      view
                    </Button>
                  </Link>

                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
                {/* <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Admin;
