const Page = async () => {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-2">
          At <strong>Dollar Hut</strong>, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information.
        </p>
  
        <h2 className="text-xl font-semibold mt-4">1. Information We Collect</h2>
        <p>We collect the following information when you log in using Google:</p>
        <ul className="list-disc ml-5">
          <li>Your Name</li>
          <li>Your Email Address</li>
          <li>Your Google User ID</li>
        </ul>
  
        <h2 className="text-xl font-semibold mt-4">2. How We Use Your Information</h2>
        <p>We use this information only for authentication and user profile management.</p>
  
        <h2 className="text-xl font-semibold mt-4">3. Data Storage & Security</h2>
        <p>Your data is securely stored in our database and is not shared with third parties.</p>
  
        <h2 className="text-xl font-semibold mt-4">4. How to Request Data Deletion</h2>
        <p>If you wish to delete your account and associated data, please contact us at: <strong>support@dollar-hut.com</strong>.</p>
  
        <h2 className="text-xl font-semibold mt-4">5. Changes to this Privacy Policy</h2>
        <p>We may update this policy from time to time. Any changes will be reflected on this page.</p>
      </div>
    );
  };
  export default Page;