import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/config";
import { useParams } from "react-router-dom";
function UseGetData(collectionName) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLading] = useState(true);
  const collectionRef = collection(db, collectionName);
  useEffect(() => {
    // changeing data realTime use onSnapshot
    const getData = async () => {
      await onSnapshot(collectionRef, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLading(false);
      });
    };
    getData();
  }, []);
  return { data, loading ,id };
}

export default UseGetData;
