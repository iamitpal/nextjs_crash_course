"use client";
import React, { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import { toast } from "react-toastify";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const response = await fetch("/api/bookmarks");

        if (response.status === 200) {
          const data = await response.json();
          setProperties(data);
        } else {
          console.log(response.status);
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch saved properties");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSavedProperties();
  }, []);

  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
    <section className="px-4 py-6">
      <h1 className="text-2xl mb-4">Saved Properties</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No Saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
