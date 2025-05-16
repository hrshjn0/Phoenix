import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function BuyersFAQ() {
  const faqs = [
    {
      question: "How are products vetted before listing?",
      answer: "All products undergo a thorough verification process. We validate financial information, customer metrics, and technical infrastructure before any listing appears on our marketplace."
    },
    {
      question: "What kind of information will I receive about each product?",
      answer: "Product listings include detailed financial metrics (ARR, MRR, profit margins), customer data (total users, active users, churn rate), technical stack information, and growth history. After expressing interest, you'll have access to even more detailed information."
    },
    {
      question: "How do I contact a product owner?",
      answer: "When you find a product you're interested in, simply click the \"Express Interest\" button on the product detail page. This will initiate a secure communication channel with the product owner through our platform."
    },
    {
      question: "Does Phoenix facilitate the actual transaction?",
      answer: "Phoenix provides the platform for discovery and initial communication. We can provide guidance on transaction processes, but the final deal terms and payment arrangements are made directly between buyers and sellers. We do offer escrow services for additional security."
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-dark sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-500">Everything you need to know about investing in digital products through Phoenix.</p>
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
