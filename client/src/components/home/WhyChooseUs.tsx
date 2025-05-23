export default function WhyChooseUs() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-dark sm:text-4xl">Find an investor for your Tech Product in 3 easy steps</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Our simple process connects quality digital products with the right investors, creating value for everyone involved.</p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Process Steps */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Step 1 */}
              <div className="pt-6 flex flex-col h-full relative z-10">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 flex-grow">
                  <div className="-mt-6">
                    <div className="relative">
                      <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                        <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">1</span>
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
                {/* Arrow - visible only on large screens */}
                <div className="hidden lg:block absolute -right-4 top-1/3 transform rotate-0 z-0">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14m-4 -4l4 4l-4 4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Step 2 */}
              <div className="pt-6 flex flex-col h-full relative z-10">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 flex-grow">
                  <div className="-mt-6">
                    <div className="relative">
                      <span className="inline-flex items-center justify-center p-3 bg-gray-700 rounded-md shadow-lg">
                        <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">2</span>
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
                {/* Arrow - visible only on large screens */}
                <div className="hidden lg:block absolute -right-4 top-1/3 transform rotate-0 z-0">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14m-4 -4l4 4l-4 4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {/* Down arrow - visible only on small screens */}
                <div className="block sm:hidden absolute left-1/2 -bottom-4 transform -translate-x-1/2 rotate-90 z-0">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14m-4 -4l4 4l-4 4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Step 3 */}
              <div className="pt-6 flex flex-col h-full relative z-10">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 flex-grow">
                  <div className="-mt-6">
                    <div className="relative">
                      <span className="inline-flex items-center justify-center p-3 bg-gray-700 rounded-md shadow-lg">
                        <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
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
            
            {/* Connected line - visible only on medium screens */}
            <div className="hidden sm:block lg:hidden absolute top-28 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gray-200 z-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
