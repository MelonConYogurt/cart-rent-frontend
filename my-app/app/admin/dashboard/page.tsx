import {redirect} from "next/navigation";
import {checkRole} from "@/utils/roles";
import {SearchUsers} from "./_search-users";
import {clerkClient} from "@clerk/nextjs/server";
import {setRole} from "./_actions";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: {search?: string};
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = searchParams.search;
  const users = query
    ? (await clerkClient().users.getUserList({query})).data
    : [];

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page is restricted to users with the 'admin' role.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Search Users</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchUsers />
        </CardContent>
      </Card>

      {users.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">User List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Current Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>
                      {
                        user.emailAddresses.find(
                          (email) => email.id === user.primaryEmailAddressId
                        )?.emailAddress
                      }
                    </TableCell>
                    <TableCell>{user.publicMetadata.role as string}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <form action={setRole}>
                          <input type="hidden" value={user.id} name="id" />
                          <input type="hidden" value="admin" name="role" />
                          <Button type="submit" variant="outline" size="sm">
                            Make Admin
                          </Button>
                        </form>
                        <form action={setRole}>
                          <input type="hidden" value={user.id} name="id" />
                          <input type="hidden" value="moderator" name="role" />
                          <Button type="submit" variant="outline" size="sm">
                            Make Moderator
                          </Button>
                        </form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
