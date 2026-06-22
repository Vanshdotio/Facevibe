import React from "react";

const TermsAndCondition = () => {
  const handleBack = () => {
    // Logic to go back to the previous page
    window.history.back();
  };
  return (
    <div className="min-h-screen bg-(--bg-color) text-(--text-color) font-[Space_Grotesk]">
      {/* Hero Section */}
      <section className="w-full py-10 bg-(--bg-color) text-(--text-color)">
        <div className="flex  w-80 justify-end pr-70  md:pr-50">
          <svg
            height={30}
            width={30}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="cursor-pointer"
            onClick={handleBack}
          >
            <path d="M22.0003 13.0001L22.0004 11.0002L5.82845 11.0002L9.77817 7.05044L8.36396 5.63623L2 12.0002L8.36396 18.3642L9.77817 16.9499L5.8284 13.0002L22.0003 13.0001Z"></path>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Terms and Conditions
            </h1>
            <p className="text-lg md:text-xl text-(--hero-h4) max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using Facevibe
            </p>
            <p className="text-sm text-(--hero-h4) mt-4">
              Last updated: January 1, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="w-full py-10 bg-(--bg-color) text-(--text-color)">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            {/* Section 1 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                1. Acceptance of Terms
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  By accessing and using Facevibe ("the Service"), you
                  accept and agree to be bound by the terms and provision of
                  this agreement. If you do not agree to abide by the above,
                  please do not use this service.
                </p>
                <p>
                  These Terms of Service ("Terms") govern your use of our
                  website located at facevibe.com (the "Service") operated by
                  Facevibe Inc. ("us", "we", or "our").
                </p>
                <p>
                  Your access to and use of the Service is conditioned on your
                  acceptance of and compliance with these Terms. These Terms
                  apply to all visitors, users and others who access or use the
                  Service.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                2. Description of Service
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  Facevibe is an AI-powered music recommendation platform
                  that uses facial expression analysis to detect your mood and
                  curate personalized music playlists. Our service includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Real-time mood detection through camera analysis</li>
                  <li>Personalized music recommendations</li>
                  <li>Integration with popular music streaming platforms</li>
                  <li>User preference learning and adaptation</li>
                  <li>Community features and music discovery</li>
                </ul>
                <p>
                  We reserve the right to modify, suspend, or discontinue any
                  part of the Service at any time without notice.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                3. User Accounts and Registration
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  To access certain features of the Service, you may be required
                  to create an account. When you create an account with us, you
                  must provide information that is accurate, complete, and
                  current at all times.
                </p>
                <p>
                  You are responsible for safeguarding the password and for
                  maintaining the confidentiality of your account. You agree not
                  to disclose your password to any third party and to take sole
                  responsibility for any activities or actions under your
                  account.
                </p>
                <p>
                  You must notify us immediately upon becoming aware of any
                  breach of security or unauthorized use of your account.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                4. Privacy and Data Collection
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  Your privacy is important to us. Our Privacy Policy explains
                  how we collect, use, and protect your information when you use
                  our Service. By using our Service, you agree to the collection
                  and use of information in accordance with our Privacy Policy.
                </p>
                <p>
                  <strong>Camera and Facial Data:</strong> Our mood detection
                  feature requires access to your device's camera. All facial
                  expression analysis is performed locally on your device. We do
                  not store, transmit, or have access to your camera feed or
                  facial data.
                </p>
                <p>
                  <strong>Music Preferences:</strong> We collect data about your
                  music preferences, listening habits, and interactions with our
                  Service to improve recommendations and user experience.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                5. Acceptable Use Policy
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  You agree to use the Service only for lawful purposes and in
                  accordance with these Terms. You agree not to use the Service:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    In any way that violates any applicable federal, state,
                    local, or international law or regulation
                  </li>
                  <li>
                    To impersonate or attempt to impersonate the Company, a
                    Company employee, another user, or any other person or
                    entity
                  </li>
                  <li>
                    To engage in any other conduct that restricts or inhibits
                    anyone's use or enjoyment of the Service
                  </li>
                  <li>
                    To attempt to gain unauthorized access to, interfere with,
                    damage, or disrupt any parts of the Service
                  </li>
                  <li>
                    To use the Service in any manner that could disable,
                    overburden, damage, or impair the Service
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                6. Intellectual Property Rights
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  The Service and its original content, features, and
                  functionality are and will remain the exclusive property of
                  Facevibe Inc. and its licensors. The Service is protected
                  by copyright, trademark, and other laws.
                </p>
                <p>
                  Our trademarks and trade dress may not be used in connection
                  with any product or service without our prior written consent.
                </p>
                <p>
                  You retain ownership of any content you submit, post, or
                  display on or through the Service. By submitting content, you
                  grant us a worldwide, non-exclusive, royalty-free license to
                  use, reproduce, modify, and distribute such content.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                7. Third-Party Services
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  Our Service may contain links to third-party websites or
                  services (such as Spotify, Apple Music, YouTube Music) that
                  are not owned or controlled by Facevibe Inc.
                </p>
                <p>
                  We have no control over, and assume no responsibility for, the
                  content, privacy policies, or practices of any third-party
                  websites or services. You acknowledge and agree that we shall
                  not be responsible or liable for any damage or loss caused by
                  your use of any such content, goods, or services.
                </p>
                <p>
                  We strongly advise you to read the terms and conditions and
                  privacy policies of any third-party websites or services that
                  you visit.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                8. Subscription and Payment Terms
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  Some parts of the Service are billed on a subscription basis.
                  You will be billed in advance on a recurring and periodic
                  basis (such as monthly or annually).
                </p>
                <p>
                  <strong>Free Trial:</strong> We may offer a free trial for new
                  users. At the end of the free trial period, you will be
                  charged the applicable subscription fee unless you cancel
                  before the trial ends.
                </p>
                <p>
                  <strong>Refunds:</strong> Except when required by law, paid
                  subscription fees are non-refundable. You may cancel your
                  subscription at any time, and cancellation will take effect at
                  the end of the current billing period.
                </p>
                <p>
                  <strong>Price Changes:</strong> We reserve the right to modify
                  subscription fees at any time. Any price changes will be
                  communicated to you in advance and will take effect at the
                  start of the next billing cycle.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                9. Disclaimer of Warranties
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  The information on this Service is provided on an "as is"
                  basis. To the fullest extent permitted by law, this Company:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Excludes all representations and warranties relating to this
                    Service and its contents
                  </li>
                  <li>
                    Excludes all liability for damages arising out of or in
                    connection with your use of this Service
                  </li>
                  <li>
                    Does not guarantee the accuracy, completeness, or timeliness
                    of mood detection results
                  </li>
                  <li>
                    Does not warrant that the Service will be uninterrupted or
                    error-free
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 10 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                10. Limitation of Liability
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  In no event shall Facevibe Inc., nor its directors,
                  employees, partners, agents, suppliers, or affiliates, be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages, including without limitation, loss of
                  profits, data, use, goodwill, or other intangible losses,
                  resulting from your use of the Service.
                </p>
                <p>
                  Our total liability to you for all claims arising out of or
                  relating to the use of or any inability to use any portion of
                  the Service shall not exceed the amount you paid us for the
                  Service in the twelve (12) months prior to the event giving
                  rise to the liability.
                </p>
              </div>
            </div>

            {/* Section 11 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                11. Termination
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  We may terminate or suspend your account and bar access to the
                  Service immediately, without prior notice or liability, under
                  our sole discretion, for any reason whatsoever, including
                  without limitation if you breach the Terms.
                </p>
                <p>
                  If you wish to terminate your account, you may simply
                  discontinue using the Service or contact us to request account
                  deletion.
                </p>
                <p>
                  Upon termination, your right to use the Service will cease
                  immediately. All provisions of the Terms which by their nature
                  should survive termination shall survive termination.
                </p>
              </div>
            </div>

            {/* Section 12 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                12. Changes to Terms
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material, we
                  will provide at least 30 days notice prior to any new terms
                  taking effect.
                </p>
                <p>
                  What constitutes a material change will be determined at our
                  sole discretion. By continuing to access or use our Service
                  after any revisions become effective, you agree to be bound by
                  the revised terms.
                </p>
              </div>
            </div>

            {/* Section 13 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                13. Contact Information
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <div className="bg-(--bg-color) rounded-lg p-4 border border-(--text-color)/10">
                  <p>
                    <strong>Email:</strong> legal@facevibe.com
                  </p>
                  <p>
                    <strong>Address:</strong> Facevibe Inc., 123 Music
                    Street, San Francisco, CA 94105
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndCondition;
