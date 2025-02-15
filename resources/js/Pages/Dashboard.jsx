import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight ">
                    Dashboard
                </h2>
            }
        >
            <Head title="You're logged in!" />

            <div className="dashboard-item">
                <div>
                    <div className="p-6">You're logged in!</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
