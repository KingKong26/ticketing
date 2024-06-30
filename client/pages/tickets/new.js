import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";
// form
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: { title, price },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = (event) => {
    event.preventDefault();
    doRequest();
  };

  const onBlur = (event) => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };

  return (
    <form onSubmit={onSubmit} className="flex justify-center items-center h-full">
      <Card className="mx-auto max-w-sm flex-1">
        <CardHeader>
          <CardTitle className="text-2xl">Create Ticket</CardTitle>
          <CardDescription>Enter your ticket details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Ticket Title"
                required
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="price">Price</Label>
              </div>
              <Input
                id="price"
                type="price"
                placeholder="Ticket Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Enter
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default NewTicket;
