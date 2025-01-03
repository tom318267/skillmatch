import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export interface Job {
  id: string;
  title: string;
  company: string;
  category: string;
  description: string;
  requirements: string[];
  salary: string;
  location: string;
}

export const fetchJobsByCategory = async (category: string): Promise<Job[]> => {
  const jobsRef = collection(db, "jobs");
  const q = query(jobsRef, where("category", "==", category.toLowerCase()));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Job[];
};
