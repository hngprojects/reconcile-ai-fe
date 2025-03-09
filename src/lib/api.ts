import { RECONCILE_API_URL, WAITLIST_API_URL } from "./apiEndpoints";

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
    const response = await fetch(RECONCILE_API_URL, {
      method: "POST",
      body: formData,
    });

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

// Waitlist API
export async function handleAddToWaitlist(email: string): Promise<{
  success?: string;
  error?: string;
}> {
  try {
    const response = await fetch(WAITLIST_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Failed to add to waitlist" };
    }

    return { success: data.message };
  } catch (error) {
    console.error(`Waitlist error for email ${email}:`, error);
    return { error: "Something went wrong. Please try again later." };
  }
}
