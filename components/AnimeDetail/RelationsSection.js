import React, { useState } from "react";
import ThemedText from "../shared/ThemedText";

export default function RelationsSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [relationsData, setRelationsData] = useState([]);
  const [error, setError] = useState(null);

  return <ThemedText></ThemedText>;
}
