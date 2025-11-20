import { Form, type ActionFunctionArgs } from "react-router";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

/**
 * TODO:
 * deploy to Fly.io
 * add Convex
 * * save messages to Convex
 * render recently saved items in home below input
 * create screen to show all saved items
 * * add filtering options by date
 * */

export default function Home() {
  return (
    <main className="container m-auto flex h-dvh items-center">
      <div className="w-full flex gap-4 flex-col">
        <h1 className="text-4xl font-semibold">Nexus</h1>
        <Form className="flex flex-col gap-2" method="POST">
          <Textarea
            autoFocus
            className="resize-none min-h-40"
            placeholder="What have you done today?"
            name="text"
          />
          <Button className="self-end" type="submit">
            Save
          </Button>
        </Form>
      </div>
    </main>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("in action");

  const formData = await request.formData();
  const { text } = Object.fromEntries(formData);

  console.log("text", text);
  return null;
}
