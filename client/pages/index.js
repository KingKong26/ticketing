import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LandingPage = ({ tickets }) => {
  return (
    <div className="items-center m-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Title</TableHead>
            <TableHead>Link</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.title}</TableCell>
              <TableCell>
                <Link href={"/tickets/[ticketId]"} as={`/tickets/${ticket.id}`} className="text-blue-600 cursor-pointer hover:underline">
                  View
                </Link>
              </TableCell>
              <TableCell className="text-right">{ticket.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/tickets");
  return { tickets: data };
};

export default LandingPage;
