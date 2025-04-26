import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Unauthorized() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-amber-600">
                        Unauthorized
                    </CardTitle>
                    <CardDescription>
                        You need to be logged in to access this page.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <div className="text-center">
                        <div className="mb-6 text-9xl font-bold text-gray-200">401</div>
                        <p className="text-gray-600">Please log in to continue.</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                    <Button asChild variant="outline">
                        <Link href="/">Return Home</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/login">Log In</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
