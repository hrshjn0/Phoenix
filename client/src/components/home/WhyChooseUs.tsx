export default function WhyChooseUs() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-dark sm:text-4xl">Why Choose Phoenix</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Our simple 3-step process connects quality digital products with the right investors, creating value for everyone involved.</p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6 flex flex-col h-full">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 flex-grow">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-dark tracking-tight">Apply</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Fill out our comprehensive questionnaire about your product and business to create a compelling listing that attracts the right investors.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col h-full">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 flex-grow">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gray-700 rounded-md shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-dark tracking-tight">Get Verified and Noticed</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Our team validates your information and optimizes your listing to highlight key selling points that resonate with potential investors.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col h-full">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 flex-grow">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gray-700 rounded-md shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-dark tracking-tight">Secure Investor Interest</h3>
                  <p className="mt-5 text-base text-gray-500">
                    Receive inquiries from qualified investors, communicate directly, and negotiate favorable terms through our secure platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
