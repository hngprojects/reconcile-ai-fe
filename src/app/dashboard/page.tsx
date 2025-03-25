import ProtectedRoute from "@/src/components/auth/ProtectedRoute";
import Container from "@/src/components/Container";
import { Dashboard } from "@/src/components/dashboard/Dashboard";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Container className="my-8">
        <Dashboard />
      </Container>
    </ProtectedRoute>
  );
}
