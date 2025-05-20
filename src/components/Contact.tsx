"use client";

import { useState } from "react";
import {
  Input,
  Label,
  Textarea,
  Dialog,
  DialogContent,
} from "@relume_io/relume-ui";
import Button, { BUTTON_VARIANTS } from "./input/Button";
import NavLink from "./input/NavLink";

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const mailto = `mailto:contact@deathscenela.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(message)}`;

  return (
    <div>
      {/* NavLink opens modal */}
      <NavLink onClick={() => setIsOpen(true)}>contact</NavLink>

      {/* Dialog component */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="fixed left-1/2 top-1/2 h-auto w-full max-w-[90%] lg:max-w-lg -translate-x-1/2 -translate-y-1/2 bg-dark text-light px-6 pt-10 pb-8 shadow-2xl shadow-black/80"
          overlayClassName="bg-black/90"
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold" style={{ fontFamily: "Inter" }}>
              CONTACT
            </h2>
          </div>
          <div className="grid gap-8">
            <div className="grid">
              <Label
                htmlFor="subject"
                className="mb-2"
                style={{ fontFamily: "Inter" }}
              >
                subject
              </Label>
              <Input
                id="subject"
                type="text"
                placeholder="Enter your subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-dark text-light border-gray rounded-xs text-sm"
                style={{ fontFamily: "Inter" }}
              />
            </div>
            <div className="grid">
              <Label
                htmlFor="message"
                className="mb-2"
                style={{ fontFamily: "Inter" }}
              >
                message
              </Label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-dark text-light border-gray rounded-xs text-sm"
                style={{ fontFamily: "Inter" }}
              />
            </div>
            <div className="mt-4 text-center">
              <a href={mailto}>
                <Button
                  variant={BUTTON_VARIANTS.LIGHT}
                  fontFamily="Inter"
                  className="w-full"
                >
                  send email
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
