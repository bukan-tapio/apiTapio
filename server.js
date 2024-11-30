import express from "express";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config.js";

const app = express();
const port = 3000;
const dataCollection = collection(db, "users");

// diambil dari dokumen offline / local
// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }

app.get("/", (req, res) => {
  res.send("hallo dunia");
});

// diambil dari database firestore
app.get("/todos", async (req, res) => {
  try {
    const dataCollection_ref = dataCollection;
    const lokerSnapShot = await getDocs(dataCollection_ref);
    const getLoker = lokerSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({
      message: "berhasil",
    });
  } catch (e) {
    console.log("Error getting cached document:", e);
  }
});

app.listen(port, () => {
  console.log(`port : ${port}`);
});
