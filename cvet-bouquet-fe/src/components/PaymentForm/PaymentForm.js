import * as React from 'react';
import Box from '@mui/material/Box';
import 'react-phone-input-2/lib/style.css';
import { useEffect } from 'react';


export default function PaymentForm({ OrderNumber, OrderAmount}) {
  const refSumbitButton = React.useRef(null);
  useEffect(() => {
    if (OrderNumber !== '' && OrderAmount !== '') {
      refSumbitButton.current.click();
    }
  }, [OrderNumber, OrderAmount]);

  return (
    <>
      <Box
        component={'form'}
        action={`${process.env.SERVER_NAME}`}
        method='POST'
        sx={{ display: 'none' }}
      >
        <input
          type='hidden'
          name='Merchant_ID'
          value={+process.env.MERCHANT_ID}
        />
        <input type='hidden' name='OrderNumber' value={OrderNumber} />
        <input type='hidden' name='OrderAmount' value={OrderAmount} />
        <input type='hidden' name='OrderCurrency' value='BYN' />
        <input type='submit' ref={refSumbitButton} />
      </Box>
    </>
  );
}
