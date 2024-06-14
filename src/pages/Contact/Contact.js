import React from 'react'

export default function Contact() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen  ">
        <div className="w-1/2 h-screen hidden lg:block">
          <img src="https://img.freepik.com/free-vector/contact-us-elements_98292-5751.jpg?t=st=1713880329~exp=1713883929~hmac=ebe3a37aba65f27fb7644d3c19d3530890931570e2b068e732ea018aecab80ff&w=740" alt='logo' className="object-cover w-full h-full" />
        </div>
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 ">
          <form className="mt-10">
            <input type="hidden" name="access_key" defaultValue="YOUR_ACCESS_KEY_HERE" />
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="relative z-0 ">
                <input type="text" name="name" className="peer block w-full appearance-none border-1 border-b border-black bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your name</label>
              </div>
              <div className="relative z-0">
                <input type="text" name="email" className="peer block w-full appearance-none border-1 border-b border-black  bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your email</label>
              </div>
              <div className="relative z-0 col-span-2">
                <textarea name="message" rows={5} className="peer block w-full appearance-none border-1 border-b border-black  bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " defaultValue={""} />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your message</label>
              </div>
            </div>
            <button type="submit" className="mt-5 rounded-md bg-black px-10 py-2 text-white">Send Message</button>
          </form>

        </div>
      </div>
    </div>
  )
}
