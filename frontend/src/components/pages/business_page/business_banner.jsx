export default function BusinessBanner() {
  return (
    <div className="bg-blue-500 text-black pl-4 flex flex-row justify-between items-center w-full">
      <div className="px-4">
        <h1 className="text-2xl font-bold">First and last name</h1>
        <p>Services Offered:</p>
        <div className="flex flex-wrap">
          <div className="bg-white p-2 rounded-lg mr-2 mb-2">Service 1</div>
          <div className="bg-white p-2 rounded-lg mr-2 mb-2">Service 2</div>
          <div className="bg-white p-2 rounded-lg mr-2 mb-2">Service 3</div>
        </div>
        <div>
          <p>Average rating</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg mr-6">
        <h2 className="font-semibold">Contact Information</h2>
        <ul>
          <li>Address</li>
          <li>Website</li>
          <li>Phone</li>
        </ul>
      </div>
    </div>
  );
}
