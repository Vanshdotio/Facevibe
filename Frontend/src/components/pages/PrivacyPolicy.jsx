import React from "react";

const PrivacyPolicy = () => {
  const handleBack = () => {
    // Logic to go back to the previous page
    window.history.back();
  };
  return (
    <div className="min-h-screen bg-(--bg-color) flex flex-col text-(--text-color) font-[Space_Grotesk]">
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
        <div className="max-w-4xl flex  justify-center mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-(--hero-h4) max-w-3xl mx-auto leading-relaxed">
              Your privacy is our priority. Learn how we protect and handle your
              data.
            </p>
            <p className="text-sm text-(--hero-h4) mt-4">
              Last updated: January 1, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="w-full py-10 bg-(--bg-color) text-(--text-color)">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            {/* Section 1 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                1. Information We Collect
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  We collect information you provide directly to us, information
                  we obtain automatically when you use our services, and
                  information from third parties.
                </p>

                <h3 className="text-xl font-bold text-(--text-color) mt-6 mb-3">
                  Personal Information
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and email address when you create an account</li>
                  <li>Profile information and preferences</li>
                  <li>Payment information for subscription services</li>
                  <li>Communications you send to us</li>
                </ul>

                <h3 className="text-xl font-bold text-(--text-color) mt-6 mb-3">
                  Usage Information
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Music listening history and preferences</li>
                  <li>Device information and browser type</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and feature interactions</li>
                </ul>

                <h3 className="text-xl font-bold text-(--text-color) mt-6 mb-3">
                  Mood Detection Data
                </h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="font-semibold text-blue-800 dark:text-blue-200">
                    Important: All facial expression analysis is performed
                    locally on your device. We never store, transmit, or have
                    access to your camera feed or facial data.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                2. How We Use Your Information
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  We use the information we collect to provide, maintain, and
                  improve our services. Specifically, we use your information
                  to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide personalized music recommendations</li>
                  <li>Create and manage your account</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Communicate with you about our services</li>
                  <li>Improve our AI algorithms and user experience</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                  <li>Analyze usage patterns to enhance our platform</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                3. Information Sharing and Disclosure
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties except in the following
                  circumstances:
                </p>

                <h3 className="text-xl font-bold text-(--text-color) mt-6 mb-3">
                  Service Providers
                </h3>
                <p>
                  We may share information with trusted third-party service
                  providers who assist us in operating our platform, such as
                  payment processors, cloud storage providers, and analytics
                  services.
                </p>

                <h3 className="text-xl font-bold text-(--text-color) mt-6 mb-3">
                  Music Streaming Partners
                </h3>
                <p>
                  When you connect your accounts from music streaming services
                  (Spotify, Apple Music, etc.), we may share necessary
                  information to provide our services, subject to their privacy
                  policies.
                </p>

                <h3 className="text-xl font-bold text-(--text-color) mt-6 mb-3">
                  Legal Requirements
                </h3>
                <p>
                  We may disclose information when required by law, court order,
                  or government request, or to protect our rights, property, or
                  safety.
                </p>

                <h3 className="text-xl font-bold text-(--text-color) mt-6 mb-3">
                  Business Transfers
                </h3>
                <p>
                  In the event of a merger, acquisition, or sale of assets, your
                  information may be transferred as part of that transaction.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                4. Data Security
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  We implement industry-standard security measures to protect
                  your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication measures</li>
                  <li>Secure data centers with physical security controls</li>
                  <li>Employee training on data protection practices</li>
                </ul>
                <p>
                  However, no method of transmission over the internet or
                  electronic storage is 100% secure. While we strive to protect
                  your information, we cannot guarantee absolute security.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                5. Your Privacy Rights
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  Depending on your location, you may have certain rights
                  regarding your personal information:
                </p>

                <h3 className="text-xl font-bold text-(--text-color) mt-6 mb-3">
                  Access and Portability
                </h3>
                <p>
                  You can request a copy of the personal information we hold
                  about you and receive it in a portable format.
                </p>

                <h3 className="text-xl font-bold text-(--text-color) mt-6 mb-3">
                  Correction
                </h3>
                <p>
                  You can update or correct your personal information through
                  your account settings or by contacting us.
                </p>

                <h3 className="text-xl font-bold text-(--text-color) mt-6 mb-3">
                  Deletion
                </h3>
                <p>
                  You can request deletion of your personal information, subject
                  to certain legal and operational requirements.
                </p>

                <h3 className="text-xl font-bold text-(--text-color) mt-6 mb-3">
                  Opt-Out
                </h3>
                <p>
                  You can opt out of certain data processing activities, such as
                  marketing communications or data analytics.
                </p>

                <div className="bg-(--bg-color) rounded-lg p-4 border border-(--text-color)/10 mt-4">
                  <p>
                    <strong>To exercise your rights, contact us at:</strong>{" "}
                    privacy@facevibe.com
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                6. Cookies and Tracking Technologies
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  We use cookies and similar tracking technologies to enhance
                  your experience:
                </p>

                <h3 className="text-xl font-bold text-(--text-color) mt-6 mb-3">
                  Essential Cookies
                </h3>
                <p>
                  Required for basic functionality, such as maintaining your
                  login session and security features.
                </p>

                <h3 className="text-xl font-bold text-(--text-color) mt-6 mb-3">
                  Performance Cookies
                </h3>
                <p>
                  Help us understand how you use our service to improve
                  performance and user experience.
                </p>

                <h3 className="text-xl font-bold text-(--text-color) mt-6 mb-3">
                  Preference Cookies
                </h3>
                <p>
                  Remember your settings and preferences to provide a
                  personalized experience.
                </p>

                <p>
                  You can control cookie settings through your browser
                  preferences, though disabling certain cookies may affect
                  functionality.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                7. Children's Privacy
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  Our service is not intended for children under 13 years of
                  age. We do not knowingly collect personal information from
                  children under 13.
                </p>
                <p>
                  If you are a parent or guardian and believe your child has
                  provided us with personal information, please contact us
                  immediately. We will take steps to remove such information
                  from our systems.
                </p>
                <p>
                  For users between 13 and 18, we recommend parental guidance
                  when using our service.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                8. International Data Transfers
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  Your information may be transferred to and processed in
                  countries other than your own. We ensure appropriate
                  safeguards are in place:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Standard contractual clauses approved by regulatory
                    authorities
                  </li>
                  <li>
                    Adequacy decisions by relevant data protection authorities
                  </li>
                  <li>Certification schemes and codes of conduct</li>
                  <li>Your explicit consent where required</li>
                </ul>
              </div>
            </div>

            {/* Section 9 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                9. Data Retention
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  We retain your personal information only as long as necessary
                  to provide our services and fulfill the purposes outlined in
                  this policy:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Account information: Until you delete your account</li>
                  <li>Usage data: Up to 2 years for analytics purposes</li>
                  <li>
                    Payment information: As required by law and payment
                    processors
                  </li>
                  <li>
                    Communications: Up to 3 years for customer support purposes
                  </li>
                </ul>
                <p>
                  After the retention period, we securely delete or anonymize
                  your information.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                10. Changes to This Privacy Policy
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or legal requirements. We will:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Notify you of material changes via email or prominent notice
                    on our platform
                  </li>
                  <li>
                    Provide at least 30 days notice before changes take effect
                  </li>
                  <li>
                    Update the "Last updated" date at the top of this policy
                  </li>
                  <li>Maintain previous versions for your reference</li>
                </ul>
                <p>
                  Your continued use of our service after changes become
                  effective constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>

            {/* Section 11 */}
            <div className="bg-(--theme-bg) rounded-2xl p-8 border border-(--text-color)/10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                11. Contact Us
              </h2>
              <div className="space-y-4 text-(--hero-h4) leading-relaxed">
                <p>
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-(--bg-color) rounded-lg p-4 border border-(--text-color)/10">
                  <p>
                    <strong>Privacy Officer:</strong> privacy@facevibe.com
                  </p>
                  <p>
                    <strong>General Support:</strong> support@facevibe.com
                  </p>
                  <p>
                    <strong>Address:</strong> Facevibe Inc., 123 Music
                    Street, San Francisco, CA 94105
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </div>
                <p>
                  We will respond to your inquiry within 30 days of receipt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
