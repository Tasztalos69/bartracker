<script setup lang="ts">
/*global google */
import { ref } from "vue";
import { RouterView } from "vue-router";
import { Menu2Icon, Focus2Icon } from "vue-tabler-icons";
import mapStyle from "./map-style.json";
import markerIcon from "@/assets/marker.svg";
import useGoogle from "./useGoogle";
import { BOUNDS, CENTER, DEFAULT_ZOOM } from "@/constants";
import store from "./store";
import { useFirestore } from "vuefire";
import { collection, onSnapshot, query } from "firebase/firestore";
import geoPointToLatLng from "./geoPointToLatLng";
import type { Place } from "./types";

const db = useFirestore();

const mapOptions: google.maps.MapOptions = {
  styles: mapStyle,
  zoom: DEFAULT_ZOOM,
  center: CENTER,
  disableDefaultUI: true,
  clickableIcons: false,
  restriction: {
    latLngBounds: BOUNDS,
  },
};

useGoogle().then(async (google) => {
  store.map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    mapOptions
  );

  const q = query(collection(db, "places"));
  onSnapshot(q, (querySnapshot) => {
    // Clear markers
    store.markers.forEach((m) => m.setMap(null));
    store.markers = [];
    store.places = [];

    querySnapshot.forEach((doc) => {
      const place = doc.data();
      store.places.push(place as Place);

      // Create InfoWindow
      const infoWindow = new google.maps.InfoWindow({
        content: `
        <div class="info-window">
          <h3>${place.name}</h3>
          <h4>${place.formatted_address}</h4>
        </div>`,
        ariaLabel: "ariaLabel",
      });
      store.infoWindows.push(infoWindow);

      // Create Marker
      const marker = new google.maps.Marker({
        position: geoPointToLatLng(place.coords),
        icon: {
          url: markerIcon,
          scaledSize: new google.maps.Size(20, 20),
        },
        map: store.map,
        optimized: false,
      });

      marker.addListener("click", () => {
        store.infoWindows.forEach((iw) => iw.close());
        infoWindow.open({
          anchor: marker,
          map: store.map,
        });
      });

      store.markers.push(marker);
    });
  });
});

const recenter = () => {
  if (!store.map) return;
  store.map.panTo(CENTER);
  store.map.setZoom(DEFAULT_ZOOM);
};

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <button class="menu-toggle" :class="{ open: isMenuOpen }">
    <Menu2Icon size="32" @click="toggleMenu" />
  </button>

  <!-- UI -->
  <RouterView v-slot="{ Component }">
    <Transition name="fade">
      <div class="ui" v-if="isMenuOpen">
        <h1 class="title">Bartracker</h1>
        <component :is="Component" />
      </div>
    </Transition>
  </RouterView>

  <button class="center-button" @click="recenter">
    <Focus2Icon size="28" />
  </button>

  <div id="map" />
</template>

<style scoped lang="scss">
@import "@/styles/variables";

#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: 1;
}

.ui,
nav,
.center-button {
  position: relative;
  z-index: 2;
}

.menu-toggle {
  position: absolute;
  top: 23px;
  left: 25px;
  z-index: 3;

  svg {
    transition: $transition-medium;
    color: $bg;
  }

  &.open svg {
    color: $text;
  }
}

.ui {
  position: absolute;
  top: 10px;
  left: 10px;
  width: calc(20vw - 30px);
  height: calc(100vh - 20px);
  min-width: 300px;
  padding: 0 15px;
  background: $bg;
  border-radius: 10px;
  overflow: hidden;

  @media screen and (max-width: 700px) {
    z-index: 2;
    top: 0;
    left: 0;
    width: calc(100% - 30px);
    height: 100%;
    border-radius: 0;
  }

  .title {
    margin-top: 7px;
    margin-bottom: 20px;
    font-family: "Lobster", serif;
    text-align: center;
  }
}

.center-button {
  box-sizing: border-box;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  width: 38px;
  height: 38px;
  border-radius: 3px;
  background: $bg;

  @media screen and (max-width: 700px) {
    z-index: 1;
  }

  * {
    color: $text;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: $transition-medium;
}

.fade-enter-from,
.fade-leave-to {
  left: -320px;
}
</style>

<style lang="scss">
@import "@/styles/variables";
.info-window {
  font-size: 0.8rem;

  h3 {
    font-weight: 700;
  }

  h4 {
    margin-top: 5px;
  }
}
</style>
