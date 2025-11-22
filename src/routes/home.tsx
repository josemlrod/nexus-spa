import { useEffect, useRef, useState } from "react";
import { type ActionFunctionArgs, useFetcher } from "react-router";
import { useQuery } from "convex/react";

import { convex } from "@/components/app-with-providers";
import { isSubmittingForm, tryCatch } from "@/lib/utils";
import { useShortcut } from "@/lib/use-shortcut";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { api } from "../../convex/_generated/api";
import { InputGroupAddon } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
/**
 * TODO:
 * deploy to Fly.io ✅
 * add Convex ✅
 * * save messages to Convex✅
 * render recently saved items in home below input
 * create screen to show all saved items
 * * add filtering options by date
 *
 * add an export tool to get all things done for a specific date range
 * * should format output
 *
 * */

export default function Home() {
  const fetcher = useFetcher();
  const items = useQuery(api.items.get);
  const formRef = useRef<HTMLFormElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [text, setText] = useState("");

  const isSubmitting = isSubmittingForm(fetcher.state);
  const isEmpty = !text.length;
  const disableSaveButton = isSubmitting || isEmpty;

  const submitForm = () => {
    fetcher.submit(JSON.stringify({ text }), {
      encType: "application/json",
      method: "POST",
    });

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  useEffect(() => {
    if (!isSubmitting) {
      textAreaRef.current?.focus();
    }
  }, [isSubmitting]);

  useShortcut("Enter", submitForm, {
    meta: true,
  });

  return (
    <section className="container m-auto flex h-dvh items-center">
      <div className="w-full flex gap-4 flex-col">
        <h1 className="text-4xl font-semibold">Nexus</h1>
        <fetcher.Form
          className="flex flex-col gap-2"
          method="post"
          onSubmit={() => {
            submitForm();
          }}
          ref={formRef}
        >
          <Textarea
            autoFocus
            className="resize-none min-h-40"
            placeholder="What have you done today?"
            name="text"
            ref={textAreaRef}
            onChange={(e) => {
              const val = e.currentTarget.value.trim();
              setText(val);
            }}
          />
          {/* <p className="text-muted-foreground text-sm"> */}
          {/*   💡: You can use markdown to format your text */}
          {/* </p> */}
          <Button
            className="self-end"
            type="submit"
            disabled={disableSaveButton}
          >
            Save
          </Button>
        </fetcher.Form>
      </div>
    </section>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const json = await request.json();
  const { text } = json;

  const { data, error } = await tryCatch(
    convex.mutation(api.items.createItem, {
      text,
    }),
  );

  console.log("data", data);
  console.log("error", error);

  return null;
}
