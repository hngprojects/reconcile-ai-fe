export async function reconcileFiles(
  file1: File,
  file2: File,
  keyColumn: string
) {
  const formData = new FormData();
  formData.append("file1", file1);
  formData.append("file2", file2);
  formData.append("key_column", keyColumn);

  try {
    const response = await fetch(
      "https://api-dev.reconxi.com/api/v1/reconcile",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Reconciliation failed");
    }

    const data = await response.json();
    console.log("Reconciliation response:", data);
    return data;
  } catch (error) {
    console.error("Reconciliation error:", error);
    throw error;
  }
}
