'use client';

import { useState } from 'react';

const PaymentForm = () => {
  const [plan, setPlan] = useState('basic');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const getPlanDetails = () => {
    switch (plan) {
      case 'basic':
        return {
          name: 'Basic Plan',
          price: billingCycle === 'yearly' ? '$499.99/year' : '$49.99/month',
        };
      case 'pro':
        return {
          name: 'Pro Plan',
          price: billingCycle === 'yearly' ? '$999.99/year' : '$100.00/month',
        };
      case 'ultimate':
        return {
          name: 'Ultimate Plan',
          price: billingCycle === 'yearly' ? '$1750.00/year' : '$175.00/month',
        };
      default:
        return {
          name: 'Unknown Plan',
          price: 'Unknown',
        };
    }
  };

  const handlePlanChange = event => {
    setPlan(event.target.value);
  };

  const handleBillingCycleChange = event => {
    setBillingCycle(event.target.value);
  };

  const planDetails = getPlanDetails();

  return (
    <div>
      <h2>Choose your plan</h2>
      <div>
        <label>
          <input
            type="radio"
            value="basic"
            checked={plan === 'basic'}
            onChange={handlePlanChange}
          />
          Basic
        </label>
        <label>
          <input type="radio" value="pro" checked={plan === 'pro'} onChange={handlePlanChange} />
          Pro
        </label>
        <label>
          <input
            type="radio"
            value="ultimate"
            checked={plan === 'ultimate'}
            onChange={handlePlanChange}
          />
          Ultimate
        </label>
      </div>

      <h2>Billing Cycle</h2>
      <div>
        <label>
          <input
            type="radio"
            value="monthly"
            checked={billingCycle === 'monthly'}
            onChange={handleBillingCycleChange}
          />
          Monthly
        </label>
        <label>
          <input
            type="radio"
            value="yearly"
            checked={billingCycle === 'yearly'}
            onChange={handleBillingCycleChange}
          />
          Yearly
        </label>
      </div>

      <div>
        <h3>Plan Details</h3>
        <p>Name: {planDetails.name}</p>
        <p>Price: {planDetails.price}</p>
      </div>
    </div>
  );
};

export default PaymentForm;
