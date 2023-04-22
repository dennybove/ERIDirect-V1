/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { db, auth, collection, addDoc, onAuthStateChanged, getDocs, setDoc} from 'src/firebaseConfigFile';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { useAuth } from 'src/contexts/AuthContext.js';
import PropTypes from 'prop-types';

const OrderForm = ({ leadId, lastName }) => {
    const { user } = useAuth();
    const [retailPricing, setRetailPricing] = useState({});
    const [costPricing, setCostPricing] = useState({});
    const leadDocRef = doc(db, 'users', user.email, 'leads', `${lastName}-${leadId}`);

  // Input state variables
  //const [leadId, setLeadId] = useState('');
  //const [lastName, setLastName] = useState('');
  const [leafFilter_5_1, setLeafFilter_5_1] = useState(0);
  const [leafFilter_5_2, setLeafFilter_5_2] = useState(0);
  const [leafFilter_5_3, setLeafFilter_5_3] = useState(0);
  const [leafFilter_6_1, setLeafFilter_6_1] = useState(0);
  const [leafFilter_6_2, setLeafFilter_6_2] = useState(0);
  const [leafFilter_6_3, setLeafFilter_6_3] = useState(0);
  const [leafFilterProfile, setLeafFilterProfile] = useState('Core');
  const [miters, setMiters] = useState(0);
  const [straps, setStraps] = useState(0);
  const [wedges, setWedges] = useState(0);
  const [spikes, setSpikes] = useState(0);
  const [adjustGutterHeight, setAdjustGutterHeight] = useState(0);

  useEffect(() => {
    const getPricingData = async () => {
      const pricingDocRef = doc(db, 'Pricing', 'Retail Pricing');
      const pricingSnapshot = await getDoc(pricingDocRef);
      if (pricingSnapshot.exists()) {
        setRetailPricing(pricingSnapshot.data());
      }

      const costDocRef = doc(db, 'Pricing', 'Cost Pricing');
      const costSnapshot = await getDoc(costDocRef);
      if (costSnapshot.exists()) {
        setCostPricing(costSnapshot.data());
      }
    };

    getPricingData();
  }, []);

  const onSubmit = async (data) => {
    const orderQuantities = {
      leafFilter_5_1,
      leafFilter_5_2,
      leafFilter_5_3,
      leafFilter_6_1,
      leafFilter_6_2,
      leafFilter_6_3,
      leafFilterProfile,
      miters,
      straps,
      wedges,
      spikes,
      adjustGutterHeight,
    };

    const orderRetail = {
      leafFilter_5_1: leafFilter_5_1 * retailPricing.LF5_CORE_1,
      leafFilter_5_2: leafFilter_5_2 * retailPricing.LF5_CORE_2,
      leafFilter_5_3: leafFilter_5_3 * retailPricing.LF5_CORE_3,
      leafFilter_6_1: leafFilter_6_1 * retailPricing.LF6_CORE_1,
      leafFilter_6_2: leafFilter_6_2 * retailPricing.LF6_CORE_2,
      leafFilter_6_3: leafFilter_6_3 * retailPricing.LF6_CORE_3,
      miters: miters * retailPricing.MITERS,
      straps: straps * retailPricing.STRAPS,
      wedges: wedges * retailPricing.WEDGES,
      spikes: spikes * retailPricing.SPIKES,
      adjustGutterHeight: adjustGutterHeight * retailPricing.ADJUST_GUTTER_HEIGHT,
    };

    const orderCost = {
      leafFilter_5_1: leafFilter_5_1 * costPricing.LF5_CORE_1,
      leafFilter_5_2: leafFilter_5_2 * costPricing.LF5_CORE_2,
      leafFilter_5_3: leafFilter_5_3 * costPricing.LF5_CORE_3,
      leafFilter_6_1: leafFilter_6_1 * costPricing.LF6_CORE_1,
      leafFilter_6_2: leafFilter_6_2 * costPricing.LF6_CORE_2,
      leafFilter_6_3: leafFilter_6_3 * costPricing.LF6_CORE_3,
      miters: miters * costPricing.MITERS,
      straps: straps * costPricing.STRAPS,
      wedges: wedges * costPricing.WEDGES,
      spikes: spikes * costPricing.SPIKES,
      adjustGutterHeight: adjustGutterHeight * costPricing.ADJUST_GUTTER_HEIGHT,
    };

    //const leadDocRef = doc(db, 'users', user.email, 'leads', `${lastName}-${leadId}`);
    await updateDoc(leadDocRef, {
      orderQuantities,
      orderRetail,
      orderCost,
    });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const leadRef = doc(db, 'users', user.email, 'leads', `${lastName}-${leadId}`);
      const orderQuantitiesRef = collection(leadRef, 'orderQuantities');
      const orderRetailRef = collection(leadRef, 'orderRetail');
      const orderCostRef = collection(leadRef, 'orderCost');
  
      await addDoc(orderQuantitiesRef, {
        leafFilter_5_1: leafFilter_5_1,
        leafFilter_5_2: leafFilter_5_2,
        leafFilter_5_3: leafFilter_5_3,
        leafFilter_6_1: leafFilter_6_1,
        leafFilter_6_2: leafFilter_6_2,
        leafFilter_6_3: leafFilter_6_3,
        leafFilterProfile: leafFilterProfile,
        miters: miters,
        straps: straps,
        wedges: wedges,
        spikes: spikes,
        adjustGutterHeight: adjustGutterHeight,
      });
  
      await addDoc(orderRetailRef, {
        leafFilter_5_1: leafFilter_5_1 * retailPricing.LF5_CORE_1,
        leafFilter_5_2: leafFilter_5_2 * retailPricing.LF5_CORE_2,
        leafFilter_5_3: leafFilter_5_3 * retailPricing.LF5_CORE_3,
        leafFilter_6_1: leafFilter_6_1 * retailPricing.LF6_CORE_1,
        leafFilter_6_2: leafFilter_6_2 * retailPricing.LF6_CORE_2,
        leafFilter_6_3: leafFilter_6_3 * retailPricing.LF6_CORE_3,
      });
  
      await addDoc(orderCostRef, {
        leafFilter_5_1: leafFilter_5_1 * costPricing.LF5_CORE_1,
        leafFilter_5_2: leafFilter_5_2 * costPricing.LF5_CORE_2,
        leafFilter_5_3: leafFilter_5_3 * costPricing.LF5_CORE_3,
        leafFilter_6_1: leafFilter_6_1 * costPricing.LF6_CORE_1,
        leafFilter_6_2: leafFilter_6_2 * costPricing.LF6_CORE_2,
        leafFilter_6_3: leafFilter_6_3 * costPricing.LF6_CORE_3,
      });
  
      alert('Lead order submitted successfully');
    } catch (error) {
      console.error('Error submitting lead order:', error);
      alert('Failed to submit lead order. Please try again.');
    }
  };
  

  return (
    <div>
      <h1>Lead Order</h1>
      <form onSubmit={handleOrderSubmit} className="lead-order-form">

        <label htmlFor="leafFilter_5_1">LeafFilter 5-1 Quantity:</label>
        <input type="number" id="leafFilter_5_1" name="leafFilter_5_1" min="0" value={leafFilter_5_1} onChange={(e) => setLeafFilter_5_1(Number(e.target.value))} />
  
        <label htmlFor="leafFilter_5_2">LeafFilter 5-2 Quantity:</label>
        <input type="number" id="leafFilter_5_2" name="leafFilter_5_2" min="0" value={leafFilter_5_2} onChange={(e) => setLeafFilter_5_2(Number(e.target.value))} />
  
        <label htmlFor="leafFilter_5_3">LeafFilter 5-3 Quantity:</label>
        <input type="number" id="leafFilter_5_3" name="leafFilter_5_3" min="0" value={leafFilter_5_3} onChange={(e) => setLeafFilter_5_3(Number(e.target.value))} />
  
        <label htmlFor="leafFilter_6_1">LeafFilter 6-1 Quantity:</label>
        <input type="number" id="leafFilter_6_1" name="leafFilter_6_1" min="0" value={leafFilter_6_1} onChange={(e) => setLeafFilter_6_1(Number(e.target.value))} />
  
        <label htmlFor="leafFilter_6_2">LeafFilter 6-2 Quantity:</label>
        <input type="number" id="leafFilter_6_2" name="leafFilter_6_2" min="0" value={leafFilter_6_2} onChange={(e) => setLeafFilter_6_2(Number(e.target.value))} />
  
        <label htmlFor="leafFilter_6_3">LeafFilter 6-3 Quantity:</label>
        <input type="number" id="leafFilter_6_3" name="leafFilter_6_3" min="0" value={leafFilter_6_3} onChange={(e) => setLeafFilter_6_3(Number(e.target.value))} />
  
        <div>
          <label htmlFor="leafFilterProfile">LeafFilter Profile:</label>
          <input type="radio" id="core" name="leafFilterProfile" value="Core" checked={leafFilterProfile === "Core"} onChange={(e) => setLeafFilterProfile(e.target.value)} />
          <label htmlFor="core">Core</label>
          <input type="radio" id="versa" name="leafFilterProfile" value="Versa" checked={leafFilterProfile === "Versa"} onChange={(e) => setLeafFilterProfile(e.target.value)} />
          <label htmlFor="versa">Versa</label>
        </div>
  
        <label htmlFor="miters">Miters:</label>
        <input type="number" id="miters" name="miters" min="0" value={miters} onChange={(e) => setMiters(Number(e.target.value))} />
  
        <label htmlFor="straps">Straps:</label>
        <input type="number" id="straps" name="straps" min="0" value={straps} onChange={(e) => setStraps(Number(e.target.value))} />
  
        <label htmlFor="wedges">Wedges:</label>
        <input type="number" id="wedges" name="wedges" min="0" value={wedges} onChange={(e) => setWedges(Number(e.target.value))} />

        <label htmlFor="spikes">Spikes:</label>
        <input type="number" id="spikes" name="spikes" min="0" value={spikes} onChange={(e) => setSpikes(Number(e.target.value))} />

        <label htmlFor="adjustGutterHeight">Adjust Gutter Height:</label>
        <input type="number" id="adjustGutterHeight" name="adjustGutterHeight" min="0" value={adjustGutterHeight} onChange={(e) => setAdjustGutterHeight(Number(e.target.value))} />

        <button type="submit">Submit Lead Order</button>
        
    </form>
  </div>
);

  
};

OrderForm.propTypes = {
  leadId: PropTypes.func.isRequired,
  lastName: PropTypes.func.isRequired,
};

export default OrderForm;

