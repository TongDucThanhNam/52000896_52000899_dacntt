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

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">
                        404 - Page Not Found
                    </CardTitle>
                    <CardDescription>
                        The page you are looking for doesnt exist or has been moved.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <div className="text-center">
                        <div className="mb-6 text-9xl font-bold text-gray-200">404</div>
                        <p className="text-gray-600">
                            We couldnt find the page you were looking for.
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button asChild>
                        <Link href="/">Return Home</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
