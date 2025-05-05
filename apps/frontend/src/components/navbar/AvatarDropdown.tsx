"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, Settings, User } from "lucide-react";
// import {useAuthStore} from "@/store/useAuthStore"
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";

export default function AvatarDropdown() {
  const router = useRouter();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  // console.log("Current User: ", session)
  if (isPending) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  if (!session) {
    return (
      <div className="flex space-x-2">
        {/*{user?.userEmail}*/}
        <Link href="/dang-nhap">
          <Button variant="ghost">Đăng nhập</Button>
        </Link>
        <Link href="/dang-ky">
          <Button>Đăng ký</Button>
        </Link>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session.user.image || "https://placehold.co/50"}
              alt={session.user.name}
            />
            <AvatarFallback>
              {session.user?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => router.push("/trang-ca-nhan")}>
            <User className="mr-2 h-4 w-4" />
            <span>Trang cá nhân</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push("/cai-dat")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Cài đặt</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push("/lich-su-mua-hang")}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Lịch sử mua hàng</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={async () =>
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/dang-nhap"); // redirect to login page
                },
              },
            })
          }
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
