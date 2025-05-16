import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SellersFAQ() {
  const faqs = [
    {
      question: "What types of digital products can I sell?",
      answer: "Phoenix specializes in established digital products including SaaS applications, content websites, e-commerce stores, mobile apps, and other digital businesses with proven revenue models."
    },
    {
      question: "How much can I expect to sell my product for?",
      answer: "Valuations vary widely based on factors like revenue, growth rate, profit margins, customer base, and industry. Digital products typically sell for 2-4x annual revenue, but our marketplace often achieves premium valuations due to our qualified buyer network."
    },
    {
      question: "How long does the selling process take?",
      answer: "The timeframe varies depending on your product's complexity and market demand. Typically, the process from listing to closing takes 2-4 months. Well-documented products with clean financials and strong metrics tend to sell faster."
    },
    {
      question: "Is my product information kept confidential?",
      answer: "Absolutely. We understand the sensitivity of your business information. Your public listing will only contain high-level details, while specific information like company name, exact financials, and customer data is only shared with serious buyers who have signed NDAs."
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-dark sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-500">Everything you need to know about selling your digital product through Phoenix.</p>
        </div>

        <div className="mt-12">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-gray-50 rounded-lg">
                <AccordionTrigger className="text-left px-4 py-3 text-lg font-medium text-dark">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-base text-gray-500">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
