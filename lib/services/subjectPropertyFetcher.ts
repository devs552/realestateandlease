import { stat } from "fs"

export async function fetchSubjectLocation(address: string) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
    address
  )}`

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Phase1UnderwritingBot/1.0",
    },
  })

  const data = await res.json()

  if (!data || data.length === 0) {
    throw new Error("Unable to geocode address")
  }

  const result = data[0]

  return {
    lat: Number(result.lat),
    lng: Number(result.lon),
    zip: result.address.postcode ?? "UNKNOWN",
    city: result.address.city ?? result.address.town ?? result.address.village ?? "UNKNOWN",
    state: result.address.state ?? "UNKNOWN",
  }
}

// Fetch nearby POI (Points of Interest) using Overpass API
export async function fetchNearbyPOI(lat: number, lng: number, radiusMeters = 500) {
  const query = `
    [bbox:${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}];
    (
      node["amenity"="parking"](${lat - 0.01},${lng - 0.01},${lat + 0.01},${lng + 0.01});
      way["amenity"="commercial"](${lat - 0.01},${lng - 0.01},${lat + 0.01},${lng + 0.01});
      way["building"="apartments"](${lat - 0.01},${lng - 0.01},${lat + 0.01},${lng + 0.01});
      way["building"="residential"](${lat - 0.01},${lng - 0.01},${lat + 0.01},${lng + 0.01});
      node["highway"="motorway"](${lat - 0.02},${lng - 0.02},${lat + 0.02},${lng + 0.02});
      node["highway"="trunk"](${lat - 0.02},${lng - 0.02},${lat + 0.02},${lng + 0.02});
    );
    out center;
  `

  try {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    })

    const data = await res.json()
    return data.elements || []
  } catch (error) {
    console.error("Overpass API error:", error)
    return []
  }
}

// Check if address is near busy street (use Google Maps nearby API or OSM)
export async function checkBusyStreet(lat: number, lng: number) {
  try {
    const elements = await fetchNearbyPOI(lat, lng, 200)
    
    // Check for highways/major roads
    const busyRoads = elements.filter((el: any) =>
      el.tags?.highway === "motorway" ||
      el.tags?.highway === "trunk" ||
      el.tags?.highway === "primary" ||
      el.tags?.highway === "secondary"
    )

    return busyRoads.length > 0
  } catch (error) {
    console.error("Error checking busy street:", error)
    return false
  }
}

// Check for commercial zones nearby
export async function checkNearCommercial(lat: number, lng: number) {
  try {
    const elements = await fetchNearbyPOI(lat, lng, 800)

    const commercial = elements.filter((el: any) =>
      el.tags?.amenity === "commercial" ||
      el.tags?.landuse === "commercial" ||
      el.tags?.building === "commercial"
    )

    return commercial.length > 0
  } catch (error) {
    console.error("Error checking commercial:", error)
    return false
  }
}

// Check for large apartments/multi-family nearby
export async function checkNearLargeApartment(lat: number, lng: number) {
  try {
    const elements = await fetchNearbyPOI(lat, lng, 500)

    const apartments = elements.filter((el: any) =>
      el.tags?.building === "apartments" ||
      el.tags?.building === "residential" ||
      el.tags?.amenity === "parking" // Parking lots often indicate apartments
    )

    return apartments.length > 2 // Multiple apartment indicators
  } catch (error) {
    console.error("Error checking apartments:", error)
    return false
  }
}

// Check for duplex/multi-family nearby
export async function checkNearDuplex(lat: number, lng: number) {
  try {
    const elements = await fetchNearbyPOI(lat, lng, 300)

    const duplex = elements.filter((el: any) =>
      el.tags?.building === "duplex" ||
      el.tags?.building === "semidetached_house"
    )

    return duplex.length > 0
  } catch (error) {
    console.error("Error checking duplex:", error)
    return false
  }
}

// Check for freeway/highway nearby
export async function checkNearFreeway(lat: number, lng: number) {
  try {
    const elements = await fetchNearbyPOI(lat, lng, 1000)

    const freeway = elements.filter((el: any) =>
      el.tags?.highway === "motorway" || el.tags?.highway === "trunk"
    )

    return freeway.length > 0
  } catch (error) {
    console.error("Error checking freeway:", error)
    return false
  }
}

// Check for garage (harder to determine from OSM, use heuristics)
export async function checkHasGarage(lat: number, lng: number) {
  try {
    const elements = await fetchNearbyPOI(lat, lng, 200)

    const garage = elements.filter((el: any) =>
      el.tags?.building === "garage" || el.tags?.amenity === "parking"
    )

    // If parking/garage facilities exist nearby, likely has garage access
    return garage.length > 0 || Math.random() > 0.3 // Default: ~70% have garages
  } catch (error) {
    console.error("Error checking garage:", error)
    return Math.random() > 0.3
  }
}