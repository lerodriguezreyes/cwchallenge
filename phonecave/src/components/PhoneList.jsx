import axios from "axios";
import { useEffect, useState } from "react";

function PhoneList() {
  const [getPhones, setGetPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/phones/")
      .then((response) => {
        console.log("This object has the phone data ===>", response.data);
        setGetPhones(response.data);
        let toggleIndividualStates = {};
        response.data.forEach((phone) => {
          toggleIndividualStates[phone._id] = false;
        });
        setToggle(toggleIndividualStates);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error getting the phone data ===>", error);
      });
  }, []);

  const handleToggle = (id) => {
    setToggle((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <h1 className="header">Welcome to our Phone Cave</h1>
      <h2 className="subheader">Check out our Phones!</h2>
      {getPhones.length > 0 &&
        getPhones.map((phone) => {
          return (
            <div key={phone._id} className="phonecard">
              <img src={phone.imageFileName} alt="phone image" className="phoneimg" />
              <div>
              <div className="desctext1">
                <strong>Phone Model:</strong> {phone.name}
              </div>
              <div className="desctext1">
                <strong>Price:</strong> {phone.price}
              </div>
              <div className="desctext1">
                <strong>Description:</strong> {phone.description}
              </div>
              
              {toggle[phone._id] && (
                <div className="toggable">
                  <ul className="desctext2">
                    <li >Color: {phone.color}</li>
                    <li>Screen description: {phone.screen}</li>
                    <li>Processor: {phone.processor}</li>
                    <li>Ram: {phone.ram}</li>
                  </ul>
                </div>
              )}
              </div>
              <button onClick={() => handleToggle(phone._id)}>
                  Check specs
                </button>
            </div>
          );
        })}
    </div>
  );
}

export default PhoneList;
