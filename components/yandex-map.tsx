"use client";
import React, { useEffect, useRef } from "react";
import mapStyles from "@/public/yandex-map.json";
import { VectorCustomization } from "@yandex/ymaps3-types";
import cn from "clsx";

interface Props {
  className?: string;
}

function YandexMap({ className }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initMap() {
      if (mapRef.current) {
        await ymaps3.ready;

        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
          ymaps3;

        const { YMapDefaultMarker } = await ymaps3.import(
          "@yandex/ymaps3-markers@0.0.1"
        );

        const map = new YMap(
          mapRef.current,
          {
            location: { center: [27.52907, 53.907084], zoom: 16 },

            mode: "vector",
          },
          [
            new YMapDefaultSchemeLayer({
              customization: mapStyles as VectorCustomization,
            }),
            new YMapDefaultFeaturesLayer({}),
          ]
        );

        map.addChild(
          new YMapDefaultMarker({
            coordinates: [27.52907, 53.907084],
            color: "#fff",
          })
        );
      }
    }

    initMap();
  }, [mapRef]);

  return (
    <>
      <div
        ref={mapRef}
        className={cn("w-full overflow-hidden cursor-move", className)}
      />
    </>
  );
}

export default YandexMap;
