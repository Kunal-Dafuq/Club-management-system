import { useEffect, useState } from "react";
import { getDashboardData } from "../../../services/dashboardService";

export const useDashboard = () => {
  const [data,setData]=useState({});
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);

  useEffect(()=>{
    const fetchData = async()=>{

      try{
        const response = await getDashboardData();
        setData(response);
      }

      catch(err){
        setError(err);
      }

      finally{
        setLoading(false);
      }
    };

    fetchData();

  },[]);

  return {
    data,
    loading,
    error
  };
};