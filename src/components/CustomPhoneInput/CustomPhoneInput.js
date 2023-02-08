import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';

function CustomPhoneInput() {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState()
  // If `country` property is not passed
  // then "International" format is used.
  // Otherwise, "National" format is used.
  return (
    <PhoneInput
      country="US"
      value={value}
      placeholder="Enter phone number"
      onChange={setValue} 
      />
  )
}
export default CustomPhoneInput;