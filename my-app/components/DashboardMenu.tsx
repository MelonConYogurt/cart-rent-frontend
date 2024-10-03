import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function DashboardMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Dashboard admin</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select a function</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="/form">Add cars</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/manage">Manage all cars</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/"></a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/"></a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DashboardMenu;
