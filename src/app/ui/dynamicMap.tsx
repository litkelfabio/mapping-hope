"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L, { LeafletMouseEvent, Map, Popup } from "leaflet";
import statesData from "../constants/MUNICIPALITY.json";
import { fetchHeatMap } from "../lib/data";
import { QueryResultRow } from "@vercel/postgres";

const DynamicMap: React.FC<{
  mapData: QueryResultRow[];
  mapType: string;
}> = ({ mapData, mapType }) => {
  const data: any = statesData;
  let mapEL: any = null;
  var geojson: any; 

  const highlightFeature = (e: LeafletMouseEvent) => {
    var layer = e.target;

    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });

    layer.bringToFront();
    if (mapEL) {
      L.popup()
        ?.setLatLng(e.latlng)
        .setContent(
          "BRGY NAME:" +
            layer.feature.properties.DISPLAYNAME +
            "<br>" +
            "MEMBER:" +
            layer.feature.properties.DENSITY.toString()
        )
        .openOn(mapEL);
    }
  };

  function zoomToFeature(e: any) {
    mapEL?.fitBounds(e.target.getBounds());
  }

  const onEachFeature = (feature: any, layer: any) => {
    // if (mapType === "heatmap") {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
      });
    // }
  };

  const resetHighlight = (e: LeafletMouseEvent) => {
    geojson.resetStyle(e.target);
  };

  useEffect(() => {
    let map: L.Map | null = null;

    const mapContainer = document.getElementById("map");

    if (mapContainer && !mapContainer.classList.contains("leaflet-container")) {
      map = L.map("map").setView(
        [14.27522, 120.747238],
        mapType === "heatmap" ? 12 : 14
      );

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      mapEL = map;

      for (const brgy of data.features) {
        const foundData: any = mapData.find(
          (data) => parseInt(data.brgy_id) === brgy.id
        );
        brgy.properties.DENSITY = foundData?.total_residents || 0;
      }
      if (mapType === "heatmap") {
        const getColor = (d: number) => {
          return d > 1000
            ? "#800026"
            : d > 500
            ? "#BD0026"
            : d > 200
            ? "#E31A1C"
            : d > 100
            ? "#FC4E2A"
            : d > 50
            ? "#FD8D3C"
            : d > 20
            ? "#FEB24C"
            : d > 0
            ? "#FED976"
            : "#FFEDA0";
        };

        const style = (feature: any) => {
          return {
            fillColor: getColor(feature.properties.DENSITY),
            weight: 2,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.7,
          };
        };
        geojson = L.geoJson(data, {
          style: style,
          onEachFeature: onEachFeature,
        }).addTo(map);
      } else if (mapType === "clusterMap") {
        for (const residentData of mapData) {
          L.popup({
            autoClose: false,
            closeButton: false,
          })
            .setLatLng([residentData.latitude, residentData.longitude])
            .setContent(
              `Name: ${residentData.first_name} ${residentData.last_name}`
            )
            .addTo(map);
        }
      }
    }

    return () => {
      // Clean up if component unmounts
      // if (map) {
      //   console.log("unmount")
      //   map.remove();
      // }
    };
  }, [mapEL]);

  return <div id="map" />;
};

export default DynamicMap;
