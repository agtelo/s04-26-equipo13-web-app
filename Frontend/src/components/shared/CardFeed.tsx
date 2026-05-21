"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquareText, ThumbsUpIcon } from "lucide-react";

export const CardFeed = () => {
  const user = "Alberto Luis";
  return (
    <Card className="border-none shadow-2xl rounded-[32px] mt-10 ml-10 p-8">
      <CardHeader>
        <CardAction className="bg-muted py-3 px-7 rounded-md flex items-center justify-center">
          POST
        </CardAction>
        <CardTitle className="flex items-center  gap-4">
          <div className="w-10 h-10 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground">
            {user
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p>{user}</p>
            <p className="uppercase text-muted-foreground font-bold tracking-wide text-xs">
              Internal feed
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="leading-6">
          Had an amazing session today about Cloud Infrastructure. Thanks
          everyone for joining and sharing your setups! Had an amazing session
          today about Cloud Infrastructure. Thanks everyone for joining and
          sharing your setups!
        </p>
      </CardContent>
      <CardFooter className="bg-transparent border-none pb-8 flex f gap-4 items-center">
        <div className="text-muted-foreground flex items-center gap-2">
          <ThumbsUpIcon size={15} />
          <span>28</span>
        </div>
        <div className="text-muted-foreground flex items-center gap-2">
          <MessageSquareText size={15} />
          <span>28</span>
        </div>
      </CardFooter>
    </Card>
  );
};
