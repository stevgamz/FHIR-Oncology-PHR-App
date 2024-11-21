function footer() {
  return (
    <div id="footer">
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-bold mb-2">Menu</h3>
              <ul>
                <li>
                  <a href="/phr" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                {/* <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Medical Service
                  </a>
                </li> */}
                <li>
                  <a href="/profile" className="text-gray-400 hover:text-white">
                    Profile
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-bold mb-2">Useful Links</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-bold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <div className="mt-4">
                <a href="#">
                  <img
                    src="https://placehold.co/150x50"
                    alt="Google Play Store"
                    className="inline-block"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://placehold.co/150x50"
                    alt="Apple App Store"
                    className="inline-block"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-400">&copy; 2023 FHIR ONCOLOGY UMN TIM</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default footer;
