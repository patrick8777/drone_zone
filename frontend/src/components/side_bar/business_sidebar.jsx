export default function BusinessSidebar() {
  return (
    <div className="w-3/12 bg-white rounded p-3 shadow-lg h-full">
      <ul className="space-y-8 text-sm">
        <li>
          <a
            href="#"
            className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 border-4"
          >
            <span>Book an appointment</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 border-4"
          >
            <span>Contact us</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 border-4"
          >
            <span>Write a review</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 border-4"
          >
            <span>Edit professional info</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
