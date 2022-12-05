import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB0OfiX8CORL2R4PXV4fMNwOU146Xv1K_E",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  //Surat Silver
  const center = useMemo(() => ({ lat: 21.234318824002752, lng: 72.86322520738524 }), []);

  //Amreli
  // const center = useMemo(() => ({ lat: 21.60274715063979, lng: 71.21547162449515 }), []);


  return (
    <GoogleMap zoom={18} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}