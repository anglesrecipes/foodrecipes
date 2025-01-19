"use client";
import React from "react";
import Image from "next/image";
import Recipe from "@/public/assets/Newsletter/news.webp";

const Newsletter = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [result, setResult] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const sendEmail = () => {
    setLoading(true);

    fetch("/api/emails", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Email sent successfully!");
        }
        return response.json();
      })
      .then((data) => setResult(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <section
      className="py-16 bg-white mb-14"
      aria-label="Newsletter Subscription Section"
    >
      <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6">
        <div className="lg:flex">
          <div className="lg:w-6/12 bg-amber-50 text-gray-900 font-bold text-center flex justify-center items-center">
            <div className="relative overflow-hidden">
              <Image
                className="w-full object-contain"
                src={Recipe}
                alt="Keep in Touch!"
                title="Keep in Touch!"
                width={0}
                height={0}
                quality={100}
                objectFit="cover"
                layout="responsive"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-amber-400/45 to-transparent opacity-75"
                title="Keep in Touch!"
              ></div>
            </div>
          </div>
          <div className="lg:w-6/12 bg-slate-50 px-10 py-10 lg:py-0 text-gray-900 font-bold text-center flex justify-center items-center flex-col">
            <h3 className="text-4xl font-bold md:text-5xl md:leading-[60px] text-gray-900 text-center capitalize">
              Keep in Touch!
            </h3>
            <div className="flex justify-center items-center flex-col">
              <div className="max-w-[400px] mx-auto">
                <div className="h-1 bg-amber-200 my-3 w-[100px]"></div>
              </div>
              <div className="max-w-[400px] mx-auto">
                <p className="text-slate-600 text-md text-center mb-6 font-normal">
                  Sign up and I&#39;ll send you delicious recipes and cooking
                  tips!
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendEmail();
                  }}
                >
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="w-full">
                      <input
                        className="w-full bg-slate-200 outline-none text-gray-900 font-semibold rounded py-2 px-3"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        required
                      />
                    </div>
                    <div className="w-full">
                      <input
                        className="w-full bg-slate-200 outline-none text-gray-900 font-semibold rounded py-2 px-3"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 mb-3">
                    <div className="w-full">
                      <input
                        className="w-full bg-slate-200 outline-none text-gray-900 font-semibold rounded py-2 px-3"
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="py-3 rounded bg-orange-500 text-white font-semibold w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? "Signing up..." : "Yes, Sign me up"}
                  </button>
                </form>
                {result.success && (
                  <p className="text-green-500 mt-2">{result.success}</p>
                )}
                {result.error && (
                  <p className="text-red-500 mt-2">{result.error}</p>
                )}
                <span className="text-sm text-slate-500 font-normal text-center">
                  We will not send you spam. Unsubscribe at any time.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
