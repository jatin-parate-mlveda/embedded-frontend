import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useJwtContext } from "../JwtContext";

export default function ShopJsonPreview() {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const jwt = useJwtContext();

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_HOST + "/shops", {
        headers: {
          authorization: jwt,
        },
      })
      .then((res) => {
        setShop(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [jwt]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <pre>{JSON.stringify(shop, null, 2)}</pre>;
}
