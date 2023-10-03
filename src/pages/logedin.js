import React, { useState } from 'react';



function Logedin() {
  const [services, setServices] = useState([]);
  const [rugmeasure, setRugmeasure] = useState('');
  const [measure, setMeasure] = useState('');
  const [rugcondition, setRugcondition] = useState('');
  const [condition, setCondition] = useState('');
  const [material, setMaterial] = useState('');
  const [servicetable, setServicetable] = useState('');
  const [address, setAddress] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const addService = (service) => {
    setServices([...services, service]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const localAuthData = localStorage.getItem('auth');
    const auth = JSON.parse(localAuthData);
    console.log(auth);

    const response = await fetch('/api/logedin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        services: services,
        address: address,
        userId: auth.id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setModalMessage(data.message);
      setIsModalOpen(true);
      setServices([]);
      setRugmeasure('');
      setRugcondition('');
      setMeasure('');
      setCondition('');
      setMaterial('');
      setServicetable('');
      setAddress('');
    } else {
      alert('Error: ' + data.message);
    }

    setRugmeasure('');
    setRugcondition('');
    setMeasure('');
    setCondition('');
    setMaterial('');
    setServicetable('');
  };

  const handleDelete = (index) => {
    setServices((prevServices) => prevServices.filter((_, i) => i !== index));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  return (
    <div className="bg-gradient-to-b from-gray-200 to-gray-400 p-5 text-black min-h-screen">
      <div className="flex justify-center items-center h-screen">
        <h2 data-cy="message" className="text-5xl font-serif leading-tight">
          Rediscover the charm <br></br>of your furniture. Let <br></br>us give
          it a fresh, pristine <br></br>makeover. Your home <br></br>deserves
          the best – and <br></br>so do you!
        </h2>
      </div>
      <div className="overflow-x-auto">
        <div className="flex space-x-6 justify-center">
          <form
            data-cy="rug-revitalize"
            className="bg-white shadow-lg border border-gray-200 p-6 rounded-lg mx-2 w-full md:w-1/2 lg:w-1/4 relative text-black flex flex-col items-center space-y-4"
          >
            <h3 data-cy="h3-rug" className="text-lg mb-6 text-center">
              Revitalize Your Rugs
            </h3>
            <img
              data-cy="img-rug"
              src="/rugs.jpeg"
              alt="Mueble"
              width={150}
              height={150}
              className="rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 border border-yellow-500 p-1"
            />

            <div className="w-full">
              <label className="block mb-2 text-black-600">Measures:</label>
              <select
                data-cy="select-rug"
                name="measure"
                value={rugmeasure}
                onChange={(e) => setRugmeasure(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
              >
                <option value="options">Options</option>
                <option value="80*150 cm">80*150 cm</option>
                <option value="160*230 cm">160*230 cm</option>
                <option value="240*340 cm">240*340 cm</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-black-600">Condition:</label>
              <input
                data-cy="condition-rug"
                type="text"
                name="title"
                value={rugcondition}
                onChange={(e) => setRugcondition(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                required
              />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-black-600">Material:</label>
              <input
                data-cy="material-rug"
                type="text"
                name="title"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                required
              />
            </div>

            <button
              data-cy="button-rug"
              className="bg-blue-500 hover:bg-blue-600 border border-blue-500 text-white py-2 px-4 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:rotate-6"
              onClick={(e) => {
                e.preventDefault();
                addService({
                  title: 'Revitalize Your Rugs',
                  rugmeasure,
                  rugcondition,
                  measure: '',
                  condition: '',
                  material,
                  servicetable: '',
                });
              }}
            >
              Add to List
            </button>
          </form>

          <form
            data-cy="renew-furniture"
            className="bg-white shadow-lg border border-gray-200 p-6 rounded-lg mx-2 w-full md:w-1/2 lg:w-1/4 relative text-black flex flex-col items-center space-y-4"
          >
            <h3 data-cy="h3-renew" className="text-lg mb-6 text-center">
              Renew Your Furniture
            </h3>
            <img
              data-cy="img-renew"
              src="/mueble.webp"
              alt="Mueble"
              width={200}
              height={200}
              className="rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 border border-yellow-500 p-1"
            />

            <div className="w-full">
              <label className="block mb-2 text-black-600">Seats:</label>
              <select
                data-cy="measure-renew"
                name="measure"
                value={measure}
                onChange={(e) => setMeasure(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
              >
                <option value="seats">Options</option>
                <option value="One">1 seat</option>
                <option value="Two">2 seats</option>
                <option value="Three">3 seats</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-black-600">Condition:</label>
              <select
                data-cy="condition-renew"
                name="measure"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                required
              >
                <option value="Options">Options</option>
                <option value="Stained">Stained</option>
                <option value="Dirt">Dirt</option>
                <option value="Fabric change">Fabric change</option>
              </select>
            </div>

            <button
              data-cy="submit-renew"
              className="bg-blue-500 hover:bg-blue-600 border border-blue-500 text-white py-2 px-4 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:rotate-6"
              onClick={(e) => {
                e.preventDefault();
                addService({
                  title: 'Renew Your Furniture',
                  measure,
                  condition,
                  rugmeasure: '',
                  rugcondition: '',
                  material: '',
                  servicetable: '',
                });
              }}
            >
              Add to List
            </button>
          </form>

          <form
            data-cy="elevate-tabletops"
            className="bg-white shadow-lg border border-gray-200 p-6 rounded-lg mx-2 w-full md:w-1/2 lg:w-1/4 relative text-black flex flex-col items-center space-y-4"
          >
            <h3 data-cy="h3-tabletops" className="text-lg mb-6 text-center">
              Elevate Your Tabletops
            </h3>
            <img
              data-cy="img-tabletops"
              src="/table.webp"
              alt="Table"
              width={150}
              height={150}
              className="rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300 border border-yellow-500 p-1"
            />

            <div className="w-full">
              <label className="block mb-2 text-black-600">Restoration:</label>
              <select
                data-cy="select-tabletops"
                name="servicetable"
                value={servicetable}
                onChange={(e) => setServicetable(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
              >
                <option value="Options">Options</option>
                <option value="Polish">Polish</option>
                <option value="Paint">Paint</option>
              </select>
            </div>

            <button
              data-cy="submit-tabletops"
              className="bg-blue-500 hover:bg-blue-600 border border-blue-500 text-white py-2 px-4 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:rotate-6"
              onClick={(e) => {
                e.preventDefault();
                addService({
                  title: 'Elevate Your Tabletops',
                  servicetable,
                  rugmeasure: '',
                  rugcondition: '',
                  measure: '',
                  condition: '',
                  material: '',
                });
              }}
            >
              Add to List
            </button>
          </form>
        </div>

        {services.length > 0 && (
          <div className="m-6 bg-grey-500 shadow-lg border border-gray-200 p-6 rounded-lg relative">
            <h1
              data-cy="services-selected"
              className="text-4xl mb-5 font-semibold border-b pb-2"
            >
              Services Selected
            </h1>
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-blue-200 p-4 rounded shadow-md my-4 flex justify-between items-center"
              >
                <h3
                  data-cy="selected-title-service"
                  className="text-lg font-semibold mb-2"
                >
                  {service.title}
                </h3>
                {service.rugmeasure && (
                  <p
                    data-cy="selected-measure-service"
                    className="text-gray-700"
                  >
                    Measure: {service.rugmeasure}
                  </p>
                )}
                {service.measure && (
                  <p data-cy="selected-seat-service" className="text-gray-700">
                    Seats: {service.measure}
                  </p>
                )}
                {service.rugcondition && (
                  <p
                    data-cy="selected-condition-rug-service"
                    className="text-gray-700"
                  >
                    Condition: {service.rugcondition}
                  </p>
                )}
                {service.condition && (
                  <p
                    data-cy="selected-condition-service"
                    className="text-gray-700"
                  >
                    Condition: {service.condition}
                  </p>
                )}
                {service.material && (
                  <p
                    data-cy="selected-material-service"
                    className="text-gray-700"
                  >
                    Material: {service.material}
                  </p>
                )}
                {service.servicetable && (
                  <p
                    data-cy="selected-services-service"
                    className="text-gray-700"
                  >
                    Services: {service.servicetable}
                  </p>
                )}
                <button
                  data-cy="selected-delete"
                  onClick={() => handleDelete(index)}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 border border-blue-500 text-white py-2 px-4 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
                >
                  Remove from List
                </button>
              </div>
            ))}
            <div className="w-full mt-4">
              <label className="block mb-2 text-black-600">Address: </label>
              <input
                type="text"
                name="title"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className=" border border-black bg-transparent rounded focus:outline-none focus:border-blue-400 m-2"
                required
              />
            </div>
            <p className="text-xs mt-4">
              A cleaner proposal will be sent to you, as soon as posible you
              will obtain an email for confirmation
            </p>
            <button
              className="mt-4 border border-black bg-transparent text-black hover:bg-blue-500 hover:text-white py-2 px-4 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={(e) => handleSubmit(e)}
            >
              Send to cleaner
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
              <div>
                <h3 className="text-lg leading-6 font-medium text-black">
                  Notification
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{modalMessage}</p>
                </div>
              </div>
              <div className="mt-4">
                <button
                  data-cy="close-modal-button"
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-700"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logedin;
