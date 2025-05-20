import { Accordion, AccordionItem } from "@nextui-org/react";
import type { JSX, ReactNode } from "react";

interface FAQ {
  title: string;
  content: string;
}
const FAQS: FAQ[] = [
  {
    title: "Order #? / Order Confirmation?",
    content: `Remember to save your order number for your records at the time of checkout. 
Once your order has been placed, we will confirm receipt of your order to the email address provided at checkout. The order confirmation acts as an invoice and also includes your order number and all relevant details.

If you don't see the email please check your spam folder. If you didn't receive a confirmation email, it's possible that you entered the email address associated with the order entered incorrectly.

If you believe that you have entered your email address incorrectly, please contact our customer service team as soon as possible, and we'll be happy to help.`,
  },
  {
    title: "How long till I receive X?",
    content: `We will explicitly state almost all the time wether our drop is pre-made or ready to be shipped. Refer to product descriptions to verify.

Shipping Times do NOT account for time the package is in transit. Shipping & delivery dates on pre-order items are not guaranteed unless otherwise stated.
`,
  },
  {
    title: "Received wrong size/item?",
    content: `If you have received the wrong size or item please immediately contact our support team with your name, order number and photos of the incorrect item. The faster you reach out the faster we can take care of the issue.`,
  },
  {
    title: "Refunds / Exchanges?",
    content: `ALL SALES ARE FINAL AND ARE NOT ELIGIBLE FOR RETURN OR EXCHANGE.

If there is a defect or another issue with your order, reach out to our customer service team. Please be sure to include your full name, order number and photos of the issue so that we may better assist you. 

    `,
  },
  {
    title: "What's the sizing on X?",
    content: `Refer to our size chart on the product  to accurately see our sizes on specific products we sell.`,
  },
];

export default function FAQ({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        .text-light {
          text-shadow: 0px 0px 4px rgba(235, 235, 235, 0.5);
        }
      `}</style>

      <Accordion
        className="flex flex-col w-full py-[96px]"
        selectionMode="multiple"
        defaultExpandedKeys={["0"]}
        onClick={() => {
          window && window.dispatchEvent(new Event("resize"));
        }}
      >
        {FAQS.map((faq: FAQ, index: number) => (
          <AccordionItem
            className=" text-light gap-y-10"
            key={index}
            title={faq.title}
            aria-label={faq.title}
            classNames={{
              title: "text-light",
              content: "flex flex-col gap-y-2 mb-4",
            }}
            style={{
              fontFamily: "Inter",
            }}
          >
            {faq.content
              .split(/\r?\n|\r|\n/g)
              .map((line: string, index: number) => (
                <p
                  style={{
                    fontFamily: "Inter",
                  }}
                  key={index}
                >
                  {line}
                </p>
              ))}
          </AccordionItem>
        ))}
      </Accordion>
      {children}
    </>
  );
}
