export default function Footer() {
  return (
    <footer className="mt-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold">Over Ons</h2>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Diensten</h2>
          <ul className="list-disc pl-4">
            <li>Service 1</li>
            <li>Service 2</li>
            <li>Service 3</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold">Contact</h2>
          <p>Email: info@mrslovely.nl</p>
          <p>Whatsapp: 123-456-7890</p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Volg ons</h2>
          <ul className="flex space-x-4">
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
