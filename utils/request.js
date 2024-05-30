const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//fetch all properties
async function fetchProperties() {
  try {
    // handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const response = await fetch(`${apiDomain}/properties`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

//fetch single property
async function fetchProperty(id) {
  try {
    // handle the case where the domain is not available yet
    if (!apiDomain) {
      return null;
    }

    const response = await fetch(`${apiDomain}/properties/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch property");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
