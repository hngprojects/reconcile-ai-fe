export async function reconcileFiles(
  file1: File,
  file2: File,
  keyColumn: string
) {
  const formData = new FormData();
  formData.append("file1", file1);
  formData.append("file2", file2);
  formData.append("key_column", keyColumn);

  console.log("Sending files for reconciliation:", {
    file1: file1.name,
    file2: file2.name,
    keyColumn,
  });

  try {
    const response = await fetch(
      "https://api-dev.reconxi.com/api/v1/reconcile",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log("Raw API Response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Reconciliation failed");
    }

    return data;
  } catch (error) {
    console.error("Reconciliation error:", error);
    throw error;
  }
}
