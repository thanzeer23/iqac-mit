import React, { useState } from "react";
import Loading from "./loading/Loading";

const Test = () => {
  const [loading, setLoading] = useState(true);
  return loading && <Loading />;
};

export default Test;
