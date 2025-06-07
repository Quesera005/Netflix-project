import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, where, addDoc, onSnapshot } from 'firebase/firestore';
import { app } from '../firebase';  // Ensure app is initialized in a separate file
import './PlansScreen.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/counter/userSlice';
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  // Refactored useEffect for subscription data
  useEffect(() => {
    if (user?.uid) {
      const db = getFirestore(app); // Get Firestore instance

      // Access the customer's 'subscriptions' collection
      const subscriptionsRef = collection(db, 'customers', user.uid, 'subscriptions');

      // Fetch subscriptions data from Firestore
      getDocs(subscriptionsRef).then(querySnapshot => {
        querySnapshot.forEach(subscriptionDoc => {
          setSubscription({
            role: subscriptionDoc.data().role,
            current_period_end: subscriptionDoc.data().current_period_end.seconds,
            current_period_start: subscriptionDoc.data().current_period_start.seconds,
          });
        });
      }).catch((error) => {
        console.error("Error fetching subscriptions:", error);
      });
    }
  }, [user?.uid]); // Run this effect only when `user.uid` changes

  // Refactored useEffect for fetching active products
  useEffect(() => {
    const db = getFirestore(app); // Initialize Firestore

    // Create a query to fetch active products
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('active', '==', true));

    // Fetch product data from Firestore
    getDocs(q).then(async (querySnapshot) => {
      const productsData = {}; // Object to store products with their prices
      querySnapshot.forEach(async (productDoc) => {
        productsData[productDoc.id] = productDoc.data();

        // Fetch prices subcollection for each product
        const pricesRef = collection(productDoc.ref, 'prices');
        const priceSnap = await getDocs(pricesRef);

        priceSnap.docs.forEach(price => {
          productsData[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });

      setProducts(productsData);
    }).catch((error) => {
      console.error('Error fetching products:', error);
    });
  }, []);

  // Refactored loadCheckout function to use modular SDK
  const loadCheckout = async (priceId) => {
    try {
      const db = getFirestore(app); // Get Firestore instance

      // Reference to 'checkout_sessions' collection
      const checkoutRef = collection(db, 'customers', user.uid, 'checkout_sessions');
      const docRef = await addDoc(checkoutRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      // Monitor changes in the checkout session document
      onSnapshot(docRef, async (snap) => {
        const { error, sessionId } = snap.data();

        if (error) {
          alert(`An error occurred: ${error.message}`);
        }

        if (sessionId) {
          // Load up Stripe
          const stripe = await loadStripe("pk_test_51QdFhBRqJ2m2DSOWQNSBcOu8h7cfzsS6QukNAyYF5K3E4C7r28Vc4SkNvWI4vajN483TOttLzdmmBVfIemMJ3TKZ00BxygMzmv");
          stripe.redirectToCheckout({ sessionId });
        }
      });
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="plansScreen">
        <br/>
        {subscription && <p>Renewal date:{new Date(subscription?.current_period_end *1000).toLocaleDateString()}</p>}
      {Object.entries(products).map(([productID, productData]) => {
        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

        return (
          <div 
          key={productID} 
          className={`${
            isCurrentPackage && "plansScreen__plan--disabled"
            } plansScreen__plan`}
            >

            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
