import { useState, useEffect } from "react";

export const CustomerProfile = ({ id }) => {
  let [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    fetch(`https://cyf-react.glitch.me/customers/${id}`)
      .then(response => response.json())
      .then(data => {
        setCustomerInfo(data);
      })
      .catch(err => err);
  }, [id]);

  useEffect(() => {}, [customerInfo]);

  return (
    customerInfo && (
      <ul className="customer-profile">
        <h4>Customer Profile</h4>
        <li>Customer Email: {customerInfo.email}</li>
        <li>Customer Id: {customerInfo.id}</li>
        {customerInfo.vip === true ? (
          <li>VIP Customer</li>
        ) : (
          <li>Not a VIP Customer</li>
        )}
        <li>Customer Phone Number: {customerInfo.phoneNumber}</li>
      </ul>
    )
  );
};
